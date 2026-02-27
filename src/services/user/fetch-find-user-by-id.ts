import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";

export const fetchFindUserById = async () => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/users`;

  return await fetchOnServer(url, {
    method: "GET",
  });
};
