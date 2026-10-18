@AGENTS.md

# COOP-DCVA — site institutionnel et vitrine

Maquette destinée à convaincre la coopérative d'accepter la proposition de LUBAMA Jean Chrysostome ZACEI (ETS FLAUGUST BUSINESS, Tchad). Quand le site sera validé, il passera en production sous le domaine de la coopérative.

## Règles de travail (non négociables)
- Langue : français pour tout texte visible et pour les réponses ; code et commentaires techniques en anglais.
- Réponses courtes. Pas de récapitulatif inutile.
- **Ne jamais inventer** une légende, un chiffre, un nom de produit, un partenaire ou un contact. Si une information manque, l'écrire dans `A-CONFIRMER.md` et poser la question, sans la deviner.
- Les noms des photos/vidéos viennent des noms de fichiers fournis par la coopérative (dossier `Image/` du dossier projet). Ils font foi pour les titres de la galerie.
- Le site est en `noindex` tant que la coopérative n'a pas validé (voir `src/app/layout.tsx`).

## La coopérative
- Nom : Coopérative de Production et de Développement des Chaînes de Valeur Agroalimentaires (COOP-DCVA), créée le 10 juillet 2023.
- Slogan : « Qui ne se plante pas ne pousse jamais ».
- Adresse : Rue du Lycée de Gassi, Quartier Gassi, N'Djaména, Tchad.
- Téléphones : +235 65 57 09 37 / 63 33 16 89 / 98 28 36 70.
- E-mail : le site utilise `coop.dcva@gmail.com` (Facebook) ; le dépliant imprimé affiche `nangadoum999@gmail.com`. **À trancher avec la cheffe de la coopérative.**
- Facebook : https://www.facebook.com/profile.php?id=61573061867030
- Présidente : Mme Mémadji Reoutou Ngaroroum.
- Mission (dépliant) : promotion des actions féminines, protection et autonomisation des femmes marginalisées, et en particulier des femmes vivant avec un handicap.
- Financement obtenu : USAID. Le « prêt d'honneur BetterUp » a été retiré volontairement : ne pas le remettre.
- Projet à venir : PROVAL-ZD (110 000 000 FCFA, 36 mois, 500 bénéficiaires directs dont 80 % de femmes, N'Djaména · Moundou · Doba). Il cherche des partenaires. Il n'a **pas** de page dédiée : c'est un projet parmi d'autres dans `/projets` (route `/projets/proval-zd`, avec redirection depuis `/proval-zd`).

## Dossier du projet (sur l'ordinateur de l'utilisateur)
`L:\Flaugust dév\Coop-DCVA\`
- `Documentation\DEPLIANT COOP.pdf` — dépliant officiel (une page, image scannée : le texte doit être lu en l'affichant, pas en extrayant le texte).
- `Documentation\LOGO COOP.pdf` — logo officiel.
- `Image\` — 7 photos + 1 vidéo, avec les noms officiels (voir la correspondance ci-dessous).
- `Site\` — le code source (copie du dépôt GitHub).

## Stack
Next.js 16.4 (App Router, rendu statique, `cacheComponents: true`), React 19.3, TypeScript strict, Tailwind CSS v4 (jetons `@theme` : leaf-*, soil-*, sesame-*, cream, paper, ink, ink-soft), polices Fraunces (titres) et Inter (texte) auto-hébergées via fontsource, `next/image`, `<dialog>` natif pour la visionneuse.
Cette version de Next a des changements cassants : lire `node_modules/next/dist/docs/` avant d'écrire du code (voir AGENTS.md).
Pièges connus : `new Date()` interdit au prérendu (cacheComponents) ; `params` est une Promise ; `generateStaticParams` / `generateMetadata` dans les pages dynamiques.

## Carte du code
- `src/lib/site.ts` — **tout le contenu** (coordonnées, nav, filières, équipements, valeurs, chiffres, équipe, soutiens, projets, galerie, vidéo). Ajouter une entrée dans `projets` ou `galerie` met à jour listes et pages de détail automatiquement.
- `src/app/` — pages : `/` (accueil), `/a-propos`, `/filieres`, `/projets`, `/projets/[slug]`, `/galerie`, `/contact` ; `layout.tsx` (métadonnées, JSON-LD, noindex), `sitemap.ts`, `robots.ts`, `manifest.ts`, `icon.png`, `apple-icon.png`, `opengraph-image.png` (générés depuis `LOGO COOP.pdf`).
- `src/lib/seo.ts` — `baseUrl` et `pageMetadata()` (canonique + Open Graph par page). En-têtes de sécurité (CSP…) dans `next.config.ts`.
- `src/components/` — `Header`, `Footer`, `Logo` (emblème SVG + texte, et `LogoFull`), `ui.tsx` (SectionTitle, Section, PageHero, ButtonLink, FiliereCard, StatusBadge, ProjetCard, ActivitesGrid, Reseau), `ProjetsExplorer` (filtre), `GalerieExplorer` (mosaïque, filtres, visionneuse clavier/tactile), `ContactForm` (WhatsApp ou mailto, sans serveur), `WhatsAppButton` (bouton flottant).
- `public/images/` — `logo.svg`/`embleme.svg` (vectoriels, tirés du PDF officiel) + PNG haute définition, `banniere.png`, `galerie/*.jpg`, `activites/*.jpg` (photos recadrées du dépliant, titrées par les intitulés du dépliant), `partenaires/*.png` (logos recadrés du dépliant) ; `public/videos/deshydrateur-alimentaire.mp4`.
- `A-CONFIRMER.md` — toutes les questions ouvertes pour la présidente.

## Dépliant officiel (lu le 18/10/2026)
Activités : Production des matières premières · Chaînes de valeur · Renforcement des capacités · Accompagnement · Agro-alimentaire. Membres : MaPerle Natural Products, CIFTA, Soumsoumna. Partenaires : Job Booster (« emplois dignes pour les jeunes »), Bet Al-Nadjah, Chambre de Commerce, d'Industrie, d'Agriculture, des Mines et d'Artisanat, Airtel.

## Correspondance photos (nom officiel → fichier du site)
| Nom officiel | Fichier dans `public/images/galerie/` |
|---|---|
| Beignets de patate douce | `beignets-patate-douce.jpg` |
| Transformation de la patate douce | `transformation-patate-douce.jpg` |
| Tomate en transformation | `tomate-en-transformation.jpg` |
| Moulin à farine (1) | `moulin-farine-1.jpg` |
| Moulin à farine (2) | `moulin-farine-2.jpg` |
| Moulin à dépéliculer le maïs et autres céréales (1) | `depeliculer-1.jpg` |
| Moulin à dépéliculer le maïs et autres céréales (2) | `depeliculer-2.jpg` |
| Déshydrateur alimentaire.mp4 (séance de déshydratation de la tomate coupée en morceaux) | `public/videos/deshydrateur-alimentaire.mp4` (5 Mo, recompressée) + `deshydrateur-poster.jpg` |

## Déploiement
- Dépôt : https://github.com/Lubama04/coopdcva (branche `main`).
- Vercel : équipe `flaugust-dev`, projet `coop-dcva-site` (id `prj_nRKlQlVxoAPpEP0x34i8WCBHDuHE`), adresse https://coop-dcva-site-flaugust-dev.vercel.app. La protection de déploiement est désactivée : le site s'ouvre sans compte Vercel.
- L'intégration GitHub ↔ Vercel vient d'être connectée par l'utilisateur : un `git push` sur `main` doit déclencher un déploiement. À vérifier au premier push.

## Avant chaque livraison
`npm run lint` et `npm run build` sans erreur ; vérifier visuellement au moins l'accueil, `/galerie` et `/contact` en largeur mobile (390 px) et bureau ; commit clair en français ; `git push`.
