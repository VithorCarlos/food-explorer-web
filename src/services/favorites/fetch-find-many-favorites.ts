import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";

export const fetchFindManyFavorite = async (page: string, perPage: string) => {
  const queryParams = new URLSearchParams({
    page,
    perPage,
  });

  const queryString = queryParams.toString();

  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/favorite?${queryString}`;

  const response = await fetchOnServer(url, {
    method: "GET",
  });

  return response;
};
