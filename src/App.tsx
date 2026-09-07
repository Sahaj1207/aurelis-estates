import { useState, useEffect, useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedResidence } from "./components/FeaturedResidence";
import { CinematicEditorialJourney } from "./components/editorialJourney";
import { CollectionSection } from "./components/collection";
import { ApproachSection } from "./components/approach";
import { JournalSection } from "./components/journal";
import {
  PrivateInquirySection,
  PrivateInquiryPage,
} from "./components/inquiry";
import { FooterSection } from "./components/footer";
import { MarineHouseMonograph } from "./components/marineHouse";
import { JournalArticlePage } from "./components/journalArticle";
import { AboutPage } from "./components/about";
import {
  journalArticlesMap,
  monolithicStoneArticle,
} from "./data/journalArticlesData";
import { useHeroAnimation } from "./hooks/useHeroAnimation";
import { heroContent, featuredResidenceContent } from "./data/estateContent";
import {
  initSmoothScroll,
  scrollToTarget,
  saveHomepageScroll,
  getSavedHomepageScroll,
  clearSavedHomepageScroll,
  getLenis,
} from "./services/smoothScroll";

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const { containerRef, imageRef, contentRef, isScrolled } = useHeroAnimation();

  // Initialize Lenis smooth scroll synchronized with GSAP ticker
  useEffect(() => {
    // Configure manual browser scroll restoration to prevent native fighting with Lenis
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const cleanup = initSmoothScroll();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Listen to browser Back/Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const targetPath = window.location.pathname;
      if (
        targetPath === "/residences/the-marine-house" ||
        targetPath === "/inquiry" ||
        targetPath === "/about" ||
        targetPath.startsWith("/journal/")
      ) {
        saveHomepageScroll(targetPath);
      }
      setCurrentPath(targetPath);
      if (
        targetPath === "/residences/the-marine-house" ||
        targetPath === "/inquiry" ||
        targetPath === "/about" ||
        targetPath.startsWith("/journal/")
      ) {
        scrollToTarget(0, { immediate: true });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (
      path === "/residences/the-marine-house" ||
      path === "/inquiry" ||
      path === "/about" ||
      path.startsWith("/journal/")
    ) {
      // Capture homepage scroll position before entering detail route
      if (currentPath === "/") {
        saveHomepageScroll(path);
      }
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      scrollToTarget(0, { immediate: true });
    } else if (path.startsWith("/#")) {
      const hash = path.replace("/", "");
      window.history.pushState({}, "", "/");
      setCurrentPath("/");
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        scrollToTarget(hash, { duration: 1.15 });
      });
    } else if (path === "/") {
      // Returning to homepage
      window.history.pushState({}, "", path);
      setCurrentPath(path);
    } else {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      scrollToTarget(0, { immediate: true });
    }
  };

  // Synchronous layout restoration on return to homepage (prevents visual flash at top)
  useLayoutEffect(() => {
    if (currentPath === "/") {
      const savedPosition = getSavedHomepageScroll();
      if (savedPosition !== null) {
        // 1. Immediately set native window scroll before paint to prevent flashing at top
        window.scrollTo(0, savedPosition);

        // 2. Wait for child components and ScrollTrigger pin-spacers to establish full height
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          const lenis = getLenis();
          if (lenis) {
            lenis.resize();
            lenis.scrollTo(savedPosition, { immediate: true });
          } else {
            window.scrollTo(0, savedPosition);
          }

          // 3. Confirm exact positioning on following frame and invalidate stored state
          requestAnimationFrame(() => {
            if (lenis) {
              lenis.scrollTo(savedPosition, { immediate: true });
            }
            clearSavedHomepageScroll();
          });
        });
      } else if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash;
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          setTimeout(() => {
            scrollToTarget(hash, { duration: 1.15 });
          }, 80);
        });
      }
    }
  }, [currentPath]);

  // Dedicated Route: Flagship Marine House Monograph
  if (currentPath === "/residences/the-marine-house") {
    return <MarineHouseMonograph onBack={() => navigate("/")} />;
  }

  // Dedicated Route: Private Inquiry
  if (currentPath === "/inquiry") {
    return (
      <PrivateInquiryPage
        onBack={() => navigate("/")}
        onNavigate={navigate}
      />
    );
  }

  // Dedicated Route: AURELIS Journal Article
  if (currentPath.startsWith("/journal/")) {
    const slug = currentPath.replace("/journal/", "").replace(/\/$/, "");
    const article = journalArticlesMap[slug] ?? monolithicStoneArticle;
    return (
      <JournalArticlePage
        article={article}
        onNavigate={navigate}
        onBack={() => navigate("/")}
      />
    );
  }

  // Dedicated Route: About Page
  if (currentPath === "/about") {
    return (
      <AboutPage
        onNavigate={navigate}
        onBack={() => navigate("/")}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0c0d] text-[#f6f6f4]">
      {/* Global Navigation Layer */}
      <Header
        brand={heroContent.brand}
        navItems={heroContent.navItems}
        primaryAction={heroContent.primaryAction}
        isScrolled={isScrolled}
        onNavigate={navigate}
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
          className="relative z-20 bg-[#0a0c0d] px-6 sm:px-8 md:px-12 lg:px-16 pt-16 md:pt-24 pb-24 md:pb-32"
        >
          <div className="mx-auto max-w-[1720px]">
            {/* Top Row: Asymmetric Statement & Supporting Editorial Copy */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16 border-b border-white/[0.07] pb-12 md:pb-16">
              <div className="max-w-2xl">
                <span className="text-[10px] md:text-[10.5px] font-medium tracking-[0.3em] uppercase text-[#dfd7c6]/85 block mb-3.5">
                  AURELIS Curated Portfolio
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[3.15rem] font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.12]">
                  Sanctuaries crafted in dialogue with nature and light.
                </h2>
              </div>
              <p className="max-w-[34ch] text-[13.5px] md:text-[14.5px] text-[#c8c2b5]/80 font-light leading-[1.7] tracking-[0.01em] lg:text-right lg:self-end pb-1">
                Every residence in our private portfolio represents a singular architectural statement, commissioned for collectors of rare living environments.
              </p>
            </div>

            {/* Bottom Row: Editorial Specifications Index */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 md:pt-16">
              <div className="border-l border-white/[0.08] pl-6 md:pl-8 py-1">
                <span className="text-[9.5px] tracking-[0.26em] text-[#c8c2b5]/50 uppercase font-sans block">
                  Materiality
                </span>
                <span className="text-[13px] md:text-[13.5px] text-[#f6f6f4] tracking-[0.16em] uppercase font-sans font-medium mt-1.5 block">
                  Roman Travertine & Basalt Monolith
                </span>
              </div>
              <div className="border-l border-white/[0.08] pl-6 md:pl-8 py-1">
                <span className="text-[9.5px] tracking-[0.26em] text-[#c8c2b5]/50 uppercase font-sans block">
                  Site Area
                </span>
                <span className="text-[13px] md:text-[13.5px] text-[#f6f6f4] tracking-[0.16em] uppercase font-sans font-medium mt-1.5 block">
                  24,000 SQ FT Coastal Parcel
                </span>
              </div>
              <div className="border-l border-white/[0.08] pl-6 md:pl-8 py-1">
                <span className="text-[9.5px] tracking-[0.26em] text-[#c8c2b5]/50 uppercase font-sans block">
                  Status
                </span>
                <span className="text-[13px] md:text-[13.5px] text-[#f6f6f4] tracking-[0.16em] uppercase font-sans font-medium mt-1.5 block">
                  Private Acquisition Only
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Featured Residence Presentation: THE MARINE HOUSE */}
        <FeaturedResidence
          data={featuredResidenceContent}
          onNavigate={navigate}
        />

        {/* 4. Signature 2D Cinematic Editorial Journey: The Marine House */}
        <CinematicEditorialJourney />

        {/* 5. The Collection: A Smaller Number of Exceptional Places */}
        <CollectionSection onNavigate={navigate} />

        {/* 6. 05 / The AURELIS Approach: Architectural Manifesto */}
        <ApproachSection />

        {/* 7. 06 / The Journal: The AURELIS Notebook */}
        <JournalSection onNavigate={navigate} />

        {/* 8. 07 / Private Inquiry: The Final Monograph Invitation */}
        <PrivateInquirySection onNavigate={navigate} />
      </main>

      {/* 9. 08 / Footer: Architectural Monograph Closing */}
      <FooterSection onNavigate={navigate} />
    </div>
  );
}

export default App;
