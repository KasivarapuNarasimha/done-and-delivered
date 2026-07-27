import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FloatingShapes } from "@/components/animations/FloatingShapes";
import type { ReactNode } from "react";

type Cta = {
  label: string;
  href: string;
  variant?: "gold" | "ghost" | "primary" | "secondary" | "outline";
  external?: boolean;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  icon?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  icon,
}: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-primary pt-[4.75rem] md:pt-[5.25rem]"
      aria-labelledby="page-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(212,175,55,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,31,92,0.55)_0%,rgba(11,46,131,0.35)_55%,transparent_100%)]" />
        <div className="absolute inset-0 bg-primary/25" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 70%, #D4AF37 0%, transparent 45%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--brand-bg)] to-transparent" />
      </div>
      <FloatingShapes variant="dark" />

      <Container className="relative z-10 py-14 sm:py-16 md:py-20 lg:py-24">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white sm:text-sm">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.label} className="inline-flex items-center gap-2">
                    {index > 0 ? (
                      <span className="text-white/70" aria-hidden>
                        /
                      </span>
                    ) : null}
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="text-white transition-colors hover:text-accent"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={
                          isLast ? "font-bold text-accent" : "text-white"
                        }
                        aria-current={isLast ? "page" : undefined}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <div className="max-w-3xl">
          <div className="mb-5 inline-flex">
            <Badge tone="glass">
              {icon}
              {eyebrow}
            </Badge>
          </div>
          <h1
            id="page-hero-heading"
            className="font-display text-[2.35rem] leading-[1.08] tracking-tight text-white drop-shadow-[0_3px_20px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl"
          >
            {title}
          </h1>
          <div className="gold-line mt-5" aria-hidden />
          <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-white sm:text-base md:text-lg">
            {description}
          </p>

          {primaryCta || secondaryCta ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {primaryCta ? (
                <Button
                  href={primaryCta.href}
                  variant={primaryCta.variant ?? "gold"}
                  size="lg"
                  className="w-full sm:w-auto"
                  target={primaryCta.external ? "_blank" : undefined}
                  rel={primaryCta.external ? "noopener noreferrer" : undefined}
                >
                  {primaryCta.label}
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button
                  href={secondaryCta.href}
                  variant={secondaryCta.variant ?? "ghost"}
                  size="lg"
                  className="w-full sm:w-auto"
                  target={secondaryCta.external ? "_blank" : undefined}
                  rel={
                    secondaryCta.external ? "noopener noreferrer" : undefined
                  }
                >
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
