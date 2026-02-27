import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { REVALIDATE } from "@/utils/enums/revalidate";

export const fetchDeleteProduct = async (productId: string) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/product/${productId}`;

  const response = await fetchOnServer(url, {
    method: "DELETE",
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
