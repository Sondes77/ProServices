import React, { useState, useEffect } from 'react';
import { 
  FileText, Clock, CheckCircle, XCircle, 
  MessageCircle, Send, Calendar, MapPin, User as UserIcon,
  Search,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import Swal from 'sweetalert2';
import { User, Devis } from '../utils/types';
import { mapDevisDataToUserModel } from '../utils/mapper';
import { Navigate, useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import CustomPicker from './CustomPicker';
import CustomSelect from './CustomSelect';

interface ProQuoteProps {
  user2: User;
}

const ProQuotesManager:  React.FC<ProQuoteProps> = ({ user2 }) => {
  const [quotes, setQuotes] = useState<Devis[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Devis | null>(null);
  const [responsePrice, setResponsePrice] = useState<string>('');
  const [responseMsg, setResponseMsg] = useState<string>('');
  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem("currentUser") || "null")?.id;
  const { Id } = useParams<{ Id: string }>();
  const [checkingAccess, setCheckingAccess] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  // Logique de filtrage calculée
  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.pro_nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          quote.objet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quote.id.toString().includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || quote.statut === filterStatus;
    
    // Filtrage par date (on compare les chaînes YYYY-MM-DD)
    const matchesDate = !filterDate || quote.created_at.includes(filterDate);

    return matchesSearch && matchesStatus && matchesDate;
  });

  useEffect(() => {   
    const fetchDevis = async () => {
      try {
        
        const response = await fetch(`http://localhost:5000/api/devis/pro`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          Swal.fire({
            toast: true, // active le mode toast
            position: "top-end", // en haut à droite
            showConfirmButton: false, // pas de bouton OK
            timer: 1500, // durée d'affichage
            timerProgressBar: true, // barre de progression
            icon: "warning",
            //title: selectedService ? "Service mis à jour" : "Service créé",
            text: "Erreur lors de la récupération de données",
            showClass: {
              popup: "animate__animated animate__slideInRight", // entrée animée
            },
            hideClass: {
              popup: "animate__animated animate__slideOutRight", // sortie animée
            },
            customClass: {
              popup: "rounded-2xl shadow-lg p-4", // style chic
            },
          });
          
          return;
        }
        
        const data = await response.json();
        const devis = Array.isArray(data) ? data : [data];
        const mapped = mapDevisDataToUserModel(devis);
        //setQuotes(mapped);

        // ✅ Sélection auto via URL
        if (Id) {
          const found = mapped.find(d =>
          String(d.id) === String(Id) &&
          (String(d.pro_id) === String(userId) ||
          String(d.client_id) === String(userId))
        );

          if (!found) {
            navigate('/mes-devis');
            return;
          }

          // ✅ autorisé
          setQuotes(mapped);
          setSelectedQuote(found);
        } else setQuotes(mapped);
          
      } catch (error) {
        Swal.fire({
          toast: true, // active le mode toast
          position: "top-end", // en haut à droite
          showConfirmButton: false, // pas de bouton OK
          timer: 1500, // durée d'affichage
          timerProgressBar: true, // barre de progression
          icon: "warning",
          //title: selectedService ? "Service mis à jour" : "Service créé",
          text: "Erreur réseau",
          showClass: {
            popup: "animate__animated animate__slideInRight", // entrée animée
          },
          hideClass: {
            popup: "animate__animated animate__slideOutRight", // sortie animée
          },
          customClass: {
            popup: "rounded-2xl shadow-lg p-4", // style chic
          },
        });
      }
    };
    fetchDevis();
  }, []);


  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSendResponse = async (
    e: React.FormEvent,
    quoteId: string,
    status: 'proposed' | 'cancelled',
    proId: string
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/devis/${quoteId}/propose`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            prix: responsePrice,
            message_pro: responseMsg,
            status,
            pro_id: proId
          }),
        }
      );

      if (!response.ok) {
        Swal.fire({
          toast: true, // active le mode toast
          position: "top-end", // en haut à droite
          showConfirmButton: false, // pas de bouton OK
          timer: 1500, // durée d'affichage
          timerProgressBar: true, // barre de progression
          icon: "warning",
          //title: selectedService ? "Service mis à jour" : "Service créé",
          text: "Erreur lors de l’envoi de la proposition",
          showClass: {
            popup: "animate__animated animate__slideInRight", // entrée animée
          },
          hideClass: {
            popup: "animate__animated animate__slideOutRight", // sortie animée
          },
          customClass: {
            popup: "rounded-2xl shadow-lg p-4", // style chic
          },
        });
        
        return;
      }

      const data = await response.json();

      // update UI direct
      setQuotes(prev =>
        prev.map(q =>
          q.id === quoteId ? { ...q, statut: 'proposed' } : q
        )
      );
      
      setSelectedQuote(null);
      setResponseMsg('');
      setResponsePrice('');

      if (status === 'proposed') {
        Swal.fire("Devis Accepté", "Le client a été notifié.", "success");
      } else {
        Swal.fire("Devis Refusé", "La demande a été classée.", "info");
      }


    } catch (error) {
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "warning",
        //title: selectedService ? "Service mis à jour" : "Service créé",
        text: "Erreur serveur",
        showClass: {
          popup: "animate__animated animate__slideInRight", // entrée animée
        },
        hideClass: {
          popup: "animate__animated animate__slideOutRight", // sortie animée
        },
        customClass: {
          popup: "rounded-2xl shadow-lg p-4", // style chic
        },
      });
        
    }
  };

 const handleCancelResponse = async (
    e: React.FormEvent,
    quoteId: string,
    proId: string
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/devis/${quoteId}/cancelled`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            pro_id: proId
          }),
        }
      );

      if (!response.ok) {
        Swal.fire({
          toast: true, // active le mode toast
          position: "top-end", // en haut à droite
          showConfirmButton: false, // pas de bouton OK
          timer: 1500, // durée d'affichage
          timerProgressBar: true, // barre de progression
          icon: "warning",
          //title: selectedService ? "Service mis à jour" : "Service créé",
          text: "Erreur lors de l’annulation de la demande",
          showClass: {
            popup: "animate__animated animate__slideInRight", // entrée animée
          },
          hideClass: {
            popup: "animate__animated animate__slideOutRight", // sortie animée
          },
          customClass: {
            popup: "rounded-2xl shadow-lg p-4", // style chic
          },
        });
        return;
      }

      const data = await response.json();

      // update UI direct
      setQuotes(prev =>
        prev.map(q =>
          q.id === quoteId ? { ...q, statut: 'cancelled' } : q
        )
      );

      setSelectedQuote(null);
      setResponseMsg('');
      setResponsePrice('');

    } catch (error) {
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "warning",
        //title: selectedService ? "Service mis à jour" : "Service créé",
        text: "Erreur serveur",
        showClass: {
          popup: "animate__animated animate__slideInRight", // entrée animée
        },
        hideClass: {
          popup: "animate__animated animate__slideOutRight", // sortie animée
        },
        customClass: {
          popup: "rounded-2xl shadow-lg p-4", // style chic
        },
      });
    }
  };
  
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
      pending_pro: "Le client attend votre proposition.",
      proposed: "Le client a bien reçu votre proposition.",
      accepted: "Le client a accepté votre proposition.",
      rejected: "Le client a refusé votre proposition.",
      cancelled: "Vous avez annulé la demande du client."
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

  if (Id && !checkingAccess) return null;
  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Gestion des Devis</h1>
          <p className="text-gray-500">Gérez vos demandes de travaux et répondez aux clients.</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-orange-100 text-[#e0692d] px-4 py-1 rounded-full text-sm font-bold">
            {quotes.filter(q => q.statut === 'pending_pro').length} Nouveaux
          </span>
        </div>
      </div>
 
      <div className="bg-white p-2 rounded-[24px] shadow-sm border border-slate-100 mb-8 flex flex-col lg:flex-row gap-2">
        {/* 1. Recherche Texte */}
        <div className="relative flex-[2]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Client, objet, REF..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-[18px] focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 flex-[3]">
          {/* 2. Filtre par Date (Le look est épuré) */}
          <div className="relative flex-1">
            <CustomPicker
              value={filterDate}
              onChange={setFilterDate}
            />
            {/*<Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              type="date"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-[18px] focus:ring-2 focus:ring-orange-100 outline-none text-sm text-slate-600 font-medium appearance-none"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            {filterDate && (
              <button 
                onClick={() => setFilterDate('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-400"
              >
                <XCircle size={14} />
              </button>
            )}*/}
          </div>

          {/* 3. Filtre par Statut */}
          <div className="relative flex-1">
            <CustomSelect
              name="filtre" 
              value={filterStatus} 
              onChange={(value: string) => setFilterStatus(value as 'all' | 'pending_pro' | 'proposed' | 'accepted' | 'rejected' | 'cancelled')}
              options={[
                {value:'all', label: 'Tous les statuts'},
                {value:'pending_pro', label: 'À répondre (Nouveau)'},
                {value:'proposed', label: 'Offres envoyées'},
                {value:'accepted', label: 'Acceptés'},
                {value:'rejected', label: 'Refusés'},
                {value:'cancelled', label: 'Annulés'},
              ]} 
            />
        
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* LISTE DES DEVIS */}
        <div className="bg-white p-3 rounded-lg shadow-md">
          {/* zone scrollable */}
          <div className="space-y-4 max-h-[650px] overflow-y-auto custom-scrollbar -mr-2 pr-1">
            
            {filteredQuotes.length === 0 ? (
              <div className="text-center text-gray-400 py-16 bg-slate-50 rounded-[24px] border-2 border-dashed border-slate-100">
                <Search size={40} className="mx-auto mb-3 opacity-20" />
                <p>Aucun devis ne correspond à votre recherche</p>
              </div>
            ) : (
            filteredQuotes.map((quote) => (
              <div
                key={quote.id}
                onClick={() => setSelectedQuote(quote)}
                className={`p-6 rounded-[24px] border-2 transition-all cursor-pointer hover:shadow-lg ${
                  selectedQuote?.id === quote.id
                    ? "border-[#e0692d] shadow-md bg-orange-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                {/* HEADER */}
                <div className="flex justify-between items-start mb-4">
                  
                  <div className="flex items-center gap-3">
                    {quote.pro_role === "professional" ? (
                      <div className="relative w-12 h-12">
                        <img
                          src={quote.pro_photo}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />

                        <CheckCircle size={12}
                          className="flex absolute bottom-0 right-0
                                    bg-[#e0692d] w-4 h-4 text-white rounded-full 
                                    border-2 border-[#e0692d] shadow"
                        />
                      </div>
                    ) : (
                      <img
                          src={quote.pro_photo}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                    )}
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {quote.pro_nom}
                      </h3>
                      <p className="text-sm text-[#e0692d] font-medium">
                        {quote.objet}
                      </p>
                    </div>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatutBadge(quote.statut)}`}
                  >
                    {getStatutLabel(quote.statut)}
                  </span>
                </div>

                {/* FOOTER INFOS */}
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">

                  {/* Bloc gauche */}
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      Demande le: {formatDate(quote.created_at)}
                    </div>

                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      Date souhaitée: {formatDate(quote.date_souhaitee)}
                    </div>
                  </div>

                  {/* Bloc droite */}
                  <p className="text-slate-400 font-bold uppercase whitespace-nowrap">
                    REF: DV-{quote.id}
                  </p>

                </div>
              </div>
            )))}
          </div>
        </div>

        {/* DÉTAILS ET RÉPONSE */}
        <aside>
          {selectedQuote ? (
            <div className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 sticky top-10 animate-in slide-in-from-right duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
                {/* Bloc gauche */}
                <div className="min-w-0">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FileText className="text-[#e0692d]" />
                    Détails de la demande
                  </h2>

                  <div className="text-xs text-slate-500">
                    Date souhaitée: {formatDate(selectedQuote.date_souhaitee)}
                  </div>
                </div>

                {/* Bloc droite */}
                <p className="text-xs text-slate-400 font-bold uppercase whitespace-nowrap sm:text-right">
                  REF: DV-{selectedQuote.id}
                </p>

              </div>
              
              <div className="bg-gray-50 p-4 rounded-2xl mb-6 text-sm text-gray-600 leading-relaxed">
                "{selectedQuote.description}"
              </div>
              <div className="space-y-4">
                {selectedQuote.message_pro && (
                  <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                    <p className="text-[10px] font-black text-orange-400 uppercase mb-2 tracking-widest">Votre Réponse</p>
                    <p className="text-orange-900 font-bold">{selectedQuote.message_pro}</p>
                  </div>
                )}
                {selectedQuote.prix && (
                  <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                    <p className="text-[10px] font-black text-orange-400 uppercase mb-2 tracking-widest">Prix proposé</p>
                    <p className="text-orange-900 font-bold">{selectedQuote.prix} DT</p>
                  </div>
                )}
                {selectedQuote.statut !== 'pending_pro' && (
                <div className={`p-6 mt-3 rounded-3xl border ${getStatutBoxClasses(selectedQuote.statut)}`}>
                    {/*<p className="text-[10px] font-black uppercase mb-2 tracking-widest opacity-70">Votre réponse</p>*/}
                    <p className="text-xs">
                      {getStatutResponse(selectedQuote.statut)}
                    </p>
                </div>
                )}
              </div>
              {selectedQuote.statut === 'pending_pro' && (
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendResponse(e, selectedQuote.id, 'proposed', selectedQuote.client_id)
                  }}
                >
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Votre proposition de prix (DT)
                    </label>
                    <input 
                      type="number" 
                      value={responsePrice}
                      onChange={(e) => setResponsePrice(e.target.value)}
                      placeholder="Ex: 85"
                      required
                      min="1"
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-200 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Message au client
                    </label>
                    <textarea 
                      rows={3}
                      value={responseMsg}
                      onChange={(e) => setResponseMsg(e.target.value)}
                      placeholder="Précisez vos conditions..."
                      required
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-200 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Refuser = bouton normal */}
                    <button 
                      type="button"
                      onClick={(e) => handleCancelResponse(e, selectedQuote.id, selectedQuote.client_id)}
                      className="py-4 rounded-2xl font-bold text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      Refuser
                    </button>

                    {/* Accepter = submit → déclenche required */}
                    <button 
                      type="submit"
                      className="bg-[#e0692d] text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-[#f07e40] flex items-center justify-center gap-2"
                    >
                      <Send size={18} /> Accepter
                    </button>

                  </div>
                </form>
              )}

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-100 rounded-[32px] p-10">
              <FileText size={48} className="mb-4 opacity-20" />
              <p>Sélectionnez un devis pour répondre</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ProQuotesManager;