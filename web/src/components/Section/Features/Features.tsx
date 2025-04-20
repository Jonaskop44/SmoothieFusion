"use client";

import { motion } from "framer-motion";
import { Utensils, Leaf, Heart } from "lucide-react";
import { features } from "./data";

const FeaturesSection = () => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Utensils":
        return <Utensils className="h-8 w-8 text-emerald-600" />;
      case "Leaf":
        return <Leaf className="h-8 w-8 text-emerald-600" />;
      case "Heart":
        return <Heart className="h-8 w-8 text-emerald-600" />;
      default:
        return <Utensils className="h-8 w-8 text-emerald-600" />;
    }
  };

  return (
    <section className="py-16 bg-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Warum SmoothieFusion?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unsere Plattform bietet alles, was du für deine Smoothie-Abenteuer
            brauchst.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <div className="bg-emerald-100 p-3 rounded-full w-fit mb-6">
                {renderIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
