"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { containerVariants, itemVariants } from "./animations";
import { useRouter } from "next/navigation";
import CreateRecipeModal from "@/components/Recipes/CreateRecipeModal";
import { useState } from "react";
import { userStore } from "@/data/userStore";
import { toast } from "sonner";

const Hero = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = userStore();

  return (
    <>
      <section className="py-10 md:py-16 lg:py-24 bg-gradient-to-b from-emerald-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="space-y-4 md:space-y-6 text-center md:text-left order-2 md:order-1"
              variants={itemVariants}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Entdecke die Welt der{" "}
                <span className="text-emerald-600">Smoothies</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
                Erstelle, teile und entdecke köstliche Smoothie-Rezepte für
                jeden Geschmack und jede Gelegenheit.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
                <Button
                  onPress={() => {
                    if (!isLoggedIn) {
                      toast.error("Bitte zuerst einloggen");
                      return;
                    }
                    setIsModalOpen(true);
                  }}
                  color="primary"
                  className="bg-emerald-600 hover:bg-emerald-700 text-base md:text-lg h-12 md:h-14 px-6 md:px-8"
                >
                  Rezept erstellen
                </Button>
                <Button
                  onPress={() => router.push("/recipes")}
                  variant="bordered"
                  className="text-base md:text-lg h-12 md:h-14 px-6 md:px-8"
                >
                  Rezepte entdecken
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="relative w-full max-w-md mx-auto md:max-w-none order-1 md:order-2"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="aspect-square relative">
                <Image
                  src="/images/Hero.png"
                  alt="Verschiedene Smoothies"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-xl shadow-xl object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <CreateRecipeModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default Hero;
