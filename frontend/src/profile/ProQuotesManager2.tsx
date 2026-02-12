import React, { useState } from 'react';
import { FileText, Send, Calendar, CheckCircle2, User, Clock, MapPin, X } from 'lucide-react';
import Swal from 'sweetalert2';

const ProQuotesManager = () => {
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [prixForm, setPrixForm] = useState('');
  const [messageForm, setMessageForm] = useState('');

  // Simulation des données reçues
  const [devisRecus, setDevisRecus] = useState([
    {
      id: 102,
      objet: "Réparation Fuite Cuisine",
      description: "Fuite importante sous l'évier depuis hier soir.",
      date_souhaitee: "2026-02-09",
      statut: "pending",
      client_name: "Yassine Belhadj",
      created_at: "2026-02-08"
    }
  ]);

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    // API Call: UPDATE devis SET prix = ?, message_pro = ?, statut = 'accepted' WHERE id = ?
    Swal.fire("Devis envoyé", "Le client recevra votre proposition de prix.", "success");
    setDevisRecus(prev => prev.map(d => d.id === selectedQuote.id ? {...d, statut: 'accepted'} : d));
    setSelectedQuote(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-[#f8f9fb] min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic">Devis Reçus</h1>
          <p className="text-slate-400 font-medium">Répondez aux demandes pour sécuriser vos prochaines interventions.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_450px] gap-8">
        {/* LISTE */}
        <div className="space-y-4">
          {devisRecus.map(d => (
            <div key={d.id} onClick={() => setSelectedQuote(d)} className={`p-6 bg-white rounded-[32px] border-2 transition-all cursor-pointer hover:shadow-lg ${selectedQuote?.id === d.id ? 'border-[#e0692d]' : 'border-transparent'}`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400"><User/></div>
                  <div>
                    <h3 className="font-bold text-lg">{d.objet}</h3>
                    <p className="text-sm text-[#e0692d] font-bold uppercase">{d.client_name}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${d.statut === 'pending' ? 'bg-orange-100 text-orange-500' : 'bg-green-100 text-green-600'}`}>
                  {d.statut}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* PANNEAU DE RÉPONSE */}
        <aside>
          {selectedQuote ? (
            <div className="bg-white rounded-[40px] shadow-2xl p-8 sticky top-10 border border-slate-100">
              <h2 className="text-2xl font-black mb-6">Détails de la demande</h2>
              
              <div className="bg-slate-50 p-6 rounded-3xl mb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest text-center">Besoin du client</p>
                <p className="text-slate-600 italic text-center leading-relaxed">"{selectedQuote.description}"</p>
                <div className="flex justify-center gap-4 mt-4 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1"><Calendar size={14}/> {selectedQuote.date_souhaitee}</span>
                </div>
              </div>

              {selectedQuote.statut === 'pending' ? (
                <form onSubmit={handleSendResponse} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700">Votre Proposition (Prix en DT)</label>
                    <input type="number" required value={prixForm} onChange={e => setPrixForm(e.target.value)} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-100 outline-none font-bold text-lg" placeholder="Ex: 85" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700">Message d'accompagnement</label>
                    <textarea required value={messageForm} onChange={e => setMessageForm(e.target.value)} rows={4} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-100 outline-none" placeholder="Détails sur l'intervention, matériel inclus..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#e0692d] text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-orange-100 hover:bg-black transition-all flex items-center justify-center gap-2">
                    <Send size={20}/> Envoyer le Devis
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 bg-green-50 rounded-3xl">
                  <CheckCircle2 size={48} className="mx-auto text-green-500 mb-2"/>
                  <p className="font-black text-green-700 uppercase tracking-widest text-xs">Devis déjà traité</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[40px] text-slate-300">
              <FileText size={48} className="mb-4 opacity-20"/>
              <p className="font-medium text-center px-10">Sélectionnez une demande à gauche pour répondre</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ProQuotesManager;