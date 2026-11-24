"use client";

import { motion } from "motion/react";
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
  /** Animate on mount instead of when scrolled into view (use for heroes). */
  immediate?: boolean;
}) {
  const words = parseWords(text);
  const plain = text.replace(/\*/g, "");
  const trigger = immediate
    ? { animate: { y: "0%", rotate: 0 } }
    : { whileInView: { y: "0%", rotate: 0 }, viewport: { once: true, margin: "0px 0px -60px 0px" } };

  return (
    <Tag className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden>
        {words.map(({ content, trailing, accent }, i) => {
          return (
            <span key={i} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top">
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: "110%", rotate: 4 }}
                {...trigger}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
              >
                {accent ? (
                  <span className={cn("font-serif font-normal italic tracking-normal", accentClassName)}>{content}</span>
                ) : (
                  content
                )}
                {trailing}
              </motion.span>
              {i < words.length - 1 && " "}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
