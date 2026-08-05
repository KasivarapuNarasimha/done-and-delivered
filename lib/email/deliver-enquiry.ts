import { SITE_EMAIL, SITE_NAME } from "@/lib/constants";
import type { ContactEnquiryInput } from "@/lib/validations";

export type DeliveryResult = {
  ok: true;
  provider: "resend" | "formsubmit" | "log";
};

function buildPlainText(payload: ContactEnquiryInput): string {
  return [
    `New ${payload.source === "hero-consultation" ? "consultation" : "enquiry"} from ${SITE_NAME} website`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Company: ${payload.company || "—"}`,
    `Source: ${payload.source}`,
    payload.projectType ? `Project type: ${payload.projectType}` : null,
    payload.goal ? `Goal: ${payload.goal}` : null,
    payload.city ? `City: ${payload.city}` : null,
    payload.timeline ? `Timeline: ${payload.timeline}` : null,
    "",
    "Message:",
    payload.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

async function deliverViaResend(
  payload: ContactEnquiryInput,
  to: string,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY missing");

  const from =
    process.env.CONTACT_FROM_EMAIL ??
    `${SITE_NAME} <${SITE_EMAIL}>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `[${SITE_NAME}] ${payload.source === "hero-consultation" ? "Consultation" : "Enquiry"} — ${payload.name}`,
      text: buildPlainText(payload),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend failed (${response.status}): ${body}`);
  }

  return { ok: true, provider: "resend" };
}

/**
 * FormSubmit.co — works without an API key after the inbox confirms the first mail.
 * Prefer RESEND_API_KEY in production when available.
 */
async function deliverViaFormSubmit(
  payload: ContactEnquiryInput,
  to: string,
): Promise<DeliveryResult> {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        company: payload.company || "",
        _subject: `[${SITE_NAME}] Website enquiry — ${payload.name}`,
        _template: "table",
        _captcha: "false",
        _replyto: payload.email,
        source: payload.source,
        projectType: payload.projectType || "",
        goal: payload.goal || "",
        city: payload.city || "",
        timeline: payload.timeline || "",
        message: buildPlainText(payload),
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`FormSubmit failed (${response.status}): ${body}`);
  }

  return { ok: true, provider: "formsubmit" };
}

/**
 * Deliver an enquiry to the configured inbox.
 * Order: Resend (if RESEND_API_KEY) → FormSubmit (CONTACT_TO_EMAIL / SITE_EMAIL).
 * In development without outbound mail, logs the payload so local QA still works.
 */
export async function deliverEnquiry(
  payload: ContactEnquiryInput,
): Promise<DeliveryResult> {
  const to = process.env.CONTACT_TO_EMAIL?.trim() || SITE_EMAIL;

  if (process.env.RESEND_API_KEY) {
    return deliverViaResend(payload, to);
  }

  // Allow explicit skip for CI / sandbox (still validates request path)
  if (process.env.CONTACT_DELIVERY_MODE === "log") {
    console.info("[contact] CONTACT_DELIVERY_MODE=log", buildPlainText(payload));
    return { ok: true, provider: "log" };
  }

  try {
    return await deliverViaFormSubmit(payload, to);
  } catch (error) {
    // Local/dev fallback so the form integration remains testable without mail keys
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] mail provider unavailable, logging enquiry", error);
      console.info(buildPlainText(payload));
      return { ok: true, provider: "log" };
    }
    throw error;
  }
}
