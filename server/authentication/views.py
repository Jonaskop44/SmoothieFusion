from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from user.utils import create_user
from user.serializers import UserSerializer
from .serializers import LoginSerializer

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
        return Response(user.to_dict(), status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)