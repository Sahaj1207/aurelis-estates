import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { scrollToTarget } from "../services/smoothScroll";
import { useMagnetic } from "../hooks/useMagnetic";

interface PrimaryButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  href = "#",
  onClick,
  className = "",
}) => {
  const content = (
    <span className="relative z-10 flex items-center gap-3">
      <span>{label}</span>
      <ArrowUpRight
        size={16}
        weight="regular"
        className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </span>
  );

  const magneticRef = useMagnetic<HTMLElement>();

  const handleAnchorClick = (e: React.MouseEvent) => {
    onClick?.();
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      scrollToTarget(href, { duration: 1.3 });
    }
  };

  const baseStyles =
    "group relative inline-flex items-center justify-center overflow-hidden px-7 py-4 text-[11.5px] font-medium tracking-[0.22em] uppercase text-[#0a0c0d] bg-[#dfd7c6] transition-[scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c0d] active:scale-[0.98]";

  if (href.startsWith("#")) {
    return (
      <a
        ref={magneticRef as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={handleAnchorClick}
        className={`${baseStyles} ${className}`}
      >
        <span className="absolute inset-0 bg-[#f6f6f4] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
        {content}
      </a>
    );
  }

  return (
    <button
      ref={magneticRef as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      <span className="absolute inset-0 bg-[#f6f6f4] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      {content}
    </button>
  );
};
