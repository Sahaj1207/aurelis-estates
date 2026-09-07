import React from "react";
import type { CameraWaypoint } from "./journeyData";

interface JourneyOverlayProps {
  activeWaypoint: CameraWaypoint;
}

export const JourneyOverlay: React.FC<JourneyOverlayProps> = ({
  activeWaypoint,
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-18">
      {/* Top Header Strip */}
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
        <div className="flex items-center gap-4">
          <span className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6] font-sans">
            03 / CINEMATIC PROPERTY JOURNEY
          </span>
          <span className="hidden sm:inline-block text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/50 font-sans">
            The Marine House / Interactive Spatial Flight
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#dfd7c6] animate-pulse" />
          <span className="text-[9.5px] tracking-[0.24em] uppercase text-[#f6f6f4] font-sans">
            Live Spatial Engine
          </span>
        </div>
      </div>

      {/* Primary Asymmetric Typographic Narrative */}
      <div className="max-w-xl my-auto py-8">
        <div className="mb-3">
          <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-[#dfd7c6] font-sans font-medium">
            {activeWaypoint.marker}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.02] mb-3 transition-opacity duration-300">
          {activeWaypoint.title}
        </h2>

        <p className="text-[11px] md:text-[12px] tracking-[0.24em] uppercase text-[#c8c2b5]/70 font-sans font-medium mb-5">
          {activeWaypoint.subtitle}
        </p>

        <p className="text-[13.5px] md:text-[14.5px] font-light leading-[1.7] text-[#c8c2b5]/90 font-sans max-w-[38ch] mb-6">
          {activeWaypoint.description}
        </p>

        <div className="inline-flex items-center gap-3 border-l border-white/[0.12] pl-3.5 py-0.5">
          <span className="text-[9.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/60 font-sans">
            Spatial Sector
          </span>
          <span className="text-[10.5px] tracking-[0.2em] uppercase text-[#f6f6f4] font-medium font-sans">
            {activeWaypoint.meta}
          </span>
        </div>
      </div>

      {/* Bottom Editorial Guidance */}
      <div className="flex items-end justify-between border-t border-white/[0.07] pt-4">
        <div className="text-[9.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/50 font-sans">
          Scroll downward to traverse architecture
        </div>
        <div className="hidden sm:block text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/40 font-sans">
          Interpolated Perspective Matrix / 60 FPS
        </div>
      </div>
    </div>
  );
};
