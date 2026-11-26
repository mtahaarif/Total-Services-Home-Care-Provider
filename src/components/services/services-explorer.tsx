"use client";

import { memo, useEffect, useRef, useState, ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/use-in-view";
import { ArrowRight, Check } from "lucide-react";
import { services, type ServiceCategory } from "@/lib/services";
import { ServiceIcon } from "@/components/ui/icons";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

// Memoized: changing the active category only re-renders the sidebar, not all six sections.
const CategorySection = memo(function CategorySection({
  s,
  index,
  onActive,
}: {
  s: ServiceCategory;
  index: number;
  onActive: (slug: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -55% 0px" });
  useEffect(() => {
    if (inView) onActive(s.slug);
  }, [inView, s.slug, onActive]);

  return (
    <section ref={ref} id={s.slug} className="scroll-mt-32 border-b border-navy-100 py-16 first:pt-0 last:border-0">
      <Reveal>
        <Link href={`/services/${s.slug}`} className="group relative block overflow-hidden rounded-[2rem]">
          <ViewTransition name={`svc-img-${s.slug}`} share="morph" default="none">
            <div className="relative aspect-[16/8]">
              <Image
                quality={60}
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes="(min-width:1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
              />
            </div>
          </ViewTransition>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
            <div className="text-white">
              <span className="text-lg text-leaf-300">0{index + 1}</span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{s.title}</h2>
            </div>
            <span className="glass-dark hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-leaf-400 group-hover:text-navy-950 sm:inline-flex">
              Details <ArrowRight className="size-4" />
            </span>
          </div>
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-8 text-2xl text-navy-600">{s.tagline}</p>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">{s.intro}</p>
      </Reveal>

      <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
        {s.items.map((item) => (
          <StaggerItem key={item.name}>
            <SpotlightCard
              className="group h-full rounded-3xl border border-navy-100 bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-35px_rgb(8_26_48/0.4)]"
              spot="rgb(152 200 96 / 0.18)"
              spotBorder="rgb(127 177 69 / 0.8)"
            >
              <div className="p-6">
                <span className="grid size-11 place-items-center rounded-2xl bg-navy-50 text-navy-600 transition-colors duration-500 group-hover:bg-leaf-400 group-hover:text-navy-950">
                  <ServiceIcon icon={s.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-950">{item.name}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.desc}</p>
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center gap-2">
        <strong className="mr-1 text-sm font-bold text-navy-900">Often a fit for:</strong>
        {s.idealFor.map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-leaf-100 px-3 py-1.5 text-sm font-medium text-leaf-700">
            <Check className="size-3.5" strokeWidth={3} /> {t}
          </span>
        ))}
      </Reveal>
    </section>
  );
});

/** Sticky sidebar navigation with scroll-spy + mobile pill bar. */
export function ServicesExplorer() {
  const [active, setActive] = useState(services[0].slug);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Slide the indicator to the active category (and keep it aligned on resize).
  useEffect(() => {
    const list = listRef.current;
    const ind = indicatorRef.current;
    if (!list || !ind) return;
    const place = () => {
      const li = list.querySelector<HTMLElement>(`li[data-slug="${active}"]`);
      if (!li) return;
      ind.style.transform = `translateY(${li.offsetTop}px)`;
      ind.style.height = `${li.offsetHeight}px`;
      ind.style.opacity = "1";
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(list);
    return () => ro.disconnect();
  }, [active]);

  return (
    <div className="container-x py-20 sm:py-28">
      {/* Mobile sticky pills */}
      <div className="glass no-scrollbar sticky top-[5.5rem] z-30 -mx-1 mb-10 flex gap-1 overflow-x-auto rounded-full p-1 lg:hidden">
        {services.map((s) => (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              active === s.slug ? "bg-navy-600 text-white" : "text-navy-800",
            )}
          >
            {s.title}
          </a>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
          <nav aria-label="Service categories" className="sticky top-32">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-navy-500">Care categories</p>
            <div className="relative">
            {/* Sliding active card, moved with a CSS transition (no layout-animation engine). */}
            <span
              ref={indicatorRef}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 w-full rounded-2xl bg-white opacity-0 shadow-[0_15px_40px_-25px_rgb(8_26_48/0.45)] transition-[transform,height,opacity] duration-500 ease-out-expo"
            />
            <ul ref={listRef} className="flex flex-col gap-1">
              {services.map((s, i) => {
                const on = active === s.slug;
                return (
                  <li key={s.slug} data-slug={s.slug}>
                    <a
                      href={`#${s.slug}`}
                      aria-current={on ? "true" : undefined}
                      className={cn(
                        "relative z-10 flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold transition-colors",
                        on ? "text-navy-950" : "text-navy-900/50 hover:text-navy-800",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-9 place-items-center rounded-xl transition-colors duration-500",
                          on ? "bg-leaf-400 text-navy-950" : "bg-navy-50 text-navy-400",
                        )}
                      >
                        <ServiceIcon icon={s.icon} className="size-4" />
                      </span>
                      <span className="flex-1">{s.title}</span>
                      <span className="text-sm opacity-60">0{i + 1}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            </div>
          </nav>
        </aside>

        <div className="lg:col-span-8 xl:col-span-9">
          {services.map((s, i) => (
            <CategorySection key={s.slug} s={s} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </div>
  );
}
