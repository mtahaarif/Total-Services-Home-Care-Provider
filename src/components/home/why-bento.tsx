import Image from "next/image";
import { HeartHandshake, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import { site } from "@/lib/site";
import { allServiceNames } from "@/lib/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Counter } from "@/components/ui/counter";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { Stars } from "@/components/ui/icons";

const card = "h-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-7";

/** Dark bento grid with cursor-following glow on every tile. */
export function WhyBento() {
  return (
    <section className="cv-auto grain relative overflow-hidden mx-3 rounded-[2.5rem] sm:mx-5 2xl:mx-auto 2xl:max-w-[90rem] [contain-intrinsic-size:auto_2040px] lg:[contain-intrinsic-size:auto_1250px] bg-navy-950 py-24 text-white sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 size-[30rem] rounded-full bg-navy-500/30 soft-glow" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 size-[30rem] rounded-full bg-leaf-500/20 soft-glow" />

      <div className="container-x relative z-10">
        <SectionHeading
          dark
          eyebrow="Why families choose us"
          title="Care built around a *person,* not a schedule."
          description="Everything we do starts with getting to know your loved one — and keeps your family close every step of the way."
        />

        <Stagger className="mt-14 grid auto-rows-[minmax(13rem,auto)] gap-4 md:grid-cols-6" stagger={0.07}>
          <StaggerItem className="md:col-span-4 md:row-span-2">
            <SpotlightCard className={`${card} flex flex-col justify-end !p-0`}>
              <div className="relative h-full min-h-[24rem]">
                <Image quality={60} src="/images/medication.jpg" alt="Caregiver sitting with a senior man reviewing his medication" fill sizes="(min-width:768px) 55vw, 100vw" className="object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <span className="glass-dark mb-5 inline-grid size-12 place-items-center rounded-2xl text-leaf-300">
                    <HeartHandshake className="size-5" />
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Customized care plans</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-white/75">
                    We work closely with families to create a plan that meets each client&apos;s unique needs — their routines,
                    their preferences, their pace.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </StaggerItem>

          <StaggerItem className="md:col-span-2">
            <SpotlightCard className={card}>
              <div className="flex h-full flex-col justify-between gap-6">
                <Stars className="text-amber-400" />
                <div>
                  <p className="text-6xl font-extrabold tracking-tight">
                    <Counter to={site.rating.value} decimals={1} />
                  </p>
                  <p className="mt-2 text-white/70">
                    Average rating from families on{" "}
                    <a href={site.rating.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-leaf-300 underline-offset-4 hover:underline">
                      {site.rating.source}
                    </a>
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </StaggerItem>

          <StaggerItem className="md:col-span-2">
            <SpotlightCard className={card}>
              <div className="flex h-full flex-col justify-between gap-6">
                <Sparkles className="size-6 text-leaf-300" />
                <div>
                  <p className="text-6xl font-extrabold tracking-tight">
                    <Counter to={allServiceNames.length} />
                  </p>
                  <p className="mt-2 text-white/70">Everyday care services, from personal care to respite.</p>
                </div>
              </div>
            </SpotlightCard>
          </StaggerItem>

          <StaggerItem className="md:col-span-2">
            <SpotlightCard className={card}>
              <MapPin className="size-6 text-leaf-300" />
              <h3 className="mt-6 text-xl font-bold">Rooted in {site.address.city}</h3>
              <p className="mt-2 leading-relaxed text-white/70">
                Our office is on {site.address.streetName} — your neighbors, caring for {site.address.county}.
              </p>
            </SpotlightCard>
          </StaggerItem>

          <StaggerItem className="md:col-span-2">
            <SpotlightCard className={card}>
              <ShieldCheck className="size-6 text-leaf-300" />
              <h3 className="mt-6 text-xl font-bold">Dignity &amp; independence</h3>
              <p className="mt-2 leading-relaxed text-white/70">
                We help with what&apos;s needed and encourage everything they can still do on their own.
              </p>
            </SpotlightCard>
          </StaggerItem>

          <StaggerItem className="md:col-span-2">
            <SpotlightCard className={card}>
              <Users className="size-6 text-leaf-300" />
              <h3 className="mt-6 text-xl font-bold">Family stays in the loop</h3>
              <p className="mt-2 leading-relaxed text-white/70">
                Peace of mind comes from knowing. We keep you informed as needs change.
              </p>
            </SpotlightCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
