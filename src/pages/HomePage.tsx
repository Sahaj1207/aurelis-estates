import React, { useState } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { FeaturedResidence } from "../components/FeaturedResidence";
import { CinematicEditorialJourney } from "../components/editorialJourney";
import { CollectionSection } from "../components/collection";
import { ApproachSection } from "../components/approach";
import { JournalSection } from "../components/journal";
import { PrivateInquirySection } from "../components/inquiry/PrivateInquirySection";
import { FooterSection } from "../components/footer";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { heroContent, featuredResidenceContent } from "../data/estateContent";

interface HomePageProps {
  onNavigate: (path: string) => void;
  // False while the intro curtain still covers the page
  introComplete: boolean;
}

const portfolioIndex = [
  { label: "Materiality", value: "Roman Travertine & Basalt Monolith" },
  { label: "Site Area", value: "24,000 SQ FT Coastal Parcel" },
  { label: "Status", value: "Private Acquisition Only" },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, introComplete }) => {
  const { containerRef, imageRef, contentRef, isScrolled, isScrollingDown } =
    useHeroAnimation(introComplete);
  const [journeyActive, setJourneyActive] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0c0d] text-[#f6f6f4]">
      {/* Global Navigation Layer */}
      <Header
        brand={heroContent.brand}
        navItems={heroContent.navItems}
        primaryAction={heroContent.primaryAction}
        isScrolled={isScrolled}
        isHidden={journeyActive || isScrollingDown}
        onNavigate={onNavigate}
      />

      {/* Main Homepage Flow */}
      <main>
        {/* 1. Cinematic Homepage Hero */}
        <Hero
          data={heroContent}
          containerRef={containerRef}
          imageRef={imageRef}
          contentRef={contentRef}
        />

        {/* 2. Curated Portfolio Philosophy & Editorial Benchmark */}
        <section
          id="overview"
          aria-label="AURELIS Curated Portfolio"
          className="relative z-20 bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 pt-20 md:pt-28 pb-20 md:pb-28"
        >
          <div className="mx-auto max-w-[1720px]">
            {/* Top Row: Asymmetric Statement & Supporting Editorial Copy */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16 border-b border-white/[0.07] pb-12 md:pb-16">
              <div className="max-w-3xl">
                <span className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-4">
                  AURELIS Curated Portfolio
                </span>
                <h2 className="display-md font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.08]">
                  Sanctuaries crafted in dialogue with nature and light.
                </h2>
              </div>
              <p className="max-w-[36ch] text-[14px] md:text-[15px] text-[#c8c2b5]/80 font-light leading-[1.7] tracking-[0.01em] lg:text-right lg:self-end pb-1">
                Every residence in our private portfolio represents a singular architectural statement, commissioned for collectors of rare living environments.
              </p>
            </div>

            {/* Bottom Row: Editorial Specifications Index */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-12 pt-10 md:pt-16">
              {portfolioIndex.map((item) => (
                <div key={item.label} className="border-l border-white/[0.08] pl-6 md:pl-8 py-1">
                  <span className="text-[9.5px] tracking-[0.26em] text-[#c8c2b5]/50 uppercase font-sans block">
                    {item.label}
                  </span>
                  <span className="text-[13px] md:text-[13.5px] text-[#f6f6f4] tracking-[0.16em] uppercase font-sans font-medium mt-1.5 block">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Featured Residence Presentation: THE MARINE HOUSE */}
        <FeaturedResidence data={featuredResidenceContent} onNavigate={onNavigate} />

        {/* 4. Signature 2D Cinematic Editorial Journey: The Marine House */}
        <CinematicEditorialJourney onActiveChange={setJourneyActive} />

        {/* 5. The Collection: A Smaller Number of Exceptional Places */}
        <CollectionSection onNavigate={onNavigate} />

        {/* 6. 05 / The AURELIS Approach: Architectural Manifesto */}
        <ApproachSection />

        {/* 7. 06 / The Journal: The AURELIS Notebook */}
        <JournalSection onNavigate={onNavigate} />

        {/* 8. 07 / Private Inquiry: The Final Monograph Invitation */}
        <PrivateInquirySection onNavigate={onNavigate} />
      </main>

      {/* 9. 08 / Footer: Architectural Monograph Closing */}
      <FooterSection onNavigate={onNavigate} />
    </div>
  );
};
