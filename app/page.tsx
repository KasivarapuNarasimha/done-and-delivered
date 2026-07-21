import { PageLoad } from "@/components/animations/PageLoad";
import {
  CTA,
  FeaturedDevelopers,
  FeaturedProperties,
  Hero,
  LatestBlogs,
  PropertyCategories,
  Testimonials,
  VerifiedServices,
  WhyChoose,
} from "@/components/sections";

export default function HomePage() {
  return (
    <PageLoad>
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
