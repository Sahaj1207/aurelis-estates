import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// `ready` flips once the intro curtain starts to lift, so the entrance plays in view
export function useHeroAnimation(ready = true) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<gsap.core.Timeline | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Header state: condensed once off the top, tucked away while reading downward
    const headerTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        setIsScrolled(y > 55);
        setIsScrollingDown(self.direction === 1 && y > window.innerHeight * 0.6);
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
        paused: true,
        defaults: { ease: "power3.out" },
      });
      entranceRef.current = tl;

      // Image settles out of a slow push-in
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.12 },
          { scale: 1.0, duration: 2.6, ease: "power2.out" },
          0
        );
      }

      // Header gentle enter
      tl.fromTo(
        ".header-inner",
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
        0.35
      );

      // Hero Eyebrow reveal
      tl.fromTo(
        ".hero-eyebrow",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.3
      );

      // Headline lines rise out of their masks
      tl.fromTo(
        ".hero-headline-inner",
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1.35,
          stagger: 0.14,
          ease: "power4.out",
        },
        0.35
      );

      // Supporting copy
      tl.fromTo(
        ".hero-supporting-copy",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.85
      );

      // CTAs
      tl.fromTo(
        ".hero-cta-group",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 },
        1.0
      );

      // Metadata elements
      tl.fromTo(
        ".hero-meta-element",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        1.15
      );

      // 2. Scroll-linked parallax & content exit
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -40,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom 45%",
            scrub: true,
          },
        });
      }
    }, document.body);

    return () => {
      headerTrigger.kill();
      entranceRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (ready) entranceRef.current?.play();
  }, [ready]);

  return {
    containerRef,
    imageRef,
    contentRef,
    isScrolled,
    isScrollingDown,
  };
}
