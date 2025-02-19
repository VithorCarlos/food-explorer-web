import { TOKEN } from "@/utils/enums/cookie";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

export async function checkAuthentication(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const publicRoutes = ["/login", "/register"];

  const token = request.cookies.get(TOKEN.ACCESS_TOKEN);

  if (!token && !publicRoutes.some((route) => pathname.startsWith(route))) {
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
    url.pathname = "/";

    return NextResponse.redirect(url);
  }
}
