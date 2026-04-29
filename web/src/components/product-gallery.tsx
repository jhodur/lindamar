"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  imagenes: string[];
  alt: string;
};

export function ProductGallery({ imagenes, alt }: Props) {
  const [index, setIndex] = useState(0);
  const total = imagenes.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  // Keyboard navigation when gallery is in viewport
  useEffect(() => {
    if (total <= 1) return;
    function onKey(e: KeyboardEvent) {
      const el = containerRef.current;
      if (!el) return;
      // Solo si la galería está visible en pantalla
      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!visible) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, total]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return; // ignore taps
    if (dx > 0) goPrev();
    else goNext();
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-3"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-blush-100">
        {imagenes.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${alt} — foto ${i + 1} de ${total}`}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-cream-100/85 text-navy-700 shadow-md backdrop-blur transition hover:bg-cream-100 hover:text-terracotta-600"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-cream-100/85 text-navy-700 shadow-md backdrop-blur transition hover:bg-cream-100 hover:text-terracotta-600"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-navy-900/60 px-3 py-1 text-xs font-medium text-cream-100 backdrop-blur">
              {index + 1} / {total}
            </div>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {imagenes.slice(0, 6).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-pressed={i === index}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md bg-blush-100 transition",
                i === index
                  ? "ring-2 ring-terracotta-500 ring-offset-2 ring-offset-cream-100"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
