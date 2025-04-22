"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useState } from "react";
import { userStore } from "@/data/userStore";
import AuthModal, { AuthVariant } from "../UI/AuthModal";
import { toast } from "sonner";
import CreateRecipeModal from "../Recipes/CreateRecipeModal";

const EmptyRecipeState = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreateRecipeModalOpen, setIsCreateRecipeModalOpen] = useState(false);
  const [authVariant, setAuthVariant] = useState<AuthVariant>("LOGIN");
  const { isLoggedIn } = userStore();

  const handleCreateRecipe = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      toast.info("Bitte melde dich an, um ein Rezept zu erstellen.");
      return;
    }
    setIsCreateRecipeModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center p-12 border-2 border-dashed border-gray-300 rounded-xl"
      >
        <div className="flex justify-center mb-4">
          <Icon
            icon="solar:add-circle-bold"
            className="h-12 w-12 text-gray-400"
          />
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          Noch keine Rezepte vorhanden
        </h3>
        <p className="text-gray-500 mb-6">
          Sei der Erste, der ein köstliches Smoothie-Rezept erstellt!
        </p>
        <Button
          onPress={handleCreateRecipe}
          color="primary"
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Erstes Rezept erstellen
        </Button>
      </motion.div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onOpenChange={() => setIsAuthModalOpen(!isAuthModalOpen)}
        variant={authVariant}
        onVariantChange={setAuthVariant}
      />
      <CreateRecipeModal
        isOpen={isCreateRecipeModalOpen}
        onOpenChange={setIsCreateRecipeModalOpen}
      />
    </>
  );
};

export default EmptyRecipeState;
