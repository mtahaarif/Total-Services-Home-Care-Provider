import type { CSSProperties } from "react";
import Image from "next/image";
import { steps } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const tones = [
  { card: "bg-navy-700 text-white", num: "text-leaf-300", body: "text-white/75" },
  { card: "bg-leaf-300 text-navy-950", num: "text-navy-600", body: "text-navy-900/75" },
  { card: "bg-white text-navy-950 border border-navy-100", num: "text-navy-500", body: "text-muted" },
  { card: "bg-navy-950 text-white", num: "text-leaf-400", body: "text-white/70" },
];

/**
 * Vertical stacking cards: each step pins, then shrinks as the next one slides
 * over it. Server component — the scroll-linked scaling is native CSS
 * (`.steps` / `.step-card` / `.step-img` in globals.css), no JavaScript.
 */
export function StackingSteps() {
  const total = steps.length;
  return (
    <section className="relative pt-24 sm:pt-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title="Getting started is *simple.*"
          description="From the first phone call to the first visit, we keep things clear, calm and centered on your family."
        />
        <div className="steps relative mt-4">
          {steps.map((step, i) => {
            const tone = tones[i % tones.length];
            const vars = {
              "--from": `${(i / total) * 100}%`,
              "--to": `${((i + 1) / total) * 100}%`,
              "--target": 1 - (total - 1 - i) * 0.05,
              top: `calc(-5vh + ${i * 28}px)`,
            } as CSSProperties;
            return (
              <div key={step.title} className="sticky top-0 flex h-screen items-center">
                <article
                  style={vars}
                  className={cn(
                    "step-card relative grid w-full origin-top overflow-hidden rounded-[2.5rem] shadow-[0_-20px_60px_-30px_rgb(8_26_48/0.45)] md:h-[min(30rem,68vh)] md:grid-cols-2",
                    tone.card,
                  )}
                >
                  <div className="flex flex-col justify-between gap-6 p-7 sm:p-10">
                    <div className="flex items-center gap-4">
                      <span className={cn("text-6xl leading-none sm:text-7xl", tone.num)}>0{i + 1}</span>
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
                    <div className="step-img absolute inset-0">
                      <Image quality={60} src={step.image} alt="" fill sizes="(min-width: 768px) 40rem, 100vw" className="object-cover" />
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
