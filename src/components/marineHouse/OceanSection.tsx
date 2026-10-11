import React from "react";
import { marineHouseContent } from "../../data/marineHouseContent";
import { Img } from "../Img";

export const OceanSection: React.FC = () => {
  const { ocean } = marineHouseContent;

  return (
    <section
      data-monograph-section
      aria-label="Ocean Terrace"
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Animated Top Section Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-full h-[1px] bg-white/[0.08] origin-left mb-16 md:mb-20"
        />

        {/* Minimal Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4">
          <div>
            <span
              data-reveal="eyebrow"
              className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-4"
            >
              {ocean.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.05]">
              {ocean.headlineLines.map((line, idx) => (
                <span key={idx} data-reveal="heading-line" className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div
            data-reveal="sub"
            className="text-[10px] tracking-[0.24em] uppercase text-[#c8c2b5]/60 pb-1"
          >
            {ocean.coordinateNote}
          </div>
        </div>

        {/* Animated Mid-section Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-full h-[1px] bg-white/[0.08] my-8 md:my-12 origin-left"
        />

        {/* Dominant Panoramic Ocean Terrace Plate */}
        <div data-reveal="image-container" className="mt-10 md:mt-14">
          <div className="relative overflow-hidden bg-[#121517] aspect-[16/9] sm:aspect-[21/9] w-full border border-white/[0.08] group">
            <Img
              data-reveal="image"
              data-parallax="image"
              src={ocean.image}
              alt={ocean.imageAlt}
              className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
            <div
              data-reveal="caption"
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80"
            >
              TERMINAL MARITIME HORIZON
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

