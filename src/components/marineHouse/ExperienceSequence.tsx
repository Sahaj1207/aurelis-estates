import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { marineHouseContent } from "../../data/marineHouseContent";

export const ExperienceSequence: React.FC = () => {
  const { experience } = marineHouseContent;
  const [activeIndex, setActiveIndex] = useState(0);
  const isMounted = useRef(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const activeZone = experience.zones[activeIndex] ?? experience.zones[0];

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    imageRefs.current.forEach((img, idx) => {
      if (!img) return;
      const isActive = idx === activeIndex;

      if (!isMounted.current) {
        gsap.set(img, {
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 1.025,
          zIndex: isActive ? 2 : 1,
        });
      } else {
        if (isActive) {
          gsap.to(img, {
            opacity: 1,
            scale: 1,
            duration: prefersReducedMotion ? 0.2 : 0.65,
            ease: "power2.out",
            overwrite: "auto",
            zIndex: 2,
          });
        } else {
          gsap.to(img, {
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.025,
            duration: prefersReducedMotion ? 0.2 : 0.65,
            ease: "power2.out",
            overwrite: "auto",
            zIndex: 1,
          });
        }
      }
    });

    isMounted.current = true;
  }, [activeIndex]);

  useEffect(() => {
    const currentImages = imageRefs.current;
    return () => {
      currentImages.forEach((img) => {
        if (img) gsap.killTweensOf(img);
      });
    };
  }, []);

  return (
    <section
      data-monograph-section
      aria-label="The Private Experience"
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Animated Top Section Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-full h-[1px] bg-white/[0.08] origin-left mb-16 md:mb-20"
        />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div>
            <span
              data-reveal="eyebrow"
              className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-4"
            >
              {experience.eyebrow}
            </span>
            <h2
              data-reveal="heading"
              className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.08]"
            >
              {experience.title}
            </h2>
          </div>
          <p
            data-reveal="copy"
            className="max-w-[36ch] text-[13.5px] md:text-[14px] font-light text-[#c8c2b5]/80 leading-relaxed tracking-[0.01em]"
          >
            {experience.description}
          </p>
        </div>

        {/* Animated Mid-section Hairline Divider */}
        <div
          data-reveal="divider"
          className="w-full h-[1px] bg-white/[0.08] my-10 md:my-14 origin-left"
        />

        {/* Spatial Progression Interactive Monograph Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 md:pt-16 items-start">
          {/* Architectural Zone List */}
          <div
            role="tablist"
            aria-label="Residence Zones"
            className="lg:col-span-5 flex flex-col divide-y divide-white/[0.08] border-t border-b border-white/[0.08]"
          >
            {experience.zones.map((zone, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div key={zone.id} data-reveal="spec" className="w-full">
                  <button
                    type="button"
                    role="tab"
                    id={`zone-tab-${zone.id}`}
                    aria-selected={isActive}
                    aria-controls="zone-preview-panel"
                    tabIndex={0}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    className={`w-full group text-left py-6 sm:py-8 transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] ${
                      isActive
                        ? "opacity-100 bg-white/[0.02] pl-3 -ml-3 sm:pl-4 sm:-ml-4 border-l-2 border-[#dfd7c6]"
                        : "opacity-45 hover:opacity-85 pl-0 border-l-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <span
                        className={`text-[10px] font-mono tracking-[0.22em] transition-colors duration-300 ${
                          isActive ? "text-[#dfd7c6]" : "text-[#dfd7c6]/70 group-hover:text-[#dfd7c6]"
                        }`}
                      >
                        ZONE {zone.number}
                      </span>
                      <span
                        className={`text-[9px] tracking-[0.24em] uppercase transition-colors duration-300 ${
                          isActive ? "text-[#c8c2b5]/85" : "text-[#c8c2b5]/45 group-hover:text-[#c8c2b5]/75"
                        }`}
                      >
                        {zone.aspect}
                      </span>
                    </div>
                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl font-light font-serif tracking-[0.02em] transition-colors duration-300 ${
                        isActive ? "text-[#f6f6f4]" : "text-[#c8c2b5]/80 group-hover:text-[#f6f6f4]"
                      }`}
                    >
                      {zone.name}
                    </h3>
                    <p
                      className={`text-[12.5px] font-light leading-relaxed mt-2.5 max-w-[38ch] transition-colors duration-300 ${
                        isActive ? "text-[#c8c2b5]" : "text-[#c8c2b5]/65 group-hover:text-[#c8c2b5]/85"
                      }`}
                    >
                      {zone.description}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Dynamic Architectural Plate corresponding to focused zone */}
          <div className="lg:col-span-7 lg:sticky lg:top-16">
            <div
              id="zone-preview-panel"
              role="tabpanel"
              aria-labelledby={`zone-tab-${activeZone.id}`}
              data-reveal="image"
              className="relative overflow-hidden bg-[#121517] aspect-[4/3] sm:aspect-[16/11] border border-white/[0.08]"
            >
              {experience.zones.map((zone, idx) => (
                <img
                  key={zone.id}
                  ref={(el) => {
                    imageRefs.current[idx] = el;
                  }}
                  src={zone.image}
                  alt={`${zone.name} / ${zone.aspect}`}
                  className="absolute inset-0 h-full w-full object-cover object-center will-change-transform will-change-opacity pointer-events-none select-none"
                  style={{
                    opacity: idx === 0 ? 1 : 0,
                    transform: idx === 0 ? "scale(1)" : "scale(1.025)",
                    zIndex: idx === 0 ? 2 : 1,
                  }}
                  loading="eager"
                  decoding="async"
                />
              ))}

              <div
                data-reveal="caption"
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80 pointer-events-none transition-all duration-300"
              >
                {activeZone.name} / {activeZone.aspect}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

