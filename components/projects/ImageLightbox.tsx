"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect } from "react";

export function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-accent hover:text-primary"
        aria-label="Close preview"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="relative h-[min(80vh,720px)] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="90vw"
          quality={90}
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
