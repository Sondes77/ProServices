import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LucideChevronRight, LucideLayoutGrid } from 'lucide-react';

const CategoriePage = () => {
  const { categorie } = useParams<{ categorie: string }>();
  
  // Simulation de données (À remplacer par votre API/Context)
  const categoryTitle = categorie?.replace(/-/g, ' ');
  const metiers = ["Plomberie", "Électricité", "Chauffage", "Climatisation"]; 

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{`Les meilleurs experts en ${categoryTitle} | VotrePlateforme`}</title>
        <meta name="description" content={`Trouvez des professionnels qualifiés en ${categoryTitle}. Service rapide, devis gratuits et experts certifiés près de chez vous.`} />
        <link rel="canonical" href={`https://votre-site.com/categorie/${categorie}`} />
      </Helmet>

      {/* Hero Section Chic */}
      <section className="relative py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex mb-8 text-sm text-slate-500 uppercase tracking-widest">
            <Link to="/" className="hover:text-gold-600 transition">Accueil</Link>
            <LucideChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 font-medium">{categoryTitle}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 capitalize">
            {categoryTitle}
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
            Une sélection rigoureuse de professionnels spécialisés en {categoryTitle} pour tous vos projets résidentiels et commerciaux.
          </p>
        </div>
      </section>

      {/* Grid de Métiers */}
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-10 text-slate-400">
          <LucideLayoutGrid size={20} />
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">Explorez nos spécialités</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metiers.map((m) => (
            <Link 
              key={m} 
              to={`/metier/${m.toLowerCase().replace(/\s/g, '-')}`}
              className="group relative overflow-hidden rounded-xl border border-slate-200 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-gold-400"
            >
              <h3 className="text-xl font-medium text-slate-900 group-hover:text-gold-600 transition-colors">
                {m}
              </h3>
              <p className="mt-2 text-slate-500 text-sm italic">Voir les experts disponibles</p>
              <div className="mt-6 flex items-center text-gold-600 font-semibold text-xs uppercase tracking-widest">
                Découvrir <LucideChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoriePage;