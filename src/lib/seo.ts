import type { Metadata } from "next";

/** Public URL of the site, used for canonical links, sitemap and Open Graph. */
export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Open Graph fields shared by every page (nested metadata objects are not merged by Next). */
export const ogBase = { type: "website", locale: "fr_FR", siteName: "COOP-DCVA" } as const;

/** Per-page metadata with canonical URL and matching Open Graph / Twitter fields. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...ogBase, title: `${title} | COOP-DCVA`, description, url: path },
    twitter: { card: "summary_large_image", title: `${title} | COOP-DCVA`, description },
  };
}
