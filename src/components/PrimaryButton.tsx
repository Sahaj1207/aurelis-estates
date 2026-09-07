import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

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

  const baseStyles =
    "group relative inline-flex items-center justify-center overflow-hidden px-7 py-3.5 text-[12px] font-medium tracking-[0.22em] uppercase text-[#0a0c0d] bg-[#dfd7c6] transition-all duration-400 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c0d] active:scale-[0.98]";

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`${baseStyles} ${className}`}
      >
        <span className="absolute inset-0 bg-[#f6f6f4] translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      <span className="absolute inset-0 bg-[#f6f6f4] translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      {content}
    </button>
  );
};
