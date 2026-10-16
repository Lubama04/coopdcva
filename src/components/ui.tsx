import Link from "next/link";
import type { ReactNode } from "react";
import { statutLabel, type Filiere, type Projet } from "@/lib/site";

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
    <section className={`px-5 py-16 sm:py-20 ${className}`}>
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
        <h1 className="rise rise-2 font-display mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
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
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
}) {
  const styles = {
    primary: "bg-sesame-500 text-ink hover:bg-sesame-300",
    secondary: "bg-leaf-700 text-white hover:bg-leaf-600",
    ghost: "border border-white/60 text-white hover:bg-white/10",
  }[variant];
  const cls = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${styles}`;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
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
  // Pictogrammes simples, dessinés pour la maquette.
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
    </svg>
  );
}

export function FiliereCard({ f, detailed = false }: { f: Filiere; detailed?: boolean }) {
  const t = toneStyles[f.tone];
  return (
    <article
      id={f.id}
      className="group flex h-full flex-col rounded-3xl border border-soil-100 bg-paper p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-leaf-900/10"
    >
      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${t.bg} ${t.fg}`}>
        <FiliereIcon id={f.id} className="h-9 w-9" />
      </div>
      <h3 className="font-display mt-5 text-2xl font-semibold text-leaf-900">{f.title}</h3>
      <p className={`mt-1 text-sm font-semibold ${t.fg}`}>{f.tagline}</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{f.description}</p>
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
    </article>
  );
}

/** Emplacement de photo : à remplacer par les vraies photos de la coopérative. */
export function PhotoSlot({
  label,
  hint,
  tone = "green",
  className = "",
}: {
  label: string;
  hint: string;
  tone?: Filiere["tone"];
  className?: string;
}) {
  const t = toneStyles[tone];
  return (
    <figure
      className={`relative flex min-h-48 flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-soil-500/30 ${t.bg} p-6 text-center ${className}`}
    >
      <svg viewBox="0 0 48 48" className={`h-10 w-10 ${t.fg}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="6" y="11" width="36" height="28" rx="5" />
        <circle cx="18" cy="23" r="4" />
        <path d="M6 35l11-9 8 7 7-5 10 8" />
      </svg>
      <figcaption className="mt-3">
        <span className={`block text-sm font-semibold ${t.fg}`}>{label}</span>
        <span className="mt-1 block text-xs text-ink-soft">Photo à insérer : {hint}</span>
      </figcaption>
    </figure>
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
