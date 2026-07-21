"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Building2, LineChart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { FloatingShapes } from "@/components/animations/FloatingShapes";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { verifiedServices } from "@/lib/data/homepage";

const icons = {
  building: Building2,
  badge: BadgeCheck,
  chart: LineChart,
};

export function VerifiedServices() {
  return (
    <section
      className="relative section-pad section-soft overflow-hidden"
      aria-labelledby="verified-services-heading"
    >
      <FloatingShapes variant="light" />
      <Container className="relative z-10">
        <div id="verified-services-heading">
          <SectionHeading
            eyebrow="Our Core Strength"
            title="Verification is our foundation"
            description="Three pillars that define Done & Delivered—engineered to eliminate uncertainty and elevate every real estate decision."
          />
        </div>

        <div className="grid gap-5 md:gap-6 lg:grid-cols-3">
          {verifiedServices.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.id} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full overflow-hidden rounded-[1.55rem] border border-primary/8 bg-white/95 p-6 shadow-[0_18px_50px_rgba(11,46,131,0.08)] backdrop-blur-sm md:p-8"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary" />
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.14),transparent_70%)] transition-transform duration-500 group-hover:scale-125" />

                  <div className="relative">
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_12px_30px_rgba(11,46,131,0.26)] transition-all duration-300 group-hover:bg-accent group-hover:text-primary">
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <VerifiedBadge size="sm" label="Verified" />
                    </div>

                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-dark">
                      {service.metricLabel}
                    </p>
                    <p className="mt-1 font-display text-3xl tracking-tight text-primary md:text-[2.35rem]">
                      {service.metric}
                    </p>

                    <h3 className="mt-5 font-display text-[1.45rem] text-primary md:text-2xl">
                      {service.title}
                    </h3>
                    <div className="gold-line mt-3.5" aria-hidden />
                    <p className="mt-4 text-sm leading-relaxed text-muted md:text-[0.95rem]">
                      {service.description}
                    </p>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
