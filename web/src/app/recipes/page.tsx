"use client";

import { useState, useEffect } from "react";
import type { Recipe, Unit } from "@/types/recipe";
import RecipeGrid from "@/components/Recipes/Grid";
import RecipeFilters from "@/components/Recipes/Filters";
import RecipeSearch from "@/components/Recipes/Search";
import { recipeStore } from "@/data/recipeStore";

const RecipesPage = () => {
  const { recipes } = recipeStore();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const calculateAverageRating = (recipe: Recipe) => {
    if (recipe.reviews.length === 0) return 0;
    const sum = recipe.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    return sum / recipe.reviews.length;
  };

  useEffect(() => {
    let result = [...recipes];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(query) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.name.toLowerCase().includes(query)
          )
      );
    }

    if (selectedIngredients.length > 0) {
      result = result.filter((recipe) =>
        selectedIngredients.every((selectedIngredient) =>
          recipe.ingredients.some(
            (ingredient) =>
              ingredient.name.toLowerCase() === selectedIngredient.toLowerCase()
          )
        )
      );
    }

    if (selectedUnits.length > 0) {
      result = result.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
          selectedUnits.includes(ingredient.unit)
        )
      );
    }

    if (selectedRating !== null) {
      result = result.filter((recipe) => {
        const averageRating = calculateAverageRating(recipe);
        return averageRating >= selectedRating;
      });
    }

    setFilteredRecipes(result);
  }, [
    recipes,
    searchQuery,
    selectedIngredients,
    selectedUnits,
    selectedRating,
  ]);

  const getAllIngredients = () => {
    const ingredientSet = new Set<string>();
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        ingredientSet.add(ingredient.name);
      });
    });
    return Array.from(ingredientSet).sort();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleUnitToggle = (unit: Unit) => {
    setSelectedUnits((prev) =>
      prev.includes(unit) ? prev.filter((u) => u !== unit) : [...prev, unit]
    );
  };

  const handleRatingChange = (rating: number | null) => {
    setSelectedRating(rating);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedIngredients([]);
    setSelectedUnits([]);
    setSelectedRating(null);
  };

  const allIngredients = getAllIngredients();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="py-10 md:py-16 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Smoothie-Rezepte
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Entdecke köstliche und gesunde Smoothie-Rezepte für jeden
                Geschmack und jede Gelegenheit.
              </p>
            </div>

            <div className="mb-8">
              <RecipeSearch onSearch={handleSearch} searchQuery={searchQuery} />
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <RecipeFilters
                  ingredients={allIngredients}
                  selectedIngredients={selectedIngredients}
                  onIngredientToggle={handleIngredientToggle}
                  selectedUnits={selectedUnits}
                  onUnitToggle={handleUnitToggle}
                  selectedRating={selectedRating}
                  onRatingChange={handleRatingChange}
                  onClearFilters={clearFilters}
                />
              </div>
              <div className="md:col-span-3">
                <RecipeGrid recipes={filteredRecipes} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecipesPage;
