"use client";

import { useState, useEffect, FC } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import type { Ingredient } from "@/types/recipe";
import { Unit } from "@/types/recipe";
import { toast } from "sonner";
import { recipeStore } from "@/data/recipeStore";

interface CreateRecipeModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const CreateRecipeModal: FC<CreateRecipeModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<Omit<Ingredient, "id">[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tempIngredient, setTempIngredient] = useState({
    name: "",
    amount: 0,
    unit: Unit.PIECE,
  });
  const { createRecipe } = recipeStore();

  const unitOptions = [
    { value: Unit.PIECE, label: "Stück" },
    { value: Unit.GRAM, label: "Gramm (g)" },
    { value: Unit.KILOGRAM, label: "Kilogramm (kg)" },
    { value: Unit.MILLILITER, label: "Milliliter (ml)" },
    { value: Unit.LITER, label: "Liter (l)" },
    { value: Unit.TEASPOON, label: "Teelöffel (TL)" },
    { value: Unit.TABLESPOON, label: "Esslöffel (EL)" },
  ];

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (!name.trim())
      newErrors.name = "Bitte gib einen Namen für das Rezept ein";
    if (!instructions.trim())
      newErrors.instructions = "Bitte gib eine Anleitung für das Rezept ein";
    if (ingredients.length === 0)
      newErrors.ingredients = "Bitte füge mindestens eine Zutat hinzu";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [name, instructions, ingredients]);

  const resetForm = () => {
    setName("");
    setInstructions("");
    setImage("");
    setImageFile(null);
    setIngredients([]);
    setTempIngredient({ name: "", amount: 0, unit: Unit.PIECE });
    setErrors({});
  };

  const addIngredient = () => {
    if (!tempIngredient.name.trim() || tempIngredient.amount <= 0) return;

    setIngredients([...ingredients, { ...tempIngredient }]);
    setTempIngredient({ name: "", amount: 0, unit: Unit.PIECE });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
      }
    };
    input.click();
  };

  const handleSave = async () => {
    if (!isValid || !imageFile) return;

    const newIngredients = ingredients.map((ingredient, index) => ({
      ...ingredient,
      id: index + 1,
    }));

    try {
      createRecipe(imageFile, name, instructions, newIngredients);
      resetForm();
      onOpenChange(false);
      toast.success("Rezept erfolgreich erstellt!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Fehler beim Erstellen des Rezepts");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange(false);
        resetForm();
      }}
      size="3xl"
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-gray-900">
                Neues Rezept erstellen
              </h2>
              <p className="text-sm text-gray-500">
                Teile dein leckeres Smoothie-Rezept mit der Community
              </p>
            </ModalHeader>

            <ModalBody>
              <div className="space-y-6">
                {/* Recipename */}
                <div>
                  <Input
                    label="Rezeptname"
                    placeholder="z.B. Beeren-Explosion"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isRequired
                    isInvalid={!!errors.name}
                    errorMessage={errors.name}
                    startContent={
                      <Icon
                        icon="solar:bowl-spoon-bold"
                        className="text-emerald-500 h-5 w-5"
                      />
                    }
                  />
                </div>

                {/* Image-Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Rezeptbild
                  </label>
                  <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    {image && (
                      <div className="relative h-48 w-full mb-4">
                        <Image
                          src={image}
                          alt="Rezeptbild"
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <Button
                      color="primary"
                      variant="flat"
                      className="bg-emerald-100 text-emerald-700"
                      startContent={
                        <Icon
                          icon="solar:gallery-add-bold"
                          className="h-5 w-5"
                        />
                      }
                      onPress={handleImageUpload}
                    >
                      Bild hochladen
                    </Button>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">
                      Zutaten
                    </label>
                    {errors.ingredients && (
                      <span className="text-xs text-red-500">
                        {errors.ingredients}
                      </span>
                    )}
                  </div>

                  {/* Ingredientslist */}
                  <div className="space-y-2">
                    {ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Icon
                            icon="solar:alt-arrow-right-bold"
                            className="h-4 w-4 text-emerald-500 mr-2"
                          />
                          <span>
                            {ingredient.amount} {ingredient.unit}{" "}
                            {ingredient.name}
                          </span>
                        </div>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => removeIngredient(index)}
                        >
                          <Icon
                            icon="solar:trash-bin-trash-bold"
                            className="h-4 w-4"
                          />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Add new ingredient */}
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3">
                      <Input
                        type="number"
                        label="Menge"
                        placeholder="0"
                        min={0}
                        step={0.1}
                        value={tempIngredient.amount.toString()}
                        onChange={(e) =>
                          setTempIngredient({
                            ...tempIngredient,
                            amount: Number.parseFloat(e.target.value) || 0,
                          })
                        }
                        size="sm"
                      />
                    </div>
                    <div className="col-span-3">
                      <Select
                        label="Einheit"
                        placeholder="Einheit"
                        selectedKeys={[tempIngredient.unit]}
                        onChange={(e) =>
                          setTempIngredient({
                            ...tempIngredient,
                            unit: e.target.value as Unit,
                          })
                        }
                        size="sm"
                      >
                        {unitOptions.map((unit) => (
                          <SelectItem key={unit.value}>{unit.label}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="col-span-4">
                      <Input
                        label="Zutat"
                        placeholder="z.B. Banane"
                        value={tempIngredient.name}
                        onChange={(e) =>
                          setTempIngredient({
                            ...tempIngredient,
                            name: e.target.value,
                          })
                        }
                        size="sm"
                      />
                    </div>
                    <div className="col-span-2 flex items-end">
                      <Button
                        isIconOnly
                        color="primary"
                        className="bg-emerald-600 hover:bg-emerald-700 w-full"
                        onPress={addIngredient}
                        isDisabled={
                          !tempIngredient.name.trim() ||
                          tempIngredient.amount <= 0
                        }
                      >
                        <Icon
                          icon="solar:add-circle-bold"
                          className="h-5 w-5"
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <Textarea
                    label="Zubereitung"
                    placeholder="Beschreibe die Zubereitung deines Smoothies..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    minRows={5}
                    isRequired
                    isInvalid={!!errors.instructions}
                    errorMessage={errors.instructions}
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="flat" color="danger" onPress={onClose}>
                Abbrechen
              </Button>
              <Button
                color="primary"
                className="bg-emerald-600 hover:bg-emerald-700"
                onPress={handleSave}
                isDisabled={!isValid || !imageFile}
              >
                Rezept speichern
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateRecipeModal;
