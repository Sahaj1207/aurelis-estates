import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { JournalArticleData } from "../../data/journalArticlesData";
import { JournalArticleNav } from "./JournalArticleNav";
import { JournalArticleHero } from "./JournalArticleHero";
import { JournalArticleSections } from "./JournalArticleSections";
import { JournalArticleClosing } from "./JournalArticleClosing";
import { JournalArticleFooter } from "./JournalArticleFooter";
import { getLenis } from "../../services/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

interface JournalArticlePageProps {
  article: JournalArticleData;
  onNavigate: (path: string) => void;
  onBack: () => void;
}

export const JournalArticlePage: React.FC<JournalArticlePageProps> = ({
  article,
  onNavigate,
  onBack,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the article begins immediately at the top
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !containerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial Page Entry: Hero metadata, headline, intro, and hero plate
      const meta = containerRef.current?.querySelector(".article-hero-meta");
      const titleSpans = containerRef.current?.querySelectorAll(".article-hero-title span");
      const intro = containerRef.current?.querySelector(".article-hero-intro");
      const heroImgWrapper = containerRef.current?.querySelector(".article-hero-image-wrapper");
      const heroImg = containerRef.current?.querySelector(".article-hero-image");

      const tlHero = gsap.timeline({ delay: 0.1 });

      if (meta) {
        tlHero.fromTo(
          meta,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
      }

      if (titleSpans && titleSpans.length > 0) {
        tlHero.fromTo(
          titleSpans,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      if (intro) {
        tlHero.fromTo(
          intro,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
          "-=0.5"
        );
      }

      if (heroImgWrapper && heroImg) {
        tlHero.fromTo(
          heroImgWrapper,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.95, ease: "power2.out" },
          "-=0.6"
        );
        tlHero.fromTo(
          heroImg,
          { scale: 1.035 },
          { scale: 1.0, duration: 1.2, ease: "power2.out" },
          "<"
        );
      }

      // 2. Body Sections ScrollTrigger Reveal
      const sections = containerRef.current?.querySelectorAll(".article-section-block");
      if (sections) {
        sections.forEach((sec) => {
          const heading = sec.querySelector(".article-section-heading");
          const paragraphs = sec.querySelectorAll(".article-section-paragraph");
          const imgWrapper = sec.querySelector(".article-section-image-wrapper");
          const img = sec.querySelector(".article-section-image");

          const tlSec = gsap.timeline({
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          });

          if (heading) {
            tlSec.fromTo(
              heading,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }
            );
          }

          if (paragraphs.length > 0) {
            tlSec.fromTo(
              paragraphs,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power2.out",
              },
              "-=0.5"
            );
          }

          if (imgWrapper && img) {
            tlSec.fromTo(
              imgWrapper,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
              "-=0.5"
            );
            tlSec.fromTo(
              img,
              { scale: 1.035 },
              { scale: 1.0, duration: 1.15, ease: "power2.out" },
              "<"
            );
          }
        });
      }

      // 3. Pull Quote Reveal
      const pullQuote = containerRef.current?.querySelector(".article-pull-quote-block");
      if (pullQuote) {
        const lines = pullQuote.querySelectorAll(".article-pull-quote-line");
        const quoteText = pullQuote.querySelector(".article-pull-quote-text");

        const tlQuote = gsap.timeline({
          scrollTrigger: {
            trigger: pullQuote,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        if (lines.length > 0) {
          tlQuote.fromTo(
            lines,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.95, ease: "power2.inOut" }
          );
        }

        if (quoteText) {
          tlQuote.fromTo(
            quoteText,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
            "-=0.6"
          );
        }
      }

      // 4. Closing & Next Observation Reveal
      const closingBlock = containerRef.current?.querySelector(".article-closing-block");
      if (closingBlock) {
        const line = closingBlock.querySelector(".article-closing-line");
        const titleSpans = closingBlock.querySelectorAll(".article-closing-title span");
        const copy = closingBlock.querySelector(".article-closing-copy");
        const nextCard = closingBlock.querySelector(".article-next-card");
        const link = closingBlock.querySelector(".article-closing-link");

        const tlClosing = gsap.timeline({
          scrollTrigger: {
            trigger: closingBlock,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        if (line) {
          tlClosing.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.95, ease: "power2.inOut" }
          );
        }

        if (titleSpans.length > 0) {
          tlClosing.fromTo(
            titleSpans,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.5"
          );
        }

        if (copy) {
          tlClosing.fromTo(
            copy,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.5"
          );
        }

        if (nextCard) {
          tlClosing.fromTo(
            nextCard,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
            "-=0.4"
          );
        }

        if (link) {
          tlClosing.fromTo(
            link,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.5"
          );
        }
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [article.slug]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0a0c0d] text-[#f6f6f4] selection:bg-[#dfd7c6]/20 selection:text-[#f6f6f4]"
    >
      {/* 1. Static Publication Top Masthead */}
      <JournalArticleNav onBack={onBack} />

      {/* 2. Article Hero */}
      <main>
        <JournalArticleHero article={article} />

        {/* 3. Article 4-Section Narrative with Imagery & Pull Quote */}
        <JournalArticleSections article={article} />

        {/* 4. Article Closing Declaration, Next Observation & Index Link */}
        <JournalArticleClosing
          article={article}
          onNavigate={onNavigate}
          onBack={onBack}
        />
      </main>

      {/* 5. Article Colophon Footer */}
      <JournalArticleFooter onBack={onBack} />
    </div>
  );
};
