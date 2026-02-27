import { env } from "@/env";
import { PRODUCT_CATEGORIES } from "@/utils/enums/product-categories";
import { fetchOnServer } from "../http/fetch-on-server";
import { REVALIDATE } from "@/utils/enums/revalidate";

export const fetchActiveProductCategories = async (): Promise<{
  categories: PRODUCT_CATEGORIES[];
}> => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/product/active-categories`;

  const { data } = await fetchOnServer(url, {
    method: "GET",
    cache: "force-cache",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: [REVALIDATE.FETCH_ACTIVE_CATEGORIES],
    },
  });

  return data;
};
