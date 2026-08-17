import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Official transparent logo (public/logo-2.png). public/logo.png kept as backup. */
export const LOGO_SRC = "/logo-2.png";
/** Intrinsic pixel size of public/logo-2.png */
export const LOGO_WIDTH = 1600;
export const LOGO_HEIGHT = 800;
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
 * Official Done & Delivered logo — transparent PNG for blue header/footer.
 * No background, border, padding box, or shadow.
 */
export function Logo({
  variant = "dark",
  className,
  size = "md",
  priority = false,
}: {
  /** Kept for API compatibility. */
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
        "group inline-flex min-w-0 shrink-0 items-center bg-transparent p-0",
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
        quality={95}
        sizes={config.sizes}
        className={cn(
          "h-auto w-auto max-w-[min(100%,200px)] bg-transparent object-contain object-left",
          config.className,
        )}
        style={{
          width: "auto",
          height: undefined,
          aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}`,
          background: "transparent",
        }}
      />
      <span className="sr-only">
        Done & Delivered. Premium property marketing. Powered by RRR Estates
        LLP.
        {variant === "light" ? " Header brand mark." : " Brand mark."}
      </span>
    </Link>
  );
}
