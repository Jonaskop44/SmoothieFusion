from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from user.utils import create_user
from user.serializers import UserSerializer
from .serializers import LoginSerializer
from .utils import generate_tokens, verify_token
import jwt
import datetime
import os
from user.models import User

JWT_SECRET = os.getenv('JWT_SECRET')

@api_view(['POST'])
def signup(request):
    data = request.data
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        try:
            user = create_user(username=username, email=email, password=password)
            return Response(user.to_dict(), status=status.HTTP_201_CREATED)
        except ValidationError as error:
            return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data["user"]
        tokens = generate_tokens(user)
        return Response({
            'user': user.to_dict(),
            **tokens
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def refresh_token(request):
    refresh_token = request.headers.get('Authorization').split(' ')[1]
    if not refresh_token:
        return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        payload = verify_token(refresh_token, token_type="refresh")
        user_id = payload["user_id"]
        user = User.objects.get(id=user_id)
        tokens = generate_tokens(user)
        return Response(tokens, status=status.HTTP_200_OK)
    except jwt.ExpiredSignatureError:
        return Response({"error": "Refresh token expired"}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidTokenError as e:
        return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def verify_access_token(request):
    access_token = request.headers.get('Authorization').split(' ')[1]
    if not access_token:
        return Response({"error": "Access token is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        payload = verify_token(access_token, token_type="access")
        return Response(payload, status=status.HTTP_200_OK)
    except jwt.ExpiredSignatureError:
        return Response({"valid": False, "error": "Token expired"}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidTokenError as e:
        return Response({"valid": False, "error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
