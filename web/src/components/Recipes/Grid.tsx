"use client";

import { motion } from "framer-motion";
import type { Recipe } from "@/types/recipe";
import EmptyRecipeState from "../UI/EmptyRecipeState";
import RecipeCard from "./Card";
import { FC } from "react";

interface RecipeGridProps {
  recipes: Recipe[];
}

const RecipeGrid: FC<RecipeGridProps> = ({ recipes }) => {
  const hasRecipes = recipes.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (!hasRecipes) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <EmptyRecipeState />
      </div>
    );
  }

  return (
    <motion.div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {recipes.map((recipe) => (
        <motion.div key={recipe.id} variants={itemVariants}>
          <RecipeCard recipe={recipe} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RecipeGrid;
