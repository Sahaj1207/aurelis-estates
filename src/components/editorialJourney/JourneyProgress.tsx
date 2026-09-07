import React from "react";

interface JourneyProgressProps {
  currentFrame: number;
  totalFrames: number;
}

export const JourneyProgress: React.FC<JourneyProgressProps> = ({
  currentFrame,
  totalFrames,
}) => {
  const frames = Array.from({ length: totalFrames }, (_, i) => i + 1);

  return (
    <aside
      aria-label="Editorial Monograph Pagination"
      className="hidden md:flex flex-col items-end gap-2 select-none"
    >
      {frames.map((num) => {
        const isActive = currentFrame === num;

        return (
          <div
            key={num}
            className={`flex items-center gap-2 transition-all duration-400 ${
              isActive
                ? "text-[#dfd7c6] opacity-100 font-medium"
                : "text-white/30 opacity-40 font-light hover:opacity-60"
            }`}
          >
            <span
              className={`h-[1px] transition-all duration-400 ${
                isActive ? "w-3 bg-[#dfd7c6]" : "w-0 bg-transparent"
              }`}
            />
            <span className="font-mono text-[9px] tracking-[0.24em]">
              0{num}
            </span>
          </div>
        );
      })}
    </aside>
  );
};
