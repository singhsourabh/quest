from rest_framework.views import APIView
from rest_framework import generics, filters, exceptions
from rest_framework.response import Response as ReqResponse
from rest_framework.permissions import (
    IsAuthenticated, IsAuthenticatedOrReadOnly)
from utils.permissions import IsOwner, ReadOnly
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK,
    HTTP_401_UNAUTHORIZED
)
from django.db.models import Q, Count, Exists, OuterRef, Subquery
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404

from .serializers import (PostSerializer,
                          ResponseSerializer,  CommentSerializer)
from .models import Post, Response, Comment, Activity
from .tasks import check_toxicity

seen_count = Count('activity', filter=Q(
    activity__activity_type='S',), distinct=True)
upvote_count = Count('activity', filter=Q(
    activity__activity_type='U'), distinct=True)
downvote_count = Count('activity', filter=Q(
    activity__activity_type='D'), distinct=True)
response_count = Count('responses', distinct=True)

content_type_ = ContentType.objects.get_for_models(Post, Response)
content_type = {}
for key, val in content_type_.items():
    content_type[key.__name__] = val


def is_up_down_seen(user, activity_type):
    queryexp = Exists(Activity.objects.filter(
        user=user, object_id=OuterRef('id'), activity_type=activity_type))
    return queryexp


class PostList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['seen', 'response_count']
    search_fields = ['title', 'details']

    def get_queryset(self):
        queryset = Post.objects.annotate(
            seen_count=seen_count,
            upvote_count=upvote_count,
            downvote_count=downvote_count,
            response_count=response_count)

        if self.request.user.is_authenticated:
            queryset = queryset.annotate(
                is_upvoted=is_up_down_seen(self.request.user, 'U'),
                is_downvoted=is_up_down_seen(self.request.user, 'D'),
                is_seen=is_up_down_seen(self.request.user, 'S'))
        return queryset.distinct()

    def perform_create(self, serializer):
        new_post = serializer.save(created_by=self.request.user)
        check_toxicity.delay(new_post.id)


class ResponseList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ResponseSerializer

    def get_queryset(self):
        queryset = Response.objects.filter(post_id=self.kwargs.get('post_id')).annotate(
            upvote_count=upvote_count,
            downvote_count=downvote_count)

        if self.request.user.is_authenticated:
            queryset = queryset.annotate(
                is_upvoted=is_up_down_seen(self.request.user, 'U'),
                is_downvoted=is_up_down_seen(self.request.user, 'D'))
        return queryset

    def perform_create(self, serializer):
        post = get_object_or_404(Post, id=self.kwargs['post_id'])
        serializer.save(post=post, created_by=self.request.user)


class CommentList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.filter(response_id=self.kwargs.get('response_id')).annotate(
            upvote_count=upvote_count,
            downvote_count=downvote_count)

        if self.request.user.is_authenticated:
            queryset = queryset.annotate(
                is_upvoted=is_up_down_seen(self.request.user, 'U'),
                is_downvoted=is_up_down_seen(self.request.user, 'D'))

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class PostDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [(ReadOnly) | (IsOwner)]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        post_id = self.kwargs['pk']

        queryset = Post.objects.annotate(
            seen_count=seen_count,
            upvote_count=upvote_count,
            downvote_count=downvote_count,
            response_count=response_count)

        if user.is_authenticated:
            Activity.objects.get_or_create(
                user=user,
                content_type=content_type['Post'],
                activity_type='S',
                object_id=post_id)

            queryset = queryset.annotate(
                is_upvoted=is_up_down_seen(self.request.user, 'U'),
                is_downvoted=is_up_down_seen(self.request.user, 'D'),
                is_seen=is_up_down_seen(self.request.user, 'S'))

        return queryset


class ResponseDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [(ReadOnly) | (IsOwner)]
    serializer_class = ResponseSerializer

    def get_queryset(self):
        queryset = Response.objects.filter(post_id=self.kwargs.get('post_id')).annotate(
            upvote_count=upvote_count,
            downvote_count=downvote_count)

        if self.request.user.is_authenticated:
            queryset = queryset.annotate(
                is_upvoted=is_up_down_seen(self.request.user, 'U'),
                is_downvoted=is_up_down_seen(self.request.user, 'D'))

        return queryset


class CommentDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [(ReadOnly) | (IsOwner)]
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.filter(response_id=self.kwargs.get('response_id')).annotate(
            upvote_count=upvote_count,
            downvote_count=downvote_count)
        if self.request.user.is_authenticated:
            queryset = queryset.annotate(
                is_upvoted=is_up_down_seen(self.request.user, 'U'),
                is_downvoted=is_up_down_seen(self.request.user, 'D'))
        return queryset


class UpDownToggle(APIView):
    permission_classes = [IsAuthenticated]

    def create_or_delete(self, c_type, obj_id, user, act_type):
        queryset = Activity.objects.filter(
            content_type=c_type, object_id=obj_id, user=user, activity_type__in=['U', 'D'])
        record = {"U": None, "D": None}

        for obj in queryset.iterator():
            record[obj.activity_type] = obj
        up = 0
        down = 0
        is_up = False
        is_down = False
        if act_type == 'U':
            if not record['D'] and not record['U']:
                Activity.objects.create(
                    content_type=c_type, object_id=obj_id, user=user, activity_type='U')
                up = up + 1
                is_up = True
            elif record['D'] and not record['U']:
                record["D"].delete()
                Activity.objects.create(
                    content_type=c_type, object_id=obj_id, user=user, activity_type='U')
                down = down - 1
                up = up + 1
                is_up = True
            else:
                record["U"].delete()
                up = up - 1

        if act_type == 'D':
            if not record['D'] and not record['U']:
                Activity.objects.create(
                    content_type=c_type, object_id=obj_id, user=user, activity_type='D')
                down = down + 1
                is_down = True
            elif record['D'] and not record['U']:
                record["D"].delete()
                down = down - 1
            else:
                record["U"].delete()
                Activity.objects.create(
                    content_type=c_type, object_id=obj_id, user=user, activity_type='D')
                down = down + 1
                is_down = True
                up = up - 1

        return (up, down, is_up, is_down)

    def patch(self, request, *args, **kwargs):
        data = request.data
        try:
            result = self.create_or_delete(
                c_type=content_type[data['content']],
                obj_id=data['id'],
                user=request.user,
                act_type=data['type'])
            return ReqResponse({
                'upvote_count': result[0],
                'downvote_count': result[1],
                "is_upvoted": result[2],
                "is_downvoted": result[3]
            })
        except KeyError as err:
            raise exceptions.ValidationError({"details": f"{err} is required"})
