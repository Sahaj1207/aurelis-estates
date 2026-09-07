import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Header scroll trigger
    const headerTrigger = ScrollTrigger.create({
      start: "top -55px",
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      },
    });

    if (prefersReducedMotion || !containerRef.current) {
      return () => {
        headerTrigger.kill();
      };
    }

    const ctx = gsap.context(() => {
      // 1. Initial Entry Timeline: Slow, cinematic, and restrained
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Subtle image settle from 1.05 down to 1.0
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.05, opacity: 0.85 },
          { scale: 1.0, opacity: 1, duration: 2.4, ease: "power2.out" },
          0
        );
      }

      // Header gentle enter
      tl.fromTo(
        "#main-header",
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
        0.2
      );

      // Hero Eyebrow reveal
      tl.fromTo(
        ".hero-eyebrow",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.45
      );

      // Headline lines staggered reveal
      tl.fromTo(
        ".hero-headline-line",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.16,
          ease: "power3.out",
        },
        0.6
      );

      // Supporting copy
      tl.fromTo(
        ".hero-supporting-copy",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        1.0
      );

      // CTAs
      tl.fromTo(
        ".hero-cta-group",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 },
        1.15
      );

      // Metadata elements
      tl.fromTo(
        ".hero-meta-element",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        1.25
      );

      // 2. Scroll-linked parallax & content exit
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -35,
          opacity: 0.25,
          ease: "power1.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom 35%",
            scrub: 0.5,
          },
        });
      }
    }, containerRef);

    return () => {
      headerTrigger.kill();
      ctx.revert();
    };
  }, []);

  return {
    containerRef,
    imageRef,
    contentRef,
    isScrolled,
  };
}
