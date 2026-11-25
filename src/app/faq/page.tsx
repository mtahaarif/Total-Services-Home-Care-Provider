import type { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { Banner } from "@/components/sections/banner";
import { FaqTopics } from "@/components/faq/faq-topics";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { faqGroups } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Frequently Asked Questions",
  description: `Answers about our in-home care services, scheduling, payment and caregivers in ${site.address.city} and ${site.address.county}, PA.`,
  path: "/faq",
  image: { url: "/images/family.jpg", alt: "Family smiling together with a senior man at the table" },
});

export default function FaqPage() {
  return (
    <PageTransition>
      <JsonLd data={[breadcrumbJsonLd([{ name: "FAQ", path: "/faq" }]), faqJsonLd(faqGroups.flatMap((g) => g.items))]} />

      <Banner
        crumbs={[{ label: "FAQ", href: "/faq" }]}
        eyebrow="Frequently asked questions"
        title="Answers for your *family.*"
        description="Common questions about our services, scheduling, payment and caregivers. Don't see your question? Our team is only a call away."
        slides={[{ src: "/images/family.jpg", alt: "Family smiling together with a senior man at the table", focus: "65% center" }]}
        primary={{ label: `Call ${site.phone}`, href: site.phoneHref }}
        secondary={{ label: "Send us a message", href: "/contact" }}
      />

      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-4 xl:col-span-3">
            <FaqTopics groups={faqGroups.map(({ id, title }) => ({ id, title }))} />
          </aside>

          <div className="flex flex-col gap-14 lg:col-span-8 xl:col-span-9">
            {faqGroups.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-28">
                <Reveal y={20}>
                  <h2 className="text-3xl font-bold text-navy-600 sm:text-[2.1rem]">{g.title}</h2>
                </Reveal>
                <Reveal delay={0.05} className="mt-6">
                  <Accordion items={g.items} defaultOpen={null} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Light, centered closing call to action */}
      <section className="container-x pb-20 sm:pb-28">
        <Reveal scale={0.97}>
          <div className="flex flex-col items-center rounded-[2.5rem] bg-gradient-to-b from-navy-50 to-white px-6 py-16 text-center sm:py-20">
            <h2 className="max-w-2xl text-4xl font-bold leading-tight text-navy-700 sm:text-5xl">Let&apos;s find the support that feels right</h2>
            <p className="mt-5 max-w-xl text-lg text-navy-900/65">
              Whether you&apos;re planning ahead or need help soon, our team can talk through your options and help you take the next step.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" icon={<ArrowRight className="size-4" />}>
                Request more information
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="outline" icon={<Phone className="size-4" />}>
                Call {site.phone}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
