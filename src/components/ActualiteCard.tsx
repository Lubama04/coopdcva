import Image from "next/image";
import Link from "next/link";
import { dateLongue, type Actualite } from "@/lib/site";

export function ActualiteMeta({ a, light = false }: { a: Actualite; light?: boolean }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.18em] ${
        light ? "text-sesame-300" : "text-sesame-700"
      }`}
    >
      <span>{a.categorie}</span>
      {a.date && (
        <>
          <span aria-hidden="true">·</span>
          <time dateTime={a.date} className="normal-case tracking-normal">
            {dateLongue(a.date)}
          </time>
        </>
      )}
    </p>
  );
}

/** News card; `une` = featured layout (large, side by side on desktop). */
export function ActualiteCard({ a, une = false }: { a: Actualite; une?: boolean }) {
  return (
    <article
      className={`group relative flex h-full overflow-hidden rounded-3xl border border-soil-100 bg-paper transition-shadow hover:shadow-xl hover:shadow-leaf-900/10 ${
        une ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      <div className={`overflow-hidden bg-leaf-900 ${une ? "lg:w-3/5" : ""}`}>
        <Image
          src={a.photo.src}
          alt={a.photo.alt}
          width={a.photo.width}
          height={a.photo.height}
          sizes={une ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          loading={une ? "eager" : "lazy"}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            une ? "aspect-[4/3] lg:aspect-auto" : "aspect-[16/10]"
          }`}
        />
      </div>
      <div className={`flex flex-1 flex-col p-6 ${une ? "lg:justify-center lg:p-10" : ""}`}>
        <ActualiteMeta a={a} />
        <h3
          className={`font-display mt-3 font-semibold leading-snug text-leaf-900 ${
            une ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          <Link href={`/actualites/${a.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">
            {a.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{a.resume}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-leaf-700">
          Lire l&apos;actualité
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </article>
  );
}
