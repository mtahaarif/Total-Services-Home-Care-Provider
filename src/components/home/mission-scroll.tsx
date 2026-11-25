import type { CSSProperties } from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import { Eyebrow } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

// Words light up between these points of the paragraph's journey through the
// viewport (CSS `cover` range): ~entering the lower screen → mostly read.
const RANGE_START = 10;
const RANGE_END = 68;

/**
 * Mission statement whose words light up one by one as you scroll.
 * Server component — the scroll-linked effect is native CSS (`.mission-text`,
 * `.mission-word`, `.drift-*` in globals.css), no JavaScript per frame.
 * Without CSS scroll-timeline support the text simply shows fully.
 */
export function MissionScroll() {
  const words = site.overview.split(" ");
  // Highlight the phrases "customized care plans" and "peace of mind".
  const highlight = new Set<number>();
  words.forEach((w, i) => {
    if (/^(customized|peace)$/i.test(w)) [i, i + 1, i + 2].forEach((n) => highlight.add(n));
  });
  const span = (RANGE_END - RANGE_START) / words.length;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Our promise</Eyebrow>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              In our own words — the idea behind every visit, every care plan and every caregiver we send.
            </p>
          </div>
        </div>

        <div className="lg:col-span-9">
          <p className="mission-text text-[1.9rem] font-bold leading-[1.25] tracking-tight text-navy-950 sm:text-5xl sm:leading-[1.15]">
            {words.map((w, i) => (
              <span key={i} className="mr-[0.25em] inline-block">
                <span
                  className={cn("mission-word inline-block", highlight.has(i) && "text-navy-500")}
                  style={{ "--s": `${RANGE_START + i * span}%`, "--e": `${RANGE_START + (i + 1) * span}%` } as CSSProperties}
                >
                  {w}
                </span>
              </span>
            ))}
          </p>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="drift-a relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
              <Image quality={60} src="/images/hands.jpg" alt="Two people holding hands in reassurance" fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover" />
            </div>
            <div className="drift-b relative mt-16 aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
              <Image quality={60} src="/images/family.jpg" alt="Family members smiling with a senior man at the table" fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
