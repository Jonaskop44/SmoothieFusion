"use client";

import { FC, useState } from "react";
import { Icon } from "@iconify/react";
import {
  Checkbox,
  Button,
  Input,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import { Unit } from "@/types/recipe";

interface RecipeFiltersProps {
  ingredients: string[];
  selectedIngredients: string[];
  onIngredientToggle: (ingredient: string) => void;
  onClearFilters: () => void;
  selectedUnits: Unit[];
  onUnitToggle: (unit: Unit) => void;
}

const RecipeFilters: FC<RecipeFiltersProps> = ({
  ingredients,
  selectedIngredients,
  onIngredientToggle,
  onClearFilters,
  selectedUnits,
  onUnitToggle,
}) => {
  const hasSelectedFilters =
    selectedIngredients.length > 0 || selectedUnits.length > 0;
  const [searchIngredient, setSearchIngredient] = useState("");

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchIngredient.toLowerCase())
  );

  const unitGroups = {
    [Unit.PIECE]: "Stück",
    [Unit.GRAM]: "Gramm",
    [Unit.KILOGRAM]: "Kilogramm",
    [Unit.MILLILITER]: "Milliliter",
    [Unit.LITER]: "Liter",
    [Unit.TEASPOON]: "Teelöffel",
    [Unit.TABLESPOON]: "Esslöffel",
  };

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

      <Accordion>
        <AccordionItem
          key="ingredients"
          aria-label="Zutaten"
          title={
            <div className="flex items-center">
              <Icon
                icon="solar:bowl-spoon-bold"
                className="mr-2 h-5 w-5 text-emerald-500"
              />
              <span className="font-medium">Zutaten</span>
            </div>
          }
          subtitle={
            selectedIngredients.length > 0
              ? `${selectedIngredients.length} ausgewählt`
              : undefined
          }
          className="px-0"
        >
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Zutat suchen..."
              value={searchIngredient}
              onChange={(e) => setSearchIngredient(e.target.value)}
              size="sm"
              startContent={
                <Icon
                  icon="solar:magnifer-linear"
                  className="text-gray-400 h-4 w-4"
                />
              }
              classNames={{
                inputWrapper: "border-gray-300",
              }}
            />
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((ingredient) => (
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
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-2">
                Keine Zutaten gefunden
              </p>
            )}
          </div>
        </AccordionItem>

        <AccordionItem
          key="units"
          aria-label="Einheiten"
          title={
            <div className="flex items-center">
              <Icon
                icon="solar:ruler-pen-bold"
                className="mr-2 h-5 w-5 text-emerald-500"
              />
              <span className="font-medium">Einheiten</span>
            </div>
          }
          subtitle={
            selectedUnits.length > 0
              ? `${selectedUnits.length} ausgewählt`
              : undefined
          }
          className="px-0"
        >
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {Object.entries(unitGroups).map(([unit, label]) => (
              <div key={unit} className="flex items-center">
                <Checkbox
                  isSelected={selectedUnits.includes(unit as Unit)}
                  onValueChange={() => onUnitToggle(unit as Unit)}
                  color="primary"
                  classNames={{
                    base: "border-gray-300",
                  }}
                >
                  <span className="text-sm text-gray-700">{label}</span>
                </Checkbox>
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>

      <div className="pt-4 mt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <Icon icon="solar:info-circle-bold" className="mr-2 h-4 w-4" />
          <p>Wähle Zutaten oder Einheiten, um die Rezepte zu filtern</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;
