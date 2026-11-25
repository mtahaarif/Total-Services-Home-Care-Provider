import type { Metadata } from "next";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { Banner } from "@/components/sections/banner";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { MapEmbed } from "@/components/ui/map-embed";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact Our Home Care Team",
  description: `Call ${site.phone} or send a message to Total Services Home Care Provider, ${fullAddress}.`,
  path: "/contact",
  image: { url: "/images/couple-walk.jpg", alt: "Senior couple walking hand in hand along a city street" },
});

const lightSpot = { spot: "rgb(42 99 153 / 0.10)", spotBorder: "rgb(42 99 153 / 0.55)" };

export default function ContactPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <Banner
        crumbs={[{ label: "Contact", href: "/contact" }]}
        eyebrow="Schedule a care conversation"
        title="Let's start the *conversation.*"
        description="Whether you're planning ahead or need help soon, a quick call or message is the first step."
        slides={[{ src: "/images/couple-walk.jpg", alt: "Senior couple walking hand in hand along a city street", focus: "60% center" }]}
        primary={{ label: "Send a message", href: "#message" }}
        secondary={{ label: `Call our office: ${site.phone}`, href: site.phoneHref }}
      />

      <section className="relative overflow-hidden py-24 sm:py-32">

        <div className="container-x grid gap-12 lg:grid-cols-12">
          {/* Ways to reach us */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading eyebrow="Reach us" title="The fastest way is a *call.*" />
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <StaggerItem>
                <a href={site.phoneHref} className="group block">
                  <SpotlightCard className="rounded-[2rem] bg-gradient-to-br from-navy-600 to-navy-900 p-7 text-white" spot="rgb(152 200 96 / 0.25)">
                    <div className="flex items-center gap-4">
                      <span className="grid size-14 place-items-center rounded-2xl bg-leaf-400 text-navy-950 transition-transform duration-500 group-hover:rotate-12">
                        <Phone className="size-6" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-leaf-300">Call us</p>
                        <p className="text-2xl sm:text-3xl"><strong className="font-extrabold">{site.phone}</strong></p>
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </StaggerItem>
              <StaggerItem>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="group block">
                  <SpotlightCard className="rounded-[2rem] border border-navy-100 bg-white p-7" {...lightSpot}>
                    <div className="flex items-start gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-navy-50 text-navy-600">
                        <MapPin className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-navy-500">Visit</p>
                        <p className="font-bold text-navy-950">{site.address.street}</p>
                        <p className="text-muted">
                          {site.address.city}, {site.address.state} {site.address.zip}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 group-hover:underline">
                          <Navigation className="size-3.5" /> Get directions
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </StaggerItem>
              {site.email && (
                <StaggerItem>
                  <a href={`mailto:${site.email}`} className="block">
                    <SpotlightCard className="rounded-[2rem] border border-navy-100 bg-white p-7" {...lightSpot}>
                      <div className="flex items-center gap-4">
                        <span className="grid size-12 place-items-center rounded-2xl bg-navy-50 text-navy-600">
                          <Mail className="size-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-navy-500">Email</p>
                          <p className="font-bold text-navy-950">{site.email}</p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </a>
                </StaggerItem>
              )}
              <StaggerItem>
                <SpotlightCard className="rounded-[2rem] border border-navy-100 bg-white p-7" {...lightSpot}>
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-navy-50 text-navy-600">
                      <Clock className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy-500">Hours</p>
                      {site.hours ? (
                        <ul className="text-navy-950">
                          {site.hours.map((h) => (
                            <li key={h.days}>
                              <span className="font-bold">{h.days}:</span> {h.time}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="font-bold text-navy-950">Call for availability</p>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            </Stagger>
          </div>

          {/* Form */}
          <Reveal className="lg:col-span-7" y={40}>
            <div className="glass rounded-[2.5rem] p-6 sm:p-10">
              <h2 id="message" className="scroll-mt-28 text-3xl font-extrabold tracking-tight text-navy-950">Send us a message</h2>
              <p className="mb-8 mt-2 text-muted">Share a few details and we&apos;ll get back to you.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-3 sm:px-5">
        <Reveal scale={0.97}>
          <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[2.5rem]">
            <MapEmbed className="h-[28rem]" />
          </div>
        </Reveal>
      </section>

      <FaqSection items={faqs} />
    </PageTransition>
  );
}
