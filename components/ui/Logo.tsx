import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-95 sm:gap-3",
        className,
      )}
      aria-label="Done & Delivered home"
    >
      <span
        className={cn(
          "relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl border shadow-sm transition-transform duration-300 group-hover:scale-[1.03] sm:h-11 sm:w-11",
          isLight
            ? "border-white/20 bg-white/10 text-white"
            : "border-primary/10 bg-primary text-white",
        )}
      >
        <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
          D
        </span>
        <span
          className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(212,175,55,0.2)]"
          aria-hidden
        />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "truncate font-display text-[1.05rem] font-semibold tracking-tight sm:text-[1.2rem] md:text-[1.25rem]",
            isLight ? "text-white" : "text-primary",
          )}
        >
          Done{" "}
          <span className={isLight ? "text-accent-soft" : "text-accent"}>
            &
          </span>{" "}
          Delivered
        </span>
        <span
          className={cn(
            "mt-1 hidden text-[0.6rem] font-bold uppercase tracking-[0.2em] sm:block",
            isLight ? "text-white/65" : "text-muted",
          )}
        >
          Premium Property Marketing
        </span>
      </span>
    </Link>
  );
}
