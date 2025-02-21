import { NextRequest, NextResponse } from "next/server";

export async function checkAuthentication(
  request: NextRequest,
  refreshToken?: string,
) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const publicRoutes = ["/login", "/register"];

  if (
    !refreshToken &&
    !publicRoutes.some((route) => pathname.startsWith(route))
  ) {
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  if (
    refreshToken &&
    publicRoutes.some((route) => pathname.startsWith(route))
  ) {
    url.pathname = "/";

    return NextResponse.redirect(url);
  }
}
