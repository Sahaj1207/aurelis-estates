import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  editorialJourneyIntro,
  editorialFrames,
} from "./editorialJourneyData";
import { CinematicFrame } from "./CinematicFrame";
import { JourneyProgress } from "./JourneyProgress";
import { JourneyStack } from "./JourneyStack";

gsap.registerPlugin(ScrollTrigger);

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
// The pinned stage needs a pointer-driven, landscape-sized viewport to read well
const STAGE_QUERY = "(min-width: 1024px) and (min-height: 620px) and (pointer: fine)";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

interface CinematicEditorialJourneyProps {
  // Reports whether the pinned stage currently owns the viewport
  onActiveChange?: (active: boolean) => void;
}

export const CinematicEditorialJourney: React.FC<CinematicEditorialJourneyProps> = ({
  onActiveChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(1);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const stageCapable = useMediaQuery(STAGE_QUERY);
  const pinned = stageCapable && !prefersReducedMotion;

  // GSAP ScrollTrigger Pinned Cinematic Sequence with intentional Arrival -> Hold -> Departure rhythm
  useEffect(() => {
    if (!pinned || !containerRef.current || !viewportRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const frameElements = gsap.utils.toArray<HTMLElement>(".journey-frame-layer");
      const total = frameElements.length;

      // Each frame occupies 4 timeline units: ~1.4 arriving, the rest held still
      const frameUnit = 4;
      const exitHold = 1.2;

      // Initialize frame layer states
      frameElements.forEach((el, i) => {
        if (i === 0) {
          gsap.set(el, { opacity: 1, zIndex: 10, visibility: "visible" });
        } else {
          gsap.set(el, { opacity: 0, zIndex: 10 + i, visibility: "hidden" });
        }
      });

      let lastFrameIndex = 1;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // Roughly 0.85 viewport heights of travel per frame
          end: () => `+=${Math.round(window.innerHeight * (total * 0.85 + 0.25))}`,
          pin: viewportRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onToggle: (self) => onActiveChange?.(self.isActive),
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            // Map progress to frame index without updating React state every frame
            const position = self.progress * (total * frameUnit + exitHold);
            const frameNum = Math.min(total, Math.floor(position / frameUnit) + 1);
            if (frameNum !== lastFrameIndex) {
              lastFrameIndex = frameNum;
              setCurrentFrameIndex(frameNum);
            }
          },
        },
      });

      // Orchestrate frames with clear 3-phase rhythm: ARRIVAL -> HOLD -> DEPARTURE
      frameElements.forEach((frameEl, i) => {
        const startTime = i * frameUnit;
        const img = frameEl.querySelector("img");
        const eyebrow = frameEl.querySelector(".cinematic-eyebrow");
        const headline = frameEl.querySelector(".cinematic-headline");
        const subtitle = frameEl.querySelector(".cinematic-subtitle");
        const desc = frameEl.querySelector(".cinematic-desc");
        const meta = frameEl.querySelector(".cinematic-meta");

        if (i === 0) {
          // Frame 01 is already composed when the stage pins; only the image breathes
          if (img) {
            masterTl.fromTo(
              img,
              { scale: 1.06 },
              { scale: 1.0, ease: "none", duration: frameUnit },
              0
            );
          }
          return;
        }

        const prevFrame = frameElements[i - 1];
        const prevCopy = prevFrame.querySelector(".cinematic-copy-wrapper");

        // 1. DEPARTURE OF PREVIOUS FRAME COPY (Gentle upward drift and fade)
        if (prevCopy) {
          masterTl.to(
            prevCopy,
            { y: -18, opacity: 0, ease: "power2.in", duration: 0.6 },
            startTime - 0.25
          );
        }

        // 2. ARRIVAL TRANSITION OF CURRENT FRAME
        masterTl.set(frameEl, { visibility: "visible" }, startTime);

        if (i === total - 1) {
          // Final Statement: quiet fade out of previous and gentle fade in of statement
          masterTl.to(
            prevFrame,
            { opacity: 0, ease: "power2.inOut", duration: 1.2 },
            startTime
          );
          masterTl.fromTo(
            frameEl,
            { opacity: 0, scale: 0.985 },
            { opacity: 1, scale: 1.0, ease: "power2.out", duration: 1.3 },
            startTime + 0.3
          );
        } else if (i % 2 === 1) {
          // Odd frames wipe in from below over the outgoing frame
          masterTl.fromTo(
            frameEl,
            { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              ease: "power2.inOut",
              duration: 1.3,
            },
            startTime
          );
        } else {
          // Even frames cross-dissolve
          masterTl.to(
            prevFrame,
            { opacity: 0, ease: "power1.inOut", duration: 1.1 },
            startTime
          );
          masterTl.fromTo(
            frameEl,
            { opacity: 0 },
            { opacity: 1, ease: "power1.out", duration: 1.1 },
            startTime + 0.15
          );
        }

        // Hide previous frame completely once transition finishes
        masterTl.set(prevFrame, { visibility: "hidden" }, startTime + 1.5);

        // 3. DIRECTIONAL TEXT ARRIVAL
        const arrivals: [Element | null, number, number][] = [
          [eyebrow, 12, 0.45],
          [headline, 26, 0.55],
          [subtitle, 14, 0.7],
          [desc, 16, 0.8],
          [meta, 10, 0.95],
        ];
        arrivals.forEach(([el, offset, at]) => {
          if (!el) return;
          masterTl.fromTo(
            el,
            { y: offset, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            startTime + at
          );
        });

        // 4. HOLD: the image keeps settling so the frame is almost still, but alive
        if (img && i !== total - 1) {
          masterTl.fromTo(
            img,
            { scale: 1.08 },
            { scale: 1.0, ease: "none", duration: frameUnit },
            startTime
          );
        }
      });

      // 5. SECTION EXIT BUFFER: hold on final statement before releasing pin
      masterTl.to({}, { duration: exitHold }, total * frameUnit);
    }, containerRef);

    return () => {
      ctx.revert();
      onActiveChange?.(false);
    };
    // onActiveChange is a state setter owned by the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinned]);

  return (
    <section
      id="experience"
      aria-label="The Marine House Cinematic Editorial Experience"
      className="relative z-20 bg-[#0a0c0d] border-t border-white/[0.06]"
    >
      {/* 1. Chapter Opening Title Spread */}
      <div className="mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 pt-20 md:pt-32 lg:pt-36 pb-14 md:pb-20">
        <span className="text-[10px] md:text-[11px] font-medium tracking-[0.32em] uppercase text-[#dfd7c6] font-sans block mb-4">
          {editorialJourneyIntro.sectionNumber}
        </span>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="display-lg font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[0.98]">
            <span className="block">{editorialJourneyIntro.headline.line1}</span>
            <span className="block text-[#dfd7c6]">{editorialJourneyIntro.headline.line2}</span>
          </h2>
          <p className="max-w-[36ch] text-[14px] md:text-[15px] font-light leading-[1.7] text-[#c8c2b5]/90 font-sans pb-1">
            {editorialJourneyIntro.supportingCopy}
          </p>
        </div>
      </div>

      {pinned ? (
        /* 2a. Pinned stage: frames exchange in place while the page scrolls beneath */
        <div ref={containerRef} className="relative w-full">
          <div
            ref={viewportRef}
            className="relative h-[100svh] w-full overflow-hidden bg-[#0a0c0d]"
          >
            {/* Top Quiet Index Indicator */}
            <div className="absolute top-0 inset-x-0 z-30 flex items-start justify-between px-16 pt-10 pointer-events-none">
              <div className="flex items-center gap-3">
                <span className="text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6] font-sans">
                  THE EXPERIENCE
                </span>
                <span className="text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/45 font-sans">
                  Monograph Sequence
                </span>
              </div>

              <JourneyProgress
                currentFrame={currentFrameIndex}
                totalFrames={editorialFrames.length}
              />
            </div>

            {/* Stacked Cinematic Frames Track */}
            <div data-gallery className="relative h-full w-full">
              {editorialFrames.map((frame, index) => (
                <div
                  key={frame.id}
                  aria-hidden={currentFrameIndex !== index + 1}
                  className="journey-frame-layer absolute inset-0 h-full w-full bg-[#0a0c0d] will-change-[opacity,clip-path]"
                >
                  <CinematicFrame frame={frame} />
                </div>
              ))}
            </div>

            {/* Bottom Architectural Footnote & Scrubbed Progress Rule */}
            <div className="absolute bottom-0 inset-x-0 z-30 px-16 pb-9 pointer-events-none">
              <div className="flex items-end justify-between pb-4">
                <span className="text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/45 font-sans">
                  Scroll to move through the house
                </span>
                <span className="text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/40 font-sans">
                  The Marine House / Private Edition
                </span>
              </div>
              <span className="block h-px w-full bg-white/10">
                <span
                  ref={progressRef}
                  className="block h-full w-full origin-left scale-x-0 bg-[#dfd7c6]/80"
                />
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* 2b. Touch, compact and reduced-motion presentation */
        <JourneyStack animate={!prefersReducedMotion} />
      )}
    </section>
  );
};
