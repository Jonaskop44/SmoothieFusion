"use client";

import CTASection from "@/components/Section/CTA";
import Features from "@/components/Section/Featuers/Featuers";
import Hero from "@/components/Section/Hero/Hero";
import RecipeCarousel from "@/components/Section/RecipeCarousel";
import { Recipe, Unit } from "@/types/recipe";
import { useState } from "react";

const exampleRecipes: Recipe[] = [
  {
    id: 1,
    name: "Beeren-Explosion",
    ingredients: [
      { id: 1, name: "Erdbeeren", amount: 100, unit: Unit.GRAM },
      { id: 2, name: "Himbeeren", amount: 50, unit: Unit.GRAM },
      { id: 3, name: "Blaubeeren", amount: 50, unit: Unit.GRAM },
      { id: 4, name: "Joghurt", amount: 200, unit: Unit.MILLILITER },
      { id: 5, name: "Honig", amount: 1, unit: Unit.TABLESPOON },
    ],
    instructions:
      "Alle Zutaten in einen Mixer geben und pürieren, bis eine glatte Konsistenz erreicht ist.",
    image: "/placeholder.svg?height=400&width=600",
    author: 1,
    reviews: [
      {
        id: 1,
        name: "Lecker!",
        description: "Super leckerer Smoothie, perfekt für den Sommer!",
        rating: 5,
        recipe: 1,
        author: 2,
        created_at: "2023-04-16",
        updated_at: "2023-04-16",
      },
    ],
    created_at: "2023-04-15",
    updated_at: "2023-04-15",
  },
];

const Home = () => {
  const [recipes] = useState<Recipe[]>(exampleRecipes);
  const hasRecipes = recipes.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <RecipeCarousel recipes={recipes} hasRecipes={hasRecipes} />
        <Features />
        <CTASection />
      </main>
    </div>
  );
};

export default Home;
