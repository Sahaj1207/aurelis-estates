import React from "react";
import { ArrowUp } from "@phosphor-icons/react";
import type { AboutContentData } from "../../data/aboutContent";
import { scrollToTarget } from "../../services/smoothScroll";

interface AboutClosingProps {
  data: AboutContentData["closing"];
}

export const AboutClosing: React.FC<AboutClosingProps> = ({ data }) => {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget(0, { duration: 1.2 });
  };

  return (
    <section
      data-about-section
      aria-label={data.eyebrow}
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-40 pb-16 md:pb-24 border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Section Eyebrow */}
        <div className="mb-12 md:mb-16">
          <span
            data-reveal="eyebrow"
            className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block"
          >
            {data.eyebrow}
          </span>
        </div>

        {/* Large Quiet Editorial Declaration */}
        <div className="max-w-5xl mb-24 md:mb-36">
          <h2
            data-reveal="heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.06]"
          >
            {data.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* Bottom Colophon & Back to Top Strip */}
        <div
          data-reveal="colophon"
          className="border-t border-white/[0.08] pt-8 md:pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-[10px] md:text-[10.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/60 font-sans">
            <span className="text-[#f6f6f4]">{data.supportingLine}</span>
            <span className="hidden sm:inline text-white/20">/</span>
            <span className="font-mono text-[9px] text-[#c8c2b5]/40">
              {data.edition}
            </span>
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex items-center gap-2.5 text-[10px] md:text-[10.5px] font-medium tracking-[0.26em] uppercase text-[#c8c2b5] transition-colors duration-300 hover:text-[#dfd7c6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
          >
            <span>BACK TO TOP</span>
            <ArrowUp
              size={13}
              weight="regular"
              className="transition-transform duration-300 group-hover:-translate-y-1 text-[#dfd7c6]"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
