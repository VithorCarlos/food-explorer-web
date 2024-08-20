import { env } from "@/env";
import { TOKEN } from "@/utils/enums/cookie";
import { RequestErrorApi } from "@/utils/errors/request-error";
import { getCookie, setCookie } from "cookies-next";

interface MakeRequestProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any>;
  token?: string;
  init?: RequestInit;
}

interface ResponseProps<T> {
  statusCode: number;
  data: T;
}

export const makeFetch = async <T>({
  url,
  method,
  body,
  init,
}: MakeRequestProps): Promise<ResponseProps<T>> => {
  const bodyConverted = JSON.stringify({ ...body });

  try {
    let accessToken = getCookie(TOKEN.ACCESS_TOKEN);
    let refreshToken = getCookie(TOKEN.REFRESH_TOKEN);

    if (!accessToken && refreshToken) {
      const refreshTokenUrl = `${env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`;

      const response = await fetch(refreshTokenUrl, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new RequestErrorApi(message, response.status);
      }

      const { accessToken: newAccessToken } = await response.json();

      setCookie(TOKEN.ACCESS_TOKEN, newAccessToken, {
        maxAge: 60 * 15, // 15 minutes
      });

      accessToken = newAccessToken;
    }

    const response = await fetch(url, {
      method,
      headers: {
        accept: "application/json",
        ...(body && { "Content-Type": "application/json" }),
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      ...(body && { body: bodyConverted }),
      credentials: "include",
      ...init,
    });

    const statusCode = response.status;

    if (!response.ok) {
      const { message } = await response.json();
      throw new RequestErrorApi(message, statusCode);
    }

    const data: T = await response.json().catch(() => undefined);

    return {
      statusCode,
      ...(data && { data }),
    };
  } catch (err) {
    if (err instanceof RequestErrorApi) {
      throw err;
    }

    throw new Error(
      "Ocorreu um erro inesperado, por favor, tente novamente mais tarde!",
    );
  }
};
