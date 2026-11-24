"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Every answer is always in the HTML (crawlers, AI answer engines and
 * find-in-page all see it). Collapsed answers are animated closed with CSS
 * grid rows and made `inert` so keyboard users skip them.
 */
export function Accordion({ items, dark = false, defaultOpen = 0 }: { items: Faq[]; dark?: boolean; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li
            key={item.q}
            className={cn(
              "overflow-hidden rounded-3xl border transition-colors duration-500",
              dark
                ? isOpen ? "border-leaf-400/40 bg-white/[0.07]" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                : isOpen ? "border-navy-200 bg-white shadow-[0_20px_50px_-25px_rgb(8_26_48/0.25)]" : "border-navy-100/70 bg-white/60 hover:bg-white",
            )}
          >
            <h3>
              <button
                type="button"
                id={`${id}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg font-bold sm:px-7",
                  dark ? "text-white" : "text-navy-950",
                )}
              >
                {item.q}
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-out-expo",
                    isOpen ? "rotate-45 bg-leaf-400 text-navy-950" : dark ? "bg-white/10 text-white" : "bg-navy-50 text-navy-600",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a-${i}`}
              role="region"
              aria-labelledby={`${id}-q-${i}`}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className={cn("px-6 pb-6 leading-relaxed sm:px-7", dark ? "text-navy-100/75" : "text-muted")}>{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
