"use client";

import { useEffect, useState, type RefObject } from "react";

/** Minimal IntersectionObserver hook (replaces the animation library's useInView). */
export function useInView(ref: RefObject<Element | null>, { margin = "0px", once = false }: { margin?: string; once?: boolean } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) io.disconnect();
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, once]);
  return inView;
}
