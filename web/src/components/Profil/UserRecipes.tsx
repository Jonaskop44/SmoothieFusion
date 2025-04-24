"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import Image from "next/image";
import type { Recipe } from "@/types/recipe";
import RecipeDetailsModal from "../Recipes/RecipeDetailsModal";
import DeleteRecipeConfirmation from "../Recipes/DeleteRecipeConfirmationModal";
import CreateRecipeModal from "../Recipes/CreateRecipeModal";
import { BACKEND_URL } from "@/lib/config";
import { recipeStore } from "@/data/recipeStore";
import { toast } from "sonner";
import useFormattedDate from "@/hooks/helper";

interface UserRecipesProps {
  recipes: Recipe[];
}

const UserRecipes: FC<UserRecipesProps> = ({ recipes }) => {
  const [viewRecipe, setViewRecipe] = useState<Recipe | null>(null);
  const [editRecipe, setEditRecipe] = useState<Recipe | null>(null);
  const [createRecipe, setCreateRecipe] = useState<boolean | null>(null);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { deleteRecipe } = recipeStore();
  const formatDate = useFormattedDate();

  const calculateAverageRating = () => {
    const allReviews = recipes.flatMap((recipe) => recipe.reviews ?? []);
    if (allReviews.length === 0) return 0;

    const sum = allReviews.reduce((total, review) => total + review.rating, 0);
    return sum / allReviews.length;
  };

  const averageRating = calculateAverageRating();
  const reviewCount = recipes.flatMap((r) => r.reviews ?? []).length;

  // const handleRecipeUpdate = (updatedRecipe: Recipe) => {
  //   onRecipeUpdate(updatedRecipe);
  //   setIsEditModalOpen(false);
  // };

  const handleRecipeDelete = () => {
    if (recipeToDelete) {
      deleteRecipe(recipeToDelete.id);
      setIsDeleteModalOpen(false);
      toast.success("Rezept erfolgreich gelöscht!");
    }
  };

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Meine Rezepte</h2>
        <Button
          color="primary"
          className="bg-emerald-600 hover:bg-emerald-700"
          startContent={
            <Icon icon="solar:add-circle-bold" className="h-5 w-5" />
          }
          onPress={() => {
            setCreateRecipe(true);
            setIsCreateModalOpen(true);
          }}
        >
          Neues Rezept
        </Button>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
          <Icon
            icon="solar:bowl-spoon-bold"
            className="h-16 w-16 text-gray-300 mx-auto mb-4"
          />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Noch keine Rezepte erstellt
          </h3>
          <p className="text-gray-500 mb-6">
            Erstelle dein erstes Smoothie-Rezept und teile es mit der Community!
          </p>
          <Button
            color="primary"
            className="bg-emerald-600 hover:bg-emerald-700"
            onPress={() => {
              setCreateRecipe(true);
              setIsCreateModalOpen(true);
            }}
          >
            Erstes Rezept erstellen
          </Button>
        </div>
      ) : (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recipes.map((recipe) => (
            <motion.div key={recipe.id} variants={itemVariants}>
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
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {recipe.name}
                    </h3>
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <Icon
                            icon="solar:menu-dots-bold"
                            className="h-5 w-5 text-gray-500"
                          />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Rezeptaktionen">
                        <DropdownItem
                          key="view"
                          startContent={
                            <Icon icon="solar:eye-bold" className="h-4 w-4" />
                          }
                          onPress={() => {
                            setViewRecipe(recipe);
                            setIsDetailModalOpen(true);
                          }}
                        >
                          Ansehen
                        </DropdownItem>
                        <DropdownItem
                          key="edit"
                          startContent={
                            <Icon icon="solar:pen-bold" className="h-4 w-4" />
                          }
                          onPress={() => {
                            setEditRecipe(recipe);
                            setIsEditModalOpen(true);
                          }}
                        >
                          Bearbeiten
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          startContent={
                            <Icon
                              icon="solar:trash-bin-trash-bold"
                              className="h-4 w-4"
                            />
                          }
                          onPress={() => {
                            setRecipeToDelete(recipe);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          Löschen
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {recipe.instructions.length > 100
                      ? `${recipe.instructions.substring(0, 100)}...`
                      : recipe.instructions}
                  </p>

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
                    <span>{recipe.ingredients.length} Zutaten</span>
                  </div>
                </CardBody>
                <CardFooter className="p-4 pt-0">
                  <Button
                    color="primary"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onPress={() => {
                      setViewRecipe(recipe);
                      setIsDetailModalOpen(true);
                    }}
                  >
                    Rezept ansehen
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modals */}
      {viewRecipe && (
        <RecipeDetailsModal
          recipe={viewRecipe}
          isOpen={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
        />
      )}

      {/* {editRecipe && (
        <EditRecipeModal
          recipe={editRecipe}
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSave={handleRecipeUpdate}
        />
      )} */}

      {recipeToDelete && (
        <DeleteRecipeConfirmation
          recipe={recipeToDelete}
          isOpen={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirm={handleRecipeDelete}
        />
      )}

      {createRecipe && (
        <CreateRecipeModal
          isOpen={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />
      )}
    </div>
  );
};

export default UserRecipes;