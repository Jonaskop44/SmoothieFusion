"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Avatar,
} from "@heroui/react";
import type { Recipe } from "@/types/recipe";
import { FC, useState } from "react";
import { IMAGE_URL } from "@/lib/config";
import CreateReviewModal from "../Review/CreateReviewModal";
import useFormattedDate from "@/hooks/helper";
import { userStore } from "@/data/userStore";
import { toast } from "sonner";
import AuthModal, { AuthVariant } from "../UI/AuthModal";

interface RecipeDetailsModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const RecipeDetailsModal: FC<RecipeDetailsModalProps> = ({
  recipe,
  isOpen,
  onOpenChange,
}) => {
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [authVariant, setAuthVariant] = useState<AuthVariant>("LOGIN");
  const formatDate = useFormattedDate();
  const { isLoggedIn } = userStore();

  const calculateAverageRating = () => {
    if (recipe.reviews.length === 0) return 0;
    const sum = recipe.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    return sum / recipe.reviews.length;
  };

  const averageRating = calculateAverageRating();
  const reviewCount = recipe.reviews.length;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {recipe.name}
                </h2>
                <div className="flex items-center mt-1">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        icon={
                          star <= Math.round(averageRating)
                            ? "solar:star-bold"
                            : "solar:star-linear"
                        }
                        className={`h-5 w-5 ${
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
              </ModalHeader>
              <ModalBody>
                {/* <div className="relative h-64 w-full mb-6">
                  <Image
                    src={`${IMAGE_URL}${recipe.image}`}
                    alt={recipe.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg"
                  />
                </div> */}
                <div className="w-full mb-6 flex justify-center">
                  <Image
                    src={`${IMAGE_URL}${recipe.image}`}
                    alt={recipe.name}
                    layout="intrinsic"
                    width={800}
                    height={600}
                    className="rounded-lg"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Zutaten
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {recipe.ingredients.map((ingredient) => (
                        <li
                          key={ingredient.id}
                          className="flex items-center text-gray-700"
                        >
                          <Icon
                            icon="solar:alt-arrow-right-bold"
                            className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0"
                          />
                          <span>
                            {ingredient.amount} {ingredient.unit}{" "}
                            {ingredient.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Zubereitung
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {recipe.instructions}
                    </p>
                  </div>
                </div>

                <Divider className="my-6" />

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Bewertungen
                  </h3>
                  {recipe.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {recipe.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="flex items-center mb-2">
                            <Avatar
                              name={review.name.charAt(0)}
                              className="mr-3"
                              size="sm"
                              color="primary"
                            />
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {review.name}
                              </h4>
                              <div className="flex items-center">
                                <div className="flex mr-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Icon
                                      key={star}
                                      icon={
                                        star <= review.rating
                                          ? "solar:star-bold"
                                          : "solar:star-linear"
                                      }
                                      className={`h-3 w-3 ${
                                        star <= review.rating
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {formatDate(review.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm">
                            {review.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Icon
                        icon="solar:chat-round-dots-bold"
                        className="h-12 w-12 mx-auto mb-2 text-gray-300"
                      />
                      <p>Noch keine Bewertungen vorhanden.</p>
                      <p className="text-sm">
                        Sei der Erste, der dieses Rezept bewertet!
                      </p>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Schließen
                </Button>
                <Button
                  onPress={() => {
                    if (isLoggedIn) {
                      setIsOpenReviewModal(true);
                    } else {
                      toast.warning(
                        "Bitte melde dich an, um eine Bewertung abzugeben."
                      );
                      setIsOpenAuthModal(true);
                      return;
                    }
                  }}
                  color="primary"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Bewertung abgeben
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <CreateReviewModal
        isOpen={isOpenReviewModal}
        onOpenChange={setIsOpenReviewModal}
        recipe={recipe}
      />
      <AuthModal
        isOpen={isOpenAuthModal}
        onOpenChange={() => setIsOpenAuthModal(!isOpenAuthModal)}
        variant={authVariant}
        onVariantChange={setAuthVariant}
      />
    </>
  );
};

export default RecipeDetailsModal;
