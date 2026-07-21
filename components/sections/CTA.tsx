"use client";

import { MessageCircle, Phone, Sparkles, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import {
  SITE_EMAIL,
  SITE_PHONE,
  SITE_PHONE_HREF,
  SITE_WHATSAPP,
} from "@/lib/constants";

export function CTA() {
  return (
    <section
      className="relative section-pad pt-4 md:pt-6"
      aria-labelledby="cta-heading"
    >
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#081F5C_0%,#0B2E83_48%,#143FA8_100%)] px-5 py-10 text-white shadow-[0_30px_80px_rgba(11,46,131,0.28)] sm:px-8 md:rounded-[2rem] md:px-12 md:py-14">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -left-10 top-0 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -right-8 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
              <div>
                <p className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Partner with excellence
                </p>
                <h2
                  id="cta-heading"
                  className="mt-3 font-display text-[1.85rem] leading-tight text-white sm:text-3xl md:text-4xl lg:text-[2.65rem]"
                >
                  Ready to launch your next premium project?
                </h2>
                <div className="gold-line mt-5" aria-hidden />
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                  From the first idea to the final lead, we ensure every campaign
                  is Done & Delivered with excellence, efficiency, and premium
                  reach for premium properties.
                </p>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                <Button
                  href="/contact"
                  variant="gold"
                  size="lg"
                  fullWidth
                  icon={<Mail className="h-4 w-4" />}
                >
                  Contact Us
                </Button>
                <Button
                  href="/contact?intent=consultation"
                  variant="ghost"
                  size="lg"
                  fullWidth
                  icon={<Sparkles className="h-4 w-4" />}
                >
                  Book Consultation
                </Button>
                <Button
                  href={SITE_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  fullWidth
                  icon={<FaWhatsapp className="h-4 w-4" />}
                >
                  WhatsApp
                </Button>
                <Button
                  href={SITE_PHONE_HREF}
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="border-white/25 bg-transparent text-white hover:border-accent hover:bg-accent hover:text-primary"
                  icon={<Phone className="h-4 w-4" />}
                  aria-label={`Call ${SITE_PHONE}`}
                >
                  Call {SITE_PHONE}
                </Button>
              </div>
            </div>

            <p className="relative z-10 mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-6 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-accent" aria-hidden />
                Prefer email?{" "}
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="font-semibold text-accent hover:text-accent-soft"
                >
                  {SITE_EMAIL}
                </a>
              </span>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
