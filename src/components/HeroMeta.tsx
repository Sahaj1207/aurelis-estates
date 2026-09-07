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
      className={`hero-meta-element flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-10 text-[11px] tracking-[0.22em] uppercase text-[#c8c2b5] ${className}`}
    >
      <div className="flex flex-col gap-1.5 border-l border-white/15 pl-4">
        <span className="text-[10px] tracking-[0.26em] text-[#c8c2b5]/60 font-sans">
          Location
        </span>
        <span className="font-medium text-[#f6f6f4] tracking-[0.2em]">
          {location}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 border-l border-white/15 pl-4">
        <span className="text-[10px] tracking-[0.26em] text-[#c8c2b5]/60 font-sans">
          Commission
        </span>
        <span className="font-medium text-[#f6f6f4] tracking-[0.2em]">
          {property}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 border-l border-white/15 pl-4">
        <span className="text-[10px] tracking-[0.26em] text-[#c8c2b5]/60 font-sans">
          Type
        </span>
        <span className="font-medium text-[#f6f6f4] tracking-[0.2em]">
          {classification}
        </span>
      </div>

      {coordinates && (
        <div className="hidden lg:flex flex-col gap-1.5 border-l border-white/15 pl-4">
          <span className="text-[10px] tracking-[0.26em] text-[#c8c2b5]/60 font-sans">
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
