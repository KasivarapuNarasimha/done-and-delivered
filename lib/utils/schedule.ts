/** Run work after first paint / when the browser is idle. */
export function scheduleIdle(task: () => void, timeout = 2000): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const w = window as Window &
    typeof globalThis & {
      requestIdleCallback?: (
        cb: IdleRequestCallback,
        opts?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(() => task(), { timeout });
    return () => {
      w.cancelIdleCallback?.(id);
    };
  }

  const id = globalThis.setTimeout(task, Math.min(timeout, 1000));
  return () => {
    globalThis.clearTimeout(id);
  };
}
