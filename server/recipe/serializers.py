from rest_framework import serializers
from .models import Recipe, Ingredient, Review

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'amount', 'unit']
        read_only_fields = ['id']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'name', 'description', 'rating', 'recipe', 'author', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        if not (0 <= data.get('rating', 0) <= 5):
            raise serializers.ValidationError({'rating': 'Rating must be between 0 and 5.'})
        return data

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'ingredients', 'instructions', 'image', 'author', 'reviews', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        name = data.get('name')
        ingredients = data.get('ingredients')
        instructions = data.get('instructions')
        image = data.get('image')

        if not name or len(name.strip()) < 3:
            raise serializers.ValidationError({'name': 'Name must be at least 3 characters long.'})

        if self.partial is False and (not ingredients or len(ingredients) < 1):
            raise serializers.ValidationError({'ingredients': 'Please provide at least one ingredient.'})

        if not instructions or len(instructions.strip()) < 10:
            raise serializers.ValidationError({'instructions': 'Please provide more detailed instructions.'})

        if image and not image.name.lower().endswith(('.jpg', '.jpeg', '.png')):
            raise serializers.ValidationError({'image': 'Only JPG and PNG files are allowed.'})
        
        if 'image' in data and data['image']:
            if data['image'].size > 10 * 1024 * 1024:
                raise serializers.ValidationError({'image': 'Image size must be less than 10MB.'})

        return data
    
    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)
        
        return recipe
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.instructions = validated_data.get('instructions', instance.instructions)
        instance.image = validated_data.get('image', instance.image)

        ingredients_data = validated_data.get('ingredients', None)
        if ingredients_data:
            instance.ingredients.all().delete()
            for ingredient_data in ingredients_data:
                Ingredient.objects.create(recipe=instance, **ingredient_data)

        instance.save()
        return instance