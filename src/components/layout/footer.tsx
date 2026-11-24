import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, site } from "@/lib/site";
import { services } from "@/lib/services";
import { Brand } from "./brand";
import { Year } from "./year";

/** Descriptive anchors (the header keeps the short labels). */
const footerLinks = [
  { href: "/", label: `Home care in ${site.address.city}` },
  { href: "/about", label: "About our agency" },
  { href: "/services", label: "All care services" },
  { href: "/careers", label: "Caregiver jobs" },
  { href: "/contact", label: "Contact our office" },
];

const socialLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  google: "Google",
};

export function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);

  return (
    <footer className="grain relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-navy-500/30 blur-[120px]" />

      <div className="container-x relative z-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Brand dark />
            <p className="max-w-sm leading-relaxed text-navy-100/70">{site.overview}</p>
            {socials.length > 0 && (
              <ul className="flex gap-2">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white hover:text-navy-950">
                      {socialLabels[key]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-leaf-300">Explore</h2>
              <ul className="flex flex-col gap-3">
                {footerLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group inline-flex items-center gap-1 text-navy-100/80 transition-colors hover:text-white">
                      {item.label}
                      <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-leaf-300">Care services</h2>
              <ul className="flex flex-col gap-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="group inline-flex items-center gap-1 text-navy-100/80 transition-colors hover:text-white">
                      {s.title.includes(" ") ? s.title : `${s.title} care`}
                      <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-leaf-300">Get in touch</h2>
              <ul className="flex flex-col gap-4 text-navy-100/80">
                <li>
                  <a href={site.phoneHref} className="flex items-start gap-3 hover:text-white">
                    <Phone className="mt-0.5 size-4 shrink-0 text-leaf-300" />
                    {site.phone}
                  </a>
                </li>
                {site.email && (
                  <li>
                    <a href={`mailto:${site.email}`} className="flex items-start gap-3 hover:text-white">
                      <Mail className="mt-0.5 size-4 shrink-0 text-leaf-300" />
                      {site.email}
                    </a>
                  </li>
                )}
                <li>
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-leaf-300" />
                    {fullAddress}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-leaf-300" />
                  {site.hours ? site.hours.map((h) => `${h.days}: ${h.time}`).join(" · ") : "Call for availability"}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-navy-100/60 md:flex-row md:items-center md:justify-between">
          <p>
            © <Year /> {site.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>NPI {site.npi}</span>
            <span>Proudly serving {site.address.county}, PA</span>
          </p>
        </div>
      </div>

      <div aria-hidden className="relative z-10 select-none overflow-hidden">
        <p className="text-gradient-light translate-y-[22%] whitespace-nowrap text-center text-[14.5vw] font-extrabold leading-none tracking-tighter opacity-[0.12]">
          Total Services
        </p>
      </div>
    </footer>
  );
}
