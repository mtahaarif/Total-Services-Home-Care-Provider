"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { AnimatedHeadline } from "@/components/ui/animated-headline";
import { Eyebrow } from "@/components/ui/section-heading";

/**
 * Inner-page hero: full-bleed photo inside a rounded frame that un-clips on
 * load and parallaxes on scroll, with a glass breadcrumb + copy panel.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  crumb,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  crumb: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 80]);

  return (
    <section ref={ref} className="px-3 pt-24 sm:px-5 sm:pt-28">
      <m.div
        style={{ borderRadius: radius }}
        className="enter-unclip relative isolate mx-auto flex min-h-[34rem] max-w-[90rem] items-end overflow-hidden bg-navy-900 sm:min-h-[38rem]"
      >
        <m.div style={{ y, scale }} className="absolute inset-0 -z-20">
          <Image src={image} alt={imageAlt} fill preload quality={60} sizes="(min-width: 1440px) 90rem, 100vw" className="object-cover" />
        </m.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-navy-950/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/60 to-transparent" />

        <div className="w-full px-6 pb-10 sm:px-12 sm:pb-14">
          <nav
            aria-label="Breadcrumb"
            className="glass-dark enter-fade-up mb-6 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-white/80 [animation-delay:250ms]"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-3.5 opacity-60" />
            <span aria-current="page" className="font-semibold text-white">
              {crumb}
            </span>
          </nav>

          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-5 lg:col-span-8">
              <div className="enter-fade-in [animation-delay:300ms]">
                <Eyebrow dark>{eyebrow}</Eyebrow>
              </div>
              <AnimatedHeadline
                as="h1"
                immediate
                delay={0.35}
                text={title}
                className="text-[2.6rem] font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl"
                accentClassName="text-leaf-300"
              />
            </div>
            <div className="enter-fade-up flex flex-col gap-5 lg:col-span-4 [animation-delay:550ms]">
              <p className="text-lg leading-relaxed text-white/80">{description}</p>
              {children}
            </div>
          </div>
        </div>
      </m.div>
    </section>
  );
}
