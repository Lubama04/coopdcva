import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProduitsExplorer } from "@/components/ProduitsExplorer";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { ButtonLink, PageHero, Section } from "@/components/ui";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Nos produits",
  description:
    "Beurre de karité carotte, huiles du savonnier, de neem, de ricin et de citron, spiruline Diyé du Tchad, Poudre de Djabra, Ndii Dawdawa : les produits de la COOP-DCVA, fabriqués au Tchad.",
  path: "/produits",
});

export default function ProduitsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos produits"
        title="Fabriqués au Tchad par nos membres"
        intro="Huiles végétales, karité, spiruline, rônier, néré : choisissez une filière pour voir ses produits. Prix et disponibilités sur simple message WhatsApp."
      />
      <Section>
        <ProduitsExplorer />
      </Section>
      <section className="grain bg-leaf-700 px-5 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Commander ou devenir revendeur ?</h2>
          <p className="mt-4 text-leaf-100">
            Précisez le produit et la quantité souhaitée : nous revenons vers vous avec les prix et les disponibilités.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href={whatsappHref} external>
              <WhatsAppIcon className="h-5 w-5" />
              Écrire sur WhatsApp
            </ButtonLink>
            <ButtonLink href={site.phoneHref} external variant="ghost">
              Appeler le {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
