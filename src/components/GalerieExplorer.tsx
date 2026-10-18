"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { galerie, galerieCategories, type Categorie } from "@/lib/site";

type Filtre = "Toutes" | Categorie;

/** Galerie filtrable en mosaïque, avec visionneuse plein écran (clavier, tactile, focus rendu). */
export function GalerieExplorer() {
  const [filtre, setFiltre] = useState<Filtre>("Toutes");
  const [ouverte, setOuverte] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const vignettes = useRef<(HTMLButtonElement | null)[]>([]);
  const derniere = useRef<number | null>(null);
  const toucheX = useRef<number | null>(null);

  const items = galerie.filter((p) => filtre === "Toutes" || p.categorie === filtre);
  const courante = ouverte !== null ? items[ouverte] : null;

  function ouvrir(i: number) {
    derniere.current = i;
    setOuverte(i);
    dialogRef.current?.showModal();
  }

  function fermer() {
    dialogRef.current?.close();
  }

  function aller(delta: number) {
    setOuverte((o) => {
      if (o === null) return o;
      const n = (o + delta + items.length) % items.length;
      derniere.current = n;
      return n;
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowRight") aller(1);
    if (e.key === "ArrowLeft") aller(-1);
  }

  function onTouchStart(e: TouchEvent) {
    toucheX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: TouchEvent) {
    if (toucheX.current === null) return;
    const dx = e.changedTouches[0].clientX - toucheX.current;
    toucheX.current = null;
    if (Math.abs(dx) > 50) aller(dx < 0 ? 1 : -1);
  }

  const filtres: Filtre[] = ["Toutes", ...galerieCategories];

  return (
    <div>
      <div role="group" aria-label="Filtrer les photos" className="flex flex-wrap gap-2">
        {filtres.map((f) => {
          const actif = filtre === f;
          const n = f === "Toutes" ? galerie.length : galerie.filter((p) => p.categorie === f).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={actif}
              onClick={() => setFiltre(f)}
              className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                actif
                  ? "border-leaf-700 bg-leaf-700 text-white"
                  : "border-soil-100 bg-paper text-ink hover:border-leaf-500 hover:text-leaf-700"
              }`}
            >
              {f} <span className="opacity-70">({n})</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {items.length} photo{items.length > 1 ? "s" : ""} affichée{items.length > 1 ? "s" : ""}
      </p>

      <ul className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((p, i) => (
          <li key={p.src} className="mb-5 break-inside-avoid">
            <button
              ref={(el) => {
                vignettes.current[i] = el;
              }}
              type="button"
              onClick={() => ouvrir(i)}
              className="group relative block w-full overflow-hidden rounded-3xl border border-soil-100 bg-paper text-left"
              aria-haspopup="dialog"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-leaf-900/90 via-leaf-900/50 to-transparent px-5 pb-4 pt-14">
                <span className="font-display block text-lg font-semibold leading-snug text-white">
                  {p.title}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-sesame-300">
                  {p.categorie}
                </span>
                <span className="sr-only"> — agrandir la photo</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="visionneuse-titre"
        onClose={() => {
          setOuverte(null);
          const i = derniere.current;
          if (i !== null) vignettes.current[i]?.focus();
        }}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={(e) => {
          if (e.target === e.currentTarget) fermer();
        }}
        className="m-auto h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 backdrop:bg-black/90"
      >
        {courante && ouverte !== null && (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) fermer();
            }}
          >
            <Image
              key={courante.src}
              src={courante.src}
              alt={courante.alt}
              width={courante.width}
              height={courante.height}
              sizes="100vw"
              loading="eager"
              className="max-h-[72dvh] w-auto max-w-full rounded-2xl object-contain"
            />
            <div className="max-w-xl text-center text-sm text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-sesame-300">
                {ouverte + 1} / {items.length}
              </p>
              <h2 id="visionneuse-titre" className="font-display mt-1 text-lg font-semibold">
                {courante.title}
              </h2>
              <p className="mt-1 text-white/85">{courante.caption}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => aller(-1)}
                aria-label="Photo précédente"
                className="min-h-11 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white hover:bg-white/25"
              >
                ← <span className="hidden sm:inline">Précédente</span>
              </button>
              <button
                type="button"
                onClick={fermer}
                className="min-h-11 rounded-full bg-sesame-500 px-5 py-2 text-sm font-semibold text-ink hover:bg-sesame-300"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => aller(1)}
                aria-label="Photo suivante"
                className="min-h-11 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white hover:bg-white/25"
              >
                <span className="hidden sm:inline">Suivante</span> →
              </button>
            </div>
            <p className="text-xs text-white/60 sm:hidden">Glissez à gauche ou à droite pour changer de photo.</p>
          </div>
        )}
      </dialog>
    </div>
  );
}
