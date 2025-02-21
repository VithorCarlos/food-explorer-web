"use server";
import { cookies } from "next/headers";
import { TOKEN } from "@/utils/enums/cookie";
import { fetchUpdateTokens } from "@/api/user.api";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let cookieStore = await cookies();
  let accessToken = cookieStore.get(TOKEN.ACCESS_TOKEN)?.value;
  const refreshToken = cookieStore.get(TOKEN.REFRESH_TOKEN)?.value;

  const fetchWithToken = async (token: string) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  let response = await fetchWithToken(accessToken!);

  if (response.status === 401 && refreshToken) {
    try {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await refreshResponse.json();

        await fetchUpdateTokens({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        response = await fetchWithToken(newAccessToken);
      }
    } catch (error) {
      throw error;
    }
  }

  return response;
};
