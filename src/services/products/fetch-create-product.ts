import { fetchOnServer } from "../http/fetch-on-server";
import { env } from "@/env";
import { PRODUCT_CATEGORIES } from "@/utils/enums/product-categories";
import { REVALIDATE } from "@/utils/enums/revalidate";

interface CreateProductRequest {
  title: string;
  description?: string;
  category: PRODUCT_CATEGORIES;
  price: number;
  attachmentId: string;
  ingredients?: string[];
}

export const fetchCreateProduct = async ({
  title,
  description,
  category,
  attachmentId,
  ingredients,
  price,
}: CreateProductRequest) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/product`;

  const response = await fetchOnServer(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      ...(description && { description }),
      ...(ingredients && ingredients.length > 0 && { ingredients }),
      category,
      attachmentId,
      price,
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
          `${REVALIDATE.FETCH_FIND_ONE_PRODUCT}`,
          `${REVALIDATE.FETCH_ACTIVE_CATEGORIES}`,
        ],
      }),
    });
  }

  return response;
};
