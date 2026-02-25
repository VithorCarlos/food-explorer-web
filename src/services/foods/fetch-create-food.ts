import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { fetchOnServer } from "../http/fetch-on-server";
import { env } from "@/env";

interface CreateFoodRequest {
  title: string;
  description: string;
  category: FOOD_CATEGORIES;
  price: number;
  attachmentId: string;
  ingredients?: string[];
}

export const fetchCreateFood = async ({
  title,
  description,
  category,
  attachmentId,
  ingredients,
  price,
}: CreateFoodRequest) => {
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
