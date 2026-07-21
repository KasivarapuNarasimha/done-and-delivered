"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { scheduleIdle } from "@/lib/utils/schedule";

/**
 * Decorative only — deferred until idle and limited to desktop fine-pointer devices
 * so initial load / LCP is not competing with continuous animation work.
 */
export function FloatingShapes({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const start = () => {
      setMounted(true);
      const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
      setCanAnimate(mq.matches && !reduceMotion);
    };

    const cancel = scheduleIdle(start, 2200);
    return cancel;
  }, [reduceMotion]);

  if (!mounted) {
    return null;
  }

  const shapes =
    variant === "light"
      ? [
          "bg-[radial-gradient(circle,rgba(11,46,131,0.14),transparent_70%)]",
          "bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_70%)]",
          "bg-[radial-gradient(circle,rgba(11,46,131,0.1),transparent_70%)]",
        ]
      : [
          "bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)]",
          "bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)]",
          "bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)]",
        ];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className={`float-shape left-[-8%] top-[12%] h-40 w-40 md:h-72 md:w-72 ${shapes[0]}`}
        animate={
          canAnimate
            ? { y: [0, 20, 0], x: [0, 10, 0], scale: [1, 1.04, 1] }
            : undefined
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`float-shape right-[-6%] top-[28%] h-36 w-36 md:h-64 md:w-64 ${shapes[1]}`}
        animate={
          canAnimate
            ? { y: [0, -16, 0], x: [0, -8, 0], scale: [1, 1.06, 1] }
            : undefined
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`float-shape bottom-[-10%] left-[30%] hidden h-80 w-80 md:block ${shapes[2]}`}
        animate={
          canAnimate
            ? { y: [0, 14, 0], x: [0, 14, 0], scale: [1, 1.03, 1] }
            : undefined
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
