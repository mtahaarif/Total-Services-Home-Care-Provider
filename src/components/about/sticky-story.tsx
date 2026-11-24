"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useInView } from "motion/react";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "We listen first",
    body: "Before anything else, we learn who your loved one is — their history, routines, likes, dislikes and what a good day looks like to them.",
    image: "/images/medication-solo.jpg",
    alt: "Senior man sitting at a table in a bright room",
  },
  {
    title: "We match thoughtfully",
    body: "Personality and comfort matter. We pair each client with a caregiver whose strengths fit their needs and temperament.",
    image: "/images/caregiver-portrait.jpg",
    alt: "Smiling caregiver in a yellow cardigan",
  },
  {
    title: "We follow their routine",
    body: "Meals the way they like them, bath time when they prefer it, favorite shows at the usual hour. Familiar rhythms bring comfort.",
    image: "/images/meal-prep.jpg",
    alt: "Caregiver preparing a meal while a senior man watches",
  },
  {
    title: "We keep family close",
    body: "You're part of the team. We work closely with families so everyone shares the same goals — and the same peace of mind.",
    image: "/images/family.jpg",
    alt: "Family smiling together with a senior man at the table",
  },
  {
    title: "We adapt as needs change",
    body: "Care is never set-and-forget. As needs evolve, we revisit the plan together and adjust the support.",
    image: "/images/exercise.jpg",
    alt: "Caregiver helping a senior man with light stretching",
  },
];

function Item({ i, active, onActive }: { i: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  const it = items[i];

  return (
    <li ref={ref} className="flex min-h-[60vh] flex-col justify-center py-10 lg:min-h-[70vh]">
      <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[2rem] lg:hidden">
        <Image quality={60} src={it.image} alt={it.alt} fill sizes="100vw" className="object-cover" />
      </div>
      <span className={cn("font-serif text-3xl italic transition-colors duration-500", active ? "text-leaf-500" : "text-navy-200")}>0{i + 1}</span>
      <h3 className={cn("mt-2 text-3xl font-extrabold tracking-tight transition-colors duration-500 sm:text-4xl", active ? "text-navy-950" : "text-navy-950/30")}>
        {it.title}
      </h3>
      <p className={cn("mt-4 max-w-md text-lg leading-relaxed transition-colors duration-500", active ? "text-muted" : "text-muted/40")}>{it.body}</p>
    </li>
  );
}

/** Sticky sidebar: the image column pins and crossfades as each commitment scrolls past. */
export function StickyStory() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
      <div className="hidden lg:block">
        <div className="sticky top-28 h-[calc(100vh-9rem)] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-40px_rgb(8_26_48/0.5)]">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div
              key={active}
              initial={{ opacity: 0, scale: 1.12, clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0.6, scale: 1.02 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {/* Decorative duplicate of the per-item photo (which carries the alt text). */}
              <Image quality={60} src={items[active].image} alt="" fill sizes="50vw" className="object-cover" />
            </m.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
          <div className="glass absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl px-5 py-4">
            <span className="font-bold text-navy-950">{items[active].title}</span>
            <span className="flex gap-1.5">
              {items.map((_, i) => (
                <span key={i} className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-6 bg-navy-600" : "w-1.5 bg-navy-200")} />
              ))}
            </span>
          </div>
        </div>
      </div>
      <ol>
        {items.map((_, i) => (
          <Item key={i} i={i} active={i === active} onActive={setActive} />
        ))}
      </ol>
    </div>
  );
}
