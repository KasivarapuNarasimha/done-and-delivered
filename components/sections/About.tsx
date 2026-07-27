"use client";

import { Eye, Flag, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { aboutContent } from "@/lib/data/homepage";

export function About() {
  return (
    <section
      id="about"
      className="relative section-pad overflow-hidden bg-white"
      aria-labelledby="about-heading"
    >
      <Container>
        <div id="about-heading">
          <SectionHeading
            eyebrow="About Done & Delivered"
            title="Premium reach for premium properties"
            description={aboutContent.whoWeAre}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <Reveal>
            <article className="h-full rounded-[1.5rem] border border-primary/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FAFF_100%)] p-6 shadow-[0_16px_48px_rgba(11,46,131,0.07)] md:p-8">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-accent-dark">
                Company Story
              </p>
              <h3 className="mt-2 font-display text-2xl text-primary md:text-3xl">
                Who we are
              </h3>
              <div className="gold-line mt-4" aria-hidden />
              <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                {aboutContent.story}
              </p>
            </article>
          </Reveal>

          <div className="grid gap-5">
            <Reveal delay={0.06}>
              <article className="card-lift rounded-[1.4rem] border border-primary/8 bg-white p-6 shadow-[0_14px_40px_rgba(11,46,131,0.07)]">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
                  <Flag className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display text-xl text-primary">Mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {aboutContent.mission}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className="card-lift rounded-[1.4rem] border border-primary/8 bg-white p-6 shadow-[0_14px_40px_rgba(11,46,131,0.07)]">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
                  <Eye className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display text-xl text-primary">Vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {aboutContent.vision}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.14}>
              <article className="rounded-[1.4rem] border border-accent/25 bg-primary p-6 text-white shadow-[0_14px_40px_rgba(11,46,131,0.18)]">
                <div className="mb-3 inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-accent">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Why Done & Delivered
                </div>
                <p className="text-sm leading-relaxed text-white/90">
                  Exclusive real-estate focus. Premium positioning. Advanced
                  targeting. High-quality creative. End-to-end delivery from
                  strategy to execution.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
