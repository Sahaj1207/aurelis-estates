import { forwardRef } from "react";
import { ArrowLeft } from "@phosphor-icons/react";

interface MarineHouseNavProps {
  onBack: () => void;
}

export const MarineHouseNav = forwardRef<HTMLElement, MarineHouseNavProps>(
  ({ onBack }, ref) => {
    return (
      <header
        ref={ref}
        id="marine-house-header"
        className="fixed md:static top-0 left-0 right-0 z-40 w-full border-b border-white/[0.07] bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 pt-[max(1.25rem,env(safe-area-inset-top,0px))] pb-4 md:py-8 transition-colors duration-300"
      >
        <div className="mx-auto flex max-w-[1720px] items-center justify-between gap-4">
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] sm:text-[12.5px] font-semibold tracking-[0.28em] text-[#f6f6f4] uppercase truncate">
              AURELIS ESTATES
            </span>
            <span className="text-[8px] sm:text-[8.5px] tracking-[0.26em] text-[#c8c2b5]/70 uppercase truncate">
              PRIVATE RESIDENCES
            </span>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 sm:gap-2.5 text-[10.5px] sm:text-[11px] font-medium tracking-[0.22em] sm:tracking-[0.24em] uppercase text-[#c8c2b5] transition-colors hover:text-[#dfd7c6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] shrink-0"
          >
            <ArrowLeft
              size={14}
              weight="regular"
              className="transition-transform duration-300 group-hover:-translate-x-1 shrink-0"
            />
            <span>Return to Overview</span>
          </button>
        </div>
      </header>
    );
  }
);

MarineHouseNav.displayName = "MarineHouseNav";

