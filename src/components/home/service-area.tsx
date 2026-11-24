import { MapPin, Navigation } from "lucide-react";
import { fullAddress, serviceArea, site } from "@/lib/site";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

export function ServiceArea() {
  const half = Math.ceil(serviceArea.length / 2);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-navy-50 to-cream py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-8">
          <SectionHeading
            eyebrow="Where we care"
            title={`Proudly serving ${site.address.county.split(" ").map((w) => `*${w}*`).join(" ")}.`}
            description={`From our home base in ${site.address.city}, we care for families across the neighborhoods around us. Don't see your town? Call — we'll let you know.`}
          />
          <div className="flex flex-col gap-3">
            <Marquee duration={50} gap="0.75rem">
              {serviceArea.slice(0, half).map((t) => (
                <span key={t} className="whitespace-nowrap rounded-full border border-navy-100 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800">
                  {t}
                </span>
              ))}
            </Marquee>
            <Marquee duration={45} gap="0.75rem" reverse>
              {serviceArea.slice(half).map((t) => (
                <span key={t} className="whitespace-nowrap rounded-full bg-navy-600 px-5 py-2.5 text-sm font-semibold text-white">
                  {t}
                </span>
              ))}
            </Marquee>
          </div>
          <Reveal delay={0.1}>
            <ButtonLink href={site.mapsUrl} variant="outline" icon={<Navigation className="size-4" />}>
              Get directions
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal scale={0.94} className="relative">
          <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-white shadow-[0_40px_80px_-40px_rgb(8_26_48/0.5)]">
            <iframe
              title={`Map showing ${fullAddress}`}
              src={site.mapsEmbed}
              className="block h-[26rem] w-full grayscale-[35%] sm:h-[32rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="glass absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-3xl p-4 sm:left-auto sm:right-8 sm:w-80">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf-400 text-navy-950">
              <MapPin className="size-5" />
            </span>
            <div className="text-sm">
              <p className="font-bold text-navy-950">{site.legalName}</p>
              <p className="text-muted">{fullAddress}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
