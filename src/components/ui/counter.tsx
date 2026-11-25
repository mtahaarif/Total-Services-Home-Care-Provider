"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/lib/use-in-view";

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Counts up from 0 to `to` the first time it scrolls into view (tiny rAF tween). */
export function Counter({
  to,
  decimals = 0,
  duration = 1.4,
  prefix = "",
  suffix = "",
}: {
  to: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    const fmt = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = fmt(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      el.textContent = fmt(to * easeOutExpo(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, decimals, duration, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {`${prefix}${to.toFixed(decimals)}${suffix}`}
    </span>
  );
}
