import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ArrowUpRight } from "@phosphor-icons/react";
import type { NavItem } from "../data/estateContent";
import { scrollToTarget, getLenis } from "../services/smoothScroll";

interface NavigationProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  inquiryAction: {
    label: string;
    href: string;
  };
  isScrolled?: boolean;
  onNavigate?: (path: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  isOpen,
  onClose,
  inquiryAction,
  isScrolled = false,
  onNavigate,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const headerBarRef = useRef<HTMLDivElement>(null);
  const indexLabelRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [prevOpen, setPrevOpen] = useState(isOpen);

  // Synchronize rendering lifecycle when isOpen prop changes during render
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setIsRendered(true);
    }
  }

  // Reset closing flag whenever menu becomes open
  useEffect(() => {
    if (isOpen) {
      isClosingRef.current = false;
    }
  }, [isOpen]);

  // Elegant GSAP close sequence
  const animateClose = React.useCallback((callback?: () => void) => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !sheetRef.current) {
      isClosingRef.current = false;
      setIsRendered(false);
      onClose();
      if (callback) callback();
      return;
    }

    const linkLabels = linksContainerRef.current?.querySelectorAll(".nav-link-label");
    const linkIndices = linksContainerRef.current?.querySelectorAll(".nav-link-index");

    const closeTl = gsap.timeline({
      onComplete: () => {
        isClosingRef.current = false;
        setIsRendered(false);
        onClose();
        if (callback) callback();
      },
    });

    closeTl.to(
      [
        footerRef.current,
        linkIndices,
        linkLabels,
        indexLabelRef.current,
        headerBarRef.current,
      ].filter(Boolean),
      {
        opacity: 0,
        y: -10,
        duration: 0.22,
        stagger: 0.02,
        ease: "power2.in",
      }
    );

    closeTl.to(
      sheetRef.current,
      {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.32,
        ease: "power3.in",
      },
      "-=0.1"
    );
  }, [onClose]);

  // Lock body scroll and pause Lenis when mobile overlay is active
  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    }
    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Animate menu open sequence with canonical GSAP
  useEffect(() => {
    if (!isOpen || !isRendered || !sheetRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(sheetRef.current, { opacity: 1, clipPath: "none" });
      return;
    }

    const ctx = gsap.context(() => {
      const linkLabels = linksContainerRef.current?.querySelectorAll(".nav-link-label");
      const linkIndices = linksContainerRef.current?.querySelectorAll(".nav-link-index");
      const dividers = linksContainerRef.current?.querySelectorAll(".nav-group-rule");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 1. Navigation sheet reveals with controlled opacity and vertical clip transition
      tl.fromTo(
        sheetRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        { clipPath: "inset(0 0 0% 0)", opacity: 1, duration: 0.55, ease: "power3.inOut" }
      );

      // 2. Wordmark and close control appear first
      if (headerBarRef.current) {
        tl.fromTo(
          headerBarRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.25"
        );
      }

      // 3. NAVIGATION INDEX follows
      if (indexLabelRef.current) {
        tl.fromTo(
          indexLabelRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          "-=0.2"
        );
      }

      // Subtle horizontal rules between major groups
      if (dividers && dividers.length > 0) {
        tl.fromTo(
          dividers,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, transformOrigin: "left center", duration: 0.5, stagger: 0.05, ease: "power2.inOut" },
          "-=0.25"
        );
      }

      // 4. Navigation links stagger upward into position with subtle opacity
      if (linkLabels && linkLabels.length > 0) {
        tl.fromTo(
          linkLabels,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" },
          "-=0.35"
        );
      }

      // 5. Numerical indices follow slightly after the main labels
      if (linkIndices && linkIndices.length > 0) {
        tl.fromTo(
          linkIndices,
          { opacity: 0, x: 8 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" },
          "-=0.38"
        );
      }

      // 6. Private Inquiry appears last
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
          "-=0.2"
        );
      }
    }, sheetRef);

    return () => {
      ctx.revert();
    };
  }, [isOpen, isRendered]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isClosingRef.current) {
        animateClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, animateClose]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (window.location.pathname !== "/") {
        e.preventDefault();
        if (onNavigate) {
          onNavigate("/" + href);
        } else {
          window.location.assign("/" + href);
        }
      } else {
        e.preventDefault();
        scrollToTarget(href, { duration: 1.15 });
      }
    } else if (href.startsWith("/")) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(href);
      } else {
        window.location.assign(href);
      }
    }
  };

  const handleMobileNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    animateClose(() => {
      // Ensure Lenis and body scroll are restored before initiating smooth scroll
      document.body.style.overflow = "";
      const lenis = getLenis();
      if (lenis) lenis.start();

      if (href.startsWith("#")) {
        if (window.location.pathname !== "/") {
          if (onNavigate) {
            onNavigate("/" + href);
          } else {
            window.location.assign("/" + href);
          }
        } else {
          requestAnimationFrame(() => {
            scrollToTarget(href, { duration: 1.15 });
          });
        }
      } else if (href.startsWith("/")) {
        if (onNavigate) {
          onNavigate(href);
        } else {
          window.location.assign(href);
        }
      } else {
        window.location.assign(href);
      }
    });
  };

  return (
    <>
      {/* Desktop Navigation: Floating Architectural Index */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:flex items-center gap-8 lg:gap-11"
      >
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleLinkClick(e, item.href)}
            className={`group relative uppercase transition-colors duration-300 py-1 ${
              isScrolled
                ? "text-[10.5px] tracking-[0.26em] text-[#c8c2b5]/85 hover:text-[#f6f6f4]"
                : "text-[11px] tracking-[0.24em] text-[#c8c2b5] hover:text-[#f6f6f4]"
            }`}
          >
            <span>{item.label}</span>
            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#dfd7c6] transition-all duration-300 ease-out group-hover:w-full" />
          </a>
        ))}
      </nav>

      {/* Fullscreen Editorial Mobile Navigation Sheet */}
      {isRendered && (
        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0a0c0d] px-6 sm:px-8 py-8 md:hidden overflow-y-auto"
        >
          {/* Top Bar: Wordmark and Circular Close Control */}
          <div
            ref={headerBarRef}
            className="flex items-center justify-between border-b border-white/[0.08] pb-6"
          >
            <div className="flex flex-col">
              <span className="text-[13px] font-medium tracking-[0.28em] text-[#f6f6f4] uppercase">
                AURELIS ESTATES
              </span>
              <span className="text-[8.5px] tracking-[0.24em] text-[#c8c2b5]/70 uppercase mt-0.5">
                PRIVATE RESIDENCES
              </span>
            </div>
            <button
              type="button"
              onClick={() => animateClose()}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#f6f6f4] transition-colors hover:border-[#dfd7c6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
            >
              <X size={18} weight="light" />
            </button>
          </div>

          {/* Editorial Navigation Index Links */}
          <div ref={linksContainerRef} className="flex flex-col my-auto py-8">
            <div ref={indexLabelRef} className="pb-5">
              <span className="text-[9.5px] font-medium tracking-[0.28em] uppercase text-[#c8c2b5]/50 block">
                NAVIGATION INDEX
              </span>
            </div>

            <nav aria-label="Mobile Navigation Links" className="flex flex-col">
              {items.map((item, index) => (
                <div key={item.label} className="nav-group-rule border-b border-white/[0.08]">
                  <a
                    href={item.href}
                    onClick={(e) => handleMobileNavClick(e, item.href)}
                    className="group flex items-baseline justify-between py-5 sm:py-6 text-3xl sm:text-4xl font-light font-serif text-[#f6f6f4] tracking-[-0.01em] transition-colors duration-300 hover:text-[#dfd7c6]"
                  >
                    <span className="nav-link-label transition-transform duration-300 group-hover:translate-x-1.5">
                      {item.label.toUpperCase()}
                    </span>
                    <span className="nav-link-index font-sans text-[11px] font-normal tracking-[0.24em] text-[#c8c2b5]/50 group-hover:text-[#dfd7c6] transition-colors duration-300">
                      0{index + 1}
                    </span>
                  </a>
                </div>
              ))}
            </nav>
          </div>

          {/* Restrained Bottom Action and Portfolio Meta */}
          <div ref={footerRef} className="flex flex-col gap-6 pt-6 border-t border-white/[0.08]">
            <a
              href={inquiryAction.href}
              onClick={(e) => handleMobileNavClick(e, inquiryAction.href)}
              className="flex items-center justify-between border border-[#dfd7c6]/40 bg-[#dfd7c6]/5 px-6 py-4 text-[10.5px] font-medium uppercase tracking-[0.24em] text-[#f6f6f4] transition-all duration-300 hover:border-[#dfd7c6] hover:bg-[#dfd7c6]/15 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
            >
              <span>{inquiryAction.label}</span>
              <ArrowUpRight size={14} weight="regular" className="text-[#dfd7c6]" />
            </a>
            <div className="flex items-center justify-between text-[9px] tracking-[0.22em] text-[#c8c2b5]/40 uppercase">
              <span>PORTFOLIO EDITION 2026</span>
              <span>MUMBAI / GLOBAL</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

