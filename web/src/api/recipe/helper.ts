import { ApiResponse } from "@/types/api";
import { Ingredient, Recipe } from "@/types/recipe";
import axios from "axios";

export class Helper {
  constructor() {}

  async getAllRecipes() {
    return axios
      .get("/recipes/")
      .then((response) => {
        if (response.status !== 200) return { data: null, status: false };

        const data = response.data;
        return { data: data, status: true };
      })
      .catch(() => {
        return { data: null, status: false };
      });
  }

  async getRecipeById(id: number) {
    return axios
      .get(`/recipes/${id}/`)
      .then((response) => {
        if (response.status !== 200) return { data: null, status: false };

        const data = response.data;
        return { data: data, status: true };
      })
      .catch(() => {
        return { data: null, status: false };
      });
  }

  async createRecipe(
    image: File,
    name: string,
    instructions: string,
    ingredients: Ingredient[]
  ): Promise<ApiResponse<Recipe>> {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("instructions", instructions);
    formData.append("ingredients", JSON.stringify(ingredients));

    return axios
      .post("/recipes/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status !== 201) return { data: null, status: false };

        const data = response.data;
        return { data: data, status: true };
      })
      .catch(() => {
        return { data: null, status: false };
      });
  }

  async updateRecipe(
    id: number,
    image?: File,
    name?: string,
    instructions?: string,
    ingredients?: Ingredient[]
  ): Promise<ApiResponse<Recipe>> {
    const formData = new FormData();
    if (image) formData.append("image", image);
    if (name) formData.append("name", name);
    if (instructions) formData.append("instructions", instructions);
    if (ingredients)
      formData.append("ingredients", JSON.stringify(ingredients));

    return axios
      .patch(`/recipes/update/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status !== 200) return { data: null, status: false };

        const data = response.data;
        return { data: data, status: true };
      })
      .catch(() => {
        return { data: null, status: false };
      });
  }

  async deleteRecipe(id: number) {
    return axios
      .delete(`/recipes/delete/${id}/`)
      .then((response) => {
        if (response.status !== 204) return { data: null, status: false };

        return { data: null, status: true };
      })
      .catch(() => {
        return { data: null, status: false };
      });
  }

  async createReview(
    id: number,
    name: string,
    description: string,
    rating: number
  ) {
    return axios
      .post(`/recipes/${id}/review/`, {
        name: name,
        description: description,
        rating: rating,
      })
      .then((response) => {
        if (response.status !== 201) return { data: null, status: false };

        const data = response.data;
        return { data: data, status: true };
      })
      .catch(() => {
        return { data: null, status: false };
      });
  }
}
