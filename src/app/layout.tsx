import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "COOP-DCVA | Chaînes de valeur agroalimentaires, N'Djaména",
    template: "%s | COOP-DCVA",
  },
  description:
    "COOP-DCVA, coopérative de production et de développement des chaînes de valeur agroalimentaires à N'Djaména : céréales, huiles, arachide, spiruline et formation, au service des femmes et des jeunes.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "COOP-DCVA",
    title: "COOP-DCVA | Qui ne se plante pas ne pousse jamais",
    images: [{ url: "/images/banniere.png", width: 1080, height: 648, alt: "COOP-DCVA" }],
    description:
      "Transformation locale, autonomisation des femmes et des jeunes, économie circulaire zéro déchet au Tchad.",
  },
  robots: { index: false, follow: false }, // Maquette : à passer en index au lancement officiel.
};

export const viewport: Viewport = {
  themeColor: "#115c2f",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.fullName,
  foundingDate: "2023-07-10",
  email: site.email,
  telephone: site.phone,
  slogan: site.slogan,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Quartier Gassi",
    addressLocality: "N'Djaména",
    addressCountry: "TD",
  },
  sameAs: [site.facebook],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full">
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-sesame-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
