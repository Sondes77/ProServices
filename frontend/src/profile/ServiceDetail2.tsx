import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, MapPin, Clock, CheckCircle, XCircle, ChevronRight, 
  MessageSquare, Phone, FileText, ShieldCheck, Zap, Info, ArrowLeft
} from 'lucide-react';
import { Service, User, Review } from '../utils/types';
import Swal from 'sweetalert2';

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null); // Idéalement typer avec ton interface Service
  const [loading, setLoading] = useState(true);

  // Simulation de données basées sur ta structure
  useEffect(() => {
    // Ici ton fetch API : http://localhost:5000/api/service/${id}
    setLoading(false);
  }, [id]);
  // État pour afficher le numéro
  const [showPhone, setShowPhone] = useState(false);
  // État pour le modal de devis
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState({ date: '', details: '' });

  // Fonction pour gérer la demande de devis
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi (API)
    Swal.fire({
      title: "Demande envoyée !",
      text: "Le professionnel vous répondra avec une proposition chiffrée.",
      icon: "success",
      confirmButtonColor: "#e0692d"
    });
    setShowQuoteModal(false);
  };
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-10">
      {/* --- SEO HIDDEN TAGS (Simulé) --- */}
      {/* Meta: Service {service?.title} à {service?.location} */}

      {/* --- NAVBAR NAVIGATION --- */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-[#e0692d] transition-all">
          <ArrowLeft size={20} className="mr-2" /> Retour aux services
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- COLONNE GAUCHE : CONTENU (66%) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1️⃣ HERO DU SERVICE */}
          <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative h-[300px] md:h-[450px]">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200" alt="Service" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-sm">
                  <Zap size={14} className="text-yellow-500 mr-1" /> Populaire
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Installation & Maintenance Climatisation</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center text-yellow-500 font-bold">
                      <Star size={16} fill="currentColor" className="mr-1" /> 4.9 <span className="text-gray-400 font-normal ml-1">(28 avis)</span>
                    </div>
                    <div className="flex items-center"><MapPin size={16} className="mr-1" /> Tunis, Ariana</div>
                    <div className="flex items-center"><Clock size={16} className="mr-1" /> 24h - 48h délai</div>
                  </div>
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm text-gray-400 uppercase tracking-wider">À partir de</p>
                  <p className="text-3xl font-black text-[#e0692d]">80 DT</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2️⃣ DESCRIPTION & PROCESSUS */}
          <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Détails du service</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Nous proposons une installation complète de vos systèmes de climatisation, incluant le bilan thermique, 
              la pose de l'unité intérieure/extérieure et les tests de mise en service.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-5 rounded-2xl">
                <h3 className="font-bold text-green-800 flex items-center mb-3">
                  <CheckCircle size={18} className="mr-2" /> Ce qui est inclus
                </h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Déplacement sur site</li>
                  <li>• Installation des supports</li>
                  <li>• Raccordements frigorifiques</li>
                  <li>• Nettoyage du chantier</li>
                </ul>
              </div>
              <div className="bg-red-50 p-5 rounded-2xl">
                <h3 className="font-bold text-red-800 flex items-center mb-3">
                  <XCircle size={18} className="mr-2" /> Non inclus
                </h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Fourniture de l'appareil (si non optionnel)</li>
                  <li>• Travaux de maçonnerie lourde</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5️⃣ GALERIE RÉALISATIONS */}
          <section>
            <h2 className="text-xl font-bold mb-4">Réalisations récentes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden hover:opacity-90 transition-all cursor-pointer border shadow-sm">
                  <img src={`https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=400&auto=format&fit=crop`} alt="galerie" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </section>

          {/* 6️⃣ AVIS DÉDIÉS */}
          <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Avis sur ce service</h2>
            <div className="space-y-6">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <img src="https://i.pravatar.cc/150?u=1" className="w-12 h-12 rounded-full" alt="user" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">Ahmed K.</span>
                    <span className="text-xs text-gray-400">Il y a 2 jours</span>
                  </div>
                  <div className="flex text-yellow-400 mb-2"><Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /></div>
                  <p className="text-gray-600 text-sm">Excellent travail, ponctuel et très propre. Je recommande vivement pour l'installation d'un climatiseur.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- COLONNE DROITE : CONVERSION (33%) --- */}
        <aside className="space-y-6">
          
          {/* 📋 BLOC ACTION / PRIX */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 sticky top-6">
            <div className="mb-6">
              <span className="text-gray-500 text-sm">Prix du service</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-gray-900">80 DT</span>
                <span className="text-gray-400">/intervention</span>
              </div>
            </div>

            <div className="space-y-3">
               <button 
                onClick={() => setShowQuoteModal(true)}
                className="w-full bg-[#e0692d] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#f07e40] transition-all shadow-lg shadow-orange-100"
              >
                <FileText size={20} /> Demander un devis
              </button>
              <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                <MessageSquare size={20} /> Contacter le pro
              </button>
              <button 
                onClick={() => setShowPhone(!showPhone)}
                className={`w-full border-2 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                  showPhone ? "border-green-500 text-green-600 bg-green-50" : "border-gray-100 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Phone size={18} /> 
                {showPhone ? user?.phone || "+216 55 289 528" : "Voir le numéro"}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck size={18} className="text-green-500" /> Professionnel vérifié
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Info size={18} className="text-blue-500" /> Garantie Qualité
              </div>
            </div>
          </div>

          {/* 👤 CARTE PRO MINI */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Proposé par</h3>
            <div className="flex items-center gap-4 mb-4">
              <img src="https://i.pravatar.cc/150?u=pro" className="w-16 h-16 rounded-2xl object-cover" alt="Pro" />
              <div>
                <h4 className="font-bold text-lg flex items-center">
                  Sami R. <CheckCircle size={16} className="ml-1 text-blue-500 fill-blue-500 text-white" />
                </h4>
                <div className="flex items-center text-yellow-500 text-sm font-bold">
                  <Star size={14} fill="currentColor" className="mr-1" /> 4.8 <span className="text-gray-400 font-normal ml-1">(142 avis)</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/profil/pro-id')}
              className="w-full bg-gray-50 text-gray-700 py-2 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all flex items-center justify-center"
            >
              Voir le profil complet <ChevronRight size={16} />
            </button>
          </div>
        </aside>

      </main>

      {/* 🔟 CALL TO ACTION STICKY MOBILE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3 z-50">
        <button className="flex-1 bg-[#e0692d] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-100">
          Demander Devis
        </button>
        <button className="p-3 bg-gray-100 rounded-xl">
          <MessageSquare size={20} className="text-gray-700" />
        </button>
      </div>

      {showQuoteModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
        <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="bg-[#e0692d] p-6 text-white flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Demande de devis gratuit</h3>
              <p className="text-orange-100 text-sm">Réponse généralement en moins de 24h</p>
            </div>
            <button onClick={() => setShowQuoteModal(false)} className="bg-white/20 p-2 rounded-full hover:bg-white/30">
              <XCircle size={24} />
            </button>
          </div>

          <form onSubmit={handleQuoteSubmit} className="p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-secondary">
                Date d'intervention souhaitée
              </label>
              <input 
                type="date" 
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                onChange={(e) => setQuoteDetails({...quoteDetails, date: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description précise du besoin
              </label>
              <textarea 
                rows={4}
                placeholder="Ex: J'ai besoin d'installer un climatiseur 12000 BTU dans mon salon au 2ème étage..."
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                onChange={(e) => setQuoteDetails({...quoteDetails, details: e.target.value})}
                required
              ></textarea>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 items-start">
              <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                Votre demande sera transmise au professionnel. Il pourra vous contacter par téléphone ou via la messagerie interne pour affiner le prix.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#e0692d] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-orange-200 transition-all active:scale-[0.98]"
            >
              Envoyer ma demande
            </button>
          </form>
        </div>
      </div>
      )}
    </div>
  );
};

export default ServiceDetail;