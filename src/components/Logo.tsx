import Image from "next/image";

/** Emblème officiel (pousse dans les mains, vectoriel) + nom de la coopérative, pour l'en-tête. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/images/embleme.svg"
        alt=""
        width={193}
        height={322}
        loading="eager"
        className="h-12 w-auto shrink-0"
      />
      <span className="leading-none">
        <span
          className={`font-display block text-2xl font-bold tracking-tight ${
            light ? "text-white" : "text-leaf-700"
          }`}
        >
          COOP-DCVA
        </span>
        <span
          className={`mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${
            light ? "text-sesame-300" : "text-soil-700"
          }`}
        >
          Chaînes de valeur agroalimentaires
        </span>
      </span>
    </span>
  );
}

/** Logo complet officiel (vectoriel, net sur tous les écrans). */
export function LogoFull({
  className = "",
  eager = false,
}: {
  className?: string;
  eager?: boolean;
}) {
  return (
    <Image
      src="/images/logo.svg"
      alt="Logo officiel de la COOP-DCVA : une pousse entre deux mains au-dessus d'une terre cultivée"
      width={780}
      height={450}
      loading={eager ? "eager" : "lazy"}
      className={`h-auto w-full ${className}`}
    />
  );
}
