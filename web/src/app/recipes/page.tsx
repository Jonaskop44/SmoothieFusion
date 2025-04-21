"use client";

import { useState, useEffect } from "react";
import type { Recipe } from "@/types/recipe";
import RecipeGrid from "@/components/Recipes/Grid";
import RecipeFilters from "@/components/Recipes/Filters";
import RecipeSearch from "@/components/Recipes/Search";
import { recipeStore } from "@/data/recipeStore";

const RecipesPage = () => {
  const { recipes } = recipeStore();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  //Effect to filter recipes based on search term and selected ingredients
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

    //filter by selected ingredients
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

    setFilteredRecipes(result);
  }, [recipes, searchQuery, selectedIngredients]);

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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedIngredients([]);
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
