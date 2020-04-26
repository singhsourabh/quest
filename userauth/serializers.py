from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    login_id = serializers.CharField(required=True, error_messages={
        'required': 'Must include username or email.'})
    password = serializers.CharField(required=True, error_messages={
                                     'required': 'Must include password.'})


class UserRegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(required=True, error_messages={
                                      'required': 'Must confirm password.'}, write_only=True)
    token = serializers.SerializerMethodField('token_', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password',
                  'password1', 'gender', 'token']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        passwrd = data.get('password')
        confirm_passwrd = data.pop('password1')
        if passwrd != confirm_passwrd:
            raise serializers.ValidationError("Both password should match.")
        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        new_user = User.objects.create_user(**validated_data)
        new_user.set_password(password)
        new_user.save()
        return new_user

    def token_(self, obj):
        return str(RefreshToken.for_user(obj).access_token)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, error_messages={
                                         'required': 'Must include previous password.'})
    new_password = serializers.CharField(required=True, error_messages={
                                         'required': 'Must include new password.'})
    new_password1 = serializers.CharField(required=True, error_messages={
                                          'required': 'Must confirm new password.'})
