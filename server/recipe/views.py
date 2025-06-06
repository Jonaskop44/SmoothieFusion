import os
import uuid
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Recipe
from .serializers import RecipeSerializer, ReviewSerializer
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.parsers import MultiPartParser, FormParser
from user.utils import get_user_by_id

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

        #Replace the author ID with the user object
        author = get_user_by_id(recipe.author.id)
        recipe_data = serializer.data
        recipe_data['author'] = {
            'username': author.username,
        }

        #Replace the author ID in the reviews with the user object
        for review in recipe_data['reviews']:
            author = get_user_by_id(review['author'])
            review['author'] = {
                'username': author.username,
            }

        return Response(recipe_data, status=status.HTTP_200_OK)
    except Recipe.DoesNotExist:
        return Response({'error': 'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_recipe(request):
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
        image = request.FILES['image']
        extension = os.path.splitext(image.name)[1]
        random_name = f"{request.user.id}-{uuid.uuid4().hex}{extension}"
        image.name = random_name
        data['image'] = image

    serializer = RecipeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_recipe(request, recipe_id):
    try:
        recipe = Recipe.objects.get(id=recipe_id)
    except Recipe.DoesNotExist:
        return Response({"error": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if recipe.author.id != request.user.id:
        return Response({"error": "You do not have permission to edit this recipe"}, status=status.HTTP_403_FORBIDDEN)

    data = {
        'name': request.data.get('name', recipe.name),
        'instructions': request.data.get('instructions', recipe.instructions),
        'author': request.user.id,
    }

    raw_ingredients = request.data.get('ingredients')
    if raw_ingredients:
        if isinstance(raw_ingredients, list):
            raw_ingredients = raw_ingredients[0]
        try:
            data['ingredients'] = json.loads(raw_ingredients)
        except (TypeError, json.JSONDecodeError):
            return Response({'ingredients': 'Invalid JSON format'}, status=status.HTTP_400_BAD_REQUEST)

    if 'image' in request.FILES:
        image = request.FILES['image']
        extension = os.path.splitext(image.name)[1]
        random_name = f"{request.user.id}-{uuid.uuid4().hex}{extension}"
        image.name = random_name
        data['image'] = image

    serializer = RecipeSerializer(recipe, data=data, partial=True)
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(request, recipe_id):
    try:
        recipe = Recipe.objects.get(id=recipe_id)
    except Recipe.DoesNotExist:
        return Response({"error": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND)

    data = {
        'name': request.data.get('name'),
        'description': request.data.get('description'),
        'rating': request.data.get('rating'),
        'recipe': recipe.id,
        'author': request.user.id,
    }

    serializer = ReviewSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)