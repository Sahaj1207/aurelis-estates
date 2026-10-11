import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { collectionResidencesData } from "./collectionData";
import { Img } from "../Img";

interface ResidenceRailProps {
  onNavigate?: (href: string) => void;
}

const DRAG_THRESHOLD = 6;

// Horizontal residence index. Touch devices swipe it natively with scroll-snap;
// a mouse grabs and throws it. Both land on a card edge.
export const ResidenceRail: React.FC<ResidenceRailProps> = ({ onNavigate }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const draggedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = collectionResidencesData.length;

  const cardOffsets = () => {
    const track = trackRef.current;
    if (!track) return [];
    const origin = track.getBoundingClientRect().left - track.scrollLeft;
    const inset = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    return Array.from(track.querySelectorAll<HTMLElement>(".residence-card")).map(
      (card) => card.getBoundingClientRect().left - origin - inset
    );
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const offsets = cardOffsets();
    const clamped = Math.max(0, Math.min(offsets.length - 1, index));
    track.scrollTo({ left: offsets[clamped], behavior: "smooth" });
  };

  // Progress rule and active index follow the scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      const ratio = max > 0 ? track.scrollLeft / max : 0;
      if (progressRef.current) {
        const floor = 1 / total;
        progressRef.current.style.transform = `scaleX(${floor + ratio * (1 - floor)})`;
      }
      const offsets = cardOffsets();
      let nearest = 0;
      offsets.forEach((offset, i) => {
        if (Math.abs(offset - track.scrollLeft) < Math.abs(offsets[nearest] - track.scrollLeft)) {
          nearest = i;
        }
      });
      setActiveIndex(nearest);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [total]);

  // Mouse grab-and-throw. Touch and pen keep the browser's own momentum scrolling.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let dragging = false;

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!draggedRef.current && Math.abs(dx) > DRAG_THRESHOLD) {
        draggedRef.current = true;
        track.style.scrollSnapType = "none";
        track.classList.add("is-dragging");
      }
      if (!draggedRef.current) return;
      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) velocity = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastTime = now;
      track.scrollLeft = startScroll - dx;
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      track.classList.remove("is-dragging");
      if (!draggedRef.current) return;

      // Project the throw forward, then settle on the nearest card edge
      const projected = track.scrollLeft - velocity * 260;
      const offsets = cardOffsets();
      const target = offsets.reduce((best, offset) =>
        Math.abs(offset - projected) < Math.abs(best - projected) ? offset : best
      );
      track.scrollTo({ left: target, behavior: "smooth" });
      window.setTimeout(() => {
        track.style.scrollSnapType = "";
      }, 650);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      draggedRef.current = false;
      startX = lastX = e.clientX;
      startScroll = track.scrollLeft;
      lastTime = performance.now();
      velocity = 0;
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    };

    // A drag that ends over a link must not follow it
    const onClickCapture = (e: MouseEvent) => {
      if (draggedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        draggedRef.current = false;
      }
    };

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("click", onClickCapture, true);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  return (
    <div className="residence-rail relative py-12 md:py-20">
      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Residences in the collection"
        tabIndex={0}
        onKeyDown={onKeyDown}
        data-cursor="Drag"
        className="residence-rail-track flex gap-5 md:gap-8 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-px-6 sm:scroll-px-8 md:scroll-px-12 lg:scroll-px-16 px-6 sm:px-8 md:px-12 lg:px-16 select-none"
      >
        {collectionResidencesData.map((residence, index) => {
          const isLink = residence.actionType === "link" && residence.actionHref;
          return (
            <article
              key={residence.id}
              aria-label={residence.titleLines.join(" ")}
              aria-roledescription="slide"
              className="residence-card group shrink-0 snap-start w-[84vw] sm:w-[70vw] lg:w-[62vw] max-w-[1080px]"
            >
              <div className="residence-image-wrap relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-[#121517]">
                <Img
                  src={residence.image.src}
                  alt={residence.image.alt}
                  draggable={false}
                  sizes="(min-width: 1024px) 62vw, 84vw"
                  style={{ objectPosition: residence.image.objectPosition ?? "center center" }}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-active:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0d]/85 via-[#0a0c0d]/10 to-transparent pointer-events-none" />

                <span className="absolute top-5 left-5 sm:top-7 sm:left-7 font-mono text-[10px] tracking-[0.24em] text-[#f6f6f4]/85">
                  0{index + 1}
                  <span className="text-[#f6f6f4]/40"> / 0{total}</span>
                </span>

                <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                  <span className="text-[9.5px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6] block mb-2.5">
                    {residence.location}
                  </span>
                  <h3 className="display-md font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[0.98]">
                    {residence.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                </div>
              </div>

              <div className="residence-copy grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pt-6 md:pt-8">
                <p className="lg:col-span-6 max-w-[46ch] text-[13.5px] md:text-[14.5px] font-light leading-[1.7] text-[#c8c2b5]/90">
                  {residence.description}
                </p>

                <div className="lg:col-span-6 flex flex-col gap-5">
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {residence.specs.map((spec) => (
                      <div key={spec.label} className="border-l border-white/[0.1] pl-3 py-0.5">
                        <span className="text-[8.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/50 block">
                          {spec.label}
                        </span>
                        <span className="text-[11px] md:text-[11.5px] tracking-[0.16em] uppercase text-[#f6f6f4] font-medium mt-0.5 block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {isLink ? (
                    <a
                      href={residence.actionHref}
                      draggable={false}
                      data-cursor="View"
                      onClick={(e) => {
                        if (onNavigate && residence.actionHref) {
                          e.preventDefault();
                          onNavigate(residence.actionHref);
                        }
                      }}
                      className="group/link inline-flex items-center gap-2.5 self-start py-2 text-[11px] font-medium tracking-[0.24em] uppercase text-[#dfd7c6] transition-colors duration-300 hover:text-[#f6f6f4]"
                    >
                      <span className="border-b border-[#dfd7c6]/40 pb-1 transition-colors duration-300 group-hover/link:border-[#f6f6f4]">
                        {residence.actionLabel}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </a>
                  ) : (
                    <span className="text-[10px] tracking-[0.26em] uppercase text-[#c8c2b5]/50">
                      {residence.actionLabel}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
        {/* Trailing spacer so the last card can snap to the leading edge */}
        <div aria-hidden="true" className="shrink-0 w-[10vw] lg:w-[30vw]" />
      </div>

      {/* Rail controls */}
      <div className="mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 pt-10 md:pt-14">
        <div className="flex items-center gap-6 md:gap-10">
          <span className="font-mono text-[10px] tracking-[0.24em] text-[#f6f6f4]/85 tabular-nums">
            0{activeIndex + 1}
            <span className="text-[#f6f6f4]/40"> / 0{total}</span>
          </span>

          <span className="block h-px flex-1 bg-white/10">
            <span
              ref={progressRef}
              className="block h-full w-full origin-left bg-[#dfd7c6]/80 transition-transform duration-300 ease-out"
            />
          </span>

          <span className="md:hidden text-[9.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/50">
            Swipe
          </span>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous residence"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#f6f6f4] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#dfd7c6] hover:bg-[#dfd7c6] hover:text-[#0a0c0d] active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft size={16} weight="light" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === total - 1}
              aria-label="Next residence"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#f6f6f4] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#dfd7c6] hover:bg-[#dfd7c6] hover:text-[#0a0c0d] active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowRight size={16} weight="light" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
