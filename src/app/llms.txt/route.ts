import { faqs } from "@/lib/content";
import { services } from "@/lib/services";
import { fullAddress, serviceArea, site } from "@/lib/site";

/**
 * /llms.txt — a plain-text map of the site for AI answer engines
 * (https://llmstxt.org). Built from the same data as the pages, so it never
 * drifts out of date. Prerendered at build time.
 */
export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const body = `# ${site.legalName}

> ${site.description}

${site.overview}

- Phone: ${site.phone}
- Address: ${fullAddress}
- Area served: ${site.address.city} and ${site.address.county}, Pennsylvania (including ${serviceArea.slice(1, 9).join(", ")})
- NPI: ${site.npi}
${site.email ? `- Email: ${site.email}\n` : ""}
## Pages

- [Home](${u("/")}): Overview of our in-home care, how getting started works, and our service area.
- [About](${u("/about")}): Who we are, our values and how we work with families.
- [Services](${u("/services")}): All home care services, grouped into six categories.
- [Careers](${u("/careers")}): Caregiver and home care aide jobs, and the online application.
- [Contact](${u("/contact")}): Phone, address, map and contact form.

## Services

${services
  .map((s) => `- [${s.title}](${u(`/services/${s.slug}`)}): ${s.metaDescription} Includes: ${s.items.map((i) => i.name).join(", ")}.`)
  .join("\n")}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
