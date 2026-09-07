import React from "react";
import { journeyWaypoints } from "./journeyData";

interface WebGLFallbackProps {
  reason?: "unsupported" | "reduced-motion";
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  reason = "unsupported",
}) => {
  return (
    <section
      aria-label="The Marine House Spatial Monograph"
      className="relative z-20 bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-28 md:py-36 border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-[1720px]">
        <div className="flex items-baseline justify-between border-b border-white/[0.07] pb-5 mb-12">
          <span className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6] font-sans">
            03 / ARCHITECTURAL SPATIAL PORTFOLIO
          </span>
          <span className="text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/40 font-sans hidden sm:inline-block">
            {reason === "reduced-motion"
              ? "Static Accessibility Monograph"
              : "High-Resolution Architectural Static Monograph"}
          </span>
        </div>

        {/* Featured Elevation Photograph */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#121517] border border-white/[0.08] mb-16">
          <img
            src="/images/marine-house-hero.jpg"
            alt="The Marine House architectural coastal elevation in Mumbai"
            className="h-full w-full object-cover object-[center_45%]"
          />
          <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3">
            <span className="h-[1px] w-6 bg-[#dfd7c6]" />
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#f6f6f4] font-sans">
              The Marine House / Spatial Overview
            </span>
          </div>
        </div>

        {/* The 6 Spatial Chapters arranged as an editorial matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {journeyWaypoints.map((wp) => (
            <div
              key={wp.marker}
              className="border-l border-white/[0.08] pl-5 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] tracking-[0.26em] uppercase text-[#dfd7c6] font-sans block mb-2">
                  {wp.marker}
                </span>
                <h3 className="text-xl sm:text-2xl font-light font-serif text-[#f6f6f4] tracking-[-0.01em] mb-1">
                  {wp.title}
                </h3>
                <span className="text-[10.5px] tracking-[0.2em] uppercase text-[#c8c2b5]/60 font-sans block mb-3">
                  {wp.subtitle}
                </span>
                <p className="text-[13px] font-light leading-[1.65] text-[#c8c2b5]/85 font-sans">
                  {wp.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <span className="text-[9.5px] tracking-[0.2em] uppercase text-[#c8c2b5]/45 font-sans block">
                  Sector: {wp.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
