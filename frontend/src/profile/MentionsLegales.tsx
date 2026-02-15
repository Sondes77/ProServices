import React from 'react';
import { 
  Building2, Server, Globe, FileText, 
  Copyright, ShieldAlert, Cookie, Mail, Download 
} from 'lucide-react';

const LegalSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-[#e0692d]/30 transition-colors mb-8">
    <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
      <div className="p-2 bg-orange-50 rounded-lg text-[#e0692d]">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
    </div>
    <div className="text-slate-600 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- HEADER SIMPLE & CLEAN --- */}
      <div className="bg-slate-900 pt-32 pb-16 px-4 relative overflow-hidden">
        {/* Background Abstract */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -left-[10%] w-[500px] h-[500px] bg-[#e0692d] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-blob"></div>
          <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-6 uppercase tracking-wider">
            <FileText className="w-3 h-3" /> Transparence
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Mentions Légales</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Conformément aux dispositions de la loi sur l'économie numérique, nous vous présentons l'identité des acteurs de la plateforme.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        
        {/* --- BLOC 1 : IDENTITÉS (GRID SYSTEM) --- */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          {/* Carte Éditeur */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#e0692d]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Propriétaire du site</h3>
                <h2 className="text-2xl font-bold text-slate-900">L'Éditeur</h2>
              </div>
              <Building2 className="w-8 h-8 text-[#e0692d]" />
            </div>
            
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex justify-between border-b border-slate-50 pb-2">
                <span className="font-semibold text-slate-900">Raison Sociale :</span>
                <span>ServicePro Tunisie S.A.R.L</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-2">
                <span className="font-semibold text-slate-900">Capital Social :</span>
                <span>10 000 DT</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-2">
                <span className="font-semibold text-slate-900">Matricule Fiscale :</span>
                <span>1234567/A/M/000</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-2">
                <span className="font-semibold text-slate-900">Siège Social :</span>
                <span className="text-right">Immeuble Business,<br/>Les Berges du Lac 2, Tunis</span>
              </li>
              <li className="flex justify-between pt-2">
                <span className="font-semibold text-slate-900">Directeur de pub. :</span>
                <span>M. Ahmed Tounsi</span>
              </li>
            </ul>
          </div>

          {/* Carte Hébergeur */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-slate-800">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Stockage des données</h3>
                <h2 className="text-2xl font-bold text-slate-900">L'Hébergeur</h2>
              </div>
              <Server className="w-8 h-8 text-slate-800" />
            </div>
            
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex justify-between border-b border-slate-50 pb-2">
                <span className="font-semibold text-slate-900">Société :</span>
                <span>AWS / OVH Cloud</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-2">
                <span className="font-semibold text-slate-900">Adresse :</span>
                <span className="text-right">2 rue Kellermann,<br/>59100 Roubaix, France</span>
              </li>
              <li className="flex justify-between border-b border-slate-50 pb-2">
                <span className="font-semibold text-slate-900">Site Web :</span>
                <a href="https://ovhcloud.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">www.ovhcloud.com</a>
              </li>
              <li className="flex justify-between pt-2">
                <span className="font-semibold text-slate-900">Contact technique :</span>
                <span>support@ovh.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- BLOC 2 : CONTENU TEXTUEL DETAILLÉ --- */}
        
        <LegalSection title="Propriété Intellectuelle" icon={Copyright}>
          <p>
            L'ensemble de ce site relève de la législation tunisienne et internationale sur le droit d'auteur et la propriété intellectuelle. 
            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
          <p>
            La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            Les marques citées sur ce site sont déposées par les sociétés qui en sont propriétaires.
          </p>
        </LegalSection>

        <LegalSection title="Protection des Données (RGPD / INPDP)" icon={ShieldAlert}>
          <p>
            Conformément à la loi organique n° 2004-63 du 27 juillet 2004 portant sur la protection des données à caractère personnel, 
            ServicePro s'engage à préserver la confidentialité des informations fournies en ligne par l'internaute.
          </p>
          <p>
            Les informations recueillies font l’objet d’un traitement informatique destiné à la mise en relation Client/Professionnel. 
            Le destinataire des données est exclusivement le service client de ServicePro et les professionnels sollicités.
          </p>
          <div className="mt-4 p-4 bg-slate-100 rounded-xl border border-slate-200 text-sm flex gap-3 items-center">
            <Mail className="w-5 h-5 text-slate-500" />
            <span>
              Pour exercer vos droits d'accès, de modification ou de suppression, contactez notre DPO : 
              <a href="mailto:contact@servicepro.tn" className="text-[#e0692d] font-bold ml-1 hover:underline">contact@servicepro.tn</a>
            </span>
          </div>
        </LegalSection>

        <LegalSection title="Cookies & Traceurs" icon={Cookie}>
          <p>
            Le site ServicePro.tn utilise des cookies pour améliorer l'expérience utilisateur, réaliser des statistiques de visites et vous proposer des offres adaptées.
            En poursuivant votre navigation sur ce site, vous acceptez l’utilisation de cookies.
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Cookies fonctionnels :</strong> Nécessaires au fonctionnement du site (connexion, panier).</li>
            <li><strong>Cookies analytiques :</strong> Google Analytics (anonymisés).</li>
          </ul>
        </LegalSection>

        {/* --- FOOTER DE DOCUMENT --- */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-400 text-sm">
            © 2026 ServicePro Tunisie. Tous droits réservés.
          </p>
          <button className="hidden md:flex items-center gap-2 text-slate-600 hover:text-[#e0692d] text-sm font-semibold transition-colors">
            <Download className="w-4 h-4" />
            Télécharger ce document (PDF)
          </button>
        </div>

      </div>
    </div>
  );
};

export default MentionsLegales;