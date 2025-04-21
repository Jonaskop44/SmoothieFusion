"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  User,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
} from "@heroui/react";
import clsx from "clsx";
import AuthModal, { AuthVariant } from "../UI/AuthModal";
import { userStore } from "@/data/userStore";
import { toast } from "sonner";

const NavbarLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authVariant, setAuthVariant] = useState<AuthVariant>("LOGIN");
  const { user, isLoggedIn, logout } = userStore();
  const pathname = usePathname();

  const menuItems = [
    { name: "Startseite", href: "/" },
    { name: "Rezepte", href: "/recipes" },
    { name: "Erstellen", href: "/erstellen" },
    { name: "Anmelden", href: "#" },
    { name: "Registrieren", href: "#" },
  ];

  const navItemsLeft = menuItems.slice(0, 3);

  const handleOpenAuthModal = (variant: AuthVariant) => {
    setAuthVariant(variant);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} className="border-b">
        <NavbarContent>
          <NavbarBrand
            as={Link}
            href="/"
            className="flex items-center space-x-2"
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Icon
                icon="solar:bowl-spoon-bold"
                className="h-8 w-8 text-emerald-500"
              />
            </motion.div>
            <span className="text-2xl font-bold text-emerald-600">
              SmoothieFusion
            </span>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-6" justify="center">
          {navItemsLeft.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <NavbarItem key={`${item.name}-${index}`}>
                <Link
                  href={item.href}
                  className={clsx(
                    "font-medium transition-colors",
                    isActive
                      ? "text-emerald-600"
                      : "text-gray-600 hover:text-emerald-600"
                  )}
                >
                  {item.name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarContent justify="end">
          {isLoggedIn ? (
            <Dropdown showArrow>
              <DropdownTrigger>
                <User
                  as="button"
                  className="transition-transform"
                  description={user.username}
                  name={user.email?.split("@")[0]}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownSection showDivider>
                  <DropdownItem key="" color="primary">
                    <Link href="/profil" className="flex items-center gap-2">
                      <Icon icon="solar:user-bold" className="text-xl" />
                      Profil
                    </Link>
                  </DropdownItem>
                </DropdownSection>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={() => {
                    logout();
                    toast.success("Erfolgreich abgemeldet");
                  }}
                  startContent={<Icon icon="solar:logout-2-broken" />}
                >
                  Abmelden
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <NavbarItem className="hidden md:flex">
                <Button
                  onPress={() => handleOpenAuthModal("LOGIN")}
                  variant="bordered"
                  color="default"
                >
                  Anmelden
                </Button>
              </NavbarItem>
              <NavbarItem className="hidden md:flex">
                <Button
                  onPress={() => handleOpenAuthModal("SIGNUP")}
                  variant="solid"
                  color="primary"
                  className="bg-emerald-600"
                >
                  Registrieren
                </Button>
              </NavbarItem>
            </>
          )}
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
            className="md:hidden"
          />
        </NavbarContent>

        <NavbarMenu className="pt-6">
          {menuItems
            .filter((item) => {
              if (
                isLoggedIn &&
                (item.name === "Anmelden" || item.name === "Registrieren")
              ) {
                return false;
              }
              return true;
            })
            .map((item, index) => {
              const isActive = pathname === item.href;

              if (!isLoggedIn && item.name === "Anmelden") {
                return (
                  <NavbarMenuItem key="mobile-login">
                    <button
                      onClick={() => handleOpenAuthModal("LOGIN")}
                      className="w-full block py-2 text-lg text-gray-700 text-left"
                    >
                      Anmelden
                    </button>
                  </NavbarMenuItem>
                );
              }

              if (!isLoggedIn && item.name === "Registrieren") {
                return (
                  <NavbarMenuItem key="mobile-register">
                    <button
                      onClick={() => handleOpenAuthModal("SIGNUP")}
                      className="w-full block py-2 text-lg text-left text-emerald-600 font-semibold"
                    >
                      Registrieren
                    </button>
                  </NavbarMenuItem>
                );
              }

              return (
                <NavbarMenuItem key={`${item.name}-${index}`}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "w-full block py-2 text-lg",
                      isActive
                        ? "text-emerald-600 font-semibold"
                        : "text-gray-700"
                    )}
                  >
                    {item.name}
                  </Link>
                </NavbarMenuItem>
              );
            })}
        </NavbarMenu>
      </Navbar>
      <AuthModal
        isOpen={isAuthModalOpen}
        onOpenChange={() => setIsAuthModalOpen(!isAuthModalOpen)}
        variant={authVariant}
        onVariantChange={setAuthVariant}
      />
    </>
  );
};

export default NavbarLayout;
