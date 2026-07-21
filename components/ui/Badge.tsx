import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "gold",
}: {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "blue" | "glass" | "white";
}) {
  const tones = {
    gold: "bg-[linear-gradient(135deg,rgba(212,175,55,0.95),rgba(232,212,139,0.95))] text-primary border-accent/40 shadow-[0_6px_16px_rgba(212,175,55,0.28)]",
    blue: "bg-primary/10 text-primary border-primary/15",
    glass: "bg-white/12 text-white border-white/25 backdrop-blur-md",
    white:
      "bg-white text-primary border-white/80 shadow-[0_8px_20px_rgba(8,31,92,0.12)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
