# Guide de la coopérative : faire vivre son site

Ce guide explique, sans connaissances techniques, comment changer les informations du site de la COOP-DCVA. Presque tout se trouve dans **un seul fichier** : `src/lib/site.ts`.

> Le plus simple : envoyez vos changements (texte, photo, numéro) par WhatsApp ou e-mail à la personne qui gère le site. Elle les met en ligne en quelques minutes. Si vous voulez le faire vous-même, suivez ce guide.

## Comment modifier un fichier sans rien installer

1. Ouvrez https://github.com/Lubama04/coopdcva et connectez-vous (un accès doit vous être donné).
2. Cliquez sur le dossier `src`, puis `lib`, puis le fichier `site.ts`.
3. Cliquez sur le **crayon** (« Edit this file »), en haut à droite.
4. Faites votre changement, en gardant les guillemets `"…"` et les virgules.
5. En bas, cliquez sur **Commit changes**.
6. Attendez 1 à 2 minutes : le site se met à jour tout seul.

Si vous vous trompez, le site **ne casse pas** : si la nouvelle version contient une erreur, l'ancienne reste en ligne. Prévenez alors la personne qui gère le site.

## Changer un numéro de téléphone, l'e-mail ou l'adresse

Dans `site.ts`, au début du fichier, cherchez ces lignes et changez seulement ce qui est entre guillemets :

```
email: "coop.dcva@gmail.com",
phone: "+235 65 57 09 37",
addressDetail: "Rue du Lycée de Gassi, Quartier Gassi, N'Djaména",
```

Pour les téléphones, il y a deux écritures par numéro : l'affichage (`"+235 65 57 09 37"`) et le lien d'appel, sans espaces (`"tel:+23565570937"`). Changez les deux.

Le numéro WhatsApp s'écrit sans `+` ni espaces : `whatsapp: "https://wa.me/23565570937"`.

## Ajouter une photo dans la galerie

1. Renommez la photo **en minuscules, sans accents ni espaces**, par exemple `sechage-mangue.jpg`.
2. Dans GitHub, ouvrez `public/images/galerie/`, cliquez sur **Add file → Upload files**, déposez la photo et validez.
3. Dans `site.ts`, cherchez `export const galerie` et copiez un bloc existant, par exemple :

```
  {
    src: "/images/galerie/sechage-mangue.jpg",
    width: 1000,
    height: 750,
    title: "Séchage de la mangue",
    caption: "Ce que l'on voit sur la photo, en une phrase.",
    alt: "Description de la photo pour les personnes aveugles.",
    categorie: "Tomate",
  },
```

- `title` : le **nom officiel** de la photo, celui que vous lui donnez.
- `width` et `height` : la taille de la photo en pixels (clic droit sur la photo → Propriétés → Détails).
- `categorie` : `"Moulins"`, `"Patate douce"` ou `"Tomate"`. Pour une nouvelle catégorie, demandez à la personne qui gère le site.

Conseil : envoyez des photos prises en **mode paysage ou portrait, nettes, d'au moins 1 200 pixels de large**, et seulement avec l'accord des personnes photographiées.

## Ajouter un projet

Dans `site.ts`, cherchez `export const projets` et copiez un projet existant. Changez :

- `slug` : l'adresse de la page, en minuscules avec des tirets (`"jardin-de-moundou"` donne `/projets/jardin-de-moundou`) ;
- `title`, `subtitle`, `summary` : le nom et le résumé ;
- `statut` : `"en-cours"` ou `"a-venir"` ;
- `description`, `objectifs`, `details` : les paragraphes, les objectifs et la fiche « En bref ».

La page du projet et la liste des projets se mettent à jour automatiquement.

## Ajouter un partenaire

1. Déposez son logo (PNG ou JPG, fond blanc ou transparent) dans `public/images/partenaires/`.
2. Dans `site.ts`, cherchez `export const partenaires` et copiez une ligne :

```
  { name: "Nom du partenaire", logo: "/images/partenaires/nom.png", width: 300, height: 150 },
```

N'ajoutez un partenaire **qu'avec son accord**.

## Ce qu'il ne faut pas toucher

- Les fichiers en dehors de `src/lib/site.ts`, `public/images/` et `public/videos/`.
- Les mots avant les deux-points (`email:`, `title:`…) : seules les valeurs entre guillemets changent.

## Messages du formulaire de contact

Les messages envoyés depuis la page Contact arrivent dans la boîte **coop.dcva@gmail.com**. Pensez à vérifier aussi le dossier « Spam » les premières semaines. En répondant au message, vous répondez directement à la personne quand elle a donné son e-mail ; si elle a donné un téléphone, rappelez-la ou écrivez-lui sur WhatsApp.
