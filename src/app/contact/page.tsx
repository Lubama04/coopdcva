import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, Section, SectionTitle } from "@/components/ui";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { site, whatsappHref } from "@/lib/site";

const lieu = "Quartier Gassi, N'Djaména, Tchad";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contacter la COOP-DCVA : quartier Gassi, N'Djaména. Téléphone, e-mail et formulaire de contact.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Écrivez-nous, appelez-nous, passez nous voir"
        intro="Pour une commande, une formation ou un partenariat, nous vous répondons avec plaisir."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-3xl bg-[#1f7a43] p-6 text-white shadow-lg shadow-leaf-900/15 transition-colors hover:bg-leaf-700"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
                <WhatsAppIcon className="h-7 w-7" />
              </span>
              <span>
                <span className="font-display block text-xl font-semibold">Écrire sur WhatsApp</span>
                <span className="text-sm text-white/90">Le moyen le plus rapide de nous joindre · {site.phone}</span>
              </span>
            </a>
            <div className="rounded-3xl border border-soil-100 bg-paper p-6">
              <h2 className="font-display text-xl font-semibold text-leaf-900">Adresse</h2>
              <p className="mt-2 text-ink-soft">{site.addressDetail}, Tchad</p>
            </div>
            <div className="rounded-3xl border border-soil-100 bg-paper p-6">
              <h2 className="font-display text-xl font-semibold text-leaf-900">Téléphone</h2>
              <ul className="mt-1">
                {site.phones.map((ph) => (
                  <li key={ph.href}>
                    <a href={ph.href} className="inline-flex min-h-11 items-center text-lg font-semibold text-leaf-700 hover:underline">
                      {ph.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-soil-100 bg-paper p-6">
              <h2 className="font-display text-xl font-semibold text-leaf-900">E-mail</h2>
              <a href={`mailto:${site.email}`} className="mt-1 flex min-h-11 items-center break-all text-lg font-semibold text-leaf-700 hover:underline">
                {site.email}
              </a>
            </div>
            <div className="rounded-3xl border border-soil-100 bg-paper p-6">
              <h2 className="font-display text-xl font-semibold text-leaf-900">Réseaux</h2>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="mt-1 flex min-h-11 items-center font-semibold text-leaf-700 hover:underline">
                Page Facebook de la coopérative
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-soil-100 bg-paper p-8 shadow-lg shadow-leaf-900/5">
            <h2 className="font-display text-2xl font-semibold text-leaf-900">Envoyer un message</h2>
            <p className="mb-6 mt-1 text-sm text-ink-soft">
              Tous les champs sont nécessaires. Votre message est envoyé directement à la
              coopérative.
            </p>
            <ContactForm />
          </div>
        </div>
      </Section>
      <Section className="bg-paper pt-0">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Nous trouver" title="Quartier Gassi, N'Djaména" />
          <div className="mt-6 overflow-hidden rounded-3xl border border-soil-100 shadow-xl shadow-leaf-900/10">
            <iframe
              title="Carte Google Maps : emplacement de la COOP-DCVA, quartier Gassi, N'Djaména"
              src={`https://www.google.com/maps?q=${encodeURIComponent(lieu)}&hl=fr&z=14&output=embed`}
              className="h-[26rem] w-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lieu)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-semibold text-leaf-700 hover:underline"
            >
              Ouvrir dans Google Maps →
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(lieu)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-semibold text-leaf-700 hover:underline"
            >
              Itinéraire →
            </a>
          </p>
          <p className="text-xs text-ink-soft">
            Emplacement approximatif (quartier Gassi) en attendant la position exacte du site.
          </p>
        </div>
      </Section>
    </>
  );
}
