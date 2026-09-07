import React from "react";
import { marineHouseContent } from "../../data/marineHouseContent";

export const StatementSection: React.FC = () => {
  const { statement } = marineHouseContent;

  return (
    <section
      data-monograph-section
      aria-label="Architectural Statement"
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-32 md:py-48"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Animated Architectural Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-16 h-[1px] bg-white/[0.15] mx-auto mb-12 origin-center"
        />

        <span
          data-reveal="eyebrow"
          className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-8"
        >
          {statement.eyebrow}
        </span>

        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.1] mb-10">
          {statement.statementLines.map((line, idx) => (
            <span key={idx} data-reveal="heading-line" className="block">
              {line}
            </span>
          ))}
        </p>

        {/* Animated Lower Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-24 h-[1px] bg-white/[0.12] mx-auto my-8 origin-center"
        />

        <div
          data-reveal="sub"
          className="inline-flex items-center gap-4 text-[10px] md:text-[10.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/50 px-6"
        >
          <span>{statement.subtext}</span>
        </div>
      </div>
    </section>
  );
};

