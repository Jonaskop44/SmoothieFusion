"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { containerVariants, itemVariants } from "./animations";

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-6" variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Entdecke die Welt der{" "}
              <span className="text-emerald-600">Smoothies</span>
            </h1>
            <p className="text-xl text-gray-600">
              Erstelle, teile und entdecke köstliche Smoothie-Rezepte für jeden
              Geschmack und jede Gelegenheit.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                color="primary"
                className="bg-emerald-600 hover:bg-emerald-700 text-lg h-14 px-8"
              >
                Rezept erstellen
              </Button>
              <Button variant="bordered" className="text-lg h-14 px-8">
                Rezepte entdecken
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Verschiedene Smoothies"
              width={600}
              height={600}
              className="rounded-xl shadow-xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
