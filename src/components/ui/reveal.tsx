import type { CSSProperties, HTMLAttributes } from "react";

/*
 * Scroll-triggered entrances rendered as plain markup (server components).
 * The animation itself is CSS (globals.css) toggled by one shared
 * IntersectionObserver (lib/reveal-script.ts) — no per-element JavaScript,
 * no hydration cost, no animation library.
 */

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  /** Seconds before the entrance starts. */
  delay?: number;
  /** Starting vertical offset in px (default 32). */
  y?: number;
  /** Starting horizontal offset in px. */
  x?: number;
  /** Starting scale (e.g. 0.95). */
  scale?: number;
};

/** Fades + lifts its children into view once, when scrolled into the viewport. */
export function Reveal({ delay = 0, y = 32, x = 0, scale = 1, style, ...rest }: RevealProps) {
  const vars: Record<string, string> = {};
  if (delay) vars["--d"] = `${delay}s`;
  if (y !== 32) vars["--ay"] = `${y}px`;
  if (x) vars["--ax"] = `${x}px`;
  if (scale !== 1) vars["--as"] = String(scale);
  return <div data-animate="" style={{ ...vars, ...style } as CSSProperties} {...rest} />;
}

/** Parent whose <StaggerItem> children enter one after another. */
export function Stagger({ stagger = 0.08, style, ...rest }: HTMLAttributes<HTMLDivElement> & { stagger?: number }) {
  const vars = stagger !== 0.08 ? { "--st": `${stagger * 1000}ms` } : {};
  return <div data-stagger="" style={{ ...vars, ...style } as CSSProperties} {...rest} />;
}

export function StaggerItem(props: HTMLAttributes<HTMLDivElement>) {
  return <div data-animate-child="" {...props} />;
}
