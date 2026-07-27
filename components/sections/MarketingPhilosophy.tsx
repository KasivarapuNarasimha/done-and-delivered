"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { marketingPhilosophy } from "@/lib/data/about-page";

export function MarketingPhilosophy() {
  return (
    <section
      id="marketing-philosophy"
      className="relative section-pad overflow-hidden bg-white"
      aria-labelledby="philosophy-heading"
    >
      <Container>
        <div id="philosophy-heading">
          <SectionHeading
            eyebrow="Marketing Philosophy"
            title="How we turn premium projects into measurable demand"
            description="A disciplined philosophy that balances brand craft with performance systems—so visibility becomes qualified pipeline."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {marketingPhilosophy.map((point, index) => (
            <Reveal key={point.id} delay={index * 0.05}>
              <article className="relative h-full overflow-hidden rounded-[1.45rem] border border-primary/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FAFF_100%)] p-6 shadow-[0_14px_40px_rgba(11,46,131,0.07)] md:p-8">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary" />
                <h3 className="font-display text-2xl text-primary">
                  {point.title}
                </h3>
                <div className="gold-line mt-4" aria-hidden />
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                  {point.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
