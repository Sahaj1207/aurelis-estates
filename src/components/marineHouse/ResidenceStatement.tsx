import React from "react";
import { marineHouseContent } from "../../data/marineHouseContent";

export const ResidenceStatement: React.FC = () => {
  const { residence } = marineHouseContent;

  return (
    <section
      data-monograph-section
      aria-label="The Residence Concept"
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Animated Architectural Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-full h-[1px] bg-white/[0.08] origin-left mb-16 md:mb-24"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Editorial Narrative Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-16">
            <span
              data-reveal="eyebrow"
              className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-5"
            >
              {residence.eyebrow}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.08] mb-8">
              {residence.headlineLines.map((line, idx) => (
                <span key={idx} data-reveal="heading-line" className="block">
                  {line}
                </span>
              ))}
            </h2>

            <div data-reveal="copy" className="border-l border-[#dfd7c6]/30 pl-6 my-8">
              <p className="max-w-[34ch] text-[14px] md:text-[15px] font-light text-[#c8c2b5]/90 leading-[1.8] tracking-[0.01em]">
                {residence.paragraph}
              </p>
            </div>

            <div
              data-reveal="sub"
              className="pt-4 text-[10px] tracking-[0.24em] uppercase text-[#c8c2b5]/50 flex items-center gap-4"
            >
              <span>VOLUMETRIC CONTINUITY</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>COASTAL AXIS</span>
            </div>
          </div>

          {/* Right Asymmetric Architectural Framing */}
          <div className="lg:col-span-7">
            <div
              data-reveal="image-container"
              className="relative overflow-hidden bg-[#121517] aspect-[4/3] sm:aspect-[16/11] border border-white/[0.08] group"
            >
              <img
                data-reveal="image"
                data-parallax="image"
                src={residence.image}
                alt={residence.imageAlt}
                className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                loading="lazy"
              />
              <div
                data-reveal="caption"
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80"
              >
                {residence.caption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

