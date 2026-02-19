import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { TOKEN } from "@/utils/enums/cookie";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete(TOKEN.ACCESS_TOKEN);
  cookieStore.delete(TOKEN.REFRESH_TOKEN);

  return NextResponse.json({ success: true });
}
