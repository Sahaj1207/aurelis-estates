import React, { useEffect, useRef } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToTarget } from "../../services/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

interface FooterSectionProps {
  onNavigate?: (path: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate }) => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !footerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const footer = footerRef.current;
      if (!footer) return;

      const brandTitle = footer.querySelector(".footer-brand-title");
      const statementLines = footer.querySelectorAll(".footer-statement-line span");
      const brandSig = footer.querySelector(".footer-brand-sig");
      const navHeader = footer.querySelector(".footer-nav-header");
      const navLinks = footer.querySelectorAll(".footer-nav-item");
      const officeMeta = footer.querySelector(".footer-office-meta");
      const backToTop = footer.querySelector(".footer-back-to-top");
      const divider = footer.querySelector(".footer-divider");
      const bottomBar = footer.querySelector(".footer-bottom-bar");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // 1. Brand mark reveals subtly
      if (brandTitle) {
        tl.fromTo(
          brandTitle,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }

      // 2. Main closing typography reveals line-by-line
      if (statementLines.length > 0) {
        tl.fromTo(
          statementLines,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }

      // Brand signature subtitle
      if (brandSig) {
        tl.fromTo(
          brandSig,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        );
      }

      // 3. Navigation label and links reveal with small stagger
      if (navHeader) {
        tl.fromTo(
          navHeader,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.6"
        );
      }

      if (navLinks.length > 0) {
        tl.fromTo(
          navLinks,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      // 4. Private office metadata fades upward
      if (officeMeta) {
        tl.fromTo(
          officeMeta,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Back to top trigger
      if (backToTop) {
        tl.fromTo(
          backToTop,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
          "-=0.4"
        );
      }

      // 5. Bottom rule draws from left to right
      if (divider) {
        tl.fromTo(
          divider,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
          "-=0.3"
        );
      }

      // 6. Copyright metadata appears last
      if (bottomBar) {
        tl.fromTo(
          bottomBar,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "/inquiry") {
      e.preventDefault();
      if (onNavigate) {
        onNavigate("/inquiry");
      } else {
        window.location.assign("/inquiry");
      }
    } else if (href === "/about") {
      e.preventDefault();
      if (onNavigate) {
        onNavigate("/about");
      } else {
        window.location.assign("/about");
      }
    } else if (href.startsWith("#")) {
      e.preventDefault();
      scrollToTarget(href, { duration: 1.15 });
    }
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget(0, { duration: 1.2 });
  };

  const navItems = [
    { label: "RESIDENCES", href: "#residences" },
    { label: "COLLECTIONS", href: "#collections" },
    { label: "ABOUT", href: "/about" },
    { label: "JOURNAL", href: "#journal" },
    { label: "PRIVATE INQUIRY", href: "/inquiry" },
  ];

  return (
    <footer
      id="colophon"
      ref={footerRef}
      aria-label="AURELIS Estates Monograph Footer"
      className="relative z-20 w-full bg-[#0a0c0d] text-[#f6f6f4] px-6 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-32 md:pt-36 lg:pt-44 pb-12 sm:pb-16 border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Main Monograph Spread: Asymmetric Multi-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-12 xl:gap-20 items-start">
          {/* Left Side: Brand Closing Identity (Cols 1-7 on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Primary Signature Title */}
            <div className="footer-brand-title mb-8 sm:mb-10">
              <span className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] font-light tracking-[-0.015em] leading-[1.08] text-[#f6f6f4] block">
                AURELIS<br />
                ESTATES.
              </span>
            </div>

            {/* Secondary Editorial Statement */}
            <div className="text-xl sm:text-2xl md:text-[1.75rem] lg:text-[2rem] font-serif font-light text-[#c8c2b5]/90 tracking-[-0.01em] leading-[1.25] mb-8 sm:mb-12">
              <div className="footer-statement-line overflow-hidden">
                <span className="block">PRIVATE RESIDENCES.</span>
              </div>
              <div className="footer-statement-line overflow-hidden">
                <span className="block text-[#dfd7c6]/85">CONSIDERED LIVING.</span>
              </div>
            </div>

            {/* Small Brand Signature Line */}
            <div className="footer-brand-sig flex flex-col gap-1 text-[9.5px] sm:text-[10px] tracking-[0.28em] uppercase text-[#c8c2b5]/50 font-sans">
              <span className="text-[#f6f6f4]/80 font-medium">AURELIS ESTATES</span>
              <span>PRIVATE RESIDENCES</span>
            </div>
          </div>

          {/* Right Side: Navigation & Private Office Information (Cols 8-12 on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2 lg:pt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8 lg:gap-12 items-start">
              {/* Navigation Column */}
              <div className="flex flex-col items-start">
                <span className="footer-nav-header text-[9.5px] sm:text-[10px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/80 block mb-5 sm:mb-6">
                  NAVIGATION
                </span>
                <nav aria-label="Footer Navigation" className="flex flex-col gap-3.5 sm:gap-4">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="footer-nav-item group relative inline-flex items-center text-[11px] sm:text-[11.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/75 transition-colors duration-300 hover:text-[#dfd7c6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] py-0.5"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#dfd7c6] transition-all duration-300 ease-out group-hover:w-full" />
                      </span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Private Office Information Column */}
              <div className="footer-office-meta flex flex-col items-start text-[10px] sm:text-[10.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/60">
                <span className="text-[#f6f6f4] font-medium tracking-[0.28em] mb-1.5 block">
                  PRIVATE OFFICE
                </span>
                <span className="block text-[#c8c2b5]/70 mb-1">MUMBAI / INDIA</span>
                <span className="text-[#dfd7c6]/80 mt-1.5 block">BY APPOINTMENT</span>
                
                <p className="normal-case tracking-normal text-[12px] sm:text-[12.5px] text-[#c8c2b5]/45 font-light leading-[1.65] mt-6 max-w-[28ch]">
                  Discussions conducted under strict non-disclosure upon request.
                </p>
              </div>
            </div>

            {/* Back to Top Interactive Trigger */}
            <div className="footer-back-to-top mt-12 sm:mt-16 lg:mt-24 flex justify-start sm:justify-end">
              <button
                type="button"
                onClick={handleScrollToTop}
                aria-label="Back to top of overview"
                className="group inline-flex items-center gap-2.5 text-[10.5px] sm:text-[11px] font-medium tracking-[0.26em] uppercase text-[#c8c2b5] transition-colors duration-300 hover:text-[#dfd7c6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] py-1"
              >
                <span className="relative pb-0.5 border-b border-transparent transition-all duration-300 group-hover:border-[#dfd7c6]">
                  BACK TO TOP
                </span>
                <ArrowUp
                  size={14}
                  weight="regular"
                  className="text-[#dfd7c6] transition-transform duration-300 ease-out group-hover:-translate-y-1"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Thin Editorial Rule */}
        <div className="footer-divider mt-16 sm:mt-20 md:mt-24 h-[1px] w-full bg-white/[0.07]" />

        {/* Bottom Bar: Quiet Copyright & Location Metadata */}
        <div className="footer-bottom-bar mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[9px] sm:text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/40 font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <span>© 2026 AURELIS ESTATES</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/20" />
            <span>PRIVATE RESIDENCES</span>
          </div>

          <div className="flex items-center gap-4 text-[#c8c2b5]/40">
            <span>MUMBAI / INDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
