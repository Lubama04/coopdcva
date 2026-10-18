/** Contact form rules shared by the browser and the /api/contact route. */

export const motifs = [
  "Acheter des produits",
  "Partenariat ou financement (PROVAL-ZD)",
  "Formation",
  "Autre demande",
] as const;

export type Champ = "nom" | "contact" | "message";
export type ContactErrors = Partial<Record<Champ, string>>;

export type ContactInput = {
  nom: string;
  contact: string;
  motif: string;
  message: string;
};

export const limites = { nom: 120, contact: 120, message: 2000 } as const;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^\+?[\d\s.-]{6,20}$/;

export function isEmail(value: string) {
  return emailRe.test(value);
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const nom = input.nom.trim();
  const contact = input.contact.trim();
  const message = input.message.trim();

  if (nom.length < 2) errors.nom = "Indiquez votre nom.";
  else if (nom.length > limites.nom) errors.nom = "Ce nom est trop long.";

  if (!isEmail(contact) && !phoneRe.test(contact))
    errors.contact = "Indiquez un e-mail valide ou un numéro de téléphone.";

  if (message.length < 10) errors.message = "Votre message est un peu court (10 caractères minimum).";
  else if (message.length > limites.message) errors.message = "Votre message est trop long (2 000 caractères maximum).";

  return errors;
}
