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
  {
    id: 2,
    name: "Grüner Energiebooster",
    ingredients: [
      { id: 6, name: "Spinat", amount: 50, unit: Unit.GRAM },
      { id: 7, name: "Banane", amount: 1, unit: Unit.PIECE },
      { id: 8, name: "Apfel", amount: 1, unit: Unit.PIECE },
      { id: 9, name: "Ingwer", amount: 1, unit: Unit.TEASPOON },
      { id: 10, name: "Zitronensaft", amount: 1, unit: Unit.TABLESPOON },
    ],
    instructions:
      "Spinat waschen, Banane und Apfel schälen und in Stücke schneiden. Alle Zutaten in einen Mixer geben und pürieren.",
    image: "/placeholder.svg?height=400&width=600",
    author: 1,
    reviews: [],
    created_at: "2023-04-18",
    updated_at: "2023-04-18",
  },
  {
    id: 3,
    name: "Tropischer Traum",
    ingredients: [
      { id: 11, name: "Mango", amount: 1, unit: Unit.PIECE },
      { id: 12, name: "Ananas", amount: 100, unit: Unit.GRAM },
      { id: 13, name: "Kokosmilch", amount: 100, unit: Unit.MILLILITER },
      { id: 14, name: "Limettensaft", amount: 1, unit: Unit.TABLESPOON },
    ],
    instructions:
      "Mango und Ananas schälen und in Stücke schneiden. Alle Zutaten in einen Mixer geben und pürieren.",
    image: "/placeholder.svg?height=400&width=600",
    author: 2,
    reviews: [],
    created_at: "2023-04-20",
    updated_at: "2023-04-20",
  },
  {
    id: 4,
    name: "Protein-Power",
    ingredients: [
      { id: 15, name: "Banane", amount: 1, unit: Unit.PIECE },
      { id: 16, name: "Erdnussbutter", amount: 1, unit: Unit.TABLESPOON },
      { id: 17, name: "Hafermilch", amount: 200, unit: Unit.MILLILITER },
      { id: 18, name: "Proteinpulver", amount: 1, unit: Unit.TABLESPOON },
      { id: 19, name: "Honig", amount: 1, unit: Unit.TEASPOON },
    ],
    instructions:
      "Banane schälen und in Stücke schneiden. Alle Zutaten in einen Mixer geben und pürieren.",
    image: "/placeholder.svg?height=400&width=600",
    author: 3,
    reviews: [],
    created_at: "2023-04-22",
    updated_at: "2023-04-22",
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
