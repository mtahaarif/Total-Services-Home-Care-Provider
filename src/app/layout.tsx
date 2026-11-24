import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/layout/providers";
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
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Total Services Home Care Provider | In-Home Care in Glenolden, PA",
    template: "%s | Total Services Home Care Provider",
  },
  description: site.description,
  keywords: [
    "home care Glenolden PA",
    "home care Delaware County PA",
    "in-home care",
    "senior care",
    "personal care",
    "respite care",
    "companion care",
    "home health aide",
  ],
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: "Total Services Home Care Provider",
    description: site.description,
    images: [{ url: "/images/hero-reading.jpg", width: 1600, height: 1067, alt: "Caregiver reading with a senior man at home" }],
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#081a30",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.legalName,
  description: site.description,
  url: site.url,
  telephone: "+1-215-200-2666",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
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
