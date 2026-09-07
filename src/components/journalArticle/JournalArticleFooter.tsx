import React from "react";
import { ArrowLeft } from "@phosphor-icons/react";

interface JournalArticleFooterProps {
  onBack: () => void;
}

export const JournalArticleFooter: React.FC<JournalArticleFooterProps> = ({ onBack }) => {
  return (
    <footer
      aria-label="Article Colophon"
      className="w-full bg-[#0a0c0d] border-t border-white/[0.07] px-6 sm:px-8 md:px-12 lg:px-16 py-16"
    >
      <div className="mx-auto max-w-[1720px] flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-semibold tracking-[0.28em] text-[#f6f6f4] uppercase">
            AURELIS ESTATES
          </span>
          <span className="text-[9.5px] tracking-[0.22em] text-[#c8c2b5]/60 uppercase">
            THE JOURNAL / ARCHITECTURAL OBSERVATIONS
          </span>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.24em] uppercase text-[#c8c2b5] transition-colors hover:text-[#dfd7c6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] self-start md:self-auto"
        >
          <ArrowLeft
            size={14}
            weight="regular"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Return to Journal</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-[9px] tracking-[0.24em] uppercase text-[#c8c2b5]/40 border-t border-white/[0.05] pt-6 md:border-t-0 md:pt-0">
          <span>PORTFOLIO EDITION 2026</span>
          <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/20" />
          <span>AURELIS ESTATES PRIVATE OFFICE</span>
        </div>
      </div>
    </footer>
  );
};
