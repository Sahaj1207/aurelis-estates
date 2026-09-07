import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { AboutContentData } from "../../data/aboutContent";

interface AboutPrivateOfficeProps {
  data: AboutContentData["privateOffice"];
  onNavigate?: (path: string) => void;
}

export const AboutPrivateOffice: React.FC<AboutPrivateOfficeProps> = ({
  data,
  onNavigate,
}) => {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(data.ctaHref);
    } else {
      window.location.href = data.ctaHref;
    }
  };

  return (
    <section
      data-about-section
      aria-label={data.eyebrow}
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-24 md:py-36 border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1720px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow & Headline */}
          <div className="lg:col-span-7">
            <span
              data-reveal="eyebrow"
              className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-4"
            >
              {data.eyebrow}
            </span>
            <h2
              data-reveal="heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.08]"
            >
              {data.headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* Right Column: Advisory Copy & Restrained CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <p
              data-reveal="copy"
              className="text-base sm:text-lg md:text-[1.1rem] font-light text-[#c8c2b5]/85 leading-[1.75] tracking-[0.01em]"
            >
              {data.paragraph}
            </p>

            <div data-reveal="cta" className="pt-2">
              <a
                href={data.ctaHref}
                onClick={handleCtaClick}
                className="group inline-flex items-center gap-3 border border-[#dfd7c6]/50 bg-white/[0.02] px-8 py-4 text-[11px] tracking-[0.24em] uppercase text-[#f6f6f4] transition-all duration-300 hover:border-[#dfd7c6] hover:bg-[#dfd7c6] hover:text-[#0a0c0d] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
              >
                <span>{data.ctaLabel}</span>
                <ArrowUpRight
                  size={14}
                  weight="regular"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <div className="mt-8 text-[9px] font-mono tracking-[0.24em] text-[#c8c2b5]/40 uppercase">
                {data.protocol}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
