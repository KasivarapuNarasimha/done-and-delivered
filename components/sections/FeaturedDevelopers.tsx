"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { featuredDevelopers } from "@/lib/data/homepage";

export function FeaturedDevelopers() {
  return (
    <section
      className="relative section-pad overflow-hidden bg-primary"
      aria-labelledby="developers-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-10 top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div id="developers-heading">
          <SectionHeading
            light
            eyebrow="Featured Developers"
            title="Trusted names. Proven delivery."
            description="We collaborate with verified developers who meet rigorous standards of compliance, craftsmanship, and customer experience."
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {featuredDevelopers.map((developer, index) => (
            <Reveal key={developer.id} delay={index * 0.04}>
              <motion.div
                whileHover={{ y: -5, scale: 1.015 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md sm:p-5 md:p-6"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]" />
                </div>

                <div className="relative mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl border border-accent/35 bg-white text-primary shadow-[0_10px_28px_rgba(0,0,0,0.16)] transition-transform duration-400 group-hover:scale-105 sm:mb-4 sm:h-16 sm:w-16">
                  <span className="font-display text-base font-semibold tracking-wide sm:text-lg">
                    {developer.logoInitials}
                  </span>
                </div>

                <h3 className="relative font-display text-base text-white sm:text-lg md:text-xl">
                  {developer.name}
                </h3>
                <p className="relative mt-1.5 text-[0.7rem] text-white/75 sm:mt-2 sm:text-xs md:text-sm">
                  {developer.projects} · {developer.years}
                </p>
                <div className="relative mt-3 flex justify-center sm:mt-4">
                  <VerifiedBadge
                    size="sm"
                    label="Partner"
                    className="!shadow-none"
                  />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
