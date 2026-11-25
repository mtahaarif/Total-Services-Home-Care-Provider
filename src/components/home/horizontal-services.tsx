"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { services, type ServiceCategory } from "@/lib/services";
import { site } from "@/lib/site";
import { ServiceIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

function ServiceCard({ s, index, className = "" }: { s: ServiceCategory; index: number; className?: string }) {
  return (
    <Link
      href={`/services/${s.slug}`}
      className={`group relative isolate flex shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] bg-navy-900 p-6 text-white shadow-[0_30px_60px_-30px_rgb(8_26_48/0.6)] ${className}`}
    >
      <Image
        quality={60}
        src={s.image}
        alt={s.imageAlt}
        fill
        sizes="(min-width: 1024px) 26rem, 85vw"
        className="-z-20 object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/10 transition-opacity duration-700 group-hover:opacity-90" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-700/90 via-navy-700/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="flex items-start justify-between">
        <span className="glass-dark grid size-12 place-items-center rounded-2xl text-leaf-300">
          <ServiceIcon icon={s.icon} className="size-5" />
        </span>
        <span className="text-xl text-white/70">
          {String(index + 1).padStart(2, "0")}
          <span className="text-white/35"> / {String(services.length).padStart(2, "0")}</span>
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-3xl font-extrabold tracking-tight">{s.title}</h3>
        <p className="max-w-sm text-[15px] leading-relaxed text-white/80">{s.short}</p>
        {/* Reveal on hover */}
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-out-expo lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
          <ul className="flex flex-wrap gap-2 overflow-hidden">
            {s.items.map((i) => (
              <li key={i.name} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                {i.name}
              </li>
            ))}
          </ul>
        </div>
        <span className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-leaf-300">
          Explore {s.title.toLowerCase()}
          <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}

function CtaCard({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] bg-leaf-400 p-7 text-navy-950 ${className}`}>
      <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-leaf-200 soft-glow" />
      <p className="relative text-2xl">Not sure where to start?</p>
      <div className="relative flex flex-col gap-5">
        <p className="text-3xl font-extrabold leading-tight tracking-tight">We&apos;ll help you figure out exactly what&apos;s needed.</p>
        <a href={site.phoneHref} className="inline-flex w-fit items-center gap-2 rounded-full bg-navy-950 px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-105">
          <Phone className="size-4" /> {site.phone}
        </a>
        <Link href="/services" className="inline-flex items-center gap-1 text-sm font-bold underline-offset-4 hover:underline">
          See all services <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

export function HorizontalServices() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const dist = useMotionValue(0);

  const isDesktop = useSyncExternalStore(subscribeDesktop, () => window.matchMedia(DESKTOP).matches, () => false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      // Only desktop pins + translates; mobile uses native horizontal scrolling.
      const d = window.matchMedia(DESKTOP).matches ? Math.max(0, el.scrollWidth - window.innerWidth) : 0;
      setDistance(d);
      dist.set(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [dist, isDesktop]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const x = useTransform(() => -smooth.get() * dist.get());
  const bar = useTransform(smooth, [0, 1], [0.04, 1]);

  /*
   * One DOM for every breakpoint (no duplicated headings/cards):
   *  - desktop: vertical scroll drives a pinned, horizontally translating track
   *  - mobile/tablet: native swipe carousel with snap points
   */
  return (
    <section
      ref={section}
      aria-label="Our services"
      className="relative bg-cream py-20 lg:py-0"
      style={isDesktop ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:gap-10 lg:overflow-hidden lg:pt-16">
        <div className="container-x flex items-end justify-between gap-10">
          <SectionHeading
            eyebrow="What we offer"
            title="Care that comes *to you.*"
            description="Six areas of everyday support — mixed and matched into one plan that fits your loved one."
          />
          <div className="hidden w-64 shrink-0 flex-col gap-3 pb-3 lg:flex">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-navy-500">Scroll to explore</span>
            <div className="h-1 overflow-hidden rounded-full bg-navy-100">
              <m.div style={{ scaleX: bar }} className="h-full origin-left rounded-full bg-gradient-to-r from-navy-500 to-leaf-400" />
            </div>
          </div>
        </div>

        <m.div
          ref={track}
          style={isDesktop ? { x } : undefined}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:scroll-px-6 sm:px-6 lg:mt-0 lg:w-max lg:snap-none lg:gap-6 lg:overflow-visible lg:pb-0 lg:pl-[max(2rem,calc((100vw-82rem)/2+2rem))] lg:pr-[max(2rem,calc((100vw-82rem)/2+2rem))]"
        >
          {services.map((s, i) => (
            <ServiceCard
              key={s.slug}
              s={s}
              index={i}
              className="h-[30rem] w-[82vw] max-w-[24rem] snap-start lg:h-[min(34rem,60vh)] lg:w-[24rem] lg:max-w-none xl:w-[26rem]"
            />
          ))}
          <CtaCard className="h-[30rem] w-[82vw] max-w-[22rem] snap-start lg:h-[min(34rem,60vh)] lg:w-[22rem]" />
        </m.div>
      </div>
    </section>
  );
}

const DESKTOP = "(min-width: 1024px)";
function subscribeDesktop(cb: () => void) {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
