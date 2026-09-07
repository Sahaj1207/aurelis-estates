import React from "react";
import type { AboutContentData } from "../../data/aboutContent";

interface AboutMethodProps {
  data: AboutContentData["method"];
}

export const AboutMethod: React.FC<AboutMethodProps> = ({ data }) => {
  return (
    <section
      data-about-section
      aria-label={data.eyebrow}
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32 border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 md:pb-20 border-b border-white/[0.08]">
          <div>
            <span
              data-reveal="eyebrow"
              className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-4"
            >
              {data.eyebrow}
            </span>
            <h2
              data-reveal="heading"
              className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.08]"
            >
              {data.headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <span
            data-reveal="meta"
            className="text-[9.5px] font-mono tracking-[0.24em] text-[#c8c2b5]/50 uppercase"
          >
            FOUR INQUIRIES OF ARCHITECTURE
          </span>
        </div>

        {/* The 4 Principles as an Unfolding Vertical Sequence (Not a Card Grid) */}
        <div className="divide-y divide-white/[0.08]">
          {data.principles.map((principle) => (
            <div
              key={principle.number}
              data-reveal="principle-row"
              className="py-12 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline"
            >
              {/* Index & Name */}
              <div className="lg:col-span-4 flex items-baseline justify-between lg:justify-start lg:gap-8">
                <span className="text-[11px] font-mono tracking-[0.24em] text-[#dfd7c6]">
                  {principle.number}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-light font-serif text-[#f6f6f4] tracking-[0.02em]">
                    {principle.name}
                  </h3>
                  <span className="text-[9px] tracking-[0.24em] uppercase text-[#c8c2b5]/40 mt-1 block">
                    {principle.aspect}
                  </span>
                </div>
              </div>

              {/* Principle Core Question */}
              <div className="lg:col-span-8">
                <p className="text-xl sm:text-2xl md:text-[1.85rem] font-light font-serif text-[#c8c2b5] leading-[1.4] tracking-[0.01em]">
                  "{principle.question}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
