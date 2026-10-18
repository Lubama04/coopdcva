"use client";

import { filieres, produits } from "@/lib/site";
import { FiliereMenu, TOUTES, useHashSelection } from "./FiliereMenu";
import { ProduitCard } from "./ui";

/** Products page: all products, filterable by filière with the same dropdown. */
export function ProduitsExplorer() {
  const avecProduits = filieres.filter((f) => produits.some((p) => p.filiere === f.id));
  const [value, select] = useHashSelection(avecProduits.map((f) => f.id));
  const visibles = value === TOUTES ? produits : produits.filter((p) => p.filiere === value);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <FiliereMenu
          label="Filtrer par filière"
          allLabel={`Tous les produits (${produits.length})`}
          options={avecProduits.map((f) => ({
            id: f.id,
            label: f.title,
            count: produits.filter((p) => p.filiere === f.id).length,
          }))}
          value={value}
          onChange={select}
        />
        <p className="text-sm text-ink-soft" aria-live="polite">
          {visibles.length} produit{visibles.length > 1 ? "s" : ""}
        </p>
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibles.map((p) => (
          <li key={p.nom}>
            <ProduitCard p={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
