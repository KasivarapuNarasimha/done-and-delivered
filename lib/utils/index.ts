import type { FocusEvent, MouseEvent } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function setRippleCoords(
  event: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>,
) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();

  if ("clientX" in event && event.clientX) {
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    target.style.setProperty("--ripple-x", `${x}%`);
    target.style.setProperty("--ripple-y", `${y}%`);
    return;
  }

  target.style.setProperty("--ripple-x", "50%");
  target.style.setProperty("--ripple-y", "50%");
}
