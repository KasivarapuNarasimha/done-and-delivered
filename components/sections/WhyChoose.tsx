"use client";

import {
  BadgeCheck,
  Handshake,
  LineChart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { FloatingShapes } from "@/components/animations/FloatingShapes";
import { whyChooseItems } from "@/lib/data/homepage";

const iconMap = {
  shield: ShieldCheck,
  badge: BadgeCheck,
  handshake: Handshake,
  chart: LineChart,
  users: Users,
  sparkles: Sparkles,
};

export function WhyChoose() {
  return (
    <section
      className="relative section-pad section-soft overflow-hidden"
      aria-labelledby="why-choose-heading"
    >
      <FloatingShapes variant="light" />
      <Container className="relative z-10">
        <div id="why-choose-heading">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why discerning buyers choose Done & Delivered"
            description="A refined process, rigorous verification, and a luxury-first experience designed for people who value clarity as much as craftsmanship."
          />
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {whyChooseItems.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={item.id} delay={index * 0.05}>
                <article className="card-lift group h-full rounded-[1.4rem] border border-primary/8 bg-white/95 p-6 shadow-[0_14px_40px_rgba(11,46,131,0.07)] backdrop-blur-sm md:p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#0B2E83,#143FA8)] text-white shadow-[0_12px_28px_rgba(11,46,131,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:bg-[linear-gradient(145deg,#D4AF37,#E8D48B)] group-hover:text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl text-primary md:text-[1.45rem]">
                    {item.title}
                  </h3>
                  <div className="gold-line mt-3" aria-hidden />
                  <p className="mt-4 text-sm leading-relaxed text-muted md:text-[0.95rem]">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
