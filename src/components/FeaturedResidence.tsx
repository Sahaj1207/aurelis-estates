import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { FeaturedResidenceData } from "../data/estateContent";
import { Img } from "./Img";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedResidenceProps {
  data: FeaturedResidenceData;
  onNavigate?: (href: string) => void;
}

export const FeaturedResidence: React.FC<FeaturedResidenceProps> = ({
  data,
  onNavigate,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Coordinated Timeline adhering to the exact motion hierarchy:
      // 1. Image reveal
      // 2. Property title reveal
      // 3. Supporting copy reveal
      // 4. Metadata reveal
      // 5. CTA reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      // 1. Image reveal (subtle mask expand + scale settle)
      if (imageWrapRef.current && imageRef.current) {
        tl.fromTo(
          imageWrapRef.current,
          { clipPath: "inset(0 0 10% 0)", opacity: 0.8 },
          { clipPath: "inset(0 0 0% 0)", opacity: 1, duration: 1.8, ease: "power2.out" },
          0
        );

        tl.fromTo(
          imageRef.current,
          { scale: 1.06 },
          { scale: 1.0, duration: 2.2, ease: "power2.out" },
          0
        );

        // Very subtle scroll parallax
        gsap.to(imageRef.current, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      // 2. Property title reveal
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          0.3
        );
      }

      // 3. Supporting copy reveal
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.5
        );
      }

      // 4. Metadata reveal (staggered)
      if (metadataRef.current) {
        tl.fromTo(
          metadataRef.current.querySelectorAll(".meta-spec-item"),
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          0.7
        );
      }

      // 5. CTA reveal
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          0.9
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(data.cta.href);
    }
  };

  return (
    <section
      id="residences"
      ref={sectionRef}
      aria-label={`${data.property} Featured Residence Presentation`}
      className="relative z-20 bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 pt-20 md:pt-32 lg:pt-36 pb-24 md:pb-36 border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Section Marker: Establishing editorial sequencing */}
        <div className="flex items-baseline justify-between border-b border-white/[0.07] pb-5 mb-10 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/90 font-sans">
              {data.marker}
            </span>
          </div>
          <span className="text-[9.5px] md:text-[10px] tracking-[0.24em] uppercase text-[#c8c2b5]/40 font-sans hidden sm:inline-block">
            Architectural Monograph / Volume 01
          </span>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* 1. Large Architectural Photograph Plate (Desktop: 7-8 cols / Mobile: order-1) */}
          <div className="order-1 lg:order-2 lg:col-span-7 xl:col-span-8 w-full">
            <div
              ref={imageWrapRef}
              className="group relative w-full overflow-hidden bg-[#121517] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10] border border-white/[0.08]"
            >
              <Img
                ref={imageRef}
                src={data.image.src}
                alt={data.image.alt}
                className="h-full w-full object-cover object-center will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Ultra-fine analog film grain without dark overlays */}
              <div className="absolute inset-0 grain-overlay opacity-20 mix-blend-overlay pointer-events-none" />

              {/* Understated Plate Caption Indicator */}
              {data.image.architecturalCropLabel && (
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-6 z-10 flex items-center gap-2.5 pointer-events-none">
                  <span className="h-[1px] w-5 bg-[#dfd7c6]/60" />
                  <span className="text-[9px] md:text-[9.5px] tracking-[0.24em] uppercase text-[#f6f6f4]/80 font-sans">
                    {data.image.architecturalCropLabel}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Editorial Typography & Metadata Block (Desktop: 5-4 cols / Mobile: order-2) */}
          <div className="order-2 lg:order-1 lg:col-span-5 xl:col-span-4 flex flex-col justify-between h-full w-full lg:pt-2">
            <div className="flex flex-col">
              {/* Property Title (Mobile: order-1 / Desktop: order-2) */}
              <h3
                ref={titleRef}
                className="order-1 lg:order-2 display-md font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[0.98] mb-4 lg:mb-6"
              >
                {data.property}
              </h3>

              {/* Location Tag (Mobile: order-2 / Desktop: order-1) */}
              <div className="order-2 lg:order-1 mb-4 lg:mb-3.5">
                <span className="text-[10px] md:text-[10.5px] font-medium tracking-[0.28em] uppercase text-[#dfd7c6] font-sans">
                  {data.location}
                </span>
              </div>

              {/* Property Narrative Description (Mobile: order-3 / Desktop: order-3) */}
              <p
                ref={descRef}
                className="order-3 text-[13.5px] sm:text-[14px] md:text-[14.5px] font-light leading-[1.7] text-[#c8c2b5]/90 font-sans max-w-[38ch] mb-8 lg:mb-10"
              >
                {data.description}
              </p>

              {/* Property Metadata Index (Mobile: order-4 / Desktop: order-4) */}
              <div
                ref={metadataRef}
                className="order-4 border-t border-white/[0.08] pt-6 mb-8 lg:mb-10"
              >
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:gap-x-8">
                  {data.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="meta-spec-item border-l border-white/[0.08] pl-3.5 py-0.5"
                    >
                      <span className="text-[9px] tracking-[0.24em] text-[#c8c2b5]/50 uppercase font-sans block">
                        {spec.label}
                      </span>
                      <span className="text-[12px] sm:text-[12.5px] text-[#f6f6f4] tracking-[0.16em] uppercase font-sans font-medium mt-0.5 block">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Action CTA (Mobile: order-5 / Desktop: order-5) */}
              <div ref={ctaRef} className="order-5 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a
                  href={data.cta.href}
                  onClick={handleCtaClick}
                  className="group relative inline-flex items-center justify-between gap-6 overflow-hidden border border-white/20 bg-white/[0.02] px-6 py-3.5 text-[11px] font-medium tracking-[0.24em] uppercase text-[#f6f6f4] transition-all duration-300 ease-out hover:border-[#dfd7c6] hover:bg-[#dfd7c6] hover:text-[#0a0c0d] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] active:scale-[0.98]"
                >
                  <span className="relative z-10">{data.cta.label}</span>
                  <ArrowUpRight
                    size={14}
                    weight="regular"
                    className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href="/residences/the-marine-house/tour"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate("/residences/the-marine-house/tour");
                    }
                  }}
                  className="group inline-flex items-center gap-2.5 py-2 text-[11px] font-medium tracking-[0.24em] uppercase text-[#dfd7c6] transition-colors duration-300 hover:text-[#f6f6f4]"
                >
                  <span className="border-b border-[#dfd7c6]/40 pb-1 transition-colors duration-300 group-hover:border-[#f6f6f4]">
                    Walk the residence in 3D
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
