"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import type { Recipe } from "@/types/recipe";
import { FC } from "react";
import { BACKEND_URL } from "@/lib/config";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const ingredientCount = recipe.ingredients.length;
  const truncatedInstructions =
    recipe.instructions.length > 100
      ? `${recipe.instructions.substring(0, 100)}...`
      : recipe.instructions;

  return (
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
        <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{truncatedInstructions}</p>
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
          as={Link}
          href={`/rezepte/${recipe.id}`}
          color="primary"
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          Rezept ansehen
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
