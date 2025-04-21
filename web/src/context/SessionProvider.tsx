"use client";

import Loader from "@/components/UI/Loader";
import { userStore } from "@/data/userStore";
import { FC, useEffect, useState } from "react";

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const { fetchUser, refreshToken } = userStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doAction = async () => {
      refreshToken();
      fetchUser();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    doAction();
  }, [fetchUser, refreshToken]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default SessionProvider;
