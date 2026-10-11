import React, { useRef } from "react";
import type { EstateHeroData } from "../data/estateContent";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { HeroMeta } from "./HeroMeta";
import { HeroWater } from "./HeroWater";
import { Img } from "./Img";

interface HeroProps {
  data: EstateHeroData;
  containerRef: React.RefObject<HTMLDivElement | null>;
  // The moving plate: photograph plus its water surface
  imageRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export const Hero: React.FC<HeroProps> = ({
  data,
  containerRef,
  imageRef,
  contentRef,
}) => {
  const photographRef = useRef<HTMLImageElement>(null);

  return (
    <section
      id="hero-container"
      ref={containerRef}
      aria-label="AURELIS Estates Featured Residence"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0a0c0d] flex flex-col justify-between pt-24 pb-[max(1.75rem,env(safe-area-inset-bottom))] md:pb-12"
    >
      {/* 1. Cinematic Architectural Photograph Layer with Lightened Calibrated Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div ref={imageRef} className="relative h-full w-full will-change-transform">
          <Img
            ref={photographRef}
            src={data.image.src}
            alt={data.image.alt}
            className="h-full w-full object-cover object-[62%_35%] md:object-[center_35%]"
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
          <HeroWater imageRef={photographRef} />
        </div>

        {/* Top Vignette for subtle navigation contrast */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0c0d]/65 via-[#0a0c0d]/15 to-transparent" />

        {/* Directional Left Scrim calibrated to preserve travertine texture and pool reflections */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[68%] bg-gradient-to-r from-[#0a0c0d]/80 via-[#0a0c0d]/45 md:via-[#0a0c0d]/25 to-[#0a0c0d]/10 md:to-transparent" />

        {/* Bottom Dissolve into the dark architectural palette of the next section */}
        <div className="absolute inset-x-0 bottom-0 h-56 md:h-44 bg-gradient-to-t from-[#0a0c0d] via-[#0a0c0d]/70 to-transparent" />

        {/* Restrained Film Grain */}
        <div className="absolute inset-0 grain-overlay opacity-30 mix-blend-overlay" />
      </div>

      {/* 2. Top Spacer */}
      <div className="h-2 md:h-10" aria-hidden="true" />

      {/* 3. Primary Asymmetric Hero Content Area */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 my-auto"
      >
        <div className="max-w-[1180px]">
          {/* Eyebrow */}
          <div className="hero-eyebrow mb-3.5 md:mb-5 overflow-hidden">
            <p className="text-[11px] md:text-[11.5px] font-medium tracking-[0.28em] uppercase text-[#dfd7c6] font-sans">
              {data.eyebrow}
            </p>
          </div>

          {/* Main Display Headline */}
          <h1 className="display-xl font-light tracking-[-0.02em] leading-[1.02] text-[#f6f6f4] font-serif mb-5 md:mb-6">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-headline-inner block will-change-transform">
                {data.headline.line1}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em] text-[#dfd7c6]">
              <span className="hero-headline-inner block will-change-transform">
                {data.headline.line2}
              </span>
            </span>
          </h1>

          {/* Supporting Copy */}
          <div className="hero-supporting-copy mb-8 md:mb-10 overflow-hidden">
            <p className="text-[15px] md:text-[17px] text-[#f6f6f4]/85 font-light leading-[1.65] max-w-[34ch] font-sans">
              {data.supportingCopy}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="hero-cta-group flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-7">
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
      <div className="relative z-10 mx-auto w-full max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 mt-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-white/[0.1] pt-5 md:pt-7">
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
