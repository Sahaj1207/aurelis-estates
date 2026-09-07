import React from "react";
import type { JournalArticleData } from "../../data/journalArticlesData";

interface JournalArticleHeroProps {
  article: JournalArticleData;
}

export const JournalArticleHero: React.FC<JournalArticleHeroProps> = ({ article }) => {
  return (
    <section
      aria-label="Article Opening"
      className="relative w-full bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 pt-12 md:pt-20 pb-16 md:pb-24 border-b border-white/[0.07]"
    >
      <div className="mx-auto max-w-[1720px]">
        {/* Asymmetric Header Grid: ~45% Title & Metadata / ~55% Dominant Architectural Plate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Editorial Header Column */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between">
            <div>
              {/* Metadata Row */}
              <div className="article-hero-meta flex items-center gap-3 text-[10px] md:text-[10.5px] font-mono tracking-[0.28em] uppercase text-[#dfd7c6]/80 mb-6">
                <span>{article.category}</span>
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <span className="text-[#c8c2b5]/50">{article.readTime}</span>
              </div>

              {/* Headline */}
              <h1 className="article-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-light font-serif text-[#f6f6f4] tracking-[-0.02em] leading-[1.0] mb-8">
                <span className="block">{article.titleLines[0]}</span>
                <span className="block text-[#dfd7c6]">{article.titleLines[1]}</span>
              </h1>

              {/* Intro Narrative */}
              <div className="border-l border-[#dfd7c6]/30 pl-6 my-6">
                <p className="article-hero-intro text-[14px] md:text-[15.5px] font-light text-[#c8c2b5]/90 leading-[1.8] tracking-[0.01em] font-sans">
                  {article.intro}
                </p>
              </div>
            </div>

            {/* Publication Date Marker */}
            <div className="pt-8 text-[10px] tracking-[0.24em] uppercase text-[#c8c2b5]/40 font-mono flex items-center gap-4">
              <span>{article.publication}</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>FOLIO EDITION {article.year}</span>
            </div>
          </div>

          {/* Right Dominant Architectural Plate Column */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="article-hero-image-wrapper relative overflow-hidden bg-[#121517] aspect-[16/10] sm:aspect-[21/11] border border-white/[0.08] group">
              <img
                src={article.heroImage.src}
                alt={article.heroImage.alt}
                className="article-hero-image h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80 pointer-events-none">
                {article.heroImage.caption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
