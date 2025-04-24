"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { Recipe } from "@/types/recipe";
import { FC } from "react";

interface DeleteRecipeConfirmationProps {
  recipe: Recipe;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
}

const DeleteRecipeConfirmation: FC<DeleteRecipeConfirmationProps> = ({
  recipe,
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="sm"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-gray-900">
                Rezept löschen
              </h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-100 p-3 rounded-full mb-4">
                  <Icon
                    icon="solar:trash-bin-trash-bold"
                    className="h-8 w-8 text-red-500"
                  />
                </div>
                <p className="text-gray-700 mb-2">
                  Bist du sicher, dass du das Rezept{" "}
                  <span className="font-semibold">
                    &quot;{recipe.name}&quot;
                  </span>{" "}
                  löschen möchtest?
                </p>
                <p className="text-sm text-gray-500">
                  Diese Aktion kann nicht rückgängig gemacht werden.
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Abbrechen
              </Button>
              <Button color="danger" onPress={onConfirm}>
                Löschen
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteRecipeConfirmation;
