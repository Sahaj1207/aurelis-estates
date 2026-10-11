import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { lockScroll, unlockScroll } from "../services/smoothScroll";

interface PreloaderProps {
  // Fires as the curtain begins to lift, so the page beneath can start its entrance in step
  onReveal: () => void;
  onDone: () => void;
}

const MIN_HOLD_MS = 1100;
const MAX_WAIT_MS = 3200;

function waitForFirstPaintAssets(): Promise<void> {
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const hero = new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src =
      window.innerWidth * window.devicePixelRatio <= 800
        ? "/images/marine-house-hero-800.webp"
        : "/images/marine-house-hero.webp";
  });
  const settled = Promise.all([fonts, hero]).then(() => undefined);
  const hold = new Promise<void>((r) => window.setTimeout(r, MIN_HOLD_MS));
  const cap = new Promise<void>((r) => window.setTimeout(r, MAX_WAIT_MS));
  return Promise.all([hold, Promise.race([settled, cap])]).then(() => undefined);
}

export const Preloader: React.FC<PreloaderProps> = ({ onReveal, onDone }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    lockScroll();

    const ctx = gsap.context(() => {
      if (reducedMotion) return;
      gsap.fromTo(
        markRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 0.82, duration: 2.6, ease: "power2.out", delay: 0.2 }
      );
    }, root);

    waitForFirstPaintAssets().then(() => {
      if (cancelled) return;

      if (reducedMotion) {
        unlockScroll();
        onReveal();
        onDone();
        return;
      }

      ctx.add(() => {
        gsap
          .timeline({
            onComplete: () => {
              unlockScroll();
              onDone();
            },
          })
          .to(lineRef.current, { scaleX: 1, duration: 0.45, ease: "power2.inOut" })
          .to(markRef.current, { opacity: 0, y: -12, duration: 0.45, ease: "power2.in" }, "-=0.1")
          .add(onReveal)
          .to(root, { yPercent: -100, duration: 1.05, ease: "power4.inOut" });
      });
    });

    return () => {
      cancelled = true;
      ctx.revert();
      unlockScroll();
    };
    // The curtain runs once per page load; callbacks are stable setters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0c0d] will-change-transform"
    >
      <div ref={markRef} className="flex flex-col items-center">
        <span className="pl-[0.42em] text-[13px] sm:text-[14px] font-medium tracking-[0.42em] uppercase text-[#f6f6f4]">
          AURELIS ESTATES
        </span>
        <span className="mt-2 pl-[0.34em] text-[8.5px] tracking-[0.34em] uppercase text-[#c8c2b5]/60">
          Private Residences
        </span>
        <span className="mt-7 block h-px w-28 overflow-hidden bg-white/10">
          <span
            ref={lineRef}
            className="block h-full w-full origin-left scale-x-0 bg-[#dfd7c6]"
          />
        </span>
      </div>
    </div>
  );
};
