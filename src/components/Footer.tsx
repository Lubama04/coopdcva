import Link from "next/link";
import { nav, site, whatsappHref } from "@/lib/site";
import { LogoFull } from "./Logo";

export function Footer() {
  return (
    <footer className="grain bg-leaf-900 pb-16 text-leaf-100 sm:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="max-w-[15rem] rounded-2xl bg-white p-3">
            <LogoFull />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-leaf-100/80">
            {site.fullName}. Créée le {site.founded} à N&apos;Djaména.
          </p>
          <p className="font-display mt-4 text-lg italic text-sesame-300">
            « {site.slogan} »
          </p>
        </div>

        <nav aria-label="Pied de page">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-sesame-300">
            Le site
          </h2>
          <ul className="mt-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1.5 hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-sesame-300">
            Nous joindre
          </h2>
          <address className="mt-3 text-sm not-italic">
            <p className="py-1.5">{site.addressDetail}</p>
            {site.phones.map((ph) => (
              <p key={ph.href}>
                <a href={ph.href} className="inline-block py-1.5 hover:text-white hover:underline">
                  {ph.display}
                </a>
              </p>
            ))}
            <p>
              <a href={`mailto:${site.email}`} className="inline-block py-1.5 hover:text-white hover:underline">
                {site.email}
              </a>
            </p>
            <p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1.5 hover:text-white hover:underline"
              >
                WhatsApp
              </a>
            </p>
            <p>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1.5 hover:text-white hover:underline"
              >
                Page Facebook
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-leaf-100/70 sm:flex-row sm:justify-between">
          <p>© 2026 COOP-DCVA. Tous droits réservés.</p>
          <p>Maquette réalisée par ETS FLAUGUST BUSINESS</p>
        </div>
      </div>
    </footer>
  );
}
