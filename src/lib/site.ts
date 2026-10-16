/**
 * Contenu central du site COOP-DCVA.
 * Toutes les informations viennent de la coopérative (fiche de présentation,
 * bannière officielle) et de sa page Facebook publique.
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
  facebook: "https://www.facebook.com/profile.php?id=61573061867030",
  president: "Mme Mémadji Reoutou Ngaroroum",
} as const;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/filieres", label: "Nos filières" },
  { href: "/projets", label: "Nos projets" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
] as const;

/** Les cinq axes d'intervention inscrits sur la bannière officielle. */
export const piliers = [
  "Production",
  "Renforcement des capacités",
  "Chaînes de valeur",
  "Accompagnement",
  "Agro-alimentaire",
] as const;

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
  { title: "Moulin à légumes", note: "Transformation des légumes" },
  { title: "Matériel de séchage", note: "Conservation des produits" },
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
      "Un site sécurisé au quartier Gassi, équipé d'un moulin à farine, d'une presse à huile motorisée, d'un moulin à légumes et de matériel de séchage.",
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
