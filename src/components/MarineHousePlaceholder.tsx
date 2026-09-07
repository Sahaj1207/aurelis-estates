import React from "react";
import { ArrowLeft } from "@phosphor-icons/react";

interface MarineHousePlaceholderProps {
  onBack: () => void;
}

export const MarineHousePlaceholder: React.FC<MarineHousePlaceholderProps> = ({
  onBack,
}) => {
  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0a0c0d] text-[#f6f6f4] px-6 sm:px-8 md:px-12 lg:px-16 py-12 flex flex-col justify-between">
      {/* Top Bar with Return Action */}
      <header className="mx-auto w-full max-w-[1720px] flex items-center justify-between border-b border-white/[0.07] pb-8">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold tracking-[0.28em] text-[#f6f6f4] uppercase">
            AURELIS ESTATES
          </span>
          <span className="text-[8.5px] tracking-[0.26em] text-[#c8c2b5]/70 uppercase">
            Private Residences
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
          <span>Return to Overview</span>
        </button>
      </header>

      {/* Center Architectural Monograph Presentation */}
      <main className="mx-auto w-full max-w-3xl my-auto py-16 text-center">
        <span className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6] block mb-4">
          Architectural Monograph / In Preparation
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.02] mb-6">
          THE MARINE HOUSE
        </h1>

        <p className="text-[14px] md:text-[15px] font-light leading-relaxed text-[#c8c2b5]/90 max-w-xl mx-auto mb-10">
          The comprehensive digital monograph, architectural elevation drawings, and private acquisition dossier for this coastal Mumbai estate are being prepared for qualified clients.
        </p>

        <div className="inline-flex items-center gap-8 border-y border-white/[0.08] py-4 px-6 text-[11px] tracking-[0.22em] uppercase text-[#c8c2b5]/60">
          <span>Mumbai / India</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>8,420 SQ FT</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>Private Acquisition Only</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-[1720px] flex items-center justify-between border-t border-white/[0.07] pt-8 text-[10px] tracking-[0.24em] uppercase text-[#c8c2b5]/40">
        <span>Portfolio Edition 2026</span>
        <span>AURELIS Estates Private Office</span>
      </footer>
    </div>
  );
};
