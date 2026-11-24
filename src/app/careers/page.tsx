import type { Metadata } from "next";
import Image from "next/image";
import { CalendarClock, Check, GraduationCap, HandHeart, Home, Users } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { FaqSection } from "@/components/sections/faq-section";
import { CareersForm } from "@/components/forms/careers-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { careerFaqs } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers — Join Our Caregiving Team",
  description: `Caregiver jobs in ${site.address.city} and ${site.address.county}, PA. Join ${site.legalName} and make a difference close to home.`,
  alternates: { canonical: "/careers" },
};

const perks = [
  { icon: HandHeart, title: "Meaningful work", body: "Every shift makes a real difference in someone's day — and in their family's peace of mind." },
  { icon: Home, title: "Work close to home", body: `We care for clients around ${site.address.city}, so we aim to match you with clients near you.` },
  { icon: CalendarClock, title: "Scheduling conversations", body: "Tell us when you're available. We'll work to find assignments that fit your life." },
  { icon: Users, title: "A team behind you", body: "You're never on your own. Our office is a phone call away whenever you need support." },
  { icon: GraduationCap, title: "Room to grow", body: "Whether you're new to caregiving or experienced, we value your growth and your heart." },
];

const roles = [
  {
    title: "Home Care Aide / Personal Care Aide",
    body: "Help clients with bathing, dressing, grooming, toileting, mobility and transfers, with patience and respect.",
    image: "/images/mobility.jpg",
  },
  {
    title: "Companion Caregiver",
    body: "Provide friendship, conversation, light housekeeping, meal preparation and medication reminders.",
    image: "/images/companionship.jpg",
  },
  {
    title: "Respite Caregiver",
    body: "Step in so family caregivers can rest — following each client's routine and care plan.",
    image: "/images/respite.jpg",
  },
];

const lookingFor = [
  "A compassionate, patient and dependable nature",
  "Respect for clients' privacy, dignity and independence",
  "Ability to complete Pennsylvania's required background checks",
  "Reliable communication with our office and families",
  "Caregiving experience is a plus — but heart matters most",
];

export default function CareersPage() {
  return (
    <PageTransition>
      <PageHero
        crumb="Careers"
        eyebrow="Join our team"
        title="Do work that *matters,* close to home."
        description="We're always glad to meet caring people who want to help neighbors in Delaware County live safely and comfortably at home."
        image="/images/caregiver-portrait.jpg"
        imageAlt="Smiling caregiver in a yellow cardigan"
      >
        <ButtonLink href="#apply" variant="leaf" className="w-fit">
          Apply now
        </ButtonLink>
      </PageHero>

      {/* Perks — 3D tilt cards */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Why work with us" title="Caring for caregivers, *too.*" />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {perks.map((p, i) => (
              <StaggerItem key={p.title} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <TiltCard
                  className={
                    i === 0
                      ? "h-full rounded-[2rem] bg-gradient-to-br from-navy-600 to-navy-900 p-8 text-white"
                      : i === 1
                        ? "h-full rounded-[2rem] bg-leaf-300 p-8 text-navy-950"
                        : "h-full rounded-[2rem] border border-navy-100 bg-white p-8 text-navy-950"
                  }
                >
                  <div style={{ transform: "translateZ(40px)" }}>
                    <span
                      className={
                        i === 0
                          ? "grid size-12 place-items-center rounded-2xl bg-white/10 text-leaf-300"
                          : "grid size-12 place-items-center rounded-2xl bg-navy-600 text-white"
                      }
                    >
                      <p.icon className="size-5" />
                    </span>
                    <h3 className="mt-8 text-2xl font-extrabold tracking-tight">{p.title}</h3>
                    <p className={i === 0 ? "mt-2 leading-relaxed text-white/75" : "mt-2 leading-relaxed opacity-75"}>{p.body}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Roles — hover reveal */}
      <section className="grain relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
        <div className="container-x relative z-10">
          <SectionHeading dark eyebrow="Roles we hire for" title="Find the role that *fits* you." description="Interested? Apply below and we'll reach out when there's a match." />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {roles.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <article className="group relative isolate flex h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 p-7">
                  <Image src={r.image} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="-z-20 object-cover opacity-60 grayscale transition-all duration-1000 ease-out-expo group-hover:scale-110 group-hover:opacity-70 group-hover:grayscale-0" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20" />
                  <span className="mb-auto font-serif text-2xl italic text-leaf-300">0{i + 1}</span>
                  <h3 className="text-2xl font-extrabold">{r.title}</h3>
                  <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-out-expo lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                    <p className="overflow-hidden pt-3 leading-relaxed text-white/75">{r.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-20 -z-10 size-[34rem] animate-blob rounded-full bg-leaf-200/60 blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[34rem] animate-blob rounded-full bg-navy-200/60 blur-[110px] [animation-delay:-8s]" />
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading eyebrow="Apply" title="Start your *application.*" description="It only takes a couple of minutes. We'll follow up by phone or email." />
            <Reveal delay={0.1}>
              <p className="mb-4 font-bold text-navy-950">What we look for</p>
              <ul className="flex flex-col gap-3">
                {lookingFor.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-muted">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-leaf-400 text-navy-950">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" y={40}>
            <div className="glass rounded-[2.5rem] p-6 sm:p-10">
              <CareersForm />
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection items={careerFaqs} eyebrow="Careers FAQ" title="Questions from *applicants.*" />
    </PageTransition>
  );
}
