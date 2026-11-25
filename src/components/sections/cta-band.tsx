import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { AnimatedHeadline } from "@/components/ui/animated-headline";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";

export function CtaBand({
  title = "Let's talk about care for the people you *love.*",
  image = "/images/couple-walk.jpg",
}: {
  title?: string;
  image?: string;
}) {
  return (
    <section className="cv-auto container-x pb-24 [contain-intrinsic-size:auto_650px] lg:[contain-intrinsic-size:auto_535px] sm:pb-32">
      <Reveal scale={0.96} y={40}>
        <div className="grain relative isolate overflow-hidden rounded-[2.5rem] bg-navy-800 px-6 py-16 text-white sm:px-14 sm:py-20">
          <Image quality={60} src={image} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-35" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-700/40" />
          <div aria-hidden className="absolute -right-20 -top-20 -z-10 size-80 rounded-full bg-leaf-400/30 soft-glow" />

          <div className="relative z-10 grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-leaf-300">We&apos;re here to help</p>
              <AnimatedHeadline
                text={title}
                className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl"
                accentClassName="text-leaf-300"
              />
              <p className="mt-6 max-w-xl text-lg text-white/75">
                One conversation is all it takes to start. Tell us about your loved one and we&apos;ll take it from there.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
              <Magnetic strength={0.2}>
                <ButtonLink href={site.phoneHref} variant="leaf" icon={<Phone className="size-4" />} className="h-14 px-7 text-base">
                  Call {site.phone}
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="/contact" variant="ghost-light" icon={<MessageCircle className="size-4" />} className="h-14 px-7 text-base">
                Send a message
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
