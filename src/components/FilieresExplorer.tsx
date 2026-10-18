"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { filieres, produits } from "@/lib/site";
import { FiliereMenu, TOUTES, useHashSelection } from "./FiliereMenu";
import { FiliereIcon } from "./ui";

/** Filières page: pick one filière in the dropdown and only that one is shown. */
export function FilieresExplorer() {
  const [value, select] = useHashSelection(filieres.map((f) => f.id));
  const listRef = useRef<HTMLDivElement>(null);
  const visibles = value === TOUTES ? filieres : filieres.filter((f) => f.id === value);

  // Opening /filieres#karite: bring the selected filière into view once.
  useEffect(() => {
    if (window.location.hash) listRef.current?.scrollIntoView({ block: "start" });
  }, []);

  function onChange(id: string) {
    select(id);
    requestAnimationFrame(() => listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <>
      <div className="sticky top-[4.5rem] z-30 border-b border-soil-100 bg-cream/95 px-5 py-3 backdrop-blur sm:py-5">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <FiliereMenu
            label="Choisissez une filière"
            allLabel={`Toutes les filières (${filieres.length})`}
            options={filieres.map((f) => ({ id: f.id, label: f.title }))}
            value={value}
            onChange={onChange}
          />
          <p className="hidden text-sm text-ink-soft sm:block" aria-live="polite">
            {value === TOUTES ? `${filieres.length} filières affichées` : `Filière affichée : ${visibles[0]?.title}`}
          </p>
        </div>
      </div>

      <div ref={listRef} className="scroll-mt-48 sm:scroll-mt-52">
        {visibles.map((f, i) => {
          const n = filieres.indexOf(f) + 1;
          const nbProduits = produits.filter((p) => p.filiere === f.id).length;
          const portrait = f.photo && f.photo.height > f.photo.width;
          return (
            <section
              key={f.id}
              id={f.id}
              aria-labelledby={`${f.id}-titre`}
              className={`scroll-mt-48 px-5 py-14 sm:scroll-mt-52 sm:py-16 ${i % 2 ? "bg-paper" : ""}`}
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
                        loading={i === 0 ? "eager" : "lazy"}
                        className={`h-auto w-full object-cover ${
                          portrait ? "mx-auto aspect-[4/5] lg:max-h-[36rem]" : "aspect-[4/3]"
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
                    Filière {String(n).padStart(2, "0")}
                  </p>
                  <h2
                    id={`${f.id}-titre`}
                    className="font-display mt-2 text-3xl font-semibold leading-tight text-leaf-900 sm:text-4xl"
                  >
                    {f.title}
                  </h2>
                  <p className="mt-2 font-semibold text-soil-700">{f.tagline}</p>
                  <p className="mt-4 leading-relaxed text-ink-soft">{f.description}</p>
                  <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-sesame-700">
                    Produits et activités
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {f.products.map((p) => (
                      <li
                        key={p}
                        className="inline-flex items-center gap-2 rounded-full border border-soil-100 bg-cream px-3 py-1.5 text-sm text-ink"
                      >
                        <span className="h-2 w-2 rounded-full bg-leaf-500" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {nbProduits > 0 && (
                    <Link
                      href={`/produits#${f.id}`}
                      className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-leaf-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-leaf-600"
                    >
                      Voir les produits de cette filière ({nbProduits})
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {value !== TOUTES && (
        <div className="px-5 pb-14 text-center">
          <button
            type="button"
            onClick={() => onChange(TOUTES)}
            className="inline-flex min-h-11 items-center rounded-full border-2 border-leaf-700 px-6 text-sm font-semibold text-leaf-700 hover:bg-leaf-50"
          >
            Afficher toutes les filières
          </button>
        </div>
      )}
    </>
  );
}
