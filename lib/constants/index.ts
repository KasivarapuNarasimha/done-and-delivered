export const SITE_NAME = "Done & Delivered";
export const SITE_TAGLINE = "Premium Reach for Premium Properties";
export const SITE_PHONE = "+91 98765 43210";
export const SITE_PHONE_HREF = "tel:+919876543210";
export const SITE_WHATSAPP = "https://wa.me/919876543210";
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
