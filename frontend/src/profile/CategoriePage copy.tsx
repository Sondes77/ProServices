import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LucideArrowRight, LucideMoveRight } from 'lucide-react';

const CategoriePage = () => {
  const { categorie } = useParams<{ categorie: string }>();
  const categoryTitle = categorie?.replace(/-/g, ' ');

  // Métiers avec descriptions SEO pour chaque carte
  const metiers = [
    { name: "Rénovation Intérieure", desc: "Redonnez vie à vos espaces avec nos designers." },
    { name: "Peinture Décorative", desc: "Finitions haute couture pour vos murs." },
    { name: "Aménagement de Luxe", desc: "Solutions sur-mesure pour villas et bureaux." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{`Expertise en ${categoryTitle} | Excellence & Qualité`}</title>
        <meta name="description" content={`Découvrez nos services premium en ${categoryTitle}. Des artisans d'exception pour vos projets les plus exigeants.`} />
      </Helmet>

      {/* Hero Minimaliste & Chic */}
      <section className="pt-24 pb-16 px-6 text-center">
        <span className="text-gold-600 font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">Département</span>
        <h1 className="text-5xl md:text-7xl font-serif text-slate-900 capitalize mb-8 leading-tight">
          L'univers <br/> <span className="italic text-slate-400">{categoryTitle}</span>
        </h1>
        <div className="w-20 h-px bg-gold-400 mx-auto mb-8"></div>
      </section>

      {/* Grid Visuelle */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metiers.map((m, index) => (
            <Link 
              to={`/metier/${m.name.toLowerCase().replace(/\s/g, '-')}`}
              key={index}
              className="group relative h-[400px] overflow-hidden bg-slate-900"
            >
              {/* Image de fond avec overlay progressif */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity duration-700 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80')] bg-cover bg-center" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <h3 className="text-3xl font-serif mb-2 transform group-hover:-translate-y-2 transition-transform duration-500">
                  {m.name}
                </h3>
                <p className="text-slate-300 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {m.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-gold-400 font-medium">
                  Explorer <LucideMoveRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};
export default CategoriePage