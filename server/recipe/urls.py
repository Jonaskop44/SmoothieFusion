from django.urls import path
from .views import get_all_recipes, get_recipe_by_id, create_recipe, update_recipe, delete_recipe

urlpatterns = [
    path('', get_all_recipes, name='get_all_recipes'),
    path('<int:recipe_id>/', get_recipe_by_id, name='get_recipe_by_id'),
    path('create/', create_recipe, name='create_recipe'),
    path('update/<int:recipe_id>/', update_recipe, name='update_recipe'),
    path('delete/<int:recipe_id>/', delete_recipe, name='delete_recipe'),
]
