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
  | 'Industrie & Chantier';

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
]

};