"use server";
import { CreateUserDTO, LoginUserDTO, TokensDTO } from "@/dto/user.dto";
import { env } from "@/env";
import { api } from "@/services/axios/api.service";
import { TOKEN } from "@/utils/enums/cookie";
import { cookies } from "next/headers";
import { getCookie, setCookie, deleteCookie } from "cookies-next/client";

interface ResponseLogin {
  status: number;
}

export const fetchCreateUser = async ({
  name,
  email,
  password,
}: CreateUserDTO) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/users`;

  // return await fetchWithAuth({
  //   url,
  //   body: { name, email, password },
  //   method: "POST",
  // });
};

export const fetchLogin = async ({
  email,
  password,
}: LoginUserDTO): Promise<ResponseLogin> => {
  try {
    const { data: user, status } = await api.post("/session", {
      email,
      password,
    });

    setCookie(TOKEN.ACCESS_TOKEN, user.accessToken);

    setCookie(TOKEN.REFRESH_TOKEN, user.refreshToken, {
      maxAge: 7 * 24 * 60 * 60, // 7days
      httpOnly: true,
      secure: false,
      path: "/",
    });

    return {
      status,
    };
  } catch (err) {
    throw err;
  }
};

export const fetchUpdateTokens = async ({
  accessToken,
  refreshToken,
}: TokensDTO) => {
  try {
    const url = `${env.NEXT_PUBLIC_APP_URL}/api/set-tokens`;

    return await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
        refreshToken: refreshToken,
      }),
    });
  } catch (err) {
    throw err;
  }
};
