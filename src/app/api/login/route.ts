// app/api/login/route.ts

import { env } from "@/env";
import { TOKEN } from "@/utils/enums/cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/session`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: data.message },
      { status: response.status },
    );
  }

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
