import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import {
  ButtonLink,
  FiliereIcon,
  PageHero,
  ProduitCard,
  Section,
  SectionTitle,
} from "@/components/ui";
import { filieres, produits, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Nos filières et produits",
  description:
    "Huiles végétales (savonnier, neem, ricin, citron), karité, spiruline du lac Tchad, tubercule de rônier, néré, patate douce et tomate, céréales, arachide et formation : les filières et produits de la COOP-DCVA.",
  path: "/filieres",
});

export default function FilieresPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos filières"
        title="Des ressources du Tchad, transformées à Gassi"
        intro={`${filieres.length} filières, de l'huile du savonnier à la spiruline du lac Tchad : nos membres transforment les productions du pays en produits sains, utiles et fabriqués au Tchad.`}
      />

      {/* Sommaire */}
      <nav aria-label="Filières" className="sticky top-[4.5rem] z-30 border-b border-soil-100 bg-cream/95 backdrop-blur">
        <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none]">
          {filieres.map((f) => (
            <li key={f.id} className="shrink-0">
              <a
                href={`#${f.id}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-soil-100 bg-paper px-4 text-sm font-semibold text-ink hover:border-leaf-500 hover:text-leaf-700"
              >
                <FiliereIcon id={f.id} className="h-5 w-5 text-leaf-700" />
                {f.title}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a
              href="#produits"
              className="inline-flex min-h-11 items-center rounded-full bg-leaf-700 px-4 text-sm font-semibold text-white hover:bg-leaf-600"
            >
              Nos produits
            </a>
          </li>
        </ul>
      </nav>

      {/* Une section par filière */}
      <div>
        {filieres.map((f, i) => (
          <section
            key={f.id}
            id={f.id}
            aria-labelledby={`${f.id}-titre`}
            className={`scroll-mt-36 px-5 py-14 sm:py-16 ${i % 2 ? "bg-paper" : ""}`}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
              <div className={i % 2 ? "lg:order-2" : ""}>
                {f.photo ? (
                  <div className="overflow-hidden rounded-[2rem] bg-leaf-900 shadow-xl shadow-leaf-900/10">
                    <Image
                      src={f.photo.src}
                      alt={f.photo.alt}
                      width={f.photo.width}
                      height={f.photo.height}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className={`h-auto w-full object-cover ${
                        f.photo.height > f.photo.width ? "mx-auto aspect-[4/5] lg:max-h-[36rem]" : "aspect-[4/3]"
                      }`}
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center rounded-[2rem] bg-soil-100 text-soil-700">
                    <FiliereIcon id={f.id} className="h-28 w-28" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-sesame-700">
                  Filière {String(i + 1).padStart(2, "0")}
                </p>
                <h2 id={`${f.id}-titre`} className="font-display mt-2 text-3xl font-semibold leading-tight text-leaf-900 sm:text-4xl">
                  {f.title}
                </h2>
                <p className="mt-2 font-semibold text-soil-700">{f.tagline}</p>
                <p className="mt-4 leading-relaxed text-ink-soft">{f.description}</p>
                <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-sesame-700">Produits et activités</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {f.products.map((p) => (
                    <li key={p} className="inline-flex items-center gap-2 rounded-full border border-soil-100 bg-cream px-3 py-1.5 text-sm text-ink">
                      <span className="h-2 w-2 rounded-full bg-leaf-500" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Produits */}
      <Section className="scroll-mt-28 bg-leaf-50" >
        <div id="produits" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Nos produits"
            title="Fabriqués au Tchad par nos membres"
            intro="Quelques produits de la coopérative et de ses membres. Pour connaître les prix, les quantités et les disponibilités, écrivez-nous directement sur WhatsApp."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {produits.map((p) => (
              <li key={p.nom}>
                <ProduitCard p={p} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="De la graine au produit" title="Une chaîne de valeur maîtrisée à Gassi" align="center" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Production et collecte", x: "Graines, amandes, tubercules, spiruline et légumes du pays." },
            { t: "Transformation", x: "Moulins, presse et mini presse à huile, déshydrateur alimentaire." },
            { t: "Conditionnement", x: "Pots, flacons et sachets étiquetés, fabriqués au Tchad." },
            { t: "Vente et formation", x: "Commercialisation par les membres, qui se forment en continu." },
          ].map((e, i) => (
            <li key={e.t} className="rounded-3xl border border-soil-100 bg-paper p-6">
              <span className="font-display text-4xl font-semibold text-sesame-700">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-2 text-lg font-semibold text-leaf-900">{e.t}</h3>
              <p className="mt-1 text-sm text-ink-soft">{e.x}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="grain bg-leaf-700 px-5 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Commander ou devenir revendeur ?</h2>
          <p className="mt-4 text-leaf-100">
            Précisez le produit et la quantité souhaitée : nous revenons vers vous avec les prix et les disponibilités.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href={whatsappHref} external>
              <WhatsAppIcon className="h-5 w-5" />
              Écrire sur WhatsApp
            </ButtonLink>
            <ButtonLink href={site.phoneHref} external variant="ghost">
              Appeler le {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
