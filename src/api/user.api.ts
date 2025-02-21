"use server";
import { CreateUserDTO, LoginUserDTO, TokensDTO } from "@/dto/user.dto";
import { env } from "@/env";
import { TOKEN } from "@/utils/enums/cookie";
import { cookies } from "next/headers";

interface ResponseLogin {
  status: number;
}

export const fetchCreateUser = async ({
  name,
  email,
  password,
}: CreateUserDTO) => {
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

export const fetchLogin = async ({
  email,
  password,
}: LoginUserDTO): Promise<ResponseLogin> => {
  try {
    const url = `${env.NEXT_PUBLIC_API_BASE_URL}/session`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw response;
    }

    const user = await response.json();

    const storeCookie = await cookies();

    storeCookie.set(TOKEN.ACCESS_TOKEN, user.accessToken, {
      maxAge: 15 * 60, // 15m
    });

    storeCookie.set(TOKEN.REFRESH_TOKEN, user.refreshToken, {
      maxAge: 7 * 24 * 60 * 60, // 7days
      httpOnly: true,
      secure: false,
      path: "/",
    });

    return {
      status: response.status,
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
