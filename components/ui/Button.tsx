"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn, setRippleCoords } from "@/lib/utils";

type Variant = "primary" | "secondary" | "gold" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  fullWidth?: boolean;
  "aria-label"?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-primary !text-[#FFFFFF] font-bold border border-transparent shadow-[0_12px_28px_rgba(11,46,131,0.28)] hover:bg-primary-dark hover:!text-[#FFFFFF] hover:border-accent/45 hover:shadow-[0_14px_32px_rgba(212,175,55,0.24)] focus-visible:!text-[#FFFFFF]",
  secondary:
    "bg-white !text-[#0B2E83] font-bold border border-primary/20 shadow-sm hover:border-accent hover:!text-[#0B2E83] hover:shadow-[0_10px_24px_rgba(11,46,131,0.12)]",
  gold: "bg-accent !text-[#0B2E83] font-bold border border-transparent shadow-[0_12px_28px_rgba(212,175,55,0.34)] hover:bg-[#c4a030] hover:!text-[#0B2E83] focus-visible:!text-[#0B2E83]",
  ghost:
    "bg-white/18 !text-[#FFFFFF] font-bold border border-white/50 hover:bg-white hover:!text-[#0B2E83] hover:border-white backdrop-blur-md focus-visible:!text-[#FFFFFF]",
  outline:
    "bg-white !text-[#0B2E83] font-bold border border-primary/25 shadow-sm hover:border-accent hover:bg-primary hover:!text-[#FFFFFF]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm rounded-full gap-2",
  md: "h-12 px-6 text-sm md:text-[0.95rem] rounded-full gap-2.5",
  lg: "h-14 px-8 text-base rounded-full gap-3",
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    icon,
    fullWidth,
  } = props;

  const classes = cn(
    "btn-ripple inline-flex items-center justify-center tracking-wide transition-all duration-300 ease-out active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    const href = props.href;
    const isExternal =
      /^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("//");

    // mailto/tel/https must use a native anchor so the OS email client opens correctly
    if (isExternal) {
      return (
        <a
          href={href}
          target={props.target}
          rel={props.rel}
          onClick={props.onClick}
          onMouseMove={setRippleCoords}
          className={classes}
          aria-label={props["aria-label"]}
        >
          <span className="inline-flex items-center justify-center gap-2">
            {icon}
            {children}
          </span>
        </a>
      );
    }

    return (
      <Link
        href={href}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        onMouseMove={setRippleCoords}
        className={classes}
        aria-label={props["aria-label"]}
      >
        <span className="inline-flex items-center justify-center gap-2">
          {icon}
          {children}
        </span>
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      type={buttonProps.type ?? "button"}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
      onMouseMove={setRippleCoords}
      className={classes}
      aria-label={buttonProps["aria-label"]}
    >
      <span className="inline-flex items-center justify-center gap-2">
        {icon}
        {children}
      </span>
    </button>
  );
}
