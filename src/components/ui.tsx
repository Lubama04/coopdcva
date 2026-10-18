import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  activites,
  commanderHref,
  filieres,
  membres,
  partenaires,
  soutiens,
  statutLabel,
  type Filiere,
  type Organisation,
  type Produit,
  type Projet,
} from "@/lib/site";

export function SectionTitle({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${
            light ? "text-sesame-300" : "text-sesame-700"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display mt-3 text-3xl font-semibold leading-tight sm:text-4xl ${
          light ? "text-white" : "text-leaf-900"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-leaf-100/90" : "text-ink-soft"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`cv-auto px-5 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="grain relative overflow-hidden bg-leaf-700 px-5 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="rise text-xs font-semibold uppercase tracking-[0.22em] text-sesame-300">
          {eyebrow}
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h1>
        <p className="rise rise-3 mt-5 max-w-2xl text-lg leading-relaxed text-leaf-100">{intro}</p>
      </div>
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  external?: boolean;
}) {
  const styles = {
    primary: "bg-sesame-500 text-ink hover:bg-sesame-300",
    secondary: "bg-leaf-700 text-white hover:bg-leaf-600",
    outline: "border-2 border-leaf-700 text-leaf-700 hover:bg-leaf-50",
    ghost: "border border-white/60 text-white hover:bg-white/10",
  }[variant];
  const cls = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${styles}`;
  const newTab = /^https?:/.test(href);
  return external ? (
    <a
      href={href}
      className={cls}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

const toneStyles: Record<Filiere["tone"], { bg: string; fg: string; chip: string }> = {
  gold: { bg: "bg-sesame-300/30", fg: "text-sesame-700", chip: "bg-sesame-500" },
  brown: { bg: "bg-soil-100", fg: "text-soil-700", chip: "bg-soil-500" },
  clay: { bg: "bg-[#f3dccd]", fg: "text-[#8a3f1d]", chip: "bg-[#c2622f]" },
  teal: { bg: "bg-[#d9eee9]", fg: "text-[#0d5f55]", chip: "bg-[#168a7c]" },
  green: { bg: "bg-leaf-100", fg: "text-leaf-700", chip: "bg-leaf-500" },
};

export function FiliereIcon({ id, className = "" }: { id: string; className?: string }) {
  // Simple line pictograms, one per filière.
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {id === "cereales" && (
        <g {...common}>
          <path d="M24 42V12" />
          <path d="M24 16c-5 0-8-3-8-7 5 0 8 3 8 7Zm0 0c5 0 8-3 8-7-5 0-8 3-8 7Z" />
          <path d="M24 26c-5 0-8-3-8-7 5 0 8 3 8 7Zm0 0c5 0 8-3 8-7-5 0-8 3-8 7Z" />
          <path d="M24 36c-5 0-8-3-8-7 5 0 8 3 8 7Zm0 0c5 0 8-3 8-7-5 0-8 3-8 7Z" />
        </g>
      )}
      {id === "oleagineux" && (
        <g {...common}>
          <path d="M24 6c8 9 12 15 12 21a12 12 0 0 1-24 0c0-6 4-12 12-21Z" />
          <path d="M19 28a5 5 0 0 0 5 5" />
        </g>
      )}
      {id === "arachide" && (
        <g {...common}>
          <path d="M17 8c-5 0-8 4-8 9 0 4 2 6 4 8 2 3 1 6 3 9 3 5 11 5 14 0 2-3 1-6 3-9 2-2 4-4 4-8 0-5-3-9-8-9-3 0-5 2-8 2s-5-2-8-2Z" transform="rotate(35 24 24) scale(.8) translate(6 6)" />
          <path d="M20 22h.01M27 28h.01M22 31h.01" />
        </g>
      )}
      {id === "spiruline" && (
        <g {...common}>
          <path d="M8 30c4-8 8-8 12 0s8 8 12 0 6-8 8-4" />
          <path d="M8 38c4-8 8-8 12 0s8 8 12 0 6-8 8-4" />
          <path d="M8 22c4-8 8-8 12 0s8 8 12 0 6-8 8-4" />
        </g>
      )}
      {id === "formation" && (
        <g {...common}>
          <circle cx="24" cy="15" r="6" />
          <path d="M10 40c0-8 6-13 14-13s14 5 14 13" />
          <path d="M34 8l4-3 3 5" />
        </g>
      )}
      {id === "karite" && (
        <g {...common}>
          <ellipse cx="24" cy="30" rx="15" ry="9" />
          <path d="M9 30v4c0 5 7 9 15 9s15-4 15-9v-4" />
          <path d="M24 21c-4-6-1-12 5-15-1 6 1 9-5 15Z" />
        </g>
      )}
      {id === "ronier" && (
        <g {...common}>
          <path d="M24 44V20" />
          <path d="M24 20c-6-6-14-6-18-3M24 20c6-6 14-6 18-3M24 20c-3-8-9-12-15-12M24 20c3-8 9-12 15-12" />
          <path d="M18 44c0-4 3-6 6-6s6 2 6 6" />
        </g>
      )}
      {id === "nere" && (
        <g {...common}>
          <path d="M10 38c4-14 14-24 28-28-2 14-12 24-28 28Z" />
          <circle cx="20" cy="30" r="1.6" />
          <circle cx="26" cy="24" r="1.6" />
          <circle cx="31" cy="18" r="1.6" />
        </g>
      )}
      {id === "patate-tomate" && (
        <g {...common}>
          <circle cx="18" cy="28" r="10" />
          <path d="M18 18c-1-3 1-6 4-7M14 19l4-1 4 1" />
          <path d="M30 22c6-2 11 2 10 8s-7 9-12 7" />
        </g>
      )}
    </svg>
  );
}

export function FiliereCard({ f, detailed = false }: { f: Filiere; detailed?: boolean }) {
  const t = toneStyles[f.tone];
  return (
    <article
      id={f.id}
      className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-soil-100 bg-paper shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-leaf-900/10"
    >
      <div className={`relative aspect-[4/3] overflow-hidden ${t.bg}`}>
        {f.photo ? (
          <Image
            src={f.photo.src}
            alt={f.photo.alt}
            width={f.photo.width}
            height={f.photo.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-full items-center justify-center ${t.fg}`}>
            <FiliereIcon id={f.id} className="h-20 w-20 opacity-80" />
          </div>
        )}
        <span
          className={`absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl bg-paper/95 shadow-md ${t.fg}`}
          aria-hidden="true"
        >
          <FiliereIcon id={f.id} className="h-7 w-7" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-semibold text-leaf-900">{f.title}</h3>
        <p className={`mt-1 text-sm font-semibold ${t.fg}`}>{f.tagline}</p>
        {detailed && <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{f.description}</p>}
        {detailed && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {f.products.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-ink">
                <span className={`h-2 w-2 rounded-full ${t.chip}`} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

/** Fiche produit : photo, libellé de l'étiquette et demande de prix par WhatsApp. */
export function ProduitCard({ p }: { p: Produit }) {
  const f = filieres.find((x) => x.id === p.filiere);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-soil-100 bg-paper">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f1efea]">
        <Image
          src={p.photo.src}
          alt={p.photo.alt}
          width={p.photo.width}
          height={p.photo.height}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {f && (
          <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-3 py-1 text-xs font-semibold text-leaf-700 shadow-sm">
            {f.title}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold leading-snug text-leaf-900">{p.nom}</h3>
        <p className="mt-1 flex-1 text-sm text-ink-soft">{p.detail}</p>
        <a
          href={commanderHref(p.nom)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1f7a43] px-4 text-sm font-semibold text-white transition-colors hover:bg-leaf-700"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.97L2 22l5.16-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.06.89.9-2.98-.2-.31a8.2 8.2 0 1 1 6.84 3.73Z" />
          </svg>
          Prix et disponibilité
          <span className="sr-only"> pour {p.nom} sur WhatsApp</span>
        </a>
      </div>
    </article>
  );
}

export function StatusBadge({ statut }: { statut: Projet["statut"] }) {
  const upcoming = statut === "a-venir";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
        upcoming ? "bg-sesame-300/60 text-sesame-700" : "bg-leaf-100 text-leaf-700"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${upcoming ? "bg-sesame-500" : "bg-leaf-500"}`}
      />
      {statutLabel[statut]}
    </span>
  );
}

export function ProjetCard({ p }: { p: Projet }) {
  const t = toneStyles[p.tone];
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-soil-100 bg-paper p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-leaf-900/10">
      <div className={`absolute inset-x-0 top-0 h-1.5 rounded-t-3xl ${t.chip}`} aria-hidden="true" />
      <StatusBadge statut={p.statut} />
      <h3 className="font-display mt-4 text-2xl font-semibold text-leaf-900">
        <Link
          href={`/projets/${p.slug}`}
          className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-offset-4"
        >
          {p.title}
        </Link>
      </h3>
      <p className={`mt-1 text-sm font-semibold ${t.fg}`}>{p.subtitle}</p>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{p.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-leaf-700">
        Voir le projet
        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </article>
  );
}

/** Les cinq activités du dépliant officiel, en mosaïque de photos. */
export function ActivitesGrid() {
  return (
    <ul className="mt-10 grid auto-rows-[minmax(11rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {activites.map((a, i) => {
        const span = ["lg:col-span-3 lg:row-span-2", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3"][i];
        return (
          <li
            key={a.id}
            className={`group relative overflow-hidden rounded-3xl bg-leaf-900 ${span ?? "lg:col-span-2"}`}
          >
            <div className={`grid h-full ${a.photos.length > 1 ? "grid-cols-2 gap-px" : ""}`}>
              {a.photos.map((ph) => (
                <Image
                  key={ph.src}
                  src={ph.src}
                  alt={ph.alt}
                  width={ph.width}
                  height={ph.height}
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full min-h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-leaf-900/95 via-leaf-900/60 to-transparent px-5 pb-4 pt-16">
              <span className="font-display text-sm font-semibold text-sesame-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
                {a.title}
              </h3>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function LogoTile({ o }: { o: Organisation }) {
  return (
    <li className="flex flex-col items-center gap-3 rounded-2xl border border-soil-100 bg-white p-4 text-center">
      <span className="flex h-20 w-full items-center justify-center">
        <Image
          src={o.logo}
          alt={`Logo : ${o.name}`}
          width={o.width}
          height={o.height}
          sizes="160px"
          className="logo-muted max-h-20 w-auto object-contain"
        />
      </span>
      <span className="text-xs font-semibold leading-snug text-ink">{o.name}</span>
      {o.note && <span className="-mt-2 text-xs text-ink-soft">{o.note}</span>}
    </li>
  );
}

/** Membres, partenaires et financements, tels qu'imprimés sur le dépliant officiel. */
export function Reseau() {
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.35fr]">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-sesame-700">Membres</h3>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {membres.map((o) => (
            <LogoTile key={o.name} o={o} />
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-sesame-700">Partenaires</h3>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {partenaires.map((o) => (
            <LogoTile key={o.name} o={o} />
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-soft">
          Financement obtenu :{" "}
          {soutiens.map((s) => (
            <strong key={s.name} className="font-semibold text-leaf-700">
              {s.name}
            </strong>
          ))}
          .
        </p>
      </div>
    </div>
  );
}
