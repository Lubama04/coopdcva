# Site de la COOP-DCVA

Site institutionnel de la Coopérative de Production et de Développement des Chaînes de Valeur Agroalimentaires (N'Djaména, Tchad). Maquette réalisée par ETS FLAUGUST BUSINESS, en attente de validation par la coopérative (le site est en `noindex`).

- Production : https://coop-dcva-site-flaugust-dev.vercel.app
- Questions ouvertes : [A-CONFIRMER.md](A-CONFIRMER.md)

## Technique

Next.js 16 (App Router, pages statiques), React 19, TypeScript, Tailwind CSS v4. Aucune base de données, aucune clé secrète.

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

## Mise en ligne officielle

1. Retirer `robots: { index: false, … }` dans `src/app/layout.tsx` et passer `disallow` à `allow` dans `src/app/robots.ts`.
2. Définir `NEXT_PUBLIC_SITE_URL` (ex. `https://coopdcva.td`) dans Vercel.
3. Ajouter le domaine au projet Vercel et saisir les DNS chez le registraire.

## Héberger ailleurs que Vercel

- **Serveur Node** (VPS, Coolify) : `npm ci && npm run build && npm start` (port 3000), derrière un proxy HTTPS.
- Les en-têtes de sécurité sont définis dans `next.config.ts` et s'appliquent quel que soit l'hébergeur Node.
