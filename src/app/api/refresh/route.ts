import { env } from "@/env";
import { TOKEN } from "@/utils/enums/cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`;

  const response = await fetch(url, {
    method: "PATCH",
    credentials: "include",
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await response.json();

  const cookieStore = await cookies();

  cookieStore.set(TOKEN.ACCESS_TOKEN, data.accessToken, {
    httpOnly: true,
    maxAge: 15 * 60,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set(TOKEN.REFRESH_TOKEN, data.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ success: true });
}
