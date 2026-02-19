import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, Star, BadgeCheck, MessageSquare, ArrowLeft, 
  ShieldCheck, Zap, Info, Search, SlidersHorizontal, 
  ArrowRight, Heart, Share2
} from 'lucide-react';
import { Professional } from '../utils/types';
import { mapProfessionalsDataToUserModel } from '../utils/mapper';
import Swal from "sweetalert2";

const MetierPage: React.FC = () => {
  const { metier, ville } = useParams<{ metier: string; ville?: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  // Formatage pour l'affichage (slug -> texte)
  const displayMetier = useMemo(() => metier?.replace(/-/g, ' ') || '', [metier]);
  const displayVille = useMemo(() => ville?.replace(/-/g, ' ') || '', [ville]);

  // Titre SEO dynamique
  const seoTitle = useMemo(() => 
    `Top Experts ${displayMetier} ${displayVille ? `à ${displayVille}` : 'en Tunisie'} | Avis & Devis`, 
  [displayMetier, displayVille]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/all`);
        if (response.ok) {
          const data = await response.json();
          const mapped = data.map((el: any) => mapProfessionalsDataToUserModel(el));
          
          // Filtrage intelligent basé sur l'URL
          const filtered = mapped.filter((pro: Professional) => {
            const matchMetier = pro.metier.toLowerCase().includes(displayMetier.toLowerCase()) || 
                               pro.profession.toLowerCase().includes(displayMetier.toLowerCase());
            const matchVille = !displayVille || pro.city.toLowerCase() === displayVille.toLowerCase() || 
                              pro.region.toLowerCase() === displayVille.toLowerCase();
            return matchMetier && matchVille;
          });
          setProfessionals(filtered);
        }
      } catch (error) {
        console.error("Erreur de chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [displayMetier, displayVille]);

  const handleServiceClick = (pro: Professional) => {
    navigate(`/service/${pro.profession.toLowerCase()}/${pro.metier.toLowerCase()}/${pro.region.toLowerCase()}/${pro.id}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fbfc]">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={`Besoin d'un ${displayMetier} ${displayVille ? `à ${displayVille}` : 'en Tunisie'} ? Découvrez les meilleurs pros, lisez les avis clients et demandez un devis gratuit en ligne.`} />
      </Helmet>

      {/* --- NAVIGATION / BREADCRUMBS --- */}
      <div className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 hover:text-[#e0692d] transition-colors font-bold text-sm">
            <ArrowLeft size={18} /> Retour
          </button>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400"><Share2 size={18}/></button>
            <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400"><Heart size={18}/></button>
          </div>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="bg-white pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-[#e0692d] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-orange-100">
                <ShieldCheck size={14} /> Réseau Certifié
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight capitalize">
                {displayMetier} <br />
                {displayVille ? <span className="text-[#e0692d]">à {displayVille}</span> : <span className="text-slate-400">en Tunisie</span>}
              </h1>
              <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
                Trouvez l'expert idéal parmi notre sélection de <strong>{professionals.length} professionnels</strong> vérifiés. Devis gratuits et réponse rapide garantis.
              </p>
            </div>
            
            {/* Sidebar Stats Rapides */}
            <div className="hidden lg:grid grid-cols-2 gap-4 w-80">
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <p className="text-2xl font-black text-slate-900">4.9/5</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Note moyenne</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <p className="text-2xl font-black text-slate-900">100%</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Vérifié</p>
                </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          
          {/* Liste des Pros */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">{professionals.length} experts disponibles</h2>
              <button className="flex items-center gap-2 text-xs font-bold bg-white px-4 py-2 rounded-xl border border-slate-200 hover:border-[#e0692d] transition-all">
                <SlidersHorizontal size={14} /> Trier par : Pertinence
              </button>
            </div>

            {loading ? (
              <div className="py-20 text-center"><Zap className="animate-pulse text-orange-300 mx-auto" size={48} /></div>
            ) : professionals.length > 0 ? (
              professionals.map((pro) => (
                <div key={pro.id} className="group bg-white rounded-[32px] p-6 md:p-8 border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Image & Badge */}
                    <div className="relative shrink-0 mx-auto md:mx-0">
                      <img 
                        src={pro.avatar} 
                        alt={pro.name} 
                        className="w-28 h-28 md:w-36 md:h-36 rounded-[28px] object-cover border-4 border-slate-50" 
                      />
                      {pro.verified && (
                        <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-lg">
                          <BadgeCheck className="text-[#e0692d]" size={22} fill="#fff7ed" />
                        </div>
                      )}
                    </div>

                    {/* Infos */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 hover:text-[#e0692d] cursor-pointer transition-colors">
                            {pro.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 mt-2">
                            <span className="flex items-center gap-1 text-sm font-bold text-slate-700 bg-orange-50 px-2 py-1 rounded-lg">
                              <Star size={16} fill="#fbbf24" className="text-yellow-400" /> {pro.rating}
                            </span>
                            <span className="text-slate-400 text-xs font-medium underline underline-offset-4">{pro.reviews} avis clients</span>
                            <span className="flex items-center gap-1 text-slate-500 text-xs font-bold">
                              <MapPin size={14} className="text-[#e0692d]" /> {pro.city}, {pro.region}
                            </span>
                          </div>
                        </div>
                        <div className="bg-green-50 px-4 py-2 rounded-2xl text-green-700 text-xs font-black uppercase tracking-widest">
                           {pro.availability}
                        </div>
                      </div>

                      <p className="mt-6 text-slate-500 text-sm leading-relaxed line-clamp-2 italic">
                        "{pro.description}"
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <button 
                          onClick={() => handleServiceClick(pro)}
                          className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-[0.1em] hover:bg-[#e0692d] transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
                        >
                          Consulter l'offre <ArrowRight size={16} />
                        </button>
                        <button className="bg-white text-slate-900 border-2 border-slate-100 px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-[0.1em] hover:border-[#e0692d] hover:text-[#e0692d] transition-all flex items-center gap-2">
                          <MessageSquare size={16} /> Devis Rapide
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-16 rounded-[40px] border border-dashed border-slate-200 text-center">
                <Info className="mx-auto text-slate-300 mb-4" size={48} />
                <h3 className="text-xl font-bold text-slate-900">Aucun expert trouvé pour cette zone</h3>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                  Nous n'avons pas encore de {displayMetier} répertorié à {displayVille}. Essayez une ville voisine !
                </p>
                <button 
                  onClick={() => navigate('/search')}
                  className="mt-8 bg-[#e0692d] text-white px-8 py-3 rounded-2xl font-bold"
                >
                  Voir tous les pros
                </button>
              </div>
            )}
          </div>

          {/* Sidebar de Confiance */}
          <aside className="space-y-6">
            <div className="bg-slate-900 rounded-[32px] p-8 text-white sticky top-28">
               <h4 className="text-xl font-black mb-4 tracking-tight leading-tight">Vous êtes un <span className="text-[#e0692d]">professionnel</span> ?</h4>
               <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                 Rejoignez les meilleurs experts de Tunisie et développez votre activité avec ServicesPro.
               </p>
               <Link to="/register-pro" className="block text-center bg-white text-slate-900 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#e0692d] hover:text-white transition-all">
                 Inscrire mon activité
               </Link>
               
               <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
                 <div className="flex gap-4 items-start">
                   <div className="p-2 bg-white/5 rounded-xl"><ShieldCheck className="text-orange-500" size={20}/></div>
                   <div><p className="text-xs font-bold uppercase tracking-widest">Paiement Sécurisé</p><p className="text-[10px] text-slate-500 mt-1">Transactions garanties</p></div>
                 </div>
                 <div className="flex gap-4 items-start">
                   <div className="p-2 bg-white/5 rounded-xl"><Zap className="text-orange-500" size={20}/></div>
                   <div><p className="text-xs font-bold uppercase tracking-widest">Support 24/7</p><p className="text-[10px] text-slate-500 mt-1">Assistance prioritaire</p></div>
                 </div>
               </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default MetierPage;