"use client";

import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyRecipeState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-center p-12 border-2 border-dashed border-gray-300 rounded-xl"
    >
      <div className="flex justify-center mb-4">
        <PlusCircle className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-700 mb-2">
        Noch keine Rezepte vorhanden
      </h3>
      <p className="text-gray-500 mb-6">
        Sei der Erste, der ein köstliches Smoothie-Rezept erstellt!
      </p>
      <Button className="bg-emerald-600 hover:bg-emerald-700">
        Erstes Rezept erstellen
      </Button>
    </motion.div>
  );
};

export default EmptyRecipeState;
