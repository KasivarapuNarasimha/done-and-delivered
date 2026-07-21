"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ongoingProjects } from "@/lib/data/homepage";
import "swiper/css";
import "swiper/css/pagination";

export function OngoingProjects() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="ongoing-projects"
      className="relative section-pad section-soft overflow-hidden"
      aria-labelledby="ongoing-heading"
    >
      <Container>
        <div className="mb-2 flex flex-col gap-6 md:mb-4 md:flex-row md:items-end md:justify-between">
          <div id="ongoing-heading" className="min-w-0 flex-1">
            <SectionHeading
              align="left"
              className="mb-0"
              eyebrow="Ongoing Projects"
              title="Active mandates we are marketing"
              description="Official ongoing projects from the Done & Delivered portfolio—premium residential and plotted developments with full-funnel support."
            />
          </div>
          <div className="flex items-center gap-2.5 self-start md:self-auto md:pb-2">
            <button
              type="button"
              aria-label="Previous ongoing project"
              className="touch-target grid place-items-center rounded-full border border-primary/10 bg-white text-primary shadow-sm transition-all hover:bg-primary hover:text-white"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next ongoing project"
              className="touch-target grid place-items-center rounded-full border border-primary/10 bg-white text-primary shadow-sm transition-all hover:bg-primary hover:text-white"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="dd-swiper">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={18}
            slidesPerView={1.04}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1.3, spaceBetween: 18 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 24 },
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="!pb-14"
          >
            {ongoingProjects.map((project) => (
              <SwiperSlide key={project.id} className="!h-auto">
                <ProjectCard project={project} animate={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
