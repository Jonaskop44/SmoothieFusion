"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button, Pagination } from "@heroui/react";
import type { Recipe } from "@/types/recipe";
import EmptyRecipeState from "@/components/UI/EmptyRecipeState";
import { BACKEND_URL } from "@/lib/config";
import RecipeModal from "../Recipes/RecipeDetailsModal";

interface RecipeCarouselProps {
  recipes: Recipe[];
  hasRecipes: boolean;
}

const RecipeCarousel: FC<RecipeCarouselProps> = ({ recipes, hasRecipes }) => {
  const [currentRecipe, setCurrentRecipe] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const calculateAverageRating = (recipe: Recipe) => {
    if (recipe.reviews.length === 0) return 0;
    const sum = recipe.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    return sum / recipe.reviews.length;
  };

  return (
    <>
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
              Entdecke die frischesten Kreationen unserer Community und lass
              dich inspirieren.
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
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {recipes[currentRecipe]?.name}
                      </h3>
                      <p className="text-lg text-gray-600">
                        {recipes[currentRecipe]?.instructions.substring(0, 120)}
                        ...
                      </p>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const averageRating = calculateAverageRating(
                              recipes[currentRecipe]
                            );
                            return (
                              <Icon
                                key={star}
                                icon={
                                  star <= Math.round(averageRating)
                                    ? "solar:star-bold"
                                    : "solar:star-linear"
                                }
                                className={`h-5 w-5 ${
                                  star <= Math.round(averageRating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            );
                          })}
                        </div>
                        <span className="text-sm text-gray-500">
                          {calculateAverageRating(
                            recipes[currentRecipe]
                          ).toFixed(1)}{" "}
                          ({recipes[currentRecipe]?.reviews.length}{" "}
                          {recipes[currentRecipe]?.reviews.length === 1
                            ? "Bewertung"
                            : "Bewertungen"}
                          )
                        </span>
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
                                <Icon
                                  icon="solar:alt-arrow-right-bold"
                                  className="h-4 w-4 text-emerald-500 mr-2"
                                />
                                {ingredient.amount} {ingredient.unit}{" "}
                                {ingredient.name}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <Button
                        color="primary"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onPress={() => setIsModalOpen(true)}
                      >
                        Vollständiges Rezept
                      </Button>
                    </div>
                    <div className="relative">
                      <Image
                        src={`${BACKEND_URL}${recipes[currentRecipe]?.image}`}
                        alt={recipes[currentRecipe]?.name}
                        width={600}
                        height={400}
                        className="rounded-xl shadow-lg"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center mt-8">
                <Pagination
                  loop
                  showControls
                  color="primary"
                  initialPage={currentRecipe + 1}
                  page={currentRecipe + 1}
                  total={recipes.length}
                  onChange={(page) => setCurrentRecipe(page - 1)}
                  classNames={{
                    item: "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50",
                    cursor: "bg-emerald-600 text-white",
                  }}
                />
              </div>
            </div>
          ) : (
            <EmptyRecipeState />
          )}
        </div>
      </section>
      {isModalOpen && recipes[currentRecipe] && (
        <RecipeModal
          recipe={recipes[currentRecipe]}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </>
  );
};

export default RecipeCarousel;
