import React, { useState, useEffect } from 'react';
import { 
  FileText, Clock, CheckCircle, XCircle, 
  MessageCircle, Send, Calendar, MapPin, User as UserIcon
} from 'lucide-react';
import Swal from 'sweetalert2';
import { User, Devis } from '../utils/types';
import { mapDevisDataToUserModel } from '../utils/mapper';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

// Types pour la gestion des devis
/*interface QuoteRequest {
  id: string;
  clientName: string;
  serviceTitle: string;
  requestDate: string;
  status: 'pending' | 'accepted' | 'declined';
  details: string;
  interventionDate: string;
  priceProposed?: number;
}*/

interface PublicProfileProps {
  user2: User;
}

const ProQuotesManager:  React.FC<PublicProfileProps> = ({ user2 }) => {
  const [quotes, setQuotes] = useState<Devis[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Devis | null>(null);
  const [responsePrice, setResponsePrice] = useState<string>('');
  const [responseMsg, setResponseMsg] = useState<string>('');
  const token = localStorage.getItem('token');
  const { Id } = useParams<{ Id: string }>();
  
  useEffect(() => {
    console.log(Id);
    const fetchDevis = async () => {
      try {
        
        const response = await fetch(`http://localhost:5000/api/devis/pro`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          alert('Erreur lors de la récupération du service');
          return;
        }
        
        const data = await response.json();
        const devis = Array.isArray(data) ? data : [data];
        const mapped = mapDevisDataToUserModel(devis);
        setQuotes(mapped);

        // ✅ Sélection auto via URL
        if (Id) {
          const found = mapped.find(d => String(d.id) === String(Id));
          console.log("found = ", found);
          if (found) setSelectedQuote(found);
        }
          
      } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur de connexion au serveur');
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
    status: 'accepted' | 'cancelled',
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
        alert('Erreur lors de l’envoi de la proposition');
        return;
      }

      const data = await response.json();

      // update UI direct
      setQuotes(prev =>
        prev.map(q =>
          q.id === quoteId ? { ...q, status } : q
        )
      );

      if (status === 'accepted') {
        Swal.fire("Devis Accepté", "Le client a été notifié.", "success");
      } else {
        Swal.fire("Devis Refusé", "La demande a été classée.", "info");
      }

      setSelectedQuote(null);
      setResponseMsg('');
      setResponsePrice('');

    } catch (error) {
      console.error(error);
      alert('Erreur serveur');
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
        `http://localhost:5000/api/devis/${quoteId}/cancel`,
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
        alert('Erreur lors de l’envoi de la proposition');
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
      console.error(error);
      alert('Erreur serveur');
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        
        {/* LISTE DES DEVIS */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          
          {/* zone scrollable */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            
            {quotes.length === 0 && (
              <div className="text-center text-gray-400 py-10">
                Aucun devis trouvé
              </div>
            )}

            {quotes.map((quote) => (
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
                <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    Demande le: {formatDate(quote.created_at)}
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    Date souhaitée: {formatDate(quote.date_souhaitee)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* DÉTAILS ET RÉPONSE */}
        <aside>
          {selectedQuote ? (
            <div className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 sticky top-10 animate-in slide-in-from-right duration-300">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="text-[#e0692d]" /> Détails de la demande
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-2xl mb-6 text-sm text-gray-600 leading-relaxed">
                "{selectedQuote.description}"
              </div>

              {selectedQuote.statut === 'pending_pro' && (
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendResponse(e, selectedQuote.id, 'accepted', selectedQuote.client_id)
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