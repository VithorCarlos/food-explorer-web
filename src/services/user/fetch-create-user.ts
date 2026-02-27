import { env } from "@/env";
import { RequestErrorApi } from "@/utils/errors/request-error";

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export const fetchCreateUser = async ({
  name,
  email,
  password,
}: CreateUserRequest) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/users`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new RequestErrorApi(data.message, response.status);
  }

  return response;
};
