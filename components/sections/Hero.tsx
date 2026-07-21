"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FloatingShapes } from "@/components/animations/FloatingShapes";
import { heroSearchOptions } from "@/lib/data/homepage";
import { SITE_TAGLINE } from "@/lib/constants";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [filters, setFilters] = useState({
    propertyType: "",
    category: "",
    city: "",
    budget: "",
  });

  useEffect(() => {
    if (reduceMotion || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-bg-image",
        { scale: 1.14, opacity: 0.65 },
        { scale: 1, opacity: 1, duration: 2.1, ease: "power2.out" },
      )
        .fromTo(
          ".hero-line",
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          0.2,
        )
        .fromTo(
          ".hero-search",
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          0.55,
        )
        .fromTo(
          ".hero-stats > *",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
          0.75,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    // Mouse parallax only on fine pointers (desktop) for performance
    const pointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!pointerMq.matches) return;

    let frame = 0;
    const onMove = (event: MouseEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(bg, {
          x: x * 14,
          y: y * 8,
          duration: 1.15,
          ease: "power3.out",
          overwrite: true,
        });
      });
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      section.removeEventListener("mousemove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-primary pt-[4.75rem] md:pt-[5.25rem]"
      aria-labelledby="hero-heading"
    >
      <div ref={bgRef} className="absolute inset-[-4%]">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=75"
          alt="Luxury modern residence representing Done & Delivered verified properties"
          fill
          priority
          fetchPriority="high"
          quality={75}
          className="hero-bg-image object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(8,31,92,0.94)_0%,rgba(11,46,131,0.82)_46%,rgba(11,46,131,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(212,175,55,0.24),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,31,92,0.35),transparent_30%)]" />
        <div className="premium-noise absolute inset-0" />
      </div>

      <FloatingShapes variant="dark" />

      <Container className="relative z-10 flex min-h-[calc(100svh-5.25rem)] flex-col justify-center py-14 sm:py-16 md:py-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div className="max-w-3xl">
            <div className="hero-line mb-5 inline-flex sm:mb-6">
              <Badge tone="glass">
                <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
                Premium Verified Real Estate
              </Badge>
            </div>

            <h1
              id="hero-heading"
              ref={headlineRef}
              className="font-display text-[2.15rem] leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-[4.15rem]"
            >
              <span className="hero-line block">Verified Properties.</span>
              <span className="hero-line mt-1.5 block sm:mt-2">
                Verified{" "}
                <span className="bg-gradient-to-r from-accent via-accent-soft to-accent bg-clip-text text-transparent">
                  Developers.
                </span>
              </span>
              <span className="hero-line mt-1.5 block sm:mt-2">
                Verified Investments.
              </span>
            </h1>

            <p className="hero-line mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/90 sm:mt-6 sm:text-lg md:text-xl">
              {SITE_TAGLINE} An enterprise advisory platform built for luxury
              living and capital decisions you can trust.
            </p>

            <div className="hero-line mt-7 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
              {[
                "RERA-aligned diligence",
                "Institutional verification",
                "Luxury portfolio access",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[0.72rem] font-medium text-white/92 backdrop-blur-md sm:text-sm"
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
              { value: "2,400+", label: "Verified Listings" },
              { value: "180+", label: "Developer Partners" },
              { value: "₹4,800 Cr+", label: "Guided Capital" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-white/8 p-4 text-center backdrop-blur-md"
              >
                <p className="font-display text-2xl text-white">{stat.value}</p>
                <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/65">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="hero-search mt-10 md:mt-12"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.75 }}
        >
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/95 p-3 shadow-[0_36px_90px_rgba(8,31,92,0.32)] backdrop-blur-xl sm:p-4 md:p-5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

            <div className="mb-4 flex flex-col gap-3 px-1 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-[0_10px_24px_rgba(11,46,131,0.25)]">
                  <Search className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-primary md:text-base">
                    Premium Property Search
                  </p>
                  <p className="mt-0.5 text-xs text-muted md:text-sm">
                    Search verified inventory by type, city, and budget
                  </p>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent-dark">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Live Inventory
              </span>
            </div>

            <form
              className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto] xl:items-end"
              onSubmit={(e) => e.preventDefault()}
              role="search"
              aria-label="Search verified properties"
            >
              <div className="search-field">
                <label htmlFor="hero-property-type">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-3 w-3 text-accent" aria-hidden />
                    Property Type
                  </span>
                </label>
                <select
                  id="hero-property-type"
                  value={filters.propertyType}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, propertyType: e.target.value }))
                  }
                >
                  <option value="">All types</option>
                  {heroSearchOptions.propertyTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-field">
                <label htmlFor="hero-category">Category</label>
                <select
                  id="hero-category"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, category: e.target.value }))
                  }
                >
                  <option value="">All categories</option>
                  {heroSearchOptions.categories.map((item) => (
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
                  {heroSearchOptions.cities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-field">
                <label htmlFor="hero-budget">
                  <span className="inline-flex items-center gap-1.5">
                    <Wallet className="h-3 w-3 text-accent" aria-hidden />
                    Budget
                  </span>
                </label>
                <select
                  id="hero-budget"
                  value={filters.budget}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, budget: e.target.value }))
                  }
                >
                  <option value="">Any budget</option>
                  {heroSearchOptions.budgets.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 xl:col-span-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="h-[3.35rem] rounded-[1rem] xl:min-w-[158px]"
                  icon={<Search className="h-4 w-4" />}
                >
                  Search
                </Button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-primary/6 px-1 pt-4">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
                Popular:
              </span>
              {["Bengaluru Apartments", "Sarjapur Villas", "ORR Commercial"].map(
                (chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="rounded-full border border-primary/10 bg-[#F7FAFF] px-3 py-1 text-xs font-medium text-primary transition-all hover:border-accent/40 hover:bg-primary hover:text-white"
                  >
                    {chip}
                  </button>
                ),
              )}
            </div>
          </div>
        </motion.div>

        <div className="hero-stats mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:hidden">
          {[
            { value: "2,400+", label: "Listings" },
            { value: "180+", label: "Developers" },
            { value: "₹4.8k Cr+", label: "Capital" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-white/8 px-2 py-3 text-center backdrop-blur-md"
            >
              <p className="font-display text-lg text-white sm:text-xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.1em] text-white/65">
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
