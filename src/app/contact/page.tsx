import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter la COOP-DCVA : quartier Gassi, N'Djaména. Téléphone, e-mail et formulaire de contact.",
};

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
            <div className="rounded-3xl border border-soil-100 bg-paper p-6">
              <h2 className="font-display text-xl font-semibold text-leaf-900">Adresse</h2>
              <p className="mt-2 text-ink-soft">{site.addressDetail}, Tchad</p>
            </div>
            <div className="rounded-3xl border border-soil-100 bg-paper p-6">
              <h2 className="font-display text-xl font-semibold text-leaf-900">Téléphone</h2>
              <ul className="mt-2 space-y-1">
                {site.phones.map((ph) => (
                  <li key={ph.href}>
                    <a href={ph.href} className="text-lg font-semibold text-leaf-700 hover:underline">
                      {ph.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-soil-100 bg-paper p-6">
              <h2 className="font-display text-xl font-semibold text-leaf-900">E-mail</h2>
              <a href={`mailto:${site.email}`} className="mt-2 block break-all text-lg font-semibold text-leaf-700 hover:underline">
                {site.email}
              </a>
            </div>
            <div className="rounded-3xl border border-soil-100 bg-paper p-6">
              <h2 className="font-display text-xl font-semibold text-leaf-900">Réseaux</h2>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="mt-2 block font-semibold text-leaf-700 hover:underline">
                Page Facebook de la coopérative
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-soil-100 bg-paper p-8 shadow-lg shadow-leaf-900/5">
            <h2 className="font-display text-2xl font-semibold text-leaf-900">Envoyer un message</h2>
            <p className="mb-6 mt-1 text-sm text-ink-soft">Tous les champs sont nécessaires.</p>
            <ContactForm />
          </div>
        </div>
      </Section>
      <Section className="bg-paper pt-0">
        <div className="mx-auto max-w-3xl">
          <Image
            src="/images/banniere.png"
            alt="Fiche officielle de la COOP-DCVA avec ses axes d'intervention, ses numéros de téléphone et son adresse à Gassi"
            width={1080}
            height={648}
            className="h-auto w-full rounded-3xl shadow-xl shadow-leaf-900/10"
          />
        </div>
      </Section>
    </>
  );
}
