"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { site } from "@/lib/site";
import { Eyebrow } from "@/components/ui/section-heading";

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <m.span style={{ opacity, y }} className={accent ? "inline-block font-serif font-normal italic text-navy-500" : "inline-block"}>
        {children}
      </m.span>
    </span>
  );
}

/** Mission statement whose words light up one by one as you scroll. */
export function MissionScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = site.overview.split(" ");
  // Highlight the phrases "customized care plans" and "peace of mind".
  const highlight = new Set<number>();
  words.forEach((w, i) => {
    if (/^(customized|peace)$/i.test(w)) [i, i + 1, i + 2].forEach((n) => highlight.add(n));
  });

  const imgY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

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

        <div ref={ref} className="lg:col-span-9">
          <p className="text-[1.9rem] font-bold leading-[1.25] tracking-tight text-navy-950 sm:text-5xl sm:leading-[1.15]">
            {words.map((w, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]} accent={highlight.has(i)}>
                  {w}
                </Word>
              );
            })}
          </p>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6">
            <m.div style={{ y: imgY1, rotate }} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
              <Image quality={60} src="/images/hands.jpg" alt="Two people holding hands in reassurance" fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover" />
            </m.div>
            <m.div style={{ y: imgY2 }} className="relative mt-16 aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
              <Image quality={60} src="/images/family.jpg" alt="Family members smiling with a senior man at the table" fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover" />
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
