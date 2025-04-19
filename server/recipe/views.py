from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def get_all_recipes(request):
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_recipe_by_id(request, recipe_id):
    try:
        recipe = Recipe.objects.get(id=recipe_id)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Recipe.DoesNotExist:
        return Response({'error': 'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_recipe(request):
    data = request.data.copy()
    data['author'] = request.user.id
    serializer = RecipeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_recipe(request, recipe_id):
    try:
        recipe = Recipe.objects.get(id=recipe_id)
    except Recipe.DoesNotExist:
        return Response({"error": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if recipe.author.id != request.user.id:
        return Response({"error": "You do not have permission to edit this recipe"}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = RecipeSerializer(recipe, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_recipe(request, recipe_id):
    try:
        recipe = Recipe.objects.get(id=recipe_id)
    except Recipe.DoesNotExist:
        return Response({"error": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if recipe.author.id != request.user.id:
        return Response({"error": "You do not have permission to delete this recipe"}, status=status.HTTP_403_FORBIDDEN)
    
    recipe.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)