import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LucideMapPin, LucideStar, LucideShieldCheck, LucideClock } from 'lucide-react';

const MetierPage = () => {
  const { metier, ville } = useParams<{ metier: string; ville?: string }>();
  
  const formattedMetier = metier?.replace(/-/g, ' ');
  const formattedVille = ville?.replace(/-/g, ' ');

  // Titre SEO dynamique
  const seoTitle = useMemo(() => {
    return ville 
      ? `${formattedMetier} à ${formattedVille} : Top 10 des meilleurs experts`
      : `Trouvez un expert en ${formattedMetier} | Qualité Garantie`;
  }, [formattedMetier, formattedVille]);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={`Besoin d'un ${formattedMetier}${ville ? ` à ${formattedVille}` : ''} ? Découvrez les professionnels les mieux notés, comparez les avis et demandez un devis en 2 minutes.`} />
      </Helmet>

      {/* Header SEO Dynamique */}
      <header className="bg-white border-b border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 text-gold-700 rounded-full text-xs font-bold uppercase tracking-tighter mb-6">
            <LucideShieldCheck size={14} /> Experts Vérifiés
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 capitalize">
            {formattedMetier} {ville && <span className="text-gold-600 underline decoration-gold-200">à {formattedVille}</span>}
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Trouvez l'artisan idéal parmi nos {Math.floor(Math.random() * 50) + 10} prestataires sélectionnés pour leur excellence.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Colonne Liste (Gauche) */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((id) => (
              <div key={id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition">
                <div className="w-full md:w-48 h-48 bg-slate-200 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                  <img src={`https://i.pravatar.cc/300?img=${id+10}`} alt="Expert" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">Jean-Baptiste Durand</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><LucideStar size={14} className="fill-gold-500 text-gold-500" /> 4.9 (42 avis)</span>
                        <span className="flex items-center gap-1"><LucideMapPin size={14} /> {formattedVille || 'Paris'}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">DISPONIBLE</span>
                  </div>
                  <p className="mt-4 text-slate-600 line-clamp-2 text-sm leading-relaxed">
                    Spécialiste en {formattedMetier} avec plus de 15 ans d'expérience. Travail soigné, respect des délais et devis transparent...
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <button className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gold-600 transition">Contacter</button>
                    <button className="border border-slate-200 text-slate-900 px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition">Voir profil</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar (Droite) */}
          <aside className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h4 className="text-xl font-serif mb-4">Besoin d'un devis rapide ?</h4>
                    <p className="text-slate-400 text-sm mb-6">Décrivez votre projet et recevez jusqu'à 3 offres d'experts en {formattedMetier}.</p>
                    <button className="w-full bg-gold-500 text-slate-900 font-bold py-3 rounded-xl hover:bg-white transition">Lancer ma demande</button>
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                    <LucideClock size={16} /> Pourquoi nous ?
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex gap-2">✓ Assurance décennale vérifiée</li>
                    <li className="flex gap-2">✓ Devis gratuit sous 24h</li>
                    <li className="flex gap-2">✓ Artisans locaux uniquement</li>
                </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default MetierPage;