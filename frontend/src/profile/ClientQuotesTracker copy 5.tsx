import React, { useState, useMemo, useEffect  } from 'react';
import { Search, Clock, CheckCircle2, XCircle, Eye, Trash2, Calendar, ChevronLeft, ChevronRight, ShieldCheck, X, MapPin } from 'lucide-react';
import Swal from 'sweetalert2';
import {Devis} from '../utils/types';
import { mapDevisDataToUserModel } from '../utils/mapper';

const ClientQuotesDashboard = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // États Modaux
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const token = localStorage.getItem('token');

  // Simulation des données de ta table "devis"
  const [devis, setDevis] = useState<Devis[]>([]);
  
  useEffect(() => {
    const fetchDevis = async () => {
      try {
        
        
        const response = await fetch(`http://localhost:5000/api/devis/me`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          alert('Erreur lors de la récupération du service');
          return;
        }
        
        const data = await response.json();
        console.log("data devis = ", data);
        const devis = Array.isArray(data) ? data : [data];
        console.log("devis = ", devis);
        const mapped = mapDevisDataToUserModel(devis);
        setDevis(mapped);
        console.log("devis mappés = ", mapped);
        console.log("devis state = ", devis);
        
        /*const resp = await fetch(`http://localhost:5000/api/utilisateurId?id=${service.professionnel_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${token}`,
            },
          });
  
          if (resp.ok){
            const data = await resp.json();
            const userdata = Array.isArray(data) ? data[0] : data;
            const mapped = mapUserDataToUserModel(userdata);
            setUser(mapped);
            console.log("id profile = ",user?.id);
          } else {
            alert('Erreur lors de la récupération d\'utilisateur');
            return;
          } */      
          
      } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur de connexion au serveur');
      }
    };
    fetchDevis();
    
  }, []);

  const filteredData = useMemo(() => {
    return devis?.filter(d => {
      const matchesSearch = d.objet.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || d.statut === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter, devis]);

  const countByStatus = useMemo(() => {
    return {
      all: devis?.length,
      pending: devis?.filter(d => d.statut === 'pending').length,
      accepted: devis?.filter(d => d.statut === 'accepted').length,
      declined: devis?.filter(d => d.statut === 'declined').length,
    };
  }, [devis]);

  const totalPages = Math.max(1, Math.ceil((filteredData?.length ?? 0) / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = (filteredData ?? []).slice(start, end);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const getStatutBadge = (statut: string): string => {
    const map: Record<string, string> = {
      pending_client: "bg-orange-100 text-orange-500",
      pending_pro: "bg-orange-100 text-orange-500",
      proposed: "bg-blue-100 text-blue-500",
      accepted: "bg-green-100 text-green-500",
      rejected: "bg-red-100 text-red-500",
      cancelled: "bg-gray-200 text-gray-600"
    };

    return map[statut] || "bg-gray-100 text-gray-600";
  };

  const getStatutLabel = (statut: string): string => {
    const map: Record<string, string> = {
      pending_client: "En attente (Client)",
      pending_pro: "En attente (Pro)",
      proposed: "Proposé",
      accepted: "Accepté",
      rejected: "Refusé",
      cancelled: "Annulé"
    };

    return map[statut] || statut;
  };
  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-[1000] text-slate-900 tracking-tight italic">Suivi de mes devis</h1>
          
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
            {['all', 'pending', 'accepted', 'declined'].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${filter === s ? 'bg-slate-900 text-white' : 'text-slate-400'}`}>
                {s === 'all' ? `Tous (${countByStatus.all})` : s === 'pending' ? `En attente (${countByStatus.pending})` : s === 'accepted' ? `Reçus (${countByStatus.accepted})` : `Refusés (${countByStatus.declined})`}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[16px] shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-5">Objet & Service</th>
                  <th className="px-6 py-5">Professionnel</th>
                  <th className="px-6 py-5">Date Souhaitée</th>
                  <th className="px-6 py-5">Statut</th>
                  <th className="px-6 py-5 text-right">Prix (DT)</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentData.length > 0 ? (
                  currentData.map((d) => (
                    <tr key={d.id} className="hover:bg-orange-50/80 transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-bold text-slate-900">{d.objet}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">REF: DV-{d.id}</p>
                      </td>
                      <td className="px-6 py-5 font-semibold text-slate-600 text-sm">{d.pro_nom}</td>
                      <td className="px-6 py-5 text-sm text-slate-500 font-medium">{d.date_souhaitee}</td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getStatutBadge(d.statut)}`}>
                          {getStatutLabel(d.statut)}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right font-black text-slate-900">{d.prix || '--'}</td>
                      <td className="px-8 py-5 text-right flex justify-end gap-2">
                        <button onClick={() => {setSelectedQuote(d); setShowDetails(true)}} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-900 hover:text-white transition-all"><Eye size={18}/></button>
                        {d.statut === 'accepted' && (
                          <button onClick={() => {setSelectedQuote(d); setShowPayment(true)}} className="bg-[#e0692d] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black">Payer</button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400 font-semibold">
                      Aucun devis trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-6 px-4">

        <p className="text-sm text-slate-500 font-semibold">
          {filteredData.length} devis — Page {currentPage} / {totalPages}
        </p>

        <div className="flex items-center gap-2">

          {/* Prev */}
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border bg-white hover:bg-slate-900 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={18}/>
          </button>

          {/* Pages */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                  page === currentPage
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border bg-white hover:bg-slate-900 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={18}/>
          </button>

        </div>
      </div>

      {/* MODAL DÉTAILS */}
      {showDetails && selectedQuote && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black">{selectedQuote.objet}</h3>
              <button onClick={() => setShowDetails(false)}><X size={24}/></button>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 p-6 rounded-3xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Ma description</p>
                <p className="text-slate-700 italic">"{selectedQuote.description}"</p>
              </div>
              {selectedQuote.message_pro && (
                <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                  <p className="text-[10px] font-black text-orange-400 uppercase mb-2 tracking-widest">Réponse du Pro</p>
                  <p className="text-orange-900 font-bold">"{selectedQuote.message_pro}"</p>
                </div>
              )}
            </div>
            <button onClick={() => setShowDetails(false)} className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientQuotesDashboard;