import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { CollectionResidence } from "./collectionData";

interface ResidenceItemProps {
  residence: CollectionResidence;
  onNavigate?: (href: string) => void;
}

export const ResidenceItem: React.FC<ResidenceItemProps> = ({
  residence,
  onNavigate,
}) => {
  const handleActionClick = (e: React.MouseEvent) => {
    if (residence.actionType === "link" && residence.actionHref) {
      if (onNavigate) {
        e.preventDefault();
        onNavigate(residence.actionHref);
      }
    }
  };

  // 1. Common Typography Block
  const renderTypography = (alignClasses = "") => (
    <div className={`residence-copy flex flex-col justify-center ${alignClasses}`}>
      {/* Label */}
      <span className="text-[9.5px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6] font-sans block mb-3">
        {residence.label}
      </span>

      {/* Large Cormorant Headline */}
      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[0.98] mb-2.5 transition-transform duration-500 ease-out group-hover:translate-x-1">
        {residence.titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>

      {/* Location */}
      <span className="text-[10px] md:text-[10.5px] font-medium tracking-[0.26em] uppercase text-[#c8c2b5]/70 font-sans block mb-5">
        {residence.location}
      </span>

      {/* Description */}
      <p className="max-w-[38ch] text-[13.5px] md:text-[14px] font-light leading-[1.7] text-[#c8c2b5]/90 font-sans mb-7">
        {residence.description}
      </p>

      {/* Metadata Specification List */}
      <div className="flex flex-wrap items-center gap-6 border-t border-white/[0.08] pt-4 mb-7">
        {residence.specs.map((spec) => (
          <div key={spec.label} className="border-l border-white/[0.1] pl-3 py-0.5">
            <span className="text-[8.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/50 font-sans block">
              {spec.label}
            </span>
            <span className="text-[11px] md:text-[11.5px] tracking-[0.16em] uppercase text-[#f6f6f4] font-medium font-sans mt-0.5 block">
              {spec.value}
            </span>
          </div>
        ))}
      </div>

      {/* Action / Status */}
      <div>
        {residence.actionType === "link" && residence.actionHref ? (
          <a
            href={residence.actionHref}
            onClick={handleActionClick}
            className="inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.24em] uppercase text-[#dfd7c6] border-b border-[#dfd7c6]/40 pb-1 hover:border-[#dfd7c6] hover:text-[#f6f6f4] transition-all duration-300"
          >
            <span>{residence.actionLabel}</span>
            <ArrowUpRight size={14} weight="bold" />
          </a>
        ) : (
          <span className="text-[10px] tracking-[0.26em] uppercase text-[#c8c2b5]/50 font-sans block">
            {residence.actionLabel}
          </span>
        )}
      </div>
    </div>
  );

  // 2. Common Architectural Image Wrapper
  const renderImage = (aspectClasses: string) => (
    <div className={`residence-image-wrap relative overflow-hidden border border-white/[0.08] ${aspectClasses}`}>
      <img
        src={residence.image.src}
        alt={residence.image.alt}
        style={{ objectPosition: residence.image.objectPosition ?? "center center" }}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
  );

  // LAYOUT 01: Wide-Left (8 cols image left, 4 cols text right)
  if (residence.layoutVariant === "wide-left") {
    return (
      <article
        aria-label={residence.titleLines.join(" ")}
        className="group residence-card mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 border-b border-white/[0.06]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-8">
            {renderImage("aspect-[16/10]")}
          </div>
          <div className="lg:col-span-4 pl-0 lg:pl-4">
            {renderTypography()}
          </div>
        </div>
      </article>
    );
  }

  // LAYOUT 02: Wide-Right (4 cols text left, 8 cols image right)
  if (residence.layoutVariant === "wide-right") {
    return (
      <article
        aria-label={residence.titleLines.join(" ")}
        className="group residence-card mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 border-b border-white/[0.06]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-4 order-2 lg:order-1 pr-0 lg:pr-4">
            {renderTypography()}
          </div>
          <div className="lg:col-span-8 order-1 lg:order-2">
            {renderImage("aspect-[16/10]")}
          </div>
        </div>
      </article>
    );
  }

  // LAYOUT 03: Offset-Vertical (7 cols image, 5 cols text offset in negative space)
  if (residence.layoutVariant === "offset-vertical") {
    return (
      <article
        aria-label={residence.titleLines.join(" ")}
        className="group residence-card mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 border-b border-white/[0.06]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            {renderImage("aspect-[4/3] sm:aspect-[16/10]")}
          </div>
          <div className="lg:col-span-5 self-end pb-4 lg:pb-8 pl-0 lg:pl-6">
            {renderTypography()}
          </div>
        </div>
      </article>
    );
  }

  // LAYOUT 04: Cinematic-Panorama (Full-width cinematic panorama image with asymmetric copy below)
  return (
    <article
      aria-label={residence.titleLines.join(" ")}
      className="group residence-card mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 border-b border-white/[0.06]"
    >
      <div className="flex flex-col gap-10 md:gap-14">
        {/* Full-Width Panoramic Image */}
        <div className="w-full">
          {renderImage("aspect-[21/9] sm:aspect-[16/7]")}
        </div>

        {/* Asymmetric Split Copy Below */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <span className="text-[9.5px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6] font-sans block mb-3">
              {residence.label}
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[0.98] mb-2.5 transition-transform duration-500 ease-out group-hover:translate-x-1">
              {residence.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
            <span className="text-[10px] md:text-[10.5px] font-medium tracking-[0.26em] uppercase text-[#c8c2b5]/70 font-sans block">
              {residence.location}
            </span>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between h-full pt-1">
            <p className="max-w-[46ch] text-[13.5px] md:text-[14.5px] font-light leading-[1.7] text-[#c8c2b5]/90 font-sans mb-7">
              {residence.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.08] pt-4">
              <div className="flex flex-wrap items-center gap-6">
                {residence.specs.map((spec) => (
                  <div key={spec.label} className="border-l border-white/[0.1] pl-3 py-0.5">
                    <span className="text-[8.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/50 font-sans block">
                      {spec.label}
                    </span>
                    <span className="text-[11px] md:text-[11.5px] tracking-[0.16em] uppercase text-[#f6f6f4] font-medium font-sans mt-0.5 block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <span className="text-[10px] tracking-[0.26em] uppercase text-[#c8c2b5]/50 font-sans">
                {residence.actionLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
