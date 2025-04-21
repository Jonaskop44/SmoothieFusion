"use client";

import FooterLayout from "@/components/Layout/Footer";
import NavbarLayout from "@/components/Layout/Navbar";
import { HeroUIProvider } from "@heroui/react";
import { FC } from "react";

interface StyleProviderProps {
  children: React.ReactNode;
}

const StyleProvider: FC<StyleProviderProps> = ({ children }) => {
  return (
    <>
      <NavbarLayout />
      <HeroUIProvider>{children}</HeroUIProvider>
      <FooterLayout />
    </>
  );
};

export default StyleProvider;
