/**
 * Contenu central du site COOP-DCVA.
 * Toutes les informations viennent de la coopérative (fiche de présentation,
 * dépliant officiel, bannière officielle) et de sa page Facebook publique.
 * Pour ajouter un projet, il suffit d'ajouter une entrée dans `projets` :
 * la page de liste et la page de détail se mettent à jour toutes seules.
 */

export const site = {
  name: "COOP-DCVA",
  fullName:
    "Coopérative de Production et de Développement des Chaînes de Valeur Agroalimentaires",
  slogan: "Qui ne se plante pas ne pousse jamais",
  founded: "10 juillet 2023",
  address: "Quartier Gassi, N'Djaména, Tchad",
  addressDetail: "Rue du Lycée de Gassi, Quartier Gassi, N'Djaména",
  /** E-mail officiel retenu le 18/10/2026 (le dépliant imprimé affiche une autre adresse, non utilisée). */
  email: "coop.dcva@gmail.com",
  phone: "+235 65 57 09 37",
  phoneHref: "tel:+23565570937",
  phones: [
    { display: "+235 65 57 09 37", href: "tel:+23565570937" },
    { display: "+235 63 33 16 89", href: "tel:+23563331689" },
    { display: "+235 98 28 36 70", href: "tel:+23598283670" },
  ],
  whatsapp: "https://wa.me/23565570937",
  whatsappMessage: "Bonjour COOP-DCVA, je vous écris depuis votre site internet.",
  facebook: "https://www.facebook.com/profile.php?id=61573061867030",
  president: "Mme Mémadji Reoutou Ngaroroum",
} as const;

export const whatsappHref = `${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/filieres", label: "Nos filières" },
  { href: "/produits", label: "Nos produits" },
  { href: "/projets", label: "Nos projets" },
  { href: "/actualites", label: "Actualités" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Les cinq activités, avec leurs intitulés exacts et leurs photos,
 * telles qu'elles figurent sur le dépliant officiel (Documentation/DEPLIANT COOP.pdf).
 * Les photos sont recadrées depuis le dépliant : aucune légende n'est ajoutée.
 */
export type Activite = {
  id: string;
  title: string;
  photos: { src: string; width: number; height: number; alt: string }[];
};

export const activites: Activite[] = [
  {
    id: "production",
    title: "Production des matières premières",
    photos: [
      { src: "/images/activites/production-1.jpg", width: 234, height: 268, alt: "Une femme debout au milieu d'un champ cultivé" },
      { src: "/images/activites/production-2.jpg", width: 240, height: 268, alt: "Une femme en tenue verte et blanche dans un champ labouré, un bol à la main" },
    ],
  },
  {
    id: "chaines-de-valeur",
    title: "Chaînes de valeur",
    photos: [
      { src: "/images/activites/chaines-de-valeur.jpg", width: 548, height: 344, alt: "Des sachets de farine conditionnés et étiquetés, empilés" },
    ],
  },
  {
    id: "renforcement",
    title: "Renforcement des capacités",
    photos: [
      { src: "/images/activites/renforcement-1.jpg", width: 550, height: 344, alt: "Des femmes en blouse blanche et charlotte, masquées, assises autour d'une bassine" },
      { src: "/images/activites/renforcement-2.jpg", width: 538, height: 344, alt: "Un groupe de femmes derrière une longue table de produits exposés" },
    ],
  },
  {
    id: "accompagnement",
    title: "Accompagnement",
    photos: [
      { src: "/images/activites/accompagnement.jpg", width: 568, height: 358, alt: "Un groupe de femmes et d'hommes réunis autour d'une table dans une salle" },
    ],
  },
  {
    id: "agro-alimentaire",
    title: "Agro-alimentaire",
    photos: [
      { src: "/images/activites/agro-alimentaire.jpg", width: 578, height: 358, alt: "Gros plan sur un produit séché en fines lamelles" },
    ],
  },
];

export type Visuel = { src: string; width: number; height: number; alt: string };

export type Filiere = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  products: string[];
  tone: "green" | "gold" | "brown" | "teal" | "clay";
  /** Absent when no photo of this filière has been provided yet. */
  photo?: Visuel;
};

/**
 * Filières de la coopérative : fiche de présentation, puis noms des photos
 * envoyées par la coopérative (dossier Image) et mentions lisibles sur les étiquettes.
 */
export const filieres: Filiere[] = [
  {
    id: "oleagineux",
    title: "Oléagineux et huiles végétales",
    tagline: "Savonnier (balanite), neem, ricin, citron, sésame",
    description:
      "Avec sa presse à huile motorisée et sa mini presse à huile, la coopérative et ses membres produisent des huiles végétales du Tchad : huile prodigieuse du savonnier, tirée des amandes du fruit du savonnier (balanite), huile de neem, huile de ricin, huile végétale de citron et huile de sésame.",
    products: [
      "Huile prodigieuse du savonnier (balanite)",
      "Huile de neem",
      "Huile de ricin",
      "Huile végétale de citron",
      "Huile de sésame",
    ],
    tone: "gold",
    photo: {
      src: "/images/galerie/filieres-oleagineuses.jpg",
      width: 712,
      height: 591,
      alt: "Bouteilles d'huile prodigieuse du savonnier et d'huile de balanite alignées sur une étagère",
    },
  },
  {
    id: "karite",
    title: "Karité",
    tagline: "Le beurre de karité du Tchad",
    description:
      "La coopérative valorise le beurre de karité du Tchad. Elle le propose notamment en beurre de karité à la carotte, composé de beurre de karité, de carotte et de cire d'abeilles, en pot de 250 g. Elle a participé à la conférence sur la valorisation du beurre de karité du Tchad.",
    products: ["Beurre de karité", "Beurre de karité carotte (250 g)"],
    tone: "clay",
    photo: {
      src: "/images/galerie/beurre-karite-carotte.jpg",
      width: 1260,
      height: 1400,
      alt: "Pot de beurre de karité carotte de 250 g, étiqueté COOP-DCVA",
    },
  },
  {
    id: "spiruline",
    title: "Spiruline (dihé)",
    tagline: "Diyé du Tchad, issue du lac Tchad",
    description:
      "La spiruline du lac Tchad, appelée dihé, est conditionnée par la coopérative en sachets de 1 kg sous le nom « Diyé du Tchad (Spiruline) », issue des sources naturelles du lac Tchad. L'étiquette la présente comme complément alimentaire et agent cosmétique.",
    products: ["Diyé du Tchad (spiruline), sachet de 1 kg"],
    tone: "teal",
    photo: {
      src: "/images/galerie/spiruline-dihe-du-tchad.jpg",
      width: 940,
      height: 893,
      alt: "Sachet de 1 kg de Diyé du Tchad (spiruline) étiqueté COOP-DCVA, rempli de poudre verte",
    },
  },
  {
    id: "ronier",
    title: "Tubercule de rônier",
    tagline: "Farine de tubercule de rônier",
    description:
      "La coopérative transforme le tubercule de rônier en farine. Elle est conditionnée en sachets sous le nom « Poudre de Djabra », sous la marque COOP-DCVA et sous celle de MaPerle, membre de la coopérative.",
    products: ["Farine de tubercule de rônier (Poudre de Djabra)"],
    tone: "brown",
    photo: {
      src: "/images/galerie/farine-tubercule-ronier.jpg",
      width: 1280,
      height: 591,
      alt: "Une vingtaine de sachets de Poudre de Djabra aux marques COOP-DCVA et MaPerle",
    },
  },
  {
    id: "nere",
    title: "Néré",
    tagline: "Valorisation des produits non ligneux (PNL)",
    description:
      "Dans le cadre de la valorisation des produits non ligneux, la coopérative transforme les graines de néré : Ndii Dawdawa en sachets de 150 g sous la marque COOP-DCVA, et Soum-mbala « Sauce du chef » chez MaPerle, membre de la coopérative.",
    products: ["Ndii Dawdawa (150 g)", "Soum-mbala « Sauce du chef »"],
    tone: "green",
    photo: {
      src: "/images/galerie/nere-pnl.jpg",
      width: 1280,
      height: 591,
      alt: "Sachets de Ndii Dawdawa de 150 g, un sachet de Soum-mbala et des pots d'épices",
    },
  },
  {
    id: "patate-tomate",
    title: "Patate douce et tomate",
    tagline: "Séchage et transformation",
    description:
      "Grâce au déshydrateur alimentaire, la tomate coupée en morceaux et les lamelles de patate douce sont séchées sur claies. La patate douce est aussi transformée en beignets par les membres.",
    products: ["Tomate séchée", "Patate douce séchée", "Beignets de patate douce"],
    tone: "clay",
    photo: {
      src: "/images/galerie/tomate-en-transformation.jpg",
      width: 486,
      height: 1080,
      alt: "Trois femmes en tenue bleue et blanche devant une grande claie couverte de tomate coupée en morceaux",
    },
  },
  {
    id: "cereales",
    title: "Céréales",
    tagline: "Maïs, riz local et sorgho",
    description:
      "Nous transformons les céréales cultivées au Tchad : mouture de la farine de maïs, décorticage et valorisation du riz local, transformation du sorgho.",
    products: ["Farine de maïs", "Riz local décortiqué", "Sorgho transformé"],
    tone: "gold",
    photo: {
      src: "/images/galerie/moulin-farine-2.jpg",
      width: 521,
      height: 1156,
      alt: "Un homme penché sur le moulin à farine vert",
    },
  },
  {
    id: "arachide",
    title: "Arachide",
    tagline: "Transformation et commercialisation",
    description:
      "L'arachide est transformée puis commercialisée par nos membres, de la matière première jusqu'au consommateur.",
    products: ["Arachide transformée"],
    tone: "brown",
  },
  {
    id: "formation",
    title: "Formation",
    tagline: "Renforcer les capacités des membres",
    description:
      "Une formatrice accompagne les membres dans les techniques de transformation. La coopérative mène notamment le renforcement des capacités en production de la farine infantile.",
    products: ["Production de farine infantile", "Techniques de transformation", "Accompagnement des membres"],
    tone: "green",
    photo: {
      src: "/images/galerie/farine-infantile.jpg",
      width: 1280,
      height: 853,
      alt: "Cinq personnes en blouse et charlotte blanches présentent des sachets et des flacons devant un moulin vert",
    },
  },
];

export type Produit = {
  nom: string;
  detail: string;
  filiere: Filiere["id"];
  photo: Visuel;
};

/** Produits photographiés par la coopérative ; libellés repris des étiquettes. */
export const produits: Produit[] = [
  {
    nom: "Beurre de karité carotte",
    detail: "Pot de 250 g · beurre de karité, carotte, cire d'abeilles",
    filiere: "karite",
    photo: { src: "/images/galerie/beurre-karite-carotte.jpg", width: 1260, height: 1400, alt: "Pot de beurre de karité carotte de 250 g" },
  },
  {
    nom: "Huile prodigieuse du savonnier",
    detail: "Huile des amandes du fruit du savonnier (balanite) · Made in Chad",
    filiere: "oleagineux",
    photo: { src: "/images/galerie/huile-savonnier.jpg", width: 873, height: 1400, alt: "Flacon d'huile prodigieuse du savonnier" },
  },
  {
    nom: "Huile de neem",
    detail: "Huile végétale",
    filiere: "oleagineux",
    photo: { src: "/images/galerie/huile-neem.jpg", width: 946, height: 1400, alt: "Flacon d'huile végétale de neem" },
  },
  {
    nom: "Huile de ricin",
    detail: "Huile végétale",
    filiere: "oleagineux",
    photo: { src: "/images/galerie/huile-ricin.jpg", width: 1053, height: 1400, alt: "Flacon d'huile de ricin" },
  },
  {
    nom: "Huile végétale de citron",
    detail: "100 % naturelle · flacon vaporisateur",
    filiere: "oleagineux",
    photo: { src: "/images/galerie/huile-citron-2.jpg", width: 1007, height: 1400, alt: "Flacon vaporisateur d'huile végétale de citron" },
  },
  {
    nom: "Diyé du Tchad (spiruline)",
    detail: "Sachet de 1 kg · sources naturelles du lac Tchad",
    filiere: "spiruline",
    photo: { src: "/images/galerie/spiruline-dihe-du-tchad.jpg", width: 940, height: 893, alt: "Sachet de 1 kg de Diyé du Tchad" },
  },
  {
    nom: "Poudre de Djabra",
    detail: "Farine de tubercule de rônier · sachets",
    filiere: "ronier",
    photo: { src: "/images/galerie/farine-tubercule-ronier.jpg", width: 1280, height: 591, alt: "Sachets de Poudre de Djabra" },
  },
  {
    nom: "Ndii Dawdawa",
    detail: "Néré · sachet de 150 g",
    filiere: "nere",
    photo: { src: "/images/galerie/nere-pnl.jpg", width: 1280, height: 591, alt: "Sachets de Ndii Dawdawa de 150 g" },
  },
];

export function commanderHref(nom: string) {
  return `${site.whatsapp}?text=${encodeURIComponent(
    `Bonjour COOP-DCVA, je souhaite des informations (prix, disponibilité) sur : ${nom}.`,
  )}`;
}

export const equipements = [
  { title: "Moulin à farine", note: "Opérationnel" },
  { title: "Presse à huile motorisée", note: "Graines et amandes oléagineuses" },
  { title: "Mini presse à huile", note: "Extraction d'huiles végétales" },
  { title: "Moulin à dépéliculer le maïs et autres céréales", note: "Maïs et autres céréales" },
  { title: "Déshydrateur alimentaire", note: "Séchage de la tomate, de la patate douce…" },
  { title: "Site de production sécurisé", note: "Quartier Gassi, N'Djaména" },
];

export const valeurs = [
  {
    title: "Autonomisation économique",
    text: "Donner aux femmes et aux jeunes les moyens de gagner leur vie par leur travail.",
  },
  {
    title: "Économie circulaire, zéro déchet",
    text: "Chercher à valoriser chaque ressource et à limiter les pertes tout au long de la chaîne.",
  },
  {
    title: "Ressources locales",
    text: "Mettre en valeur les produits agroalimentaires tchadiens, de la graine à l'assiette.",
  },
  {
    title: "Qualité et normes sanitaires",
    text: "Démarche de certification en cours pour garantir des produits sûrs.",
  },
];

export const chiffres = [
  { value: "2023", label: "Année de création" },
  { value: String(filieres.length), label: "Filières" },
  { value: String(produits.length), label: "Produits présentés" },
  { value: String(equipements.length - 1), label: "Équipements de transformation" },
];

export const equipe = [
  { role: "Gérant opérationnel", text: "Pilote la production et le quotidien du site de Gassi." },
  { role: "Meunier", text: "Assure la mouture et le fonctionnement du moulin." },
  { role: "Formatrice", text: "Forme les membres aux techniques de transformation." },
];

export const soutiens = [{ name: "USAID", text: "Financement obtenu" }];

export type Organisation = { name: string; logo: string; width: number; height: number; note?: string };

/** « Membres » et « Partenaires » : noms et logos lus sur le dépliant officiel. */
export const membres: Organisation[] = [
  { name: "MaPerle Natural Products", logo: "/images/partenaires/maperle.png", width: 307, height: 186 },
  {
    name: "CIFTA — Centre intégré de formation et de transformation agro-alimentaire",
    logo: "/images/partenaires/cifta.png",
    width: 185,
    height: 180,
  },
  { name: "Soumsoumna", logo: "/images/partenaires/soumsoumna.png", width: 144, height: 190 },
];

export const partenaires: Organisation[] = [
  {
    name: "Job Booster",
    note: "Emplois dignes pour les jeunes",
    logo: "/images/partenaires/job-booster.png",
    width: 322,
    height: 174,
  },
  { name: "Bet Al-Nadjah", logo: "/images/partenaires/bet-al-nadjah.png", width: 166, height: 186 },
  {
    name: "Chambre de Commerce, d'Industrie, d'Agriculture, des Mines et d'Artisanat",
    logo: "/images/partenaires/chambre-de-commerce.png",
    width: 182,
    height: 180,
  },
  { name: "Airtel", logo: "/images/partenaires/airtel.png", width: 179, height: 177 },
];

/* ------------------------------------------------------------------ */
/* Projets                                                             */
/* ------------------------------------------------------------------ */

export type ProjetStatut = "en-cours" | "a-venir";

export type Projet = {
  slug: string;
  title: string;
  subtitle: string;
  statut: ProjetStatut;
  summary: string;
  description: string[];
  objectifs: string[];
  details: { label: string; value: string }[];
  /** Pour les projets à venir : comment les partenaires peuvent contribuer. */
  partenariats?: { title: string; text: string }[];
  tone: Filiere["tone"];
};

export const statutLabel: Record<ProjetStatut, string> = {
  "en-cours": "En cours",
  "a-venir": "À venir · partenaires recherchés",
};

export const projets: Projet[] = [
  {
    slug: "proval-zd",
    title: "PROVAL-ZD",
    subtitle: "Changer d'échelle sur trois ans",
    statut: "a-venir",
    summary:
      "Un projet de 36 mois pour toucher 500 bénéficiaires directs, dont 80 % de femmes, à N'Djaména, Moundou et Doba. Il attend ses partenaires.",
    description: [
      "PROVAL-ZD est le grand projet de la COOP-DCVA pour les années à venir. Il prolonge le travail engagé à Gassi et l'étend à trois villes du pays.",
      "Le projet est prêt à être porté : la coopérative recherche des partenaires techniques et financiers pour en assurer le lancement.",
    ],
    objectifs: [
      "Toucher 500 bénéficiaires directs, dont 80 % de femmes",
      "Renforcer la production et la transformation agroalimentaires locales",
      "Soutenir l'autonomisation économique des femmes et des jeunes",
      "Intervenir à N'Djaména, Moundou et Doba",
    ],
    details: [
      { label: "Budget recherché", value: "110 000 000 FCFA" },
      { label: "Durée", value: "36 mois" },
      { label: "Bénéficiaires directs", value: "500 personnes" },
      { label: "Part de femmes visée", value: "80 %" },
      { label: "Zones d'intervention", value: "N'Djaména · Moundou · Doba" },
    ],
    partenariats: [
      {
        title: "Financement",
        text: "Contribuer au budget du projet en tant que partenaire technique et financier.",
      },
      {
        title: "Expertise technique",
        text: "Accompagner la coopérative en normes sanitaires, qualité, gestion ou commercialisation.",
      },
      {
        title: "Débouchés commerciaux",
        text: "Ouvrir des marchés aux produits transformés par nos membres.",
      },
    ],
    tone: "gold",
  },
  {
    slug: "site-de-production-gassi",
    title: "Site de production de Gassi",
    subtitle: "Un outil de transformation en activité",
    statut: "en-cours",
    summary:
      "Un site sécurisé au quartier Gassi, équipé d'un moulin à farine, d'une presse à huile motorisée, d'une mini presse à huile, d'un moulin à dépéliculer le maïs et autres céréales et d'un déshydrateur alimentaire.",
    description: [
      "Le site de Gassi est le cœur de la coopérative. C'est là que les céréales, les graines oléagineuses et la spiruline sont transformées et conditionnées.",
      "Son équipement a été réuni grâce à un financement de l'USAID.",
    ],
    objectifs: [
      "Transformer localement les céréales et les graines",
      "Assurer le séchage et la conservation des produits",
      "Offrir aux membres un lieu de travail sécurisé",
    ],
    details: [
      { label: "Lieu", value: "Quartier Gassi, N'Djaména" },
      { label: "Moulin à farine", value: "Opérationnel" },
      { label: "Presse à huile", value: "Motorisée + mini presse" },
      { label: "Financement", value: "USAID" },
    ],
    tone: "brown",
  },
  {
    slug: "formation-des-membres",
    title: "Formation et renforcement des capacités",
    subtitle: "Transmettre les savoir-faire",
    statut: "en-cours",
    summary:
      "Une formatrice accompagne les membres dans les techniques de transformation pour améliorer la qualité des produits.",
    description: [
      "Le renforcement des capacités est l'un des axes d'action de la COOP-DCVA. Une formatrice fait partie de l'équipe permanente.",
      "Les formations visent l'autonomie des membres, femmes et jeunes en priorité.",
    ],
    objectifs: [
      "Former les membres aux techniques de transformation",
      "Améliorer la qualité et la régularité des produits",
      "Renforcer l'autonomie économique de chacune",
    ],
    details: [
      { label: "Encadrement", value: "Une formatrice permanente" },
      { label: "Public", value: "Femmes et jeunes" },
      { label: "Lieu", value: "Site de Gassi" },
    ],
    tone: "green",
  },
  {
    slug: "certification-normes-sanitaires",
    title: "Certification et normes sanitaires",
    subtitle: "Des produits sûrs et reconnus",
    statut: "en-cours",
    summary:
      "La coopérative a engagé une démarche pour obtenir les certifications et respecter les normes sanitaires de ses filières.",
    description: [
      "Pour vendre plus largement et rassurer ses clients, la COOP-DCVA s'engage dans une démarche de certification.",
      "Cette démarche est en cours d'obtention. Elle est l'un des domaines où un partenaire technique peut apporter beaucoup.",
    ],
    objectifs: [
      "Respecter les normes sanitaires de chaque filière",
      "Obtenir les certifications nécessaires à la commercialisation",
      "Garantir des produits sûrs pour les consommateurs",
    ],
    details: [
      { label: "Statut", value: "Démarche en cours" },
      { label: "Filières concernées", value: "Toutes" },
    ],
    tone: "teal",
  },
];

export function getProjet(slug: string): Projet | undefined {
  return projets.find((p) => p.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Galerie                                                             */
/* ------------------------------------------------------------------ */

export type Categorie =
  | "Huiles et karité"
  | "Spiruline"
  | "Rônier et néré"
  | "Patate douce et tomate"
  | "Équipements"
  | "Formation et événements";

export const galerieCategories: Categorie[] = [
  "Huiles et karité",
  "Spiruline",
  "Rônier et néré",
  "Patate douce et tomate",
  "Équipements",
  "Formation et événements",
];

export type Photo = Visuel & {
  title: string;
  caption: string;
  categorie: Categorie;
};

/**
 * Titres = noms des fichiers fournis par la coopérative (dossier Coop-DCVA/Image).
 * Pour ajouter une photo : la déposer dans public/images/galerie puis ajouter une ligne ici.
 */
export const galerie: Photo[] = [
  {
    src: "/images/galerie/conference-karite.jpg",
    width: 1600,
    height: 1200,
    title: "Participation à la conférence sur la valorisation du beurre de karité du Tchad",
    caption: "Une photo significative de la participation de la coopérative à la conférence sur la valorisation du beurre de karité du Tchad.",
    alt: "Trois femmes souriantes derrière un stand garni de pots de beurre de karité, devant un drapeau du Tchad",
    categorie: "Formation et événements",
  },
  {
    src: "/images/galerie/depeliculer-1.jpg",
    width: 521,
    height: 1156,
    title: "Moulin à dépéliculer le maïs et autres céréales (1)",
    caption: "Le moulin à dépéliculer le maïs et autres céréales, au site de Gassi.",
    alt: "Trois personnes autour d'un moulin à dépéliculer rouge, les mains dans le grain",
    categorie: "Équipements",
  },
  {
    src: "/images/galerie/beurre-karite-carotte.jpg",
    width: 1260,
    height: 1400,
    title: "Beurre de karité et carotte",
    caption: "Beurre de karité carotte en pot de 250 g : beurre de karité, carotte et cire d'abeilles.",
    alt: "Pot de beurre de karité carotte de 250 g, étiqueté COOP-DCVA",
    categorie: "Huiles et karité",
  },
  {
    src: "/images/galerie/spiruline-dihe-du-tchad.jpg",
    width: 940,
    height: 893,
    title: "Spiruline, Dihé du Tchad",
    caption: "La Diyé du Tchad (spiruline), issue des sources naturelles du lac Tchad, en sachet de 1 kg.",
    alt: "Sachet de 1 kg de Diyé du Tchad (spiruline) étiqueté COOP-DCVA, rempli de poudre verte",
    categorie: "Spiruline",
  },
  {
    src: "/images/galerie/farine-infantile.jpg",
    width: 1280,
    height: 853,
    title: "Renforcement des capacités en production de la farine infantile",
    caption: "Les participants présentent les produits réalisés, devant le moulin.",
    alt: "Cinq personnes en blouse et charlotte blanches présentent des sachets et des flacons devant un moulin vert",
    categorie: "Formation et événements",
  },
  {
    src: "/images/galerie/tomate-en-transformation.jpg",
    width: 486,
    height: 1080,
    title: "Tomate en transformation",
    caption: "Des membres disposent la tomate coupée en morceaux sur la claie.",
    alt: "Trois femmes en tenue bleue et blanche devant une grande claie couverte de tomate coupée en morceaux",
    categorie: "Patate douce et tomate",
  },
  {
    src: "/images/galerie/huile-savonnier.jpg",
    width: 873,
    height: 1400,
    title: "Huile prodigieuse du savonnier",
    caption: "L'huile prodigieuse du savonnier, fabriquée au Tchad.",
    alt: "Flacon d'huile prodigieuse du savonnier",
    categorie: "Huiles et karité",
  },
  {
    src: "/images/galerie/farine-tubercule-ronier.jpg",
    width: 1280,
    height: 591,
    title: "Farine de tubercule de rônier",
    caption: "Filière tubercule de rônier : la farine, conditionnée en sachets de Poudre de Djabra.",
    alt: "Une vingtaine de sachets de Poudre de Djabra aux marques COOP-DCVA et MaPerle",
    categorie: "Rônier et néré",
  },
  {
    src: "/images/galerie/moulin-farine-2.jpg",
    width: 521,
    height: 1156,
    title: "Moulin à farine (2)",
    caption: "Le moulin à farine de la coopérative.",
    alt: "Un homme penché sur le moulin à farine vert",
    categorie: "Équipements",
  },
  {
    src: "/images/galerie/huile-neem.jpg",
    width: 946,
    height: 1400,
    title: "Huile de Neem",
    caption: "Huile végétale de neem.",
    alt: "Flacon d'huile végétale de neem",
    categorie: "Huiles et karité",
  },
  {
    src: "/images/galerie/nere-pnl.jpg",
    width: 1280,
    height: 591,
    title: "Valorisation des PNL — filière néré",
    caption: "Ndii Dawdawa en sachets de 150 g et Soum-mbala « Sauce du chef ».",
    alt: "Sachets de Ndii Dawdawa de 150 g, un sachet de Soum-mbala et des pots d'épices",
    categorie: "Rônier et néré",
  },
  {
    src: "/images/galerie/beignets-patate-douce.jpg",
    width: 1042,
    height: 1026,
    title: "Beignets de patate douce",
    caption: "Des beignets de patate douce fabriqués par les membres.",
    alt: "Un grand plat rempli de beignets de patate douce torsadés",
    categorie: "Patate douce et tomate",
  },
  {
    src: "/images/galerie/filieres-oleagineuses.jpg",
    width: 712,
    height: 591,
    title: "Nos filières oléagineuses",
    caption: "Huile prodigieuse du savonnier et huile de balanite, tirée des amandes du fruit du savonnier.",
    alt: "Bouteilles d'huile prodigieuse du savonnier et d'huile de balanite alignées sur une étagère",
    categorie: "Huiles et karité",
  },
  {
    src: "/images/galerie/mini-presse-huile.jpg",
    width: 444,
    height: 951,
    title: "Mini Presse huile",
    caption: "La mini presse à huile de la coopérative.",
    alt: "Une mini presse à huile en inox posée sur une table",
    categorie: "Équipements",
  },
  {
    src: "/images/galerie/spiruline-du-tchad.jpg",
    width: 1080,
    height: 500,
    title: "Spiruline du Tchad",
    caption: "Sachets de Diyé du Tchad (spiruline) présentés lors d'une exposition.",
    alt: "Sachets de spiruline étiquetés COOP-DCVA sur une table d'exposition",
    categorie: "Spiruline",
  },
  {
    src: "/images/galerie/moulin-farine-1.jpg",
    width: 521,
    height: 1156,
    title: "Moulin à farine (1)",
    caption: "Une membre de la coopérative à côté du moulin à farine.",
    alt: "Une femme debout à côté du moulin à farine vert",
    categorie: "Équipements",
  },
  {
    src: "/images/galerie/huile-citron.jpg",
    width: 1280,
    height: 591,
    title: "Huile de citron",
    caption: "Flacons d'huile végétale de citron, 100 % naturelle.",
    alt: "Rangée de flacons d'huile végétale de citron",
    categorie: "Huiles et karité",
  },
  {
    src: "/images/galerie/transformation-patate-douce.jpg",
    width: 1038,
    height: 1133,
    title: "Transformation de la patate douce",
    caption: "La patate douce en cours de transformation, séchée sur la claie.",
    alt: "Des lamelles de patate douce séchant sur une claie à maille verte",
    categorie: "Patate douce et tomate",
  },
  {
    src: "/images/galerie/huile-ricin.jpg",
    width: 1053,
    height: 1400,
    title: "Huile de Ricin",
    caption: "Huile de ricin.",
    alt: "Flacon d'huile de ricin",
    categorie: "Huiles et karité",
  },
  {
    src: "/images/galerie/depeliculer-2.jpg",
    width: 398,
    height: 551,
    title: "Moulin à dépéliculer le maïs et autres céréales (2)",
    caption: "Une membre de la coopérative à côté du moulin à dépéliculer.",
    alt: "Une femme en tenue imprimée rose posant à côté d'un moulin rouge",
    categorie: "Équipements",
  },
  {
    src: "/images/galerie/huile-citron-2.jpg",
    width: 1007,
    height: 1400,
    title: "Huile de citron (2)",
    caption: "Huile végétale de citron en flacon vaporisateur.",
    alt: "Flacon vaporisateur d'huile végétale de citron",
    categorie: "Huiles et karité",
  },
];

/* ------------------------------------------------------------------ */
/* Actualités                                                          */
/* ------------------------------------------------------------------ */

export type Actualite = {
  slug: string;
  title: string;
  /** ISO date (AAAA-MM-JJ). Laisser vide si la date n'est pas connue : elle n'est alors pas affichée. */
  date?: string;
  categorie: "Événement" | "Formation" | "Produits" | "Projet" | "Vie de la coopérative";
  resume: string;
  contenu: string[];
  photo: Visuel;
  /** Filière liée (lien « Découvrir la filière »). */
  filiere?: Filiere["id"];
};

/**
 * Actualités, de la plus récente à la plus ancienne.
 * Pour en publier une : copier un bloc, changer le texte et la photo.
 */
export const actualites: Actualite[] = [
  {
    slug: "conference-valorisation-beurre-de-karite-du-tchad",
    title: "La COOP-DCVA à la conférence sur la valorisation du beurre de karité du Tchad",
    categorie: "Événement",
    resume:
      "La coopérative a participé à la conférence sur la valorisation du beurre de karité du Tchad, où ses membres ont présenté le beurre de karité qu'elle produit.",
    contenu: [
      "La COOP-DCVA a pris part à la conférence sur la valorisation du beurre de karité du Tchad. Sur le stand, ses membres ont présenté le beurre de karité produit par la coopérative.",
      "Cette participation s'inscrit dans le développement de la filière karité de la coopérative, qui propose notamment un beurre de karité à la carotte, en pot de 250 g, composé de beurre de karité, de carotte et de cire d'abeilles.",
    ],
    photo: {
      src: "/images/galerie/conference-karite.jpg",
      width: 1600,
      height: 1200,
      alt: "Trois femmes souriantes derrière un stand garni de pots de beurre de karité, devant un drapeau du Tchad",
    },
    filiere: "karite",
  },
  {
    slug: "renforcement-des-capacites-farine-infantile",
    title: "Renforcement des capacités en production de la farine infantile",
    categorie: "Formation",
    resume:
      "La coopérative a mené un renforcement des capacités consacré à la production de la farine infantile.",
    contenu: [
      "Former ses membres est l'un des axes d'action de la COOP-DCVA. Une session de renforcement des capacités a été consacrée à la production de la farine infantile.",
      "En blouse et charlotte, les participants présentent les produits réalisés, devant un moulin.",
    ],
    photo: {
      src: "/images/galerie/farine-infantile.jpg",
      width: 1280,
      height: 853,
      alt: "Cinq personnes en blouse et charlotte blanches présentent des sachets et des flacons devant un moulin vert",
    },
    filiere: "formation",
  },
];

export function getActualite(slug: string): Actualite | undefined {
  return actualites.find((a) => a.slug === slug);
}

export function dateLongue(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return `${d} ${mois[m - 1]} ${y}`;
}

export const videoDeshydrateur = {
  src: "/videos/deshydrateur-alimentaire.mp4",
  poster: "/images/galerie/deshydrateur-poster.jpg",
  title: "Déshydrateur alimentaire",
  caption:
    "Séance de déshydratation de la tomate coupée en morceaux dans le déshydrateur alimentaire.",
};
