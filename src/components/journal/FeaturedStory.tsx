import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { journalContent } from "./journalData";
import { Img } from "../Img";

interface FeaturedStoryProps {
  onNavigate?: (path: string) => void;
}

export const FeaturedStory: React.FC<FeaturedStoryProps> = ({ onNavigate }) => {
  const { featuredStory } = journalContent;
  const articlePath = "/journal/quiet-power-of-monolithic-stone";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate?.(articlePath);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onNavigate?.(articlePath);
    }
  };

  return (
    <div className="featured-story-block mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
      <div
        role="link"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
        aria-label={`Read ${featuredStory.titleLines.join(" ")}`}
      >
        {/* Dominant Cover Spread Architectural Image (~7-8 cols at desktop) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="featured-story-image-wrapper relative overflow-hidden bg-[#121517] aspect-[16/10] sm:aspect-[21/11] border border-white/[0.08] group-hover:border-white/[0.18] transition-colors duration-500">
            <Img
              src={featuredStory.image.src}
              alt={featuredStory.image.alt}
              className="featured-story-image h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
            />
            {/* Architectural Stamp */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#0a0c0d]/85 backdrop-blur-md px-4 py-2 border border-white/[0.08] text-[9.5px] tracking-[0.24em] uppercase text-[#c8c2b5]/80 pointer-events-none">
              {featuredStory.image.caption}
            </div>
          </div>
        </div>

        {/* Story Typography & Metadata Column (~4-5 cols at desktop) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center lg:pl-2">
          {/* Metadata Row */}
          <div className="featured-story-meta flex items-center gap-4 text-[10px] tracking-[0.26em] uppercase text-[#dfd7c6]/75 font-mono mb-4">
            <span>{featuredStory.category}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="text-[#c8c2b5]/50">{featuredStory.readTime}</span>
          </div>

          {/* Headline */}
          <h3 className="featured-story-title text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.85rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.06] mb-6 transition-transform duration-300 group-hover:translate-x-1">
            <span className="block">{featuredStory.titleLines[0]}</span>
            <span className="block text-[#dfd7c6]">{featuredStory.titleLines[1]}</span>
          </h3>

          {/* Narrative */}
          <p className="featured-story-copy max-w-[36ch] text-[13.5px] md:text-[14.5px] font-light text-[#c8c2b5]/85 leading-[1.75] tracking-[0.01em] font-sans mb-8">
            {featuredStory.supportingText}
          </p>

          {/* Publication Metadata & Quiet Exploration Link */}
          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-[9.5px] tracking-[0.26em] uppercase text-[#c8c2b5]/40 font-mono">
              {featuredStory.publication}
            </span>
            <span className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase text-[#dfd7c6] group-hover:text-[#f6f6f4] transition-colors">
              <span>Read Essay</span>
              <ArrowUpRight
                size={13}
                weight="regular"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
