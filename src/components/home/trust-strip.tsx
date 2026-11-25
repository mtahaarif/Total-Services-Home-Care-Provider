import { HeartHandshake, MapPin, Star, Users } from "lucide-react";
import { site } from "@/lib/site";

/** Slim, minimal trust bar directly under the home banner. */
export function TrustStrip() {
  const items = [
    {
      icon: Star,
      title: `${site.rating.value.toFixed(1)} rating`,
      body: `From ${site.rating.count} family reviews on ${site.rating.source}`,
      href: site.rating.url,
    },
    { icon: HeartHandshake, title: "Customized care plans", body: "Built around each person's routine" },
    { icon: Users, title: "Family-centered", body: "We keep you informed every step" },
    { icon: MapPin, title: `Based in ${site.address.city}`, body: `Serving ${site.address.county}, PA` },
  ];

  return (
    <section aria-label="Why families trust us" className="border-b border-navy-100/80">
      <ul className="container-x grid grid-cols-2 gap-x-6 gap-y-5 py-7 lg:grid-cols-4">
        {items.map((it) => {
          const content = (
            <>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-600">
                <it.icon className="size-[18px]" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-bold text-navy-900">{it.title}</span>
                <span className="text-[13px] leading-snug text-navy-900/60">{it.body}</span>
              </span>
            </>
          );
          return (
            <li key={it.title}>
              {it.href ? (
                <a href={it.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                  {content}
                </a>
              ) : (
                <div className="flex items-center gap-3">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
