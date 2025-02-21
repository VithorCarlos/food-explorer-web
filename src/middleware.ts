import { NextResponse, type NextRequest } from "next/server";
import { checkAuthentication } from "./services/http/check-authentication";
import { cookies } from "next/headers";
import { TOKEN } from "./utils/enums/cookie";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(TOKEN.REFRESH_TOKEN)?.value;
  let accessToken = cookieStore.get(TOKEN.ACCESS_TOKEN)?.value;

  if (!accessToken && refreshToken) {
    try {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await refreshResponse.json();

        accessToken = newAccessToken;

        cookieStore.set(TOKEN.ACCESS_TOKEN, newAccessToken, {
          maxAge: 15 * 60, // 15m
        });

        cookieStore.set(TOKEN.REFRESH_TOKEN, newRefreshToken, {
          maxAge: 7 * 24 * 60 * 60, // 7days
          httpOnly: true,
          secure: false,
          path: "/",
        });

        return NextResponse.next();
      }
    } catch (error) {
      console.error("Erro ao atualizar o token:", error);
    }
  }

  if (!refreshToken) {
    cookieStore.delete(TOKEN.ACCESS_TOKEN);
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
