"use server";
import { SearchSnacksDTO, SnackDTO } from "@/dto/snack.dto";
import { env } from "@/env";
import { fetchWithAuth } from "@/services/http/fetchWithAuth";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";

interface UpdateFoodProps {
  id: string;
  title?: string;
  description?: string;
  category?: FOOD_CATEGORIES;
  price?: number;
  imageUrl?: string;
  ingredients?: string[];
}

interface CreateFoodProps {
  title: string;
  description: string;
  category: FOOD_CATEGORIES;
  price: number;
  imageUrl: string;
  ingredients?: string[];
}

export const fetchSearchFoods = async ({
  page = "1",
  perPage = "9",
  category,
  title,
  ingredients,
}: SearchSnacksDTO) => {
  const queryParams = new URLSearchParams({
    page,
    perPage,
    category,
    ...(title && { title }),
  });

  if (ingredients) {
    ingredients.forEach((ingredient) => {
      queryParams.append("ingredients", ingredient);
    });
  }

  const queryString = queryParams.toString();

  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack?${queryString}`;

  try {
    const response = await fetchWithAuth(url, {
      method: "GET",
    });

    const foods = (await response.json()) ?? [];

    return foods;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const findOneFood = async (id: string) => {
  try {
    const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack/${id}`;

    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    const { snack } = await response.json();

    return snack;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchUpdateFood = async ({
  id,
  title,
  description,
  category,
  imageUrl,
  ingredients,
  price,
}: UpdateFoodProps) => {
  try {
    const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack`;

    const response = await fetchWithAuth(url, {
      method: "PUT",
      body: JSON.stringify({
        id,
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(imageUrl && { imageUrl }),
        ...(price && { price }),
        ...(ingredients && ingredients.length > 0 && { ingredients }),
      }),
    });

    const { snack } = await response.json();

    return snack;
  } catch (err) {
    throw err;
  }
};

export const fetchCreateFood = async ({
  title,
  description,
  category,
  imageUrl,
  ingredients,
  price,
}: CreateFoodProps) => {
  try {
    const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack`;

    const response = await fetchWithAuth(url, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        category,
        imageUrl,
        price,
        ...(ingredients && ingredients.length > 0 && { ingredients }),
      }),
    });

    const { snack } = await response.json();

    return snack;
  } catch (err) {
    throw err;
  }
};
