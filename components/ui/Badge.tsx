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
    gold: "bg-[linear-gradient(135deg,#D4AF37,#E8D48B)] text-primary border-accent/50 shadow-[0_6px_16px_rgba(212,175,55,0.28)]",
    blue: "bg-primary/12 text-primary border-primary/20",
    glass:
      "bg-white/18 text-white border-white/45 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.18)]",
    white:
      "bg-white text-primary border-white shadow-[0_8px_20px_rgba(8,31,92,0.12)]",
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
