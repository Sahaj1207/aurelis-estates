import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HomePage } from "./pages/HomePage";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { Lightbox } from "./components/Lightbox";
import {
  initSmoothScroll,
  scrollToTarget,
  saveHomepageScroll,
  getSavedHomepageScroll,
  clearSavedHomepageScroll,
  getLenis,
} from "./services/smoothScroll";

// Secondary routes ship as their own chunks so the homepage pays only for itself
const loadMarineHouse = () => import("./components/marineHouse/MarineHouseMonograph");
const loadInquiry = () => import("./components/inquiry/PrivateInquiryPage");
const loadAbout = () => import("./components/about/AboutPage");
const loadJournalArticle = () => import("./routes/JournalArticleRoute");
// The walk-through carries the 3D engine, so it is fetched only when someone opens it
const loadTour = () => import("./components/tour/ResidenceTour");

const MarineHouseMonograph = lazy(() =>
  loadMarineHouse().then((m) => ({ default: m.MarineHouseMonograph }))
);
const PrivateInquiryPage = lazy(() =>
  loadInquiry().then((m) => ({ default: m.PrivateInquiryPage }))
);
const AboutPage = lazy(() => loadAbout().then((m) => ({ default: m.AboutPage })));
const JournalArticleRoute = lazy(loadJournalArticle);
const ResidenceTour = lazy(loadTour);

const MARINE_HOUSE_PATH = "/residences/the-marine-house";
const TOUR_PATH = `${MARINE_HOUSE_PATH}/tour`;

const isDetailRoute = (path: string) =>
  path === MARINE_HOUSE_PATH ||
  path === TOUR_PATH ||
  path === "/inquiry" ||
  path === "/about" ||
  path.startsWith("/journal/");

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [introRevealed, setIntroRevealed] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const veilRef = useRef<HTMLDivElement>(null);
  const pendingHashRef = useRef<string | null>(null);

  // Initialize Lenis smooth scroll synchronized with GSAP ticker
  useEffect(() => {
    // Configure manual browser scroll restoration to prevent native fighting with Lenis
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const cleanup = initSmoothScroll();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Web fonts change headline metrics; trigger positions must be measured after they land
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  // Warm the secondary route chunks once the homepage has settled
  useEffect(() => {
    if (!introDone) return;
    const id = window.setTimeout(() => {
      loadMarineHouse();
      loadInquiry();
      loadAbout();
      loadJournalArticle();
    }, 1800);
    return () => window.clearTimeout(id);
  }, [introDone]);

  // Cross-route transition: dip to the page colour, swap the route beneath, lift again
  const transitionTo = useCallback((swap: () => void) => {
    const veil = veilRef.current;
    if (!veil || prefersReducedMotion()) {
      swap();
      return;
    }
    gsap.killTweensOf(veil);
    gsap.to(veil, {
      autoAlpha: 1,
      duration: 0.42,
      ease: "power2.inOut",
      onComplete: () => {
        swap();
        gsap.to(veil, { autoAlpha: 0, duration: 0.7, delay: 0.12, ease: "power2.out" });
      },
    });
  }, []);

  // Listen to browser Back/Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const targetPath = window.location.pathname;
      const veil = veilRef.current;
      // The URL has already changed, so cover instantly and lift over the new route
      if (veil && !prefersReducedMotion()) {
        gsap.killTweensOf(veil);
        gsap.set(veil, { autoAlpha: 1 });
        gsap.to(veil, { autoAlpha: 0, duration: 0.7, delay: 0.1, ease: "power2.out" });
      }
      if (isDetailRoute(targetPath)) {
        saveHomepageScroll(targetPath);
      }
      setCurrentPath(targetPath);
      if (isDetailRoute(targetPath)) {
        scrollToTarget(0, { immediate: true });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback(
    (path: string) => {
      if (path.startsWith("/#")) {
        const hash = path.replace("/", "");
        if (window.location.pathname === "/") {
          scrollToTarget(hash, { duration: 1.15 });
          return;
        }
        transitionTo(() => {
          pendingHashRef.current = hash;
          clearSavedHomepageScroll();
          window.history.pushState({}, "", "/");
          setCurrentPath("/");
        });
        return;
      }

      if (path === window.location.pathname) {
        scrollToTarget(0, { duration: 1.15 });
        return;
      }

      transitionTo(() => {
        // Capture homepage scroll position before entering detail route
        if (window.location.pathname === "/" && isDetailRoute(path)) {
          saveHomepageScroll(path);
        }
        window.history.pushState({}, "", path);
        setCurrentPath(path);
        if (path !== "/") {
          scrollToTarget(0, { immediate: true });
        }
      });
    },
    [transitionTo]
  );

  // Synchronous layout restoration on return to homepage (prevents visual flash at top)
  useLayoutEffect(() => {
    if (currentPath !== "/") return;

    const pendingHash = pendingHashRef.current;
    pendingHashRef.current = null;
    const savedPosition = pendingHash ? null : getSavedHomepageScroll();

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
      return;
    }

    const hash = pendingHash ?? window.location.hash;
    if (hash) {
      // Arriving from another route happens behind the veil, so land on the section directly
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        getLenis()?.resize();
        scrollToTarget(hash, pendingHash ? { immediate: true } : { duration: 1.15 });
      });
    }
  }, [currentPath]);

  const goHome = useCallback(() => navigate("/"), [navigate]);

  let route: ReactNode;
  if (currentPath === TOUR_PATH) {
    route = <ResidenceTour onBack={() => navigate(MARINE_HOUSE_PATH)} />;
  } else if (currentPath === MARINE_HOUSE_PATH) {
    route = <MarineHouseMonograph onBack={goHome} onNavigate={navigate} />;
  } else if (currentPath === "/inquiry") {
    route = <PrivateInquiryPage onBack={goHome} onNavigate={navigate} />;
  } else if (currentPath.startsWith("/journal/")) {
    const slug = currentPath.replace("/journal/", "").replace(/\/$/, "");
    route = (
      <JournalArticleRoute key={slug} slug={slug} onNavigate={navigate} onBack={goHome} />
    );
  } else if (currentPath === "/about") {
    route = <AboutPage onNavigate={navigate} onBack={goHome} />;
  } else {
    route = <HomePage onNavigate={navigate} introComplete={introRevealed} />;
  }

  // Detail routes play their own entrance on mount, so hold them until the curtain lifts.
  // The homepage mounts underneath straight away so its imagery loads behind the curtain.
  const holdForIntro = !introRevealed && currentPath !== "/";

  return (
    <>
      <Suspense fallback={<div className="min-h-[100svh] bg-[#0a0c0d]" />}>
        {holdForIntro ? null : route}
      </Suspense>

      {/* Route transition veil */}
      <div
        ref={veilRef}
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-[90] bg-[#0a0c0d] opacity-0"
      />

      <Lightbox />
      <Cursor />

      {!introDone && (
        <Preloader
          onReveal={() => setIntroRevealed(true)}
          onDone={() => setIntroDone(true)}
        />
      )}
    </>
  );
}

export default App;
