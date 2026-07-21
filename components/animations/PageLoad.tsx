import type { ReactNode } from "react";

/**
 * Pass-through wrapper kept for API compatibility.
 * Fade-in on the whole page was removed — it delayed LCP by starting content at opacity 0.
 */
export function PageLoad({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
