import type { MetadataRoute } from "next";
import { nav, projets } from "@/lib/site";
import { baseUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = nav.map((item) => ({
    url: `${baseUrl}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));
  const details = projets.map((p) => ({
    url: `${baseUrl}/projets/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...details];
}
