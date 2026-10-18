import type { Metadata } from "next";
import { GalerieExplorer } from "@/components/GalerieExplorer";
import { ButtonLink, PageHero, Section, SectionTitle } from "@/components/ui";
import { site, videoDeshydrateur as video } from "@/lib/site";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "La vie de la COOP-DCVA en images et en vidéo : moulins, patate douce, tomate et membres au travail à Gassi.",
};

export default function GaleriePage() {
  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="La coopérative en images"
        intro="Les moulins, la patate douce, la tomate et celles qui les transforment : un aperçu du travail mené chaque jour à Gassi."
      />

      <Section>
        <GalerieExplorer />
      </Section>

      <Section className="bg-paper">
        <div className="grid items-center gap-10 lg:grid-cols-[0.6fr_1fr]">
          <video
            controls
            playsInline
            preload="metadata"
            poster={video.poster}
            className="mx-auto h-[32rem] w-auto max-w-full rounded-3xl bg-black shadow-xl shadow-leaf-900/15"
          >
            <source src={video.src} type="video/mp4" />
            Votre navigateur ne peut pas lire cette vidéo.
          </video>
          <div>
            <SectionTitle eyebrow="En vidéo" title={video.title} intro={video.caption} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-soil-100 bg-paper p-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-leaf-900">Suivez-nous sur Facebook</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            Les actualités de la coopérative sont publiées sur notre page.
          </p>
          <div className="mt-5">
            <ButtonLink href={site.facebook} external variant="secondary">
              Ouvrir la page Facebook
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
