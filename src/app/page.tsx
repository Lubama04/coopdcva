import Image from "next/image";
import Link from "next/link";
import {
  ActivitesGrid,
  ButtonLink,
  FiliereCard,
  ProduitCard,
  ProjetCard,
  Reseau,
  Section,
  SectionTitle,
} from "@/components/ui";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import {
  chiffres,
  equipements,
  galerie,
  filieres,
  produits,
  projets,
  site,
  valeurs,
  whatsappHref,
} from "@/lib/site";

/** Bande « En images » : un moulin avec des membres, la patate douce, une huile, la spiruline. */
const enImages = [
  "/images/galerie/depeliculer-1.jpg",
  "/images/galerie/transformation-patate-douce.jpg",
  "/images/galerie/huile-savonnier.jpg",
  "/images/galerie/spiruline-dihe-du-tchad.jpg",
].map((src) => galerie.find((p) => p.src === src)!);

const conference = galerie.find((p) => p.src.endsWith("conference-karite.jpg"));

const heroPhotos = {
  a: galerie.find((p) => p.src.endsWith("tomate-en-transformation.jpg"))!,
  b: galerie.find((p) => p.src.endsWith("beurre-karite-carotte.jpg"))!,
};

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
            <h1 className="font-display mt-4 text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Qui ne se plante pas
              <br />
              <span className="italic text-sesame-300">ne pousse jamais.</span>
            </h1>
            <p className="rise rise-3 mt-6 max-w-xl text-lg leading-relaxed text-leaf-100">
              Production, transformation, formation et accompagnement : nous valorisons ce que
              le Tchad produit, avec et pour les femmes, en particulier celles qui vivent avec
              un handicap.
            </p>
            <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/filieres">Découvrir nos filières</ButtonLink>
              <ButtonLink href="/projets" variant="ghost">
                Nos projets
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md">
            <div className="absolute inset-0 rounded-full bg-leaf-600/60" />
            <div className="absolute inset-6 rounded-full bg-paper shadow-2xl shadow-leaf-900/40" />
            <Image
              src="/images/embleme.svg"
              alt="Emblème de la COOP-DCVA : une pousse entre deux mains au-dessus d'une terre cultivée"
              width={193}
              height={322}
              loading="eager"
              className="sway absolute left-1/2 top-1/2 h-[60%] w-auto -translate-x-1/2 -translate-y-1/2"
            />
            <figure className="absolute -left-2 bottom-2 w-[34%] -rotate-6 overflow-hidden rounded-2xl border-4 border-paper shadow-xl shadow-leaf-900/40 sm:-left-6">
              <Image
                src={heroPhotos.a.src}
                alt={heroPhotos.a.alt}
                width={heroPhotos.a.width}
                height={heroPhotos.a.height}
                sizes="160px"
                loading="eager"
                className="aspect-[3/4] h-auto w-full object-cover"
              />
            </figure>
            <figure className="absolute -right-2 top-4 w-[34%] rotate-6 overflow-hidden rounded-2xl border-4 border-paper shadow-xl shadow-leaf-900/40 sm:-right-6">
              <Image
                src={heroPhotos.b.src}
                alt={heroPhotos.b.alt}
                width={heroPhotos.b.width}
                height={heroPhotos.b.height}
                sizes="160px"
                loading="eager"
                className="aspect-square h-auto w-full object-cover"
              />
            </figure>
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
          <figure className="relative mx-auto w-full max-w-lg rounded-[2rem] bg-soil-700 p-8 text-white shadow-xl shadow-leaf-900/15 sm:p-10">
            <span aria-hidden="true" className="font-display absolute -top-6 left-8 text-8xl leading-none text-sesame-300">
              “
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sesame-300">Nos objectifs</p>
            <blockquote className="font-display mt-4 text-xl leading-relaxed sm:text-2xl">
              La promotion des actions féminines, la protection et l&apos;autonomisation des
              femmes marginalisées de manière générale et des femmes vivant avec des handicaps de
              manière particulière.
            </blockquote>
            <figcaption className="mt-6 text-sm text-soil-100/90">Dépliant officiel de la coopérative</figcaption>
          </figure>
        </div>
      </Section>

      {/* ACTIVITÉS (dépliant officiel) */}
      <Section className="bg-paper">
        <SectionTitle
          eyebrow="Nos activités"
          title="De la production au marché, cinq domaines d'action"
          intro="Les activités de la coopérative, telles que présentées dans son dépliant officiel."
        />
        <ActivitesGrid />
      </Section>

      {/* FILIÈRES */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Nos filières"
            title={`${filieres.length} filières, de la graine au produit fini`}
            intro="Huiles végétales, karité, spiruline, rônier, néré, patate douce et tomate, céréales, arachide et formation."
          />
          <ButtonLink href="/filieres" variant="secondary">
            Toutes les filières
          </ButtonLink>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filieres.map((f) => (
            <li key={f.id}>
              <Link href={`/filieres#${f.id}`} className="block h-full rounded-3xl">
                <FiliereCard f={f} />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* PRODUITS */}
      <Section className="bg-leaf-50">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Nos produits"
            title="Fabriqués au Tchad, prêts à commander"
            intro="Prix et disponibilités sur simple message WhatsApp."
          />
          <ButtonLink href="/filieres#produits" variant="secondary">
            Tous les produits
          </ButtonLink>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {produits.slice(0, 4).map((p) => (
            <li key={p.nom}>
              <ProduitCard p={p} />
            </li>
          ))}
        </ul>
      </Section>

      {/* TEMPS FORT */}
      {conference && (
        <section className="px-5 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[2rem] bg-soil-700 text-white lg:grid-cols-[1.1fr_0.9fr]">
            <Image
              src={conference.src}
              alt={conference.alt}
              width={conference.width}
              height={conference.height}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-full max-h-[30rem] w-full object-cover"
            />
            <div className="px-7 pb-10 lg:py-10 lg:pr-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sesame-300">Temps fort</p>
              <h2 className="font-display mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                La coopérative à la conférence sur la valorisation du beurre de karité du Tchad
              </h2>
              <p className="mt-4 leading-relaxed text-soil-100/90">
                Nos membres y ont présenté le beurre de karité produit par la coopérative.
              </p>
              <div className="mt-7">
                <ButtonLink href="/filieres#karite">Découvrir la filière karité</ButtonLink>
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* EN IMAGES */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle eyebrow="En images" title="La coopérative au travail" />
            <ButtonLink href="/galerie" variant="secondary">
              Voir la galerie
            </ButtonLink>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {enImages.map((p) => (
              <li key={p.src}>
                <Link
                  href="/galerie"
                  className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-leaf-900"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-leaf-900/90 via-leaf-900/50 to-transparent px-4 pb-3 pt-12 text-sm font-semibold leading-snug text-white">
                    {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
              <span className="font-display text-4xl font-semibold text-sesame-700">
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

      {/* RÉSEAU : membres, partenaires, financement */}
      <Section>
        <SectionTitle
          eyebrow="Notre réseau"
          title="Membres, partenaires et soutiens"
          intro="Les organisations qui font partie de la coopérative ou qui travaillent à ses côtés."
        />
        <Reseau />
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
            <ButtonLink href={whatsappHref} variant="ghost" external>
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="ghost" external>
              {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
