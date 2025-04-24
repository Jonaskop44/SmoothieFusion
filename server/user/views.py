from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from user.utils import get_user_by_id

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = get_user_by_id(request.user.id)
    if user:
        serializer = UserSerializer(user)
        serializer.data.pop('password', None)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)