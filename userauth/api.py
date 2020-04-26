from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK,
    HTTP_401_UNAUTHORIZED
)
from django.contrib.auth import get_user_model
from .serializers import LoginSerializer, ChangePasswordSerializer, UserRegisterSerializer
from rest_framework import exceptions
from django.db.models import Q

User = get_user_model()


class Login(APIView):
    permission_classes = [AllowAny]

    def get_payload(self, refresh, user):
        data = {
            'token': str(refresh.access_token),
            'id': user.id,
            'user': user.username
        }
        return data

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        login_id = serializer.data.get('login_id')
        password = serializer.data.get('password')
        user = User.objects.filter(
            Q(username__iexact=login_id) | Q(email__iexact=login_id)).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response(
                self.get_payload(refresh, user),
                content_type="application/json",
                status=HTTP_200_OK
            )
        return Response(
            {'error': 'Invalid Credentials'},
            content_type="application/json",
            status=HTTP_401_UNAUTHORIZED
        )


class Register(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer
    queryset = User.objects.all()


class Change_Password(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def put(self, request):
        user = request.user
        s = self.serializer_class(data=request.data)
        s.is_valid(raise_exception=True)
        data = s.validated_data
        if not user.check_password(data['old_password']):
            raise exceptions.ValidationError(
                {"old_password": ["Provide correct present password.", ]})
        if data['new_password'] != data['new_password1']:
            raise exceptions.ValidationError(
                {"new_password1": ["Confirm password doesn't matched.", ]})
        user.set_password(data['new_password'])
        user.save()
        return Response({"message": "Password updated successfully."})
