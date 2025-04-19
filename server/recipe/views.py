from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.parsers import MultiPartParser, FormParser

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
@parser_classes([MultiPartParser, FormParser])
def create_recipe(request):
    print(f"Received data: {request.data}")

    data = {
        'name': request.data.get('name'),
        'instructions': request.data.get('instructions'),
        'author': request.user.id,
    }

    raw_ingredients = request.data.get('ingredients')
    if isinstance(raw_ingredients, list):
        raw_ingredients = raw_ingredients[0]

    try:
        data['ingredients'] = json.loads(raw_ingredients)
    except (TypeError, json.JSONDecodeError):
        return Response({'ingredients': 'Invalid JSON format'}, status=status.HTTP_400_BAD_REQUEST)

    if 'image' in request.FILES:
        data['image'] = request.FILES['image']

    serializer = RecipeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    print("Serializer errors:", serializer.errors)
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