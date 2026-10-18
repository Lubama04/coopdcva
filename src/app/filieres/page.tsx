import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import {
  ButtonLink,
  FiliereCard,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { filieres, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Nos filières",
  description:
    "Céréales, oléagineux, arachide, spiruline du lac Tchad et formation : les cinq filières actives de la COOP-DCVA.",
  path: "/filieres",
});

export default function FilieresPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos filières"
        title="Cinq filières, un même savoir-faire local"
        intro="De la mouture du maïs à la spiruline du lac Tchad, nos membres transforment des ressources du pays en produits utiles et durables."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {filieres.map((f) => (
            <FiliereCard key={f.id} f={f} detailed />
          ))}
        </div>
      </Section>

      <Section className="bg-leaf-50">
        <SectionTitle eyebrow="De la graine au produit" title="Une chaîne de valeur maîtrisée à Gassi" align="center" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Approvisionnement local", x: "Céréales, graines et spiruline du pays." },
            { t: "Transformation", x: "Moulins, presse à huile, déshydrateur alimentaire." },
            { t: "Séchage et conditionnement", x: "Conservation dans de bonnes conditions d'hygiène." },
            { t: "Vente et formation", x: "Commercialisation par les membres, qui se forment." },
          ].map((e, i) => (
            <li key={e.t} className="rounded-3xl bg-paper p-6">
              <span className="font-display text-4xl font-semibold text-sesame-700">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-2 text-lg font-semibold text-leaf-900">{e.t}</h3>
              <p className="mt-1 text-sm text-ink-soft">{e.x}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-paper">
        <SectionTitle
          eyebrow="Acheter, goûter, s'informer"
          title="Vous souhaitez nos produits ou une formation ?"
          intro="Écrivez-nous en précisant la filière et les quantités souhaitées. Nous revenons vers vous avec les disponibilités."
        />
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="secondary">
            Faire une demande
          </ButtonLink>
          <ButtonLink href={site.phoneHref} external variant="secondary">
            Appeler {site.phone}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
