/**
 * Single source of truth for business details.
 *
 * Address and phone supplied by the agency (Nov 2026). Other details from public records:
 *  - CMS NPPES NPI Registry, NPI 1124943782 (name, President, taxonomy)
 *  - AgingCare.com listing (overview text + service list)
 *  - CareAvailability.com listing (5.0 rating from 5 reviews)
 *
 * Fields marked TODO were not found anywhere public — fill them in before launch.
 */
export const site = {
  legalName: "Total Services Home Care Provider, LLC",
  name: "Total Services",
  tagline: "Home Care Provider",
  /** Kept under 160 characters for search snippets. */
  description:
    "Compassionate in-home care in Drexel Hill & Delaware County, PA: personal care, companionship, meals, medication reminders and respite care.",
  overview:
    "We work closely with families to create customized care plans that meet each client's unique needs, providing peace of mind and exceptional care every step of the way.",

  phone: "(610) 492-6485",
  phoneHref: "tel:+16104926485",
  phoneIntl: "+1-610-492-6485",

  /** TODO: no public email found. Set one to show it across the site. */
  email: null as string | null,

  /** TODO: office hours were not published. `null` shows "Call for availability". */
  hours: null as { days: string; time: string }[] | null,

  address: {
    street: "3615 Garrett Rd #1035",
    streetName: "Garrett Road",
    city: "Drexel Hill",
    state: "PA",
    zip: "19026",
    county: "Delaware County",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=3615+Garrett+Rd%2C+Drexel+Hill%2C+PA+19026",
  mapsEmbed: "https://www.google.com/maps?q=3615+Garrett+Rd,+Drexel+Hill,+PA+19026&z=15&output=embed",

  president: "Kevin A. Dandridge",
  npi: "1124943782",

  rating: {
    value: 5.0,
    count: 5,
    source: "CareAvailability",
    url: "https://careavailability.com/provider/total-services-home-care-provider-llc/",
  },
  listings: [
    { label: "CareAvailability", href: "https://careavailability.com/provider/total-services-home-care-provider-llc/" },
    { label: "AgingCare", href: "https://www.agingcare.com/local/total-services-home-care-provider-llc-glenolden-in-home-care-pa" },
    { label: "NPI Registry", href: "https://npiregistry.cms.hhs.gov/provider-view/1124943782" },
  ],

  /** TODO: no social profiles exist yet. Add URLs and they appear in the header menu + footer. */
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
    google: "",
  },

  /**
   * Canonical origin (always https in production). Resolution order:
   * NEXT_PUBLIC_SITE_URL (set this once a custom domain is live) →
   * Vercel's production domain → the current vercel.app deployment.
   */
  url: resolveSiteUrl(),
} as const;

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return "https://total-services-home-care-provider.vercel.app";
}

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

/**
 * Nearby communities within a short drive of the Drexel Hill office.
 * TODO: confirm the agency's actual coverage area with the owner.
 */
export const serviceArea = [
  "Drexel Hill",
  "Upper Darby",
  "Havertown",
  "Clifton Heights",
  "Lansdowne",
  "East Lansdowne",
  "Primos",
  "Secane",
  "Aldan",
  "Yeadon",
  "Springfield",
  "Broomall",
  "Collingdale",
  "Glenolden",
  "Darby",
  "Morton",
  "Media",
  "Swarthmore",
  "West Philadelphia",
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Our services" },
  { href: "/careers", label: "Careers" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
