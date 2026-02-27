import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { REVALIDATE } from "@/utils/enums/revalidate";

interface UpdateFoodRequest {
  snackId: string;
  title?: string;
  description?: string;
  category?: FOOD_CATEGORIES;
  price?: number;
  ingredients?: string[];
  attachmentId?: string;
}

export const fetchUpdateFood = async ({
  snackId,
  title,
  description,
  category,
  price,
  attachmentId,
  ingredients,
}: UpdateFoodRequest) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack/${snackId}`;

  const response = await fetchOnServer(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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
