import Image from "next/image";
import { LogoFull } from "@/components/Logo";
import { ButtonLink, FiliereCard, ProjetCard, Section, SectionTitle } from "@/components/ui";
import {
  chiffres,
  equipements,
  filieres,
  projets,
  site,
  soutiens,
  valeurs,
} from "@/lib/site";

export default function Home() {
  const aLaUne = projets.find((p) => p.statut === "a-venir") ?? projets[0];

  return (
    <>
      {/* HÉROS */}
      <section className="grain relative overflow-hidden bg-leaf-700 px-5 pb-20 pt-14 text-white sm:pt-20">
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-12 h-[24rem] w-[24rem] rounded-full border border-white/10"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="rise text-xs font-semibold uppercase tracking-[0.22em] text-sesame-300">
              Coopérative agroalimentaire · N&apos;Djaména, Tchad
            </p>
            <h1 className="rise rise-2 font-display mt-4 text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Qui ne se plante pas
              <br />
              <span className="italic text-sesame-300">ne pousse jamais.</span>
            </h1>
            <p className="rise rise-3 mt-6 max-w-xl text-lg leading-relaxed text-leaf-100">
              Nous transformons les céréales, les graines et la spiruline du Tchad, et nous
              formons les femmes et les jeunes qui font vivre ces filières.
            </p>
            <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/filieres">Découvrir nos filières</ButtonLink>
              <ButtonLink href="/projets" variant="ghost">
                Nos projets
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-0 rounded-full bg-leaf-600/60" />
            <div className="absolute inset-6 rounded-full bg-paper shadow-2xl shadow-leaf-900/40" />
            <Image
              src="/images/embleme.png"
              alt="Emblème de la COOP-DCVA : une pousse entre deux mains au-dessus d'une terre cultivée"
              width={280}
              height={425}
              priority
              className="sway absolute left-1/2 top-1/2 h-[62%] w-auto -translate-x-1/2 -translate-y-1/2"
            />
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
