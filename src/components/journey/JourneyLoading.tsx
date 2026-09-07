import React from "react";

export const JourneyLoading: React.FC = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0a0c0d] p-6 text-center"
    >
      <div className="flex flex-col items-center max-w-sm">
        <span className="text-[12px] font-semibold tracking-[0.28em] text-[#f6f6f4] uppercase font-sans mb-2">
          AURELIS ESTATES
        </span>

        <span className="text-[9.5px] tracking-[0.26em] text-[#dfd7c6] uppercase font-sans mb-8">
          The Marine House / Initializing Spatial Engine
        </span>

        {/* Minimal architectural loading line */}
        <div className="h-[1px] w-48 overflow-hidden bg-white/10 relative">
          <div className="absolute inset-0 w-1/3 bg-[#dfd7c6] animate-[shimmer_1.6s_infinite_linear]" />
        </div>

        <span className="text-[8.5px] tracking-[0.22em] text-[#c8c2b5]/40 uppercase font-sans mt-4">
          Allocating WebGL Depth Buffers
        </span>
      </div>
    </div>
  );
};
