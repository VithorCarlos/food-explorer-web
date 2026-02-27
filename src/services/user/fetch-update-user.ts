import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { RequestErrorApi } from "@/utils/errors/request-error";

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export const fetchUpdateUser = async ({
  name,
  email,
  password,
}: UpdateUserRequest) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/users`;

  const response = await fetchOnServer(url, {
    method: "PUT",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password }),
    }),
  });

  if (!response.success) {
    throw new RequestErrorApi(response.data.message, response.status);
  }

  return response;
};
