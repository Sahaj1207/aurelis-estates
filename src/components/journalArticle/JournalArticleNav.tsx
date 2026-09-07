import React from "react";
import { ArrowLeft } from "@phosphor-icons/react";

interface JournalArticleNavProps {
  onBack: () => void;
}

export const JournalArticleNav: React.FC<JournalArticleNavProps> = ({ onBack }) => {
  return (
    <header className="w-full border-b border-white/[0.07] bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-8">
      <div className="mx-auto flex max-w-[1720px] items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[12.5px] font-semibold tracking-[0.28em] text-[#f6f6f4] uppercase">
            AURELIS ESTATES
          </span>
          <span className="text-[8.5px] tracking-[0.26em] text-[#c8c2b5]/70 uppercase">
            THE JOURNAL / NOTEBOOK
          </span>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.24em] uppercase text-[#c8c2b5] transition-colors hover:text-[#dfd7c6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
        >
          <ArrowLeft
            size={14}
            weight="regular"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Return to Journal</span>
        </button>
      </div>
    </header>
  );
};
