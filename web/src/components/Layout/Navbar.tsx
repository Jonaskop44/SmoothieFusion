"use client";

import React from "react";
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
} from "@heroui/react";
import clsx from "clsx";

const NavbarLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Startseite", href: "/" },
    { name: "Rezepte", href: "/rezepte" },
    { name: "Erstellen", href: "/erstellen" },
    { name: "Anmelden", href: "/login" },
    { name: "Registrieren", href: "/register", isHighlighted: true },
  ];

  const navItemsLeft = menuItems.slice(0, 3);
  const navItemsRight = menuItems.slice(3);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="border-b">
      <NavbarContent>
        <NavbarBrand as={Link} href="/" className="flex items-center space-x-2">
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
        {navItemsRight.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`} className="hidden md:flex">
            <Button
              as={Link}
              href={item.href}
              variant={item.isHighlighted ? "solid" : "bordered"}
              color={item.isHighlighted ? "primary" : "default"}
              className={clsx(
                item.isHighlighted && "bg-emerald-600",
                pathname === item.href && "border-emerald-600 text-emerald-600"
              )}
            >
              {item.name}
            </Button>
          </NavbarItem>
        ))}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
          className="md:hidden"
        />
      </NavbarContent>

      <NavbarMenu className="pt-6">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                href={item.href}
                className={clsx(
                  "w-full block py-2 text-lg",
                  isActive ? "text-emerald-600 font-semibold" : "text-gray-700"
                )}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarLayout;
