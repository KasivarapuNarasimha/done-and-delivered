"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { salesFunnel } from "@/lib/data/homepage";

export function SalesFunnel() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="sales-funnel"
      className="relative section-pad overflow-hidden bg-primary"
      aria-labelledby="funnel-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <div className="absolute -right-10 top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div id="funnel-heading">
          <SectionHeading
            light
            eyebrow="Sales Funnel System"
            title="From first lead to final closer"
            description="A performance-led funnel architecture designed for real-estate launches—built to improve visit quality, pipeline strength, and booking velocity."
          />
        </div>

        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3">
          {salesFunnel.map((step, index) => {
            const width = 100 - index * 10;
            return (
              <Reveal key={step.id} delay={index * 0.06} className="w-full">
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, scaleX: 0.92 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mx-auto"
                  style={{ width: `${width}%` }}
                >
                  <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/8 px-5 py-4 text-center backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:bg-white/12 sm:px-8 sm:py-5">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
                    <p className="font-display text-3xl text-white sm:text-4xl">
                      {step.value}
                    </p>
                    <p className="mt-1 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-accent sm:text-xs">
                      {step.label}
                    </p>
                    {index < salesFunnel.length - 1 ? (
                      <span className="mt-3 block text-accent/80" aria-hidden>
                        ↓
                      </span>
                    ) : null}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-white/75 md:text-base">
          Designed as a homepage highlight of our conversion system—where every
          stage is tracked, optimized, and aligned to developer sales goals.
        </p>
      </Container>
    </section>
  );
}
