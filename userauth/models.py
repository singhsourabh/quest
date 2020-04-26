from django.db import models
from django.contrib.auth.models import AbstractUser
from utils.base import TimeStamp


class User(AbstractUser, TimeStamp):
    # todo: avatar
    email = models.EmailField(unique=True)
    blocked = models.BooleanField(default=False)

    def __str__(self):
        return str(self.username)
