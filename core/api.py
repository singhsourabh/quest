from rest_framework.views import APIView
from rest_framework import generics, filters
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated, IsAuthenticatedOrReadOnly)
from utils.permissions import IsOwner, ReadOnly
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK,
    HTTP_401_UNAUTHORIZED
)
from .serializers import (PostSerializer,
                          ResponseSerializer,  CommentSerializer)
from django.db.models import Q, Count, Exists, OuterRef
from .models import Post, Response, Comment, Activity

seen_count = Count('activity', filter=Q(activity__activity_type='S'))
upvote_count = Count('activity', filter=Q(activity__activity_type='U'))
downvote_count = Count('activity', filter=Q(activity__activity_type='D'))
response_count = Count('responses')


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

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ResponseList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ResponseSerializer

    def get_queryset(self):
        queryset = Response.objects.filter(post_id=self.kwargs.get('post_id')).annotate(
            upvote=upvote_count,
            downvote=downvote_count)

        if self.request.user.is_authenticated:
            queryset = queryset.annotate(
                is_upvoted=is_up_down_seen(self.request.user, 'U'),
                is_downvoted=is_up_down_seen(self.request.user, 'D'))
        print(queryset)
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CommentList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.filter(response_id=self.kwargs.get('response_id')).annotate(
            upvote=upvote_count,
            downvote=downvote_count)

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
        queryset = Post.objects.annotate(
            seen=seen_count,
            upvote=upvote_count,
            downvote=downvote_count)
        if self.request.user.is_authenticated:
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
            upvote=upvote_count,
            downvote=downvote_count)

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
            upvote=upvote_count,
            downvote=downvote_count)
        if self.request.user.is_authenticated:
            queryset = queryset.annotate(
                is_upvoted=is_up_down_seen(self.request.user, 'U'),
                is_downvoted=is_up_down_seen(self.request.user, 'D'))
        return queryset
