import { NextResponse, type NextRequest } from "next/server";
import { checkAuthentication } from "./services/http/check-authentication";

export async function middleware(request: NextRequest) {
  const authResponse = checkAuthentication(request);

  if (authResponse) {
    return authResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
