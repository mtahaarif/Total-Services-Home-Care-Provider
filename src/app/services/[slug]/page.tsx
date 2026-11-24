import { ViewTransition } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Phone } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { AnimatedHeadline } from "@/components/ui/animated-headline";
import { ButtonLink } from "@/components/ui/button";
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
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[36rem] animate-blob rounded-full bg-leaf-200/50 blur-[110px]" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Link
              href="/services"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-navy-100 bg-white/70 px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> All services
            </Link>
            <span className="grid size-14 place-items-center rounded-2xl bg-navy-600 text-leaf-300">
              <ServiceIcon icon={s.icon} className="size-6" />
            </span>
            <AnimatedHeadline
              as="h1"
              immediate
              text={s.title}
              className="text-5xl font-extrabold leading-[1.02] text-navy-950 sm:text-6xl lg:text-7xl"
            />
            <p className="font-serif text-2xl italic text-navy-500">{s.tagline}</p>
            <p className="max-w-xl text-lg leading-relaxed text-muted">{s.intro}</p>
            <p className="max-w-xl text-muted">
              Available from <strong className="font-semibold text-navy-800">{site.legalName}</strong> for families in{" "}
              {site.address.city} and across {site.address.county}, PA.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href={site.phoneHref} icon={<Phone className="size-4" />}>
                Call {site.phone}
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Ask about {s.title.toLowerCase()}
              </ButtonLink>
            </div>
          </div>
          <div className="relative">
            <ViewTransition name={`svc-img-${s.slug}`} share="morph" default="none">
              <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-40px_rgb(8_26_48/0.55)]">
                <Image src={s.image} alt={s.imageAlt} fill preload quality={60} sizes="(min-width:1024px) 40rem, 100vw" className="object-cover" />
              </div>
            </ViewTransition>
            <div className="glass absolute -bottom-6 left-6 rounded-2xl px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy-500">Included</p>
              <p className="text-2xl font-extrabold text-navy-950">
                {s.items.length} {s.items.length === 1 ? "service" : "services"}
              </p>
            </div>
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
                <div className="group relative isolate overflow-hidden border-t border-navy-100 py-8 last:border-b">
                  <div className="absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-3xl bg-navy-600 transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
                  <div className="flex items-start gap-6 px-2 transition-[padding] duration-700 ease-out-expo group-hover:px-6">
                    <span className="font-serif text-3xl italic text-leaf-500 transition-colors group-hover:text-leaf-300">0{i + 1}</span>
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
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-leaf-400/20 blur-3xl" />
              <div className="relative z-10 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-leaf-300">A day with us</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    What a {s.title.toLowerCase()} visit <span className="font-serif font-normal italic text-leaf-300">looks like</span>
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
