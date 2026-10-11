import React from "react";
import type { AboutContentData } from "../../data/aboutContent";
import { Img } from "../Img";

interface AboutCurationProps {
  data: AboutContentData["curation"];
}

export const AboutCuration: React.FC<AboutCurationProps> = ({ data }) => {
  return (
    <section
      data-about-section
      aria-label={data.eyebrow}
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32 border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-12 md:pb-16 items-end">
          <div className="lg:col-span-7">
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
          <div className="lg:col-span-5">
            <p
              data-reveal="copy"
              className="text-[14px] md:text-[15px] font-light text-[#c8c2b5]/85 leading-[1.75] tracking-[0.01em]"
            >
              {data.paragraph}
            </p>
          </div>
        </div>

        {/* Editorial Architectural Image Plate */}
        <div className="mt-8 md:mt-12">
          <div
            data-reveal="image-frame"
            className="relative overflow-hidden bg-[#121517] aspect-[16/10] sm:aspect-[21/9] border border-white/[0.08]"
          >
            <Img
              data-reveal="image"
              src={data.image}
              alt={data.imageAlt}
              className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
              decoding="async"
            />

            {/* Architectural Plate Caption Stamp */}
            <div
              data-reveal="caption"
              className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9px] sm:text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80"
            >
              {data.caption}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
