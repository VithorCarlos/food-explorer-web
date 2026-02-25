import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { FavoriteDTO } from "@/dto/favorite.dto";
import { REVALIDATE } from "@/utils/enums/revalidate";

interface FindManyFavoriteResponse {
  favorites: FavoriteDTO[];
  pagination: { total: number; hasMore: boolean; nextPage: number | null };
}

export const fetchFindManyFavorite = async (
  page: string,
  perPage: string,
): Promise<FindManyFavoriteResponse> => {
  const queryParams = new URLSearchParams({
    page,
    perPage,
  });

  const queryString = queryParams.toString();

  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/favorite?${queryString}`;

  const { data, success } = await fetchOnServer(url, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: [REVALIDATE.FETCH_FIND_MANY_FAVORITES],
    },
  });

  if (!success) {
    env.NEXT_PUBLIC_NODE_ENV === "development" && console.error(data.message);
    return {
      favorites: [],
      pagination: {
        hasMore: false,
        nextPage: null,
        total: 0,
      },
    };
  }

  return data;
};
