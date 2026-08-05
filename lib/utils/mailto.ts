import { SITE_EMAIL } from "@/lib/constants";

/** Shared business-enquiry mailto (About CTAs). */
export const BUSINESS_ENQUIRY_MAILTO = `mailto:${SITE_EMAIL}?subject=Business%20Enquiry`;

/**
 * Open the default mail client for a business enquiry.
 * If the environment ignores/blocks mailto (common when no mail app is
 * configured), navigate to the contact page after a short delay.
 */
export function openBusinessEnquiryMail(fallbackPath = "/contact") {
  if (typeof window === "undefined") return;

  let leftPage = false;
  const markLeft = () => {
    leftPage = true;
  };

  window.addEventListener("blur", markLeft, { once: true });
  window.addEventListener("pagehide", markLeft, { once: true });
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState === "hidden") markLeft();
    },
    { once: true },
  );

  // Most reliable way to invoke the OS mail handler
  try {
    const anchor = document.createElement("a");
    anchor.href = BUSINESS_ENQUIRY_MAILTO;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } catch {
    window.location.assign(fallbackPath);
    return;
  }

  // Also try location.assign — some desktop agents only respond to this
  try {
    window.location.assign(BUSINESS_ENQUIRY_MAILTO);
  } catch {
    window.location.assign(fallbackPath);
    return;
  }

  // If the page never loses focus/visibility, mailto was ignored → contact page
  window.setTimeout(() => {
    if (!leftPage && document.visibilityState === "visible") {
      window.location.assign(fallbackPath);
    }
  }, 800);
}
