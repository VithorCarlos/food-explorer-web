import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { PRODUCT_CATEGORIES } from "@/utils/enums/product-categories";
import { REVALIDATE } from "@/utils/enums/revalidate";

interface UpdateProductRequest {
  productId: string;
  title?: string;
  description?: string;
  category?: PRODUCT_CATEGORIES;
  price?: number;
  ingredients?: string[];
  attachmentId?: string;
}

export const fetchUpdateProduct = async ({
  productId,
  title,
  description,
  category,
  price,
  attachmentId,
  ingredients,
}: UpdateProductRequest) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/product/${productId}`;

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
      ...(ingredients?.length && { ingredients }),
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
