import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerifiedBadge({
  label = "Verified",
  size = "md",
  className,
}: {
  label?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-bold uppercase tracking-[0.12em] shadow-[0_6px_18px_rgba(8,31,92,0.22)]",
        "border-accent/50 bg-[linear-gradient(135deg,rgba(11,46,131,0.92),rgba(8,31,92,0.96))] text-white backdrop-blur-md",
        size === "sm" && "px-2.5 py-1 text-[0.62rem]",
        size === "md" && "px-3 py-1.5 text-[0.68rem]",
        className,
      )}
    >
      <span className="relative grid place-items-center">
        <span className="absolute inset-0 rounded-full bg-accent/40 blur-[3px]" aria-hidden />
        <BadgeCheck
          className={cn(
            "relative text-accent",
            size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
          )}
          aria-hidden
        />
      </span>
      <span>{label}</span>
    </span>
  );
}
