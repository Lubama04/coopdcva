import { site } from "@/lib/site";
import { isEmail, motifs, validateContact, type ContactInput } from "@/lib/contact";

/*
 * Sends contact form messages through the Resend HTTP API.
 * Env: RESEND_API_KEY (required), CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (optional).
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort limit: per server instance, reset on cold start. Enough to slow down basic spam.
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  // Only accept submissions coming from this site.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let originHost: string | null = null;
  try {
    originHost = origin ? new URL(origin).host : null;
  } catch {
    originHost = "invalid";
  }
  if (originHost && host && originHost !== host) {
    return json(403, { ok: false, error: "Origine refusée." });
  }

  if (Number(request.headers.get("content-length") ?? 0) > 10_000) {
    return json(413, { ok: false, error: "Message trop volumineux." });
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json(400, { ok: false, error: "Requête invalide." });
  }

  // Honeypot filled: pretend success so bots learn nothing.
  if (typeof data.site_web === "string" && data.site_web !== "") return json(200, { ok: true });

  const input: ContactInput = {
    nom: String(data.nom ?? ""),
    contact: String(data.contact ?? ""),
    motif: motifs.includes(data.motif as (typeof motifs)[number]) ? String(data.motif) : "Autre demande",
    message: String(data.message ?? ""),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) return json(422, { ok: false, errors });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";
  if (rateLimited(ip, Date.now())) {
    return json(429, { ok: false, error: "Trop de messages envoyés. Réessayez dans quelques minutes." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return json(503, { ok: false, error: "L'envoi en ligne n'est pas encore activé." });
  }

  const contact = input.contact.trim();
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Site COOP-DCVA <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? site.email],
      reply_to: isEmail(contact) ? contact : undefined,
      subject: oneLine(`[Site COOP-DCVA] ${input.motif} — ${input.nom}`).slice(0, 200),
      text: [
        `Objet : ${input.motif}`,
        `Nom : ${oneLine(input.nom)}`,
        `Contact : ${oneLine(contact)}`,
        "",
        input.message.trim(),
        "",
        "— Message envoyé depuis le formulaire du site internet de la COOP-DCVA.",
      ].join("\n"),
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch((e: unknown) => {
    console.error("[contact] Resend request failed", e);
    return null;
  });

  if (!res || !res.ok) {
    if (res) console.error("[contact] Resend error", res.status, await res.text());
    return json(502, { ok: false, error: "Le message n'a pas pu être envoyé." });
  }
  return json(200, { ok: true });
}
