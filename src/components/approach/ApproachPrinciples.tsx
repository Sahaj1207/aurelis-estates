import React from "react";
import { approachContent } from "./approachData";

export const ApproachPrinciples: React.FC = () => {
  const { principles } = approachContent;

  return (
    <div className="approach-principles-container mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="flex flex-col">
        {principles.map((principle) => {
          const isRight = principle.alignment === "right";

          return (
            <div
              key={principle.id}
              className="approach-principle-row relative py-14 sm:py-18 md:py-22 lg:py-24"
            >
              {/* Animated Hairline Rule */}
              <div className="approach-principle-line absolute top-0 left-0 right-0 h-[1px] bg-white/[0.07] origin-left" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Asymmetric Alternating Layout */}
                {isRight ? (
                  <>
                    {/* Image Column Left on Desktop for Principle 02 & 04 */}
                    <div className="lg:col-span-5 order-2 lg:order-1">
                      <div
                        className={`approach-principle-image-wrapper relative overflow-hidden bg-[#121517] ${principle.image.aspectRatio} border border-white/[0.08] max-w-lg group`}
                      >
                        <img
                          src={principle.image.src}
                          alt={principle.image.alt}
                          className="approach-principle-image h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                          loading="lazy"
                        />
                        <div className="absolute bottom-3 left-3 bg-[#0a0c0d]/85 backdrop-blur-md px-3 py-1.5 border border-white/[0.08] text-[8.5px] tracking-[0.22em] uppercase text-[#c8c2b5]/80 pointer-events-none">
                          {principle.image.caption}
                        </div>
                      </div>
                    </div>

                    {/* Text Column Right on Desktop */}
                    <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-4 xl:pl-8">
                      <div className="flex items-center gap-3 text-[10px] tracking-[0.28em] text-[#dfd7c6]/70 uppercase font-mono mb-3">
                        <span className="approach-principle-number">
                          PRINCIPLE {principle.number}
                        </span>
                      </div>
                      <h3 className="approach-principle-title text-3xl sm:text-4xl md:text-5xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.05] mb-5">
                        {principle.name}
                      </h3>
                      <p className="approach-principle-statement text-xl sm:text-2xl md:text-[1.65rem] font-light font-serif text-[#f6f6f4] tracking-[-0.01em] leading-[1.25] mb-4">
                        {principle.statement}
                      </p>
                      <p className="approach-principle-body max-w-[38ch] text-[13.5px] md:text-[14.5px] font-light text-[#c8c2b5]/80 leading-[1.75] tracking-[0.01em] font-sans">
                        {principle.supportingCopy}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Text Column Left on Desktop for Principle 01 & 03 */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 text-[10px] tracking-[0.28em] text-[#dfd7c6]/70 uppercase font-mono mb-3">
                        <span className="approach-principle-number">
                          PRINCIPLE {principle.number}
                        </span>
                      </div>
                      <h3 className="approach-principle-title text-3xl sm:text-4xl md:text-5xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.05] mb-5">
                        {principle.name}
                      </h3>
                      <p className="approach-principle-statement text-xl sm:text-2xl md:text-[1.65rem] font-light font-serif text-[#f6f6f4] tracking-[-0.01em] leading-[1.25] mb-4">
                        {principle.statement}
                      </p>
                      <p className="approach-principle-body max-w-[38ch] text-[13.5px] md:text-[14.5px] font-light text-[#c8c2b5]/80 leading-[1.75] tracking-[0.01em] font-sans">
                        {principle.supportingCopy}
                      </p>
                    </div>

                    {/* Image Column Right on Desktop */}
                    <div className="lg:col-span-5">
                      <div
                        className={`approach-principle-image-wrapper relative overflow-hidden bg-[#121517] ${principle.image.aspectRatio} border border-white/[0.08] max-w-lg group`}
                      >
                        <img
                          src={principle.image.src}
                          alt={principle.image.alt}
                          className="approach-principle-image h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                          loading="lazy"
                        />
                        <div className="absolute bottom-3 left-3 bg-[#0a0c0d]/85 backdrop-blur-md px-3 py-1.5 border border-white/[0.08] text-[8.5px] tracking-[0.22em] uppercase text-[#c8c2b5]/80 pointer-events-none">
                          {principle.image.caption}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
