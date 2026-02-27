import { REVALIDATE } from "@/utils/enums/revalidate";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { tags } = await request.json();
    if (!tags || !Array.isArray(tags)) {
      return NextResponse.json(
        { message: "Tags must be an array" },
        { status: 400 },
      );
    }

    tags.forEach((tag: REVALIDATE) => {
      revalidateTag(tag);
    });

    return NextResponse.json({
      status: 200,
      message: "Tags revalidated with successfully",
    });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
