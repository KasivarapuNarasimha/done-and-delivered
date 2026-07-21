import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

/**
 * Only the Hero is eager — everything below folds is code-split.
 * SSR stays on for SEO; client JS loads as chunks when needed.
 */
const Services = dynamic(
  () => import("@/components/sections/Services").then((m) => m.Services),
  { ssr: true, loading: () => <SectionSkeleton /> },
);

const WhyChoose = dynamic(
  () => import("@/components/sections/WhyChoose").then((m) => m.WhyChoose),
  { ssr: true, loading: () => <SectionSkeleton /> },
);

const MarketingProcess = dynamic(
  () =>
    import("@/components/sections/MarketingProcess").then(
      (m) => m.MarketingProcess,
    ),
  { ssr: true, loading: () => <SectionSkeleton /> },
);

const SalesFunnel = dynamic(
  () =>
    import("@/components/sections/SalesFunnel").then((m) => m.SalesFunnel),
  { ssr: true, loading: () => <SectionSkeleton dark /> },
);

const MarketingTimeline = dynamic(
  () =>
    import("@/components/sections/MarketingTimeline").then(
      (m) => m.MarketingTimeline,
    ),
  { ssr: true, loading: () => <SectionSkeleton /> },
);

const OngoingProjects = dynamic(
  () =>
    import("@/components/sections/OngoingProjects").then(
      (m) => m.OngoingProjects,
    ),
  { ssr: true, loading: () => <SectionSkeleton /> },
);

const CompletedProjects = dynamic(
  () =>
    import("@/components/sections/CompletedProjects").then(
      (m) => m.CompletedProjects,
    ),
  { ssr: true, loading: () => <SectionSkeleton /> },
);

const FeaturedDevelopers = dynamic(
  () =>
    import("@/components/sections/FeaturedDevelopers").then(
      (m) => m.FeaturedDevelopers,
    ),
  { ssr: true, loading: () => <SectionSkeleton dark /> },
);

const CTA = dynamic(
  () => import("@/components/sections/CTA").then((m) => m.CTA),
  { ssr: true, loading: () => <SectionSkeleton /> },
);

function SectionSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`section-pad ${dark ? "bg-primary" : "bg-background"}`}
      aria-hidden
    >
      <div className="container-pad">
        <div
          className={`mx-auto h-8 max-w-md rounded-full ${dark ? "bg-white/10" : "bg-primary/8"}`}
        />
        <div
          className={`mx-auto mt-4 h-4 max-w-lg rounded-full ${dark ? "bg-white/5" : "bg-primary/5"}`}
        />
      </div>
    </div>
  );
}

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
    <>
      {/* TEMPORARY — remove after Hostinger deploy verification */}
      <div
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 99999,
          background: "#FF0000",
          color: "#FFFFFF",
          fontWeight: 800,
          fontSize: 14,
          lineHeight: 1.2,
          padding: "10px 14px",
          borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
          letterSpacing: "0.02em",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        DEPLOY TEST 9150426
      </div>
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
    </>
  );
}
