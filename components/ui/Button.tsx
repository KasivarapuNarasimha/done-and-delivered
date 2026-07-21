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
    "bg-primary text-white hover:bg-primary-dark border border-transparent shadow-[0_12px_28px_rgba(11,46,131,0.26)] hover:shadow-[0_14px_32px_rgba(212,175,55,0.28)] hover:border-accent/50",
  secondary:
    "bg-white text-primary border border-primary/10 hover:border-accent hover:shadow-[0_10px_24px_rgba(11,46,131,0.1)] shadow-sm",
  gold: "bg-accent text-primary hover:bg-accent-dark hover:text-white border border-transparent shadow-[0_12px_28px_rgba(212,175,55,0.32)]",
  ghost:
    "bg-white/10 text-white border border-white/20 hover:bg-white hover:text-primary backdrop-blur-md",
  outline:
    "bg-white text-primary border border-primary/15 hover:border-accent hover:bg-primary hover:text-white shadow-sm",
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
    "btn-ripple inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 ease-out active:scale-[0.985] disabled:pointer-events-none disabled:opacity-55",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
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
