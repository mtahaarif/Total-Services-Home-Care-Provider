"use client";

import { useState } from "react";
import Image from "next/image";
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
            <button
              key={v.title}
              type="button"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              // flex-grow is animatable, so the panel resize is a plain CSS transition.
              className={cn(
                "group relative isolate min-w-0 basis-0 overflow-hidden rounded-[2rem] text-left text-white transition-[flex-grow] duration-700 ease-out-expo",
                isActive ? "grow-[4]" : "grow",
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

              <span className="absolute left-6 top-6 text-2xl text-leaf-300">0{i + 1}</span>

              <span
                aria-hidden
                className={cn(
                  "absolute bottom-8 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap text-xl font-bold transition-opacity duration-300 [writing-mode:vertical-rl]",
                  isActive ? "opacity-0" : "opacity-100 delay-200",
                )}
              >
                {v.title}
              </span>

              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 block w-[min(32rem,60vw)] p-8 transition-[opacity,transform] ease-out-expo",
                  isActive ? "translate-y-0 opacity-100 duration-700 delay-200" : "pointer-events-none translate-y-5 opacity-0 duration-200",
                )}
              >
                <span className="block text-4xl font-extrabold tracking-tight">{v.title}</span>
                <span className="mt-3 block max-w-md text-lg leading-relaxed text-white/80">{v.body}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile: stacked cards */}
      <ul className="flex flex-col gap-4 lg:hidden">
        {values.map((v, i) => (
          <li key={v.title} className="relative isolate overflow-hidden rounded-[2rem] p-6 pt-40 text-white">
            <Image quality={60} src={v.image} alt="" fill sizes="100vw" className="-z-20 object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
            <span className="text-xl text-leaf-300">0{i + 1}</span>
            <h3 className="mt-1 text-2xl font-extrabold">{v.title}</h3>
            <p className="mt-2 text-white/80">{v.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
