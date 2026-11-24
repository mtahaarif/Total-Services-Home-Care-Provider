import type { Metadata } from "next";
import { site } from "./site";

const DEFAULT_IMAGE = { url: "/images/hero-reading.jpg", width: 1600, height: 1067, alt: "Caregiver reading with a senior man at home" };

/**
 * Complete per-page metadata. Next.js merges metadata shallowly, so a page
 * that only set `description` would inherit the root `openGraph`/`twitter`
 * blocks (wrong description, no og:url). Every page builds all of them here.
 *
 * Keep `title` ≤ ~42 chars (the template adds " | Total Services") and
 * `description` ≤ 155 chars so neither is truncated in results.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const img = image ? { ...image, width: 1600, height: 1067 } : DEFAULT_IMAGE;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.legalName,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img.url],
    },
  };
}

/** Breadcrumb structured data for inner pages. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path === "/" ? "" : t.path}`,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
