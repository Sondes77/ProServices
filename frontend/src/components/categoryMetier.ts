export type Categorie =
  | 'Bâtiment & Travaux'
  | 'Installation & Équipement'
  | 'Réparation & Maintenance'
  | 'Maison & Intérieur'
  | 'Extérieur & Jardin'
  | 'Nettoyage'
  | 'Transport & Déménagement'
  | 'Sécurité'
  | 'Électricité & Électronique'
  | 'Services techniques spécialisés';

export const Metier: Record<Categorie, string[]> = {

  "Bâtiment & Travaux": [
    "Maçon",
    "Entrepreneur bâtiment",
    "Chef de chantier",
    "Terrassier",
    "Coffreur",
    "Ferrailleur",
    "Plâtrier",
    "Façadier",
    "Étancheur",
    "Poseur marbre",
    "Carreleur",
    "Poseur parquet",
    "Constructeur maison",
    "Rénovation générale",
    "Extension maison",
    "Démolition",
    "Isolation thermique",
    "Isolation phonique"
  ],

  "Installation & Équipement": [
    "Installateur climatiseur",
    "Installateur chauffe-eau",
    "Installateur cuisine",
    "Installateur sanitaire",
    "Installateur panneaux solaires",
    "Installateur pompe à chaleur",
    "Installateur antenne",
    "Installateur parabole",
    "Monteur meuble",
    "Poseur porte",
    "Poseur fenêtre",
    "Poseur portail",
    "Poseur rideau métallique",
    "Installateur réseau eau",
    "Installateur gaz"
  ],

  "Réparation & Maintenance": [
    "Dépannage plomberie",
    "Dépannage électrique",
    "Réparation climatiseur",
    "Réparation électroménager",
    "Réparation frigo",
    "Réparation machine à laver",
    "Réparation four",
    "Réparation TV",
    "Réparation PC",
    "Réparation téléphone",
    "Maintenance industrielle",
    "Maintenance bâtiment",
    "Technicien maintenance",
    "Dépannage urgent",
    "Homme à tout faire",
    "Multi-services"
  ],

  "Maison & Intérieur": [
    "Peintre",
    "Décorateur intérieur",
    "Designer intérieur",
    "Menuisier bois",
    "Menuisier aluminium",
    "Menuisier PVC",
    "Ébéniste",
    "Tapissier",
    "Poseur papier peint",
    "Poseur faux plafond",
    "Poseur placo",
    "Aménagement cuisine",
    "Aménagement dressing",
    "Aménagement placard"
  ],

  "Extérieur & Jardin": [
    "Jardinier",
    "Paysagiste",
    "Élagage arbres",
    "Taille haies",
    "Entretien jardin",
    "Arrosage automatique",
    "Pose gazon",
    "Pose gazon synthétique",
    "Aménagement extérieur",
    "Clôturiste",
    "Pose clôture",
    "Pose pergola",
    "Terrasse bois",
    "Terrasse carrelage",
    "Nettoyage extérieur"
  ],

  "Nettoyage": [
    "Nettoyage maison",
    "Nettoyage appartement",
    "Nettoyage bureau",
    "Nettoyage chantier",
    "Nettoyage vitres",
    "Nettoyage canapé",
    "Nettoyage tapis",
    "Nettoyage fin de chantier",
    "Désinfection",
    "Dératisation",
    "Désinsectisation",
    "Traitement nuisibles"
  ],

  "Transport & Déménagement": [
    "Déménageur",
    "Transporteur",
    "Livraison meubles",
    "Livraison électroménager",
    "Location camion avec chauffeur",
    "Monte-meuble",
    "Transport colis",
    "Transport matériaux",
    "Transport chantier"
  ],

  "Sécurité": [
    "Installateur caméras",
    "Installateur alarme",
    "Technicien vidéosurveillance",
    "Contrôle accès",
    "Interphone",
    "Portier vidéo",
    "Agent sécurité",
    "Audit sécurité",
    "Systèmes anti-intrusion"
  ],

  "Électricité & Électronique": [
    "Électricien",
    "Électricien industriel",
    "Câblage réseau",
    "Technicien réseau",
    "Installateur fibre",
    "Domoticien",
    "Smart home",
    "Automatisme",
    "Réparation électronique",
    "Carte électronique",
    "Soudure électronique"
  ],

  "Services techniques spécialisés": [
    "Frigoriste",
    "Technicien HVAC",
    "Technicien solaire",
    "Technicien piscine",
    "Traitement eau",
    "Forage",
    "Pompage",
    "Ascensoriste",
    "Contrôle technique bâtiment",
    "Expert technique",
    "Diagnostic technique"
  ]

};
