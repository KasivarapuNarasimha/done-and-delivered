"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { scheduleIdle } from "@/lib/utils/schedule";

/**
 * Defer Lenis until after first paint / idle to free the main thread for LCP.
 * Falls back to native scroll until ready (no UI change).
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return scheduleIdle(() => setReady(true), 1800);
  }, []);

  if (!ready) {
    return <>{children}</>;
  }

  return <LenisRoot>{children}</LenisRoot>;
}

const LenisRoot = dynamic(
  () =>
    import("lenis/react").then(({ ReactLenis }) => {
      function Root({ children }: { children: ReactNode }) {
        return (
          <ReactLenis
            root
            options={{
              duration: 1.05,
              smoothWheel: true,
              touchMultiplier: 1.25,
              lerp: 0.1,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            }}
          >
            {children}
          </ReactLenis>
        );
      }
      return Root;
    }),
  { ssr: false },
);
