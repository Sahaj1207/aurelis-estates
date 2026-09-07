import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { journalContent } from "./journalData";

interface EditorialIndexProps {
  onNavigate?: (path: string) => void;
}

export const EditorialIndex: React.FC<EditorialIndexProps> = ({ onNavigate }) => {
  const { stories } = journalContent;

  const handleStoryClick = (storyId: string) => {
    if (storyId === "place") {
      onNavigate?.("/journal/when-a-house-becomes-part-of-the-landscape");
    } else if (storyId === "material") {
      onNavigate?.("/journal/the-patina-of-time");
    } else if (storyId === "light") {
      onNavigate?.("/journal/designing-for-the-last-hour-of-daylight");
    }
  };

  return (
    <div className="editorial-index-container mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 pt-8 pb-16 md:pb-24">
      <div className="flex flex-col">
        {stories.map((story) => {
          const isRight = story.alignment === "right";

          return (
            <article
              key={story.id}
              onClick={() => handleStoryClick(story.id)}
              className="editorial-story-row group relative py-12 sm:py-16 md:py-20 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleStoryClick(story.id);
                }
              }}
              aria-label={`Read ${story.titleLines.join(" ")}`}
            >
              {/* Hairline Divider with origin left */}
              <div className="editorial-row-line absolute top-0 left-0 right-0 h-[1px] bg-white/[0.07] origin-left" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                {isRight ? (
                  <>
                    {/* Story Image Left on Desktop */}
                    <div className="lg:col-span-5 order-2 lg:order-1">
                      <div
                        className={`editorial-row-image-wrapper relative overflow-hidden bg-[#121517] ${story.image.aspectRatio} border border-white/[0.08] max-w-md group-hover:border-white/[0.16] transition-colors duration-500`}
                      >
                        <img
                          src={story.image.src}
                          alt={story.image.alt}
                          className="editorial-row-image h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                          loading="lazy"
                        />
                        <div className="absolute bottom-3 left-3 bg-[#0a0c0d]/85 backdrop-blur-md px-3 py-1.5 border border-white/[0.08] text-[8.5px] tracking-[0.22em] uppercase text-[#c8c2b5]/80 pointer-events-none">
                          {story.image.caption}
                        </div>
                      </div>
                    </div>

                    {/* Story Text Right on Desktop */}
                    <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-4 xl:pl-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="editorial-row-number flex items-center gap-3 text-[10px] tracking-[0.26em] uppercase text-[#dfd7c6]/70 font-mono">
                          <span>{story.category}</span>
                          <span className="h-1 w-1 rounded-full bg-white/20" />
                          <span className="text-[#c8c2b5]/40">{story.readTime}</span>
                        </div>
                        <ArrowUpRight
                          size={18}
                          weight="regular"
                          className="text-[#c8c2b5]/40 transition-all duration-300 group-hover:text-[#dfd7c6] group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </div>

                      <h4 className="editorial-row-title text-2xl sm:text-3xl md:text-[2.25rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.1] mb-4 transition-transform duration-300 group-hover:translate-x-1">
                        {story.titleLines.map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </h4>

                      <p className="editorial-row-desc max-w-[38ch] text-[13.5px] md:text-[14px] font-light text-[#c8c2b5]/75 leading-[1.7] tracking-[0.01em] font-sans">
                        {story.descriptor}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Story Text Left on Desktop */}
                    <div className="lg:col-span-7">
                      <div className="flex items-center justify-between mb-4">
                        <div className="editorial-row-number flex items-center gap-3 text-[10px] tracking-[0.26em] uppercase text-[#dfd7c6]/70 font-mono">
                          <span>{story.category}</span>
                          <span className="h-1 w-1 rounded-full bg-white/20" />
                          <span className="text-[#c8c2b5]/40">{story.readTime}</span>
                        </div>
                        <ArrowUpRight
                          size={18}
                          weight="regular"
                          className="text-[#c8c2b5]/40 transition-all duration-300 group-hover:text-[#dfd7c6] group-hover:translate-x-1 group-hover:-translate-y-1 lg:hidden"
                        />
                      </div>

                      <h4 className="editorial-row-title text-2xl sm:text-3xl md:text-[2.25rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.1] mb-4 transition-transform duration-300 group-hover:translate-x-1">
                        {story.titleLines.map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </h4>

                      <p className="editorial-row-desc max-w-[38ch] text-[13.5px] md:text-[14px] font-light text-[#c8c2b5]/75 leading-[1.7] tracking-[0.01em] font-sans">
                        {story.descriptor}
                      </p>
                    </div>

                    {/* Story Image Right on Desktop */}
                    <div className="lg:col-span-5">
                      <div
                        className={`editorial-row-image-wrapper relative overflow-hidden bg-[#121517] ${story.image.aspectRatio} border border-white/[0.08] max-w-md group-hover:border-white/[0.16] transition-colors duration-500`}
                      >
                        <img
                          src={story.image.src}
                          alt={story.image.alt}
                          className="editorial-row-image h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                          loading="lazy"
                        />
                        <div className="absolute bottom-3 left-3 bg-[#0a0c0d]/85 backdrop-blur-md px-3 py-1.5 border border-white/[0.08] text-[8.5px] tracking-[0.22em] uppercase text-[#c8c2b5]/80 pointer-events-none">
                          {story.image.caption}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
