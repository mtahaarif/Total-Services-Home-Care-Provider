"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import { Check, HeartHandshake, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { AnimatedHeadline } from "@/components/ui/animated-headline";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-heading";
import { Magnetic } from "@/components/ui/magnetic";
import { Stars } from "@/components/ui/icons";

const ease = [0.16, 1, 0.3, 1] as const;

function RotatingBadge() {
  return (
    <div className="relative grid size-32 place-items-center rounded-full bg-white shadow-[0_20px_50px_-20px_rgb(8_26_48/0.35)]">
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-navy-600 text-[10.5px] font-bold uppercase tracking-[0.32em]">
          <textPath href="#badge-circle">Care • Comfort • Dignity • Home •</textPath>
        </text>
      </svg>
      <Image src="/logo-mark.png" alt="" width={201} height={217} className="w-12" />
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const ySmall = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const yCard = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_20%,#000_10%,transparent_65%)]" />
        <div className="absolute -left-40 -top-40 size-[36rem] animate-blob rounded-full bg-leaf-200/60 blur-[100px]" />
        <div className="absolute -right-32 top-20 size-[32rem] animate-blob rounded-full bg-navy-200/70 blur-[100px] [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-1/3 size-[24rem] animate-blob rounded-full bg-leaf-100 blur-[90px] [animation-delay:-12s]" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <m.div style={{ opacity: fade }} className="flex flex-col gap-7 lg:col-span-6">
          <div className="enter-fade-up">
            <Eyebrow>In-home care · {site.address.city}, PA</Eyebrow>
          </div>

          <AnimatedHeadline
            as="h1"
            immediate
            delay={0.1}
            text="Compassionate care, right where they feel most at *home.*"
            className="text-[2.75rem] font-extrabold leading-[1.02] text-navy-950 sm:text-6xl xl:text-7xl"
            accentClassName="text-gradient pr-1"
          />

          <p className="enter-fade-up max-w-xl text-lg leading-relaxed text-muted [animation-delay:450ms]">
            <strong className="font-semibold text-navy-800">Personalized in-home care</strong> — help with daily activities,
            companionship, personal care, meal preparation, medication reminders and respite care, delivered by caring people
            from right here in {site.address.county}.
          </p>

          <div className="enter-fade-up flex flex-wrap items-center gap-3 [animation-delay:600ms]">
            <Magnetic strength={0.2}>
              <ButtonLink href={site.phoneHref} variant="primary" icon={<Phone className="size-4" />}>
                Call {site.phone}
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/services" variant="outline">
              Explore our services
            </ButtonLink>
          </div>

          <ul className="enter-fade-up flex flex-wrap gap-x-6 gap-y-3 pt-2 text-sm font-semibold text-navy-800 [animation-delay:750ms]">
            {["Customized care plans", "Family-centered", "Locally based"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-leaf-400 text-navy-950">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </m.div>

        {/* Visual stack */}
        <div className="relative lg:col-span-6">
          <div className="enter-unclip relative ml-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-30px_rgb(8_26_48/0.45)] sm:aspect-[5/5] lg:aspect-[4/5]">
            <m.div style={{ y: yMain, scale }} className="absolute inset-[-8%]">
              <Image
                src="/images/hero-reading.jpg"
                alt="A caregiver sitting on the sofa reading with a senior man at home"
                fill
                preload
                quality={60}
                sizes="(min-width: 1024px) 34rem, (min-width: 640px) 90vw, 100vw"
                className="object-cover object-[30%_center]"
              />
            </m.div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
          </div>

          {/* Inset photo */}
          <m.div
            style={{ y: ySmall }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.6 }}
            className="absolute -bottom-8 left-0 hidden w-44 overflow-hidden rounded-3xl border-[6px] border-cream shadow-2xl sm:block lg:-left-6 lg:w-52"
          >
            <div className="relative aspect-[3/4]">
              <Image src="/images/couple-portrait.jpg" alt="Smiling senior couple embracing at home" fill sizes="13rem" className="object-cover" />
            </div>
          </m.div>

          {/* Glass rating card */}
          <m.div
            style={{ y: yCard }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.8 }}
            className="absolute right-3 top-6 sm:-right-2 lg:-right-6"
          >
            <a
              href={site.rating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex animate-float items-center gap-3 rounded-2xl px-4 py-3 transition-transform hover:scale-[1.03]"
            >
              <span className="text-3xl font-extrabold text-navy-900">{site.rating.value.toFixed(1)}</span>
              <span className="flex flex-col">
                <Stars className="text-amber-400" />
                <span className="text-xs font-semibold text-navy-800/80">
                  {site.rating.count} reviews · {site.rating.source}
                </span>
              </span>
            </a>
          </m.div>

          {/* Glass care-plan card */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1 }}
            className="absolute -bottom-6 right-4 w-64 sm:right-8"
          >
            <div className="glass rounded-3xl p-4 [animation-delay:-3s] animate-float">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-navy-600 text-white">
                  <HeartHandshake className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy-950">Today&apos;s care plan</p>
                  <p className="text-xs text-muted">Built around their routine</p>
                </div>
              </div>
              <ul className="mt-3 flex flex-col gap-1.5 text-[13px] font-medium text-navy-900">
                {["Morning bath & dressing", "Lunch together", "Afternoon walk"].map((t, i) => (
                  <m.li
                    key={t}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + i * 0.15 }}
                    className="flex items-center gap-2 rounded-xl bg-white/70 px-2.5 py-1.5"
                  >
                    <Check className="size-3.5 text-leaf-600" strokeWidth={3} /> {t}
                  </m.li>
                ))}
              </ul>
            </div>
          </m.div>

          {/* Rotating badge */}
          <m.div
            initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.9 }}
            className="absolute -left-4 top-1/3 hidden lg:block"
          >
            <RotatingBadge />
          </m.div>
        </div>
      </div>

      {/* Location chip */}
      <div className="container-x mt-20 hidden lg:block">
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-500"
        >
          <MapPin className="size-4 text-leaf-500" /> {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
        </a>
      </div>
    </section>
  );
}
