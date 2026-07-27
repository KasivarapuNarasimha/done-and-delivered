import { NextResponse } from "next/server";
import { deliverEnquiry } from "@/lib/email/deliver-enquiry";
import { contactEnquirySchema } from "@/lib/validations";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

type RateBucket = { count: number; resetAt: number };

const rateBuckets = new Map<string, RateBucket>();

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  try {
    const clientKey = getClientKey(request);
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many requests. Please wait a minute and try again.",
        },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 },
      );
    }

    const parsed = contactEnquirySchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          ok: false,
          error: "Please fix the highlighted fields.",
          fieldErrors,
        },
        { status: 400 },
      );
    }

    // Honeypot triggered — pretend success to bots
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const result = await deliverEnquiry(parsed.data);

    return NextResponse.json({
      ok: true,
      provider: result.provider,
      message:
        "Thank you. Your enquiry has been received — our team will connect shortly.",
    });
  } catch (error) {
    console.error("[api/contact]", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not deliver your enquiry right now. Please call or WhatsApp us, or try again shortly.",
      },
      { status: 502 },
    );
  }
}
