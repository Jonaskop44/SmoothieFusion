"use client";

import CTASection from "@/components/Section/CTA";
import Features from "@/components/Section/Featuers/Featuers";
import Hero from "@/components/Section/Hero/Hero";
import RecipeCarousel from "@/components/Section/RecipeCarousel";
import { recipeStore } from "@/data/recipeStore";

const Home = () => {
  const { recipes } = recipeStore();
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
