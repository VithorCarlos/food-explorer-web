import { SearchSnacksDTO, SnackDTO } from "@/dto/snack.dto";

import { env } from "@/env";
import { fetchOnServer } from "@/services/http/fetch-on-server";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { revalidateTag } from "next/cache";
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
  perPage = "4",
  category,
  title,
  ingredients,
}: SearchSnacksDTO) => {
  const queryParams = new URLSearchParams({
    page,
    perPage,
    ...((!title || !ingredients) && { category }),
    ...(title && { title }),
  });

  if (ingredients) {
    ingredients.forEach((ingredient) => {
      queryParams.append("ingredients", ingredient);
    });
  }
  const queryString = queryParams.toString();
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack?${queryString}`;

  console.log({ url });

  const { data, success } = await fetchOnServer(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!success) {
    env.NEXT_PUBLIC_NODE_ENV === "development" && console.error(data.message);
    return [];
  }

  return data;
};

export const fetchActiveCategories = async (): Promise<{
  categories: FOOD_CATEGORIES[];
}> => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack/active-categories`;

  const { data } = await fetchOnServer(url, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: ["active-categories"],
    },
  });

  return data;
};

export const findOneFood = async (id: string): Promise<{ snack: SnackDTO }> => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack/${id}`;

  const { data } = await fetchOnServer(url, {
    method: "GET",
  });

  return data;
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
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack/${snackId}`;

  const response = await fetchOnServer(url, {
    method: "PUT",
    body: JSON.stringify({
      ...(title && { title }),
      ...(description && { description }),
      ...(category && { category }),
      ...(price && { price }),
      ...(attachmentId && { attachmentId }),
      ...(ingredients && { ingredients }),
    }),
  });

  revalidateTag("active-categories");

  return response;
};

export const fetchDeleteFood = async (snackId: string) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack/${snackId}`;

  const response = await fetchOnServer(url, {
    method: "DELETE",
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
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack`;

  const response = await fetchOnServer(url, {
    method: "POST",

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
};
