import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { SnackDTO } from "@/dto/snack.dto";
import { REVALIDATE } from "@/utils/enums/revalidate";

interface SearchSnacksRequest {
  page?: string;
  category?: string;
  perPage?: string;
  title?: string;
  ingredients?: string[];
}

interface SearchSnacksResponse {
  snacks: SnackDTO[];
  pagination: { total: number; hasMore: boolean; nextPage: number | null };
}

export const fetchSearchFoods = async ({
  page = "1",
  perPage = "4",
  category,
  title,
  ingredients,
}: SearchSnacksRequest): Promise<SearchSnacksResponse> => {
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
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack?${queryString}`;

  const { data, success } = await fetchOnServer(url, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: [REVALIDATE.FETCH_SEARCH_FOODS],
    },
  });

  if (!success) {
    env.NEXT_PUBLIC_NODE_ENV === "development" && console.error(data.message);
    return {
      snacks: [],
      pagination: {
        hasMore: false,
        nextPage: null,
        total: 0,
      },
    };
  }

  return data;
};
