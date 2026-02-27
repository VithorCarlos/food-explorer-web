import { cookies } from "next/headers";
import { TOKEN } from "./enums/cookie";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const getUserId = async (): Promise<{ id: string } | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKEN.ACCESS_TOKEN)?.value;

  if (!accessToken) return null;

  try {
    const { payload } = await jwtVerify(accessToken, secret);

    if (!payload.sub) return null;

    return { id: payload.sub as string };
  } catch {
    return null;
  }
};
