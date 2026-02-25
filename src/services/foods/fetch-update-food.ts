import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";

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
};
