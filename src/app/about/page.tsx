import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Building2, MapPin, Phone } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-section";
import { ValuesReveal } from "@/components/about/values-reveal";
import { StickyStory } from "@/components/about/sticky-story";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About Our Home Care Agency",
  description: `A family-centered home care agency in ${site.address.city}, PA, creating customized care plans so loved ones can live safely at home.`,
  path: "/about",
  image: { url: "/images/couple-window.jpg", alt: "Senior couple smiling together by a sunny window" },
});

export default function AboutPage() {
  const initials = site.president
    .split(" ")
    .filter((p) => !p.endsWith("."))
    .map((p) => p[0])
    .join("");

  return (
    <PageTransition>
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <PageHero
        crumb="About"
        eyebrow={`Home care rooted in ${site.address.city}`}
        title="Care that feels like *family.*"
        description="We're a local home care agency built on a simple belief: the people you love deserve to be cared for with patience, respect and warmth — at home."
        image="/images/couple-window.jpg"
        imageAlt="Senior couple smiling together by a sunny window"
      />

      {/* Story with photo collage */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <div className="relative grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4">
            <Reveal className="col-span-4 row-span-4 overflow-hidden rounded-[2rem]" x={-30}>
              <div className="relative aspect-[4/3.6] h-full transition-transform duration-1000 ease-out-expo hover:scale-105">
                <Image quality={60} src="/images/companionship.jpg" alt="Caregiver holding a senior woman's hands" fill sizes="(min-width:1024px) 30vw, 66vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal className="col-span-2 row-span-3 overflow-hidden rounded-[2rem]" delay={0.1} y={50}>
              <div className="relative h-full min-h-40 transition-transform duration-1000 ease-out-expo hover:scale-105">
                <Image quality={60} src="/images/senior-man.jpg" alt="Senior man sitting comfortably at home" fill sizes="(min-width:1024px) 15vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal className="col-span-2 col-start-5 row-span-3 overflow-hidden rounded-[2rem]" delay={0.2} y={50}>
              <div className="relative h-full min-h-40 transition-transform duration-1000 ease-out-expo hover:scale-105">
                <Image quality={60} src="/images/couple-tender.jpg" alt="Senior couple sharing a tender moment" fill sizes="(min-width:1024px) 15vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal className="col-span-4 row-span-2 flex items-center gap-4 rounded-[2rem] bg-navy-600 p-5 text-white sm:p-6" delay={0.3}>
              <span className="text-4xl font-extrabold sm:text-5xl">{site.rating.value.toFixed(1)}</span>
              <span className="text-sm leading-snug text-white/80">
                average rating from families on {site.rating.source}
              </span>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Our story" title="Home is where people *heal,* thrive and feel themselves." />
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted">
                <p>
                  <strong className="font-semibold text-navy-800">{site.legalName}</strong> was created to give families in{" "}
                  {site.address.city} and across{" "}
                  {site.address.county} a dependable, caring partner — so their loved ones can stay safe and comfortable in the
                  place they know best.
                </p>
                <p>{site.overview}</p>
                <p>
                  From personal care and mobility support to meals, medication reminders, companionship and respite for
                  family caregivers, our team provides the everyday help that makes independence possible.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ButtonLink href="/services" variant="primary">
                See how we help
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values — expanding panels */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x flex flex-col gap-12">
          <SectionHeading
            eyebrow="Our commitment"
            title="Five values behind *every* visit."
            description="Hover across the panels to explore what guides our caregivers."
          />
          <ValuesReveal />
        </div>
      </section>

      {/* Sticky story */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="How we care" title="The way we *work* with your family." />
          <div className="mt-10">
            <StickyStory />
          </div>
        </div>
      </section>

      {/* Leadership + credentials */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Leadership & credentials" title="Accountable, local and *reachable.*" />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            <StaggerItem className="md:row-span-2">
              <SpotlightCard
                className="h-full rounded-[2rem] bg-gradient-to-br from-navy-700 to-navy-950 p-8 text-white"
                spot="rgb(152 200 96 / 0.25)"
              >
                <div className="flex h-full flex-col justify-between gap-10">
                  <span className="grid size-24 place-items-center rounded-full border border-white/20 bg-white/10 font-serif text-4xl italic text-leaf-300">
                    {initials}
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-leaf-300">President</p>
                    <h3 className="mt-2 text-3xl font-extrabold">{site.president}</h3>
                    <p className="mt-3 leading-relaxed text-white/75">
                      Leads the {site.address.city} team and its commitment to personalized, family-centered care.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
            <StaggerItem className="md:col-span-2">
              <SpotlightCard className="h-full rounded-[2rem] border border-navy-100 bg-white p-8" spot="rgb(42 99 153 / 0.10)" spotBorder="rgb(42 99 153 / 0.5)">
                <BadgeCheck className="size-7 text-leaf-500" />
                <h3 className="mt-5 text-xl font-bold text-navy-950">Registered provider</h3>
                <p className="mt-2 text-muted">
                  National Provider Identifier (NPI){" "}
                  <a href={site.listings[2].href} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-600 underline-offset-4 hover:underline">
                    {site.npi}
                  </a>
                  , listed with the Centers for Medicare &amp; Medicaid Services as a home health aide organization.
                </p>
              </SpotlightCard>
            </StaggerItem>
            <StaggerItem>
              <SpotlightCard className="h-full rounded-[2rem] border border-navy-100 bg-white p-8" spot="rgb(42 99 153 / 0.10)" spotBorder="rgb(42 99 153 / 0.5)">
                <Building2 className="size-7 text-leaf-500" />
                <h3 className="mt-5 text-xl font-bold text-navy-950">Visit our office</h3>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-start gap-2 text-muted hover:text-navy-600">
                  <MapPin className="mt-1 size-4 shrink-0" /> {fullAddress}
                </a>
              </SpotlightCard>
            </StaggerItem>
            <StaggerItem>
              <SpotlightCard className="h-full rounded-[2rem] border border-navy-100 bg-white p-8" spot="rgb(42 99 153 / 0.10)" spotBorder="rgb(42 99 153 / 0.5)">
                <Phone className="size-7 text-leaf-500" />
                <h3 className="mt-5 text-xl font-bold text-navy-950">Talk to us</h3>
                <a href={site.phoneHref} className="mt-2 block text-2xl font-extrabold text-navy-600 hover:text-navy-500">
                  {site.phone}
                </a>
              </SpotlightCard>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <FaqSection items={faqs.slice(0, 4)} />
      <CtaBand image="/images/couple-tender.jpg" />
    </PageTransition>
  );
}
