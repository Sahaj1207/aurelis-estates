import React from "react";
import { approachContent } from "./approachData";
import { Img } from "../Img";

export const ApproachEnding: React.FC = () => {
  const { ending } = approachContent;

  return (
    <div className="approach-ending-block relative mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 pt-16 md:pt-24 pb-20 md:pb-28">
      {/* Animated Hairline Rule */}
      <div className="approach-ending-line absolute top-0 left-6 sm:left-8 md:left-12 lg:left-16 right-6 sm:right-8 md:right-12 lg:right-16 h-[1px] bg-white/[0.07] origin-left" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Statement Column Left */}
        <div className="lg:col-span-7 xl:col-span-7">
          <h3 className="approach-ending-headline text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.08] mb-6">
            <span className="block overflow-hidden">
              <span className="inline-block">{ending.headlineLine1}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block">{ending.headlineLine2}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block italic text-[#dfd7c6]">{ending.headlineLine3}</span>
            </span>
          </h3>
          <p className="approach-ending-subtext max-w-[42ch] text-[13.5px] md:text-[14.5px] font-light text-[#c8c2b5]/85 leading-[1.75] tracking-[0.01em] font-sans">
            {ending.subtext}
          </p>
        </div>

        {/* Quiet Architectural Finishing Fragment Right */}
        <div className="lg:col-span-5 xl:col-span-5 flex justify-start lg:justify-end">
          <div className="approach-ending-image-wrapper relative overflow-hidden bg-[#121517] aspect-[16/10] border border-white/[0.08] max-w-sm sm:max-w-md w-full group">
            <Img
              src={ending.image.src}
              alt={ending.image.alt}
              className="approach-ending-image h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
            <div className="absolute bottom-3 left-3 bg-[#0a0c0d]/85 backdrop-blur-md px-3 py-1.5 border border-white/[0.08] text-[8.5px] tracking-[0.22em] uppercase text-[#c8c2b5]/80 pointer-events-none">
              {ending.image.caption}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
