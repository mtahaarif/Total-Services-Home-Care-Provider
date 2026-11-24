/**
 * Single source of truth for business details.
 *
 * Sourced from public records (Nov 2026):
 *  - CMS NPPES NPI Registry, NPI 1124943782 (name, address, phone, President, taxonomy)
 *  - AgingCare.com listing (overview text + service list)
 *  - CareAvailability.com listing (5.0 rating from 5 reviews)
 *
 * Fields marked TODO were not found anywhere public — fill them in before launch.
 */
export const site = {
  legalName: "Total Services Home Care Provider, LLC",
  name: "Total Services",
  tagline: "Home Care Provider",
  description:
    "Total Services Home Care Provider, LLC delivers compassionate, personalized in-home care in Glenolden and across Delaware County, PA — personal care, companionship, meal preparation, medication reminders, respite care and more.",
  overview:
    "We work closely with families to create customized care plans that meet each client's unique needs, providing peace of mind and exceptional care every step of the way.",

  phone: "(215) 200-2666",
  phoneHref: "tel:+12152002666",

  /** TODO: no public email found. Set one to show it across the site. */
  email: null as string | null,

  /** TODO: office hours were not published. `null` shows "Call for availability". */
  hours: null as { days: string; time: string }[] | null,

  address: {
    street: "904 Poplar Ave",
    city: "Glenolden",
    state: "PA",
    zip: "19036",
    county: "Delaware County",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=904+Poplar+Ave%2C+Glenolden%2C+PA+19036",
  mapsEmbed: "https://www.google.com/maps?q=904+Poplar+Ave,+Glenolden,+PA+19036&z=15&output=embed",

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

  /** TODO: set NEXT_PUBLIC_SITE_URL once the domain is chosen. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

/**
 * Nearby communities within a short drive of the Glenolden office.
 * TODO: confirm the agency's actual coverage area with the owner.
 */
export const serviceArea = [
  "Glenolden",
  "Folcroft",
  "Norwood",
  "Prospect Park",
  "Ridley Park",
  "Sharon Hill",
  "Collingdale",
  "Darby",
  "Aldan",
  "Clifton Heights",
  "Morton",
  "Holmes",
  "Ridley Township",
  "Lansdowne",
  "Upper Darby",
  "Swarthmore",
  "Springfield",
  "Media",
  "Southwest Philadelphia",
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;
