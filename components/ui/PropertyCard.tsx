"use client";

import Image from "next/image";
import { BedDouble, MapPin, Ruler } from "lucide-react";
import type { Property } from "@/lib/data/homepage";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { Reveal } from "@/components/animations/Reveal";

export function PropertyCard({
  property,
  delay = 0,
}: {
  property: Property;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="card-lift group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-primary/8 bg-white shadow-[0_16px_48px_rgba(11,46,131,0.08)]">
        <div className="img-reveal relative aspect-[5/3.4] overflow-hidden">
          <Image
            src={property.image}
            alt={`${property.title} in ${property.location}, ${property.city}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />

          <div className="absolute left-3.5 top-3.5 right-3.5 flex flex-wrap items-start justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge tone="gold">{property.status}</Badge>
              {property.verified ? <VerifiedBadge size="sm" /> : null}
            </div>
          </div>

          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 rounded-full border border-white/25 bg-white/15 py-1.5 pl-1.5 pr-3 backdrop-blur-md">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-[0.62rem] font-bold tracking-wide text-white">
                {property.builderLogo}
              </span>
              <span className="truncate text-xs font-semibold text-white">
                {property.builder}
              </span>
            </div>
            <p className="shrink-0 rounded-full bg-white px-3.5 py-2 text-sm font-extrabold tracking-tight text-primary shadow-[0_8px_20px_rgba(8,31,92,0.18)]">
              {property.price}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-5 md:px-6 md:pb-6 md:pt-6">
          <div className="mb-1">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-accent-dark">
              {property.type}
            </p>
            <h3 className="mt-1.5 font-display text-[1.35rem] leading-snug text-primary transition-colors duration-300 group-hover:text-primary-light md:text-[1.45rem]">
              {property.title}
            </h3>
          </div>

          <p className="mt-2.5 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
            <span>
              {property.location}, {property.city}
            </span>
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 border-y border-primary/6 py-3.5 text-xs font-semibold text-primary/80">
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-accent" aria-hidden />
              {property.beds}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Ruler className="h-3.5 w-3.5 text-accent" aria-hidden />
              {property.area}
            </span>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
            <Button
              href={`/properties/${property.id}`}
              variant="outline"
              size="sm"
              className="text-[0.8rem]"
            >
              View Details
            </Button>
            <Button
              href={`/contact?intent=site-visit&property=${property.id}`}
              variant="primary"
              size="sm"
              className="text-[0.8rem]"
            >
              Book Visit
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
