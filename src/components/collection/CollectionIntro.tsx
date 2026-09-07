import React from "react";
import { collectionIntroData } from "./collectionData";

export const CollectionIntro: React.FC = () => {
  return (
    <div className="collection-intro-block mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-36 lg:pt-44 pb-16 md:pb-24 border-b border-white/[0.07]">
      <span className="collection-eyebrow text-[10px] md:text-[11px] font-medium tracking-[0.32em] uppercase text-[#dfd7c6] font-sans block mb-4">
        {collectionIntroData.sectionNumber}
      </span>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16">
        <h2 className="collection-headline text-3xl sm:text-4xl md:text-5xl lg:text-[4.25rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[0.98]">
          <span className="block">{collectionIntroData.headline.line1}</span>
          <span className="block text-[#dfd7c6]">{collectionIntroData.headline.line2}</span>
        </h2>
        <p className="collection-copy max-w-[36ch] text-[13.5px] md:text-[14.5px] font-light leading-[1.7] text-[#c8c2b5]/90 font-sans pb-1">
          {collectionIntroData.supportingCopy}
        </p>
      </div>
    </div>
  );
};
