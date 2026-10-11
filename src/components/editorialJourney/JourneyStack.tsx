import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { editorialFrames } from "./editorialJourneyData";
import { CinematicImage } from "./CinematicImage";
import { CinematicCopy } from "./CinematicCopy";

gsap.registerPlugin(ScrollTrigger);

interface JourneyStackProps {
  animate: boolean;
}

// Touch and small-viewport presentation: the same seven frames as a natively
// scrolling sequence. Pinning a full-height stage under a mobile address bar is
// where scroll jank comes from, so here each frame simply reveals as it arrives.
export const JourneyStack: React.FC<JourneyStackProps> = ({ animate }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const total = editorialFrames.length;

  useEffect(() => {
    if (!animate || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".journey-stack-item").forEach((item) => {
        const plate = item.querySelector(".journey-stack-plate");
        const img = item.querySelector("img");
        const copy = item.querySelectorAll(
          ".cinematic-eyebrow, .cinematic-headline, .cinematic-subtitle, .cinematic-desc, .cinematic-meta"
        );

        if (plate) {
          gsap.fromTo(
            plate,
            { clipPath: "inset(14% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 82%", once: true },
            }
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.16, yPercent: -4 },
            {
              scale: 1.06,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (copy.length > 0) {
          gsap.fromTo(
            copy,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item.querySelector(".journey-stack-copy") ?? item,
                start: "top 88%",
                once: true,
              },
            }
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <div ref={rootRef} data-gallery className="flex flex-col">
      {editorialFrames.map((frame, index) => {
        if (frame.layout === "final-statement") {
          return (
            <article
              key={frame.id}
              className="journey-stack-item relative flex min-h-[78svh] items-center justify-center overflow-hidden px-6 sm:px-8 md:px-12 py-24"
            >
              <div className="journey-stack-plate absolute inset-0 opacity-35">
                <CinematicImage
                  src={frame.image.src}
                  alt={frame.image.alt}
                  objectPosition={frame.image.objectPosition}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-[#0a0c0d]/80" />
              </div>
              <div className="journey-stack-copy relative z-10">
                <CinematicCopy frame={frame} />
              </div>
            </article>
          );
        }

        return (
          <article
            key={frame.id}
            className="journey-stack-item border-b border-white/[0.06] pb-14 sm:pb-20 pt-0"
          >
            <div className="journey-stack-plate relative aspect-[4/5] sm:aspect-[16/11] w-full overflow-hidden">
              <CinematicImage
                src={frame.image.src}
                alt={frame.image.alt}
                objectPosition={frame.image.objectPosition}
                caption={frame.image.caption}
                sizes="100vw"
              />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0c0d]/55 to-transparent pointer-events-none" />
              <span className="absolute top-5 right-6 sm:right-8 font-mono text-[10px] tracking-[0.24em] text-[#f6f6f4]/85">
                0{index + 1}
                <span className="text-[#f6f6f4]/40"> / 0{total}</span>
              </span>
            </div>

            <div className="journey-stack-copy px-6 sm:px-8 md:px-12 pt-9 sm:pt-12">
              <CinematicCopy frame={frame} />
            </div>
          </article>
        );
      })}
    </div>
  );
};
