from django.db import models
from django.utils import timezone
from user.models import User

class Unit(models.TextChoices):
    PIECE = 'pieces', 'Piece'
    GRAM = 'g', 'Gram'
    KILOGRAM = 'kg', 'Kilogram'
    MILLILITER = 'ml', 'Milliliter'
    LITER = 'l', 'Liter'
    TEASPOON = 'tsp', 'Teaspoon'
    TABLESPOON = 'tbsp', 'Tablespoon'
    
class Recipe(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    instructions = models.TextField()
    image = models.ImageField(upload_to='recipes/', null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'instructions': self.instructions,
            'ingredients': [ingredient.to_dict() for ingredient in self.ingredients.all()],
            'image': self.image.url if self.image else None,
            'author': self.author.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
class Ingredient(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    amount = models.FloatField()
    unit = models.CharField(max_length=10, choices=Unit.choices)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')

    def __str__(self):
        return self.name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'unit': self.unit,
            'recipe': self.recipe.id,
        }