import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { ProductDTO } from "@/dto/product.dto";

interface SearchProductsRequest {
  page?: string;
  category?: string;
  perPage?: string;
  title?: string;
  ingredients?: string[];
}

interface SearchProductsResponse {
  products: ProductDTO[];
  pagination: { total: number; hasMore: boolean; nextPage: number | null };
}

export const fetchSearchProducts = async ({
  page = "1",
  perPage = "4",
  category,
  title,
  ingredients,
}: SearchProductsRequest): Promise<SearchProductsResponse> => {
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
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/product?${queryString}`;

  const { data, success } = await fetchOnServer(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!success) {
    env.NEXT_PUBLIC_NODE_ENV === "development" && console.error(data.message);
    return {
      products: [],
      pagination: {
        hasMore: false,
        nextPage: null,
        total: 0,
      },
    };
  }

  return data;
};
