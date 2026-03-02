const fs = require("fs");
const path = require("path");

const BASE_URL = "https://servicepro.tn";
const MAX_URLS_PER_FILE = 49000; // sécurité < 50k
const OUTPUT_DIR = path.join(__dirname, "../../frontend/public");


// ===== MÉTIERS PAR CATÉGORIE =====
const metiers = [
  // Bâtiment & Travaux
  "Maçon","Maçon finisseur","Entrepreneur bâtiment","Chef de chantier",
  "Conducteur travaux","Terrassier","Coffreur","Ferrailleur","Plâtrier",
  "Façadier","Étancheur","Carreleur","Poseur marbre","Poseur parquet",
  "Chapiste","Constructeur maison","Rénovation générale","Extension maison",
  "Surélévation","Démolition","Sciage béton","Forage béton",
  "Isolation thermique","Isolation phonique","Isolation façade",

  // Installation & Équipement
  "Installateur climatiseur","Installateur chauffe-eau","Installateur chaudière",
  "Installateur sanitaire","Installateur cuisine","Installateur salle de bain",
  "Installateur panneaux solaires","Installateur pompe à chaleur",
  "Installateur antenne","Installateur parabole","Monteur meuble",
  "Poseur porte","Poseur fenêtre","Poseur portail","Poseur rideau métallique",
  "Installateur réseau eau","Installateur gaz","Installateur VMC",
  "Installateur borne recharge","Installateur store","Installateur pergola",

  // Réparation & Maintenance
  "Dépannage plomberie","Dépannage électrique","Dépannage serrurerie",
  "Réparation climatiseur","Réparation chaudière","Réparation électroménager",
  "Réparation frigo","Réparation four","Réparation TV","Réparation PC",
  "Réparation téléphone","Réparation tablette","Maintenance bâtiment",
  "Maintenance industrielle","Technicien maintenance","Dépannage urgent",
  "Homme à tout faire","Multi-services","Contrat maintenance",
  "Maintenance préventive","Maintenance corrective",

  // Maison & Intérieur
  "Peintre","Peintre décoratif","Décorateur intérieur","Designer intérieur",
  "Architecte intérieur","Menuisier bois","Menuisier aluminium","Menuisier PVC",
  "Ébéniste","Tapissier","Poseur papier peint","Poseur placo",
  "Poseur faux plafond","Staffeur","Aménagement cuisine",
  "Aménagement dressing","Aménagement placard",
  "Pose moulures","Verrier","Miroitier",

  // Extérieur & Jardin
  "Jardinier","Paysagiste","Architecte paysagiste","Élagage arbres",
  "Abattage arbres","Taille haies","Entretien jardin",
  "Arrosage automatique","Pose gazon","Gazon synthétique",
  "Clôturiste","Pose clôture","Pose pergola",
  "Terrasse bois","Terrasse carrelage","Aménagement extérieur",
  "Pavage","Dallage","Création bassin","Entretien piscine extérieur",

  // Nettoyage
  "Nettoyage maison","Nettoyage appartement","Nettoyage bureau",
  "Nettoyage industriel","Nettoyage chantier","Nettoyage fin chantier",
  "Nettoyage vitres","Nettoyage façade","Nettoyage toiture",
  "Nettoyage canapé","Nettoyage tapis","Shampooing moquette",
  "Désinfection","Dératisation","Désinsectisation",
  "Traitement nuisibles","Nettoyage haute pression",

  // Transport & Déménagement
  "Déménageur","Transporteur","Chauffeur utilitaire",
  "Livraison meubles","Livraison électroménager",
  "Location camion avec chauffeur","Monte-meuble",
  "Transport colis","Transport matériaux",
  "Transport chantier","Transport lourd",
  "Logistique locale","Logistique chantier",

  // Sécurité
  "Installateur caméras","Installateur alarme",
  "Technicien vidéosurveillance","Contrôle accès",
  "Installateur interphone","Portier vidéo",
  "Agent sécurité","Agent gardiennage",
  "Audit sécurité","Systèmes anti-intrusion",
  "Sécurité incendie","Installateur détecteurs fumée",

  // Électricité & Électronique
  "Électricien","Électricien bâtiment","Électricien industriel",
  "Tableautier","Câblage réseau","Technicien réseau",
  "Installateur fibre","Domoticien","Smart home",
  "Automatisme","Réparation électronique",
  "Carte électronique","Soudure électronique",
  "Technicien IoT","Motorisation portail",

  // Services techniques spécialisés
  "Frigoriste","Technicien HVAC","Technicien solaire",
  "Technicien piscine","Traitement eau",
  "Forage","Pompage","Ascensoriste",
  "Contrôle technique bâtiment",
  "Expert technique","Diagnostic technique",
  "Thermicien","Acousticien bâtiment",

  // Énergie & Environnement
  "Installateur solaire","Technicien photovoltaïque",
  "Audit énergétique","Bilan thermique",
  "Isolation énergétique","Efficacité énergétique",
  "Éolien","Géothermie","Biomasse",

  // Eau & Assainissement
  "Plombier","Canalisateur","Assainissement",
  "Curage canalisation","Inspection caméra",
  "Recherche fuite","Traitement eau",
  "Station pompage","Puits","Forage eau",

  // Industrie & Chantier
  "Soudeur","Chaudronnier","Tuyauteur",
  "Mécanicien industriel","Électricien industriel",
  "Monteur industriel","Levage","Grutage",
  "Conducteur engins","Opérateur nacelle",

  //"Informatique & Digital"
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
  "Intégrateur API","Data analyst",

  //Beauté & Bien-être
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
  "Yoga coach","Coach sportif",

  //Santé & Paramédical
  "Infirmier","Infirmière à domicile",
  "Aide-soignant","Kinésithérapeute",
  "Ostéopathe","Orthophoniste",
  "Psychologue","Psychothérapeute",
  "Diététicien","Nutritionniste",
  "Sage-femme","Assistant médical",
  "Podologue","Ergothérapeute",
  "Acupuncteur","Naturopathe",

  //Services à la personne
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
  "Assistant personnel",

  //Business & Administratif
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
  "Saisie de données",

  //Éducation & Formation
  "Professeur particulier",
  "Formateur informatique",
  "Formateur langues",
  "Professeur anglais",
  "Professeur français",
  "Professeur mathématiques",
  "Coach carrière",
  "Coach entretien",
  "Formation bureautique",
  "Formation programmation",

  //Événementiel
  "Organisateur événement",
  "Wedding planner",
  "DJ","Animateur",
  "Photographe événementiel",
  "Vidéaste mariage",
  "Décorateur événement",
  "Location matériel événement",
  "Traiteur","Serveur événement",
  "Location sono",
  "Location éclairage",

  //Automobile & Moto
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
  "Installation autoradio",

  //Audiovisuel & Création
  "Photographe",
  "Vidéaste",
  "Monteur vidéo",
  "Motion designer",
  "Créateur logo",
  "Designer graphique",
  "Illustrateur",
  "Voix off",
  "Studio enregistrement",

  //Mode & Textile
  "Couturier",
  "Couturière",
  "Styliste",
  "Retouche vêtements",
  "Créateur mode",
  "Broderie",
  "Impression textile"

];

// ===== VILLES ET LOCALITÉS =====
const villes = {
  Tunis: ['Tunis Belvedere', 'Tunis', 'Séjoumi','Sidi Hassine','Sidi El Béchir','Sidi Daoud','Sidi Bou Said','Médina','Mutuelleville','Montplaisir','Monfleury','Menzah','Manar','Le Kram','Le Bardo','Lac 2','Lac 1','La Marsa','La Goulette','L Aouina','Ksar Said','Kheireddine Pacha','Khaznadar','Jardins De Carthage','Hraïria','Gammarth','Ezzouhour','Ettahrir','El Ouardia','El Omrane Supérieur','El Omrane','El Menzah 9','El Menzah 4','El Menzah 1','El Manar 2','El Manar 1','El Kabaria','Djebel Jelloud','Cité Olympique','Cité jardin','Cité El Khadra','Centre Ville Lafayette','Centre Urbain Nord','Carthage','Bellevue','Bab Souika','Autre','Alain Savary','Ain Zaghouen','Ain Zaghouan Sud','Ain Zaghouan Nord','Agba'],
  Ariana: ['Sidi Thabet','Riadh Andalous','Raoued','Nouvelle Ariana','Mnihla','Les Jardins El Menzah 2','Les Jardins El Menzah 1','La Soukra','Kalâat Andalous','Jardins El Menzah','Ghazela','Ettadhamen','Ennasr','El Menzah 8','El Menzah 7','El Menzah 6','El Menzah 5','Dar Fadhal','Cité Hedi Nouira','Cité Ennasr 2','Cité Ennasr 1','Cite Ennkhilet','Chotrana 3','Chotrana 2','Chotrana 1','Chotrana','Charguia 2','Charguia 1','Borj Louzir','Autre','Ariana Ville','Ariana Essoughra','Ariana'],
  "Ben Arous": ['Sidi Rezig','Radès','Mégrine','Mornag','Mohamedia','Medina Jedida','Hammam Lif','Hammam Chott','Fouchana','Ezzahra','El Mourouj 6','El Mourouj 5','El Mourouj 4','El Mourouj 3','El Mourouj 1','El Mourouj','Boumhel','Borj Cedria','Ben Arous','Autre'],
  "La Manouba": ['Tebourba','Oued Ellil','Mornaguia','Menzel El Habib','Manouba Ville','La Manouba','El Battan','Douar Hicher','Djedeida','Denden','Borj El Amri','Autre'],
  Nabeul: ['Yasmine Hammamet','Takelsa','Soliman','Nabeul','Mrezga','Menzel Temime','Menzel Bouzelfa','Kélibia','Korba','Hammamet Nord','Hammamet Centre','Hammamet','Hammam Ghezèze','Grombalia','El Mida','El Haouaria','Dar Châabane El Fehri','Béni Khiar','Béni Khalled','Bou Argoub','Autre'],
  Sfax: ['Thyna','Skhira','Sfax Ville','Sfax Médina','Sfax','Sakiet Ezzit','Sakiet Eddaïer','Route Tunis','Route Soukra','Route MHARZA','Menzel Chaker','Mahrès','Kerkennah','Jebiniana','Ghraiba','El Hencha','El Amra','Bir Ali Ben Khalifa','Autre','Agareb'],
  Sousse: ['Sousse','Sahloul','Zaouit Ksibat Thrayett','Sousse Sidi Abdelhamid','Sousse Riadh','Sousse Médina','Sousse Jawhara','Sousse Corniche','M Saken','Kondar','Khzema','Kantaoui','Kalaâ Sghira','Kalaâ Kebira','Hergla','Hammam Sousse','Enfidha','Chatt Mariem','Bouficha','Akouda','Autre'],
  Monastir: ['Monastir','Moknine','Zéramdine','Téboulba','Sayada Lamta Bou Hajar','Sahline','Ouerdanine','Ksibet El Médiouni','Ksar Hellal','Jemmal','Beni Hassen','Bembla','Bekalta','Autre'],
  Mahdia: ['Mahdia','Sidi Alouane','Ouled Chamekh','Melloulèche','Ksour Essef','Hebira','Essouassi','El Jem','Chorbane','Chebba','Bou Merdès','Autre'],
  Kairouan: ['Kairouan','Sbikha','Nasrallah','Kairouan Sud','Kairouan Nord','Hajeb El Ayoun','Haffouz','El Ouslatia','El Alâa','Echrarda','Chebika','Bouhajla','Autre'],
  "Béja": ['Béja','Téboursouk','Thibar','Testour','Nefza','Medjez El Bab','Goubellat','El Ksar','Béja Sud','Béja Nord','Amdoun','Autre'],
  Bizerte: ['Bizerte','Zarzouna','Utique','Tinja','Sejenane','Ras Jebel','Menzel Jemil','Menzel Bourguiba','Mateur','Ghezala','Ghar El Melh','El Alia','Djoumime','Bizerte Sud','Bizerte Nord','Autre'],
  Gabès: ['Gabès','Nouvelle Matmata','Métouia','Matmata','Mareth','Ghanouch','Gabès Sud','Gabès Ouest','Gabès Médina','El Hamma','Autre'],
  Medenine: ['Médenine','Zarzis','Wled Amor','Touta','Tezdaine','Temlel','Tawrit','Sidi Makhloulf','M’guersa','Médenine Sud','Médenine Nord','Mezzraya','Melita','Mai','Mahboubine','Khazroun','Hedade','Gizen','Fatou','Djerba Midoun','Djerba Houmt Souk','Djerba Ajim','Chebabia','Boughrara','Beni Khedech','Ben Gardane','Autre','Arkou','Aghir'],
  Tataouine: ['Tataouine','Tataouine Sud','Tataouine Nord','Smâr','Remada','Ghomrassen','Dehiba','Bir Lahmar','Autre'],
  Gafsa: ['Gafsa','Sidi Aïch','Sened','Redeyef','Oum El Araies','Métlaoui','Mdhila','Gafsa Sud','Gafsa Nord','El Ksar','El Guettar','Belkhir','Autre'],
  Tozeur: ['Tozeur','Tameghza','Nefta','Hazoua','Degache','Autre'],
  Kebili: ['Kébili','Souk Lahad','Kébili Sud','Kébili Nord','Faouar','Douz Sud','Douz Nord','Autre']
};

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")               // décompose accents
    .replace(/[\u0300-\u036f]/g, "") // supprime accents
    .replace(/[^a-z0-9]+/g, "-")   // remplace tout ce qui n’est pas alphanum par -
    .replace(/^-+|-+$/g, "");      // supprime tirets en début/fin
}

// ===== Génération des URLs =====
let urls = [];
urls.push(BASE_URL); // homepage

metiers.forEach(m => {
  const mSlug = slugify(m);
  urls.push(`${BASE_URL}/services/${mSlug}`);
  Object.keys(villes).forEach(gouv => {
    villes[gouv].forEach(v => {
      const vSlug = slugify(v);
      urls.push(`${BASE_URL}/services/${mSlug}/${vSlug}`);
    });
  });
});

// ===== FRACTIONNER LES URLS =====
const chunks = [];
for (let i = 0; i < urls.length; i += MAX_URLS_PER_FILE) {
  chunks.push(urls.slice(i, i + MAX_URLS_PER_FILE));
}

// ===== GÉNÉRATION DES SITEMAPS =====
let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

chunks.forEach((chunk, idx) => {
  const today = new Date().toISOString().split("T")[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map(u => `
  <url>
    <loc>${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join("")}
</urlset>`;

  const fileName = `sitemap_services_${idx + 1}.xml`;
  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), xml);
  console.log(`✅ ${fileName} généré avec ${chunk.length} URLs`);

  sitemapIndex += `
  <sitemap>
    <loc>${BASE_URL}/${fileName}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`;
});

sitemapIndex += `\n</sitemapindex>`;
fs.writeFileSync(path.join(OUTPUT_DIR, "sitemap_index.xml"), sitemapIndex);
console.log("✅ sitemap_index.xml généré avec tous les fichiers secondaires !");