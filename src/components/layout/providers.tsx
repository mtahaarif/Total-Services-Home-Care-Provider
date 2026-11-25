"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { LazyMotion, MotionConfig, m, useScroll, useSpring } from "framer-motion";

/**
 * Smooth wheel scrolling (Lenis), loaded on demand.
 *
 * Measured on the home page (mobile Lighthouse): running Lenis from page load
 * cost ~1s of main-thread blocking. Lenis only changes *mouse-wheel* scrolling
 * (touch is native either way), so it is now:
 *   - never loaded on touch / coarse-pointer devices or with reduced motion,
 *   - downloaded and started on the first wheel event on desktop.
 * Page load pays nothing; desktop visitors still get the smooth feel.
 */
function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let cancelled = false;
    const start = async () => {
      const { default: LenisCtor } = await import("lenis");
      if (cancelled || lenisRef.current) return;
      lenisRef.current = new LenisCtor({ lerp: 0.11, wheelMultiplier: 1, anchors: { offset: -110 }, autoRaf: true });
    };
    window.addEventListener("wheel", start, { once: true, passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("wheel", start);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Keep Lenis' internal position in sync with Next's scroll-to-top on navigation.
  useEffect(() => {
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-leaf-400 via-leaf-300 to-navy-400"
      style={{ scaleX }}
    />
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    // Animation features (domAnimation, no layout engine) load in a separate
    // chunk after first paint, keeping them out of the LCP path.
    // `strict` makes any stray full-size `motion.*` component throw in dev.
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        {children}
        <ScrollProgress />
      </MotionConfig>
    </LazyMotion>
  );
}

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);
