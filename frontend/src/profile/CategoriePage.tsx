import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight, LayoutGrid, Star, ShieldCheck, 
  ArrowUpRight, Search, Users 
} from 'lucide-react';
import { Categorie, Metier } from '../components/categoryMetier';
import batiment from '../img/batiment-et-traveaux-tunisie.jpg';
import installation from '../img/installation-et-equipement-tunisie.jpg';
import reparation from '../img/reparation-et-maintenance-tunisie.jpg';
import interieur from '../img/maison-et interieur-tunisie.jpg';
import jardin from '../img/exterieur-et-jardin-tunisie.jpg';
import nettoyage from '../img/services-nettoyage-tunisie.jpg';
import transport from '../img/transport-et-déménagement-tunisie.jpg';
import securite from '../img/service-securite-tunisie.jpg';
import electricite from '../img/electricite-et-electronique-tunisie.jpg'
import specialises from '../img/services-techniques-specialises-tunisie.jpg';
import environnement from '../img/energie-et-environnement-tunisie.jpg';
import eau from '../img/eau-et-assainissement-tunisie.jpg';
import chantier from '../img/industrie-et-chantier-tunisie.jpg';

const CategoriePage: React.FC = () => {
  const navigate = useNavigate();
    
  // Mappage des images par catégorie (URL Unsplash haute qualité)
  const categoryImages: Record<string, string> = {
    "Bâtiment & Travaux": batiment,
    "Installation & Équipement": installation,
    "Réparation & Maintenance": reparation,
    "Maison & Intérieur": interieur,
    "Extérieur & Jardin": jardin,
    "Nettoyage": nettoyage,
    "Transport & Déménagement": transport,
    "Sécurité": securite,
    "Électricité & Électronique": electricite,
    "Services techniques spécialisés": specialises,
    "Énergie & Environnement": environnement,
    "Eau & Assainissement": eau,
    "Industrie & Chantier": chantier
  };

  const categoriesList = useMemo(() => Object.keys(Metier) as Categorie[], []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": categoriesList.map((cat, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": cat,
      "url": `https://servicepro.tn/${encodeURIComponent(cat)}`
    }))
  };

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <div className="min-h-screen bg-[#f8fbfc]">
      <Helmet>
        <title>Tous nos Services Pro | Trouvez un Expert en Tunisie</title>
        <meta name="description" content="Explorez l'annuaire complet des professionnels en Tunisie. De la plomberie à l'informatique, trouvez l'expert certifié pour vos travaux et services." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* --- HERO SECTION --- */}
      <section className="relative bg-slate-900 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-8">
            <Star size={14} fill="currentColor" /> Excellence & Confiance
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Toutes nos <span className="text-[#e0692d]">Catégories</span> de Services
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Une galaxie de talents à votre portée. Parcourez nos secteurs d'activité et trouvez le prestataire idéal.
          </p>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <div className="max-w-5xl mx-auto -mt-12 px-6 relative z-20">
        <div className="bg-white rounded-[24px] shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 border border-slate-100">
          <div className="flex items-center gap-4 justify-center md:border-r border-slate-100">
            <div className="p-3 bg-orange-50 rounded-2xl text-[#e0692d]"><LayoutGrid size={24} /></div>
            <div><p className="text-2xl font-black text-slate-900">{categoriesList.length}</p><p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Secteurs</p></div>
          </div>
          <div className="flex items-center gap-4 justify-center md:border-r border-slate-100">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Users size={24} /></div>
            <div><p className="text-2xl font-black text-slate-900">+5000</p><p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Pros Vérifiés</p></div>
          </div>
          <div className="flex items-center gap-4 justify-center">
            <div className="p-3 bg-green-50 rounded-2xl text-green-600"><ShieldCheck size={24} /></div>
            <div><p className="text-2xl font-black text-slate-900">100%</p><p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Sécurisé</p></div>
          </div>
        </div>
      </div>

      {/* --- GALLERY GRID --- */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categoriesList.map((categorie) => (
            <div 
              key={categorie}
              className="group bg-white rounded-[40px] border border-slate-100 p-3 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-200/30 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden rounded-[32px] h-60 bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10" />
                <img 
                  src={categoryImages[categorie] || categoryImages["default"]} 
                  alt={`Services de ${categorie} en Tunisie`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-8 z-20">
                  <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-md">{categorie}</h2>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">
                  Accédez à notre réseau d'experts en {categorie.toLowerCase()} certifiés ServicesPro.
                </p>

                {/* SEO Deep Linking */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {Metier[categorie]?.slice(0, 4).map((m) => (
                    <Link 
                      key={m}
                      to={`/categories/${slugify(categorie)}/${slugify(m)}`}
                      className="px-3 py-2 bg-slate-50 hover:bg-orange-50 hover:text-[#e0692d] rounded-xl text-[10px] font-extrabold text-slate-600 transition-all border border-transparent hover:border-orange-100 uppercase tracking-tighter"
                    >
                      {m}
                    </Link>
                  ))}
                </div>

                <button 
                  onClick={() => navigate(`/categories/${slugify(categorie)}`)}
                  className="w-full flex items-center justify-between p-4 bg-slate-900 rounded-[24px] group-hover:bg-[#e0692d] transition-all duration-500"
                >
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white ml-2">Explorer</span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#e0692d] transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- SEO FOOTER --- */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Le réflexe N°1 pour vos projets en Tunisie</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Tunis", "Sousse", "Sfax", "Bizerte", "Nabeul", "Djerba"].map(city => (
              <Link key={city} to={`/search?ville=${city}`} className="px-6 py-3 rounded-2xl bg-[#f8fbfc] border border-slate-100 text-sm font-bold text-slate-600 hover:border-orange-500 hover:text-[#e0692d] transition-all">
                {city}
              </Link>
            ))}
          </div>
          <div className="max-w-4xl mx-auto p-10 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
            <p className="text-sm text-slate-500 leading-relaxed italic">
              <strong>ServicesPro.tn</strong> simplifie votre recherche de prestataires. Notre algorithme vous connecte aux meilleurs 
              spécialistes en <strong>Bâtiment</strong>, <strong>Maintenance</strong> et <strong>Services à domicile</strong>. 
              Chaque professionnel présent dans ces catégories est soumis à une charte de qualité stricte pour garantir 
              votre satisfaction totale partout en Tunisie.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriePage;