"use client";

import { useState } from "react";
import { projets, type ProjetStatut } from "@/lib/site";
import { ProjetCard } from "./ui";

type Filtre = "tous" | ProjetStatut;

const filtres: { id: Filtre; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "en-cours", label: "En cours" },
  { id: "a-venir", label: "À venir" },
];

/** Liste filtrable des projets : les données viennent de lib/site.ts. */
export function ProjetsExplorer() {
  const [filtre, setFiltre] = useState<Filtre>("tous");
  const visibles = projets.filter((p) => filtre === "tous" || p.statut === filtre);

  return (
    <div>
      <div role="group" aria-label="Filtrer les projets" className="flex flex-wrap gap-2">
        {filtres.map((f) => {
          const count = f.id === "tous" ? projets.length : projets.filter((p) => p.statut === f.id).length;
          const active = filtre === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFiltre(f.id)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "border-leaf-700 bg-leaf-700 text-white"
                  : "border-soil-100 bg-paper text-ink hover:border-leaf-500 hover:text-leaf-700"
              }`}
            >
              {f.label} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-6 md:grid-cols-2" aria-live="polite">
        {visibles.map((p) => (
          <li key={p.slug}>
            <ProjetCard p={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
