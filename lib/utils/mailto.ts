/** Shared business-enquiry mailto (About CTAs). */
export const BUSINESS_ENQUIRY_MAILTO =
  "mailto:hello@doneanddelivered.com?subject=Business%20Enquiry";

/**
 * Open the default mail client for a business enquiry.
 * If mailto is blocked/unsupported (common on some mobile browsers),
 * fall back to the contact page.
 */
export function openBusinessEnquiryMail(fallbackPath = "/contact") {
  if (typeof window === "undefined") return;

  try {
    window.location.href = BUSINESS_ENQUIRY_MAILTO;
  } catch {
    window.location.assign(fallbackPath);
    return;
  }

  // Mobile browsers without a mail app often ignore mailto silently.
  // Desktop clients usually leave the tab focused, so only fall back on mobile.
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (!isMobile) return;

  window.setTimeout(() => {
    if (document.visibilityState === "visible") {
      window.location.assign(fallbackPath);
    }
  }, 1000);
}
