import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PrivateInquirySectionProps {
  onNavigate?: (path: string) => void;
}

export const PrivateInquirySection: React.FC<PrivateInquirySectionProps> = ({
  onNavigate,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const marker = section.querySelector(".inquiry-marker");
      const headlineLines = section.querySelectorAll(".inquiry-headline-line span");
      const supportingCopy = section.querySelector(".inquiry-copy");
      const cta = section.querySelector(".inquiry-cta");
      const imageWrapper = section.querySelector(".inquiry-image-wrapper");
      const img = imageRef.current;
      const metaBlock = section.querySelector(".inquiry-meta-block");
      const caption = section.querySelector(".inquiry-image-caption");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // 1. Section label reveal
      if (marker) {
        tl.fromTo(
          marker,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" }
        );
      }

      // 2. Main headline line-by-line reveal
      if (headlineLines.length > 0) {
        tl.fromTo(
          headlineLines,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.45"
        );
      }

      // 3. Supporting paragraph
      if (supportingCopy) {
        tl.fromTo(
          supportingCopy,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
          "-=0.6"
        );
      }

      // 4. CTA reveal
      if (cta) {
        tl.fromTo(
          cta,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" },
          "-=0.5"
        );
      }

      // 5. Image reveal & subtle scale settle (1.04 -> 1.0)
      if (imageWrapper && img) {
        tl.fromTo(
          imageWrapper,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" },
          "-=0.6"
        );
        tl.fromTo(
          img,
          { scale: 1.04 },
          { scale: 1.0, duration: 1.35, ease: "power2.out" },
          "<"
        );
      }

      // 6. Metadata block & caption
      const secondaryElements = [metaBlock, caption].filter(Boolean);
      if (secondaryElements.length > 0) {
        tl.fromTo(
          secondaryElements,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("/inquiry");
    } else {
      window.location.assign("/inquiry");
    }
  };

  return (
    <section
      id="inquiry"
      ref={sectionRef}
      aria-label="AURELIS Private Inquiry"
      className="relative z-20 bg-[#0a0c0d] text-[#f6f6f4] px-6 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-20 sm:pb-28 md:pb-36 border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Section Marker */}
        <div className="mb-10 sm:mb-14 md:mb-20">
          <span className="inquiry-marker text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block">
            07 / PRIVATE INQUIRY
          </span>
        </div>

        {/* Asymmetric Monograph Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-12 xl:gap-20 items-start">
          {/* Left Wing: Dominant Headline, Narrative Copy, and Text CTA (Cols 1-6) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            {/* Dominant Editorial Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.75rem] font-light font-serif tracking-[-0.015em] leading-[1.08] text-[#f6f6f4]">
              <span className="inquiry-headline-line block overflow-hidden">
                <span className="block">A RESIDENCE THIS</span>
              </span>
              <span className="inquiry-headline-line block overflow-hidden">
                <span className="block">DISTINCTIVE DESERVES</span>
              </span>
              <span className="inquiry-headline-line block overflow-hidden">
                <span className="block">A PRIVATE</span>
              </span>
              <span className="inquiry-headline-line block overflow-hidden">
                <span className="block">CONVERSATION.</span>
              </span>
            </h2>

            {/* Narrative & Action Block with Generous Negative Space */}
            <div className="mt-12 sm:mt-16 md:mt-24 lg:mt-32 flex flex-col items-start max-w-xl">
              <p className="inquiry-copy text-[14.5px] sm:text-[15.5px] md:text-[16px] text-[#c8c2b5]/80 font-light leading-[1.78] tracking-[0.01em] mb-10 sm:mb-12">
                Private residences are introduced selectively and discussed in confidence. Tell us what you are looking for, and we will begin there.
              </p>

              {/* Refined Text-Based Primary Action */}
              <div className="inquiry-cta">
                <a
                  href="/inquiry"
                  onClick={handleCtaClick}
                  aria-label="Begin private inquiry with AURELIS Estates"
                  className="group inline-flex items-center text-[11px] sm:text-[11.5px] md:text-[12px] font-medium tracking-[0.24em] uppercase text-[#f6f6f4] transition-colors hover:text-[#dfd7c6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] py-2"
                >
                  <span className="relative pb-1 border-b border-white/25 transition-all duration-300 ease-out group-hover:border-[#dfd7c6]">
                    BEGIN PRIVATE INQUIRY
                  </span>
                  <ArrowUpRight
                    size={15}
                    weight="regular"
                    className="ml-2.5 text-[#dfd7c6] transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

              {/* Quiet Supporting Metadata on Mobile / Tablet */}
              <div className="inquiry-meta-block lg:hidden mt-14 pt-8 border-t border-white/[0.08] w-full flex flex-col gap-1.5 text-[10px] tracking-[0.26em] uppercase text-[#c8c2b5]/60">
                <span className="text-[#f6f6f4] font-medium tracking-[0.28em]">
                  PRIVATE OFFICE
                </span>
                <span>MUMBAI / INDIA</span>
                <span className="text-[#dfd7c6]/75 mt-0.5">
                  BY APPOINTMENT
                </span>
              </div>
            </div>
          </div>

          {/* Right Wing: Large Asymmetric Architectural Plate & Quiet Metadata (Cols 7-12) */}
          <div className="lg:col-span-6 flex flex-col items-end">
            <div className="w-full lg:max-w-[95%] xl:max-w-[90%]">
              {/* Image Frame with Overflow Hidden for Clip & Hover Scale */}
              <div className="inquiry-image-wrapper relative overflow-hidden bg-[#141719] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/11]">
                <img
                  ref={imageRef}
                  src="/images/the-cliff-residence.jpg"
                  alt="Monolithic stone and glass residence overlooking the sea at twilight"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.025]"
                  loading="lazy"
                />
              </div>

              {/* Plate Footnote & Quiet Desktop Metadata */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <span className="inquiry-image-caption text-[9.5px] sm:text-[10px] tracking-[0.24em] uppercase text-[#c8c2b5]/50 font-sans">
                  AURELIS ESTATES / PRIVATE OFFICE
                </span>

                <div className="inquiry-meta-block hidden lg:flex flex-col items-end gap-1 text-[10px] tracking-[0.26em] uppercase text-[#c8c2b5]/60 text-right">
                  <span className="text-[#f6f6f4] font-medium tracking-[0.28em]">
                    PRIVATE OFFICE
                  </span>
                  <span>MUMBAI / INDIA</span>
                  <span className="text-[#dfd7c6]/75 mt-0.5">
                    BY APPOINTMENT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
