"use client";

import { motion, useReducedMotion } from "framer-motion";

export function FloatingShapes({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const reduceMotion = useReducedMotion();

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
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={`float-shape left-[-8%] top-[12%] h-56 w-56 md:h-72 md:w-72 ${shapes[0]}`}
        animate={
          reduceMotion
            ? undefined
            : { y: [0, 24, 0], x: [0, 12, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`float-shape right-[-6%] top-[28%] h-48 w-48 md:h-64 md:w-64 ${shapes[1]}`}
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -20, 0], x: [0, -10, 0], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`float-shape bottom-[-10%] left-[30%] h-64 w-64 md:h-80 md:w-80 ${shapes[2]}`}
        animate={
          reduceMotion
            ? undefined
            : { y: [0, 16, 0], x: [0, 18, 0], scale: [1, 1.04, 1] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
