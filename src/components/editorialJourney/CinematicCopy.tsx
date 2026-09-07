import React from "react";
import type { EditorialFrameData } from "./editorialJourneyData";

interface CinematicCopyProps {
  frame: EditorialFrameData;
  className?: string;
}

export const CinematicCopy: React.FC<CinematicCopyProps> = ({
  frame,
  className = "",
}) => {
  // Special rendering for Frame 07: Minimal Final Statement with generous empty space
  if (frame.layout === "final-statement") {
    return (
      <div className={`cinematic-copy-wrapper flex flex-col items-center text-center ${className}`}>
        <div className="cinematic-eyebrow mb-6">
          <span className="text-[10px] md:text-[11px] font-medium tracking-[0.32em] uppercase text-[#dfd7c6] font-sans">
            {frame.eyebrow}
          </span>
        </div>

        <h3 className="cinematic-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[0.98]">
          {frame.displayLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
      </div>
    );
  }

  return (
    <div className={`cinematic-copy-wrapper flex flex-col ${className}`}>
      {/* Frame Eyebrow */}
      <div className="cinematic-eyebrow mb-3.5">
        <span className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6] font-sans">
          {frame.eyebrow}
        </span>
      </div>

      {/* Main Display Headline with deliberate intentional line breaks */}
      <h3 className="cinematic-headline text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.5rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[0.98] mb-3">
        {frame.displayLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>

      {/* Subtitle */}
      {frame.subtitle && (
        <p className="cinematic-subtitle text-[10px] md:text-[10.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/70 font-sans font-medium mb-5">
          {frame.subtitle}
        </p>
      )}

      {/* Supporting Copy (Narrow, 2-4 lines) */}
      {frame.description && (
        <p className="cinematic-desc text-[13.5px] md:text-[14px] font-light leading-[1.7] text-[#c8c2b5]/90 font-sans max-w-[36ch] mb-7">
          {frame.description}
        </p>
      )}

      {/* Quiet Metadata Indicators */}
      {frame.metadata.length > 0 && (
        <div className="cinematic-meta flex flex-wrap items-start gap-6 border-t border-white/[0.08] pt-4">
          {frame.metadata.map((item) => (
            <div
              key={item.label}
              className="border-l border-white/[0.1] pl-3 py-0.5"
            >
              <span className="text-[8.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/50 font-sans block">
                {item.label}
              </span>
              <span className="text-[11px] md:text-[11.5px] tracking-[0.18em] uppercase text-[#f6f6f4] font-medium font-sans mt-0.5 block">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
