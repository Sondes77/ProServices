import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Clock, CheckCircle2, XCircle, 
  MessageSquare, Trash2, Calendar, ChevronLeft, 
  ChevronRight, MoreHorizontal, Eye, ShieldCheck, X
} from 'lucide-react';
import Swal from 'sweetalert2';

// --- Types ---
interface Quote {
  id: string;
  proName: string;
  proAvatar: string;
  serviceTitle: string;
  status: 'pending' | 'accepted' | 'declined';
  price?: number;
  date: string;
  description: string;
  proMessage?: string;
}

const ClientQuotesDashboard: React.FC = () => {
  // --- States ---
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'declined'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // --- Données ---
  const [quotes, setQuotes] = useState<Quote[]>([
    { id: 'DV-001', proName: 'Sami Rekik', proAvatar: 'https://i.pravatar.cc/150?u=1', serviceTitle: 'Installation Clim', status: 'accepted', price: 120, date: '2026-02-05', description: "Installation unité salon", proMessage: "Disponible demain à 14h." },
    { id: 'DV-002', proName: 'Yassine J.', proAvatar: 'https://i.pravatar.cc/150?u=2', serviceTitle: 'Plomberie', status: 'pending', date: '2026-02-07', description: "Réparation fuite évier" },
    { id: 'DV-003', proName: 'Mounir T.', proAvatar: 'https://i.pravatar.cc/150?u=3', serviceTitle: 'Électricité', status: 'declined', date: '2026-02-01', description: "Tableau électrique" },
    { id: 'DV-004', proName: 'Amine B.', proAvatar: 'https://i.pravatar.cc/150?u=4', serviceTitle: 'Peinture', status: 'accepted', price: 450, date: '2026-01-28', description: "Chambre enfant", proMessage: "Peinture satinée incluse." },
    { id: 'DV-005', proName: 'Sonia K.', proAvatar: 'https://i.pravatar.cc/150?u=5', serviceTitle: 'Nettoyage', status: 'pending', date: '2026-02-08', description: "Nettoyage après travaux" },
    { id: 'DV-006', proName: 'Walid M.', proAvatar: 'https://i.pravatar.cc/150?u=6', serviceTitle: 'Jardinage', status: 'pending', date: '2026-02-08', description: "Taille de haie" },
  ]);

  // --- Logique de Filtrage & Pagination ---
  const filteredData = useMemo(() => {
    return quotes.filter(q => {
      const matchesSearch = q.serviceTitle.toLowerCase().includes(search.toLowerCase()) || q.proName.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || q.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter, quotes]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- Handlers ---
  const handleAction = (quote: Quote, type: 'details' | 'pay') => {
    setSelectedQuote(quote);
    if (type === 'details') setShowDetails(true);
    else setShowPayment(true);
  };

  const deleteQuote = (id: string) => {
    Swal.fire({ title: 'Supprimer ?', text: "Le devis sera retiré de votre liste.", icon: 'warning', showCancelButton: true, confirmButtonColor: '#e0692d', confirmButtonText: 'Supprimer' })
    .then((res) => res.isConfirmed && setQuotes(quotes.filter(q => q.id !== id)));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-[1000] text-slate-900 tracking-tight">Gestion des Devis</h1>
            <p className="text-slate-400 font-medium mt-1">Vous avez {filteredData.length} demandes en cours.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
            {['all', 'pending', 'accepted', 'declined'].map((t) => (
              <button 
                key={t} onClick={() => {setFilter(t as any); setCurrentPage(1);}}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                {t === 'all' ? 'Tous' : t === 'pending' ? 'En attente' : t === 'accepted' ? 'Reçus' : 'Refusés'}
              </button>
            ))}
          </div>
        </div>

        {/* --- TABLEAU --- */}
        <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Barre de Recherche Interne */}
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 justify-between bg-white">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" placeholder="Rechercher un service..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-100 transition-all text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] bg-slate-50/50">
                  <th className="px-8 py-5 font-black">Professionnel</th>
                  <th className="px-6 py-5 font-black">Service</th>
                  <th className="px-6 py-5 font-black">Statut</th>
                  <th className="px-6 py-5 font-black text-right">Offre</th>
                  <th className="px-8 py-5 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentData.map((quote) => (
                  <tr key={quote.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <img src={quote.proAvatar} className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm" alt="" />
                        <div>
                          <p className="font-bold text-slate-900 text-sm leading-none mb-1">{quote.proName}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{quote.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-800 text-sm">{quote.serviceTitle}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><Calendar size={12}/> {quote.date}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                        quote.status === 'accepted' ? 'bg-green-50 text-green-600' : 
                        quote.status === 'pending' ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${quote.status === 'accepted' ? 'bg-green-500' : quote.status === 'pending' ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right font-black text-slate-900">
                      {quote.price ? `${quote.price} DT` : <span className="text-slate-300 font-normal italic text-xs">En attente</span>}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {quote.status === 'accepted' ? (
                          <button onClick={() => handleAction(quote, 'pay')} className="bg-[#e0692d] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-orange-100 hover:bg-black transition-all">Valider</button>
                        ) : (
                          <button onClick={() => handleAction(quote, 'details')} className="p-2 text-slate-400 hover:bg-white hover:text-blue-500 hover:shadow-sm rounded-xl transition-all"><Eye size={18}/></button>
                        )}
                        <button onClick={() => deleteQuote(quote.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="p-6 bg-slate-50/30 flex items-center justify-between border-t border-slate-50">
            <p className="text-xs font-bold text-slate-400">Page {currentPage} sur {totalPages || 1}</p>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
                className="p-2 bg-white border border-slate-100 rounded-xl disabled:opacity-30 hover:shadow-sm transition-all"
              >
                <ChevronLeft size={18}/>
              </button>
              <button 
                disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}
                className="p-2 bg-white border border-slate-100 rounded-xl disabled:opacity-30 hover:shadow-sm transition-all"
              >
                <ChevronRight size={18}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL DÉTAILS --- */}
      {showDetails && selectedQuote && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black">Détails du projet</h3>
                <button onClick={() => setShowDetails(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20}/></button>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">Ma demande</p>
                  <p className="text-slate-600 font-medium italic">"{selectedQuote.description}"</p>
                </div>
                {selectedQuote.proMessage && (
                  <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl">
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-[2px] mb-2">Réponse du Pro</p>
                    <p className="text-orange-900 font-bold">"{selectedQuote.proMessage}"</p>
                  </div>
                )}
              </div>
              <button onClick={() => setShowDetails(false)} className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL PAIEMENT --- */}
      {showPayment && selectedQuote && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden">
            <div className="bg-[#e0692d] p-10 text-white text-center">
              <ShieldCheck size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-black">Valider & Payer</h3>
              <p className="opacity-80">Règlement pour {selectedQuote.proName}</p>
            </div>
            <div className="p-10 space-y-6">
              <div className="flex justify-between items-center bg-slate-50 p-6 rounded-3xl">
                <span className="font-bold text-slate-500 uppercase text-xs tracking-widest">Montant Total</span>
                <span className="text-3xl font-black text-slate-900">{selectedQuote.price} DT</span>
              </div>
              <button onClick={() => {Swal.fire("Succès", "Paiement validé", "success"); setShowPayment(false);}} className="w-full bg-[#e0692d] text-white py-5 rounded-[24px] font-black shadow-lg shadow-orange-200 hover:scale-[1.02] transition-all">Payer maintenant</button>
              <button onClick={() => setShowPayment(false)} className="w-full text-slate-400 text-sm font-bold">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientQuotesDashboard;