"use client";

import { useRef, useState, type FormEvent } from "react";
import { limites, motifs, validateContact, type Champ, type ContactErrors, type ContactInput } from "@/lib/contact";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppButton";

type Etat = "repos" | "envoi" | "succes" | "erreur";

function texteMessage(v: ContactInput) {
  return `Nom : ${v.nom}\nContact : ${v.contact}\n\n${v.message}`;
}

/**
 * Formulaire envoyé par /api/contact (Resend). En cas d'échec (réseau faible,
 * service indisponible), la personne peut réessayer ou passer par WhatsApp / e-mail
 * avec son message déjà rédigé : rien n'est perdu.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [etat, setEtat] = useState<Etat>("repos");
  const [erreurServeur, setErreurServeur] = useState("");
  const [dernier, setDernier] = useState<ContactInput | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statutRef = useRef<HTMLDivElement>(null);

  function lire(form: HTMLFormElement): ContactInput & { site_web: string } {
    const data = new FormData(form);
    return {
      nom: String(data.get("nom") ?? "").trim(),
      contact: String(data.get("contact") ?? "").trim(),
      motif: String(data.get("motif") ?? motifs[0]),
      message: String(data.get("message") ?? "").trim(),
      site_web: String(data.get("site_web") ?? ""),
    };
  }

  async function envoyer(valeurs: ContactInput & { site_web: string }) {
    setEtat("envoi");
    setErreurServeur("");
    setDernier(valeurs);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valeurs),
        signal: AbortSignal.timeout(20_000),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (res.ok && body.ok) {
        setEtat("succes");
        formRef.current?.reset();
      } else if (res.status === 422 && body.errors) {
        setErrors(body.errors);
        setEtat("repos");
      } else {
        setErreurServeur(body.error ?? "Le message n'a pas pu être envoyé.");
        setEtat("erreur");
      }
    } catch {
      setErreurServeur("La connexion semble interrompue.");
      setEtat("erreur");
    }
    requestAnimationFrame(() => statutRef.current?.focus());
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "envoi") return;
    const form = e.currentTarget;
    const valeurs = lire(form);
    const next = validateContact(valeurs);
    setErrors(next);
    const premier = (Object.keys(next) as Champ[])[0];
    if (premier) {
      (form.elements.namedItem(premier) as HTMLElement | null)?.focus();
      return;
    }
    void envoyer(valeurs);
  }

  const field =
    "mt-2 w-full rounded-2xl border border-soil-500/30 bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-leaf-600 aria-[invalid=true]:border-[#b3261e]";
  const err = "mt-1 text-sm font-medium text-[#b3261e]";
  const envoiEnCours = etat === "envoi";

  const repli = dernier
    ? {
        whatsapp: `${site.whatsapp}?text=${encodeURIComponent(`[Site COOP-DCVA] ${dernier.motif}\n\n${texteMessage(dernier)}`)}`,
        mail: `mailto:${site.email}?subject=${encodeURIComponent(`[Site COOP-DCVA] ${dernier.motif}`)}&body=${encodeURIComponent(texteMessage(dernier))}`,
      }
    : null;

  if (etat === "succes") {
    return (
      <div ref={statutRef} tabIndex={-1} role="status" className="rounded-2xl bg-leaf-50 p-6 focus:outline-none">
        <p className="font-display text-xl font-semibold text-leaf-700">Merci, votre message est bien envoyé.</p>
        <p className="mt-2 text-sm text-ink-soft">
          La coopérative vous répondra dès que possible. Pour une demande urgente, appelez le{" "}
          <a href={site.phoneHref} className="font-semibold text-leaf-700 underline">
            {site.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setEtat("repos")}
          className="mt-5 inline-flex min-h-11 items-center rounded-full border-2 border-leaf-700 px-5 text-sm font-semibold text-leaf-700 hover:bg-white"
        >
          Écrire un autre message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={envoiEnCours}>
      <div>
        <label htmlFor="nom" className="text-sm font-semibold text-leaf-900">
          Votre nom
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          autoComplete="name"
          maxLength={limites.nom}
          required
          className={field}
          aria-invalid={!!errors.nom}
          aria-describedby={errors.nom ? "nom-err" : undefined}
        />
        {errors.nom && <p id="nom-err" className={err}>{errors.nom}</p>}
      </div>

      <div>
        <label htmlFor="contact" className="text-sm font-semibold text-leaf-900">
          E-mail ou téléphone
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          maxLength={limites.contact}
          required
          className={field}
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "contact-err contact-aide" : "contact-aide"}
        />
        <p id="contact-aide" className="mt-1 text-xs text-ink-soft">
          Pour que nous puissions vous répondre.
        </p>
        {errors.contact && <p id="contact-err" className={err}>{errors.contact}</p>}
      </div>

      <div>
        <label htmlFor="motif" className="text-sm font-semibold text-leaf-900">
          Objet de votre demande
        </label>
        <select id="motif" name="motif" className={field} defaultValue={motifs[0]}>
          {motifs.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-leaf-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={limites.message}
          required
          className={field}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
        />
        {errors.message && <p id="message-err" className={err}>{errors.message}</p>}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="site_web">Ne pas remplir ce champ</label>
        <input id="site_web" name="site_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={envoiEnCours}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-leaf-700 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-leaf-600 disabled:cursor-wait disabled:opacity-70"
        >
          {envoiEnCours && (
            <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {envoiEnCours ? "Envoi en cours…" : "Envoyer mon message"}
        </button>
        <a
          href={`${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#1f7a43] px-6 py-3 text-base font-semibold text-[#1f7a43] transition-colors hover:bg-leaf-50"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Écrire sur WhatsApp
        </a>
      </div>

      <div ref={statutRef} tabIndex={-1} role="status" aria-live="polite" className="focus:outline-none">
        {envoiEnCours && <p className="sr-only">Envoi du message en cours.</p>}
        {etat === "erreur" && repli && (
          <div className="rounded-2xl border border-[#b3261e]/30 bg-[#fdf1ef] p-5 text-sm text-ink">
            <p className="font-semibold text-[#b3261e]">{erreurServeur} Votre message n&apos;est pas perdu.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => dernier && void envoyer({ ...dernier, site_web: "" })}
                className="inline-flex min-h-11 items-center rounded-full bg-leaf-700 px-5 font-semibold text-white hover:bg-leaf-600"
              >
                Réessayer
              </button>
              <a
                href={repli.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1f7a43] px-5 font-semibold text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Envoyer sur WhatsApp
              </a>
              <a
                href={repli.mail}
                className="inline-flex min-h-11 items-center rounded-full border-2 border-leaf-700 px-5 font-semibold text-leaf-700"
              >
                Envoyer par e-mail
              </a>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
