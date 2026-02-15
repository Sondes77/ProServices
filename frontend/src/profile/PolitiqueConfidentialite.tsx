import React from 'react';
import { 
  Lock, Eye, Database, Share2, 
  Trash2, UserCheck, ShieldCheck, Clock,
  ExternalLink
} from 'lucide-react';

const DataCard = ({ title, items, icon: Icon }: { title: string, items: string[], icon: any }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#e0692d] mb-4">
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="font-bold text-slate-900 mb-3">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900">

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 text-[#e0692d] mb-4">
            <Lock className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Sécurité des données</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Respect de votre vie privée
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Chez <strong>ServicePro</strong>, nous considérons la protection de vos données personnelles comme une priorité absolue. 
            Cette politique explique en toute transparence quelles données nous collectons, pourquoi nous le faisons et comment nous les protégeons.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-16">
        
        {/* --- 1. COLLECTE DES DONNÉES --- */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold">1. Quelles données collectons-nous ?</h2>
            <div className="h-px flex-grow bg-slate-200"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <DataCard 
              icon={UserCheck}
              title="Informations de Profil"
              items={["Nom et prénom", "Adresse email", "Numéro de téléphone", "Photo de profil"]}
            />
            <DataCard 
              icon={Database}
              title="Données Techniques"
              items={["Adresse IP", "Type de navigateur", "Données de géolocalisation", "Historique de navigation"]}
            />
            <DataCard 
              icon={Share2}
              title="Données Professionnelles"
              items={["Certifications", "Assurances", "Tarifs horaires", "Réalisations passées"]}
            />
          </div>
        </div>

        {/* --- 2. UTILISATION DES DONNÉES --- */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-12 mb-20 text-white relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">2. Comment utilisons-nous vos données ?</h2>
              <div className="space-y-4">
                {[
                  "Mise en relation directe entre clients et prestataires.",
                  "Envoi de notifications en temps réel pour vos rendez-vous.",
                  "Amélioration continue de l'algorithme de recherche.",
                  "Prévention de la fraude et vérification des comptes.",
                  "Support client et résolution des litiges."
                ].map((text, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <ShieldCheck className="w-6 h-6 text-[#e0692d] flex-shrink-0" />
                    <p className="text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <Clock className="w-8 h-8 text-[#e0692d] mb-4" />
                <h4 className="font-bold mb-2">Durée de conservation</h4>
                <p className="text-sm text-slate-400">
                  Nous conservons vos données aussi longtemps que votre compte est actif. 
                  En cas de suppression, certaines données sont archivées pendant 5 ans pour répondre à nos obligations légales (facturation, litiges).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. VOS DROITS --- */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold">3. Vos droits et libertés</h2>
            <div className="h-px flex-grow bg-slate-200"></div>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-6 p-6 bg-white rounded-2xl border border-slate-100">
              <Eye className="w-12 h-12 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">Droit d'accès et de rectification</h3>
                <p className="text-slate-600">Vous pouvez modifier l'intégralité de vos informations personnelles directement depuis les paramètres de votre compte.</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white rounded-2xl border border-slate-100">
              <Trash2 className="w-12 h-12 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">Droit à l'oubli</h3>
                <p className="text-slate-600">Vous avez le droit de demander la suppression définitive de vos données personnelles de nos serveurs à tout moment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. PARTAGE ET SÉCURITÉ --- */}
        <div className="mt-20 p-8 bg-orange-50 rounded-3xl border border-orange-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Partage avec des tiers</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Nous ne vendons <strong>jamais</strong> vos données personnelles à des fins commerciales. 
            Le partage ne s'effectue que dans deux cas :
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl text-sm">
              <span className="font-bold text-[#e0692d]">1. Partenaires techniques :</span> Pour le paiement sécurisé (Stripe/Flouci) et l'envoi d'emails.
            </div>
            <div className="bg-white p-4 rounded-xl text-sm">
              <span className="font-bold text-[#e0692d]">2. Obligation légale :</span> Sur requête des autorités judiciaires tunisiennes uniquement.
            </div>
          </div>
        </div>

        {/* --- CONTACT DPO --- */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm mb-4">Une question sur la gestion de vos données ?</p>
          <a 
            href="mailto:contact@servicepro.tn" 
            className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-[#e0692d] transition-colors"
          >
            Contacter notre délégué à la protection des données (DPO) <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </main>
    </div>
  );
};

export default PolitiqueConfidentialite;