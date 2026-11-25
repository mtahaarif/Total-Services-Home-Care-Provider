"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * FAQ topics navigator (openarmsandheart.org-style).
 * Desktop: sticky card with a scroll-aware topic list + "Still have questions?".
 * Mobile: topic chips in a card above the questions.
 */
export function FaqTopics({ groups }: { groups: { id: string; title: string }[] }) {
  const [active, setActive] = useState(groups[0]?.id);

  // Active topic = the last group whose heading has passed ~35% of the viewport
  // (the first group when you're above all of them). rAF-throttled scroll handler.
  useEffect(() => {
    const els = groups.map((g) => document.getElementById(g.id)).filter((e): e is HTMLElement => !!e);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      if (current) setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [groups]);

  const label = (
    <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-navy-500">
      <span className="h-px w-6 bg-navy-300" aria-hidden />
      Topics
    </p>
  );

  return (
    <>
      {/* Mobile / tablet: chips */}
      <nav aria-label="FAQ topics" className="rounded-[1.75rem] border border-navy-100 bg-white p-5 shadow-[0_20px_50px_-35px_rgb(8_26_48/0.35)] lg:hidden">
        {label}
        <ul className="mt-4 flex flex-wrap gap-2">
          {groups.map((g) => (
            <li key={g.id}>
              <a
                href={`#${g.id}`}
                className="inline-flex rounded-full border border-navy-100 px-4 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:border-navy-300 hover:text-navy-700"
              >
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop: sticky card */}
      <div className="sticky top-28 hidden flex-col gap-4 lg:flex">
        <nav aria-label="FAQ topics" className="rounded-[1.75rem] border border-navy-100 bg-white p-6 shadow-[0_20px_50px_-35px_rgb(8_26_48/0.35)]">
          {label}
          <ul className="mt-4 flex flex-col gap-1">
            {groups.map((g) => {
              const on = active === g.id;
              return (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[15px] font-medium transition-colors",
                      on ? "bg-navy-50 font-semibold text-navy-700" : "text-ink/75 hover:bg-navy-50/60 hover:text-navy-700",
                    )}
                  >
                    <span className={cn("size-1.5 rounded-full transition-colors", on ? "bg-leaf-400" : "bg-navy-200")} aria-hidden />
                    {g.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="rounded-[1.75rem] bg-navy-50 p-6">
          <p className="font-display text-lg font-bold text-navy-700">Still have questions?</p>
          <p className="mt-1 text-sm text-navy-900/65">Talk to a real person on our team.</p>
          <a
            href={site.phoneHref}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-navy-600 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgb(34_85_138/0.9)] transition-colors hover:bg-navy-700"
          >
            <Phone className="size-4" /> {site.phone}
          </a>
          <Link href="/contact" className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-700">
            Request more information <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
