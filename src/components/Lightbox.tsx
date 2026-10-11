import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { lockScroll, unlockScroll } from "../services/smoothScroll";

interface Slide {
  src: string;
  alt: string;
}

const CLOSE_DISTANCE = 110;

// Fullscreen photograph viewer. Any <img> inside a [data-gallery] container opens
// it on tap or click, with that container's photographs as the set. Swipe sideways
// to move between them, pull down or press Escape to close.
export const Lightbox: React.FC = () => {
  const [slides, setSlides] = useState<Slide[] | null>(null);
  const [index, setIndex] = useState(0);
  const startIndexRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Open from any gallery photograph
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || target.tagName !== "IMG") return;
      const gallery = target.closest("[data-gallery]");
      if (!gallery || target.closest("a, button")) return;

      const seen = new Set<string>();
      const set: Slide[] = [];
      gallery.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src");
        if (!src || seen.has(src)) return;
        seen.add(src);
        set.push({ src, alt: img.alt });
      });

      const clicked = (target as HTMLImageElement).getAttribute("src");
      startIndexRef.current = Math.max(0, set.findIndex((s) => s.src === clicked));
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setIndex(startIndexRef.current);
      setSlides(set);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = useCallback(() => {
    const root = rootRef.current;
    const done = () => {
      setSlides(null);
      returnFocusRef.current?.focus?.();
    };
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done();
      return;
    }
    gsap.to(root, { autoAlpha: 0, duration: 0.35, ease: "power2.inOut", onComplete: done });
  }, []);

  const goTo = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  }, []);

  // Entrance, scroll lock, keyboard and gestures while open
  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!slides || !root || !track) return;

    lockScroll();
    track.scrollLeft = startIndexRef.current * track.clientWidth;
    closeRef.current?.focus();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotion) {
      gsap.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "power2.out" });
      gsap.fromTo(
        track,
        { scale: 0.96 },
        { scale: 1, duration: 0.9, ease: "power3.out", clearProps: "transform" }
      );
    }

    const onScroll = () => {
      setIndex(Math.round(track.scrollLeft / Math.max(1, track.clientWidth)));
    };

    const onKey = (e: KeyboardEvent) => {
      const current = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") goTo(Math.min(slides.length - 1, current + 1));
      else if (e.key === "ArrowLeft") goTo(Math.max(0, current - 1));
    };

    // Pull down to dismiss
    let startX = 0;
    let startY = 0;
    let pulling: boolean | null = null;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      pulling = null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (pulling === null && Math.abs(dx) + Math.abs(dy) > 10) {
        pulling = dy > 0 && Math.abs(dy) > Math.abs(dx) * 1.4;
      }
      if (!pulling) return;
      e.preventDefault();
      gsap.set(track, { y: dy * 0.9, scale: 1 - Math.min(0.12, dy / 2400) });
      gsap.set(root, { backgroundColor: `rgba(10,12,13,${Math.max(0.45, 0.97 - dy / 520)})` });
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!pulling) return;
      const dy = e.changedTouches[0].clientY - startY;
      pulling = null;
      if (dy > CLOSE_DISTANCE) {
        close();
        return;
      }
      gsap.to(track, { y: 0, scale: 1, duration: 0.5, ease: "power3.out", clearProps: "transform" });
      gsap.to(root, { backgroundColor: "rgba(10,12,13,0.97)", duration: 0.4 });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });
    root.addEventListener("touchend", onTouchEnd);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", onTouchEnd);
      gsap.killTweensOf([root, track]);
      unlockScroll();
    };
  }, [slides, close, goTo]);

  if (!slides) return null;

  const multiple = slides.length > 1;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photograph viewer"
      data-lenis-prevent
      className="fixed inset-0 z-[95] flex flex-col bg-[rgba(10,12,13,0.97)]"
    >
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-12 pt-[max(1.25rem,env(safe-area-inset-top))] pb-4">
        <span className="font-mono text-[10px] tracking-[0.24em] text-[#f6f6f4]/85 tabular-nums">
          {String(index + 1).padStart(2, "0")}
          <span className="text-[#f6f6f4]/40"> / {String(slides.length).padStart(2, "0")}</span>
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close photograph viewer"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#f6f6f4] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#dfd7c6] hover:rotate-90 active:scale-95"
        >
          <X size={18} weight="light" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="lightbox-track flex min-h-0 flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory overscroll-contain"
      >
        {slides.map((slide) => (
          <figure
            key={slide.src}
            className="flex h-full w-full shrink-0 snap-center snap-always items-center justify-center px-4 sm:px-10 md:px-24"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              draggable={false}
              className="max-h-full max-w-full object-contain"
            />
          </figure>
        ))}
      </div>

      <div className="flex items-center justify-between gap-6 px-6 sm:px-8 md:px-12 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <p className="max-w-[60ch] text-[11.5px] md:text-[12.5px] font-light leading-[1.6] text-[#c8c2b5]/75 line-clamp-2">
          {slides[index]?.alt}
        </p>
        {multiple && (
          <div className="hidden md:flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous photograph"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#f6f6f4] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#dfd7c6] hover:bg-[#dfd7c6] hover:text-[#0a0c0d] active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft size={16} weight="light" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === slides.length - 1}
              aria-label="Next photograph"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#f6f6f4] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#dfd7c6] hover:bg-[#dfd7c6] hover:text-[#0a0c0d] active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowRight size={16} weight="light" />
            </button>
          </div>
        )}
        {multiple && (
          <span className="md:hidden shrink-0 text-[9.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/50">
            Swipe
          </span>
        )}
      </div>
    </div>
  );
};
