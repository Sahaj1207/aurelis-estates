import React from "react";
import { ArrowLeft, ArrowUp } from "@phosphor-icons/react";
import { scrollToTarget } from "../../services/smoothScroll";

interface PropertyFooterProps {
  onBack: () => void;
}

export const PropertyFooter: React.FC<PropertyFooterProps> = ({ onBack }) => {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget(0, { duration: 1.2 });
  };

  return (
    <footer
      aria-label="Monograph Colophon"
      className="w-full bg-[#0a0c0d] border-t border-white/[0.07] px-6 sm:px-8 md:px-12 lg:px-16 py-16"
    >
      <div className="mx-auto max-w-[1720px] flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div data-footer-reveal="brand" className="flex flex-col gap-1">
          <span className="text-[12px] font-semibold tracking-[0.28em] text-[#f6f6f4] uppercase">
            AURELIS ESTATES
          </span>
          <span className="text-[9.5px] tracking-[0.22em] text-[#c8c2b5]/60 uppercase">
            THE MARINE HOUSE / MUMBAI / INDIA
          </span>
        </div>

        <div data-footer-reveal="actions" className="flex items-center gap-6 sm:gap-8 self-start md:self-auto">
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
            <span>Return to Overview</span>
          </button>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.24em] uppercase text-[#c8c2b5] transition-colors hover:text-[#dfd7c6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
          >
            <span>Back to Top</span>
            <ArrowUp
              size={13}
              weight="regular"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        <div data-footer-reveal="meta" className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-[9px] tracking-[0.24em] uppercase text-[#c8c2b5]/40 border-t border-white/[0.05] pt-6 md:border-t-0 md:pt-0">
          <span>PORTFOLIO EDITION 2026</span>
          <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/20" />
          <span>AURELIS ESTATES PRIVATE OFFICE</span>
        </div>
      </div>
    </footer>
  );
};

