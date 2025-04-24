"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import type { Recipe } from "@/types/recipe";
import RecipeModal from "./RecipeDetailsModal";
import { BACKEND_URL } from "@/lib/config";
import useFormattedDate from "@/hooks/helper";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formatDate = useFormattedDate();

  const ingredientCount = recipe.ingredients.length;
  const truncatedInstructions =
    recipe.instructions.length > 100
      ? `${recipe.instructions.substring(0, 100)}...`
      : recipe.instructions;

  const calculateAverageRating = () => {
    if (recipe.reviews.length === 0) return 0;
    const sum = recipe.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    return sum / recipe.reviews.length;
  };

  const averageRating = calculateAverageRating();
  const reviewCount = recipe.reviews.length;

  return (
    <>
      <Card className="h-full">
        <CardHeader className="p-0 overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={`${BACKEND_URL}${recipe.image}`}
              alt={recipe.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardBody className="p-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {recipe.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{truncatedInstructions}</p>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  icon={
                    star <= Math.round(averageRating)
                      ? "solar:star-bold"
                      : "solar:star-linear"
                  }
                  className={`h-4 w-4 ${
                    star <= Math.round(averageRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {averageRating.toFixed(1)} ({reviewCount}{" "}
              {reviewCount === 1 ? "Bewertung" : "Bewertungen"})
            </span>
          </div>

          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Icon icon="solar:calendar-bold" className="mr-1 h-4 w-4" />
            <span>{formatDate(recipe.created_at)}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Icon icon="solar:list-bold" className="mr-1 h-4 w-4" />
            <span>{ingredientCount} Zutaten</span>
          </div>
        </CardBody>
        <CardFooter className="p-4 pt-0">
          <Button
            color="primary"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onPress={() => setIsModalOpen(true)}
          >
            Rezept ansehen
          </Button>
        </CardFooter>
      </Card>

      <RecipeModal
        recipe={recipe}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default RecipeCard;
