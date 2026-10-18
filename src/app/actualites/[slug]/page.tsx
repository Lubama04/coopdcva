import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { baseUrl, pageMetadata } from "@/lib/seo";
import { ActualiteCard, ActualiteMeta } from "@/components/ActualiteCard";
import { ButtonLink, Section, SectionTitle } from "@/components/ui";
import { actualites, filieres, getActualite, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return actualites.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getActualite(slug);
  if (!a) return { title: "Actualité introuvable" };
  const meta = pageMetadata({ title: a.title, description: a.resume, path: `/actualites/${a.slug}` });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", images: [{ url: a.photo.src, alt: a.photo.alt }] },
  };
}

export default async function ActualitePage({ params }: Props) {
  const { slug } = await params;
  const a = getActualite(slug);
  if (!a) notFound();

  const filiere = filieres.find((f) => f.id === a.filiere);
  const autres = actualites.filter((x) => x.slug !== a.slug).slice(0, 2);
  const lien = `${baseUrl}/actualites/${a.slug}`;

  return (
    <>
      <article>
        <header className="grain bg-leaf-700 px-5 pb-28 pt-12 text-white sm:pt-16">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/actualites"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-sesame-300 hover:underline"
            >
              ← Toutes les actualités
            </Link>
            <div className="mt-4">
              <ActualiteMeta a={a} light />
            </div>
            <h1 className="font-display mt-3 text-3xl font-semibold leading-tight sm:text-5xl">{a.title}</h1>
          </div>
        </header>
        <div className="px-5">
          <div className="mx-auto -mt-20 max-w-4xl overflow-hidden rounded-[2rem] bg-leaf-900 shadow-2xl shadow-leaf-900/20">
            <Image
              src={a.photo.src}
              alt={a.photo.alt}
              width={a.photo.width}
              height={a.photo.height}
              sizes="(min-width: 1024px) 56rem, 100vw"
              loading="eager"
              fetchPriority="high"
              className="h-auto w-full"
            />
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-5 py-12">
          <p className="font-display text-xl leading-relaxed text-leaf-900 sm:text-2xl">{a.resume}</p>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            {a.contenu.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-soil-100 pt-6">
            {filiere && (
              <ButtonLink href={`/filieres#${filiere.id}`} variant="secondary">
                Découvrir la filière {filiere.title.toLowerCase()}
              </ButtonLink>
            )}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${a.title} — ${lien}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border-2 border-leaf-700 px-5 text-sm font-semibold text-leaf-700 hover:bg-leaf-50"
            >
              Partager sur WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(lien)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border-2 border-leaf-700 px-5 text-sm font-semibold text-leaf-700 hover:bg-leaf-50"
            >
              Partager sur Facebook
            </a>
          </div>
        </div>
      </article>

      {autres.length > 0 && (
        <Section className="bg-paper">
          <SectionTitle eyebrow="À lire aussi" title="Autres actualités" />
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {autres.map((x) => (
              <li key={x.slug}>
                <ActualiteCard a={x} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <section className="grain bg-leaf-700 px-5 py-14 text-center text-white">
        <h2 className="font-display text-3xl font-semibold">Une question, un partenariat ?</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact">Écrire à la coopérative</ButtonLink>
          <ButtonLink href={site.phoneHref} external variant="ghost">
            {site.phone}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
