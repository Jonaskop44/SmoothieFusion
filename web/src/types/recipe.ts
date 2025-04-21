export enum Unit {
  PIECE = "pieces",
  GRAM = "g",
  KILOGRAM = "kg",
  MILLILITER = "ml",
  LITER = "l",
  TEASPOON = "tsp",
  TABLESPOON = "tbsp",
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: Unit;
}

export interface Review {
  id: number;
  name: string;
  description: string;
  rating: number;
  recipe: number;
  author: number;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
  image: string;
  author: number;
  reviews: Review[];
  created_at: string;
  updated_at: string;
}
