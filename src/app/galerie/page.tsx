import type { Metadata } from "next";
import { ButtonLink, PageHero, PhotoSlot, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Galerie",
  description: "La vie de la COOP-DCVA en images : production, produits, formations et membres.",
};

const slots = [
  { label: "Le moulin à farine", hint: "mouture du maïs ou du sorgho", tone: "gold", span: "sm:col-span-2" },
  { label: "La presse à huile", hint: "pressage du sésame", tone: "brown", span: "" },
  { label: "Les produits", hint: "huiles et farines conditionnées", tone: "clay", span: "" },
  { label: "La spiruline (dihé)", hint: "séchage ou conditionnement", tone: "teal", span: "" },
  { label: "Séance de formation", hint: "la formatrice avec les membres", tone: "green", span: "sm:col-span-2" },
  { label: "Le site de Gassi", hint: "vue du site de production", tone: "brown", span: "" },
] as const;

export default function GaleriePage() {
  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="La coopérative en images"
        intro="Production, produits et formations : les photos et vidéos de la coopérative prendront place ici."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-3">
          {slots.map((s) => (
            <PhotoSlot key={s.label} label={s.label} hint={s.hint} tone={s.tone} className={`min-h-64 ${s.span}`} />
          ))}
        </div>
        <div className="mt-12 rounded-3xl border border-soil-100 bg-paper p-8 text-center">
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
