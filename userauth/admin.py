from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin, UserCreationForm


class UserCreateForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('username', 'email',)


class NewUserAdmin(UserAdmin):
    model = User
    add_form = UserCreateForm
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2',),
        }),
    )

    fieldsets = (('Personal info', {
                  'fields': ('username', 'password', 'email', )}),
                 ('Permissions', {'fields': ('is_superuser', 'is_staff', 'blocked', 'is_active')}))


admin.site.register(User, NewUserAdmin)
