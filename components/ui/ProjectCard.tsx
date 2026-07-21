"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Project } from "@/lib/data/homepage";
import { Badge } from "@/components/ui/Badge";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  delay = 0,
  animate = true,
  className,
}: {
  project: Project;
  delay?: number;
  animate?: boolean;
  className?: string;
}) {
  const card = (
    <article
      id={project.id}
      className={cn(
        "card-lift group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-primary/8 bg-white shadow-[0_16px_48px_rgba(11,46,131,0.08)]",
        className,
      )}
    >
      <div className="img-reveal relative aspect-[5/3.35] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} — ${project.type}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 92vw, (max-width: 1200px) 45vw, 360px"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/15 to-transparent" />

        <div className="absolute left-3 top-3 right-3 flex flex-wrap gap-2">
          <Badge tone="gold">{project.status}</Badge>
          <VerifiedBadge size="sm" label="Official" />
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 rounded-full border border-white/25 bg-white/15 py-1.5 pl-1.5 pr-3 backdrop-blur-md">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-[0.62rem] font-bold text-white">
              {project.initials}
            </span>
            <span className="truncate text-xs font-semibold text-white">
              {project.developer}
            </span>
          </div>
          <span className="rounded-full bg-white px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-primary">
            {project.type}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-5 md:px-6 md:pb-6">
        <h3 className="font-display text-[1.35rem] leading-snug text-primary md:text-[1.5rem]">
          {project.name}
        </h3>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
          {project.location}
        </p>
        <div className="gold-line mt-4" aria-hidden />
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
      </div>
    </article>
  );

  if (!animate) {
    return <div className="h-full">{card}</div>;
  }

  return (
    <Reveal delay={delay} className="h-full">
      {card}
    </Reveal>
  );
}
