import React from "react";
import { marineHouseContent } from "../../data/marineHouseContent";
import { Img } from "../Img";

export const MaterialitySection: React.FC = () => {
  const { materiality } = marineHouseContent;

  return (
    <section
      data-monograph-section
      aria-label="Architectural Materiality"
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Animated Top Section Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-full h-[1px] bg-white/[0.08] origin-left mb-16 md:mb-20"
        />

        {/* Section Header: Headline & Architectural Rationale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end pb-4">
          <div className="lg:col-span-6">
            <span
              data-reveal="eyebrow"
              className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-4"
            >
              {materiality.eyebrow}
            </span>
            <h2
              data-reveal="heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.04]"
            >
              {materiality.headlineLines.map((line, idx) => (
                <span key={idx} className="inline-block mr-4 last:mr-0">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div className="lg:col-span-6 lg:justify-self-end max-w-md">
            <p
              data-reveal="copy"
              className="text-[14px] md:text-[14.5px] font-light text-[#c8c2b5]/90 leading-[1.75] tracking-[0.01em]"
            >
              {materiality.paragraph}
            </p>
          </div>
        </div>

        {/* Animated Mid-section Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-full h-[1px] bg-white/[0.08] my-10 md:my-14 origin-left"
        />

        {/* Documentation Presentation: Image + Material Specification Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 md:pt-16 items-start">
          {/* Large Material Plate */}
          <div className="lg:col-span-7">
            <div
              data-reveal="image-container"
              className="relative overflow-hidden bg-[#121517] aspect-[16/10] border border-white/[0.08] group"
            >
              <Img
                data-reveal="image"
                data-parallax="image"
                src={materiality.image}
                alt={materiality.imageAlt}
                className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
              />
              <div
                data-reveal="caption"
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80"
              >
                TACTILE JUNCTION / TRAVERTINE & WATER
              </div>
            </div>
          </div>

          {/* Architectural Material Index (Printed Architectural Spec Sheet Style) */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
            {materiality.materials.map((item) => (
              <div key={item.number} data-reveal="spec" className="py-6 sm:py-7">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[13px] sm:text-[14px] font-medium tracking-[0.2em] text-[#f6f6f4] uppercase">
                    {item.name}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#dfd7c6]/70">
                    {item.number}
                  </span>
                </div>
                <p className="text-[12.5px] font-light text-[#c8c2b5]/75 leading-relaxed tracking-[0.01em]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

