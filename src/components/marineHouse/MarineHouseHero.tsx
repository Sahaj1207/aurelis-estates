import React from "react";
import { marineHouseContent } from "../../data/marineHouseContent";

export const MarineHouseHero: React.FC = () => {
  const { hero, meta } = marineHouseContent;

  return (
    <section
      aria-label="Monograph Opening"
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 pt-6 sm:pt-8 md:pt-20 pb-20 md:pb-32"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Top Editorial Monograph Metadata Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div>
            <div
              data-hero-reveal="eyebrow"
              className="flex items-center gap-3 text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 mb-4"
            >
              <span>{hero.eyebrowTypology}</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span>{hero.eyebrowLocation}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light font-serif text-[#f6f6f4] tracking-[-0.02em] leading-[0.95]">
              <span className="block overflow-hidden">
                <span data-hero-reveal="title-line" className="block transform-gpu">
                  {hero.titleLine1}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  data-hero-reveal="title-line"
                  className="block italic font-normal text-[#dfd7c6] transform-gpu"
                >
                  {hero.titleLine2}
                </span>
              </span>
            </h1>
          </div>

          <div
            data-hero-reveal="meta"
            className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:gap-4 lg:text-right text-[11px] tracking-[0.24em] uppercase text-[#c8c2b5]/70 pb-2"
          >
            <div>
              <span className="block text-[9px] tracking-[0.28em] text-[#c8c2b5]/40 mb-1">
                ENCLOSED FOOTPRINT
              </span>
              <span className="font-medium text-[#f6f6f4]">{hero.area}</span>
            </div>
            <div>
              <span className="block text-[9px] tracking-[0.28em] text-[#c8c2b5]/40 mb-1">
                ACQUISITION STATUS
              </span>
              <span className="font-medium text-[#dfd7c6]">{hero.status}</span>
            </div>
            <div>
              <span className="block text-[9px] tracking-[0.28em] text-[#c8c2b5]/40 mb-1">
                COORDINATES
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-[#c8c2b5]/60">
                {meta.coordinates}
              </span>
            </div>
          </div>
        </div>

        {/* Architectural Hairline Divider */}
        <div
          data-hero-reveal="divider"
          className="w-full h-[1px] bg-white/[0.08] mt-8 md:mt-12 mb-10 md:mb-16 origin-left"
        />

        {/* Dominant Architectural Monograph Plate */}
        <div>
          <div
            data-hero-reveal="image-container"
            className="relative overflow-hidden bg-[#121517] aspect-[16/10] sm:aspect-[21/11] lg:aspect-[24/11] w-full border border-white/[0.08]"
          >
            <img
              data-hero-reveal="image"
              src={hero.image}
              alt={hero.imageAlt}
              className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-[1.025]"
              loading="eager"
            />
            {/* Subtle architectural plate stamp */}
            <div
              data-hero-reveal="caption"
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#0a0c0d]/80 backdrop-blur-md px-3.5 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80 pointer-events-none"
            >
              PLATE 01 / SEAWARD ELEVATION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


