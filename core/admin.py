from django.contrib import admin
from .models import Post, Response, Comment, Activity

admin.site.register(Post)
admin.site.register(Response)
admin.site.register(Comment)
admin.site.register(Activity)
