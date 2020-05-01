import uuid
from django.db import models
from django.utils import timezone
from django.contrib.humanize import templatetags
from django.contrib.humanize.templatetags.humanize import naturaltime, intword
import unicodedata


class TimeStamp(models.Model):
    """
    TimeStamp abstract model for storing basic timestamps
    """
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    _created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    _modified_at = models.DateTimeField(db_index=True, auto_now=True)

    class Meta:
        abstract = True

    @property
    def created_at(self):
        time_ = str(naturaltime(self._created_at))
        return unicodedata.normalize("NFKD", time_)
