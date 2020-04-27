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
from django.db.models import Q, Count
from .models import Post, Response, Comment, Activity


class PostList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer
    queryset = Post.objects.annotate(
        seen=Count('activity', filter=Q(activity__activity_type='S')),
        upvote=Count('activity', filter=Q(activity__activity_type='U')),
        downvote=Count('activity', filter=Q(activity__activity_type='D')),
        response_count=Count('responses'))
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['seen', 'response_count']
    search_fields = ['title', 'details']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ResponseList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ResponseSerializer

    def get_queryset(self):
        queryset = Response.objects.filter(post_id=self.kwargs.get('post_id')).annotate(
            upvote=Count('activity', filter=Q(activity__activity_type='U')),
            downvote=Count('activity', filter=Q(activity__activity_type='D')))
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CommentList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.filter(response_id=self.kwargs.get('response_id')).annotate(
            upvote=Count('activity', filter=Q(activity__activity_type='U')),
            downvote=Count('activity', filter=Q(activity__activity_type='D')))
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class PostDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [(ReadOnly) | (IsOwner)]
    serializer_class = PostSerializer
    queryset = Post.objects.annotate(
        seen=Count('activity', filter=Q(activity__activity_type='S')),
        upvote=Count('activity', filter=Q(activity__activity_type='U')),
        downvote=Count('activity', filter=Q(activity__activity_type='D')))


class ResponseDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [(ReadOnly) | (IsOwner)]
    serializer_class = ResponseSerializer

    def get_queryset(self):
        queryset = Response.objects.filter(post_id=self.kwargs.get('post_id')).annotate(
            upvote=Count('activity', filter=Q(activity__activity_type='U')),
            downvote=Count('activity', filter=Q(activity__activity_type='D')))
        return queryset


class CommentDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [(ReadOnly) | (IsOwner)]
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.filter(response_id=self.kwargs.get('response_id')).annotate(
            upvote=Count('activity', filter=Q(activity__activity_type='U')),
            downvote=Count('activity', filter=Q(activity__activity_type='D')))
        return queryset
