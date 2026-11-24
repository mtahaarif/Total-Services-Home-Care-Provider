"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Gentle whole-section fade-in on scroll (inspired by benevolencehomeservices.com).
 *
 * After each navigation, every top-level <section> inside <main> that is still
 * below the fold gets `reveal-pending` (opacity 0) and switches to
 * `reveal-shown` (0.9s opacity transition) when it scrolls into view.
 *
 * - Runs only after hydration and only on off-screen sections, so it never
 *   hides content on first paint (no LCP/CLS cost) and crawlers see everything.
 * - Sections already visible are left untouched.
 * - Disabled for prefers-reduced-motion (also neutralised in CSS).
 */
export function SectionReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | undefined;
    // Two frames: let Next finish its scroll-to-top for the new route first.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              entry.target.classList.replace("reveal-pending", "reveal-shown");
              observer?.unobserve(entry.target);
            }
          },
          { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
        );

        const sections = document.querySelectorAll<HTMLElement>("main section");
        for (const el of sections) {
          // Top-level sections only (nested sections fade with their parent).
          if (el.parentElement?.closest("section")) continue;
          if (el.classList.contains("reveal-shown")) continue;
          const rect = el.getBoundingClientRect();
          // Skip hidden (e.g. preserved previous routes) and on-screen sections.
          if (rect.height === 0 || rect.top < window.innerHeight) continue;
          el.classList.add("reveal-pending");
          observer.observe(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      observer?.disconnect();
      // Never leave content stuck invisible if we unmount mid-way.
      document.querySelectorAll(".reveal-pending").forEach((el) => el.classList.replace("reveal-pending", "reveal-shown"));
    };
  }, [pathname]);

  return null;
}
