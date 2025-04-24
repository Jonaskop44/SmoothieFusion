"use client";

import { useState } from "react";
import { userStore } from "@/data/userStore";
import { recipeStore } from "@/data/recipeStore";
import ProfileHeader from "@/components/Profil/Header";
import ProfileTabs from "@/components/Profil/Tabs";
import UserRecipes from "@/components/Profil/UserRecipes";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const { user } = userStore();
  const { userRecipes } = recipeStore();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <ProfileHeader user={user} userRecipes={userRecipes} />
        <div className="container mx-auto px-4 py-8">
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="mt-8">
            {activeTab === "recipes" && (
              <UserRecipes recipes={user.id ? userRecipes(user.id) : []} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
