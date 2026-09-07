import React from "react";
import type { JournalArticleData } from "../../data/journalArticlesData";
import { JournalPullQuote } from "./JournalPullQuote";

interface JournalArticleSectionsProps {
  article: JournalArticleData;
}

export const JournalArticleSections: React.FC<JournalArticleSectionsProps> = ({ article }) => {
  const { section1, pullQuote, section2, section3, section4 } = article;

  return (
    <div className="mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16">
      {/* ===================================================
          SECTION 01: THE WEIGHT OF MATERIAL (Text Left / Image Right)
          =================================================== */}
      <section
        aria-label={section1.title}
        className="article-section-block py-16 sm:py-20 md:py-28 border-b border-white/[0.07]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Text Column Left */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.28em] text-[#dfd7c6]/70 uppercase font-mono mb-4 block">
              SECTION 01
            </span>
            <h2 className="article-section-heading text-2xl sm:text-3xl md:text-4xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.1] mb-6">
              {section1.title}
            </h2>
            <div className="flex flex-col gap-5 text-[14px] md:text-[15px] font-light text-[#c8c2b5]/90 leading-[1.8] tracking-[0.01em] font-sans">
              {section1.paragraphs.map((p, idx) => (
                <p key={idx} className="article-section-paragraph">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Architectural Plate Right */}
          {section1.image && (
            <div className="lg:col-span-7">
              <div
                className={`article-section-image-wrapper relative overflow-hidden bg-[#121517] ${
                  section1.image.aspectRatio ?? "aspect-[4/3]"
                } border border-white/[0.08] group`}
              >
                <img
                  src={section1.image.src}
                  alt={section1.image.alt}
                  className="article-section-image h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80 pointer-events-none">
                  {section1.image.caption}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          EDITORIAL PULL QUOTE (Visual Pause)
          =================================================== */}
      <JournalPullQuote quote={pullQuote} />

      {/* ===================================================
          SECTION 02: MASS AND PROPORTION (Image Left / Text Right)
          =================================================== */}
      <section
        aria-label={section2.title}
        className="article-section-block py-16 sm:py-20 md:py-28 border-b border-white/[0.07]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Architectural Plate Left */}
          {section2.image && (
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div
                className={`article-section-image-wrapper relative overflow-hidden bg-[#121517] ${
                  section2.image.aspectRatio ?? "aspect-[16/10]"
                } border border-white/[0.08] group`}
              >
                <img
                  src={section2.image.src}
                  alt={section2.image.alt}
                  className="article-section-image h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80 pointer-events-none">
                  {section2.image.caption}
                </div>
              </div>
            </div>
          )}

          {/* Text Column Right */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:pl-6 flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.28em] text-[#dfd7c6]/70 uppercase font-mono mb-4 block">
              SECTION 02
            </span>
            <h2 className="article-section-heading text-2xl sm:text-3xl md:text-4xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.1] mb-6">
              {section2.title}
            </h2>
            <div className="flex flex-col gap-5 text-[14px] md:text-[15px] font-light text-[#c8c2b5]/90 leading-[1.8] tracking-[0.01em] font-sans">
              {section2.paragraphs.map((p, idx) => (
                <p key={idx} className="article-section-paragraph">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          SECTION 03: A MATERIAL THAT AGES (Text Left / Image Right)
          =================================================== */}
      <section
        aria-label={section3.title}
        className="article-section-block py-16 sm:py-20 md:py-28 border-b border-white/[0.07]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Text Column Left */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.28em] text-[#dfd7c6]/70 uppercase font-mono mb-4 block">
              SECTION 03
            </span>
            <h2 className="article-section-heading text-2xl sm:text-3xl md:text-4xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.1] mb-6">
              {section3.title}
            </h2>
            <div className="flex flex-col gap-5 text-[14px] md:text-[15px] font-light text-[#c8c2b5]/90 leading-[1.8] tracking-[0.01em] font-sans">
              {section3.paragraphs.map((p, idx) => (
                <p key={idx} className="article-section-paragraph">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Architectural Detail Plate Right */}
          {section3.image && (
            <div className="lg:col-span-7">
              <div
                className={`article-section-image-wrapper relative overflow-hidden bg-[#121517] ${
                  section3.image.aspectRatio ?? "aspect-[4/3]"
                } border border-white/[0.08] group`}
              >
                <img
                  src={section3.image.src}
                  alt={section3.image.alt}
                  className="article-section-image h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80 pointer-events-none">
                  {section3.image.caption}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          SECTION 04: BUILT TO REMAIN (Text + Oversized Visual Plate)
          =================================================== */}
      <section
        aria-label={section4.title}
        className="article-section-block py-16 sm:py-20 md:py-28"
      >
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-[10px] tracking-[0.28em] text-[#dfd7c6]/70 uppercase font-mono mb-4 block">
            SECTION 04
          </span>
          <h2 className="article-section-heading text-2xl sm:text-3xl md:text-4xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.1] mb-6">
            {section4.title}
          </h2>
          <div className="flex flex-col gap-5 text-[14px] md:text-[15.5px] font-light text-[#c8c2b5]/90 leading-[1.8] tracking-[0.01em] font-sans">
            {section4.paragraphs.map((p, idx) => (
              <p key={idx} className="article-section-paragraph">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Intentionally Oversized Architectural Plate */}
        {section4.image && (
          <div className="article-section-image-wrapper relative overflow-hidden bg-[#121517] aspect-[16/9] sm:aspect-[21/9] border border-white/[0.08] group w-full">
            <img
              src={section4.image.src}
              alt={section4.image.alt}
              className="article-section-image h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80 pointer-events-none">
              {section4.image.caption}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
