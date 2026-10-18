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
  email: "coop.dcva@gmail.com",
  phone: "+235 65 57 09 37",
  phoneHref: "tel:+23565570937",
  phones: [
    { display: "+235 65 57 09 37", href: "tel:+23565570937" },
    { display: "+235 63 33 16 89", href: "tel:+23563331689" },
    { display: "+235 98 28 36 70", href: "tel:+23598283670" },
  ],
  /** E-mail imprimé sur le dépliant officiel (conflit avec `email` : à trancher, voir A-CONFIRMER.md). */
  emailDepliant: "nangadoum999@gmail.com",
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
  { href: "/projets", label: "Nos projets" },
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

export type Filiere = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  products: string[];
  tone: "green" | "gold" | "brown" | "teal" | "clay";
};

export const filieres: Filiere[] = [
  {
    id: "cereales",
    title: "Céréales",
    tagline: "Maïs, riz local et sorgho",
    description:
      "Nous transformons les céréales cultivées au Tchad : mouture de la farine de maïs, décorticage et valorisation du riz local, transformation du sorgho.",
    products: ["Farine de maïs", "Riz local décortiqué", "Sorgho transformé"],
    tone: "gold",
  },
  {
    id: "oleagineux",
    title: "Oléagineux",
    tagline: "Sésame, balanites et karité",
    description:
      "Notre presse à huile motorisée valorise les graines oléagineuses du pays : huile de sésame, huile de balanites et beurre de karité.",
    products: ["Huile de sésame", "Huile de balanites", "Beurre de karité"],
    tone: "brown",
  },
  {
    id: "arachide",
    title: "Arachide",
    tagline: "Transformation et commercialisation",
    description:
      "L'arachide est transformée puis commercialisée par nos membres, de la matière première jusqu'au consommateur.",
    products: ["Arachide transformée"],
    tone: "clay",
  },
  {
    id: "spiruline",
    title: "Spiruline (dihé)",
    tagline: "Un trésor du lac Tchad",
    description:
      "La spiruline du lac Tchad, appelée dihé, est transformée et conditionnée par la coopérative pour être proposée dans de bonnes conditions d'hygiène.",
    products: ["Spiruline (dihé) conditionnée"],
    tone: "teal",
  },
  {
    id: "formation",
    title: "Formation",
    tagline: "Transmettre les savoir-faire",
    description:
      "Une formatrice accompagne nos membres dans les techniques de transformation, pour améliorer la qualité des produits et renforcer l'autonomie de chacune.",
    products: ["Techniques de transformation", "Accompagnement des membres"],
    tone: "green",
  },
];

export const equipements = [
  { title: "Moulin à farine", note: "Opérationnel" },
  { title: "Presse à huile motorisée", note: "Pour sésame, balanites, karité" },
  { title: "Moulin à dépéliculer le maïs et autres céréales", note: "Maïs et autres céréales" },
  { title: "Déshydrateur alimentaire", note: "Séchage et conservation" },
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
  { value: "5", label: "Filières actives" },
  { value: "4", label: "Projets de la coopérative" },
  { value: "4", label: "Équipements de transformation" },
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
      "Un site sécurisé au quartier Gassi, équipé d'un moulin à farine, d'une presse à huile motorisée, d'un moulin à dépéliculer le maïs et autres céréales et d'un déshydrateur alimentaire.",
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
      { label: "Presse à huile", value: "Motorisée" },
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

export type Categorie = "Moulins" | "Patate douce" | "Tomate";

export const galerieCategories: Categorie[] = ["Moulins", "Patate douce", "Tomate"];

export type Photo = {
  src: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  alt: string;
  categorie: Categorie;
};

/**
 * Titres = noms exacts des fichiers fournis par la coopérative (dossier Coop-DCVA/Image).
 * Pour ajouter une photo : la déposer dans public/images/galerie puis ajouter une ligne ici.
 */
export const galerie: Photo[] = [
  {
    src: "/images/galerie/depeliculer-1.jpg",
    width: 521,
    height: 1156,
    title: "Moulin à dépéliculer le maïs et autres céréales (1)",
    caption: "Le moulin à dépéliculer le maïs et autres céréales, au site de Gassi.",
    alt: "Trois personnes autour d'un moulin à dépéliculer rouge, les mains dans le grain",
    categorie: "Moulins",
  },
  {
    src: "/images/galerie/tomate-en-transformation.jpg",
    width: 486,
    height: 1080,
    title: "Tomate en transformation",
    caption: "Des membres disposent la tomate coupée en morceaux sur la claie.",
    alt: "Trois femmes en tenue bleue et blanche devant une grande claie couverte de tomate coupée en morceaux",
    categorie: "Tomate",
  },
  {
    src: "/images/galerie/moulin-farine-2.jpg",
    width: 521,
    height: 1156,
    title: "Moulin à farine (2)",
    caption: "Le moulin à farine de la coopérative.",
    alt: "Un homme penché sur le moulin à farine vert",
    categorie: "Moulins",
  },
  {
    src: "/images/galerie/beignets-patate-douce.jpg",
    width: 1042,
    height: 1026,
    title: "Beignets de patate douce",
    caption: "Des beignets de patate douce fabriqués par les membres.",
    alt: "Un grand plat rempli de beignets de patate douce torsadés",
    categorie: "Patate douce",
  },
  {
    src: "/images/galerie/moulin-farine-1.jpg",
    width: 521,
    height: 1156,
    title: "Moulin à farine (1)",
    caption: "Une membre de la coopérative à côté du moulin à farine.",
    alt: "Une femme debout à côté du moulin à farine vert",
    categorie: "Moulins",
  },
  {
    src: "/images/galerie/transformation-patate-douce.jpg",
    width: 1038,
    height: 1133,
    title: "Transformation de la patate douce",
    caption: "La patate douce en cours de transformation, séchée sur la claie.",
    alt: "Des lamelles de patate douce séchant sur une claie à maille verte",
    categorie: "Patate douce",
  },
  {
    src: "/images/galerie/depeliculer-2.jpg",
    width: 398,
    height: 551,
    title: "Moulin à dépéliculer le maïs et autres céréales (2)",
    caption: "Une membre de la coopérative à côté du moulin à dépéliculer.",
    alt: "Une femme en tenue imprimée rose posant à côté d'un moulin rouge",
    categorie: "Moulins",
  },
];

export const videoDeshydrateur = {
  src: "/videos/deshydrateur-alimentaire.mp4",
  poster: "/images/galerie/deshydrateur-poster.jpg",
  title: "Déshydrateur alimentaire",
  caption:
    "Séance de déshydratation de la tomate coupée en morceaux dans le déshydrateur alimentaire.",
};
