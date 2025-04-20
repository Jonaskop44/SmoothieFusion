"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/types/recipe";
import EmptyRecipeState from "@/components/ui/EmptyRecipeState";

interface RecipeCarouselProps {
  recipes: Recipe[];
  hasRecipes: boolean;
}

export default function RecipeCarousel({
  recipes,
  hasRecipes,
}: RecipeCarouselProps) {
  const [currentRecipe, setCurrentRecipe] = useState(0);

  const nextRecipe = () => {
    setCurrentRecipe((prev) => (prev + 1) % recipes.length);
  };

  const prevRecipe = () => {
    setCurrentRecipe((prev) => (prev - 1 + recipes.length) % recipes.length);
  };

  // Funktion zum Formatieren der Zutatenmenge und Einheit
  const formatIngredient = (amount: number, unit: string) => {
    return `${amount} ${unit}`;
  };

  // Funktion zum Berechnen der durchschnittlichen Bewertung
  const getAverageRating = (recipe: Recipe) => {
    if (!recipe.reviews || recipe.reviews.length === 0) return 0;
    const sum = recipe.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / recipe.reviews.length;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Neueste Rezepte
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entdecke die frischesten Kreationen unserer Community und lass dich
            inspirieren.
          </p>
        </motion.div>

        {hasRecipes ? (
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRecipe}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {recipes[currentRecipe]?.name}
                      </h3>
                      <div className="flex items-center mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i <
                              Math.round(
                                getAverageRating(recipes[currentRecipe])
                              )
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          ({recipes[currentRecipe]?.reviews.length} Bewertungen)
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-gray-800">
                        Zutaten:
                      </h4>
                      <ul className="space-y-2">
                        {recipes[currentRecipe]?.ingredients.map(
                          (ingredient) => (
                            <li
                              key={ingredient.id}
                              className="flex items-center text-gray-700"
                            >
                              <ChevronRight className="h-4 w-4 text-emerald-500 mr-2" />
                              {ingredient.name} (
                              {formatIngredient(
                                ingredient.amount,
                                ingredient.unit
                              )}
                              )
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-semibold text-gray-800">
                        Zubereitung:
                      </h4>
                      <p className="text-gray-700">
                        {recipes[currentRecipe]?.instructions}
                      </p>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Vollständiges Rezept
                    </Button>
                  </div>
                  <div className="relative">
                    <Image
                      src={recipes[currentRecipe]?.image || "/placeholder.svg"}
                      alt={recipes[currentRecipe]?.name}
                      width={600}
                      height={400}
                      className="rounded-xl shadow-lg"
                    />
                    <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow">
                      {new Date(
                        recipes[currentRecipe]?.created_at
                      ).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevRecipe}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Vorheriges Rezept</span>
              </Button>
              {recipes.map((_, index) => (
                <Button
                  key={index}
                  variant={index === currentRecipe ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentRecipe(index)}
                  className={`w-10 h-10 rounded-full ${
                    index === currentRecipe
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : ""
                  }`}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={nextRecipe}
                className="rounded-full"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Nächstes Rezept</span>
              </Button>
            </div>
          </div>
        ) : (
          <EmptyRecipeState />
        )}
      </div>
    </section>
  );
}
