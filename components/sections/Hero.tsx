"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Building2,
  CalendarRange,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FloatingShapes } from "@/components/animations/FloatingShapes";
import { heroConsultationOptions } from "@/lib/data/homepage";
import { SITE_TAGLINE } from "@/lib/constants";
import { scheduleIdle } from "@/lib/utils/schedule";

/** Local asset — Next Image serves AVIF/WebP variants automatically. */
const HERO_IMAGE = "/images/hero-bg.jpg";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [filters, setFilters] = useState({
    projectType: "",
    goal: "",
    city: "",
    timeline: "",
  });

  // Defer GSAP entrance until after first paint so LCP image/text stay unblocked.
  useEffect(() => {
    if (reduceMotion || !headlineRef.current) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    const cancelIdle = scheduleIdle(async () => {
      if (cancelled) return;
      const gsap = (await import("gsap")).default;
      if (cancelled || !sectionRef.current) return;

      ctx = gsap.context(() => {
        // Content is already painted for LCP — only enhance with light motion.
        // Avoid opacity:0 after paint (causes flash + hurts INP/CLS).
        gsap.fromTo(
          ".hero-bg-image",
          { scale: 1.05 },
          { scale: 1, duration: 1.35, ease: "power2.out" },
        );
        gsap.from(".hero-line", {
          y: 16,
          duration: 0.65,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "transform",
        });
        gsap.from(".hero-search", {
          y: 14,
          duration: 0.6,
          delay: 0.12,
          ease: "power3.out",
          clearProps: "transform",
        });
      }, sectionRef);
    }, 1200);

    return () => {
      cancelled = true;
      cancelIdle();
      ctx?.revert();
    };
  }, [reduceMotion]);

  // Mouse parallax: desktop only, deferred, rAF-throttled.
  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let removeListener: (() => void) | undefined;

    const cancelIdle = scheduleIdle(() => {
      if (cancelled) return;
      const section = sectionRef.current;
      const bg = bgRef.current;
      if (!section || !bg) return;

      const pointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (!pointerMq.matches) return;

      let frame = 0;
      const onMove = (event: MouseEvent) => {
        if (frame) return;
        frame = window.requestAnimationFrame(async () => {
          frame = 0;
          const gsap = (await import("gsap")).default;
          const rect = section.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          gsap.to(bg, {
            x: x * 12,
            y: y * 7,
            duration: 1.1,
            ease: "power3.out",
            overwrite: true,
          });
        });
      };

      section.addEventListener("mousemove", onMove, { passive: true });
      removeListener = () => {
        section.removeEventListener("mousemove", onMove);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }, 2000);

    return () => {
      cancelled = true;
      cancelIdle();
      removeListener?.();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-primary pt-[4.75rem] md:pt-[5.25rem]"
      aria-labelledby="hero-heading"
    >
      <div ref={bgRef} className="absolute inset-[-2%]">
        <Image
          src={HERO_IMAGE}
          alt="Premium real estate marketing for luxury property brands"
          fill
          priority
          fetchPriority="high"
          quality={62}
          placeholder="empty"
          className="hero-bg-image object-cover object-[center_30%]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1400px"
        />
        {/* Stronger scrim for WCAG-friendly heading contrast over photography */}
        <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(8,31,92,0.97)_0%,rgba(11,46,131,0.92)_42%,rgba(11,46,131,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(212,175,55,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-primary/25" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,31,92,0.55),transparent_42%)]" />
        <div className="premium-noise absolute inset-0 max-md:hidden" />
      </div>

      <FloatingShapes variant="dark" />

      <Container className="relative z-10 flex min-h-[calc(100svh-5.25rem)] flex-col justify-center py-14 sm:py-16 md:py-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div className="max-w-3xl">
            <div className="hero-line mb-5 inline-flex sm:mb-6">
              <Badge tone="glass">
                <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
                Premium Real Estate Marketing & Sales Partner
              </Badge>
            </div>

            <h1
              id="hero-heading"
              ref={headlineRef}
              className="font-display text-[2.15rem] leading-[1.08] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl lg:text-[4rem]"
            >
              <span className="hero-line block">Premium Property</span>
              <span className="hero-line mt-1.5 block sm:mt-2">
                <span className="bg-gradient-to-r from-accent via-accent-soft to-accent bg-clip-text text-transparent drop-shadow-none">
                  Marketing.
                </span>
              </span>
            </h1>

            <p className="hero-line mt-5 max-w-xl font-display text-xl font-semibold leading-snug text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:mt-6 sm:text-2xl md:text-[1.75rem]">
              {SITE_TAGLINE}
            </p>

            <p className="hero-line mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white sm:text-lg md:text-xl">
              Done & Delivered is a specialized real-estate marketing agency
              helping builders and developers reach serious, high-intent buyers
              with precision and impact.
            </p>

            <div className="hero-line mt-7 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
              {[
                "Premium project branding",
                "Performance lead systems",
                "Sales funnel excellence",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-primary/40 px-3 py-2 text-[0.72rem] font-medium text-white backdrop-blur-md sm:text-sm"
                >
                  <ShieldCheck
                    className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4"
                    aria-hidden
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-stats hidden grid-cols-3 gap-3 lg:grid">
            {[
              { value: "1450+", label: "Lead Capacity" },
              { value: "7+", label: "Official Projects" },
              { value: "16 Wk", label: "Launch Systems" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-white/8 p-4 text-center backdrop-blur-md"
              >
                <p className="font-display text-2xl text-white">{stat.value}</p>
                <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/75">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-search mt-10 md:mt-12">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/95 p-3 shadow-[0_36px_90px_rgba(8,31,92,0.32)] backdrop-blur-xl sm:p-4 md:p-5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

            <div className="mb-4 flex flex-col gap-3 px-1 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-[0_10px_24px_rgba(11,46,131,0.25)]">
                  <MessageSquare className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-primary md:text-base">
                    Project Marketing Consultation
                  </p>
                  <p className="mt-0.5 text-xs text-muted md:text-sm">
                    Tell us about your launch—we craft reach, leads, and sales
                    systems
                  </p>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                For Builders & Developers
              </span>
            </div>

            <form
              className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto] xl:items-end"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Request marketing consultation"
            >
              <div className="search-field">
                <label htmlFor="hero-project-type">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-3 w-3 text-accent" aria-hidden />
                    Project Type
                  </span>
                </label>
                <select
                  id="hero-project-type"
                  value={filters.projectType}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, projectType: e.target.value }))
                  }
                >
                  <option value="">Select type</option>
                  {heroConsultationOptions.projectTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-field">
                <label htmlFor="hero-goal">
                  <span className="inline-flex items-center gap-1.5">
                    <Target className="h-3 w-3 text-accent" aria-hidden />
                    Marketing Goal
                  </span>
                </label>
                <select
                  id="hero-goal"
                  value={filters.goal}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, goal: e.target.value }))
                  }
                >
                  <option value="">Select goal</option>
                  {heroConsultationOptions.goals.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-field">
                <label htmlFor="hero-city">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-accent" aria-hidden />
                    City
                  </span>
                </label>
                <select
                  id="hero-city"
                  value={filters.city}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, city: e.target.value }))
                  }
                >
                  <option value="">Select city</option>
                  {heroConsultationOptions.cities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-field">
                <label htmlFor="hero-timeline">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarRange className="h-3 w-3 text-accent" aria-hidden />
                    Timeline
                  </span>
                </label>
                <select
                  id="hero-timeline"
                  value={filters.timeline}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, timeline: e.target.value }))
                  }
                >
                  <option value="">Select timeline</option>
                  {heroConsultationOptions.timelines.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 xl:col-span-1">
                <Button
                  href="/contact?intent=consultation"
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="h-[3.35rem] rounded-[1rem] xl:min-w-[168px]"
                  icon={<Sparkles className="h-4 w-4" />}
                >
                  Consult Now
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="hero-stats mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:hidden">
          {[
            { value: "1450+", label: "Leads" },
            { value: "7+", label: "Projects" },
            { value: "16 Wk", label: "Systems" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-white/8 px-2 py-3 text-center backdrop-blur-md"
            >
              <p className="font-display text-lg text-white sm:text-xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.1em] text-white/75">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[var(--brand-bg)] via-[var(--brand-bg)]/70 to-transparent" />
    </section>
  );
}
