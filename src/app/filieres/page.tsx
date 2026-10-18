import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FilieresExplorer } from "@/components/FilieresExplorer";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { ButtonLink, PageHero, Section, SectionTitle } from "@/components/ui";
import { filieres, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Nos filières",
  description:
    "Huiles végétales (savonnier, neem, ricin, citron), karité, spiruline du lac Tchad, tubercule de rônier, néré, patate douce et tomate, céréales, arachide et formation : les filières de la COOP-DCVA.",
  path: "/filieres",
});

export default function FilieresPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos filières"
        title="Des ressources du Tchad, transformées à Gassi"
        intro={`${filieres.length} filières, de l'huile du savonnier à la spiruline du lac Tchad : nos membres transforment les productions du pays en produits sains, utiles et fabriqués au Tchad.`}
      />

      <FilieresExplorer />

      <Section className="bg-leaf-50">
        <SectionTitle eyebrow="De la graine au produit" title="Une chaîne de valeur maîtrisée à Gassi" align="center" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Production et collecte", x: "Graines, amandes, tubercules, spiruline et légumes du pays." },
            { t: "Transformation", x: "Moulins, presse et mini presse à huile, déshydrateur alimentaire." },
            { t: "Conditionnement", x: "Pots, flacons et sachets étiquetés, fabriqués au Tchad." },
            { t: "Vente et formation", x: "Commercialisation par les membres, qui se forment en continu." },
          ].map((e, i) => (
            <li key={e.t} className="rounded-3xl border border-soil-100 bg-paper p-6">
              <span className="font-display text-4xl font-semibold text-sesame-700">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-2 text-lg font-semibold text-leaf-900">{e.t}</h3>
              <p className="mt-1 text-sm text-ink-soft">{e.x}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="grain bg-leaf-700 px-5 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Envie de goûter nos produits ?</h2>
          <p className="mt-4 text-leaf-100">Découvrez tout le catalogue de la coopérative, ou écrivez-nous directement.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/produits">Voir nos produits</ButtonLink>
            <ButtonLink href={whatsappHref} external variant="ghost">
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp · {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
