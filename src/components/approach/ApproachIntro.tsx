import React from "react";
import { approachContent } from "./approachData";

export const ApproachIntro: React.FC = () => {
  const { eyebrow, manifesto, supportingCopy, manifestoImage } = approachContent;

  return (
    <div className="approach-intro-block mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 pt-16 md:pt-24 lg:pt-28 pb-12 md:pb-16">
      {/* Quiet Section Eyebrow */}
      <div className="approach-eyebrow mb-6 md:mb-10">
        <span className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85">
          {eyebrow}
        </span>
      </div>

      {/* Asymmetric Editorial Header Grid: ~60% Manifesto / 40% Supporting Column + Image Fragment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-10 md:pb-14 border-b border-white/[0.07]">
        {/* Left Manifesto Column */}
        <div className="lg:col-span-7 xl:col-span-7">
          <h2 className="approach-manifesto text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] font-light font-serif text-[#f6f6f4] tracking-[-0.02em] leading-[0.98]">
            <span className="block overflow-hidden">
              <span className="inline-block">{manifesto.line1}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block">{manifesto.line2}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block italic font-normal text-[#dfd7c6]">
                {manifesto.line3}
              </span>
            </span>
          </h2>
        </div>

        {/* Right Column: Supporting Narrative + Restrained Architectural Plate Fragment */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-8 lg:pt-2">
          <div className="border-l border-[#dfd7c6]/30 pl-6 py-1">
            <p className="approach-intro-copy max-w-[34ch] text-[13.5px] md:text-[14.5px] font-light text-[#c8c2b5]/90 leading-[1.8] tracking-[0.01em] font-sans">
              {supportingCopy}
            </p>
          </div>

          {/* Restrained Architectural Image Fragment */}
          <div className="approach-intro-image-wrapper relative overflow-hidden bg-[#121517] aspect-[16/10] sm:aspect-[21/11] border border-white/[0.08] max-w-sm sm:max-w-md group">
            <img
              src={manifestoImage.src}
              alt={manifestoImage.alt}
              className="approach-intro-image h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              loading="lazy"
            />
            <div className="absolute bottom-3 left-3 bg-[#0a0c0d]/85 backdrop-blur-md px-3 py-1.5 border border-white/[0.08] text-[8.5px] tracking-[0.22em] uppercase text-[#c8c2b5]/80 pointer-events-none">
              {manifestoImage.caption}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
