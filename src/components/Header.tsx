import React, { useState } from "react";
import { List, ArrowUpRight } from "@phosphor-icons/react";
import { Navigation } from "./Navigation";
import type { NavItem } from "../data/estateContent";
import { scrollToTarget } from "../services/smoothScroll";

interface HeaderProps {
  brand: string;
  navItems: NavItem[];
  primaryAction: {
    label: string;
    href: string;
  };
  isScrolled?: boolean;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  brand,
  navItems,
  primaryAction,
  isScrolled = false,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      if (onNavigate) {
        onNavigate("/");
      } else {
        window.location.assign("/");
      }
    } else {
      scrollToTarget(0, { duration: 1.15 });
    }
  };

  const handlePrimaryActionClick = (e: React.MouseEvent) => {
    if (primaryAction.href.startsWith("/")) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(primaryAction.href);
      } else {
        window.location.assign(primaryAction.href);
      }
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? "header-glass py-3 md:py-3.5"
          : "bg-transparent py-7 md:py-8 lg:py-9"
      }`}
    >
      <div className="mx-auto flex max-w-[1720px] items-center justify-between px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Brand Anchor */}
        <a
          href="#"
          onClick={handleBrandClick}
          aria-label={`${brand} Home`}
          className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
        >
          <span
            className={`font-medium uppercase transition-all duration-300 group-hover:text-[#dfd7c6] ${
              isScrolled
                ? "text-[12.5px] md:text-[13px] tracking-[0.28em] text-[#f6f6f4]"
                : "text-[13.5px] md:text-[14px] tracking-[0.26em] text-[#f6f6f4]"
            }`}
          >
            {brand}
          </span>
          <span className="text-[8px] tracking-[0.26em] text-[#c8c2b5]/60 uppercase transition-opacity duration-300 group-hover:opacity-100">
            Private Residences
          </span>
        </a>

        {/* Desktop Navigation: Architectural Index */}
        <Navigation
          items={navItems}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          inquiryAction={primaryAction}
          isScrolled={isScrolled}
          onNavigate={onNavigate}
        />

        {/* Right Actions: Private Inquiry & Mobile Trigger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={primaryAction.href}
            onClick={handlePrimaryActionClick}
            className={`hidden sm:inline-flex items-center gap-2 border uppercase text-[#f6f6f4] transition-all duration-300 hover:border-[#dfd7c6] hover:bg-[#dfd7c6] hover:text-[#0a0c0d] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6] active:scale-[0.98] ${
              isScrolled
                ? "border-white/12 bg-white/[0.02] px-3.5 py-1.5 text-[10px] tracking-[0.22em]"
                : "border-white/20 bg-white/5 px-4 py-2 text-[10.5px] tracking-[0.2em] backdrop-blur-sm"
            }`}
          >
            <span>{primaryAction.label}</span>
            <ArrowUpRight size={12} weight="regular" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            className="flex md:hidden h-9 w-9 items-center justify-center border border-white/15 bg-[#0a0c0d]/60 text-[#f6f6f4] backdrop-blur-md transition-colors hover:border-[#dfd7c6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#dfd7c6]"
          >
            <List size={18} weight="regular" />
          </button>
        </div>
      </div>
    </header>
  );
};
