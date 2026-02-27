import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { fetchOnServer } from "../http/fetch-on-server";
import { env } from "@/env";
import { REVALIDATE } from "@/utils/enums/revalidate";

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
    headers: {
      "Content-Type": "application/json",
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

  if (response.success) {
    await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: [
          `${REVALIDATE.FETCH_FIND_ONE_FOOD}`,
          `${REVALIDATE.FETCH_ACTIVE_CATEGORIES}`,
        ],
      }),
    });
  }

  return response;
};
