export const SITE_NAME = "Done & Delivered";

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
  "Level 12, Prestige Towers, MG Road, Bengaluru 560001";

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
