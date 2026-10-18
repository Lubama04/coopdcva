# Prompts pour Claude Code — site COOP-DCVA

Mode d'emploi : ouvrir Claude Code dans `L:\Flaugust dév\Coop-DCVA\Site`, vérifier que `CLAUDE.md` est lu (il contient tout le contexte), puis coller **un prompt à la fois**, dans l'ordre. Attendre la fin de chacun avant de passer au suivant.

---

## Prompt 0 — Relier le dossier à GitHub et assainir le dépôt

```
Lis CLAUDE.md puis AGENTS.md.

Le dossier Site\ est une copie du dépôt https://github.com/Lubama04/coopdcva (branche main) mais n'a pas de dossier .git.
1. Relie-le au dépôt SANS rien perdre : git init, git remote add origin, git fetch, puis git reset (mixed) sur origin/main. Vérifie avec git status que seuls des fichiers parasites apparaissent comme modifiés.
2. Supprime du suivi Git et ajoute à .gitignore : tsconfig.tsbuildinfo, .next/, node_modules/, .env*, *.tar.gz. Supprime l'archive coop-dcva-site.tar.gz présente dans le dossier.
3. npm install, npm run lint, npm run build. Corrige ce qui échoue.
4. Commit « Dépôt relié et nettoyé » et push sur main.
5. Vérifie dans Vercel (équipe flaugust-dev, projet coop-dcva-site) que ce push a bien déclenché un déploiement automatique de production. Si non, dis-moi exactement ce qui manque dans l'intégration GitHub ↔ Vercel au lieu de contourner.
Réponds en 5 lignes maximum.
```

---

## Prompt 1 — Lire le dépliant officiel et aligner le contenu

```
Contexte : Documentation\DEPLIANT COOP.pdf est une page scannée (image 2480x3507). L'extraction de texte ne donne presque rien : rasterise-la (pdftoppm -r 150) et REGARDE l'image, partie par partie (haut, milieu, bas), en recadrant si nécessaire.

Relève fidèlement :
- le slogan, la mission, la liste des domaines/axes (« Chaînes de valeur », « Renforcement des capacités », « Accompagnement », « MP agro-alimentaire », etc.),
- les mentions « Membres », « emplois dignes pour les jeunes »,
- les partenaires et leurs logos (je lis « Al-Nadjah » et peut-être un logo Airtel : à confirmer en regardant),
- le téléphone, l'e-mail et l'adresse imprimés.

Ensuite, compare avec src/lib/site.ts et les pages. Corrige tout ce qui diffère du dépliant. Règle absolue : ne rien inventer. Ce qui est illisible ou incertain va dans un fichier A-CONFIRMER.md à la racine, avec la question à poser à la cheffe de la coopérative.
Ajoute une section « Partenaires » (accueil ou à propos) UNIQUEMENT avec les partenaires que tu as pu lire avec certitude ; recadre leurs logos proprement depuis le dépliant et mets-les dans public/images/partenaires/.
Signale-moi le conflit d'e-mail (coop.dcva@gmail.com sur le site, nangadoum999@gmail.com sur le dépliant) sans le trancher.
Build, lint, commit, push.
```

---

## Prompt 2 — Logo vectoriel et identité visuelle

```
Documentation\LOGO COOP.pdf est le logo officiel. Vérifie s'il est vectoriel (pdftocairo -svg). Si oui, génère :
- un SVG propre du logo complet et de l'emblème seul (la pousse entre deux mains), à utiliser dans Header, Footer et page À propos à la place des PNG si le rendu est meilleur ;
- les favicons (icon.png 512, apple-icon.png 180) à partir de l'emblème.
Sinon garde les PNG actuels mais re-exporte-les en haute résolution depuis le PDF (300 dpi) avec fond transparent propre.
Le logo doit rester très net sur écran Retina et sur mobile. Ne change pas les couleurs du logo. Vérifie le contraste du texte « COOP-DCVA » dans l'en-tête.
Build, lint, commit, push.
```

---

## Prompt 3 — Galerie : contrôle final et enrichissement

```
Les titres de la galerie (src/lib/site.ts, tableau galerie et videoDeshydrateur) reprennent les noms officiels des fichiers de Image\. Contrôle :
1. Chaque titre = le nom de fichier officiel, mot pour mot (voir la table dans CLAUDE.md). Les légendes ne décrivent que ce qui est visible ou ce qui est dit par le nom : pas d'invention.
2. Le texte alternatif (alt) de chaque image est exact.
3. Sur la page d'accueil, les 4 photos de la bande « En images » : choisis-les pour la variété (un moulin, la tomate, la patate douce, un membre) et vérifie qu'aucune légende n'est coupée de façon laide.
4. Optimise : exporte les images en AVIF/WebP via next/image, garde les JPG d'origine dans un dossier hors public (ex. assets-originaux/ ignoré par Git si > 5 Mo). Remplace les originaux d'Image\ par les versions les plus grandes disponibles si la résolution actuelle (521x1156 pour plusieurs) est inférieure à celle des fichiers d'origine.
5. Vidéo : garde le MP4 recompressé (5 Mo), ajoute des sous-titres ou une transcription courte SEULEMENT si tu entends clairement de la parole ; sinon rien. Vérifie le poster et la lecture sur mobile (playsInline).
6. La visionneuse (dialog) : navigation clavier, focus rendu à la miniature à la fermeture, swipe tactile gauche/droite.
Quand la coopérative enverra de nouvelles photos : ajouter le fichier dans public/images/galerie/ avec un nom en minuscules sans accents, puis une entrée dans galerie avec le NOM OFFICIEL comme titre.
Build, lint, commit, push.
```

---

## Prompt 4 — Formulaire de contact réel

```
Le formulaire de src/components/ContactForm.tsx ouvre seulement le client mail (mailto). Remplace-le par un envoi réel, adapté à une connectivité limitée :
- Une route serveur (Route Handler) ou une Server Action qui valide les champs (nom, téléphone ou e-mail, message, anti-spam par champ piège + limite de débit simple) et envoie le message vers l'adresse de la coopérative.
- Fournisseur : propose-moi d'abord 2 options dans un tableau (Resend, Formspree, Supabase + Edge Function) avec coût et complexité, et attends mon choix avant de coder.
- Ajoute un bouton WhatsApp « Écrire sur WhatsApp » avec le numéro +235 65 57 09 37 (lien wa.me/23565570937 avec message prérempli), car c'est le canal le plus utilisé localement.
- États : envoi, succès, erreur réseau avec possibilité de réessayer, et repli sur mailto si l'envoi échoue.
- Aucune clé en dur : variables d'environnement, fichier .env.example, et dis-moi quelles variables créer dans Vercel (je les saisirai moi-même).
Accessibilité : labels, messages d'erreur liés aux champs (aria-describedby), focus géré.
Build, lint, commit, push.
```

---

## Prompt 5 — Carte et page Contact

```
La page /contact affiche une carte Google Maps incorporée par recherche textuelle (« Quartier Gassi, N'Djaména, Tchad »), donc imprécise.
- Demande-moi les coordonnées exactes ou le lien Google Maps de la fiche de la coopérative (je l'obtiendrai de la cheffe) ; en attendant, garde la carte actuelle.
- Quand tu as le lien : utilise l'iframe officiel (Partager > Intégrer), garde loading="lazy", un titre accessible, et le lien « Ouvrir dans Google Maps » ainsi qu'un lien « Itinéraire ».
- Ajoute les horaires d'ouverture seulement si la coopérative les fournit (sinon A-CONFIRMER.md).
Build, lint, commit, push.
```

---

## Prompt 6 — Informations manquantes à intégrer (à lancer quand la cheffe répond)

```
Je vais te coller les réponses de la cheffe de la coopérative. Pour chaque information :
- mets-la au bon endroit dans src/lib/site.ts ou dans la page concernée ;
- retire l'entrée correspondante de A-CONFIRMER.md ;
- ne rien extrapoler : si une réponse est ambiguë, pose la question.
Informations attendues : (1) e-mail officiel à afficher ; (2) numéro WhatsApp ; (3) lien Google Maps de la fiche ; (4) horaires ; (5) nombre exact de membres et répartition femmes / jeunes / personnes en situation de handicap ; (6) liste exacte des produits vendus avec prix et conditionnements, dont le nom exact des « Beignets de patate douce » et des produits séchés (tomate, patate douce) ; (7) liste des machines avec leur nom exact (moulin à farine, moulin à dépéliculer, presse à huile, déshydrateur) et leur capacité ; (8) équipe : noms et fonctions du gérant, du meunier, de la formatrice (avec accord pour la publication des photos et des noms) ; (9) partenaires et soutiens autorisés à être cités, avec logos ; (10) texte exact de PROVAL-ZD validé par la coopérative ; (11) autorisation d'utiliser les photos de membres (droit à l'image) ; (12) statut juridique : numéro d'enregistrement, récépissé ; (13) page Facebook : adresse officielle ; (14) nom de domaine souhaité.
Après intégration : build, lint, commit, push.
```

---

## Prompt 7 — Qualité, accessibilité, performance

```
Fais un audit complet puis corrige, dans cet ordre de priorité :
1. Mobile d'abord (390 px, connexion lente) : capture d'écran de chaque page avec Playwright (Chromium est installé), vérifie l'absence de défilement horizontal, le menu mobile, la lisibilité, la taille des zones tactiles (≥ 44 px).
2. Lighthouse (mobile) sur /, /galerie, /projets, /contact : vise ≥ 90 en Performance, Accessibilité, Bonnes pratiques et SEO. Corrige LCP, CLS, poids des images, polices.
3. Accessibilité WCAG 2.1 AA : contrastes (palette vert/ocre), ordre des titres, focus visibles, aria sur la visionneuse, prefers-reduced-motion respecté pour les animations (`sway`, `rise`).
4. Ajoute un petit jeu de tests Playwright (smoke) : chaque route répond 200, la redirection /proval-zd → /projets/proval-zd fonctionne, le filtre de la galerie et la visionneuse s'ouvrent, aucune erreur console. Script `npm run test:e2e`.
5. Sécurité : en-têtes (CSP raisonnable, X-Content-Type-Options, Referrer-Policy) dans next.config.ts ; aucun secret dans le dépôt.
Rapport en 10 lignes maximum, build, lint, commit, push.
```

---

## Prompt 8 — Mise en production (quand la coopérative valide)

```
La coopérative a validé le site. Prépare la mise en ligne :
1. Retire le noindex de src/app/layout.tsx ; ajoute sitemap.ts, robots.ts, balises Open Graph et Twitter par page, JSON-LD Organization complet (adresse, téléphones, logo, sameAs Facebook).
2. Domaine : je te donnerai le nom. Ajoute-le au projet Vercel (équipe flaugust-dev, projet coop-dcva-site) et donne-moi les enregistrements DNS exacts à saisir chez le registraire. Mets à jour metadataBase.
3. Prévois que l'hébergement puisse un jour passer chez la coopérative : documente dans README.md comment déployer ailleurs (Vercel, Coolify auto-hébergé, ou export statique).
4. Écris docs/GUIDE-COOPERATIVE.md en français simple : comment ajouter une photo, un projet, changer un numéro, sans toucher au code compliqué.
5. Statistiques : propose-moi Vercel Web Analytics ou Plausible (respect de la vie privée) en tableau comparatif avant d'installer quoi que ce soit.
Build, lint, commit, push, puis vérifie que la production répond en 200 sur toutes les routes.
```

---

## Prompt 9 — Documents commerciaux (hors code)

```
À partir du site terminé, prépare dans Documentation\ :
- Cahier des charges final du site (CDC) : périmètre réalisé, pages, fonctionnalités, hors périmètre.
- Devis en FCFA (conception, développement, intégration des contenus, hébergement la 1ère année, formation de la coopérative, maintenance mensuelle) avec marge et conditions de paiement mobile money ; propose-moi d'abord 3 formules (Essentielle / Standard / Complète).
- Lettre d'accompagnement à la responsable de la coopérative, ton respectueux et direct.
Ne chiffre rien sans me montrer d'abord les hypothèses de prix. Format Word (.docx) et PDF.
```
