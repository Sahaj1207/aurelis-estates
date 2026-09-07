import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { journalContent } from "./journalData";

export const JournalClosing: React.FC = () => {
  const { closing } = journalContent;

  return (
    <div className="journal-closing-block relative mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 pt-16 md:pt-24 pb-24 md:pb-36">
      {/* Animated Hairline Rule on Top */}
      <div className="journal-closing-line absolute top-0 left-6 sm:left-8 md:left-12 lg:left-16 right-6 sm:right-8 md:right-12 lg:right-16 h-[1px] bg-white/[0.07] origin-left" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 lg:gap-16">
        {/* Archival Statement */}
        <div className="max-w-2xl">
          <h3 className="journal-closing-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.1] mb-5">
            <span className="block">{closing.headingLines[0]}</span>
            <span className="block text-[#dfd7c6]">{closing.headingLines[1]}</span>
          </h3>
          <p className="journal-closing-subtext max-w-[42ch] text-[13.5px] md:text-[14.5px] font-light text-[#c8c2b5]/80 leading-[1.75] tracking-[0.01em] font-sans">
            {closing.subtext}
          </p>
        </div>

        {/* Quiet Publication Index Action Link (Only CTA in this section) */}
        <div className="self-start md:self-end pb-1">
          <a
            href={closing.linkHref}
            className="journal-closing-link group inline-flex items-center gap-3 border border-[#dfd7c6]/30 px-6 py-3.5 text-[11px] font-medium tracking-[0.24em] uppercase text-[#f6f6f4] hover:border-[#dfd7c6] hover:bg-[#dfd7c6]/10 transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
          >
            <span>{closing.linkLabel}</span>
            <ArrowUpRight
              size={14}
              weight="regular"
              className="text-[#dfd7c6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
