import { create } from "zustand";
import ApiClient from "@/api";
import { Ingredient, Recipe } from "@/types/recipe";

interface RecipeState {
  recipes: Recipe[];
  userRecipes: (userId: number) => Recipe[];
  fetchRecipes: () => void;
  createRecipe: (
    image: File,
    name: string,
    instructions: string,
    ingredients: Ingredient[]
  ) => void;
  updateRecipe: (
    id: number,
    image?: File,
    name?: string,
    instructions?: string,
    ingredients?: Ingredient[]
  ) => void;
  deleteRecipe: (id: number) => void;
  createReview: (
    id: number,
    name: string,
    description: string,
    rating: number
  ) => void;
}

const apiClient = new ApiClient();

export const recipeStore = create<RecipeState>((set, get) => ({
  recipes: [] as Recipe[],
  userRecipes: (userId: number) => {
    return get().recipes.filter((recipe) => recipe.author === userId);
  },
  fetchRecipes: () => {
    return apiClient.recipe.helper
      .getAllRecipes()
      .then((response) => {
        if (response.status) {
          set({ recipes: response.data });
        } else {
          set({ recipes: [] as Recipe[] });
        }
      })
      .catch(() => {
        set({ recipes: [] as Recipe[] });
      });
  },
  createRecipe: (
    image: File,
    name: string,
    instructions: string,
    ingredients: Ingredient[]
  ) => {
    return apiClient.recipe.helper
      .createRecipe(image, name, instructions, ingredients)
      .then((response) => {
        if (response.status) {
          set((state) => ({ recipes: [...state.recipes, response.data] }));
        }
      })
      .catch(() => {
        set((state) => ({ recipes: [...state.recipes] }));
      });
  },
  updateRecipe: (
    id: number,
    image?: File,
    name?: string,
    instructions?: string,
    ingredients?: Ingredient[]
  ) => {
    return apiClient.recipe.helper
      .updateRecipe(id, image, name, instructions, ingredients)
      .then((response) => {
        if (response.status) {
          set((state) => ({
            recipes: state.recipes.map((r) =>
              r.id === id ? response.data : r
            ),
          }));
        }
      })
      .catch(() => {
        set((state) => ({
          recipes: state.recipes.map((r) => (r.id === id ? r : r)),
        }));
      });
  },
  deleteRecipe: (id: number) => {
    return apiClient.recipe.helper
      .deleteRecipe(id)
      .then((response) => {
        if (response.status) {
          set((state) => ({
            recipes: state.recipes.filter((recipe) => recipe.id !== id),
          }));
        }
      })
      .catch(() => {
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== id),
        }));
      });
  },
  createReview: (
    id: number,
    name: string,
    description: string,
    rating: number
  ) => {
    return apiClient.recipe.helper
      .createReview(id, name, description, rating)
      .then((response) => {
        if (response.status) {
          set((state) => ({
            recipes: state.recipes.map((r) =>
              r.id === id ? { ...r, reviews: [...r.reviews, response.data] } : r
            ),
          }));
        }
      })
      .catch(() => {
        set((state) => ({
          recipes: state.recipes.map((r) => (r.id === id ? r : r)),
        }));
      });
  },
}));
