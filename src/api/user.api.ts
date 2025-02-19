import { CreateUserDTO, LoginUserDTO } from "@/dto/user.dto";
import { env } from "@/env";
import { fetchWithAuth } from "@/services/http/make-fetch";
import { JWT } from "next-auth/jwt";

interface ResponseLogin {
  accessToken: string;
  refreshToken: {
    id: string;
    userId: string;
    expiresIn: number;
  };
}

export const fetchCreateUser = async ({
  name,
  email,
  password,
}: CreateUserDTO) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/users`;

  return await fetchWithAuth({
    url,
    body: { name, email, password },
    method: "POST",
  });
};

export const fetchLogin = async ({ email, password }: LoginUserDTO) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/session`;

  return await fetchWithAuth<ResponseLogin>({
    url,
    body: { email, password },
    method: "POST",
  });
};
