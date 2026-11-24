import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/layout/providers";
import { Analytics } from "@/components/seo/analytics";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { allServiceNames } from "@/lib/services";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic", // the serif is only ever used in italic — skip the upright file
  display: "swap",
});

const home = pageMeta({
  title: `In-Home Care in ${site.address.city}, PA | ${site.name}`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export const metadata: Metadata = {
  ...home,
  metadataBase: new URL(site.url),
  title: {
    default: `In-Home Care in ${site.address.city}, PA | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  applicationName: site.legalName,
  formatDetection: { telephone: true, address: true },
  keywords: [
    "home care Drexel Hill PA",
    "home care Upper Darby PA",
    "home care Delaware County PA",
    "in-home care",
    "senior care",
    "personal care",
    "respite care",
    "companion care",
    "home health aide",
  ],
};

export const viewport: Viewport = {
  themeColor: "#081a30",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.legalName,
  url: site.url,
  publisher: { "@id": `${site.url}/#business` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.phoneIntl,
  image: `${site.url}/images/hero-reading.jpg`,
  logo: `${site.url}/logo-full.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  areaServed: { "@type": "AdministrativeArea", name: `${site.address.county}, Pennsylvania` },
  employee: { "@type": "Person", name: site.president, jobTitle: "President" },
  identifier: { "@type": "PropertyValue", propertyID: "NPI", value: site.npi },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home care services",
    itemListElement: allServiceNames.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrument.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={[jsonLd, websiteJsonLd]} />
        <Analytics />
        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
