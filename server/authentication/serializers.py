from rest_framework import serializers
from .models import User
import bcrypt

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()

        if not email:
            raise serializers.ValidationError("Email is required")
        if not password:
            raise serializers.ValidationError("Password is required")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("A user with this email does not exist")

        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            raise serializers.ValidationError("Incorrect password")

        data['user'] = user
        return data
