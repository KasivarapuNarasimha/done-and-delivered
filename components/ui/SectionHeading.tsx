"use client";

import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-14 lg:mb-16",
        align === "center" && "mx-auto max-w-3xl text-center",
        align === "left" && "max-w-2xl text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <div
            className={cn(
              "mb-4 inline-flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.22em]",
              light ? "text-accent-soft" : "text-accent-dark",
              align === "center" && "justify-center",
            )}
          >
            <span className="h-px w-7 bg-accent" aria-hidden />
            <span>{eyebrow}</span>
            {align === "center" ? (
              <span className="h-px w-7 bg-accent" aria-hidden />
            ) : null}
          </div>
        </Reveal>
      ) : null}

      <TextReveal
        as="h2"
        className={cn(
          "text-[1.85rem] leading-[1.15] sm:text-3xl md:text-4xl lg:text-[2.65rem]",
          light ? "text-white" : "text-primary",
        )}
        text={title}
      />

      <div
        className={cn(
          "gold-line mt-5",
          align === "center" && "gold-line-center",
        )}
        aria-hidden
      />

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-[0.98rem] leading-relaxed md:text-lg",
              light ? "text-white/72" : "text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
