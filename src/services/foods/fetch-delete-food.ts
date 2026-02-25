import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { revalidateTags } from "@/utils/revalidate-tags";

export const fetchDeleteFood = async (snackId: string) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack/${snackId}`;

  const response = await fetchOnServer(url, {
    method: "DELETE",
  });

  revalidateTags();
  return response;
};
