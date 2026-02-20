"use server";
import { cookies } from "next/headers";
import { TOKEN } from "@/utils/enums/cookie";

export const fetchOnServer = async (
  input: string | URL | Request,
  init: RequestInit = {},
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKEN.ACCESS_TOKEN)?.value;
  const refreshToken = cookieStore.get(TOKEN.REFRESH_TOKEN)?.value;

  const cookiesToPush = [];

  if (accessToken) cookiesToPush.push(`${TOKEN.ACCESS_TOKEN}=${accessToken}`);

  if (refreshToken)
    cookiesToPush.push(`${TOKEN.REFRESH_TOKEN}=${refreshToken}`);

  const cookieHeader = cookiesToPush.join("; ");

  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(cookieHeader && { Cookie: cookieHeader }),
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response;
};
