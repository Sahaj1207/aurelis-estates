import React from "react";
import type { AboutContentData } from "../../data/aboutContent";

interface AboutManifestoProps {
  data: AboutContentData["manifesto"];
}

export const AboutManifesto: React.FC<AboutManifestoProps> = ({ data }) => {
  return (
    <section
      data-about-section
      aria-label="Opening Manifesto"
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 md:pt-48 pb-20 md:pb-32"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Top Eyebrow & Metadata Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-8 mb-16 md:mb-24">
          <span
            data-reveal="eyebrow"
            className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85"
          >
            {data.meta}
          </span>
          <span
            data-reveal="meta"
            className="text-[9px] md:text-[9.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/50 font-mono"
          >
            ARCHITECTURAL MANIFESTO / EDITION 2026
          </span>
        </div>

        {/* Asymmetric Editorial Hero Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <h1
              data-reveal="heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.5rem] font-light font-serif text-[#f6f6f4] tracking-[-0.02em] leading-[1.05]"
            >
              {data.headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pt-6 flex flex-col justify-between">
            <div
              data-reveal="divider"
              className="w-12 h-[1px] bg-[#dfd7c6]/50 mb-8 hidden lg:block origin-left"
            />
            <p
              data-reveal="copy"
              className="text-base sm:text-lg md:text-[1.15rem] font-light text-[#c8c2b5] leading-[1.7] tracking-[0.01em] max-w-[34ch]"
            >
              {data.paragraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
