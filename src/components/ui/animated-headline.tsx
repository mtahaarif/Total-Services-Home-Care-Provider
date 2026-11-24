"use client";

import type { CSSProperties } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p";

/** Parse "*accent phrases*" (which may span several words) into per-word tokens. */
function parseWords(text: string) {
  const out: { content: string; trailing: string; accent: boolean }[] = [];
  let inAccent = false;
  for (const raw of text.split(" ")) {
    let w = raw;
    const opens = w.startsWith("*");
    if (opens) w = w.slice(1);
    const close = w.match(/\*([.,!?;:]*)$/);
    if (close) w = w.slice(0, w.length - close[0].length);
    out.push({ content: w, trailing: close ? close[1] : "", accent: inAccent || opens });
    inAccent = (inAccent || opens) && !close;
  }
  return out;
}

/**
 * Word-by-word masked reveal. Wrap words in *asterisks* to render them in the
 * serif italic accent style, e.g. "Care that feels like *home*."
 *
 * The heading's text content is exactly the sentence (no hidden duplicate), so
 * crawlers and screen readers read it once.
 *
 * `immediate` (heroes) uses a CSS-only, never-hidden entrance so the text is
 * painted on first render without waiting for hydration — important for LCP.
 */
export function AnimatedHeadline({
  text,
  as: Tag = "h2",
  className,
  accentClassName,
  delay = 0,
  stagger = 0.055,
  immediate = false,
}: {
  text: string;
  as?: Tag;
  className?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const words = parseWords(text);

  const renderWord = (content: string, trailing: string, accent: boolean) => (
    <>
      {accent ? <span className={cn("font-serif font-normal italic tracking-normal", accentClassName)}>{content}</span> : content}
      {trailing}
    </>
  );

  if (immediate) {
    // Above-the-fold headline: painted fully visible on the very first frame
    // (it is usually the LCP element), then eases up with a transform-only
    // CSS animation. Nothing is clipped or transparent, so LCP == first paint.
    return (
      <Tag className={cn("enter-rise", className)} style={{ animationDelay: `${delay}s` } as CSSProperties}>
        {words.map(({ content, trailing, accent }, i) => (
          <span key={i}>
            {renderWord(content, trailing, accent)}
            {i < words.length - 1 && " "}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {words.map(({ content, trailing, accent }, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top">
          <m.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", rotate: 4 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
          >
            {renderWord(content, trailing, accent)}
          </m.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
