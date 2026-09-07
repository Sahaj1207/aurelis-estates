import React from "react";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import type { JournalArticleData } from "../../data/journalArticlesData";

interface JournalArticleClosingProps {
  article: JournalArticleData;
  onNavigate: (path: string) => void;
  onBack: () => void;
}

export const JournalArticleClosing: React.FC<JournalArticleClosingProps> = ({
  article,
  onNavigate,
  onBack,
}) => {
  const { closing, nextArticle } = article;

  return (
    <div className="article-closing-block relative mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 pt-20 md:pt-28 pb-24 md:pb-36 border-t border-white/[0.07]">
      {/* Top Editorial Hairline */}
      <div className="article-closing-line absolute top-0 left-6 sm:left-8 md:left-12 lg:left-16 right-6 sm:right-8 md:right-12 lg:right-16 h-[1px] bg-white/[0.07] origin-left" />

      {/* Main Closing Editorial Declaration */}
      <div className="max-w-4xl mb-16 md:mb-24">
        <span className="text-[10px] md:text-[10.5px] font-mono tracking-[0.28em] uppercase text-[#dfd7c6]/80 block mb-5">
          {closing.label}
        </span>
        <h3 className="article-closing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.05] mb-6">
          <span className="block">{closing.statementLines[0]}</span>
          <span className="block text-[#dfd7c6]">{closing.statementLines[1]}</span>
        </h3>
        <p className="article-closing-copy max-w-[42ch] text-[14px] md:text-[15.5px] font-light text-[#c8c2b5]/90 leading-[1.75] tracking-[0.01em] font-sans">
          {closing.supportingCopy}
        </p>
      </div>

      {/* Next Observation Navigation Plate & Return Action */}
      <div className="pt-12 border-t border-white/[0.07] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Next Observation Box */}
        <div className="lg:col-span-8">
          <div
            role="link"
            tabIndex={0}
            onClick={() => onNavigate(`/journal/${nextArticle.slug}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onNavigate(`/journal/${nextArticle.slug}`);
              }
            }}
            className="article-next-card group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-white/[0.08] p-6 sm:p-8 bg-[#121517]/60 hover:border-white/[0.2] transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
            aria-label={`Read next article: ${nextArticle.titleLines.join(" ")}`}
          >
            <div>
              <div className="flex items-center gap-3 text-[9.5px] tracking-[0.26em] uppercase text-[#dfd7c6]/70 font-mono mb-2">
                <span>{nextArticle.label}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="text-[#c8c2b5]/50">{nextArticle.category}</span>
              </div>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-light font-serif text-[#f6f6f4] tracking-[-0.01em] leading-[1.1] transition-transform duration-300 group-hover:translate-x-1">
                <span className="block">{nextArticle.titleLines[0]}</span>
                <span className="block text-[#dfd7c6]">{nextArticle.titleLines[1]}</span>
              </h4>
            </div>

            <div className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase text-[#c8c2b5] group-hover:text-[#f6f6f4] transition-colors shrink-0">
              <span>Continue Reading</span>
              <ArrowRight
                size={14}
                weight="regular"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>

        {/* Explore Journal Link */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <button
            type="button"
            onClick={onBack}
            className="article-closing-link group inline-flex items-center gap-3 border border-[#dfd7c6]/30 px-6 py-4 text-[11px] font-medium tracking-[0.24em] uppercase text-[#f6f6f4] hover:border-[#dfd7c6] hover:bg-[#dfd7c6]/10 transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
          >
            <span>Explore The Journal</span>
            <ArrowUpRight
              size={14}
              weight="regular"
              className="text-[#dfd7c6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
