import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Clock, CheckCircle2, XCircle, Eye, Trash2, Calendar, 
  ChevronLeft, ChevronRight, ShieldCheck, X, MapPin, 
  MessageCircle
} from 'lucide-react';
import Swal from 'sweetalert2';
import { Devis } from '../utils/types';
import { mapDevisDataToUserModel } from '../utils/mapper';
import { useNavigate } from 'react-router-dom';

const ClientQuotesDashboard = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedQuote, setSelectedQuote] = useState<Devis | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem("currentUser") || "null")?.id;
  const [devis, setDevis] = useState<Devis[]>([]);
 
  // Fetch des devis
  useEffect(() => {
    const fetchDevis = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/devis/me`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          alert('Erreur lors de la récupération du service');
          return;
        }

        const data = await response.json();
        const devisArray = Array.isArray(data) ? data : [data];
        const mapped = mapDevisDataToUserModel(devisArray);
        setDevis(mapped);
      } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur de connexion au serveur');
      }
    };
    fetchDevis();
  }, [token]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Filtres
  /*const filteredData = useMemo(() => {
    return devis?.filter(d => {
      const matchesSearch = d.objet.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || d.statut === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter, devis]);*/

  const filteredData = useMemo(() => {
    if (!devis) return [];

    switch (filter) {
      case 'pending':
        return devis.filter(d =>
          d.statut === 'pending_pro' || d.statut === 'pending_client'
        );

      case 'proposed':
        return devis.filter(d => d.statut === 'proposed');

      case 'accepted':
        return devis.filter(d =>
          d.statut === 'accepted'
        );

      case 'declined':
        return devis.filter(d =>
          d.statut === 'rejected' || d.statut === 'cancelled'
        );

      default:
        return devis;
    }
  }, [devis, filter]);

  const countByStatus = useMemo(() => {
    const counts = {
      all: 0,
      pending: 0,
      proposed: 0,
      accepted: 0,
      declined: 0,
    };

    if (!devis) return counts;

    for (const d of devis) {
      counts.all++;

      if (d.statut === 'pending_pro' || d.statut === 'pending_client') {
        counts.pending++;
      }

      if (d.statut === 'proposed') {
        counts.proposed++;
      }

      if (d.statut === 'accepted') {
        counts.accepted++;
      }

      if (d.statut === 'rejected' || d.statut === 'cancelled') {
        counts.declined++;
      }
    }

    return counts;
  }, [devis]);
  
  const totalPages = Math.max(1, Math.ceil((filteredData?.length ?? 0) / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = filteredData?.slice(start, end) ?? [];
  const navigate = useNavigate();

  useEffect(() => { setCurrentPage(1); }, [search, filter]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [totalPages]);

  const getStatutBadge = (statut: string) => {
    const map: Record<string, string> = {
      pending_client: "bg-purple-100 text-purple-500",
      pending_pro: "bg-orange-100 text-orange-500",
      proposed: "bg-blue-100 text-blue-500",
      accepted: "bg-green-100 text-green-500",
      rejected: "bg-red-100 text-red-500",
      cancelled: "bg-gray-200 text-gray-600"
    };
    return map[statut] || "bg-gray-100 text-gray-600";
  };

  const getStatutLabel = (statut: string) => {
    const map: Record<string, string> = {
      pending_client: "En attente (Client)",
      pending_pro: "En attente",
      proposed: "Proposé",
      accepted: "Accepté",
      rejected: "Refusé",
      cancelled: "Annulé"
    };
    return map[statut] || statut;
  };

  const getStatutResponse = (statut: string) => {
    const map: Record<string, string> = {
      pending_client: "En attente (Client)",
      pending_pro: "Votre demande est toujours en attente de la réponse du professionnel.",
      proposed: "Proposé",
      accepted: "Vous avez accepté la proposition du professionnel.",
      rejected: "Vous avez refusé la proposition du professionnel.",
      cancelled: "Annulé"
    };
    return map[statut] || statut;
  };

  const getStatutBoxClasses = (statut: string) => {
    const map: Record<string, string> = {
      pending_client: "bg-purple-50 border-purple-200 text-purple-700",
      pending_pro: "bg-orange-50 border-orange-200 text-orange-700",
      proposed: "bg-blue-50 border-blue-200 text-blue-700",
      accepted: "bg-green-50 border-green-200 text-green-700",
      rejected: "bg-red-50 border-red-200 text-red-700",
      cancelled: "bg-gray-100 border-gray-300 text-gray-700"
    };

    return map[statut] || "bg-gray-50 border-gray-200 text-gray-700";
  };

  const handleUpdateStatus = async (id: string, newStatus: 'accepted' | 'rejected', proId: string) => {
    
    try {
        
      const response = await fetch(`http://localhost:5000/api/devis/${id}/${newStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          pro_id: proId
        }),
      });

      if (!response.ok) {
        alert('Erreur lors de la récupération du service');
        return;
      }
      
      // ✅ UPDATE LOCAL STATE — PAS BESOIN DE REFRESH
      setDevis(prev =>
        prev.map(d =>
          d.id === id
            ? { ...d, statut: newStatus }
            : d
        )
      );

      // ✅ si le devis affiché dans le modal change aussi
      setSelectedQuote(prev =>
        prev ? { ...prev, statut: newStatus } : prev
      );

      setShowDetails(false);

    } catch (error) {
      console.error('Erreur réseau :', error);
      alert('Erreur de connexion au serveur');
    }
  };

  return  (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Header + Filtres */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-[1000] text-slate-900 tracking-tight italic">Suivi de mes devis</h1>
          
          <div className="flex flex-wrap bg-white p-1 rounded-2xl shadow-sm border border-slate-100 gap-2">
            {['all', 'pending', 'accepted', 'declined'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${filter === s ? 'bg-slate-900 text-white' : 'text-slate-400'}`}
              >
                {s === 'all' ? `Tous (${countByStatus.all})` : s==='pending' ? `En attente (${countByStatus.pending})` : s === 'accepted' ? `Acceptés (${countByStatus.accepted})` : `Refusés (${countByStatus.declined})`}
              </button>
            ))}
          </div>
        </div>

        {/* Table pour desktop */}
        <div className="hidden md:block bg-white rounded-[16px] shadow-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-4 py-3">Objet & Service</th>
                <th className="px-4 py-3">Professionnel & Client</th>
                <th className="px-4 py-3">Date Souhaitée</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3 text-right">Prix (DT)</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentData.map(d => (
                <tr key={d.id} className="hover:bg-orange-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{d.objet}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">REF: DV-{d.id}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-600 text-sm cursor-pointer hover:text-[#e0692d]" onClick={() => navigate(`/professional/${d.pro_id}`)}>{d.pro_nom}</p>
                    {d.pro_role === 'professional' ? (
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">(Pro)</p>
                    ):(
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">(Client)</p>
                    )}
                    
                    
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500 font-medium">{formatDate(d.date_souhaitee)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${getStatutBadge(d.statut)}`}>
                      {getStatutLabel(d.statut)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-black text-slate-900">{d.prix || '--'}</td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2 flex-wrap">
                    {d.statut === 'accepted' && (
                      <button className="bg-[#e0692d] text-white px-2 py-2 rounded-xl text-xs font-bold hover:bg-black">
                        <MessageCircle size={18} />
                      </button>
                    )}
                    <button onClick={() => { setSelectedQuote(d); setShowDetails(true); }} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards pour mobile/tablette */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {currentData.map(d => (
            <div key={d.id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-shadow flex flex-col justify-between">
              
              <div className="mb-4">
                <p className="text-sm font-bold text-slate-900">{d.objet}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">REF: DV-{d.id}</p>
              </div>

              <div className="mb-4 text-sm text-slate-600">
                <p>
                  <span className="font-bold">Pro:</span>{" "}
                  <span
                    className="cursor-pointer hover:text-[#e0692d] transition"
                    onClick={() => navigate(`/professional/${d.pro_id}`)}
                  >
                    {d.pro_nom}
                  </span>
                </p>
                <p><span className="font-bold">Date:</span> {formatDate(d.date_souhaitee)}</p>
              </div>

              <div className="mb-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${getStatutBadge(d.statut)}`}>
                  {getStatutLabel(d.statut)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-black text-slate-900">{d.prix || '--'} DT</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSelectedQuote(d); setShowDetails(true); }}
                    className="p-2 bg-slate-100 rounded-xl hover:bg-slate-900 hover:text-white transition-all"
                  >
                    <Eye size={18} />
                  </button>
                  {d.statut === 'accepted' && (
                    <button className="bg-[#e0692d] text-white px-3 py-1 rounded-xl text-xs font-bold hover:bg-black">
                      <MessageCircle size={18} />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4 px-2 md:px-0">
          <p className="text-sm text-slate-500 font-semibold">
            {filteredData.length} devis — Page {currentPage} / {totalPages}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border bg-white hover:bg-slate-900 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${page === currentPage ? 'bg-slate-900 text-white' : 'bg-white border hover:bg-slate-100'}`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border bg-white hover:bg-slate-900 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Modal Détails */}
        {showDetails && selectedQuote && (
          <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <span>
                <h3 className="text-2xl font-black">{selectedQuote.objet}</h3>
                <p className="text-xs text-slate-500">Date de la demande: {formatDate(selectedQuote.created_at)}</p></span>
                <button onClick={() => setShowDetails(false)}><X size={24} /></button>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Ma description</p>
                  <p className="text-slate-700 italic">{selectedQuote.description}</p>
                </div>
                {selectedQuote.message_pro && (
                  <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                    <p className="text-[10px] font-black text-orange-400 uppercase mb-2 tracking-widest">Réponse du Pro</p>
                    <p className="text-orange-900 font-bold">{selectedQuote.message_pro}</p>
                  </div>
                )}
                {selectedQuote.prix && (
                  <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                    <p className="text-[10px] font-black text-orange-400 uppercase mb-2 tracking-widest">Prix proposé</p>
                    <p className="text-orange-900 font-bold">{selectedQuote.prix} DT</p>
                  </div>
                )}
              </div>
              {selectedQuote.statut === "proposed" ? (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleUpdateStatus(selectedQuote.id, 'rejected', selectedQuote.pro_id)}
                  className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold hover:bg-red-600 transition"
                >
                  Refuser
                </button>

                <button
                  onClick={() => handleUpdateStatus(selectedQuote.id, 'accepted', selectedQuote.pro_id)}
                  className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition"
                >
                  Accepter
                </button>

              </div>
              ) : (
                <>
                  <div className={`p-6 mt-3 rounded-3xl border ${getStatutBoxClasses(selectedQuote.statut)}`}>
                    <p className="text-[10px] font-black uppercase mb-2 tracking-widest opacity-70">Votre réponse</p>
                    <p className="text-[11px]">
                      {getStatutResponse(selectedQuote.statut)}
                    </p>
                  </div>
                  <button onClick={() => setShowDetails(false)} className="w-full mt-8 bg-slate-800 text-white py-4 rounded-2xl font-bold">Fermer</button>
                </>
              )}
              
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientQuotesDashboard;
