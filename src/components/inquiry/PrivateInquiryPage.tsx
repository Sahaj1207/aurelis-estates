import React, { useEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToTarget } from "../../services/smoothScroll";
import { Img } from "../Img";

gsap.registerPlugin(ScrollTrigger);

interface PrivateInquiryPageProps {
  onBack: () => void;
  onNavigate?: (path: string) => void;
}

export const PrivateInquiryPage: React.FC<PrivateInquiryPageProps> = ({
  onBack,
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Scroll to top immediately on mount
  useEffect(() => {
    scrollToTarget(0, { immediate: true });
  }, []);

  // Entrance reveal animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !pageRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const page = pageRef.current;
      if (!page) return;

      const nav = page.querySelector(".inquiry-page-nav");
      const eyebrow = page.querySelector(".inquiry-page-eyebrow");
      const headline = page.querySelector(".inquiry-page-headline");
      const body = page.querySelector(".inquiry-page-body");
      const actions = page.querySelector(".inquiry-page-actions");
      const imageWrapper = page.querySelector(".inquiry-page-image-wrapper");
      const img = imageRef.current;
      const meta = page.querySelector(".inquiry-page-meta");

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      if (nav) {
        tl.fromTo(nav, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6 });
      }

      if (eyebrow) {
        tl.fromTo(
          eyebrow,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        );
      }

      if (headline) {
        tl.fromTo(
          headline,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" },
          "-=0.5"
        );
      }

      if (body) {
        tl.fromTo(
          body,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
      }

      if (actions) {
        tl.fromTo(
          actions,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.5"
        );
      }

      if (imageWrapper && img) {
        tl.fromTo(
          imageWrapper,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.5"
        );
        tl.fromTo(
          img,
          { scale: 1.03 },
          { scale: 1.0, duration: 1.2 },
          "<"
        );
      }

      if (meta) {
        tl.fromTo(
          meta,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.4"
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleRequestIntroduction = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href =
      "mailto:privateoffice@aurelis-estates.com?subject=AURELIS%20Estates%20Private%20Introduction";
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-[#0a0c0d] text-[#f6f6f4] selection:bg-[#dfd7c6] selection:text-[#0a0c0d]"
    >
      {/* 1. Header / Navigation Bar */}
      <header className="inquiry-page-nav sticky top-0 z-30 w-full bg-[#0a0c0d]/90 backdrop-blur-md border-b border-white/[0.07] px-6 sm:px-8 md:px-12 lg:px-16 py-5 md:py-6">
        <div className="mx-auto max-w-[1720px] flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Return to overview"
            className="group inline-flex items-center gap-2.5 text-[10.5px] sm:text-[11px] font-medium tracking-[0.24em] uppercase text-[#c8c2b5] transition-colors hover:text-[#dfd7c6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
          >
            <ArrowLeft
              size={14}
              weight="regular"
              className="transition-transform duration-300 ease-out group-hover:-translate-x-1 text-[#dfd7c6]"
            />
            <span>Return to Overview</span>
          </button>

          <div className="flex flex-col items-end">
            <span className="text-[11.5px] sm:text-[12px] font-semibold tracking-[0.28em] text-[#f6f6f4] uppercase">
              AURELIS ESTATES
            </span>
            <span className="text-[8.5px] tracking-[0.22em] text-[#c8c2b5]/50 uppercase">
              PRIVATE OFFICE
            </span>
          </div>
        </div>
      </header>

      {/* 2. Main Inquiry Monograph Content */}
      <main className="px-6 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-24 md:pt-32 pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1720px]">
          {/* Eyebrow */}
          <div className="inquiry-page-eyebrow mb-8 sm:mb-12">
            <span className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block">
              PRIVATE OFFICE
            </span>
          </div>

          {/* Two-Column Editorial Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-16 xl:gap-24 items-start">
            {/* Left Column: Heading, Narrative, Protocol, and Action */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <h1 className="inquiry-page-headline display-lg font-light font-serif tracking-[-0.015em] leading-[1.08] text-[#f6f6f4] mb-8 sm:mb-12">
                A PRIVATE CONVERSATION BEGINS HERE.
              </h1>

              <div className="inquiry-page-body space-y-6 sm:space-y-8 max-w-xl text-[14.5px] sm:text-[15.5px] md:text-[16px] text-[#c8c2b5]/80 font-light leading-[1.8] tracking-[0.01em]">
                <p>
                  Tell us what kind of residence, setting, or experience you are seeking. Our private office will respond personally.
                </p>
                <p className="text-[13.5px] sm:text-[14px] text-[#c8c2b5]/60 leading-[1.75]">
                  Private residences are introduced selectively and discussed in confidence. Discussions regarding acquisitions, commissions, and private viewings are conducted under non-disclosure upon request.
                </p>
              </div>

              {/* Primary Action Button */}
              <div className="inquiry-page-actions mt-10 sm:mt-14 pt-8 border-t border-white/[0.08] w-full flex flex-col sm:flex-row sm:items-center gap-6">
                <a
                  href="mailto:privateoffice@aurelis-estates.com?subject=AURELIS%20Estates%20Private%20Introduction"
                  onClick={handleRequestIntroduction}
                  aria-label="Request an introduction with AURELIS Private Office"
                  className="group inline-flex items-center justify-between sm:justify-start gap-4 border border-white/20 bg-white/[0.02] px-6 py-4 text-[11px] sm:text-[11.5px] font-medium tracking-[0.24em] uppercase text-[#f6f6f4] transition-all duration-300 hover:border-[#dfd7c6] hover:bg-[#dfd7c6] hover:text-[#0a0c0d] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] active:scale-[0.98]"
                >
                  <span>REQUEST AN INTRODUCTION</span>
                  <ArrowUpRight
                    size={14}
                    weight="regular"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center text-[10.5px] tracking-[0.22em] uppercase text-[#c8c2b5]/70 hover:text-[#dfd7c6] transition-colors py-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
                >
                  <span>Return to Residences</span>
                </button>
              </div>

              {/* Protocol Metadata */}
              <div className="inquiry-page-meta mt-12 sm:mt-16 flex flex-col gap-1.5 text-[10px] tracking-[0.26em] uppercase text-[#c8c2b5]/60">
                <span className="text-[#f6f6f4] font-medium tracking-[0.28em]">
                  PRIVATE OFFICE
                </span>
                <span>MUMBAI / INDIA</span>
                <span className="text-[#dfd7c6]/75 mt-0.5">
                  BY APPOINTMENT
                </span>
              </div>
            </div>

            {/* Right Column: Architectural Plate */}
            <div className="lg:col-span-6 flex flex-col items-end">
              <div className="w-full lg:max-w-[95%] xl:max-w-[90%]">
                <div className="inquiry-page-image-wrapper relative overflow-hidden bg-[#141719] aspect-[4/3] sm:aspect-[16/11]">
                  <Img
                    ref={imageRef}
                    src="/images/marine-house-terrace.webp"
                    alt="Twilight reflection pool and travertine architecture of contemporary private residence"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.025]"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between text-[9.5px] sm:text-[10px] tracking-[0.24em] uppercase text-[#c8c2b5]/50">
                  <span>MUMBAI COASTAL MONOGRAPH</span>
                  <span>PRIVATE APPOINTMENT ONLY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Colophon Footer */}
      <footer className="w-full bg-[#0a0c0d] border-t border-white/[0.07] px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="mx-auto max-w-[1720px] flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/45">
          <div className="flex flex-col gap-1">
            <span className="text-[#f6f6f4] font-medium tracking-[0.26em]">
              AURELIS ESTATES
            </span>
            <span>PRIVATE OFFICE / MUMBAI</span>
          </div>

          <div className="flex items-center gap-6">
            <span>PORTFOLIO EDITION 2026</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>ALL INQUIRIES STRICTLY CONFIDENTIAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
