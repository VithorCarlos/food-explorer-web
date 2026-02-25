import { env } from "@/env";

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

  return await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
};
