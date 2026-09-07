import React from "react";
import type { AboutContentData } from "../../data/aboutContent";

interface AboutOfficeProps {
  data: AboutContentData["office"];
}

export const AboutOffice: React.FC<AboutOfficeProps> = ({ data }) => {
  return (
    <section
      data-about-section
      aria-label={data.eyebrow}
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32 border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Section Number & Eyebrow */}
        <div className="mb-12 md:mb-16">
          <span
            data-reveal="eyebrow"
            className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block"
          >
            {data.eyebrow}
          </span>
        </div>

        {/* Two-Column Editorial Composition with Thin Vertical Divider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Primary Headline & Secondary Thesis */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <h2
              data-reveal="heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.1] mb-12 lg:mb-16"
            >
              {data.headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <div
              data-reveal="secondary"
              className="border-l-2 border-[#dfd7c6] pl-6 py-2 mt-auto"
            >
              <span className="text-[11px] font-mono tracking-[0.24em] text-[#dfd7c6] block mb-1 uppercase">
                THESIS
              </span>
              <p className="text-xl sm:text-2xl font-light font-serif text-[#f6f6f4] tracking-[0.02em]">
                {data.secondaryStatement}
              </p>
            </div>
          </div>

          {/* Center Vertical Hairline Rule on Desktop */}
          <div className="hidden lg:block lg:col-span-1 self-stretch relative">
            <div
              data-reveal="v-rule"
              className="w-[1px] h-full bg-white/[0.08] mx-auto origin-top"
            />
          </div>

          {/* Right Column: In-depth Editorial Narrative & Advisory Meta */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <p
              data-reveal="copy"
              className="text-base sm:text-lg md:text-[1.1rem] font-light text-[#c8c2b5]/85 leading-[1.75] tracking-[0.01em]"
            >
              {data.paragraph}
            </p>

            <div
              data-reveal="meta"
              className="border-t border-white/[0.08] pt-6 flex items-center justify-between text-[9px] tracking-[0.26em] uppercase text-[#c8c2b5]/50 font-mono"
            >
              <span>{data.annotation}</span>
              <span>INDEX {data.number}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
