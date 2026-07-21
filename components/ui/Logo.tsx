import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Official logo intrinsic size (do not crop or stretch). */
export const LOGO_SRC = "/done-and-delivered-logo.jpeg";
export const LOGO_WIDTH = 1600;
export const LOGO_HEIGHT = 836;
export const LOGO_ASPECT = LOGO_WIDTH / LOGO_HEIGHT;

type LogoSize = "sm" | "md" | "lg";

const sizes: Record<
  LogoSize,
  { height: number; className: string; sizes: string }
> = {
  sm: {
    height: 36,
    className: "h-9 w-auto sm:h-10",
    sizes: "144px",
  },
  md: {
    height: 44,
    className: "h-10 w-auto sm:h-11 md:h-12",
    sizes: "168px",
  },
  lg: {
    height: 56,
    className: "h-12 w-auto sm:h-14",
    sizes: "200px",
  },
};

/**
 * Official Done & Delivered logo.
 * - Exact asset: /done-and-delivered-logo.jpeg
 * - Aspect ratio preserved (no stretch/crop)
 * - Works on blue header/footer; blue plate also reads correctly on light sections
 */
export function Logo({
  variant = "dark",
  className,
  size = "md",
  priority = false,
}: {
  /** Kept for API compatibility; logo is a self-contained blue brand plate. */
  variant?: "dark" | "light";
  className?: string;
  size?: LogoSize;
  priority?: boolean;
}) {
  const config = sizes[size];
  const width = Math.round(config.height * LOGO_ASPECT);

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex min-w-0 shrink-0 items-center transition-opacity hover:opacity-95",
        className,
      )}
      aria-label="Done & Delivered home"
    >
      <Image
        src={LOGO_SRC}
        alt="Done & Delivered — Powered by RRR Estates LLP"
        width={width}
        height={config.height}
        priority={priority}
        quality={90}
        sizes={config.sizes}
        className={cn(
          "h-auto max-w-[min(100%,220px)] object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]",
          config.className,
        )}
        style={{
          width: "auto",
          height: undefined,
          aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}`,
        }}
      />
      {/* Screen-reader only brand context; visual brand is fully in the logo image */}
      <span className="sr-only">
        Done & Delivered. Premium property marketing. Powered by RRR Estates
        LLP.
        {variant === "light" ? " Header brand mark." : " Brand mark."}
      </span>
    </Link>
  );
}
