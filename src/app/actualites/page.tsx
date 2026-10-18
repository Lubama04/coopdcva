import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ActualiteCard } from "@/components/ActualiteCard";
import { ButtonLink, PageHero, Section } from "@/components/ui";
import { actualites, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Actualités",
  description:
    "Les actualités de la COOP-DCVA : événements, formations, nouveaux produits et projets de la coopérative à N'Djaména.",
  path: "/actualites",
});

export default function ActualitesPage() {
  const [une, ...autres] = actualites;
  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title="La vie de la coopérative"
        intro="Événements, formations, nouveaux produits et projets : suivez ce que font la COOP-DCVA et ses membres."
      />
      <Section>
        <h2 className="sr-only">Toutes les actualités</h2>
        {une && <ActualiteCard a={une} une />}
        {autres.length > 0 && (
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {autres.map((a) => (
              <li key={a.slug}>
                <ActualiteCard a={a} />
              </li>
            ))}
          </ul>
        )}
      </Section>
      <Section className="bg-paper">
        <div className="rounded-3xl border border-soil-100 bg-cream p-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-leaf-900">Toute l&apos;actualité, au jour le jour</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            La coopérative publie aussi ses nouvelles sur sa page Facebook.
          </p>
          <div className="mt-5">
            <ButtonLink href={site.facebook} external variant="secondary">
              Suivre la page Facebook
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
