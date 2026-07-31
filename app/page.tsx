import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import {
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const About = dynamic(
  () => import("@/components/sections/About").then((m) => m.About),
  { ssr: true, loading: () => <SectionSkeleton /> },
);

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

const Testimonials = dynamic(
  () =>
    import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { ssr: true, loading: () => <SectionSkeleton /> },
);

const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.Contact),
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
      name: SITE_NAME,
      alternateName: "Done and Delivered",
      url: SITE_URL,
      description:
        "Done & Delivered is a specialized real-estate marketing agency for builders, developers, and premium property brands—delivering premium project branding, performance marketing, lead generation, and end-to-end sales support.",
      slogan: SITE_TAGLINE,
      email: SITE_EMAIL,
      telephone: SITE_PHONE.replace(/\s/g, "-"),
      address: {
        "@type": "PostalAddress",
        streetAddress: "Swamy Vivekananda Road, Sarjapura Road",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "562125",
        addressCountry: "IN",
        description: SITE_ADDRESS,
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
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Premium real estate marketing and sales partner for project launches, property branding, and high-intent buyer acquisition.",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Services />
      <WhyChoose />
      <MarketingProcess />
      <MarketingTimeline />
      <OngoingProjects />
      <CompletedProjects />
      <FeaturedDevelopers />
      <Testimonials />
      <Contact />
    </>
  );
}
