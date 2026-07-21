import dynamic from "next/dynamic";
import { PageLoad } from "@/components/animations/PageLoad";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyChoose } from "@/components/sections/WhyChoose";

/**
 * Below-the-fold sections are code-split for faster initial paint / LCP.
 */
const MarketingProcess = dynamic(
  () =>
    import("@/components/sections/MarketingProcess").then(
      (m) => m.MarketingProcess,
    ),
  { ssr: true },
);

const SalesFunnel = dynamic(
  () =>
    import("@/components/sections/SalesFunnel").then((m) => m.SalesFunnel),
  { ssr: true },
);

const MarketingTimeline = dynamic(
  () =>
    import("@/components/sections/MarketingTimeline").then(
      (m) => m.MarketingTimeline,
    ),
  { ssr: true },
);

const OngoingProjects = dynamic(
  () =>
    import("@/components/sections/OngoingProjects").then(
      (m) => m.OngoingProjects,
    ),
  { ssr: true },
);

const CompletedProjects = dynamic(
  () =>
    import("@/components/sections/CompletedProjects").then(
      (m) => m.CompletedProjects,
    ),
  { ssr: true },
);

const FeaturedDevelopers = dynamic(
  () =>
    import("@/components/sections/FeaturedDevelopers").then(
      (m) => m.FeaturedDevelopers,
    ),
  { ssr: true },
);

const CTA = dynamic(
  () => import("@/components/sections/CTA").then((m) => m.CTA),
  { ssr: true },
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Done & Delivered",
      alternateName: "Done and Delivered",
      url: "https://doneanddelivered.com",
      description:
        "Done & Delivered is a specialized real-estate marketing agency for builders, developers, and premium property brands—delivering premium project branding, performance marketing, lead generation, and end-to-end sales support.",
      slogan: "Premium Reach for Premium Properties",
      email: "hello@doneanddelivered.com",
      telephone: "+91-91104-17950",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Level 12, Prestige Towers, MG Road",
        addressLocality: "Bengaluru",
        postalCode: "560001",
        addressCountry: "IN",
      },
      areaServed: "IN",
      knowsAbout: [
        "Premium Real Estate Marketing",
        "Property Branding",
        "Project Launch Marketing",
        "Luxury Property Marketing",
        "Lead Generation",
        "Performance Marketing",
        "Sales Funnel Optimization",
      ],
    },
    {
      "@type": "WebSite",
      name: "Done & Delivered",
      url: "https://doneanddelivered.com",
      description:
        "Premium real estate marketing and sales partner for project launches, property branding, and high-intent buyer acquisition.",
    },
  ],
};

export default function HomePage() {
  return (
    <PageLoad>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Services />
      <WhyChoose />
      <MarketingProcess />
      <SalesFunnel />
      <MarketingTimeline />
      <OngoingProjects />
      <CompletedProjects />
      <FeaturedDevelopers />
      <CTA />
    </PageLoad>
  );
}
