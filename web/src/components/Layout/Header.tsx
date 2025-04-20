"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Utensils className="h-8 w-8 text-emerald-500" />
          </motion.div>
          <span className="text-2xl font-bold text-emerald-600">
            SmoothieFusion
          </span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-emerald-600 font-medium hover:text-emerald-800 transition-colors"
          >
            Startseite
          </Link>
          <Link
            href="/rezepte"
            className="text-gray-600 font-medium hover:text-emerald-600 transition-colors"
          >
            Rezepte
          </Link>
          <Link
            href="/erstellen"
            className="text-gray-600 font-medium hover:text-emerald-600 transition-colors"
          >
            Erstellen
          </Link>
          <Link
            href="/ueber-uns"
            className="text-gray-600 font-medium hover:text-emerald-600 transition-colors"
          >
            Über uns
          </Link>
        </nav>
        <div className="flex space-x-2">
          <Button variant="outline" className="hidden md:flex">
            Anmelden
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Registrieren
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
