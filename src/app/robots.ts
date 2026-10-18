import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";

// Maquette : on demande aux moteurs de ne pas indexer.
// Au lancement officiel : remplacer `disallow: "/"` par `allow: "/"` et retirer le noindex de layout.tsx.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
