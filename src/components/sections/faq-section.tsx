import { Phone } from "lucide-react";
import type { Faq } from "@/lib/content";
import { site } from "@/lib/site";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

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
    <section className="py-24 sm:py-32">
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
