import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { Banner } from "@/components/sections/banner";
import { CtaBand } from "@/components/sections/cta-band";
import { ServicesExplorer } from "@/components/services/services-explorer";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Home Care Services in Drexel Hill, PA",
  description:
    "Personal care, mobility help, meals, medication reminders, housekeeping, companionship and respite care in Drexel Hill & Delaware County, PA.",
  path: "/services",
  image: { url: "/images/mobility.jpg", alt: "Two caregivers helping a senior man stand from his bed" },
});

const whoWeHelp = [
  "Seniors aging in place",
  "Adults living with chronic conditions",
  "People recovering after a hospital stay",
  "Individuals with limited mobility",
  "Loved ones experiencing memory changes",
  "Family caregivers who need a break",
  "Seniors living alone",
  "Couples who want to stay together at home",
];

export default function ServicesPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <Banner
        crumbs={[{ label: "Services", href: "/services" }]}
        eyebrow="Care at home · Delaware County, PA"
        title="Everyday support, *personally* planned."
        description="Choose one service or combine several. Every plan is customized to your loved one's needs, preferences and routine."
        slides={[{ src: "/images/mobility.jpg", alt: "Two caregivers helping a senior man stand from his bed", focus: "60% center" }]}
        primary={{ label: "Request a care consultation", href: "/contact" }}
        secondary={{ label: `Call ${site.phone}`, href: site.phoneHref }}
      />

      <ServicesExplorer />

      <section className="cv-auto overflow-hidden mx-3 rounded-[2.5rem] sm:mx-5 2xl:mx-auto 2xl:max-w-[90rem] bg-navy-950 py-24 text-white [contain-intrinsic-size:auto_490px] lg:[contain-intrinsic-size:auto_570px] sm:py-28">
        <div className="container-x">
          <SectionHeading dark align="center" eyebrow="Who we help" title="Support for every *season* of life." />
        </div>
        <div className="mt-12 flex flex-col gap-4">
          <Marquee duration={55} gap="1rem">
            {whoWeHelp.map((t) => (
              <span key={t} className="glass-dark whitespace-nowrap rounded-full px-6 py-3 text-lg font-semibold">
                {t}
              </span>
            ))}
          </Marquee>
          <Marquee duration={60} gap="1rem" reverse>
            {[...whoWeHelp].reverse().map((t) => (
              <span key={t} className="whitespace-nowrap rounded-full border border-leaf-400/30 px-6 py-3 text-xl text-leaf-300">
                {t}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      <div className="pt-24 sm:pt-32">
        <CtaBand title="Not sure which services fit? *Let's* talk it through." image="/images/respite.jpg" />
      </div>
    </PageTransition>
  );
}
