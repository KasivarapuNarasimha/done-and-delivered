"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { marketingProcess } from "@/lib/data/homepage";

export function MarketingProcess() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 40%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  return (
    <section
      id="marketing-process"
      className="relative section-pad overflow-hidden bg-white"
      aria-labelledby="process-heading"
    >
      <Container>
        <div id="process-heading">
          <SectionHeading
            eyebrow="Marketing Process"
            title="Reach. Acquisition. Nurture. Sales."
            description="An end-to-end MarTech system that moves premium projects from awareness to bookings with measurable control at every stage."
          />
        </div>

        <div ref={trackRef} className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-[2.15rem] hidden h-px bg-primary/10 lg:block" />
          <motion.div
            className="pointer-events-none absolute left-0 top-[2.15rem] hidden h-px origin-left bg-gradient-to-r from-primary via-accent to-primary lg:block"
            style={{ scaleX: lineScale, width: "100%" }}
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {marketingProcess.map((step, index) => (
              <Reveal key={step.id} delay={index * 0.08}>
                <article className="card-lift relative h-full rounded-[1.45rem] border border-primary/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FAFF_100%)] p-6 shadow-[0_14px_40px_rgba(11,46,131,0.07)]">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-accent bg-primary font-display text-lg text-white shadow-[0_10px_24px_rgba(11,46,131,0.22)]">
                      {index + 1}
                    </span>
                    {index < marketingProcess.length - 1 ? (
                      <ArrowRight
                        className="hidden h-5 w-5 text-accent xl:block"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <h3 className="font-display text-2xl text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{step.summary}</p>
                  <div className="gold-line mt-4" aria-hidden />
                  <ul className="mt-4 space-y-2.5">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-primary/80"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
