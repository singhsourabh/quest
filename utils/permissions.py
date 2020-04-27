from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwner(BasePermission):
    message = "You can't perform this operation."

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if obj.created_by.id == request.user.id:
            return True
        return False


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        print(SAFE_METHODS)
        return request.method in SAFE_METHODS
