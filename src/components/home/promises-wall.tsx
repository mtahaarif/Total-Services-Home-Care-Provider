import { ArrowUpRight, Quote } from "lucide-react";
import { promises, testimonials } from "@/lib/content";
import { site } from "@/lib/site";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stars } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

type Card = { title: string; body: string; footer?: string };

function WallCard({ c }: { c: Card }) {
  return (
    <figure className="w-full rounded-3xl border border-navy-100 bg-white p-6 shadow-[0_20px_40px_-30px_rgb(8_26_48/0.35)] transition-transform duration-500 hover:-translate-y-1">
      <Quote className="size-6 text-leaf-400" aria-hidden />
      <figcaption className="mt-4 text-lg font-bold text-navy-950">{c.title}</figcaption>
      <blockquote className="mt-2 leading-relaxed text-muted">{c.body}</blockquote>
      {c.footer && <p className="mt-4 text-sm font-semibold text-navy-600">{c.footer}</p>}
    </figure>
  );
}

/**
 * Three auto-scrolling columns (pause on hover). Shows real testimonials when
 * they've been added in lib/content.ts; otherwise shows the agency's promises.
 */
export function PromisesWall() {
  const hasReviews = testimonials.length > 0;
  const cards: Card[] = hasReviews
    ? testimonials.map((t) => ({ title: t.name, body: `“${t.quote}”`, footer: t.relation }))
    : promises;
  const cols = [0, 1, 2].map((c) => cards.filter((_, i) => i % 3 === c));

  return (
    <section className="cv-auto relative overflow-hidden py-24 [contain-intrinsic-size:auto_1230px] lg:[contain-intrinsic-size:auto_860px] sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-4">
          <SectionHeading
            eyebrow={hasReviews ? "Kind words" : "Our commitments"}
            title={hasReviews ? "What families *say.*" : "What every family can *expect.*"}
            description="Hover a column to pause it."
          />
          <Reveal delay={0.2}>
            <a
              href={site.rating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-3xl bg-navy-950 p-6 text-white transition-transform hover:-translate-y-1"
            >
              <div>
                <Stars className="text-amber-400" />
                <p className="mt-3 text-4xl font-extrabold">{site.rating.value.toFixed(1)} / 5</p>
                <p className="mt-1 text-sm text-white/70">
                  From {site.rating.count} family reviews on {site.rating.source}
                </p>
              </div>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-leaf-400 text-navy-950 transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-5" />
              </span>
            </a>
          </Reveal>
        </div>

        <div className="relative grid h-[38rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
          {cols.map((col, i) => (
            <Marquee
              key={i}
              vertical
              reverse={i === 1}
              duration={38 + i * 8}
              gap="1rem"
              className={i === 1 ? "hidden sm:flex" : i === 2 ? "hidden lg:flex" : ""}
            >
              {col.map((c) => (
                <WallCard key={c.title} c={c} />
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  );
}
