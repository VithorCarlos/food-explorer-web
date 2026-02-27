import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { REVALIDATE } from "@/utils/enums/revalidate";

export const fetchAddFavorite = async (snackId: string, userId: string) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/favorite`;

  const response = await fetchOnServer(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ snackId }),
  });
  console.log(userId);
  if (response.success) {
    await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: [`${REVALIDATE.FETCH_FIND_MANY_FAVORITES}-${userId}`],
      }),
    });
  }
  return response;
};
