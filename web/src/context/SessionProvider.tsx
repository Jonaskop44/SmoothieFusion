"use client";

import Loader from "@/components/UI/Loader";
import { recipeStore } from "@/data/recipeStore";
import { userStore } from "@/data/userStore";
import { FC, useEffect, useState } from "react";

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const { fetchUser, refreshToken } = userStore();
  const { fetchRecipes } = recipeStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doAction = async () => {
      refreshToken();
      fetchUser();
      fetchRecipes();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    doAction();
  }, [fetchUser, refreshToken, fetchRecipes]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default SessionProvider;
