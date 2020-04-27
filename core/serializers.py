from rest_framework import serializers
from .models import Post, Response, Comment


class PostSerializer(serializers.ModelSerializer):
    seen = serializers.IntegerField(read_only=True)
    upvote = serializers.IntegerField(read_only=True)
    downvote = serializers.IntegerField(read_only=True)
    response_count = serializers.IntegerField(read_only=True, allow_null=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'created_by', 'details', 'seen',
                  'upvote', 'downvote', 'spam', 'response_count']
        extra_kwargs = {'spam': {'read_only': True},
                        'created_by': {'required': False, 'read_only': True}}


class ResponseSerializer(serializers.ModelSerializer):
    upvote = serializers.IntegerField(read_only=True)
    downvote = serializers.IntegerField(read_only=True)

    class Meta:
        model = Response
        fields = ['id', 'response', 'created_by', 'upvote', 'downvote', 'spam']
        extra_kwargs = {'spam': {'read_only': True},
                        'created_by': {'required': False, 'read_only': True}}


class CommentSerializer(serializers.ModelSerializer):
    upvote = serializers.IntegerField(read_only=True)
    downvote = serializers.IntegerField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'comment', 'created_by',
                  'upvote', 'downvote', 'spam']
        extra_kwargs = {'spam': {'read_only': True},
                        'created_by': {'required': False, 'read_only': True}}


# class PostDetailsSerializer(serializers.ModelSerializer):
#     seen = serializers.IntegerField(read_only=True)
#     upvote = serializers.IntegerField(read_only=True)
#     downvote = serializers.IntegerField(read_only=True)

#     class Meta:
#         model = Post
#         fields = ['id', 'title', 'created_by', 'details',
#                   'seen', 'upvote', 'downvote', 'spam']
#         extra_kwargs = {'spam': {'read_only': True},
#                         'created_by': {'required': False}}


# class ResponseDetailsSerializer(serializers.ModelSerializer):
#     upvote = serializers.IntegerField(read_only=True)
#     downvote = serializers.IntegerField(read_only=True)

#     class Meta:
#         model = Response
#         fields = ['id', 'response', 'created_by', 'upvote', 'downvote', 'spam']
#         extra_kwargs = {'spam': {'read_only': True},
#                         'created_by': {'required': False}}
