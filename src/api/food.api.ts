import { SearchSnacksDTO } from "@/dto/snack.dto";
import { env } from "@/env";
import { fetchWithAuth } from "@/services/http/fetchWithAuth";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { redirect } from "next/navigation";

interface UpdateFoodProps {
  snackId: string;
  title?: string;
  description?: string;
  category?: FOOD_CATEGORIES;
  price?: number;
  ingredients?: string[];
  attachmentId?: string;
}

interface CreateFoodProps {
  title: string;
  description: string;
  category: FOOD_CATEGORIES;
  price: number;
  attachmentId: string;
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
      cache: "no-store",
    });
    const data = await response.json();

    return data;
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      redirect("/login");
    }

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
    throw err;
  }
};

export const fetchUpdateFood = async ({
  snackId,
  title,
  description,
  category,
  price,
  attachmentId,
  ingredients,
}: UpdateFoodProps) => {
  try {
    const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack/${snackId}`;

    const response = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(price && { price }),
        ...(attachmentId && { attachmentId }),
        ...(ingredients && { ingredients }),
      }),
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchDeleteFood = async (snackId: string) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack/${snackId}`;

  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });

  return response;
};

export const fetchCreateFood = async ({
  title,
  description,
  category,
  attachmentId,
  ingredients,
  price,
}: CreateFoodProps) => {
  try {
    const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack`;

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        category,
        attachmentId,
        price,
        ...(ingredients && ingredients.length > 0 && { ingredients }),
      }),
    });

    return response;
  } catch (err) {
    throw err;
  }
};
