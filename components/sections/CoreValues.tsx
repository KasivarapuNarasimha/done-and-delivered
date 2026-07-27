"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { coreValues } from "@/lib/data/about-page";

export function CoreValues() {
  return (
    <section
      id="core-values"
      className="relative section-pad section-soft overflow-hidden"
      aria-labelledby="values-heading"
    >
      <Container>
        <div id="values-heading">
          <SectionHeading
            eyebrow="Core Values"
            title="What guides every Done & Delivered engagement"
            description="Principles drawn from our Brand Deck promise—exclusive focus, premium positioning, and accountable delivery."
          />
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {coreValues.map((value, index) => (
            <Reveal key={value.id} delay={index * 0.04}>
              <article className="card-lift h-full rounded-[1.4rem] border border-primary/8 bg-white p-6 shadow-[0_14px_40px_rgba(11,46,131,0.07)] md:p-7">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent-dark">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl text-primary md:text-[1.35rem]">
                  {value.title}
                </h3>
                <div className="gold-line mt-3" aria-hidden />
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
