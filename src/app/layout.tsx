import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fraunces, inter } from "./fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";
import { baseUrl, ogBase } from "@/lib/seo";

const description =
  "COOP-DCVA, coopérative de production et de développement des chaînes de valeur agroalimentaires à N'Djaména : production, transformation, formation et accompagnement, au service des femmes et des jeunes.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "COOP-DCVA | Chaînes de valeur agroalimentaires, N'Djaména",
    template: "%s | COOP-DCVA",
  },
  description,
  applicationName: "COOP-DCVA",
  authors: [{ name: "COOP-DCVA" }],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    ...ogBase,
    title: "COOP-DCVA | Qui ne se plante pas ne pousse jamais",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "COOP-DCVA | Qui ne se plante pas ne pousse jamais",
    description,
  },
  robots: { index: false, follow: false }, // Maquette : à passer en index au lancement officiel.
};

export const viewport: Viewport = {
  themeColor: "#115c2f",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${baseUrl}/#organisation`,
  name: site.name,
  legalName: site.fullName,
  url: baseUrl,
  logo: `${baseUrl}/images/logo.png`,
  image: `${baseUrl}/opengraph-image.png`,
  foundingDate: "2023-07-10",
  slogan: site.slogan,
  email: site.email,
  telephone: site.phones.map((p) => p.href.replace("tel:", "")),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rue du Lycée de Gassi, Quartier Gassi",
    addressLocality: "N'Djaména",
    addressCountry: "TD",
  },
  areaServed: { "@type": "Country", name: "Tchad" },
  sameAs: [site.facebook],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`h-full ${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-sesame-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <script
          type="application/ld+json"
          // Escape "<" so the JSON can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
        />
      </body>
    </html>
  );
}
