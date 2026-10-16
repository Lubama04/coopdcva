import Image from "next/image";

/** Emblème officiel (pousse dans les mains) + nom de la coopérative, pour l'en-tête. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/images/embleme.png"
        alt=""
        width={280}
        height={425}
        priority
        className="h-12 w-auto shrink-0 rounded-md bg-white"
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

/** Logo complet officiel, net et grand, sur fond blanc. */
export function LogoFull({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="Logo officiel de la COOP-DCVA : une pousse entre deux mains au-dessus d'une terre cultivée"
      width={1080}
      height={658}
      priority={priority}
      className={`h-auto w-full ${className}`}
    />
  );
}
