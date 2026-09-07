import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SceneCanvas } from "./SceneCanvas";
import { JourneyOverlay } from "./JourneyOverlay";
import { JourneyProgress } from "./JourneyProgress";
import { JourneyLoading } from "./JourneyLoading";
import { WebGLFallback } from "./WebGLFallback";
import { journeyWaypoints, type CameraWaypoint } from "./journeyData";

gsap.registerPlugin(ScrollTrigger);

export const CinematicPropertyJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);

  const [activeWaypoint, setActiveWaypoint] = useState<CameraWaypoint>(
    journeyWaypoints[0]
  );
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [isSceneReady, setIsSceneReady] = useState<boolean>(false);
  const [hasWebGLError, setHasWebGLError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || hasWebGLError || !containerRef.current || !viewportRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Pinned cinematic viewport driven by natural page scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2800",
        pin: viewportRef.current,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          progressRef.current = p;
          setCurrentProgress(p);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, hasWebGLError]);

  // Graceful fallback for reduced motion preference
  if (prefersReducedMotion) {
    return <WebGLFallback reason="reduced-motion" />;
  }

  // Graceful fallback if WebGL initialization encounters hardware limits
  if (hasWebGLError) {
    return <WebGLFallback reason="unsupported" />;
  }

  return (
    <section
      id="journey"
      ref={containerRef}
      aria-label="The Marine House 3D Cinematic Scroll Experience"
      className="relative z-30 bg-[#0a0c0d] border-t border-white/[0.06]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={viewportRef}
        className="relative h-[100dvh] w-full overflow-hidden bg-[#0a0c0d]"
      >
        {/* Three.js Canvas Layer */}
        <SceneCanvas
          progressRef={progressRef}
          onWaypointChange={setActiveWaypoint}
          onWebGLFail={() => setHasWebGLError(true)}
          onSceneReady={() => setIsSceneReady(true)}
        />

        {/* Loading overlay until WebGL shaders and buffers compile */}
        {!isSceneReady && <JourneyLoading />}

        {/* Typographic Storytelling Overlay */}
        <JourneyOverlay activeWaypoint={activeWaypoint} />

        {/* Milestone Progress Rail (Right Column) */}
        <div className="absolute right-8 sm:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <JourneyProgress
            currentProgress={currentProgress}
            activeWaypoint={activeWaypoint}
          />
        </div>
      </div>
    </section>
  );
};
