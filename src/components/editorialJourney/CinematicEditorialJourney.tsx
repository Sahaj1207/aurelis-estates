import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  editorialJourneyIntro,
  editorialFrames,
} from "./editorialJourneyData";
import { CinematicFrame } from "./CinematicFrame";
import { JourneyProgress } from "./JourneyProgress";

gsap.registerPlugin(ScrollTrigger);

export const CinematicEditorialJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const framesTrackRef = useRef<HTMLDivElement>(null);

  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  // Detect prefers-reduced-motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // GSAP ScrollTrigger Pinned Cinematic Sequence with intentional Arrival -> Hold -> Departure rhythm
  useEffect(() => {
    if (
      prefersReducedMotion ||
      !containerRef.current ||
      !viewportRef.current ||
      !framesTrackRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Subtle Header Dimming while traversing monograph so navigation remains secondary
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 25%",
        end: "bottom 75%",
        onEnter: () =>
          gsap.to("#main-header", {
            opacity: 0.35,
            duration: 0.7,
            ease: "power2.out",
          }),
        onLeave: () =>
          gsap.to("#main-header", {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          }),
        onEnterBack: () =>
          gsap.to("#main-header", {
            opacity: 0.35,
            duration: 0.7,
            ease: "power2.out",
          }),
        onLeaveBack: () =>
          gsap.to("#main-header", {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          }),
      });

      const frameElements = gsap.utils.toArray<HTMLElement>(".journey-frame-layer");
      const total = frameElements.length;

      // Frame unit durations on the master timeline
      // Each frame receives 7.5 timeline units:
      // ~1.2s entry/reveal (16%)
      // ~4.5s intentional HOLD and visual stillness (60%)
      // ~1.8s gradual departure transition (24%)
      const frameUnit = 7.5;
      const totalTimelineDuration = total * frameUnit + 3.5;

      // Initialize frame layer states
      frameElements.forEach((el, i) => {
        if (i === 0) {
          gsap.set(el, { opacity: 1, zIndex: 10, visibility: "visible" });
        } else {
          gsap.set(el, { opacity: 0, zIndex: 10 + i, visibility: "hidden" });
        }
      });

      let lastFrameIndex = 1;

      // Master timeline with ScrollTrigger: 1100vh total physical scroll distance
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 11.0)}`,
          pin: viewportRef.current,
          pinSpacing: true,
          scrub: 0.6,
          onUpdate: (self) => {
            // Map progress to frame index without updating React state every frame
            const normalized = Math.min(0.999, Math.max(0, self.progress));
            const frameNum = Math.min(
              total,
              Math.floor(normalized * total) + 1
            );
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
          // Frame 01: Initial Arrival and Extended Hold
          if (img) {
            masterTl.fromTo(
              img,
              { scale: 1.025 },
              { scale: 1.008, ease: "none", duration: frameUnit },
              0
            );
          }
          if (eyebrow) {
            masterTl.fromTo(
              eyebrow,
              { y: 10, opacity: 0.4 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
              0.1
            );
          }
          if (headline) {
            masterTl.fromTo(
              headline,
              { y: 18, opacity: 0.4 },
              { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
              0.25
            );
          }
          if (desc) {
            masterTl.fromTo(
              desc,
              { y: 12, opacity: 0.3 },
              { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
              0.45
            );
          }
          if (meta) {
            masterTl.fromTo(
              meta,
              { y: 8, opacity: 0.3 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
              0.6
            );
          }
          return;
        }

        const prevFrame = frameElements[i - 1];
        const prevCopy = prevFrame.querySelector(".cinematic-copy-wrapper");

        // 1. DEPARTURE OF PREVIOUS FRAME COPY (Gentle 14px upward drift and fade)
        if (prevCopy) {
          masterTl.to(
            prevCopy,
            { y: -14, opacity: 0, ease: "power2.in", duration: 0.7 },
            startTime
          );
        }

        // 2. ARRIVAL TRANSITION OF CURRENT FRAME
        masterTl.set(frameEl, { visibility: "visible" }, startTime);

        if (i === 1) {
          // Frame 02: Sophisticated vertical clipPath reveal
          masterTl.fromTo(
            frameEl,
            { clipPath: "inset(0 0 100% 0)", opacity: 1 },
            {
              clipPath: "inset(0 0 0% 0)",
              opacity: 1,
              ease: "power2.inOut",
              duration: 1.2,
            },
            startTime
          );
        } else if (i === total - 1) {
          // Frame 07 (Final Statement): Quiet fade out of previous and gentle fade in of statement
          masterTl.to(
            prevFrame,
            { opacity: 0, ease: "power2.inOut", duration: 1.2 },
            startTime
          );
          masterTl.fromTo(
            frameEl,
            { opacity: 0, scale: 0.99 },
            { opacity: 1, scale: 1.0, ease: "power2.out", duration: 1.4 },
            startTime + 0.4
          );
        } else {
          // Frames 03 to 06: Cinematic soft cross-dissolve
          masterTl.to(
            prevFrame,
            { opacity: 0, ease: "power1.inOut", duration: 1.0 },
            startTime
          );
          masterTl.fromTo(
            frameEl,
            { opacity: 0 },
            { opacity: 1, ease: "power1.out", duration: 1.0 },
            startTime + 0.2
          );
        }

        // Hide previous frame completely once transition finishes
        masterTl.set(prevFrame, { visibility: "hidden" }, startTime + 1.4);

        // 3. DIRECTIONAL TEXT ARRIVAL (Subtle 8 to 18px translation and opacity reveal)
        if (eyebrow) {
          masterTl.fromTo(
            eyebrow,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
            startTime + 0.3
          );
        }
        if (headline) {
          masterTl.fromTo(
            headline,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
            startTime + 0.45
          );
        }
        if (subtitle) {
          masterTl.fromTo(
            subtitle,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            startTime + 0.6
          );
        }
        if (desc) {
          masterTl.fromTo(
            desc,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            startTime + 0.75
          );
        }
        if (meta) {
          masterTl.fromTo(
            meta,
            { y: 8, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
            startTime + 0.9
          );
        }

        // 4. INTENTIONAL HOLD AND SUBTLE IMAGE DRIFT (Visual stillness: almost still, but alive)
        if (img && i !== total - 1) {
          masterTl.fromTo(
            img,
            { scale: 1.025 },
            { scale: 1.008, ease: "none", duration: frameUnit - 1.2 },
            startTime + 1.2
          );
        }
      });

      // 5. SECTION EXIT BUFFER: Generous hold on final statement before releasing pin
      masterTl.to({}, { duration: 3.5 }, totalTimelineDuration - 3.5);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Accessible Fallback for Reduced Motion Preference
  if (prefersReducedMotion) {
    return (
      <section
        id="experience"
        aria-label="The Marine House Editorial Experience"
        className="relative z-20 bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-28 border-t border-white/[0.06]"
      >
        <div className="mx-auto max-w-[1720px]">
          {/* Section Chapter Title */}
          <div className="border-b border-white/[0.07] pb-10 mb-16">
            <span className="text-[10px] md:text-[11px] font-medium tracking-[0.32em] uppercase text-[#dfd7c6] font-sans block mb-3.5">
              {editorialJourneyIntro.sectionNumber}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.02] mb-4">
              <span className="block">{editorialJourneyIntro.headline.line1}</span>
              <span className="block text-[#dfd7c6]">{editorialJourneyIntro.headline.line2}</span>
            </h2>
            <p className="text-[14px] font-light leading-relaxed text-[#c8c2b5]/90 max-w-xl font-sans">
              {editorialJourneyIntro.supportingCopy}
            </p>
          </div>

          {/* Linear Vertical Editorial Sequence */}
          <div className="flex flex-col gap-28">
            {editorialFrames.map((frame) => (
              <div key={frame.id} className="min-h-[75vh]">
                <CinematicFrame frame={frame} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      aria-label="The Marine House Cinematic Editorial Experience"
      className="relative z-20 bg-[#0a0c0d] border-t border-white/[0.06]"
    >
      {/* 1. Chapter Opening Title Spread (Vertical breathing room before pinned sequence) */}
      <div className="mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-36 lg:pt-44 pb-16 md:pb-24 border-b border-white/[0.07]">
        <span className="text-[10px] md:text-[11px] font-medium tracking-[0.32em] uppercase text-[#dfd7c6] font-sans block mb-4">
          {editorialJourneyIntro.sectionNumber}
        </span>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[0.98]">
            <span className="block">{editorialJourneyIntro.headline.line1}</span>
            <span className="block text-[#dfd7c6]">{editorialJourneyIntro.headline.line2}</span>
          </h2>
          <p className="max-w-[36ch] text-[13.5px] md:text-[14.5px] font-light leading-[1.7] text-[#c8c2b5]/90 font-sans pb-1">
            {editorialJourneyIntro.supportingCopy}
          </p>
        </div>
      </div>

      {/* 2. Pinned Viewport Container (1100vh slow controlled journey) */}
      <div ref={containerRef} className="relative w-full">
        <div
          ref={viewportRef}
          className="relative h-[100dvh] w-full overflow-hidden bg-[#0a0c0d]"
        >
          {/* Top Quiet Index Indicator */}
          <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-6 sm:p-8 md:p-12 lg:p-14 pointer-events-none">
            <div className="flex items-center gap-3">
              <span className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6] font-sans">
                THE EXPERIENCE
              </span>
              <span className="hidden sm:inline-block text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/40 font-sans">
                Monograph Sequence
              </span>
            </div>

            <div className="pointer-events-auto">
              <JourneyProgress
                currentFrame={currentFrameIndex}
                totalFrames={editorialFrames.length}
              />
            </div>
          </div>

          {/* Stacked Cinematic Frames Track */}
          <div ref={framesTrackRef} className="relative h-full w-full">
            {editorialFrames.map((frame, index) => (
              <div
                key={frame.id}
                className="journey-frame-layer absolute inset-0 h-full w-full"
              >
                <CinematicFrame
                  frame={frame}
                  isActive={currentFrameIndex === index + 1}
                />
              </div>
            ))}
          </div>

          {/* Bottom Architectural Footnote */}
          <div className="absolute bottom-0 inset-x-0 z-30 flex items-end justify-between p-6 sm:p-8 md:p-12 lg:p-14 pointer-events-none">
            <div className="text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/40 font-sans">
              Scroll downward to traverse architecture
            </div>
            <div className="hidden sm:block text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/35 font-sans">
              The Marine House / Private Edition
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
