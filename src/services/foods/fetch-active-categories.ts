import { env } from "@/env";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { fetchOnServer } from "../http/fetch-on-server";

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
