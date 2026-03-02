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
  | 'Services techniques spécialisés'
  | 'Énergie & Environnement'
  | 'Eau & Assainissement'
  | 'Industrie & Chantier'
  | 'Informatique & Digital'
  | 'Beauté & Bien-être'
  | 'Santé & Paramédical'
  | 'Services à la personne'
  | 'Business & Administratif'
  | 'Éducation & Formation'
  | 'Événementiel'
  | 'Automobile & Moto'
  | 'Audiovisuel & Création'
  | 'Mode & Textile';

export const Metier: Record<Categorie, string[]> = {

"Bâtiment & Travaux": [
"Maçon","Maçon finisseur","Entrepreneur bâtiment","Chef de chantier",
"Conducteur travaux","Terrassier","Coffreur","Ferrailleur","Plâtrier",
"Façadier","Étancheur","Carreleur","Poseur marbre","Poseur parquet",
"Chapiste","Constructeur maison","Rénovation générale","Extension maison",
"Surélévation","Démolition","Sciage béton","Forage béton",
"Isolation thermique","Isolation phonique","Isolation façade"
],

"Installation & Équipement": [
"Installateur climatiseur","Installateur chauffe-eau","Installateur chaudière",
"Installateur sanitaire","Installateur cuisine","Installateur salle de bain",
"Installateur panneaux solaires","Installateur pompe à chaleur",
"Installateur antenne","Installateur parabole","Monteur meuble",
"Poseur porte","Poseur fenêtre","Poseur portail","Poseur rideau métallique",
"Installateur réseau eau","Installateur gaz","Installateur VMC",
"Installateur borne recharge","Installateur store","Installateur pergola"
],

"Réparation & Maintenance": [
"Dépannage plomberie","Dépannage électrique","Dépannage serrurerie",
"Réparation climatiseur","Réparation chaudière","Réparation électroménager",
"Réparation frigo","Réparation four","Réparation TV","Réparation PC",
"Réparation téléphone","Réparation tablette","Maintenance bâtiment",
"Maintenance industrielle","Technicien maintenance","Dépannage urgent",
"Homme à tout faire","Multi-services","Contrat maintenance",
"Maintenance préventive","Maintenance corrective"
],

"Maison & Intérieur": [
"Peintre","Peintre décoratif","Décorateur intérieur","Designer intérieur",
"Architecte intérieur","Menuisier bois","Menuisier aluminium","Menuisier PVC",
"Ébéniste","Tapissier","Poseur papier peint","Poseur placo",
"Poseur faux plafond","Staffeur","Aménagement cuisine",
"Aménagement dressing","Aménagement placard",
"Pose moulures","Verrier","Miroitier"
],

"Extérieur & Jardin": [
"Jardinier","Paysagiste","Architecte paysagiste","Élagage arbres",
"Abattage arbres","Taille haies","Entretien jardin",
"Arrosage automatique","Pose gazon","Gazon synthétique",
"Clôturiste","Pose clôture","Pose pergola",
"Terrasse bois","Terrasse carrelage","Aménagement extérieur",
"Pavage","Dallage","Création bassin","Entretien piscine extérieur"
],

"Nettoyage": [
"Nettoyage maison","Nettoyage appartement","Nettoyage bureau",
"Nettoyage industriel","Nettoyage chantier","Nettoyage fin chantier",
"Nettoyage vitres","Nettoyage façade","Nettoyage toiture",
"Nettoyage canapé","Nettoyage tapis","Shampooing moquette",
"Désinfection","Dératisation","Désinsectisation",
"Traitement nuisibles","Nettoyage haute pression"
],

"Transport & Déménagement": [
"Déménageur","Transporteur","Chauffeur utilitaire",
"Livraison meubles","Livraison électroménager",
"Location camion avec chauffeur","Monte-meuble",
"Transport colis","Transport matériaux",
"Transport chantier","Transport lourd",
"Logistique locale","Logistique chantier"
],

"Sécurité": [
"Installateur caméras","Installateur alarme",
"Technicien vidéosurveillance","Contrôle accès",
"Installateur interphone","Portier vidéo",
"Agent sécurité","Agent gardiennage",
"Audit sécurité","Systèmes anti-intrusion",
"Sécurité incendie","Installateur détecteurs fumée"
],

"Électricité & Électronique": [
"Électricien","Électricien bâtiment","Électricien industriel",
"Tableautier","Câblage réseau","Technicien réseau",
"Installateur fibre","Domoticien","Smart home",
"Automatisme","Réparation électronique",
"Carte électronique","Soudure électronique",
"Technicien IoT","Motorisation portail"
],

"Services techniques spécialisés": [
"Frigoriste","Technicien HVAC","Technicien solaire",
"Technicien piscine","Traitement eau",
"Forage","Pompage","Ascensoriste",
"Contrôle technique bâtiment",
"Expert technique","Diagnostic technique",
"Thermicien","Acousticien bâtiment"
],

"Énergie & Environnement": [
"Installateur solaire","Technicien photovoltaïque",
"Audit énergétique","Bilan thermique",
"Isolation énergétique","Efficacité énergétique",
"Éolien","Géothermie","Biomasse"
],

"Eau & Assainissement": [
"Plombier","Canalisateur","Assainissement",
"Curage canalisation","Inspection caméra",
"Recherche fuite","Traitement eau",
"Station pompage","Puits","Forage eau"
],

"Industrie & Chantier": [
"Soudeur","Chaudronnier","Tuyauteur",
"Mécanicien industriel","Électricien industriel",
"Monteur industriel","Levage","Grutage",
"Conducteur engins","Opérateur nacelle"
],

"Informatique & Digital": [
"Développeur web","Développeur React","Développeur Next.js",
"Développeur mobile","Développeur Android","Développeur iOS",
"Développeur backend","Développeur full stack",
"Création site web","Création e-commerce",
"Maintenance informatique","Dépannage informatique",
"Technicien IT","Administrateur système",
"Administrateur réseau","Cybersécurité",
"Consultant IT","Support technique",
"Réparation ordinateur","Réparation laptop",
"Réparation Mac","Réparation imprimante",
"Installation réseau","Configuration serveur",
"Hébergement web","SEO","Consultant SEO",
"Marketing digital","Community manager",
"Gestion réseaux sociaux","Publicité Facebook Ads",
"Google Ads specialist","UI UX Designer",
"Graphiste","Web designer",
"Montage vidéo","Créateur contenu",
"Automatisation Make","Automatisation IA",
"Intégrateur API","Data analyst"
],

"Beauté & Bien-être": [
"Coiffeur","Coiffeuse","Barbier",
"Coloriste","Coiffure mariage",
"Maquilleur","Maquilleuse professionnelle",
"Esthéticienne","Soins visage",
"Épilation","Épilation laser",
"Prothésiste ongulaire","Pose faux ongles",
"Massage relaxant","Massage thérapeutique",
"Spa","Soins corps",
"Coach bien-être","Coach nutrition",
"Coach fitness","Personal trainer",
"Yoga coach","Coach sportif"
],

"Santé & Paramédical": [
"Infirmier","Infirmière à domicile",
"Aide-soignant","Kinésithérapeute",
"Ostéopathe","Orthophoniste",
"Psychologue","Psychothérapeute",
"Diététicien","Nutritionniste",
"Sage-femme","Assistant médical",
"Podologue","Ergothérapeute",
"Acupuncteur","Naturopathe"
],

"Services à la personne": [
"Garde enfant","Baby-sitter",
"Aide personnes âgées",
"Auxiliaire de vie",
"Femme de ménage",
"Repassage domicile",
"Cuisine à domicile",
"Chef privé",
"Garde animaux","Dog sitter",
"Promeneur chien",
"Soutien scolaire",
"Aide devoirs",
"Assistant personnel"
],

"Business & Administratif": [
"Comptable","Expert-comptable",
"Secrétaire indépendante",
"Assistant administratif",
"Consultant business",
"Création entreprise",
"Conseiller fiscal",
"Gestion paie",
"Juriste","Avocat",
"Rédacteur professionnel",
"Traducteur","Interprète",
"Saisie de données"
],

"Éducation & Formation": [
"Professeur particulier",
"Formateur informatique",
"Formateur langues",
"Professeur anglais",
"Professeur français",
"Professeur mathématiques",
"Coach carrière",
"Coach entretien",
"Formation bureautique",
"Formation programmation"
],

"Événementiel": [
"Organisateur événement",
"Wedding planner",
"DJ","Animateur",
"Photographe événementiel",
"Vidéaste mariage",
"Décorateur événement",
"Location matériel événement",
"Traiteur","Serveur événement",
"Location sono",
"Location éclairage"
],

"Automobile & Moto": [
"Mécanicien auto",
"Électricien automobile",
"Diagnostic auto",
"Carrossier",
"Peintre automobile",
"Lavage auto",
"Detailing auto",
"Réparation moto",
"Dépannage auto",
"Remorquage",
"Installation GPS",
"Installation autoradio"
],

"Audiovisuel & Création": [
"Photographe",
"Vidéaste",
"Monteur vidéo",
"Motion designer",
"Créateur logo",
"Designer graphique",
"Illustrateur",
"Voix off",
"Studio enregistrement"
],

"Mode & Textile": [
"Couturier",
"Couturière",
"Styliste",
"Retouche vêtements",
"Créateur mode",
"Broderie",
"Impression textile"
]

};