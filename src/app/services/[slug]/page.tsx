import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { CtaBand } from "@/components/sections/cta-band";
import { Banner } from "@/components/sections/banner";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { ServiceIcon } from "@/components/ui/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({
    title: `${s.title} in ${site.address.city}, PA`,
    description: s.metaDescription,
    path: `/services/${s.slug}`,
    image: { url: s.image, alt: s.imageAlt },
  });
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.metaDescription,
    url: `${site.url}/services/${s.slug}`,
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "AdministrativeArea", name: `${site.address.county}, Pennsylvania` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.title,
      itemListElement: s.items.map((i) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: i.name, description: i.desc } })),
    },
  };

  return (
    <PageTransition>
      <JsonLd
        data={[
          serviceJsonLd,
          breadcrumbJsonLd([
            { name: "Services", path: "/services" },
            { name: s.title, path: `/services/${s.slug}` },
          ]),
        ]}
      />
      <Banner
        crumbs={[
          { label: "Services", href: "/services" },
          { label: s.title, href: `/services/${s.slug}` },
        ]}
        eyebrow={s.tagline}
        title={`${s.title} in ${site.address.city}, PA`}
        description={s.short}
        slides={[{ src: s.image, alt: s.imageAlt }]}
        primary={{ label: `Ask about ${s.title.toLowerCase()}`, href: "/contact" }}
        secondary={{ label: `Call ${site.phone}`, href: site.phoneHref }}
        morphName={`svc-img-${s.slug}`}
      />

      {/* Intro */}
      <section className="pt-16 sm:pt-20">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="flex items-center gap-4 lg:col-span-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-navy-600 text-leaf-300">
              <ServiceIcon icon={s.icon} className="size-6" />
            </span>
            <p className="text-2xl text-navy-500">{s.tagline}</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-8">
            <p className="text-lg leading-relaxed text-muted">{s.intro}</p>
            <p className="text-muted">
              Available from <strong className="font-semibold text-navy-800">{site.legalName}</strong> for families in{" "}
              {site.address.city} and across {site.address.county}, PA.
            </p>
          </div>
        </div>
      </section>

      {/* What's included — rows with hover sweep */}
      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading eyebrow="What's included" title="How we *help.*" />
              <Reveal delay={0.1} className="mt-8 flex flex-col gap-2">
                <p className="text-sm font-bold text-navy-900">Often a fit for</p>
                {s.idealFor.map((t) => (
                  <span key={t} className="inline-flex items-center gap-2 text-muted">
                    <Check className="size-4 text-leaf-500" strokeWidth={3} /> {t}
                  </span>
                ))}
              </Reveal>
            </div>
          </div>
          <Stagger className="flex flex-col lg:col-span-8">
            {s.items.map((item, i) => (
              <StaggerItem key={item.name}>
                <div className="group relative isolate block overflow-hidden border-t border-navy-100 py-8 last:border-b">
                  <div className="absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-3xl bg-navy-600 transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
                  <div className="flex items-start gap-6 px-2 transition-[padding] duration-700 ease-out-expo group-hover:px-6">
                    <span className="text-3xl text-leaf-500 transition-colors group-hover:text-leaf-300">0{i + 1}</span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-extrabold text-navy-950 transition-colors group-hover:text-white sm:text-3xl">{item.name}</h3>
                      <p className="mt-2 max-w-xl text-lg leading-relaxed text-muted transition-colors group-hover:text-white/80">{item.desc}</p>
                    </div>
                    <ArrowUpRight className="mt-2 size-6 text-navy-300 transition-all duration-500 group-hover:rotate-45 group-hover:text-leaf-300" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* What a visit looks like */}
      <section className="pb-20 sm:pb-24">
        <div className="container-x">
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[2.5rem] bg-navy-950 p-8 text-white sm:p-14">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-leaf-400/20 soft-glow" />
              <div className="relative z-10 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-leaf-300">A day with us</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    What a {s.title.toLowerCase()} visit <span className="text-leaf-300">looks like</span>
                  </h2>
                </div>
                <p className="text-lg leading-relaxed text-white/80 lg:col-span-8">{s.visit}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other services — snap rail */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <SectionHeading eyebrow="Pair it with" title="Other ways we *care.*" />
        </div>
        <div className="no-scrollbar container-x mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/services/${o.slug}`}
              className="group relative isolate flex h-80 w-72 shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[2rem] p-6 text-white"
            >
              <Image quality={60} src={o.image} alt="" fill sizes="18rem" className="-z-20 object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-110" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <span className="glass-dark mb-auto grid size-11 place-items-center rounded-2xl text-leaf-300">
                <ServiceIcon icon={o.icon} className="size-5" />
              </span>
              <h3 className="text-2xl font-extrabold">{o.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-white/75">{o.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={s.faqs} eyebrow={`${s.title} FAQ`} title="Common *questions.*" />
      <CtaBand image={s.image} />
    </PageTransition>
  );
}

