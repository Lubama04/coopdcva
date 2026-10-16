"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Errors = Partial<Record<"nom" | "contact" | "message", string>>;

const motifs = [
  "Acheter des produits",
  "Partenariat ou financement (PROVAL-ZD)",
  "Formation",
  "Autre demande",
];

/**
 * Formulaire de maquette : il valide les champs puis ouvre le client mail
 * de la personne avec un message prérempli (aucun serveur requis).
 * TODO (version finale) : envoi par un service d'e-mail ou une base Supabase.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nom = String(data.get("nom") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const motif = String(data.get("motif") ?? motifs[0]);
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (nom.length < 2) next.nom = "Indiquez votre nom.";
    if (contact.length < 6) next.contact = "Indiquez un e-mail ou un numéro de téléphone.";
    if (message.length < 10) next.message = "Votre message est un peu court.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(`[Site COOP-DCVA] ${motif}`);
    const body = encodeURIComponent(`Nom : ${nom}\nContact : ${contact}\n\n${message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "mt-2 w-full rounded-2xl border border-soil-500/30 bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-leaf-600";
  const err = "mt-1 text-sm font-medium text-[#b3261e]";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="form-status">
      <div>
        <label htmlFor="nom" className="text-sm font-semibold text-leaf-900">Votre nom</label>
        <input id="nom" name="nom" type="text" autoComplete="name" className={field} aria-invalid={!!errors.nom} aria-describedby={errors.nom ? "nom-err" : undefined} />
        {errors.nom && <p id="nom-err" className={err}>{errors.nom}</p>}
      </div>

      <div>
        <label htmlFor="contact" className="text-sm font-semibold text-leaf-900">E-mail ou téléphone</label>
        <input id="contact" name="contact" type="text" autoComplete="email" className={field} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "contact-err" : undefined} />
        {errors.contact && <p id="contact-err" className={err}>{errors.contact}</p>}
      </div>

      <div>
        <label htmlFor="motif" className="text-sm font-semibold text-leaf-900">Objet de votre demande</label>
        <select id="motif" name="motif" className={field} defaultValue={motifs[0]}>
          {motifs.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-leaf-900">Message</label>
        <textarea id="message" name="message" rows={5} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
        {errors.message && <p id="message-err" className={err}>{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-leaf-700 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-leaf-600 sm:w-auto"
      >
        Envoyer mon message
      </button>

      <p id="form-status" role="status" className="text-sm text-leaf-700">
        {sent ? "Votre application de messagerie s'ouvre avec le message prêt à envoyer." : ""}
      </p>
    </form>
  );
}
