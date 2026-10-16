import type { MetadataRoute } from "next";

// Maquette : on demande aux moteurs de ne pas indexer. À ouvrir au lancement officiel.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
