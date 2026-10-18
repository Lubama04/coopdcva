import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, Section, SectionTitle, StatusBadge } from "@/components/ui";
import { getProjet, projets, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projets.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projet = getProjet(slug);
  if (!projet) return { title: "Projet introuvable" };
  return pageMetadata({ title: projet.title, description: projet.summary, path: `/projets/${projet.slug}` });
}

export default async function ProjetPage({ params }: Props) {
  const { slug } = await params;
  const projet = getProjet(slug);
  if (!projet) notFound();

  const autres = projets.filter((p) => p.slug !== projet.slug);

  return (
    <>
      <div className="grain relative overflow-hidden bg-leaf-700 px-5 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Link href="/projets" className="text-sm font-semibold text-sesame-300 hover:underline">
            ← Tous les projets
          </Link>
          <div className="mt-5">
            <StatusBadge statut={projet.statut} />
          </div>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            {projet.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-leaf-100">{projet.subtitle}</p>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <SectionTitle eyebrow="Le projet" title="De quoi s'agit-il ?" />
            <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
              {projet.description.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <h2 className="font-display mt-10 text-2xl font-semibold text-leaf-900">Objectifs</h2>
            <ul className="mt-4 space-y-3">
              {projet.objectifs.map((o) => (
                <li key={o} className="flex gap-3 text-ink">
                  <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-leaf-500" />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <aside aria-label="Fiche du projet" className="h-fit rounded-3xl border border-soil-100 bg-paper p-7">
            <h2 className="font-display text-xl font-semibold text-leaf-900">En bref</h2>
            <dl className="mt-4 divide-y divide-soil-100">
              {projet.details.map((d) => (
                <div key={d.label} className="py-3">
                  <dt className="text-xs font-semibold uppercase tracking-widest text-sesame-700">{d.label}</dt>
                  <dd className="font-display mt-1 text-lg font-semibold text-leaf-700">{d.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      {projet.partenariats && (
        <Section className="bg-paper">
          <SectionTitle
            eyebrow="Devenir partenaire"
            title="Trois façons de rejoindre le projet"
            intro="Chaque contribution compte, quelle que soit sa forme."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {projet.partenariats.map((p, i) => (
              <li key={p.title} className="rounded-3xl border border-soil-100 bg-cream p-7">
                <span className="font-display text-4xl font-semibold text-sesame-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-xl font-semibold text-leaf-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-soft">
            Une note de présentation détaillée est disponible sur demande auprès de la coopérative
            (présidente : {site.president}).
          </p>
        </Section>
      )}

      <Section>
        <SectionTitle eyebrow="À découvrir aussi" title="Les autres projets" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {autres.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projets/${p.slug}`}
                className="block h-full rounded-2xl border border-soil-100 bg-paper p-5 transition-colors hover:border-leaf-500"
              >
                <StatusBadge statut={p.statut} />
                <span className="font-display mt-3 block text-lg font-semibold text-leaf-900">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="grain bg-leaf-700 px-5 py-14 text-center text-white">
        <h2 className="font-display text-3xl font-semibold">Un projet vous intéresse ?</h2>
        <div className="mt-6 flex justify-center">
          <ButtonLink href="/contact">Écrire à la coopérative</ButtonLink>
        </div>
      </section>
    </>
  );
}
