"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { marketingTimeline } from "@/lib/data/homepage";

export function MarketingTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 35%"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="marketing-timeline"
      className="relative section-pad section-soft overflow-hidden"
      aria-labelledby="timeline-heading"
    >
      <Container>
        <div id="timeline-heading">
          <SectionHeading
            eyebrow="Marketing Timeline"
            title="A structured launch roadmap"
            description="From pre-launch activation to sustenance media—our 16-week system keeps premium projects visible, optimized, and sales-ready."
          />
        </div>

        <div ref={ref} className="relative">
          <div className="pointer-events-none absolute left-4 top-0 bottom-0 w-px bg-primary/10 md:left-1/2" />
          <motion.div
            className="pointer-events-none absolute left-4 top-0 w-px origin-top bg-gradient-to-b from-primary via-accent to-primary md:left-1/2"
            style={{ height: progress }}
          />

          <div className="space-y-8 md:space-y-12">
            {marketingTimeline.map((phase, index) => {
              const isLeft = index % 2 === 0;
              return (
                <Reveal key={phase.id} delay={index * 0.05}>
                  <div
                    className={`relative grid gap-4 md:grid-cols-2 md:gap-10 ${
                      isLeft ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div
                      className={`pl-10 md:pl-0 ${
                        isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                      }`}
                    >
                      <article className="card-lift rounded-[1.4rem] border border-primary/8 bg-white p-6 shadow-[0_14px_40px_rgba(11,46,131,0.07)] md:p-7">
                        <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-accent-dark">
                          {phase.weeks}
                        </p>
                        <h3 className="mt-2 font-display text-2xl text-primary">
                          {phase.title}
                        </h3>
                        <div
                          className={`gold-line mt-3 ${isLeft ? "md:ml-auto" : ""}`}
                          aria-hidden
                        />
                        <ul className="mt-4 space-y-2.5">
                          {phase.points.map((point) => (
                            <li
                              key={point}
                              className="text-sm leading-relaxed text-muted"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </div>

                    <div className="absolute left-4 top-8 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center md:left-1/2">
                      <span className="h-4 w-4 rounded-full border-2 border-accent bg-primary shadow-[0_0_0_4px_rgba(212,175,55,0.18)]" />
                    </div>

                    <div className="hidden md:block" aria-hidden />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
