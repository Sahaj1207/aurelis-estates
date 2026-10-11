import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MarineHouseNav } from "./MarineHouseNav";
import { MarineHouseHero } from "./MarineHouseHero";
import { ResidenceStatement } from "./ResidenceStatement";
import { MaterialitySection } from "./MaterialitySection";
import { LivingSection } from "./LivingSection";
import { ExperienceSequence } from "./ExperienceSequence";
import { SuiteSection } from "./SuiteSection";
import { OceanSection } from "./OceanSection";
import { StatementSection } from "./StatementSection";
import { AcquisitionSection } from "./AcquisitionSection";
import { PropertyFooter } from "./PropertyFooter";
import { getLenis } from "../../services/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

interface MarineHouseMonographProps {
  onBack: () => void;
  onNavigate?: (path: string) => void;
}

export const MarineHouseMonograph: React.FC<MarineHouseMonographProps> = ({ onBack, onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  // Measure single source of truth for header height and safe-area inset across viewports
  useLayoutEffect(() => {
    const updateHeaderMetrics = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (headerRef.current) {
        const h = headerRef.current.offsetHeight;
        setHeaderHeight(h);
        document.documentElement.style.setProperty("--monograph-header-height", `${h}px`);
      }
    };

    updateHeaderMetrics();
    window.addEventListener("resize", updateHeaderMetrics);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      ro = new ResizeObserver(() => {
        updateHeaderMetrics();
      });
      ro.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeaderMetrics);
      if (ro) ro.disconnect();
    };
  }, []);

  // Recalculate ScrollTrigger start points after responsive layout offset is set
  useEffect(() => {
    if (headerHeight > 0) {
      ScrollTrigger.refresh();
    }
  }, [headerHeight]);

  useEffect(() => {
    // Ensure the monograph starts at the top
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) {
      return;
    }

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. Hero Reveal: Split line-based reveal, metadata stagger, image scale settle, caption fade
      const heroTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      const titleLines = containerRef.current?.querySelectorAll('[data-hero-reveal="title-line"]');
      const heroEyebrow = containerRef.current?.querySelector('[data-hero-reveal="eyebrow"]');
      const heroMetaItems = containerRef.current?.querySelectorAll('[data-hero-reveal="meta"] > div');
      const heroDivider = containerRef.current?.querySelector('[data-hero-reveal="divider"]');
      const heroImage = containerRef.current?.querySelector('[data-hero-reveal="image"]');
      const heroCaption = containerRef.current?.querySelector('[data-hero-reveal="caption"]');

      if (titleLines && titleLines.length > 0) {
        heroTl.fromTo(
          titleLines,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: isMobile ? 0.9 : 1.15,
            stagger: isMobile ? 0.1 : 0.14,
            ease: "power3.out",
          }
        );
      }

      if (heroEyebrow) {
        heroTl.fromTo(
          heroEyebrow,
          { opacity: 0, y: isMobile ? 8 : 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.75"
        );
      }

      if (heroMetaItems && heroMetaItems.length > 0) {
        heroTl.fromTo(
          heroMetaItems,
          { opacity: 0, y: isMobile ? 8 : 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }

      if (heroDivider) {
        heroTl.fromTo(
          heroDivider,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.95,
            ease: "power3.inOut",
          },
          "-=0.65"
        );
      }

      if (heroImage) {
        heroTl.fromTo(
          heroImage,
          { scale: 1.04, opacity: 0.9 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.35,
            ease: "power2.out",
          },
          "-=0.7"
        );
      }

      if (heroCaption) {
        heroTl.fromTo(
          heroCaption,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // 2. Section Transitions for Every Major Monograph Section
      const sections = containerRef.current?.querySelectorAll<HTMLElement>("section[data-monograph-section]");
      if (sections) {
        sections.forEach((section) => {
          const dividers = section.querySelectorAll('[data-reveal="divider"]');
          const eyebrow = section.querySelector('[data-reveal="eyebrow"]');
          const headings = section.querySelectorAll('[data-reveal="heading"], [data-reveal="heading-line"]');
          const copies = section.querySelectorAll('[data-reveal="copy"]');
          const specs = section.querySelectorAll('[data-reveal="spec"]');
          const images = section.querySelectorAll('[data-reveal="image"]');
          const captions = section.querySelectorAll('[data-reveal="caption"]');
          const subs = section.querySelectorAll('[data-reveal="sub"]');
          const cta = section.querySelector('[data-reveal="cta"]');

          const sectionTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: isMobile ? "top 88%" : "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          });

          // Dividers: animate width from 0 to full width
          if (dividers.length > 0) {
            sectionTl.fromTo(
              dividers,
              { scaleX: 0 },
              {
                scaleX: 1,
                transformOrigin: "left center",
                duration: 0.85,
                stagger: 0.1,
                ease: "power2.inOut",
              },
              0
            );
          }

          // Section number / eyebrow: opacity 0 to 1 with subtle upward movement
          if (eyebrow) {
            sectionTl.fromTo(
              eyebrow,
              { opacity: 0, y: isMobile ? 8 : 14 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
              },
              0.08
            );
          }

          // Main heading: editorial upward reveal
          if (headings.length > 0) {
            sectionTl.fromTo(
              headings,
              { opacity: 0, y: isMobile ? 16 : 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                stagger: isMobile ? 0.06 : 0.09,
                ease: "power3.out",
              },
              0.14
            );
          }

          // Supporting copy: delayed staggered reveal
          if (copies.length > 0) {
            sectionTl.fromTo(
              copies,
              { opacity: 0, y: isMobile ? 10 : 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.08,
                ease: "power2.out",
              },
              0.26
            );
          }

          // Specifications / zone indicators
          if (specs.length > 0) {
            sectionTl.fromTo(
              specs,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: "power2.out",
              },
              0.3
            );
          }

          // Images: subtle scale reveal from approx 1.03 to 1
          if (images.length > 0) {
            sectionTl.fromTo(
              images,
              { scale: 1.035, opacity: 0.88 },
              {
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
              },
              0.2
            );
          }

          // Image captions: delayed fade upward
          if (captions.length > 0) {
            sectionTl.fromTo(
              captions,
              { opacity: 0, y: 8 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
              },
              0.55
            );
          }

          // Subnotes / coordinates / meta
          if (subs.length > 0) {
            sectionTl.fromTo(
              subs,
              { opacity: 0, y: 8 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: "power2.out",
              },
              0.38
            );
          }

          // Private inquiry CTA: reveals naturally after surrounding content
          if (cta) {
            sectionTl.fromTo(
              cta,
              { opacity: 0, y: 14 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
              },
              0.45
            );
          }
        });
      }

      // 3. Subtle image parallax only on large architectural imagery (Desktop only)
      if (!isMobile) {
        const parallaxImages = containerRef.current?.querySelectorAll<HTMLElement>('[data-parallax="image"]');
        if (parallaxImages) {
          parallaxImages.forEach((img) => {
            const wrapper = img.closest(".relative") || img.parentElement;
            if (wrapper) {
              gsap.fromTo(
                img,
                { yPercent: -2.5 },
                {
                  yPercent: 2.5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: wrapper,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8,
                  },
                }
              );
            }
          });
        }
      }

      // 4. Footer Colophon Stagger and Back to Top
      const footer = containerRef.current?.querySelector("footer");
      if (footer) {
        const brandCol = footer.querySelector('[data-footer-reveal="brand"]');
        const actionsCol = footer.querySelector('[data-footer-reveal="actions"]');
        const metaCol = footer.querySelector('[data-footer-reveal="meta"]');

        gsap.fromTo(
          [brandCol, actionsCol, metaCol].filter(Boolean),
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0a0c0d] text-[#f6f6f4] selection:bg-[#dfd7c6]/20 selection:text-[#f6f6f4]"
    >
      {/* Mobile-Fixed / Desktop-Static Property Header */}
      <MarineHouseNav ref={headerRef} onBack={onBack} />

      {/* Flagship Monograph Architectural Sequence with responsive header offset */}
      <main
        data-gallery
        style={{
          paddingTop: isMobile ? `${headerHeight || 72}px` : undefined,
        }}
      >
        <MarineHouseHero />
        <ResidenceStatement onTour={onNavigate ? () => onNavigate("/residences/the-marine-house/tour") : undefined} />
        <MaterialitySection />
        <LivingSection />
        <ExperienceSequence />
        <SuiteSection />
        <OceanSection />
        <StatementSection />
        <AcquisitionSection />
      </main>

      {/* Property Colophon Footer with Back to Top */}
      <PropertyFooter onBack={onBack} />
    </div>
  );
};

