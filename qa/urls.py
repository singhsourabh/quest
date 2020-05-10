from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from userauth import api as auth_api
# from core import api as core_api

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login', auth_api.Login.as_view()),
    path('api/register', auth_api.Register.as_view()),
    path('api/change-password', auth_api.Change_Password.as_view()),
    path('api/user', auth_api.UserProfile.as_view()),
#     path('api/posts', core_api.PostList.as_view()),
#     path('api/post/<uuid:pk>', core_api.PostDetails.as_view()),
#     path('api/responses/<uuid:post_id>', core_api.ResponseList.as_view()),
#     path('api/response/<uuid:post_id>/<uuid:pk>',
#          core_api.ResponseDetails.as_view()),
#     path('api/comments/<uuid:response_id>', core_api.CommentList.as_view()),
#     path('api/comment/<uuid:response_id>/<uuid:pk>',
#          core_api.CommentDetails.as_view()),
#     path('api/updown', core_api.UpDownToggle.as_view()),
    path('', TemplateView.as_view(template_name="frontend/index.html")),
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="frontend/index.html")),
]
