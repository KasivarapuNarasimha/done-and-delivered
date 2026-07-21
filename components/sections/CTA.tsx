"use client";

import { CalendarCheck2, Phone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { SITE_PHONE_HREF } from "@/lib/constants";

export function CTA() {
  return (
    <section className="relative section-pad pt-4 md:pt-6" aria-labelledby="cta-heading">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#081F5C_0%,#0B2E83_48%,#143FA8_100%)] px-5 py-10 text-white shadow-[0_30px_80px_rgba(11,46,131,0.28)] sm:px-8 md:rounded-[2rem] md:px-12 md:py-14">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -left-10 top-0 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -right-8 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
              <div>
                <p className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Begin with clarity
                </p>
                <h2
                  id="cta-heading"
                  className="mt-3 font-display text-[1.85rem] leading-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]"
                >
                  Ready to invest with confidence?
                </h2>
                <div className="gold-line mt-5" aria-hidden />
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/72 md:text-base">
                  Speak with a Done & Delivered advisor for a free consultation
                  or schedule a curated site visit. Premium guidance. Verified
                  opportunities. Zero guesswork.
                </p>
              </div>

              <div className="grid gap-2.5 sm:gap-3">
                <Button
                  href="/contact?intent=consultation"
                  variant="gold"
                  size="lg"
                  fullWidth
                  icon={<Sparkles className="h-4 w-4" />}
                >
                  Book Free Consultation
                </Button>
                <Button
                  href="/contact?intent=site-visit"
                  variant="ghost"
                  size="lg"
                  fullWidth
                  icon={<CalendarCheck2 className="h-4 w-4" />}
                >
                  Book Site Visit
                </Button>
                <Button
                  href={SITE_PHONE_HREF}
                  variant="secondary"
                  size="lg"
                  fullWidth
                  icon={<Phone className="h-4 w-4" />}
                >
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
