"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { values } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Expanding panels: the hovered / focused value grows and reveals its story. */
export function ValuesReveal() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Desktop: horizontal expanding panels */}
      <div className="hidden h-[32rem] gap-3 lg:flex">
        {values.map((v, i) => {
          const isActive = i === active;
          return (
            <motion.button
              key={v.title}
              type="button"
              layout
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              transition={{ layout: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
              className={cn(
                "group relative isolate overflow-hidden rounded-[2rem] text-left text-white",
                isActive ? "flex-[4]" : "flex-[1]",
              )}
            >
              <Image
                src={v.image}
                alt=""
                fill
                sizes="40vw"
                className={cn("-z-20 object-cover transition-all duration-1000 ease-out-expo", isActive ? "scale-100 grayscale-0" : "scale-110 grayscale")}
              />
              <div className={cn("absolute inset-0 -z-10 transition-colors duration-700", isActive ? "bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" : "bg-navy-900/75")} />

              <span className="absolute left-6 top-6 font-serif text-2xl italic text-leaf-300">0{i + 1}</span>

              {!isActive && (
                <span className="absolute bottom-8 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap text-xl font-bold [writing-mode:vertical-rl]">
                  {v.title}
                </span>
              )}

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 bottom-0 p-8"
                >
                  <h3 className="text-4xl font-extrabold tracking-tight">{v.title}</h3>
                  <p className="mt-3 max-w-md text-lg leading-relaxed text-white/80">{v.body}</p>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Mobile: stacked cards */}
      <ul className="flex flex-col gap-4 lg:hidden">
        {values.map((v, i) => (
          <li key={v.title} className="relative isolate overflow-hidden rounded-[2rem] p-6 pt-40 text-white">
            <Image src={v.image} alt="" fill sizes="100vw" className="-z-20 object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
            <span className="font-serif text-xl italic text-leaf-300">0{i + 1}</span>
            <h3 className="mt-1 text-2xl font-extrabold">{v.title}</h3>
            <p className="mt-2 text-white/80">{v.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
