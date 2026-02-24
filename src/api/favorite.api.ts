import { SnackDTO } from "@/dto/snack.dto";
import { env } from "@/env";
import { fetchOnServer } from "@/services/http/fetch-on-server";

export const fetchAddFavorite = async ({ snackId }: SnackDTO) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/favorite`;

  const response = await fetchOnServer(url, {
    method: "POST",
    body: JSON.stringify({ snackId }),
  });

  return response;
};

export const fetchRemoveFavorite = async (id: string) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/favorite`;

  const response = await fetchOnServer(url, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  return response;
};

export const fetchFindManyFavorite = async (
  id: string,
  page: string,
  perPage: "10",
) => {
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
