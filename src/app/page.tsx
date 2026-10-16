import Image from "next/image";
import { LogoFull } from "@/components/Logo";
import { ButtonLink, FiliereCard, ProjetCard, Section, SectionTitle } from "@/components/ui";
import {
  chiffres,
  equipements,
  filieres,
  piliers,
  projets,
  site,
  soutiens,
  valeurs,
} from "@/lib/site";

export default function Home() {
  const aLaUne = projets.find((p) => p.statut === "a-venir") ?? projets[0];

  return (
    <>
      {/* HÉROS : la bannière officielle fond sur le même vert que la page */}
      <section className="relative overflow-hidden bg-[#0f8f38] px-5 pb-16 pt-6 text-white sm:pt-10">
        <div className="mx-auto max-w-[1080px]">
          <Image
            src="/images/banniere-hero.png"
            alt="COOP-DCVA, Coopérative de Production et de Développement des Chaînes de Valeur Agroalimentaires. Qui ne se plante pas ne pousse jamais."
            width={1080}
            height={430}
            priority
            className="rise h-auto w-full"
          />
          <ul className="rise rise-2 mx-auto mt-2 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {piliers.map((p) => (
              <li
                key={p}
                className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-soil-700 shadow-sm sm:text-sm"
              >
                {p}
              </li>
            ))}
          </ul>
          <div className="rise rise-3 mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/filieres">Découvrir nos filières</ButtonLink>
            <ButtonLink href="/projets" variant="ghost">
              Nos projets
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section className="relative -mt-8 px-5">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-soil-100 bg-soil-100 shadow-xl shadow-leaf-900/10 md:grid-cols-4">
          {chiffres.map((c) => (
            <div key={c.label} className="flex flex-col-reverse bg-paper px-6 py-7 text-center">
              <dt className="mt-1 text-sm text-ink-soft">{c.label}</dt>
              <dd className="font-display text-4xl font-semibold text-leaf-700">{c.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* PRÉSENTATION */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Qui sommes-nous"
              title="Une coopérative née pour valoriser ce que le Tchad produit"
              intro={`Créée le ${site.founded}, la COOP-DCVA réunit des femmes transformatrices et vendeuses de N'Djaména. Notre site de production se trouve au quartier Gassi.`}
            />
            <p className="mt-4 leading-relaxed text-ink-soft">
              Nous croyons que les chaînes de valeur locales créent de l&apos;emploi, des revenus
              stables et de la fierté. Notre action vise en priorité l&apos;autonomisation
              économique des femmes, y compris celles qui vivent avec un handicap, et des jeunes.
            </p>
            <div className="mt-7">
              <ButtonLink href="/a-propos" variant="secondary">
                En savoir plus sur nous
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-lg rounded-[2rem] border border-soil-100 bg-white p-6 shadow-xl shadow-leaf-900/10">
            <LogoFull />
          </div>
        </div>
      </Section>

      {/* FILIÈRES */}
      <Section className="bg-paper">
        <SectionTitle
          eyebrow="Nos filières"
          title="Cinq filières actives, de la graine au produit fini"
          intro="Chacune s'appuie sur des ressources du pays et sur le savoir-faire de nos membres."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filieres.map((f) => (
            <FiliereCard key={f.id} f={f} />
          ))}
          <div className="flex flex-col justify-between rounded-3xl bg-leaf-700 p-6 text-white">
            <p className="font-display text-2xl leading-snug">
              Découvrez les produits de chaque filière et nos méthodes de transformation.
            </p>
            <div className="mt-6">
              <ButtonLink href="/filieres">Voir toutes les filières</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* PROJETS */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Nos projets"
            title="Ce que la coopérative mène, et ce qui arrive"
          />
          <ButtonLink href="/projets" variant="secondary">
            Tous les projets
          </ButtonLink>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {[aLaUne, ...projets.filter((p) => p.slug !== aLaUne.slug)].map((p) => (
            <li key={p.slug}>
              <ProjetCard p={p} />
            </li>
          ))}
        </ul>
      </Section>

      {/* VALEURS */}
      <Section className="bg-paper">
        <SectionTitle
          eyebrow="Nos engagements"
          title="Ce qui guide chacune de nos décisions"
          align="center"
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valeurs.map((v, i) => (
            <li key={v.title} className="rounded-3xl border border-soil-100 bg-cream p-6">
              <span className="font-display text-4xl font-semibold text-sesame-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-xl font-semibold text-leaf-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ÉQUIPEMENTS */}
      <section className="grain bg-soil-700 px-5 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            light
            eyebrow="Notre outil de production"
            title="Un site équipé, sécurisé et déjà en activité"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {equipements.map((e) => (
              <li key={e.title} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="font-display text-lg font-semibold">{e.title}</p>
                <p className="mt-1 text-sm text-soil-100/80">{e.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SOUTIENS */}
      <Section>
        <SectionTitle eyebrow="Ils nous soutiennent" title="Un financement déjà obtenu" align="center" />
        <ul className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-4">
          {soutiens.map((s) => (
            <li key={s.name} className="min-w-52 rounded-2xl border border-soil-100 bg-paper px-6 py-5 text-center">
              <p className="font-display text-2xl font-semibold text-leaf-700">{s.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* APPEL À L'ACTION */}
      <section className="grain bg-leaf-700 px-5 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Un achat, un partenariat, une formation ?
          </h2>
          <p className="mt-4 text-leaf-100">Parlons-en. Nous répondons depuis N&apos;Djaména.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">Nous écrire</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="ghost" external>
              {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
