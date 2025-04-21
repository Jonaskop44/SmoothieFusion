"use client";

import FooterLayout from "@/components/Layout/Footer";
import NavbarLayout from "@/components/Layout/Navbar";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "sonner";
import { FC } from "react";

interface StyleProviderProps {
  children: React.ReactNode;
}

const StyleProvider: FC<StyleProviderProps> = ({ children }) => {
  return (
    <>
      <HeroUIProvider>
        <NavbarLayout />
        {children}
        <FooterLayout />
        <Toaster position="bottom-right" richColors />
      </HeroUIProvider>
    </>
  );
};

export default StyleProvider;
