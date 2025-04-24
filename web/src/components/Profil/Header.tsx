"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { FC } from "react";
import { User } from "@/types/user";
import { Recipe } from "@/types/recipe";
import useFormattedDate from "@/hooks/helper";

interface ProfileHeaderProps {
  user: User;
  userRecipes: (userId: number) => Recipe[];
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ user, userRecipes }) => {
  const recipeCount = user.id ? userRecipes(user.id).length : 0;
  const formatDate = useFormattedDate();

  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-8"
        >
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.username}
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <div className="mt-4 md:mt-0">
                <Button
                  color="primary"
                  variant="bordered"
                  startContent={
                    <Icon icon="solar:pen-bold" className="h-4 w-4" />
                  }
                >
                  Profil bearbeiten
                </Button>
              </div>
            </div>

            <p className="mt-4 text-gray-700 max-w-2xl">
              Hier kannst du deine eigenen Rezepte erstellen, bearbeiten und mit
              anderen teilen, um Inspiration zu finden und deine Kochkünste zu
              verbessern.
            </p>

            <div className="flex justify-center md:justify-start gap-8 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {recipeCount}
                </p>
                <p className="text-sm text-gray-600">Rezepte</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {user.created_at ? formatDate(user.created_at) : "Unbekannt"}
                </p>
                <p className="text-sm text-gray-600">Mitglied seit</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {user.updated_at ? formatDate(user.updated_at) : "Unbekannt"}
                </p>
                <p className="text-sm text-gray-600">Letze Aktivität</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileHeader;
