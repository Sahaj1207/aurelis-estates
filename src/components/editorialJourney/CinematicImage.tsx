import React from "react";

interface CinematicImageProps {
  src: string;
  alt: string;
  objectPosition?: string;
  className?: string;
  caption?: string;
}

export const CinematicImage: React.FC<CinematicImageProps> = ({
  src,
  alt,
  objectPosition = "center center",
  className = "",
  caption,
}) => {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[#121517] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        style={{ objectPosition }}
        className="h-full w-full object-cover will-change-transform"
      />

      {/* Very subtle analog grain overlay for filmic depth */}
      <div className="absolute inset-0 grain-overlay opacity-25 mix-blend-overlay pointer-events-none" />

      {/* Discrete architectural caption indicator */}
      {caption && (
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 flex items-center gap-2.5 pointer-events-none">
          <span className="h-[1px] w-5 bg-[#dfd7c6]/60" />
          <span className="text-[9px] md:text-[9.5px] tracking-[0.24em] uppercase text-[#f6f6f4]/80 font-sans">
            {caption}
          </span>
        </div>
      )}
    </div>
  );
};
