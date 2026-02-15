import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimiter";
import { validateWaitlistForm, sanitize } from "@/lib/validators";
import type { WaitlistEntry, ApiResponse } from "@/lib/types";

const waitlistEmails = new Set<string>();
const waitlistEntries: WaitlistEntry[] = [];

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
    const validation = validateWaitlistForm(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 },
      );
    }

    const email = sanitize(body.email).toLowerCase();

    if (waitlistEmails.has(email)) {
      return NextResponse.json(
        { success: true, message: "You are already on the waitlist." },
        { status: 200 },
      );
    }

    waitlistEmails.add(email);
    waitlistEntries.push({ email, createdAt: new Date().toISOString() });

    console.log(
      `[waitlist] New signup: ${email} | Total: ${waitlistEntries.length}`,
    );

    return NextResponse.json(
      { success: true, message: "Successfully joined the waitlist." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }
}
