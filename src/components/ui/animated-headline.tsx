import { Fragment, type CSSProperties } from "react";
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
 * Headline with *accent* words picked out in a brand color. Server component —
 * animation is pure CSS:
 *
 * - default: word-by-word masked reveal when scrolled into view
 *   ([data-words], driven by the shared reveal observer).
 * - `immediate` (heroes): painted fully visible on the first frame, then eases
 *   up with a transform-only animation, so it never delays LCP.
 *
 * The heading's text content is exactly the sentence (no hidden duplicate).
 */
export function AnimatedHeadline({
  text,
  as: Tag = "h2",
  className,
  accentClassName,
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: Tag;
  className?: string;
  accentClassName?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const words = parseWords(text);
  const renderWord = (content: string, trailing: string, accent: boolean) => (
    <>
      {accent ? <span className={cn("tracking-normal", accentClassName)}>{content}</span> : content}
      {trailing}
    </>
  );

  if (immediate) {
    // Hero headline. First page load: painted fully visible, gentle rise
    // (LCP-safe). After any in-site navigation (`html.navigated`, forward or
    // back), each word rises in behind its own mask instead — see globals.css.
    return (
      <Tag className={cn("enter-rise hero-title", className)} style={delay ? { animationDelay: `${delay}s` } : undefined}>
        {words.map(({ content, trailing, accent }, i) => (
          <Fragment key={i}>
            <span className="hlw">
              <span className="hlw-i hero-w">{renderWord(content, trailing, accent)}</span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} data-words="" style={delay ? ({ "--d": `${delay}s` } as CSSProperties) : undefined}>
      {words.map(({ content, trailing, accent }, i) => (
        <Fragment key={i}>
          <span className="hlw">
            <span className="hlw-i">{renderWord(content, trailing, accent)}</span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
