import { env } from "@/env";
import { TOKEN } from "@/utils/enums/cookie";
import { RequestErrorApi } from "@/utils/errors/request-error";

interface RefreshTokenResponse {
  newAccessToken: string;
  newRefreshToken: string;
}

export const fetchRefreshToken = async (
  token: string,
): Promise<RefreshTokenResponse> => {
  const refreshResponse = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
    {
      method: "PATCH",
      headers: {
        accept: "application/json",
        Cookie: `${TOKEN.REFRESH_TOKEN}=${token}`,
      },
    },
  );

  const data = await refreshResponse.json();
  if (!refreshResponse.ok) {
    throw new RequestErrorApi(data.message, data.status);
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;

  return {
    newRefreshToken,
    newAccessToken,
  };
};
