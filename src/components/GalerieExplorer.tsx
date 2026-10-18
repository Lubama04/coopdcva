"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { galerie, galerieCategories, type Categorie } from "@/lib/site";

type Filtre = "Toutes" | Categorie;

/** Galerie filtrable en mosaïque, avec visionneuse plein écran (clavier et tactile). */
export function GalerieExplorer() {
  const [filtre, setFiltre] = useState<Filtre>("Toutes");
  const [ouverte, setOuverte] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const items = galerie.filter((p) => filtre === "Toutes" || p.categorie === filtre);
  const courante = ouverte !== null ? items[ouverte] : null;

  function ouvrir(i: number) {
    setOuverte(i);
    dialogRef.current?.showModal();
  }

  function aller(delta: number) {
    setOuverte((o) => (o === null ? o : (o + delta + items.length) % items.length));
  }

  function onKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowRight") aller(1);
    if (e.key === "ArrowLeft") aller(-1);
  }

  const filtres: Filtre[] = ["Toutes", ...galerieCategories];

  return (
    <div>
      <div role="group" aria-label="Filtrer les photos" className="flex flex-wrap gap-2">
        {filtres.map((f) => {
          const actif = filtre === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={actif}
              onClick={() => setFiltre(f)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                actif
                  ? "border-leaf-700 bg-leaf-700 text-white"
                  : "border-soil-100 bg-paper text-ink hover:border-leaf-500 hover:text-leaf-700"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3" aria-live="polite">
        {items.map((p, i) => (
          <li key={p.src} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => ouvrir(i)}
              className="group relative block w-full overflow-hidden rounded-3xl border border-soil-100 bg-paper text-left"
              aria-label={`Agrandir la photo : ${p.title}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-leaf-900/85 to-transparent px-5 pb-4 pt-12">
                <span className="font-display block text-lg font-semibold text-white">{p.title}</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-sesame-300">
                  {p.categorie}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Visionneuse de photos"
        onClose={() => setOuverte(null)}
        onKeyDown={onKeyDown}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto h-dvh w-dvw max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/85"
      >
        {courante && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-6">
            <Image
              src={courante.src}
              alt={courante.alt}
              width={courante.width}
              height={courante.height}
              sizes="100vw"
              className="max-h-[78dvh] w-auto max-w-full rounded-2xl object-contain"
            />
            <p className="max-w-xl text-center text-sm text-white">
              <span className="font-display block text-lg font-semibold">{courante.title}</span>
              {courante.caption}
            </p>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => aller(-1)} className="rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white hover:bg-white/25">
                ← Précédente
              </button>
              <button type="button" onClick={() => dialogRef.current?.close()} className="rounded-full bg-sesame-500 px-5 py-2 text-sm font-semibold text-ink hover:bg-sesame-300">
                Fermer
              </button>
              <button type="button" onClick={() => aller(1)} className="rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white hover:bg-white/25">
                Suivante →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
