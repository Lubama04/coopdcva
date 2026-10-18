import type { Metadata } from "next";
import Image from "next/image";
import { LogoFull } from "@/components/Logo";
import {
  ButtonLink,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { equipe, equipements, site, soutiens, valeurs } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Histoire, mission, équipe et valeurs de la COOP-DCVA, coopérative agroalimentaire de N'Djaména créée en juillet 2023.",
};

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une coopérative portée par des femmes, ancrée à Gassi"
        intro="La COOP-DCVA transforme les productions locales, forme ses membres et ouvre des débouchés à celles qui en ont le plus besoin."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Notre histoire" title="Du besoin du terrain à la coopérative" />
            <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
              <p>
                {site.fullName} est une coopérative légalement constituée et enregistrée au Tchad.
                Elle a été créée le {site.founded}, avec son siège au quartier Gassi, à N&apos;Djaména.
              </p>
              <p>
                Elle rassemble des femmes transformatrices et vendeuses, qui travaillent ensemble
                pour produire mieux, vendre mieux et se former. Son action a été soutenue par un
                financement de l&apos;USAID.
              </p>
            </div>
          </div>
          <div className="space-y-6">
          <div className="mx-auto max-w-sm rounded-3xl border border-soil-100 bg-white p-5 shadow-lg shadow-leaf-900/5">
            <LogoFull />
          </div>
          <div className="rounded-3xl border border-soil-100 bg-paper p-8">
            <h3 className="font-display text-2xl font-semibold text-leaf-900">Notre mission</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Promouvoir les actions féminines, protéger et autonomiser les femmes marginalisées
              et, en particulier, les femmes vivant avec un handicap, par la production et la
              transformation agroalimentaire.
            </p>
            <p className="font-display mt-6 text-xl italic text-leaf-700">« {site.slogan} »</p>
          </div>
          </div>
        </div>
      </Section>

      <Section className="bg-paper">
        <SectionTitle eyebrow="Nos valeurs" title="Quatre engagements concrets" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {valeurs.map((v) => (
            <li key={v.title} className="flex gap-4 rounded-3xl border border-soil-100 bg-cream p-6">
              <span aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 rounded-full bg-leaf-500" />
              <div>
                <h3 className="font-display text-xl font-semibold text-leaf-900">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{v.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="L'équipe" title="Une petite équipe permanente, des membres engagées" />
            <p className="mt-4 text-ink-soft">
              Direction : <strong className="text-ink">{site.president}</strong>, présidente.
            </p>
            <ul className="mt-6 space-y-4">
              {equipe.map((m) => (
                <li key={m.role} className="rounded-2xl border border-soil-100 bg-paper p-5">
                  <p className="font-display text-lg font-semibold text-leaf-700">{m.role}</p>
                  <p className="mt-1 text-sm text-ink-soft">{m.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <Image
            src="/images/galerie/equipe-moulin.jpg"
            alt="Des membres et l'équipe autour du moulin, au quartier Gassi"
            width={521}
            height={1156}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-96 w-full rounded-3xl object-cover object-top lg:h-full lg:max-h-[34rem]"
          />
        </div>
      </Section>

      <Section className="bg-leaf-50">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Ressources" title="Le matériel dont nous disposons" />
            <ul className="mt-6 space-y-3">
              {equipements.map((e) => (
                <li key={e.title} className="flex items-baseline justify-between gap-4 border-b border-soil-100 pb-3">
                  <span className="font-medium text-ink">{e.title}</span>
                  <span className="text-right text-sm text-ink-soft">{e.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle eyebrow="Reconnaissance" title="Financements et soutiens" />
            <ul className="mt-6 space-y-3">
              {soutiens.map((s) => (
                <li key={s.name} className="rounded-2xl bg-paper p-5">
                  <p className="font-display text-xl font-semibold text-leaf-700">{s.name}</p>
                  <p className="text-sm text-ink-soft">{s.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-2xl border border-sesame-500/40 bg-sesame-300/20 p-4 text-sm text-ink">
              Certification et normes sanitaires : démarche en cours d&apos;obtention.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Nous rejoindre" title="Membre, partenaire ou client : il y a une place pour vous" align="center" />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { t: "Devenir membre", x: "Femmes transformatrices et vendeuses : rejoignez une coopérative qui vous forme et vous équipe." },
            { t: "Devenir partenaire", x: "Financement, expertise ou débouchés : découvrez nos projets et leurs besoins." },
            { t: "Acheter nos produits", x: "Farines, huiles, beurre de karité, spiruline : demandez disponibilités et quantités." },
          ].map((c) => (
            <li key={c.t} className="rounded-3xl border border-soil-100 bg-paper p-7">
              <h3 className="font-display text-xl font-semibold text-leaf-900">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.x}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section className="grain bg-leaf-700 px-5 py-14 text-center text-white">
        <h2 className="font-display text-3xl font-semibold">Rencontrons-nous à Gassi</h2>
        <div className="mt-6 flex justify-center gap-3">
          <ButtonLink href="/contact">Prendre contact</ButtonLink>
        </div>
      </section>
    </>
  );
}
