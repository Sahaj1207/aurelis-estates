import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "../Header";
import { heroContent } from "../../data/estateContent";
import { aboutContent } from "../../data/aboutContent";
import { scrollToTarget } from "../../services/smoothScroll";
import { AboutManifesto } from "./AboutManifesto";
import { AboutOffice } from "./AboutOffice";
import { AboutMethod } from "./AboutMethod";
import { AboutCuration } from "./AboutCuration";
import { AboutValues } from "./AboutValues";
import { AboutPrivateOffice } from "./AboutPrivateOffice";
import { AboutClosing } from "./AboutClosing";

gsap.registerPlugin(ScrollTrigger);

interface AboutPageProps {
  onNavigate?: (path: string) => void;
  onBack?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Immediate scroll to top upon entering page
  useEffect(() => {
    scrollToTarget(0, { immediate: true });
  }, []);

  // Monitor scroll threshold for header glass transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Canonical GSAP ScrollTrigger orchestration across all sections
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const sections =
        containerRef.current?.querySelectorAll<HTMLElement>("section[data-about-section]");

      if (!sections) return;

      sections.forEach((section, index) => {
        const eyebrows = section.querySelectorAll('[data-reveal="eyebrow"]');
        const headings = section.querySelectorAll('[data-reveal="heading"]');
        const copies = section.querySelectorAll('[data-reveal="copy"]');
        const dividers = section.querySelectorAll('[data-reveal="divider"]');
        const vRules = section.querySelectorAll('[data-reveal="v-rule"]');
        const secondary = section.querySelectorAll('[data-reveal="secondary"]');
        const principles = section.querySelectorAll('[data-reveal="principle-row"]');
        const values = section.querySelectorAll('[data-reveal="value-statement"]');
        const image = section.querySelector('[data-reveal="image"]');
        const imageFrame = section.querySelector('[data-reveal="image-frame"]');
        const caption = section.querySelector('[data-reveal="caption"]');
        const cta = section.querySelector('[data-reveal="cta"]');
        const colophon = section.querySelector('[data-reveal="colophon"]');
        const meta = section.querySelectorAll('[data-reveal="meta"]');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: index === 0 ? "top 95%" : "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        // Dividers expand horizontally
        if (dividers.length > 0) {
          tl.fromTo(
            dividers,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              transformOrigin: "left center",
              duration: 0.85,
              ease: "power2.inOut",
            },
            0
          );
        }

        // Vertical rules expand vertically
        if (vRules.length > 0) {
          tl.fromTo(
            vRules,
            { scaleY: 0, opacity: 0 },
            {
              scaleY: 1,
              opacity: 1,
              transformOrigin: "top center",
              duration: 0.9,
              ease: "power2.inOut",
            },
            0.1
          );
        }

        // Section eyebrow & metadata reveal
        if (eyebrows.length > 0 || meta.length > 0) {
          tl.fromTo(
            [...eyebrows, ...meta],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
            0.05
          );
        }

        // Section headings reveal with subtle upward travel
        if (headings.length > 0) {
          tl.fromTo(
            headings,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
            0.12
          );
        }

        // Secondary statements
        if (secondary.length > 0) {
          tl.fromTo(
            secondary,
            { opacity: 0, x: -12 },
            { opacity: 1, x: 0, duration: 0.75, ease: "power2.out" },
            0.2
          );
        }

        // Body copy reveals
        if (copies.length > 0) {
          tl.fromTo(
            copies,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            0.22
          );
        }

        // Method principles sequence
        if (principles.length > 0) {
          tl.fromTo(
            principles,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: "power2.out",
            },
            0.2
          );
        }

        // Architectural collection image plate with restrained scale settle
        if (imageFrame) {
          tl.fromTo(
            imageFrame,
            { opacity: 0.8 },
            { opacity: 1, duration: 0.8, ease: "power2.out" },
            0.15
          );
        }

        if (image) {
          tl.fromTo(
            image,
            { scale: 1.04 },
            { scale: 1, duration: 1.2, ease: "power2.out" },
            0.15
          );
        }

        if (caption) {
          tl.fromTo(
            caption,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.35
          );
        }

        // Values sequence
        if (values.length > 0) {
          tl.fromTo(
            values,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power2.out",
            },
            0.2
          );
        }

        // Advisory CTA
        if (cta) {
          tl.fromTo(
            cta,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
            0.3
          );
        }

        // Closing colophon
        if (colophon) {
          tl.fromTo(
            colophon,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: "power2.out" },
            0.35
          );
        }
      });
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
      {/* Global Architectural Header */}
      <Header
        brand={heroContent.brand}
        navItems={heroContent.navItems}
        primaryAction={heroContent.primaryAction}
        isScrolled={isScrolled}
        onNavigate={onNavigate}
      />

      {/* About Manifesto Flow */}
      <main>
        {/* Section 01: Opening Manifesto */}
        <AboutManifesto data={aboutContent.manifesto} />

        {/* Section 02: 01 / THE OFFICE */}
        <AboutOffice data={aboutContent.office} />

        {/* Section 03: 02 / THE METHOD */}
        <AboutMethod data={aboutContent.method} />

        {/* Section 04: 03 / THE COLLECTION */}
        <AboutCuration data={aboutContent.curation} />

        {/* Section 05: 04 / WHAT WE VALUE */}
        <AboutValues data={aboutContent.values} />

        {/* Section 06: 05 / THE PRIVATE OFFICE */}
        <AboutPrivateOffice
          data={aboutContent.privateOffice}
          onNavigate={onNavigate}
        />

        {/* Section 07: 06 / CLOSING STATEMENT */}
        <AboutClosing data={aboutContent.closing} />
      </main>
    </div>
  );
};
