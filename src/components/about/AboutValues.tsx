import React from "react";
import type { AboutContentData } from "../../data/aboutContent";

interface AboutValuesProps {
  data: AboutContentData["values"];
}

export const AboutValues: React.FC<AboutValuesProps> = ({ data }) => {
  return (
    <section
      data-about-section
      aria-label={data.eyebrow}
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-24 md:py-36 border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span
            data-reveal="eyebrow"
            className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-4"
          >
            {data.eyebrow}
          </span>
          <h2
            data-reveal="heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.06] max-w-4xl"
          >
            {data.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* Quiet Declarative Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 lg:gap-x-24 border-t border-white/[0.08] pt-16">
          {data.statements.map((statement, idx) => (
            <div
              key={statement}
              data-reveal="value-statement"
              className="flex items-start gap-6 border-b border-white/[0.06] pb-10"
            >
              <span className="text-[11px] font-mono tracking-[0.24em] text-[#dfd7c6]/70 shrink-0 mt-1">
                0{idx + 1}
              </span>
              <p className="text-xl sm:text-2xl md:text-[1.75rem] font-light font-serif text-[#c8c2b5] leading-[1.35] tracking-[0.01em]">
                {statement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
