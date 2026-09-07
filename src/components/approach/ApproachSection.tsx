import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ApproachIntro } from "./ApproachIntro";
import { ApproachPrinciples } from "./ApproachPrinciples";
import { ApproachEnding } from "./ApproachEnding";

gsap.registerPlugin(ScrollTrigger);

export const ApproachSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Opening Manifesto Block Reveal
      const introBlock = sectionRef.current?.querySelector(".approach-intro-block");
      if (introBlock) {
        const eyebrow = introBlock.querySelector(".approach-eyebrow");
        const manifestoSpans = introBlock.querySelectorAll(".approach-manifesto span > span");
        const copy = introBlock.querySelector(".approach-intro-copy");
        const imageWrapper = introBlock.querySelector(".approach-intro-image-wrapper");
        const image = introBlock.querySelector(".approach-intro-image");

        const tlIntro = gsap.timeline({
          scrollTrigger: {
            trigger: introBlock,
            start: "top 78%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        if (eyebrow) {
          tlIntro.fromTo(
            eyebrow,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          );
        }

        if (manifestoSpans.length > 0) {
          tlIntro.fromTo(
            manifestoSpans,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.5"
          );
        }

        if (copy) {
          tlIntro.fromTo(
            copy,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
            "-=0.6"
          );
        }

        if (imageWrapper && image) {
          tlIntro.fromTo(
            imageWrapper,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.95, ease: "power2.out" },
            "-=0.6"
          );
          tlIntro.fromTo(
            image,
            { scale: 1.04 },
            { scale: 1.0, duration: 1.2, ease: "power2.out" },
            "<"
          );
        }
      }

      // 2. Individual Principle Rows: Independent entrance orchestration
      const principleRows = sectionRef.current?.querySelectorAll(".approach-principle-row");
      if (principleRows) {
        principleRows.forEach((row) => {
          const line = row.querySelector(".approach-principle-line");
          const number = row.querySelector(".approach-principle-number");
          const title = row.querySelector(".approach-principle-title");
          const statement = row.querySelector(".approach-principle-statement");
          const body = row.querySelector(".approach-principle-body");
          const imageWrapper = row.querySelector(".approach-principle-image-wrapper");
          const image = row.querySelector(".approach-principle-image");

          const tlRow = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          });

          // 1. Hairline rule extends horizontally
          if (line) {
            tlRow.fromTo(
              line,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.95, ease: "power2.inOut" }
            );
          }

          // 2. Number, Title, Statement, and Body reveal sequentially
          const textElements = [number, title, statement, body].filter(Boolean);
          if (textElements.length > 0) {
            tlRow.fromTo(
              textElements,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.08,
                ease: "power2.out",
              },
              "-=0.6"
            );
          }

          // 3. Image fragment reveals with settle scale
          if (imageWrapper && image) {
            tlRow.fromTo(
              imageWrapper,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
              "-=0.5"
            );
            tlRow.fromTo(
              image,
              { scale: 1.04 },
              { scale: 1.0, duration: 1.15, ease: "power2.out" },
              "<"
            );
          }
        });
      }

      // 3. Ending Statement Block Reveal
      const endingBlock = sectionRef.current?.querySelector(".approach-ending-block");
      if (endingBlock) {
        const endingLine = endingBlock.querySelector(".approach-ending-line");
        const endingSpans = endingBlock.querySelectorAll(".approach-ending-headline span > span");
        const endingSubtext = endingBlock.querySelector(".approach-ending-subtext");
        const endingImageWrapper = endingBlock.querySelector(".approach-ending-image-wrapper");
        const endingImage = endingBlock.querySelector(".approach-ending-image");

        const tlEnding = gsap.timeline({
          scrollTrigger: {
            trigger: endingBlock,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        if (endingLine) {
          tlEnding.fromTo(
            endingLine,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.9, ease: "power2.inOut" }
          );
        }

        if (endingSpans.length > 0) {
          tlEnding.fromTo(
            endingSpans,
            { opacity: 0, y: 22 },
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

        if (endingSubtext) {
          tlEnding.fromTo(
            endingSubtext,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
            "-=0.5"
          );
        }

        if (endingImageWrapper && endingImage) {
          tlEnding.fromTo(
            endingImageWrapper,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
            "-=0.5"
          );
          tlEnding.fromTo(
            endingImage,
            { scale: 1.04 },
            { scale: 1.0, duration: 1.15, ease: "power2.out" },
            "<"
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="AURELIS The Approach"
      className="relative z-20 bg-[#0a0c0d] text-[#f6f6f4] border-t border-white/[0.06]"
    >
      {/* Anchor alias for backwards compatibility */}
      <div id="approach" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      {/* 1. Manifesto Opening with Architectural Plate Fragment */}
      <ApproachIntro />

      {/* 2. Four Architectural Principles Sequence with Material Imagery */}
      <ApproachPrinciples />

      {/* 3. Quiet Closing Statement with Architectural Finishing Fragment */}
      <ApproachEnding />
    </section>
  );
};
