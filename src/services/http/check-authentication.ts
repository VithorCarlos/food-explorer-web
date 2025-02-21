import { TOKEN } from "@/utils/enums/cookie";
import { NextRequest, NextResponse } from "next/server";

export async function checkAuthentication(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const publicRoutes = ["/login", "/register"];
  const token = request.cookies.get(TOKEN.REFRESH_TOKEN)?.value;

  if (!token && !publicRoutes.some((route) => pathname.startsWith(route))) {
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
    url.pathname = "/";

    return NextResponse.redirect(url);
  }
}
