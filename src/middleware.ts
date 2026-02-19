import { NextResponse, type NextRequest } from "next/server";
import { checkAuthentication } from "./services/http/check-authentication";
import { cookies } from "next/headers";
import { TOKEN } from "./utils/enums/cookie";
import { env } from "./env";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(TOKEN.REFRESH_TOKEN)?.value;
  const accessToken = cookieStore.get(TOKEN.ACCESS_TOKEN)?.value;
  const cookieHeader = request.headers.get("cookie") || "";

  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const refreshResponse = await fetch(
        `${env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            cookie: cookieHeader,
          },
        },
      );

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await refreshResponse.json();

        response.cookies.set(TOKEN.ACCESS_TOKEN, newAccessToken, {
          maxAge: 15 * 60,
          path: "/",
        });

        response.cookies.set(TOKEN.REFRESH_TOKEN, newRefreshToken, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
          secure: false,
          path: "/",
        });

        return response;
      } else {
        response.cookies.delete(TOKEN.ACCESS_TOKEN);
        response.cookies.delete(TOKEN.REFRESH_TOKEN);
        return response;
      }
    } catch (error) {
      response.cookies.delete(TOKEN.ACCESS_TOKEN);
      response.cookies.delete(TOKEN.REFRESH_TOKEN);

      return response;
    }
  }

  const authResponse = checkAuthentication(request, refreshToken);

  if (authResponse) {
    return authResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
