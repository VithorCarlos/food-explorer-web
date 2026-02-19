import { TOKEN } from "@/utils/enums/cookie";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { accessToken, refreshToken } = await req.json();
  if (!accessToken || !refreshToken) {
    return new Response("Tokens are required", { status: 400 });
  }

  const cookieStore = await cookies();

  cookieStore.delete(TOKEN.ACCESS_TOKEN);
  cookieStore.delete(TOKEN.ACCESS_TOKEN);

  cookieStore.set(TOKEN.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    maxAge: 15 * 60,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set(TOKEN.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Tokens refreshed" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
