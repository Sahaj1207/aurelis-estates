import React from "react";

interface JournalPullQuoteProps {
  quote: string;
}

export const JournalPullQuote: React.FC<JournalPullQuoteProps> = ({ quote }) => {
  return (
    <div className="article-pull-quote-block relative mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32">
      {/* Top Hairline Rule */}
      <div className="article-pull-quote-line absolute top-6 left-6 sm:left-8 md:left-12 lg:left-16 right-6 sm:right-8 md:right-12 lg:right-16 h-[1px] bg-white/[0.07] origin-left" />

      <div className="max-w-4xl mx-auto text-center py-6">
        <blockquote className="article-pull-quote-text text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light font-serif text-[#dfd7c6] tracking-[-0.015em] leading-[1.2]">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>

      {/* Bottom Hairline Rule */}
      <div className="article-pull-quote-line absolute bottom-6 left-6 sm:left-8 md:left-12 lg:left-16 right-6 sm:right-8 md:right-12 lg:right-16 h-[1px] bg-white/[0.07] origin-left" />
    </div>
  );
};
