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
import { buildWhatsAppUrl, SITE_TAGLINE } from "@/lib/constants";
import { scheduleIdle } from "@/lib/utils/schedule";
import { heroConsultationSchema } from "@/lib/validations";

const HERO_IMAGE = "/images/hero-bg.jpg";

const HERO_STATS = [
  { value: "1450+", label: "Lead Capacity" },
  { value: "4+", label: "Mandate Projects" },
  { value: "16 Wk", label: "Launch Systems" },
] as const;

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
  const [consultError, setConsultError] = useState("");

  function handleConsultationSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConsultError("");

    const parsed = heroConsultationSchema.safeParse(filters);
    if (!parsed.success) {
      setConsultError(
        parsed.error.issues[0]?.message ||
          "Please complete all consultation fields.",
      );
      return;
    }

    const { projectType, goal, city, timeline } = parsed.data;
    const message = [
      "Hello Done & Delivered,",
      "",
      "New Project Consultation Request",
      "",
      `Project Type: ${projectType}`,
      `Marketing Goal: ${goal}`,
      `City: ${city}`,
      `Timeline: ${timeline}`,
      "",
      "Please contact me regarding this project.",
    ].join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  // Smooth-scroll to consultation form when landing with #consultation
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#consultation") return;

    const scrollToForm = () => {
      const el = document.getElementById("consultation");
      if (!el) return;
      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    };

    // Delay so layout/fonts settle after navigation from other pages
    const t = window.setTimeout(scrollToForm, 120);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !headlineRef.current) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    const cancelIdle = scheduleIdle(async () => {
      if (cancelled) return;
      const gsap = (await import("gsap")).default;
      if (cancelled || !sectionRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-bg-image",
          { scale: 1.04 },
          { scale: 1, duration: 1.4, ease: "power2.out" },
        );
        gsap.from(".hero-line", {
          y: 14,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "transform",
        });
        gsap.from(".hero-search", {
          y: 12,
          duration: 0.55,
          delay: 0.1,
          ease: "power3.out",
          clearProps: "transform",
        });
      }, sectionRef);
    }, 1000);

    return () => {
      cancelled = true;
      cancelIdle();
      ctx?.revert();
    };
  }, [reduceMotion]);

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
            x: x * 10,
            y: y * 6,
            duration: 1.05,
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
          quality={65}
          className="hero-bg-image object-cover object-[center_28%]"
          sizes="(max-width: 768px) 100vw, 1400px"
        />
        {/* Premium overlay — balanced so text can stay bright without crushing the photo */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,31,92,0.92)_0%,rgba(11,46,131,0.88)_42%,rgba(11,46,131,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(212,175,55,0.1),transparent_36%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,31,92,0.55),transparent_48%)]" />
      </div>

      <FloatingShapes variant="dark" />

      <Container className="relative z-10 flex min-h-[calc(100svh-5.25rem)] flex-col justify-center gap-10 py-12 sm:py-16 md:py-20 lg:gap-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="relative z-10 max-w-3xl">
            <div className="hero-line mb-5 inline-flex sm:mb-6">
              <Badge tone="glass">
                <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
                Premium Real Estate Marketing & Sales Partner
              </Badge>
            </div>

            <h1
              id="hero-heading"
              ref={headlineRef}
              className="heading-on-dark font-display text-[2.35rem] leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.2rem]"
            >
              <span className="hero-line block">Premium Property</span>
              <span className="hero-line heading-accent mt-1 block sm:mt-1.5">
                Marketing.
              </span>
            </h1>

            <p className="hero-line text-on-dark-strong mt-5 max-w-xl font-display text-xl font-bold leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:mt-6 sm:text-2xl md:text-[1.85rem]">
              {SITE_TAGLINE}
            </p>

            <p className="hero-line text-on-dark-strong mt-4 max-w-xl text-sm leading-relaxed sm:text-base md:text-lg">
              Specialized marketing for builders and developers—strategic
              thinking, premium creative, and conversion systems that put
              projects in front of high-intent buyers.
            </p>

            <div className="hero-line mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                href="/contact"
                variant="gold"
                size="lg"
                className="w-full sm:w-auto"
                icon={<Sparkles className="h-4 w-4" />}
              >
                Book Consultation
              </Button>
              <Button
                href="/#services"
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Services
              </Button>
            </div>

            <div className="hero-line mt-7 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5">
              {[
                "Project branding",
                "Performance leads",
                "Sales enablement",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/55 px-3 py-1.5 text-[0.7rem] font-semibold text-white backdrop-blur-md sm:text-sm"
                >
                  <ShieldCheck
                    className="h-3.5 w-3.5 shrink-0 text-accent"
                    aria-hidden
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-line grid grid-cols-3 gap-2.5 sm:gap-3 lg:grid-cols-1 lg:gap-4">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/35 bg-white/12 px-3 py-3.5 text-center shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-md sm:px-4 sm:py-4 lg:flex lg:items-center lg:justify-between lg:px-6 lg:py-5 lg:text-left"
              >
                <p className="font-display text-xl text-white sm:text-2xl lg:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white sm:text-[0.68rem] lg:mt-0">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="consultation" className="hero-search scroll-mt-28">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/55 bg-white p-3 shadow-[0_28px_70px_rgba(8,31,92,0.28)] sm:rounded-[1.75rem] sm:p-5 md:p-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

            <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-[0_10px_24px_rgba(11,46,131,0.25)]">
                  <MessageSquare className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-primary md:text-base">
                    Project Marketing Consultation
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-slate-600 md:text-sm">
                    Share your launch goals—we design reach, leads, and sales
                    systems
                  </p>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-accent-dark">
                For Builders & Developers
              </span>
            </div>

            <form
              className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto] xl:items-end"
              onSubmit={handleConsultationSubmit}
              aria-label="Request marketing consultation"
              noValidate
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

              <div className="flex flex-col gap-2 sm:col-span-2 xl:col-span-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="h-[3.35rem] rounded-[1rem] xl:min-w-[168px]"
                  icon={<Sparkles className="h-4 w-4" />}
                >
                  Consult Now
                </Button>
                {consultError ? (
                  <p
                    role="alert"
                    className="text-center text-xs font-medium text-red-600 xl:text-left"
                  >
                    {consultError}
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] via-[var(--brand-bg)]/80 to-transparent" />
    </section>
  );
}
