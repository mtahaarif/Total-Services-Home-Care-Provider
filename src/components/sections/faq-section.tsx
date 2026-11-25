import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { Faq } from "@/lib/content";
import { site } from "@/lib/site";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo";

/** Sticky-sidebar FAQ: heading + contact card pin while the questions scroll. */
export function FaqSection({
  items,
  eyebrow = "Questions & answers",
  title = "Answers for *families.*",
}: {
  items: Faq[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="cv-auto py-24 [contain-intrinsic-size:auto_1200px] lg:[contain-intrinsic-size:auto_800px] sm:py-32">
      <JsonLd data={faqJsonLd(items)} />
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
            <SectionHeading eyebrow={eyebrow} title={title} />
            <Reveal delay={0.15}>
              <div className="rounded-[2rem] bg-gradient-to-br from-navy-600 to-navy-800 p-7 text-white">
                <p className="text-lg font-bold">Still have questions?</p>
                <p className="mt-2 text-white/75">Talk to a real person on our team — we&apos;re happy to help.</p>
                <ButtonLink href={site.phoneHref} variant="leaf" className="mt-6" icon={<Phone className="size-4" />}>
                  {site.phone}
                </ButtonLink>
                <Link href="/faq" className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-white/85 hover:text-white">
                  See all frequently asked questions <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <Accordion items={items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
