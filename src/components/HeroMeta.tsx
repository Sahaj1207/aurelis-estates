import React from "react";

interface HeroMetaProps {
  location: string;
  property: string;
  classification: string;
  coordinates?: string;
  className?: string;
}

export const HeroMeta: React.FC<HeroMetaProps> = ({
  location,
  property,
  classification,
  coordinates,
  className = "",
}) => {
  return (
    <aside
      aria-label="Architectural residence details"
      className={`hero-meta-element grid w-full grid-cols-2 gap-x-5 gap-y-4 md:flex md:w-auto md:flex-row md:items-end md:gap-10 text-[10.5px] md:text-[11px] tracking-[0.2em] md:tracking-[0.22em] uppercase text-[#c8c2b5] ${className}`}
    >
      <div className="flex flex-col gap-1.5 border-l border-white/15 pl-4">
        <span className="text-[9px] md:text-[10px] tracking-[0.26em] text-[#c8c2b5]/60 font-sans">
          Location
        </span>
        <span className="font-medium text-[#f6f6f4]">
          {location}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 border-l border-white/15 pl-4">
        <span className="text-[9px] md:text-[10px] tracking-[0.26em] text-[#c8c2b5]/60 font-sans">
          Commission
        </span>
        <span className="font-medium text-[#f6f6f4]">
          {property}
        </span>
      </div>

      <div className="hidden md:flex flex-col gap-1.5 border-l border-white/15 pl-4">
        <span className="text-[9px] md:text-[10px] tracking-[0.26em] text-[#c8c2b5]/60 font-sans">
          Type
        </span>
        <span className="font-medium text-[#f6f6f4]">
          {classification}
        </span>
      </div>

      {coordinates && (
        <div className="hidden lg:flex flex-col gap-1.5 border-l border-white/15 pl-4">
          <span className="text-[9px] md:text-[10px] tracking-[0.26em] text-[#c8c2b5]/60 font-sans">
            Coordinates
          </span>
          <span className="font-mono text-[10px] text-[#c8c2b5] tracking-[0.16em]">
            {coordinates}
          </span>
        </div>
      )}
    </aside>
  );
};
