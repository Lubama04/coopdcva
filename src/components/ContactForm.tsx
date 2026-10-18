"use client";

import { useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppButton";

type Champ = "nom" | "contact" | "message";
type Errors = Partial<Record<Champ, string>>;
type Canal = "whatsapp" | "email";

const motifs = [
  "Acheter des produits",
  "Partenariat ou financement (PROVAL-ZD)",
  "Formation",
  "Autre demande",
];

/**
 * Formulaire sans serveur : il valide les champs puis ouvre WhatsApp ou le client
 * mail de la personne avec le message prêt à envoyer (fonctionne même avec une
 * connexion faible, rien n'est stocké).
 * TODO (version finale) : envoi direct par un service d'e-mail (voir rapport).
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [statut, setStatut] = useState("");
  const canal = useRef<Canal>("whatsapp");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nom = String(data.get("nom") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const motif = String(data.get("motif") ?? motifs[0]);
    const message = String(data.get("message") ?? "").trim();
    // Honeypot: real visitors never see or fill this field.
    if (String(data.get("site_web") ?? "") !== "") return;

    const next: Errors = {};
    if (nom.length < 2) next.nom = "Indiquez votre nom.";
    if (contact.replace(/\s/g, "").length < 6)
      next.contact = "Indiquez un e-mail ou un numéro de téléphone.";
    if (message.length < 10) next.message = "Votre message est un peu court (10 caractères minimum).";
    setErrors(next);
    const premier = (Object.keys(next) as Champ[])[0];
    if (premier) {
      setStatut("Le formulaire contient des erreurs.");
      (form.elements.namedItem(premier) as HTMLElement | null)?.focus();
      return;
    }

    const texte = `${motif}\n\nNom : ${nom}\nContact : ${contact}\n\n${message}`;
    if (canal.current === "whatsapp") {
      window.open(
        `${site.whatsapp}?text=${encodeURIComponent(`[Site COOP-DCVA] ${texte}`)}`,
        "_blank",
        "noopener,noreferrer",
      );
      setStatut("WhatsApp s'ouvre avec votre message : il ne reste qu'à appuyer sur « Envoyer ».");
    } else {
      const subject = encodeURIComponent(`[Site COOP-DCVA] ${motif}`);
      const body = encodeURIComponent(`Nom : ${nom}\nContact : ${contact}\n\n${message}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatut("Votre messagerie s'ouvre avec le message prêt à envoyer.");
    }
  }

  const field =
    "mt-2 w-full rounded-2xl border border-soil-500/30 bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-leaf-600 aria-[invalid=true]:border-[#b3261e]";
  const err = "mt-1 text-sm font-medium text-[#b3261e]";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="nom" className="text-sm font-semibold text-leaf-900">
          Votre nom
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          autoComplete="name"
          maxLength={120}
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
          maxLength={120}
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
          maxLength={2000}
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

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          onClick={() => (canal.current = "whatsapp")}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1f7a43] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-leaf-700"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Envoyer sur WhatsApp
        </button>
        <button
          type="submit"
          onClick={() => (canal.current = "email")}
          className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-leaf-700 px-6 py-3 text-base font-semibold text-leaf-700 transition-colors hover:bg-leaf-50"
        >
          Envoyer par e-mail
        </button>
      </div>

      <p role="status" className="min-h-5 text-sm font-medium text-leaf-700">
        {statut}
      </p>
    </form>
  );
}
