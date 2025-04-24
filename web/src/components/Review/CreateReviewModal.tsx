"use client";

import { useState, useEffect, FC } from "react";
import { Icon } from "@iconify/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Input,
} from "@heroui/react";
import type { Recipe } from "@/types/recipe";
import { recipeStore } from "@/data/recipeStore";
import { toast } from "sonner";

interface CreateReviewModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  recipe: Recipe;
}

const CreateReviewModal: FC<CreateReviewModalProps> = ({
  isOpen,
  onOpenChange,
  recipe,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { createReview } = recipeStore();

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Bitte gib einen Titel für deine Bewertung ein";
    }

    if (!description.trim()) {
      newErrors.description =
        "Bitte gib eine Beschreibung für deine Bewertung ein";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [name, description]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setRating(5);
    setHoveredRating(0);
    setErrors({});
  };

  const handleSave = () => {
    if (!isValid || !recipe) return;

    try {
      createReview(recipe.id, name, description, rating);
      resetForm();
      onOpenChange(false);
      toast.success("Bewertung erfolgreich gespeichert");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Fehler beim Speichern der Bewertung");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange(false);
        resetForm();
      }}
      size="lg"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-gray-900">
                Bewertung abgeben
              </h2>
              {recipe && (
                <p className="text-sm text-gray-500">
                  Für das Rezept:{" "}
                  <span className="font-medium">{recipe.name}</span>
                </p>
              )}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                {/* Stars */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Deine Bewertung
                  </label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        <Icon
                          icon="solar:star-bold"
                          className={`h-8 w-8 ${
                            star <= (hoveredRating || rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-lg font-medium text-gray-700">
                      {rating} von 5
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <Input
                    label="Titel"
                    placeholder="z.B. Perfekter Smoothie für den Sommer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isRequired
                    isInvalid={!!errors.name}
                    errorMessage={errors.name}
                  />
                </div>

                {/* Description */}
                <div>
                  <Textarea
                    label="Deine Meinung"
                    placeholder="Beschreibe, was dir an diesem Rezept gefallen hat..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    minRows={4}
                    isRequired
                    isInvalid={!!errors.description}
                    errorMessage={errors.description}
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
                isDisabled={!isValid}
              >
                Bewertung speichern
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateReviewModal;
