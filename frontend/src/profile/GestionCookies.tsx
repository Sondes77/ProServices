
const GestionCookies = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Gestion des cookies</h1>
      <p>ServicePro utilise des cookies pour améliorer votre expérience utilisateur :</p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Cookies nécessaires : pour le fonctionnement du site.</li>
        <li>Cookies analytiques : pour comprendre l’utilisation et améliorer nos services.</li>
        <li>Cookies marketing : pour proposer des contenus adaptés (optionnel).</li>
      </ul>
      <p>Vous pouvez gérer ou désactiver les cookies via les paramètres de votre navigateur.</p>
    </div>
  );
};

export default GestionCookies;
