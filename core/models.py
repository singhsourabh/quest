from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from utils.base import TimeStamp
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation

User = get_user_model()


class Post(TimeStamp):
    title = models.CharField(max_length=100)
    details = models.TextField()
    created_by = models.ForeignKey('userauth.User', on_delete=models.CASCADE)
    activity = GenericRelation('Activity')
    spam = models.BooleanField(default=False)

    class Meta:
        ordering = ['-_created_at']

    def __str__(self):
        return self.title[:25]


class Response(TimeStamp):
    post = models.ForeignKey(
        'Post', related_name="responses", on_delete=models.CASCADE)
    response = models.TextField(null=False)
    created_by = models.ForeignKey('userauth.User', on_delete=models.CASCADE)
    activity = GenericRelation('Activity')
    spam = models.BooleanField(default=False)

    class Meta:
        ordering = ['-_created_at']

    def __str__(self):
        return self.response[:25]


class Comment(TimeStamp):
    response = models.ForeignKey(
        'Response', related_name='comments', on_delete=models.CASCADE)
    comment = models.CharField(max_length=100)
    created_by = models.ForeignKey('userauth.User', on_delete=models.CASCADE)
    activity = GenericRelation('Activity')
    spam = models.BooleanField(default=False)

    class Meta:
        ordering = ['_created_at']

    def __str__(self):
        return self.comment[:25]


class Activity(models.Model):
    FAVORITE = 'F'
    SEEN = 'S'
    UP_VOTE = 'U'
    DOWN_VOTE = 'D'
    ACTIVITY_TYPES = (
        (FAVORITE, 'Favorite'),
        (SEEN, 'Seen'),
        (UP_VOTE, 'Up Vote'),
        (DOWN_VOTE, 'Down Vote'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=1, choices=ACTIVITY_TYPES)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField()
    content_object = GenericForeignKey()

    class Meta:
        verbose_name_plural = "Activities"

    def __str__(self):
        return self.get_activity_type_display()
