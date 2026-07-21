/**
 * Shared utility helpers.
 * Add pure, reusable functions here as the project grows.
 */

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
