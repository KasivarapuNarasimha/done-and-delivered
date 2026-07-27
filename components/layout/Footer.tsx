"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_PHONE,
  SITE_PHONE_HREF,
  SITE_TAGLINE,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { Reveal } from "@/components/animations/Reveal";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Our Process", href: "/#marketing-process" },
  { label: "Projects", href: "/#ongoing-projects" },
  { label: "Contact", href: "/#contact" },
];

const serviceLinks = [
  { label: "Project Branding", href: "/#services" },
  { label: "Digital Marketing", href: "/#services" },
  { label: "Lead Generation", href: "/#services" },
  { label: "Performance Marketing", href: "/#services" },
  { label: "Sales Enablement", href: "/#services" },
  { label: "Book Consultation", href: "/#contact" },
];

const socialIcons = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  youtube: FaYoutube,
} as const;

/** Only render networks with verified official URLs (null href = pending). */
const activeSocials = SOCIAL_LINKS.filter(
  (item): item is (typeof SOCIAL_LINKS)[number] & { href: string } =>
    Boolean(item.href),
);

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-primary text-white"
      role="contentinfo"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>

      <Container className="relative section-pad pb-8 md:pb-10">
        <Reveal>
          <div className="mb-12 grid gap-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:mb-14 md:grid-cols-[1.4fr_auto] md:items-center md:p-8">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
                Partner with us
              </p>
              <h2 className="mt-2 font-display text-2xl text-white md:text-3xl">
                {SITE_TAGLINE}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/80">
                Premium project branding, performance marketing, and sales
                systems for builders and developers.
              </p>
            </div>
            <Button href="/#contact" variant="gold" size="lg">
              Start a Conversation
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-12">
          <Reveal>
            <Logo variant="light" size="lg" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">
              A specialized real-estate marketing agency helping builders and
              developers reach high-intent buyers with precision and impact.
            </p>
            {activeSocials.length > 0 ? (
              <div className="mt-6 flex items-center gap-2.5">
                {activeSocials.map(({ label, href, platform }) => {
                  const Icon = socialIcons[platform];
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-primary"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </div>
            ) : (
              // TODO: Official social profile URLs are pending from Done & Delivered.
              // Configure SOCIAL_LINKS hrefs in lib/constants/index.ts when available.
              <p className="mt-6 text-xs text-white/50">
                Official social profiles coming soon.
              </p>
            )}
          </Reveal>

          <Reveal delay={0.06}>
            <h3 className="font-display text-lg text-white md:text-xl">
              Quick Links
            </h3>
            <div className="gold-line mt-3 mb-5" aria-hidden />
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-display text-lg text-white md:text-xl">
              Services
            </h3>
            <div className="gold-line mt-3 mb-5" aria-hidden />
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14}>
            <h3 className="font-display text-lg text-white md:text-xl">
              Contact
            </h3>
            <div className="gold-line mt-3 mb-5" aria-hidden />
            <ul className="space-y-4 text-sm text-white/85">
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden
                />
                <span>{SITE_ADDRESS}</span>
              </li>
              <li>
                <a
                  href={SITE_PHONE_HREF}
                  className="inline-flex items-center gap-3 tabular-nums transition-colors hover:text-accent"
                  aria-label={`Call ${SITE_PHONE}`}
                >
                  <Phone className="h-4 w-4 text-accent" aria-hidden />
                  {SITE_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="inline-flex items-center gap-3 transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4 text-accent" aria-hidden />
                  {SITE_EMAIL}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-white/70 md:mt-14 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Done & Delivered. All rights reserved.
          </p>
          <p className="text-white/55">Powered by RRR Estates LLP</p>
        </div>
      </Container>
    </footer>
  );
}
