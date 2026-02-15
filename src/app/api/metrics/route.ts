import { NextResponse } from "next/server";
import type { ApiResponse } from "@/lib/types";

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json();

    const { sectionViewed, timestamp } = body;

    if (typeof sectionViewed !== "string" || !sectionViewed.trim()) {
      return NextResponse.json(
        { success: false, message: "sectionViewed is required." },
        { status: 400 },
      );
    }

    console.log(
      `[metrics] Section: ${sectionViewed} | Timestamp: ${timestamp || "N/A"}`,
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }
}
