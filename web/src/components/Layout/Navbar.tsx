"use client";

import React from "react";
import Link from "next/link";
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

export default function NavbarLayout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Startseite", href: "/" },
    { name: "Rezepte", href: "/rezepte" },
    { name: "Erstellen", href: "/erstellen" },
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Anmelden", href: "/login" },
    { name: "Registrieren", href: "/register", isHighlighted: true },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="border-b">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
          className="md:hidden"
        />
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
        <NavbarItem>
          <Link
            href="/"
            className="text-emerald-600 font-medium hover:text-emerald-800 transition-colors"
          >
            Startseite
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/rezepte"
            className="text-gray-600 font-medium hover:text-emerald-600 transition-colors"
          >
            Rezepte
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/erstellen"
            className="text-gray-600 font-medium hover:text-emerald-600 transition-colors"
          >
            Erstellen
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/ueber-uns"
            className="text-gray-600 font-medium hover:text-emerald-600 transition-colors"
          >
            Über uns
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Button as={Link} href="/login" variant="bordered" color="default">
            Anmelden
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="/register"
            color="primary"
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Registrieren
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              href={item.href}
              className={`w-full block py-2 text-lg ${
                item.isHighlighted
                  ? "text-emerald-600 font-semibold"
                  : index === 0
                  ? "text-emerald-600"
                  : "text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
