import { CreateUserDTO, LoginUserDTO } from "@/dto/uset.dto";
import { env } from "@/env";
import { makeFetch } from "@/services/http/make-fetch";

interface ResponseLogin {
  accessToken: string;
  refreshToken: string;
}

export const fetchCreateUser = async ({
  name,
  email,
  password,
}: CreateUserDTO) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/users`;

  return await makeFetch({
    url,
    body: { name, email, password },
    method: "POST",
  });
};

export const fetchLogin = async ({ email, password }: LoginUserDTO) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/session`;

  return await makeFetch<ResponseLogin>({
    url,
    body: { email, password },
    method: "POST",
  });
};
