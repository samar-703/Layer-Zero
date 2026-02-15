import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimiter";
import { validateContactForm, sanitize } from "@/lib/validators";
import type { ApiResponse } from "@/lib/types";

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse>> {
  try {
    const ip = getClientIp(request);

    if (!rateLimit(ip).success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const validation = validateContactForm(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 },
      );
    }

    const name = sanitize(body.name);
    const email = sanitize(body.email).toLowerCase();
    const message = sanitize(body.message);

    console.log(
      `[contact] From: ${name} <${email}> | Message: ${message.substring(0, 100)}...`,
    );

    return NextResponse.json(
      {
        success: true,
        message: "Message received. We will get back to you soon.",
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }
}
