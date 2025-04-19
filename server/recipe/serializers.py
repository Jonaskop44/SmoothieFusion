from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'ingredients', 'instructions', 'image', 'author', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        name = data.get('name')
        ingredients = data.get('ingredients')
        instructions = data.get('instructions')
        image = data.get('image')

        if not name or len(name.strip()) < 3:
            raise serializers.ValidationError({'name': 'Name must be at least 3 characters long.'})

        if not ingredients or len(ingredients.strip()) < 10:
            raise serializers.ValidationError({'ingredients': 'Please provide more detailed ingredients.'})

        if not instructions or len(instructions.strip()) < 10:
            raise serializers.ValidationError({'instructions': 'Please provide more detailed instructions.'})

        if image and not image.name.lower().endswith(('.jpg', '.jpeg', '.png')):
            raise serializers.ValidationError({'image': 'Only JPG and PNG files are allowed.'})
        
        if 'image' in data and data['image']:
            if data['image'].size > 10 * 1024 * 1024:
                raise serializers.ValidationError({'image': 'Image size must be less than 10MB.'})

        return data
