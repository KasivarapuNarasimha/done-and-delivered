"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partnershipTestimonials } from "@/lib/data/homepage";
import "swiper/css";
import "swiper/css/pagination";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative section-pad overflow-hidden bg-white"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <div id="testimonials-heading">
          <SectionHeading
            eyebrow="Partnership Promise"
            title="What defines a Done & Delivered engagement"
            description="Statements drawn from our Brand Deck promise and positioning—no invented personal reviews."
          />
        </div>

        <div className="dd-swiper">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5600,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 22 },
              1200: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-14"
          >
            {partnershipTestimonials.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <article className="card-lift relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-primary/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FAFF_100%)] p-6 shadow-[0_16px_48px_rgba(11,46,131,0.07)] md:p-7">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                  <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-primary text-white">
                    <Quote className="h-5 w-5" aria-hidden />
                  </div>
                  <blockquote className="flex-1">
                    <p className="text-[0.98rem] font-medium leading-relaxed text-primary">
                      “{item.quote}”
                    </p>
                  </blockquote>
                  <div className="mt-6 border-t border-primary/8 pt-4">
                    <p className="font-semibold text-primary">{item.role}</p>
                    <p className="mt-1 text-xs font-medium text-muted">
                      {item.context}
                    </p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
