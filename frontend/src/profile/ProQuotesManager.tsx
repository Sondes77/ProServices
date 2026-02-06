import React, { useState, useEffect } from 'react';
import { 
  FileText, Clock, CheckCircle, XCircle, 
  MessageCircle, Send, Calendar, MapPin, User as UserIcon
} from 'lucide-react';
import Swal from 'sweetalert2';
import { User, Quote } from '../utils/types';

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
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [responsePrice, setResponsePrice] = useState<string>('');
  const [responseMsg, setResponseMsg] = useState<string>('');

  // Simulation de chargement des devis reçus
  useEffect(() => {
    // Fetch API: GET /api/pro/quotes
    const mockQuotes: Quote[] = [
      {
        id: 'Q-9921',
        clientName: 'Yassine Belhadj',
        serviceTitle: 'Installation Climatiseur 12000 BTU',
        requestDate: '2026-02-03',
        status: 'pending',
        details: 'Installation au 3ème étage, unité extérieure accessible par balcon.',
        interventionDate: '2026-02-10'
      },
      {
        id: 'Q-9922',
        clientName: 'Yassine Salhi',
        serviceTitle: 'Installation Climatiseur 18000 BTU',
        requestDate: '2026-02-03',
        status: 'pending',
        details: 'Installation au 3ème étage, unité extérieure accessible par balcon.',
        interventionDate: '2026-02-15'
      }
    ];
    setQuotes(mockQuotes);
  }, []);

  const handleUpdateStatus = (id: string, newStatus: 'accepted' | 'declined') => {
    // API Call: PATCH /api/quotes/${id}
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
    
    if(newStatus === 'accepted') {
      Swal.fire("Devis Accepté", "Le client a été notifié de votre accord.", "success");
    } else {
      Swal.fire("Devis Refusé", "La demande a été classée.", "info");
    }
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
            {quotes.filter(q => q.status === 'pending').length} Nouveaux
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        
        {/* LISTE DES DEVIS */}
        <div className="space-y-4">
          {quotes.map(quote => (
            <div 
              key={quote.id}
              onClick={() => setSelectedQuote(quote)}
              className={`p-6 rounded-[24px] border-2 transition-all cursor-pointer bg-white hover:shadow-lg ${
                selectedQuote?.id === quote.id ? "border-[#e0692d] shadow-md" : "border-gray-50"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                    <UserIcon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{quote.clientName}</h3>
                    <p className="text-sm text-[#e0692d] font-medium">{quote.serviceTitle}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                  quote.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {quote.status}
                </span>
              </div>
              
              <div className="flex gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1"><Calendar size={14}/> Demande le {quote.requestDate}</div>
                <div className="flex items-center gap-1"><MapPin size={14}/> Intervention: {quote.interventionDate}</div>
              </div>
            </div>
          ))}
        </div>

        {/* DÉTAILS ET RÉPONSE */}
        <aside>
          {selectedQuote ? (
            <div className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 sticky top-10 animate-in slide-in-from-right duration-300">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="text-[#e0692d]" /> Détails de la demande
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-2xl mb-6 text-sm text-gray-600 leading-relaxed">
                "{selectedQuote.details}"
              </div>

              {selectedQuote.status === 'pending' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Votre proposition de prix (DT)</label>
                    <input 
                      type="number" 
                      value={responsePrice}
                      onChange={(e) => setResponsePrice(e.target.value)}
                      placeholder="Ex: 85"
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-200 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2">Message au client</label>
                    <textarea 
                      rows={3}
                      value={responseMsg}
                      onChange={(e) => setResponseMsg(e.target.value)}
                      placeholder="Précisez vos conditions..."
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-200 outline-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleUpdateStatus(selectedQuote.id, 'declined')}
                      className="py-4 rounded-2xl font-bold text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      Refuser
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedQuote.id, 'accepted')}
                      className="bg-[#e0692d] text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-[#f07e40] flex items-center justify-center gap-2"
                    >
                      <Send size={18} /> Accepter
                    </button>
                  </div>
                </div>
              )}

              {selectedQuote.status === 'accepted' && (
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
                  <p className="text-green-700 font-bold">Devis validé</p>
                  <button className="mt-4 flex items-center gap-2 mx-auto text-[#e0692d] font-bold text-sm">
                    <MessageCircle size={16} /> Ouvrir la discussion
                  </button>
                </div>
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