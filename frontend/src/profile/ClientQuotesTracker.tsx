import React, { useState, useEffect } from 'react';
import { 
  Clock, CheckCircle, XCircle, CreditCard, 
  MessageSquare, ChevronRight, Tool, Calendar
} from 'lucide-react';
import Swal from 'sweetalert2';
import { User } from '../utils/types';



interface PublicProfileProps {
  user2: User;
}

const ClientQuotesTracker: React.FC<PublicProfileProps> = ({ user2 }) => {
  const [myQuotes, setMyQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    // Fetch API: GET /api/client/quotes
    const mockData: Quote[] = [
      {
        id: 'Q-9921',
        proName: 'Sami R.',
        proAvatar: 'https://i.pravatar.cc/150?u=pro',
        serviceTitle: 'Installation Climatiseur 12000 BTU',
        status: 'accepted',
        proposedPrice: 85,
        proMessage: 'Bonjour, je suis disponible mardi. Le prix inclut le support mural.',
        dateSent: '2026-02-03'
      },
      {
        id: 'Q-9922',
        proName: 'Mounir T.',
        proAvatar: 'https://i.pravatar.cc/150?u=pro2',
        serviceTitle: 'Réparation Fuite Eau',
        status: 'pending',
        dateSent: '2026-02-04'
      }
    ];
    setMyQuotes(mockData);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black mb-2">Mes demandes de devis</h1>
      <p className="text-gray-500 mb-8">Suivez l'état de vos demandes et validez les propositions des professionnels.</p>

      <div className="space-y-6">
        {myQuotes.map((quote) => (
          <div key={quote.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="p-6 md:p-8">
              
              {/* HEADER DE LA CARTE */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <img src={quote.proAvatar} alt="" className="w-14 h-14 rounded-2xl object-cover" />
                  <div>
                    <h3 className="font-bold text-lg">{quote.serviceTitle}</h3>
                    <p className="text-sm text-gray-400">Envoyé à <span className="text-gray-900 font-semibold">{quote.proName}</span></p>
                  </div>
                </div>
                
                {/* STATUS BADGE */}
                <div className={`px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 ${
                  quote.status === 'pending' ? 'bg-orange-50 text-orange-500' :
                  quote.status === 'accepted' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                }`}>
                  {quote.status === 'pending' && <Clock size={14} />}
                  {quote.status === 'accepted' && <CheckCircle size={14} />}
                  {quote.status === 'declined' && <XCircle size={14} />}
                  {quote.status === 'pending' ? 'EN ATTENTE' : quote.status.toUpperCase()}
                </div>
              </div>

              {/* CONTENU : RÉPONSE DU PRO */}
              {quote.status === 'accepted' ? (
                <div className="bg-gray-50 rounded-2xl p-6 mb-6 animate-in slide-in-from-top-2">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-gray-600 text-sm italic">"{quote.proMessage}"</p>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase">Prix proposé</p>
                      <p className="text-2xl font-black text-[#e0692d]">{quote.proposedPrice} DT</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-[#e0692d] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#f07e40] transition-all shadow-lg shadow-orange-100">
                      <CreditCard size={18} /> Confirmer et Payer
                    </button>
                    <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all">
                      <MessageSquare size={18} /> Discuter
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 bg-gray-50 p-4 rounded-xl">
                  <InfoIcon size={16} /> 
                  {quote.status === 'pending' 
                    ? "Le professionnel examine votre demande. Vous recevrez une notification dès qu'il répondra."
                    : "Le professionnel ne peut malheureusement pas répondre à cette demande."}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-300 border-t pt-4">
                <span className="flex items-center gap-1"><Calendar size={12}/> Demandé le {quote.dateSent}</span>
                <span className="font-medium">ID: {quote.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InfoIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);

export default ClientQuotesTracker;