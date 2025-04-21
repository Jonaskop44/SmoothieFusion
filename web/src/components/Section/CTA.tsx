"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-emerald-600">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bereit, deine Smoothie-Reise zu beginnen?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Registriere dich jetzt kostenlos und entdecke eine Welt voller
            gesunder und köstlicher Smoothie-Rezepte.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              color="default"
              className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg h-14 px-8"
            >
              Jetzt registrieren
            </Button>
            <Button
              variant="bordered"
              className="text-white border-white hover:bg-emerald-700 text-lg h-14 px-8"
            >
              Mehr erfahren
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
