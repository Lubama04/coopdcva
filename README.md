# Site internet de la COOP-DCVA

Site officiel de la Coopérative de Production et de Développement des Chaînes de Valeur Agroalimentaires (COOP-DCVA), quartier Gassi, N'Djaména, Tchad.

- Site en ligne : https://coop-dcva-site.vercel.app
- Guide pour mettre à jour le site sans connaissances techniques : [docs/GUIDE-COOPERATIVE.md](docs/GUIDE-COOPERATIVE.md)

## Technique

Next.js 16 (App Router, pages statiques), React 19, TypeScript, Tailwind CSS v4. Pas de base de données. La seule clé secrète est celle du service d'envoi d'e-mails (Resend) utilisé par le formulaire de contact.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
npm run test:e2e   # tests automatiques (Playwright, sur le Chrome installé)
```

Pour tester le site en ligne : `E2E_BASE_URL=https://coop-dcva-site.vercel.app npm run test:e2e`.

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Téléphones, e-mail, adresse, WhatsApp, Facebook | `src/lib/site.ts` (objet `site`) |
| Filières, équipements, valeurs, chiffres, équipe | `src/lib/site.ts` |
| Activités, membres, partenaires | `src/lib/site.ts` (`activites`, `membres`, `partenaires`) |
| Ajouter un projet | `src/lib/site.ts` (`projets`) : la liste et la page du projet se créent seules |
| Ajouter une photo | déposer le fichier dans `public/images/galerie/` (nom en minuscules, sans accents) puis ajouter une entrée dans `galerie` |
| Logo | `public/images/logo.svg` et `embleme.svg` (vectoriels, tirés du logo officiel) |

## Formulaire de contact

Le formulaire envoie vers `src/app/api/contact/route.ts`. Cette route valide les champs (mêmes règles que dans le navigateur, `src/lib/contact.ts`), filtre les robots (champ piège, contrôle d'origine, 5 messages par 10 minutes et par adresse IP), puis transmet le message par l'API Resend. Si l'envoi échoue, la personne peut réessayer ou renvoyer le même message par WhatsApp ou par e-mail.

Variables d'environnement à définir chez l'hébergeur (modèle : `.env.example`) :

| Variable | Obligatoire | Valeur |
|---|---|---|
| `RESEND_API_KEY` | oui | clé créée sur resend.com (accès « Sending ») |
| `CONTACT_TO_EMAIL` | non | adresse qui reçoit les messages (par défaut : coop.dcva@gmail.com) |
| `CONTACT_FROM_EMAIL` | conseillé | par exemple `Site COOP-DCVA <contact@domaine-de-la-cooperative>`, une fois le domaine vérifié chez Resend |
| `NEXT_PUBLIC_SITE_URL` | non | adresse publique du site, utilisée pour le référencement (par exemple `https://www.domaine-de-la-cooperative`) |

Tant qu'aucun domaine n'est vérifié chez Resend, seul l'expéditeur `onboarding@resend.dev` est accepté, et les messages ne partent que vers l'adresse du compte Resend.

## Hébergement

Le site ne dépend d'aucun service propre à un hébergeur. Il peut être déplacé à tout moment.

| Option | Comment |
|---|---|
| **Vercel** (actuel) | Chaque modification de la branche `main` est mise en ligne automatiquement. Pour le site d'une organisation, Vercel demande le plan Pro : le plan gratuit est réservé à un usage non commercial. |
| **Coolify** sur un serveur privé (VPS) | Nouvelle application depuis le dépôt GitHub. Build : `npm run build`. Démarrage : `npm start`. Port : 3000. Ajouter les variables ci-dessus. HTTPS automatique. |
| **Tout serveur Node.js 20 ou plus** | `npm ci && npm run build && npm start`, derrière Nginx ou Caddy en HTTPS. |
| **Hébergement statique simple** | Possible en retirant la route `/api/contact` (le formulaire passe alors par WhatsApp ou e-mail) et en ajoutant `output: "export"` dans `next.config.ts`. Les en-têtes de sécurité et la redirection `/proval-zd` sont alors à configurer sur le serveur. |

Les en-têtes de sécurité (CSP, HSTS, etc.) sont définis dans `next.config.ts`.

## Nom de domaine

1. Ajouter le domaine au projet chez l'hébergeur, puis saisir chez le registraire les enregistrements DNS indiqués.
2. Définir `NEXT_PUBLIC_SITE_URL` avec la nouvelle adresse, puis redéployer.
