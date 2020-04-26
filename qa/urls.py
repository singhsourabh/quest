from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from userauth import api as auth_api

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="frontend/index.html")),
    path('api/login', auth_api.Login.as_view()),
    path('api/register', auth_api.Register.as_view()),
    path('api/change-password', auth_api.Change_Password.as_view()),
]
