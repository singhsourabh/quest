import uuid
from django.db import models
from django.utils import timezone


class TimeStamp(models.Model):
    """
    TimeStamp abstract model for storing basic timestamps
    """
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    deleted_at = models.DateTimeField(
        default=None, null=True, blank=True, db_index=True)
    modified_at = models.DateTimeField(db_index=True, auto_now=True)

    class Meta:
        abstract = True
