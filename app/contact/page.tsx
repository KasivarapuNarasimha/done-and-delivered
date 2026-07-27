import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Contact } from "@/components/sections/Contact";
import { ContactFAQ } from "@/components/sections/ContactFAQ";
import {
  SITE_NAME,
  SITE_PHONE,
  SITE_PHONE_HREF,
  SITE_TAGLINE,
  SITE_URL,
  SITE_WHATSAPP,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Done & Delivered for project branding, performance marketing, lead generation, and full-funnel sales enablement. Call, WhatsApp, or send an enquiry.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact ${SITE_NAME}`,
    description: `Book a consultation with Done & Delivered. Call ${SITE_PHONE} or send a project enquiry.`,
    url: `${SITE_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${SITE_NAME}`,
    description: `${SITE_TAGLINE}. Reach our team for premium project marketing support.`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s plan your next premium launch"
        description="Share your project goals—our team responds with clear next steps for branding, performance media, leads, and sales enablement."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        icon={
          <MessageSquare className="h-3.5 w-3.5 text-accent" aria-hidden />
        }
        primaryCta={{
          label: "WhatsApp",
          href: SITE_WHATSAPP,
          variant: "gold",
          external: true,
        }}
        secondaryCta={{
          label: `Call ${SITE_PHONE}`,
          href: SITE_PHONE_HREF,
          variant: "ghost",
        }}
      />
      <Contact />
      <ContactFAQ />
    </>
  );
}
