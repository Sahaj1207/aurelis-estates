import React from "react";
import { marineHouseContent } from "../../data/marineHouseContent";
import { Img } from "../Img";

export const SuiteSection: React.FC = () => {
  const { suite } = marineHouseContent;

  return (
    <section
      data-monograph-section
      aria-label="Primary Suite"
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Animated Top Section Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-full h-[1px] bg-white/[0.08] origin-left mb-16 md:mb-24"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Asymmetric Offset Architectural Plate */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div
              data-reveal="image-container"
              className="relative overflow-hidden bg-[#121517] aspect-[4/3] sm:aspect-[16/11] border border-white/[0.08] group"
            >
              <Img
                data-reveal="image"
                data-parallax="image"
                src={suite.image}
                alt={suite.imageAlt}
                className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
              />
              <div
                data-reveal="caption"
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80"
              >
                {suite.elevationNote}
              </div>
            </div>
          </div>

          {/* Quieter Editorial Column with Generous Negative Space */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:pl-6">
            <span
              data-reveal="eyebrow"
              className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-5"
            >
              {suite.eyebrow}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.08] mb-8">
              {suite.headlineLines.map((line, idx) => (
                <span key={idx} data-reveal="heading-line" className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p
              data-reveal="copy"
              className="max-w-[34ch] text-[14px] md:text-[15px] font-light text-[#c8c2b5]/85 leading-[1.8] tracking-[0.01em]"
            >
              {suite.paragraph}
            </p>

            <div
              data-reveal="divider"
              className="w-full h-[1px] bg-white/[0.08] my-8 origin-left"
            />

            <div>
              <span
                data-reveal="sub"
                className="text-[9px] tracking-[0.26em] uppercase text-[#c8c2b5]/50 block mb-1"
              >
                ACOUSTIC REALM
              </span>
              <span
                data-reveal="sub"
                className="text-[12px] tracking-[0.16em] uppercase text-[#f6f6f4] font-medium block"
              >
                ISOLATED SEAWARD SANCTUM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

