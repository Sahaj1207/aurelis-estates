import React from "react";
import { ArrowDown } from "@phosphor-icons/react";

interface SecondaryButtonProps {
  label: string;
  targetId?: string;
  onClick?: () => void;
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  label,
  targetId,
  onClick,
  className = "",
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
      return;
    }
    if (targetId) {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({
          top: window.innerHeight * 0.8,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={`group inline-flex items-center gap-3.5 py-3 text-[11px] font-medium tracking-[0.24em] uppercase text-[#c8c2b5] transition-colors duration-300 hover:text-[#f6f6f4] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c0d] ${className}`}
    >
      <span className="relative pb-0.5">
        <span>{label}</span>
        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#dfd7c6] transition-all duration-300 ease-out group-hover:w-full" />
      </span>
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-white/30 group-hover:translate-y-0.5">
        <ArrowDown size={12} weight="regular" className="text-[#c8c2b5] group-hover:text-[#f6f6f4]" />
      </span>
    </button>
  );
};
