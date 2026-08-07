"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  type PanInfo,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

import type { AmenityGalleryItem } from "@/lib/data/amenity-images";

export type { AmenityGalleryItem };

type AmenitiesGalleryProps = {
  items: readonly AmenityGalleryItem[];
  /** Auto-advance interval in ms (default 3500). */
  intervalMs?: number;
  className?: string;
};

const SWIPE_THRESHOLD = 48;

export function AmenitiesGallery({
  items,
  intervalMs = 3500,
  className,
}: AmenitiesGalleryProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActive(((index % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [count, paused, reduceMotion, intervalMs]);

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD) next();
      else if (info.offset.x > SWIPE_THRESHOLD) prev();
    },
    [next, prev],
  );

  /** Side-strip items: a few neighbors on each side (wrap). */
  const { leftStrip, rightStrip } = useMemo(() => {
    if (count <= 1) return { leftStrip: [] as number[], rightStrip: [] as number[] };
    const sideCount = Math.min(3, Math.floor((count - 1) / 2) || 1);
    const left: number[] = [];
    const right: number[] = [];
    for (let i = sideCount; i >= 1; i--) {
      left.push((active - i + count) % count);
    }
    for (let i = 1; i <= sideCount; i++) {
      right.push((active + i) % count);
    }
    return { leftStrip: left, rightStrip: right };
  }, [active, count]);

  if (count === 0) return null;

  const current = items[active];

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {/* Desktop / tablet: side strips + center stage */}
      <div className="hidden md:grid md:grid-cols-[minmax(5.5rem,7.5rem)_minmax(0,1fr)_minmax(5.5rem,7.5rem)] md:items-stretch md:gap-4 lg:gap-5">
        <ThumbStrip
          indices={leftStrip}
          items={items}
          active={active}
          onSelect={goTo}
          side="left"
        />

        <MainStage
          item={current}
          index={active}
          count={count}
          reduceMotion={Boolean(reduceMotion)}
          onDragEnd={onDragEnd}
          onPrev={prev}
          onNext={next}
        />

        <ThumbStrip
          indices={rightStrip}
          items={items}
          active={active}
          onSelect={goTo}
          side="right"
        />
      </div>

      {/* Mobile: main + horizontal thumbs */}
      <div className="md:hidden">
        <MainStage
          item={current}
          index={active}
          count={count}
          reduceMotion={Boolean(reduceMotion)}
          onDragEnd={onDragEnd}
          onPrev={prev}
          onNext={next}
        />
        <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item, index) => (
            <button
              key={`${item.name}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${item.name}`}
              aria-current={index === active ? "true" : undefined}
              className={cn(
                "relative h-16 w-[4.5rem] shrink-0 overflow-hidden rounded-xl border transition-all duration-300",
                index === active
                  ? "border-accent shadow-[0_8px_24px_rgba(11,46,131,0.18)] ring-2 ring-accent/40"
                  : "border-primary/10 opacity-80 hover:opacity-100",
              )}
            >
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="72px"
                loading="lazy"
                quality={55}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      {count > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {items.map((item, index) => (
            <button
              key={`dot-${item.name}-${index}`}
              type="button"
              aria-label={`Go to ${item.name}`}
              onClick={() => goTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === active
                  ? "w-7 bg-accent"
                  : "w-1.5 bg-primary/20 hover:bg-primary/40",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ThumbStrip({
  indices,
  items,
  active,
  onSelect,
  side,
}: {
  indices: number[];
  items: readonly AmenityGalleryItem[];
  active: number;
  onSelect: (i: number) => void;
  side: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-3",
        side === "left" ? "items-end" : "items-start",
      )}
    >
      {indices.map((index) => {
        const item = items[index];
        if (!item) return null;
        const isActive = index === active;
        return (
          <motion.button
            key={`${side}-${item.name}-${index}`}
            type="button"
            layout
            onClick={() => onSelect(index)}
            whileHover={{ scale: 1.04, x: side === "left" ? -2 : 2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            aria-label={`Show ${item.name}`}
            className={cn(
              "group relative w-full max-w-[7rem] overflow-hidden rounded-2xl border bg-white shadow-[0_10px_28px_rgba(11,46,131,0.08)] transition-colors",
              isActive
                ? "border-accent ring-2 ring-accent/30"
                : "border-primary/10 hover:border-accent/40",
            )}
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="120px"
                loading="lazy"
                quality={55}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-2 text-center text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white">
                {item.name}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

function MainStage({
  item,
  index,
  count,
  reduceMotion,
  onDragEnd,
  onPrev,
  onNext,
}: {
  item: AmenityGalleryItem;
  index: number;
  count: number;
  reduceMotion: boolean;
  onDragEnd: (e: unknown, info: PanInfo) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="relative">
      <motion.div
        className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.5rem] border border-primary/10 bg-[#F7FAFF] shadow-[0_20px_60px_rgba(11,46,131,0.12)] sm:aspect-[16/10] md:aspect-[16/11] lg:min-h-[22rem]"
        drag={count > 1 ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={onDragEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${item.image}-${index}`}
            className="absolute inset-0"
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 1.04, x: 24 }
            }
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98, x: -24 }
            }
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 70vw"
              quality={78}
              // Active image: eager for smoother transitions; thumbs stay lazy.
              loading={index === 0 ? "eager" : "lazy"}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,31,92,0.05)_0%,rgba(8,31,92,0.15)_45%,rgba(8,31,92,0.78)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-accent">
                Amenity
              </p>
              <p className="mt-1.5 font-display text-2xl text-white sm:text-3xl md:text-4xl">
                {item.name}
              </p>
              <div className="gold-line mt-3 max-w-[6rem]" aria-hidden />
            </div>
          </motion.div>
        </AnimatePresence>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous amenity"
              className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-primary/45 text-white backdrop-blur-md transition hover:border-accent hover:bg-accent hover:text-primary sm:left-4 sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next amenity"
              className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-primary/45 text-white backdrop-blur-md transition hover:border-accent hover:bg-accent hover:text-primary sm:right-4 sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </motion.div>
    </div>
  );
}

/** Text-card fallback when a project has no amenity images. */
export function AmenitiesTextGrid({
  amenities,
}: {
  amenities: readonly string[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {amenities.map((amenity) => (
        <div
          key={amenity}
          className="card-lift flex h-full items-center gap-3 rounded-[1.2rem] border border-primary/8 bg-[#F7FAFF] px-4 py-4 shadow-[0_10px_28px_rgba(11,46,131,0.05)]"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-white">
            <Sparkles className="h-4 w-4 text-accent" aria-hidden />
          </span>
          <p className="text-sm font-semibold text-primary">{amenity}</p>
        </div>
      ))}
    </div>
  );
}
