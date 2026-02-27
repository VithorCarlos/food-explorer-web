import { NextResponse, type NextRequest } from "next/server";
import { checkAuthentication } from "./services/http/check-authentication";
import { cookies } from "next/headers";
import { TOKEN } from "./utils/enums/cookie";
import { env } from "./env";
import { isTokenExpired } from "./services/http/is-token-expired";
import { fetchRefreshToken } from "./services/refresh/fetch-refresh-token";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(TOKEN.REFRESH_TOKEN)?.value;
  const accessToken = cookieStore.get(TOKEN.ACCESS_TOKEN)?.value;

  const authResponse = checkAuthentication(request, refreshToken);

  if (authResponse) {
    if (!refreshToken) {
      authResponse.cookies.delete(TOKEN.ACCESS_TOKEN);
    }
    return authResponse;
  }

  const needsRefresh = !accessToken || isTokenExpired(accessToken);

  if (needsRefresh && refreshToken) {
    try {
      const { newAccessToken, newRefreshToken } =
        await fetchRefreshToken(refreshToken);

      const response = NextResponse.next();

      response.cookies.set(TOKEN.ACCESS_TOKEN, newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60,
        secure: env.NEXT_PUBLIC_NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      response.cookies.set(TOKEN.REFRESH_TOKEN, newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
        secure: env.NEXT_PUBLIC_NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return response;
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(TOKEN.ACCESS_TOKEN);
      response.cookies.delete(TOKEN.REFRESH_TOKEN);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*|login|register).*)"],
};
