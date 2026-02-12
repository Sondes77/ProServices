import React, { useState } from 'react';
import { 
  Clock, CheckCircle2, XCircle, MessageSquare, 
  ArrowRight, MoreVertical, MapPin, Calendar, ExternalLink 
} from 'lucide-react';

const ClientQuotesTracker = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header avec Navigation Chic */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mes Devis</h1>
          <p className="text-slate-500 mt-2">Suivez et gérez vos demandes d'intervention.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          {['all', 'pending', 'accepted'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab 
                ? "bg-white text-[#e0692d] shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === 'all' ? 'Tous' : tab === 'pending' ? 'En attente' : 'Validés'}
            </button>
          ))}
        </div>
      </div>

      {/* Grille de Projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* CARTE DEVIS UNITAIRE */}
        <div className="group bg-white rounded-[32px] border border-slate-100 p-2 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="relative">
                <img 
                  src="https://i.pravatar.cc/150?u=pro1" 
                  className="w-14 h-14 rounded-2xl object-cover ring-4 ring-orange-50" 
                  alt="Pro" 
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
              <button className="text-slate-300 hover:text-slate-600 p-2"><MoreVertical size={20}/></button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#e0692d] transition-colors">
              Plomberie & Sanitaire
            </h3>
            <p className="text-slate-400 text-sm font-medium">Sami R. • Plombier Expert</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-slate-500 text-xs gap-2">
                <Calendar size={14} /> Demande envoyée le 05 Fév.
              </div>
              <div className="flex items-center text-slate-500 text-xs gap-2">
                <MapPin size={14} /> Tunis, La Marsa
              </div>
            </div>
          </div>

          {/* Zone Action : État du Devis */}
          <div className="bg-slate-50 rounded-[24px] p-5 mt-2">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Statut</span>
              <span className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                <Clock size={12}/> EN EXAMEN
              </span>
            </div>
            
            <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
              <MessageSquare size={16}/> Voir les messages
            </button>
          </div>
        </div>

        {/* CARTE DEVIS ACCEPTÉ (VERSION CHIC) */}
        <div className="group bg-white rounded-[32px] border-2 border-[#e0692d]/10 p-2 shadow-xl shadow-orange-500/5 transition-all duration-300">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <img src="https://i.pravatar.cc/150?u=pro2" className="w-14 h-14 rounded-2xl object-cover ring-4 ring-green-50" alt="Pro" />
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase">Offre reçue</p>
                <p className="text-2xl font-black text-[#e0692d]">120 DT</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 leading-tight">Installation Climatisation</h3>
            <p className="text-slate-400 text-sm font-medium mb-4">Mounir T.</p>
            
            <div className="bg-green-50/50 p-3 rounded-xl border border-green-100/50">
              <p className="text-xs text-green-700 italic font-medium leading-relaxed">
                "Je peux intervenir demain à partir de 14h. Travail garanti 1 an."
              </p>
            </div>
          </div>

          <div className="bg-[#e0692d] rounded-[24px] p-2 mt-2">
            <button className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2">
              ACCEPTER LA PROPOSITION <ArrowRight size={18}/>
            </button>
          </div>
        </div>

      </div>

      {/* Empty State chic */}
      {/* <div className="text-center py-20 opacity-20">... Aucun devis ...</div> */}
    </div>
  );
};

export default ClientQuotesTracker;