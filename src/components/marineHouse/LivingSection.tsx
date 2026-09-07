import React from "react";
import { marineHouseContent } from "../../data/marineHouseContent";

export const LivingSection: React.FC = () => {
  const { living } = marineHouseContent;

  return (
    <section
      data-monograph-section
      aria-label="Living Volume"
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Animated Top Section Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-full h-[1px] bg-white/[0.08] origin-left mb-16 md:mb-20"
        />

        {/* Editorial Top Frame: Staggered Asymmetric Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12 md:mb-16">
          <div className="lg:col-span-5 lg:col-start-2">
            <span
              data-reveal="eyebrow"
              className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-4"
            >
              {living.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.08]">
              {living.headlineLines.map((line, idx) => (
                <span key={idx} data-reveal="heading-line" className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-8">
            <p
              data-reveal="copy"
              className="max-w-[36ch] text-[14px] md:text-[15px] font-light text-[#c8c2b5]/90 leading-[1.8] tracking-[0.01em] mb-8"
            >
              {living.paragraph}
            </p>

            {/* Hairline Divider for Specs */}
            <div
              data-reveal="divider"
              className="w-full h-[1px] bg-white/[0.08] my-6 origin-left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {living.specs.map((spec) => (
                <div key={spec.label} data-reveal="spec">
                  <span className="block text-[8.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/50 mb-1">
                    {spec.label}
                  </span>
                  <span className="text-[11px] tracking-[0.16em] uppercase text-[#f6f6f4] font-medium block">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Large Interior Plate */}
        <div
          data-reveal="image-container"
          className="relative overflow-hidden bg-[#121517] aspect-[16/9] sm:aspect-[21/10] border border-white/[0.08] group"
        >
          <img
            data-reveal="image"
            data-parallax="image"
            src={living.image}
            alt={living.imageAlt}
            className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
            loading="lazy"
          />
          <div
            data-reveal="caption"
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80"
          >
            INTERNAL VOLUME / 6.2M APERTURE
          </div>
        </div>
      </div>
    </section>
  );
};

