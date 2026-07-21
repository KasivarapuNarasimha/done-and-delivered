"use client";

import { motion } from "framer-motion";
import {
  Filter,
  LineChart,
  Megaphone,
  Palette,
  Target,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { FloatingShapes } from "@/components/animations/FloatingShapes";
import { services } from "@/lib/data/homepage";

const icons = {
  branding: Palette,
  digital: Megaphone,
  leads: Target,
  performance: LineChart,
  influencer: Users,
  funnel: Filter,
};

export function Services() {
  return (
    <section
      id="services"
      className="relative section-pad section-soft overflow-hidden"
      aria-labelledby="services-heading"
    >
      <FloatingShapes variant="light" />
      <Container className="relative z-10">
        <div id="services-heading">
          <SectionHeading
            eyebrow="Our Services"
            title="Exclusive marketing solutions for builders & developers"
            description="Every campaign is crafted to maximize premium reach and deliver measurable outcomes—turning visibility into value."
          />
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.id} delay={index * 0.05}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full overflow-hidden rounded-[1.45rem] border border-primary/8 bg-white p-6 shadow-[0_16px_48px_rgba(11,46,131,0.08)] md:p-7"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary opacity-90" />
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_12px_28px_rgba(11,46,131,0.24)] transition-all duration-300 group-hover:bg-accent group-hover:text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-dark">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-primary md:text-[1.4rem]">
                    {service.title}
                  </h3>
                  <div className="gold-line mt-3" aria-hidden />
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
