from rest_framework import serializers
from .models import Post, Response, Comment


class PostSerializer(serializers.ModelSerializer):
    seen_count = serializers.IntegerField(read_only=True, default=0)
    upvote_count = serializers.IntegerField(read_only=True, default=0)
    downvote_count = serializers.IntegerField(read_only=True, default=0)
    response_count = serializers.IntegerField(read_only=True, allow_null=True)
    is_upvoted = serializers.BooleanField(read_only=True, allow_null=True)
    is_downvoted = serializers.BooleanField(read_only=True, allow_null=True)
    is_seen = serializers.BooleanField(read_only=True, allow_null=True)
    created_by = serializers.SerializerMethodField(
        'created_by_', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'created_by', 'details', 'seen_count',
                  'upvote_count', 'downvote_count', 'spam', 'response_count',
                  'is_upvoted', 'is_downvoted', 'is_seen', 'created_at']
        extra_kwargs = {'spam': {'read_only': True},
                        'created_by': {'required': False, 'read_only': True},
                        'title': {'error_messages': {
                            'required': 'Must include a proper title.',
                            'blank': 'Must include a proper title'}},
                        'details': {'error_messages': {
                            'required': 'Must include a proper description.',
                            'blank': 'Must include a proper description'}}}

    def created_by_(self, obj):
        return obj.created_by.username


class ResponseSerializer(serializers.ModelSerializer):
    upvote_count = serializers.IntegerField(read_only=True, default=0)
    downvote_count = serializers.IntegerField(read_only=True, default=0)
    is_upvoted = serializers.BooleanField(read_only=True, allow_null=True)
    is_downvoted = serializers.BooleanField(read_only=True, allow_null=True)
    created_by = serializers.SerializerMethodField(
        'created_by_', read_only=True)

    class Meta:
        model = Response
        fields = ['id', 'response', 'created_by', 'upvote_count',
                  'downvote_count', 'spam', 'is_upvoted', 'is_downvoted', 'created_at']
        extra_kwargs = {'spam': {'read_only': True},
                        'created_by': {'required': False, 'read_only': True},
                        'response': {'error_messages': {
                            'required': 'Response cannot be empty.',
                            'blank': 'Response cannot be empty.'}}}

    def created_by_(self, obj):
        return obj.created_by.username


class CommentSerializer(serializers.ModelSerializer):
    upvote_count = serializers.IntegerField(read_only=True)
    downvote_count = serializers.IntegerField(read_only=True)
    is_upvoted = serializers.BooleanField(read_only=True, allow_null=True)
    is_downvoted = serializers.BooleanField(read_only=True, allow_null=True)
    created_by = serializers.SerializerMethodField(
        'created_by_', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'comment', 'created_by', 'upvote_count',
                  'downvote_count', 'spam', 'is_upvoted', 'is_downvoted', 'created_at']
        extra_kwargs = {'spam': {'read_only': True},
                        'created_by': {'required': False, 'read_only': True}}

    def created_by_(self, obj):
        return obj.created_by.username
