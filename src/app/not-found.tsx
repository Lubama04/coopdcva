import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="font-display text-7xl font-semibold text-sesame-500">404</p>
      <h1 className="font-display mt-4 text-3xl font-semibold text-leaf-900">Cette page n&apos;existe pas</h1>
      <p className="mt-3 text-ink-soft">Elle a peut-être été déplacée. Revenez à l&apos;accueil.</p>
      <div className="mt-7">
        <ButtonLink href="/" variant="secondary">Retour à l&apos;accueil</ButtonLink>
      </div>
    </div>
  );
}
