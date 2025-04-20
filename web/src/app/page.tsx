import CTASection from "@/components/Section/CTA";
import FeaturesSection from "@/components/Section/Features/Features";
import HeroSection from "@/components/Section/Hero/Hero";
import RecipeCarousel from "@/components/Section/RecipeCarousel";
import { Recipe, Unit } from "@/types/recipe";

const exampleRecipes: Recipe[] = [
  {
    id: 1,
    name: "Beeren-Explosion",
    ingredients: [
      { id: 1, name: "Erdbeeren", amount: 100, unit: Unit.GRAM },
      { id: 2, name: "Himbeeren", amount: 100, unit: Unit.GRAM },
      { id: 3, name: "Blaubeeren", amount: 50, unit: Unit.GRAM },
      { id: 4, name: "Joghurt", amount: 200, unit: Unit.MILLILITER },
      { id: 5, name: "Honig", amount: 2, unit: Unit.TABLESPOON },
    ],
    instructions:
      "Alle Zutaten in einen Mixer geben und zu einer cremigen Konsistenz pürieren. Mit Eiswürfeln servieren.",
    image: "/placeholder.svg?height=400&width=600",
    author: 1,
    reviews: [
      {
        id: 1,
        name: "Leckerer Smoothie",
        description: "Super erfrischend und fruchtig!",
        rating: 5,
        recipe: 1,
        author: 2,
        created_at: "2023-04-16T10:30:00Z",
        updated_at: "2023-04-16T10:30:00Z",
      },
    ],
    created_at: "2023-04-15T08:00:00Z",
    updated_at: "2023-04-15T08:00:00Z",
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
      "Spinat waschen. Banane und Apfel schälen und in Stücke schneiden. Ingwer schälen und reiben. Alle Zutaten mit etwas Wasser mixen und den Zitronensaft hinzufügen.",
    image: "/placeholder.svg?height=400&width=600",
    author: 1,
    reviews: [
      {
        id: 2,
        name: "Perfekt für den Morgen",
        description: "Gibt mir viel Energie für den Tag!",
        rating: 4,
        recipe: 2,
        author: 3,
        created_at: "2023-04-19T09:15:00Z",
        updated_at: "2023-04-19T09:15:00Z",
      },
    ],
    created_at: "2023-04-18T14:30:00Z",
    updated_at: "2023-04-18T14:30:00Z",
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
      "Mango und Ananas schälen und in Stücke schneiden. Mit Kokosmilch und Limettensaft mixen. Nach Belieben mit Eiswürfeln servieren.",
    image: "/placeholder.svg?height=400&width=600",
    author: 2,
    reviews: [
      {
        id: 3,
        name: "Wie Urlaub im Glas",
        description: "Schmeckt wie am Strand in der Karibik!",
        rating: 5,
        recipe: 3,
        author: 4,
        created_at: "2023-04-21T16:45:00Z",
        updated_at: "2023-04-21T16:45:00Z",
      },
    ],
    created_at: "2023-04-20T11:20:00Z",
    updated_at: "2023-04-20T11:20:00Z",
  },
  {
    id: 4,
    name: "Protein-Power",
    ingredients: [
      { id: 15, name: "Banane", amount: 1, unit: Unit.PIECE },
      { id: 16, name: "Erdnussbutter", amount: 2, unit: Unit.TABLESPOON },
      { id: 17, name: "Hafermilch", amount: 250, unit: Unit.MILLILITER },
      { id: 18, name: "Proteinpulver", amount: 1, unit: Unit.TABLESPOON },
      { id: 19, name: "Honig", amount: 1, unit: Unit.TEASPOON },
    ],
    instructions:
      "Banane schälen und in Stücke schneiden. Alle Zutaten in einen Mixer geben und cremig pürieren. Sofort servieren.",
    image: "/placeholder.svg?height=400&width=600",
    author: 3,
    reviews: [
      {
        id: 4,
        name: "Perfekt nach dem Training",
        description: "Mein Go-to Shake nach dem Workout!",
        rating: 5,
        recipe: 4,
        author: 1,
        created_at: "2023-04-23T18:10:00Z",
        updated_at: "2023-04-23T18:10:00Z",
      },
    ],
    created_at: "2023-04-22T09:45:00Z",
    updated_at: "2023-04-22T09:45:00Z",
  },
];

const Home = () => {
  const hasRecipes = exampleRecipes.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection />
        <RecipeCarousel recipes={exampleRecipes} hasRecipes={hasRecipes} />
        <FeaturesSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Home;
