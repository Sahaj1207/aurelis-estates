import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { marineHouseContent } from "../../data/marineHouseContent";

export const AcquisitionSection: React.FC = () => {
  const { acquisition } = marineHouseContent;

  return (
    <section
      id="inquire"
      data-monograph-section
      aria-label="Private Acquisition"
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Animated Top Section Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-full h-[1px] bg-white/[0.08] origin-left mb-16 md:mb-24"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          {/* Left Headline */}
          <div className="lg:col-span-7">
            <span
              data-reveal="eyebrow"
              className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-5"
            >
              {acquisition.eyebrow}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.05]">
              {acquisition.headlineLines.map((line, idx) => (
                <span key={idx} data-reveal="heading-line" className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* Right Copy and Refined CTA */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <p
              data-reveal="copy"
              className="text-[14px] md:text-[15px] font-light text-[#c8c2b5]/90 leading-[1.8] tracking-[0.01em]"
            >
              {acquisition.paragraph}
            </p>

            <div>
              <a
                href={acquisition.inquiryHref}
                data-reveal="cta"
                className="group inline-flex items-center gap-3 border border-[#dfd7c6]/40 bg-transparent px-8 py-4 text-[11px] font-medium tracking-[0.24em] uppercase text-[#f6f6f4] transition-all duration-300 hover:border-[#dfd7c6] hover:bg-[#dfd7c6]/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
              >
                <span>{acquisition.ctaLabel}</span>
                <ArrowUpRight
                  size={14}
                  weight="regular"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#dfd7c6]"
                />
              </a>

              <span
                data-reveal="sub"
                className="block mt-4 text-[9.5px] tracking-[0.22em] uppercase text-[#c8c2b5]/50"
              >
                {acquisition.contactNote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

