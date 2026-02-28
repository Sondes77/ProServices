const fs = require("fs");
const path = require("path");

const BASE_URL = "";
const metiers = ["Maçon","Plombier"]; // liste complète de tes métiers
const villes = ["Tunis","Cité El Khadra","Mutuelleville"]; // toutes les villes

let urls = ["/"]; // homepage

metiers.forEach(m => {
  urls.push(`/services/${encodeURIComponent(m)}`);
  villes.forEach(v => {
    urls.push(`/services/${encodeURIComponent(m)}/${encodeURIComponent(v)}`);
  });
});

// Sauvegarde dans reactSnapUrls.json
fs.writeFileSync(
  path.join(__dirname, "../reactSnapUrls.json"),
  JSON.stringify(urls, null, 2)
);
console.log("✅ URLs react-snap générées !");