import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CollectionIntro } from "./CollectionIntro";
import { ResidenceItem } from "./ResidenceItem";
import { CollectionOutro } from "./CollectionOutro";
import { collectionResidencesData } from "./collectionData";

gsap.registerPlugin(ScrollTrigger);

interface CollectionSectionProps {
  onNavigate?: (href: string) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onNavigate,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Intro Reveal
      const introBlock = sectionRef.current?.querySelector(".collection-intro-block");
      if (introBlock) {
        gsap.fromTo(
          introBlock.querySelectorAll(".collection-eyebrow, .collection-headline, .collection-copy"),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introBlock,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Individual Residence Card Reveals
      const residenceCards = gsap.utils.toArray<HTMLElement>(".residence-card");
      residenceCards.forEach((card) => {
        const imageWrap = card.querySelector(".residence-image-wrap");
        const copyBlock = card.querySelector(".residence-copy");

        if (imageWrap) {
          gsap.fromTo(
            imageWrap,
            { clipPath: "inset(0 0 8% 0)", opacity: 0.8 },
            {
              clipPath: "inset(0 0 0% 0)",
              opacity: 1,
              duration: 1.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (copyBlock) {
          gsap.fromTo(
            copyBlock,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // 3. Outro Statement Reveal
      const outroBlock = sectionRef.current?.querySelector(".collection-outro-block");
      if (outroBlock) {
        gsap.fromTo(
          outroBlock.querySelectorAll(".collection-outro-headline, .collection-outro-copy"),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: outroBlock,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      aria-label="AURELIS The Collection"
      className="relative z-20 bg-[#0a0c0d] text-[#f6f6f4] border-t border-white/[0.06]"
    >
      {/* 1. Editorial Section Intro */}
      <CollectionIntro />

      {/* 2. Alternating Asymmetric Editorial Portfolio */}
      <div className="flex flex-col">
        {collectionResidencesData.map((residence) => (
          <ResidenceItem
            key={residence.id}
            residence={residence}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {/* 3. Spacious Editorial Outro */}
      <CollectionOutro />
    </section>
  );
};
