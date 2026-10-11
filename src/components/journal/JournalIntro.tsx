import React from "react";
import { journalContent } from "./journalData";

export const JournalIntro: React.FC = () => {
  const { eyebrow, headlineLines, supportingStatement } = journalContent;

  return (
    <div className="journal-intro-block mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 pt-20 md:pt-28 lg:pt-36 pb-12 md:pb-16">
      {/* Eyebrow */}
      <div className="journal-eyebrow mb-6 md:mb-10">
        <span className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85">
          {eyebrow}
        </span>
      </div>

      {/* Asymmetric Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end pb-12 md:pb-16 border-b border-white/[0.07] relative">
        {/* Left Headline (~60% width on desktop) */}
        <div className="lg:col-span-7 xl:col-span-7">
          <h2 className="journal-intro-headline display-lg font-light font-serif text-[#f6f6f4] tracking-[-0.02em] leading-[0.98]">
            <span className="block overflow-hidden">
              <span className="inline-block">{headlineLines[0]}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block italic font-normal text-[#dfd7c6]">
                {headlineLines[1]}
              </span>
            </span>
          </h2>
        </div>

        {/* Right Supporting Statement */}
        <div className="lg:col-span-5 xl:col-span-5 lg:pl-6">
          <div className="border-l border-[#dfd7c6]/30 pl-6 py-1">
            <p className="journal-intro-statement max-w-[36ch] text-[13.5px] md:text-[14.5px] font-light text-[#c8c2b5]/90 leading-[1.8] tracking-[0.01em] font-sans">
              {supportingStatement}
            </p>
          </div>
        </div>

        {/* Animated Hairline Rule on Bottom */}
        <div className="journal-intro-line absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.07] origin-left" />
      </div>
    </div>
  );
};
