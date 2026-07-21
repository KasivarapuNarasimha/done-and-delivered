"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Button } from "@/components/ui/Button";
import { featuredProperties } from "@/lib/data/homepage";
import "swiper/css";
import "swiper/css/pagination";

export function FeaturedProperties() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      className="relative section-pad section-soft overflow-hidden"
      aria-labelledby="featured-properties-heading"
    >
      <Container>
        <div className="mb-2 flex flex-col gap-6 md:mb-4 md:flex-row md:items-end md:justify-between">
          <div id="featured-properties-heading" className="min-w-0 flex-1">
            <SectionHeading
              align="left"
              className="mb-0"
              eyebrow="Featured Properties"
              title="Handpicked luxury opportunities"
              description="A rotating showcase of verified residences and commercial assets selected for quality, location strength, and investment clarity."
            />
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto md:pb-2">
            <button
              type="button"
              aria-label="Previous properties"
              className="touch-target grid h-11 w-11 place-items-center rounded-full border border-primary/10 bg-white text-primary shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white md:h-12 md:w-12"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next properties"
              className="touch-target grid h-11 w-11 place-items-center rounded-full border border-primary/10 bg-white text-primary shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white md:h-12 md:w-12"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="dd-swiper relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.04}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              480: { slidesPerView: 1.12, spaceBetween: 16 },
              640: { slidesPerView: 1.3, spaceBetween: 18 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 24 },
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="!pb-14"
          >
            {featuredProperties.map((property) => (
              <SwiperSlide key={property.id} className="!h-auto">
                <PropertyCard property={property} animate={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-2 flex justify-center md:mt-4">
          <Button href="/properties" variant="outline" size="lg">
            View All Properties
          </Button>
        </div>
      </Container>
    </section>
  );
}
