from rest_framework import serializers
from django.core.exceptions import ValidationError
import re
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        username = data.get('username', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()

        if not username:
            raise serializers.ValidationError("Username is required")
        if not email:
            raise serializers.ValidationError("Email is required")
        if not password:
            raise serializers.ValidationError("Password is required")

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("A user with this email already exists")

        if len(password) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        
        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError("Password must contain at least one uppercase letter")
        if not re.search(r'[a-z]', password): 
            raise serializers.ValidationError("Password must contain at least one lowercase letter")
        if not re.search(r'[0-9]', password): 
            raise serializers.ValidationError("Password must contain at least one digit")
        if not re.search(r'[\W_]', password): 
            raise serializers.ValidationError("Password must contain at least one special character")

        return data
