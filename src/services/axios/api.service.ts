import { fetchUpdateTokens } from "@/api/user.api";
import { env } from "@/env";
import { TOKEN } from "@/utils/enums/cookie";
import axios from "axios";
import { cookies } from "next/headers";
import { getCookie, setCookie, deleteCookie } from "cookies-next/client";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 1000 * 60,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = cookies().get(TOKEN.ACCESS_TOKEN)?.value;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = cookies().get(TOKEN.REFRESH_TOKEN)?.value;
      if (!refreshToken) throw new Error("Refresh token not found");

      try {
        const { data } = await axios.patch(
          `${env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            withCredentials: true,
          },
        );

        cookies().set(TOKEN.ACCESS_TOKEN, data.accessToken, { maxAge: 6 });

        cookies().set(TOKEN.REFRESH_TOKEN, data.refreshToken, {
          maxAge: 7 * 24 * 60 * 60, // 7days
          httpOnly: true,
          secure: false,
          path: "/",
        });

        const response = await fetchUpdateTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        if (!response.ok) {
          throw new Error("Error on setting tokens");
        }

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return axios(originalRequest);
      } catch (err) {
        console.error("Error refreshing token:", err);
        return Promise.reject(err);
      }
    }
  },
);

export { api };
