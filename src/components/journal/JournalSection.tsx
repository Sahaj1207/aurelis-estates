import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JournalIntro } from "./JournalIntro";
import { FeaturedStory } from "./FeaturedStory";
import { EditorialIndex } from "./EditorialIndex";
import { JournalClosing } from "./JournalClosing";

gsap.registerPlugin(ScrollTrigger);

interface JournalSectionProps {
  onNavigate?: (path: string) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Opening Reveal: Eyebrow, Headline lines, Supporting Statement, and Hairline Rule
      const introBlock = sectionRef.current?.querySelector(".journal-intro-block");
      if (introBlock) {
        const eyebrow = introBlock.querySelector(".journal-eyebrow");
        const headlineSpans = introBlock.querySelectorAll(".journal-intro-headline span > span");
        const statement = introBlock.querySelector(".journal-intro-statement");
        const line = introBlock.querySelector(".journal-intro-line");

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

        if (headlineSpans.length > 0) {
          tlIntro.fromTo(
            headlineSpans,
            { opacity: 0, y: 26 },
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

        if (statement) {
          tlIntro.fromTo(
            statement,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
            "-=0.6"
          );
        }

        if (line) {
          tlIntro.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.95, ease: "power2.inOut" },
            "-=0.5"
          );
        }
      }

      // 2. Featured Story Reveal
      const featuredBlock = sectionRef.current?.querySelector(".featured-story-block");
      if (featuredBlock) {
        const imgWrapper = featuredBlock.querySelector(".featured-story-image-wrapper");
        const img = featuredBlock.querySelector(".featured-story-image");
        const meta = featuredBlock.querySelector(".featured-story-meta");
        const title = featuredBlock.querySelector(".featured-story-title");
        const copy = featuredBlock.querySelector(".featured-story-copy");

        const tlFeatured = gsap.timeline({
          scrollTrigger: {
            trigger: featuredBlock,
            start: "top 78%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        if (imgWrapper && img) {
          tlFeatured.fromTo(
            imgWrapper,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.95, ease: "power2.out" }
          );
          tlFeatured.fromTo(
            img,
            { scale: 1.035 },
            { scale: 1.0, duration: 1.2, ease: "power2.out" },
            "<"
          );
        }

        const textGroup = [meta, title, copy].filter(Boolean);
        if (textGroup.length > 0) {
          tlFeatured.fromTo(
            textGroup,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.7"
          );
        }
      }

      // 3. Editorial Rows: Independent Staggered Reveal per Row
      const rows = sectionRef.current?.querySelectorAll(".editorial-story-row");
      if (rows) {
        rows.forEach((row) => {
          const line = row.querySelector(".editorial-row-line");
          const number = row.querySelector(".editorial-row-number");
          const title = row.querySelector(".editorial-row-title");
          const desc = row.querySelector(".editorial-row-desc");
          const imgWrapper = row.querySelector(".editorial-row-image-wrapper");
          const img = row.querySelector(".editorial-row-image");

          const tlRow = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          });

          if (line) {
            tlRow.fromTo(
              line,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.95, ease: "power2.inOut" }
            );
          }

          const textElements = [number, title, desc].filter(Boolean);
          if (textElements.length > 0) {
            tlRow.fromTo(
              textElements,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.08,
                ease: "power2.out",
              },
              "-=0.6"
            );
          }

          if (imgWrapper && img) {
            tlRow.fromTo(
              imgWrapper,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
              "-=0.5"
            );
            tlRow.fromTo(
              img,
              { scale: 1.035 },
              { scale: 1.0, duration: 1.15, ease: "power2.out" },
              "<"
            );
          }
        });
      }

      // 4. Closing Archival Block Reveal
      const closingBlock = sectionRef.current?.querySelector(".journal-closing-block");
      if (closingBlock) {
        const line = closingBlock.querySelector(".journal-closing-line");
        const heading = closingBlock.querySelector(".journal-closing-heading");
        const subtext = closingBlock.querySelector(".journal-closing-subtext");
        const link = closingBlock.querySelector(".journal-closing-link");

        const tlClosing = gsap.timeline({
          scrollTrigger: {
            trigger: closingBlock,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        if (line) {
          tlClosing.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.9, ease: "power2.inOut" }
          );
        }

        const closingElements = [heading, subtext, link].filter(Boolean);
        if (closingElements.length > 0) {
          tlClosing.fromTo(
            closingElements,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.5"
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journal"
      ref={sectionRef}
      aria-label="AURELIS The Journal"
      className="relative z-20 bg-[#0a0c0d] text-[#f6f6f4] border-t border-white/[0.06]"
    >
      {/* 1. Publication Opening */}
      <JournalIntro />

      {/* 2. Dominant Cover Spread Story */}
      <FeaturedStory onNavigate={onNavigate} />

      {/* 3. Curated Editorial Index Sequence */}
      <EditorialIndex onNavigate={onNavigate} />

      {/* 4. Quiet Archival Statement & Publication Link */}
      <JournalClosing />
    </section>
  );
};
