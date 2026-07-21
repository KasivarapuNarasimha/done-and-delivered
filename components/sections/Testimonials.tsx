"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { BadgeCheck, Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data/homepage";
import "swiper/css";
import "swiper/css/pagination";

export function Testimonials() {
  return (
    <section
      className="relative section-pad overflow-hidden bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-[-8%] bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div id="testimonials-heading">
          <SectionHeading
            eyebrow="Client Stories"
            title="Trusted by people who value excellence"
            description="Real experiences from homeowners and investors who chose clarity, verification, and a premium advisory journey."
          />
        </div>

        <div className="dd-swiper">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={22}
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
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <article className="card-lift relative flex h-full flex-col overflow-hidden rounded-[1.55rem] border border-primary/8 bg-white p-6 shadow-[0_16px_48px_rgba(11,46,131,0.07)] md:p-7">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(145deg,#0B2E83,#143FA8)] text-white shadow-[0_10px_24px_rgba(11,46,131,0.22)]">
                      <Quote className="h-5 w-5" aria-hidden />
                    </div>
                    <div
                      className="flex items-center gap-0.5"
                      aria-label={`${item.rating} out of 5 stars`}
                    >
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-accent text-accent"
                          aria-hidden
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="flex-1">
                    <p className="text-[0.98rem] leading-relaxed text-primary/88 md:text-[1.02rem]">
                      “{item.quote}”
                    </p>
                  </blockquote>

                  <div className="mt-7 flex items-center gap-3.5 border-t border-primary/8 pt-5">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-accent/45 shadow-[0_0_0_3px_rgba(212,175,55,0.12)]">
                      <Image
                        src={item.image}
                        alt={`Portrait of ${item.name}`}
                        fill
                        className="object-cover"
                        sizes="48px"
                        quality={70}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="font-semibold text-primary">{item.name}</p>
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/6 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-primary">
                          <BadgeCheck
                            className="h-3 w-3 text-accent"
                            aria-hidden
                          />
                          Client
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted md:text-sm">
                        {item.role} · {item.location}
                      </p>
                    </div>
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
