import type { MetadataRoute } from "next";
import { serviceHref, services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/careers", "/faq", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const categories = services.map((s) => ({
    url: `${site.url}${serviceHref(s.slug)}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...categories];
}
