import React from "react";
import { journeyWaypoints, type CameraWaypoint } from "./journeyData";

interface JourneyProgressProps {
  currentProgress: number;
  activeWaypoint: CameraWaypoint;
  onSelectWaypoint?: (progress: number) => void;
}

export const JourneyProgress: React.FC<JourneyProgressProps> = ({
  currentProgress,
  activeWaypoint,
  onSelectWaypoint,
}) => {
  return (
    <aside
      aria-label="Cinematic Journey Progress"
      className="hidden md:flex flex-col gap-6 select-none"
    >
      <div className="flex flex-col gap-1">
        <span className="text-[9px] tracking-[0.28em] uppercase text-[#dfd7c6]/70 font-sans">
          Journey Milestone
        </span>
        <span className="text-[11px] tracking-[0.2em] uppercase text-[#f6f6f4] font-medium font-sans">
          {Math.round(currentProgress * 100)}% Complete
        </span>
      </div>

      {/* Vertical Hairline Progress Bar with Milestones */}
      <div className="relative flex flex-col gap-5 border-l border-white/[0.08] pl-4">
        {journeyWaypoints.map((wp) => {
          const isActive = activeWaypoint.marker === wp.marker;
          const isPassed = currentProgress >= wp.progress;

          return (
            <button
              key={wp.marker}
              type="button"
              onClick={() => onSelectWaypoint && onSelectWaypoint(wp.progress)}
              className={`group flex items-center gap-3 text-left transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] ${
                isActive
                  ? "text-[#f6f6f4]"
                  : isPassed
                  ? "text-[#c8c2b5]/70 hover:text-[#f6f6f4]"
                  : "text-[#c8c2b5]/35 hover:text-[#c8c2b5]/70"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#dfd7c6] scale-125"
                    : isPassed
                    ? "bg-white/40"
                    : "bg-white/15"
                }`}
              />
              <div className="flex flex-col">
                <span className="text-[9px] tracking-[0.24em] uppercase font-sans">
                  {wp.marker.split(" / ")[1]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
