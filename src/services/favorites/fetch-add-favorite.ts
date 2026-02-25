import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";

export const fetchAddFavorite = async (snackId: string) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/favorite`;

  const response = await fetchOnServer(url, {
    method: "POST",
    body: JSON.stringify({ snackId }),
  });

  return response;
};
