export const SITE_NAME = "Done & Delivered";

/** Production domain — use for metadataBase, sitemap, canonicals, JSON-LD */
export const SITE_URL = "https://doneanddelivered.co.in";

/** Approved brand tagline — use everywhere for hero / SEO consistency */
export const SITE_TAGLINE = "Premium Reach for Premium Properties";

/**
 * Official contact details (single source of truth).
 * Do not hardcode alternate numbers in components.
 */
export const SITE_PHONE = "+91 91104 17950";
export const SITE_PHONE_HREF = "tel:+919110417950";
export const SITE_WHATSAPP = "https://wa.me/919110417950";

export const SITE_EMAIL = "hello@doneanddelivered.com";
export const SITE_ADDRESS =
  "Swamy Vivekananda Road, Sarjapura Road, Bengaluru, Karnataka – 562125";

/**
 * Google Maps embed for the official office address (no API key required).
 */
export const SITE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Swamy+Vivekananda+Road+Sarjapura+Road+Bengaluru+Karnataka+562125&z=16&output=embed";

export const SITE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=Swamy+Vivekananda+Road,+Sarjapura+Road,+Bengaluru,+Karnataka+562125";

/** WhatsApp number without + for wa.me links */
export const SITE_WHATSAPP_NUMBER = "919110417950";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${SITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const BRAND = {
  primary: "#0B2E83",
  secondary: "#FFFFFF",
  accent: "#D4AF37",
  background: "#F7FAFF",
  text: "#1E293B",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Projects",
    href: "/#ongoing-projects",
    mega: true,
  },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#marketing-process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Official social profiles.
 * TODO: Replace href with verified Done & Delivered profile URLs when marketing
 * provides them. Until then links are omitted from the UI (href is null).
 */
export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    // TODO: Official LinkedIn URL pending from Done & Delivered marketing
    href: null as string | null,
    platform: "linkedin" as const,
  },
  {
    label: "Instagram",
    // TODO: Official Instagram URL pending from Done & Delivered marketing
    href: null as string | null,
    platform: "instagram" as const,
  },
  {
    label: "Facebook",
    // TODO: Official Facebook URL pending from Done & Delivered marketing
    href: null as string | null,
    platform: "facebook" as const,
  },
  {
    label: "YouTube",
    // TODO: Official YouTube URL pending from Done & Delivered marketing
    href: null as string | null,
    platform: "youtube" as const,
  },
] as const;

/** sessionStorage key for hero → contact consultation handoff */
export const CONSULTATION_STORAGE_KEY = "dd-consultation-request";
