"use client";

import type { ReactNode } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { openBusinessEnquiryMail } from "@/lib/utils/mailto";

/**
 * Contact Us control used on the About page (hero + bottom CTA).
 * Uses a real button click handler so the action is not blocked by
 * Next.js Link routing or a broken mailto + preventDefault path.
 */
export function ContactUsButton({
  variant = "gold",
  size = "lg",
  fullWidth,
  className,
  icon,
  children = "Contact Us",
}: {
  variant?: "primary" | "secondary" | "gold" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      icon={icon ?? <Mail className="h-4 w-4" />}
      onClick={() => openBusinessEnquiryMail("/contact")}
    >
      {children}
    </Button>
  );
}
