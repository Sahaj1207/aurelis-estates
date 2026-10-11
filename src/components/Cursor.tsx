import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function labelFor(target: Element | null): string | null {
  if (!target) return null;
  const tagged = target.closest<HTMLElement>("[data-cursor]");
  // An inner tagged element (a link inside the drag rail) wins over its container
  if (tagged?.dataset.cursor) {
    const interactive = target.closest("a, button");
    if (interactive && !interactive.hasAttribute("data-cursor") && tagged.contains(interactive)) {
      return null;
    }
    return tagged.dataset.cursor;
  }
  if (target.tagName === "IMG" && target.closest("[data-gallery]") && !target.closest("a, button")) {
    return "Expand";
  }
  return null;
}

// Desktop-only follower: a quiet ring that trails the pointer, tightens over
// links, and opens into a labelled disc over anything that can be dragged or opened.
export const Cursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [overLink, setOverLink] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(mq.matches && !reduced.matches);
    sync();
    mq.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    if (!enabled || !ring) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set(ring, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const moveX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const moveY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });
    let visible = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.set(ring, { x: e.clientX, y: e.clientY });
        gsap.to(ring, { autoAlpha: 1, duration: 0.3 });
      }
      moveX(e.clientX);
      moveY(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      setLabel(labelFor(target));
      setOverLink(!!target?.closest("a, button, [role='button']"));
    };
    const onLeave = () => {
      visible = false;
      gsap.to(ring, { autoAlpha: 0, duration: 0.3 });
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      gsap.killTweensOf(ring);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = label ? 92 : overLink ? 30 : 42;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none invisible fixed left-0 top-0 z-[98] will-change-transform"
    >
      <div
        style={{ width: size, height: size }}
        className={`flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          label
            ? "border-[#dfd7c6] bg-[#dfd7c6]"
            : overLink
              ? "border-[#dfd7c6]/80 bg-[#dfd7c6]/10"
              : "border-white/25 bg-transparent"
        } ${pressed ? "scale-[0.86]" : "scale-100"}`}
      >
        <span
          className={`text-[9.5px] font-medium uppercase tracking-[0.22em] pl-[0.22em] text-[#0a0c0d] transition-opacity duration-300 ${
            label ? "opacity-100 delay-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
