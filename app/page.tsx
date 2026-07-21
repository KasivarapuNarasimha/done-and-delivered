import dynamic from "next/dynamic";
import { PageLoad } from "@/components/animations/PageLoad";
import { Hero } from "@/components/sections/Hero";
import { VerifiedServices } from "@/components/sections/VerifiedServices";
import { PropertyCategories } from "@/components/sections/PropertyCategories";

/**
 * Below-the-fold sections are code-split for faster initial paint / LCP.
 * Above-the-fold Hero + first content blocks stay eagerly loaded.
 */
const FeaturedProperties = dynamic(
  () =>
    import("@/components/sections/FeaturedProperties").then(
      (m) => m.FeaturedProperties,
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

const WhyChoose = dynamic(
  () => import("@/components/sections/WhyChoose").then((m) => m.WhyChoose),
  { ssr: true },
);

const Testimonials = dynamic(
  () =>
    import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { ssr: true },
);

const LatestBlogs = dynamic(
  () => import("@/components/sections/LatestBlogs").then((m) => m.LatestBlogs),
  { ssr: true },
);

const CTA = dynamic(
  () => import("@/components/sections/CTA").then((m) => m.CTA),
  { ssr: true },
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Done & Delivered",
  description:
    "Premium enterprise real estate platform for verified properties, verified developers, and verified investments.",
  url: "https://doneanddelivered.com",
  telephone: "+91-98765-43210",
  email: "hello@doneanddelivered.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Level 12, Prestige Towers, MG Road",
    addressLocality: "Bengaluru",
    postalCode: "560001",
    addressCountry: "IN",
  },
  areaServed: ["IN"],
  slogan: "Helping people invest with confidence.",
};

export default function HomePage() {
  return (
    <PageLoad>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <VerifiedServices />
      <PropertyCategories />
      <FeaturedProperties />
      <FeaturedDevelopers />
      <WhyChoose />
      <Testimonials />
      <LatestBlogs />
      <CTA />
    </PageLoad>
  );
}
