import { env } from "@/env";
import { RequestErrorApi } from "@/utils/errors/request-error";
import { fetchOnServer } from "../http/fetch-on-server";

export const fetchDeleteUser = async () => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/users`;

  const response = await fetchOnServer(url, {
    method: "DELETE",
  });

  if (!response.success) {
    throw new RequestErrorApi(response.data.message, response.status);
  }

  return response;
};
