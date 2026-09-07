import React from "react";
import { CinematicImage } from "./CinematicImage";
import { CinematicCopy } from "./CinematicCopy";
import type { EditorialFrameData } from "./editorialJourneyData";

interface CinematicFrameProps {
  frame: EditorialFrameData;
  isActive?: boolean;
  className?: string;
}

export const CinematicFrame: React.FC<CinematicFrameProps> = ({
  frame,
  className = "",
}) => {
  // FRAME 01: Large image nearly full viewport, small metadata anchored near lower left
  if (frame.layout === "fullscreen-exterior") {
    return (
      <div
        className={`relative h-full w-full flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-18 ${className}`}
      >
        <div className="absolute inset-0 z-0">
          <CinematicImage
            src={frame.image.src}
            alt={frame.image.alt}
            objectPosition={frame.image.objectPosition}
            caption={frame.image.caption}
          />
          {/* Subtle directional scrim on lower-left for typography legibility */}
          <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-[#0a0c0d]/85 via-[#0a0c0d]/35 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-xl my-auto">
          <CinematicCopy frame={frame} />
        </div>
      </div>
    );
  }

  // FRAME 02: Image occupying ~65-70% of viewport, text positioned independently on opposite side
  if (frame.layout === "mask-transition") {
    return (
      <div
        className={`relative h-full w-full flex flex-col justify-center p-6 sm:p-10 md:p-14 lg:p-18 ${className}`}
      >
        <div className="mx-auto w-full max-w-[1720px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-8 aspect-[16/10] overflow-hidden border border-white/[0.08]">
            <CinematicImage
              src={frame.image.src}
              alt={frame.image.alt}
              objectPosition={frame.image.objectPosition}
              caption={frame.image.caption}
            />
          </div>
          <div className="lg:col-span-4 pl-0 lg:pl-6">
            <CinematicCopy frame={frame} />
          </div>
        </div>
      </div>
    );
  }

  // FRAME 03: Large architectural image with headline overlapping negative space
  if (frame.layout === "split-interior") {
    return (
      <div
        className={`relative h-full w-full flex flex-col justify-center p-6 sm:p-10 md:p-14 lg:p-18 ${className}`}
      >
        <div className="mx-auto w-full max-w-[1720px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <CinematicCopy frame={frame} />
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 aspect-[16/10] overflow-hidden border border-white/[0.08]">
            <CinematicImage
              src={frame.image.src}
              alt={frame.image.alt}
              objectPosition={frame.image.objectPosition}
              caption={frame.image.caption}
            />
          </div>
        </div>
      </div>
    );
  }

  // FRAME 04: Asymmetric split composition, image dominant, small text block offset from the image
  if (frame.layout === "asymmetric-dining") {
    return (
      <div
        className={`relative h-full w-full flex flex-col justify-center p-6 sm:p-10 md:p-14 lg:p-18 ${className}`}
      >
        <div className="mx-auto w-full max-w-[1720px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-8 aspect-[16/9] overflow-hidden border border-white/[0.08]">
            <CinematicImage
              src={frame.image.src}
              alt={frame.image.alt}
              objectPosition={frame.image.objectPosition}
              caption={frame.image.caption}
            />
          </div>
          <div className="lg:col-span-4 self-end pb-4 lg:pb-8">
            <CinematicCopy frame={frame} />
          </div>
        </div>
      </div>
    );
  }

  // FRAME 05: Quiet interior image, large negative space, minimal typography
  if (frame.layout === "suite-sanctuary") {
    return (
      <div
        className={`relative h-full w-full flex flex-col justify-center p-6 sm:p-10 md:p-14 lg:p-18 ${className}`}
      >
        <div className="mx-auto w-full max-w-[1720px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
          <div className="lg:col-span-4 lg:col-start-2">
            <CinematicCopy frame={frame} />
          </div>
          <div className="lg:col-span-6 aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-white/[0.08]">
            <CinematicImage
              src={frame.image.src}
              alt={frame.image.alt}
              objectPosition={frame.image.objectPosition}
              caption={frame.image.caption}
            />
          </div>
        </div>
      </div>
    );
  }

  // FRAME 06: Wide terrace / ocean composition, very little copy
  if (frame.layout === "terrace-wide") {
    return (
      <div
        className={`relative h-full w-full flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-18 ${className}`}
      >
        <div className="absolute inset-0 z-0">
          <CinematicImage
            src={frame.image.src}
            alt={frame.image.alt}
            objectPosition={frame.image.objectPosition}
            caption={frame.image.caption}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0c0d]/90 via-[#0a0c0d]/25 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-lg mt-auto">
          <CinematicCopy frame={frame} />
        </div>
      </div>
    );
  }

  // FRAME 07: Final statement, extremely minimal, substantial empty space
  return (
    <div
      className={`relative h-full w-full flex items-center justify-center p-6 sm:p-10 md:p-14 lg:p-18 ${className}`}
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <CinematicImage
          src={frame.image.src}
          alt={frame.image.alt}
          objectPosition={frame.image.objectPosition}
        />
        <div className="absolute inset-0 bg-[#0a0c0d]/85 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <CinematicCopy frame={frame} />
      </div>
    </div>
  );
};
