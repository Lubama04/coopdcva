import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProjetsExplorer } from "@/components/ProjetsExplorer";
import { ButtonLink, PageHero, Section, SectionTitle } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Nos projets",
  description:
    "Les projets de la COOP-DCVA : site de production de Gassi, formation des membres, certification sanitaire et PROVAL-ZD, projet à venir en recherche de partenaires.",
  path: "/projets",
});

export default function ProjetsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos projets"
        title="Ce que nous construisons, et ce qui vient ensuite"
        intro="Des projets en cours sur le site de Gassi, et un grand projet à venir, PROVAL-ZD, qui cherche ses partenaires."
      />
      <Section>
        <ProjetsExplorer />
      </Section>
      <Section className="bg-paper">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionTitle
            eyebrow="Travailler ensemble"
            title="Vous souhaitez soutenir un projet ?"
            intro="Financement, expertise technique ou débouchés commerciaux : chaque contribution compte. Écrivez-nous en précisant le projet qui vous intéresse."
          />
          <div className="flex lg:justify-end">
            <ButtonLink href="/contact" variant="secondary">
              Prendre contact
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
