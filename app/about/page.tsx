import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { About } from "@/components/sections/About";
import { CoreValues } from "@/components/sections/CoreValues";
import { MarketingPhilosophy } from "@/components/sections/MarketingPhilosophy";
import { CTA } from "@/components/sections/CTA";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Done & Delivered—our company story, mission, vision, core values, and marketing philosophy for premium real-estate brands.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${SITE_NAME}`,
    description: `${SITE_TAGLINE}. Specialized real-estate marketing for builders and developers.`,
    url: `${SITE_URL}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${SITE_NAME}`,
    description: `${SITE_TAGLINE}. Company story, mission, vision, and partnership philosophy.`,
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Done & Delivered"
        title="The marketing partner for premium projects"
        description="We are a specialized real-estate marketing agency—built to give exceptional projects premium reach, precise targeting, and end-to-end launch excellence."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
        icon={<Building2 className="h-3.5 w-3.5 text-accent" aria-hidden />}
        primaryCta={{ label: "Contact Us", href: "/contact", variant: "gold" }}
        secondaryCta={{
          label: "Explore Services",
          href: "/#services",
          variant: "ghost",
        }}
      />
      <About />
      <CoreValues />
      <MarketingPhilosophy />
      <CTA />
    </>
  );
}
