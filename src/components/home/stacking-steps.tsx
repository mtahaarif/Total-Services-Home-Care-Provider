"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { steps } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const tones = [
  { card: "bg-navy-700 text-white", num: "text-leaf-300", body: "text-white/75" },
  { card: "bg-leaf-300 text-navy-950", num: "text-navy-600", body: "text-navy-900/75" },
  { card: "bg-white text-navy-950 border border-navy-100", num: "text-navy-500", body: "text-muted" },
  { card: "bg-navy-950 text-white", num: "text-leaf-400", body: "text-white/70" },
];

function StepCard({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const step = steps[i];
  const total = steps.length;
  const tone = tones[i % tones.length];
  const targetScale = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const imgScale = useTransform(progress, [i / total, (i + 1) / total], [1.25, 1]);

  return (
    <div className="sticky top-0 flex h-screen items-center">
      <motion.article
        style={{ scale, top: `calc(-5vh + ${i * 28}px)` }}
        className={cn(
          "relative grid w-full origin-top overflow-hidden rounded-[2.5rem] shadow-[0_-20px_60px_-30px_rgb(8_26_48/0.45)] md:h-[min(30rem,68vh)] md:grid-cols-2",
          tone.card,
        )}
      >
        <div className="flex flex-col justify-between gap-6 p-7 sm:p-10">
          <div className="flex items-center gap-4">
            <span className={cn("font-serif text-6xl italic leading-none sm:text-7xl", tone.num)}>0{i + 1}</span>
            <span className="h-px flex-1 bg-current opacity-20" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
              Step {i + 1} of {total}
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{step.title}</h3>
            <p className={cn("mt-4 max-w-md text-lg leading-relaxed", tone.body)}>{step.body}</p>
          </div>
        </div>
        <div className="relative h-56 overflow-hidden md:h-full">
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            <Image src={step.image} alt="" fill sizes="(min-width: 768px) 40rem, 100vw" className="object-cover" />
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

/** Vertical stacking cards: each step pins, then shrinks as the next one slides over it. */
export function StackingSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="relative pt-24 sm:pt-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title="Getting started is *simple.*"
          description="From the first phone call to the first visit, we keep things clear, calm and centered on your family."
        />
        <div ref={ref} className="relative mt-4">
          {steps.map((s, i) => (
            <StepCard key={s.title} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
