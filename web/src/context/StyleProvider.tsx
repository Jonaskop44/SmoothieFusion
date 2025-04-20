"use client";

import { FC } from "react";
import { HeroUIProvider } from "@heroui/react";

interface StyleProviderProps {
  children: React.ReactNode;
}

const StyleProvider: FC<StyleProviderProps> = ({ children }) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};

export default StyleProvider;
