# Site de la COOP-DCVA

Site institutionnel de la Coopérative de Production et de Développement des Chaînes de Valeur Agroalimentaires (N'Djaména, Tchad). Maquette réalisée par ETS FLAUGUST BUSINESS, en attente de validation par la coopérative (le site est en `noindex`).

- Production : https://coop-dcva-site-flaugust-dev.vercel.app
- Questions ouvertes : [A-CONFIRMER.md](A-CONFIRMER.md)

## Technique

Next.js 16 (App Router, pages statiques), React 19, TypeScript, Tailwind CSS v4. Aucune base de données. Une seule clé secrète : celle de Resend pour le formulaire de contact.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Téléphones, e-mail, adresse, WhatsApp, Facebook | `src/lib/site.ts` (objet `site`) |
| Filières, équipements, valeurs, chiffres, équipe | `src/lib/site.ts` |
| Activités (dépliant), membres, partenaires | `src/lib/site.ts` (`activites`, `membres`, `partenaires`) |
| Ajouter un projet | `src/lib/site.ts` (`projets`) : la liste et la page détail se créent seules |
| Ajouter une photo | déposer le fichier dans `public/images/galerie/` (nom en minuscules, sans accents) puis ajouter une entrée dans `galerie` avec le **nom officiel** comme titre |
| Logo | `public/images/logo.svg` et `embleme.svg` (vectoriels, tirés de `LOGO COOP.pdf`) |

## Formulaire de contact (Resend)

Le formulaire envoie vers `src/app/api/contact/route.ts`, qui valide les champs (mêmes règles côté navigateur, `src/lib/contact.ts`), filtre les robots (champ piège, contrôle d'origine, 5 messages par 10 min et par adresse IP) et transmet le message par l'API Resend. En cas d'échec, la personne peut réessayer ou renvoyer le même message par WhatsApp ou e-mail.

Variables d'environnement (voir `.env.example`) à créer dans Vercel → projet `coop-dcva-site` → Settings → Environment Variables (Production et Preview) :

| Variable | Obligatoire | Valeur |
|---|---|---|
| `RESEND_API_KEY` | oui | clé créée sur resend.com (accès « Sending ») |
| `CONTACT_TO_EMAIL` | non | adresse qui reçoit les messages (défaut : e-mail du site) |
| `CONTACT_FROM_EMAIL` | conseillé | ex. `Site COOP-DCVA <contact@domaine-de-la-coop>` une fois le domaine vérifié chez Resend |

Sans domaine vérifié, Resend n'accepte que l'expéditeur `onboarding@resend.dev` **et n'envoie qu'à l'adresse du compte Resend** : pour les tests, `CONTACT_TO_EMAIL` doit donc être l'e-mail du compte. Redéployer après avoir ajouté les variables.

## Mise en ligne officielle

1. Retirer `robots: { index: false, … }` dans `src/app/layout.tsx` et passer `disallow` à `allow` dans `src/app/robots.ts`.
2. Définir `NEXT_PUBLIC_SITE_URL` (ex. `https://coopdcva.td`) dans Vercel.
3. Ajouter le domaine au projet Vercel et saisir les DNS chez le registraire.

## Tests

```bash
npm run build
npm run test:e2e        # 34 tests Playwright sur le Chrome installé (mobile + bureau)
E2E_BASE_URL=https://coop-dcva-site.vercel.app npm run test:e2e   # contre la production
```

## Héberger ailleurs que Vercel

Le site n'utilise rien de propre à Vercel : il peut être repris par la coopérative ou un autre prestataire.

| Option | Comment | Remarques |
|---|---|---|
| **Vercel** (actuel) | Push sur `main` = déploiement automatique | Le plan gratuit « Hobby » est réservé à un usage non commercial : pour un site d'organisation, prévoir le plan Pro (≈ 20 $/mois) ou un autre hébergeur. |
| **Coolify** auto-hébergé (VPS ~5-10 €/mois) | Nouvelle application « Nixpacks » depuis le dépôt GitHub, commande de build `npm run build`, démarrage `npm start`, port 3000 ; ajouter les variables `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL` | HTTPS automatique (Let's Encrypt). Les en-têtes de sécurité de `next.config.ts` s'appliquent. |
| **Tout serveur Node 20+** | `npm ci && npm run build && npm start` derrière Nginx/Caddy en HTTPS | Même chose qu'avec Coolify, à la main. |
| **Export statique** (hébergement mutualisé simple) | Possible seulement en retirant la route `/api/contact` (formulaire remplacé par WhatsApp/e-mail ou Formspree) et en passant `output: "export"` | Les en-têtes de sécurité et la redirection `/proval-zd` devront être refaits dans la configuration du serveur. |

Guide non technique pour la coopérative : [docs/GUIDE-COOPERATIVE.md](docs/GUIDE-COOPERATIVE.md).
