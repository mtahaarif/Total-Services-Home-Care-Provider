import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { AnimatedHeadline } from "@/components/ui/animated-headline";
import { cn } from "@/lib/utils";

type Cta = { label: string; href: string };
type Slide = { src: string; alt: string; focus?: string };

/**
 * Page banner used on every page (benevolencehomeservices.com-style):
 * full-width photo under the header, a white gradient from the left that
 * carries the text, a thin brand accent line on top, a small uppercase
 * eyebrow, the headline and two compact uppercase pill buttons.
 *
 * Multiple `slides` crossfade with pure CSS (first slide visible on first
 * paint, so LCP is unaffected).
 */
export function Banner({
  eyebrow,
  title,
  description,
  slides,
  primary,
  secondary,
  crumbs,
  morphName,
}: {
  eyebrow: string;
  /** Wrap accent words in *asterisks*. */
  title: string;
  description?: string;
  slides: Slide[];
  primary?: Cta;
  secondary?: Cta;
  /** Breadcrumb trail after "Home" (omit on the home page). */
  crumbs?: Cta[];
  /** Shared-element name so a service card image can morph into this banner. */
  morphName?: string;
}) {
  const multi = slides.length > 1;
  const media = (
    <div className="absolute inset-0 -z-20">
      {slides.map((s, i) => (
        <div key={s.src} className={cn("absolute inset-0", multi && "banner-slide", multi && `banner-slide-${i + 1}`)}>
          <Image
            src={s.src}
            alt={i === 0 ? s.alt : ""}
            fill
            preload={i === 0}
            quality={60}
            sizes="100vw"
            className="object-cover"
            style={s.focus ? { objectPosition: s.focus } : undefined}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative isolate mt-[72px] h-[calc(30svh+50px)] min-h-[470px] w-full overflow-hidden">
      {morphName ? (
        <ViewTransition name={morphName} share="morph" default="none">
          {media}
        </ViewTransition>
      ) : (
        media
      )}

      {/* White wash carrying the text (full width on phones, ~60% on desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-white via-white/80 to-white/10 sm:w-[85%] sm:to-transparent md:w-[72%] lg:w-[62%]"
      />
      {/* Thin brand accent line */}
      <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-[3px] bg-leaf-400" />

      <div className="container-x flex h-full flex-col justify-center">
        <div className="flex max-w-xl flex-col gap-4">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="enter-fade-up flex flex-wrap items-center gap-1 text-xs text-navy-900/60">
              <Link href="/" className="hover:text-navy-600">
                Home
              </Link>
              {crumbs.map((c, i) => (
                <span key={c.href} className="flex items-center gap-1">
                  <ChevronRight className="size-3 opacity-60" />
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="font-semibold text-navy-800">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={c.href} className="hover:text-navy-600">
                      {c.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          )}
          <p className="enter-fade-up text-[11px] font-semibold uppercase tracking-[0.32em] text-navy-500 [animation-delay:100ms]">{eyebrow}</p>
          <AnimatedHeadline
            as="h1"
            immediate
            delay={0.1}
            text={title}
            className="text-[2.1rem] font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-[2.5rem] lg:text-[3rem]"
            accentClassName="text-navy-500"
          />
          {description && (
            <p className="enter-fade-up max-w-lg text-[15px] leading-relaxed text-navy-900/75 sm:text-base [animation-delay:250ms]">
              {description}
            </p>
          )}
          {(primary || secondary) && (
            <div className="enter-fade-up mt-1 flex flex-wrap items-center gap-2.5 [animation-delay:350ms]">
              {primary && <BannerButton cta={primary} tone="primary" />}
              {secondary && <BannerButton cta={secondary} tone="secondary" />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function BannerButton({ cta, tone }: { cta: Cta; tone: "primary" | "secondary" }) {
  const cls = cn(
    "group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
    tone === "primary"
      ? "bg-navy-600 text-white shadow-[0_8px_20px_-10px_rgb(34_85_138/0.9)] hover:bg-navy-700"
      : "bg-leaf-400/15 text-navy-900 hover:bg-leaf-400/25",
  );
  const inner = (
    <>
      {cta.label}
      {tone === "primary" && (
        <span className="grid size-4 place-items-center rounded-full bg-white text-navy-600 transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="size-3" strokeWidth={3} />
        </span>
      )}
    </>
  );
  return /^(tel:|mailto:|https?:)/.test(cta.href) ? (
    <a href={cta.href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={cta.href} className={cls}>
      {inner}
    </Link>
  );
}
