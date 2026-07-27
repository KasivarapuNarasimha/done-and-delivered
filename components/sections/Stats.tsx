"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { siteStats } from "@/lib/data/homepage";

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function StatCard({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const count = useCountUp(value, Boolean(inView && !reduceMotion));
  const display = reduceMotion ? value : count;

  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        className="rounded-[1.35rem] border border-white/30 bg-white/12 px-5 py-6 text-center backdrop-blur-md md:py-8"
      >
        <p className="font-display text-3xl text-white md:text-4xl lg:text-5xl">
          {display}
          {suffix}
        </p>
        <p className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white">
          {label}
        </p>
      </div>
    </Reveal>
  );
}

export function Stats() {
  return (
    <section
      id="statistics"
      className="relative section-pad overflow-hidden bg-primary py-14 md:py-16"
      aria-labelledby="stats-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <div className="absolute -right-10 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mb-10 text-center md:mb-12">
          <p
            id="stats-heading"
            className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent"
          >
            Performance Snapshot
          </p>
          <h2 className="mt-3 font-display text-3xl text-white md:text-4xl">
            Numbers that define our launch systems
          </h2>
          <div className="gold-line gold-line-center mt-4" aria-hidden />
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {siteStats.map((stat, index) => (
            <StatCard
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.05}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
