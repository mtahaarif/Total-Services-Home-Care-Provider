import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, site } from "@/lib/site";
import { services } from "@/lib/services";
import { Brand } from "./brand";
import { Year } from "./year";

/** Descriptive anchors (the header keeps the short labels). */
const company = [
  { href: "/", label: `Home care in ${site.address.city}` },
  { href: "/about", label: "About our agency" },
  { href: "/services", label: "All care services" },
  { href: "/careers", label: "Caregiver jobs" },
  { href: "/faq", label: "Frequently asked questions" },
  { href: "/contact", label: "Contact our office" },
];

const socialLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  google: "Google",
};

const heading = "mb-4 text-sm font-bold text-navy-900";
const link = "text-[15px] text-navy-900/65 transition-colors hover:text-navy-600";

/** Minimal footer on the logo's light blue. */
export function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);

  return (
    <footer className="cv-auto border-t border-navy-100 bg-navy-50 [contain-intrinsic-size:auto_860px] lg:[contain-intrinsic-size:auto_470px]">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Brand />
            <p className="max-w-sm text-[15px] leading-relaxed text-navy-900/65">{site.overview}</p>
            {socials.length > 0 && (
              <ul className="flex gap-2">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-navy-200 px-4 py-2 text-sm text-navy-800 hover:bg-white">
                      {socialLabels[key]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className={heading}>Care services</h2>
              <ul className="flex flex-col gap-2.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={link}>
                      {s.title.includes(" ") ? s.title : `${s.title} care`}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={heading}>Company</h2>
              <ul className="flex flex-col gap-2.5">
                {company.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className={heading}>Contact</h2>
              <ul className="flex flex-col gap-3 text-[15px] text-navy-900/65">
                <li>
                  <a href={site.phoneHref} className="flex items-start gap-2.5 font-semibold text-navy-800 hover:text-navy-600">
                    <Phone className="mt-1 size-4 shrink-0 text-navy-400" />
                    {site.phone}
                  </a>
                </li>
                {site.email && (
                  <li>
                    <a href={`mailto:${site.email}`} className="flex items-start gap-2.5 hover:text-navy-600">
                      <Mail className="mt-1 size-4 shrink-0 text-navy-400" />
                      {site.email}
                    </a>
                  </li>
                )}
                <li>
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:text-navy-600">
                    <MapPin className="mt-1 size-4 shrink-0 text-navy-400" />
                    {fullAddress}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="mt-1 size-4 shrink-0 text-navy-400" />
                  {site.hours ? site.hours.map((h) => `${h.days}: ${h.time}`).join(" · ") : "Call for availability"}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-navy-200/70 pt-6 text-sm text-navy-900/55 md:flex-row md:items-center md:justify-between">
          <p>
            © <Year /> {site.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>NPI {site.npi}</span>
            <span>Proudly serving {site.address.county}, PA</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
