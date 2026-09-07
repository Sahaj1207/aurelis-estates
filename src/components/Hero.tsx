import React from "react";
import type { EstateHeroData } from "../data/estateContent";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { HeroMeta } from "./HeroMeta";

interface HeroProps {
  data: EstateHeroData;
  containerRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLImageElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export const Hero: React.FC<HeroProps> = ({
  data,
  containerRef,
  imageRef,
  contentRef,
}) => {
  return (
    <section
      id="hero-container"
      ref={containerRef}
      aria-label="AURELIS Estates Featured Residence"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0a0c0d] flex flex-col justify-between pt-24 pb-8 md:pb-12"
    >
      {/* 1. Cinematic Architectural Photograph Layer with Lightened Calibrated Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          ref={imageRef}
          src={data.image.src}
          alt={data.image.alt}
          className="h-full w-full object-cover object-[center_35%] will-change-transform"
        />

        {/* Top Vignette for subtle navigation contrast */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0c0d]/65 via-[#0a0c0d]/15 to-transparent" />

        {/* Directional Left Scrim calibrated to preserve travertine texture and pool reflections */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[68%] bg-gradient-to-r from-[#0a0c0d]/75 via-[#0a0c0d]/25 to-transparent opacity-95" />

        {/* Bottom Dissolve into the dark architectural palette of the next section */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0a0c0d] via-[#0a0c0d]/60 to-transparent" />

        {/* Restrained Film Grain */}
        <div className="absolute inset-0 grain-overlay opacity-30 mix-blend-overlay" />
      </div>

      {/* 2. Top Spacer */}
      <div className="h-6 md:h-10" aria-hidden="true" />

      {/* 3. Primary Asymmetric Hero Content Area */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 my-auto"
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="hero-eyebrow mb-3.5 md:mb-5 overflow-hidden">
            <p className="text-[11px] md:text-[11.5px] font-medium tracking-[0.28em] uppercase text-[#dfd7c6] font-sans">
              {data.eyebrow}
            </p>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] font-light tracking-[-0.015em] leading-[1.05] text-[#f6f6f4] font-serif mb-5 md:mb-6">
            <span className="hero-headline-line block overflow-hidden">
              {data.headline.line1}
            </span>
            <span className="hero-headline-line block overflow-hidden text-[#dfd7c6]">
              {data.headline.line2}
            </span>
          </h1>

          {/* Supporting Copy */}
          <div className="hero-supporting-copy mb-8 md:mb-10 overflow-hidden">
            <p className="text-sm sm:text-[15px] md:text-base text-[#c8c2b5]/90 font-light leading-[1.65] max-w-[38ch] font-sans">
              {data.supportingCopy}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="hero-cta-group flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
            <PrimaryButton
              label={data.primaryCta.label}
              href={data.primaryCta.href}
            />
            <SecondaryButton
              label={data.secondaryCta.label}
              targetId={data.secondaryCta.targetId}
            />
          </div>
        </div>
      </div>

      {/* 4. Lower Architectural Metadata Bar */}
      <div className="relative z-10 mx-auto w-full max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 pt-6 md:pt-7 border-t border-white/[0.08] mt-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <HeroMeta
            location={data.meta.location}
            property={data.meta.property}
            classification={data.meta.classification}
            coordinates={data.meta.coordinates}
          />

          <div className="hidden sm:block text-[9.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/40 font-sans">
            Architecture and Landscaping in Harmony
          </div>
        </div>
      </div>
    </section>
  );
};
