"use client";

import { Icon } from "@iconify/react";
import { Checkbox, Button } from "@heroui/react";
import { FC } from "react";

interface RecipeFiltersProps {
  ingredients: string[];
  selectedIngredients: string[];
  onIngredientToggle: (ingredient: string) => void;
  onClearFilters: () => void;
}

const RecipeFilters: FC<RecipeFiltersProps> = ({
  ingredients,
  selectedIngredients,
  onIngredientToggle,
  onClearFilters,
}) => {
  const hasSelectedFilters = selectedIngredients.length > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
        {hasSelectedFilters && (
          <Button
            size="sm"
            variant="light"
            className="text-emerald-600 hover:text-emerald-700"
            onPress={onClearFilters}
          >
            Zurücksetzen
          </Button>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-800 mb-2">Zutaten</h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {ingredients.map((ingredient) => (
            <div key={ingredient} className="flex items-center">
              <Checkbox
                isSelected={selectedIngredients.includes(ingredient)}
                onValueChange={() => onIngredientToggle(ingredient)}
                color="primary"
                classNames={{
                  base: "border-gray-300",
                }}
              >
                <span className="text-sm text-gray-700">{ingredient}</span>
              </Checkbox>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <Icon icon="solar:info-circle-bold" className="mr-2 h-4 w-4" />
          <p>Wähle Zutaten, um die Rezepte zu filtern</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;
