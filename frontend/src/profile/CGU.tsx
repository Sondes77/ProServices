import React, { useState, useEffect } from 'react';
import { 
  Shield, Scale, Users, AlertTriangle, 
  FileText, Lock, Mail, ChevronRight, ArrowUp 
} from 'lucide-react';
import Navbar from '../layout/ProfessionalNavbar'; // Ajuste selon ton projet
import Footer from '../landing/Footer'; // Ajuste selon ton projet

const sections = [
  { id: 'objet', title: "1. Objet", icon: FileText },
  { id: 'acces', title: "2. Accès au service", icon: Lock },
  { id: 'responsabilite-users', title: "3. Responsabilité des utilisateurs", icon: Users },
  { id: 'responsabilite-plateforme', title: "4. Rôle de la plateforme", icon: Shield },
  { id: 'litiges', title: "5. Litiges et Droit applicable", icon: Scale },
  { id: 'contact', title: "6. Contact", icon: Mail },
];

const CGU = () => {
  const [activeSection, setActiveSection] = useState('objet');

  // Effet pour détecter le scroll et mettre à jour le menu actif
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- HEADER --- */}
      <div className="bg-slate-900 text-white pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e0692d] rounded-full filter blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Conditions Générales d'Utilisation</h1>
          <p className="text-slate-400 text-lg">
            Dernière mise à jour : <span className="text-white font-medium">15 Février 2026</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- SIDEBAR NAVIGATION (STICKY) --- */}
          <aside className="hidden lg:block w-1/4">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Sommaire</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-orange-50 text-[#e0692d]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <section.icon className={`w-4 h-4 ${activeSection === section.id ? 'text-[#e0692d]' : 'text-slate-400'}`} />
                      {section.title}
                    </span>
                    {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* --- CONTENU PRINCIPAL --- */}
          <main className="lg:w-3/4 space-y-12">
            
            {/* Introduction */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <p className="text-slate-600 leading-relaxed text-lg">
                Bienvenue sur <strong>ServicePro</strong>. Les présentes Conditions Générales d'Utilisation (ci-après "CGU") 
                régissent l'accès et l'utilisation de notre plateforme de mise en relation entre particuliers et professionnels. 
                En accédant à notre site, vous acceptez sans réserve les présentes conditions.
              </p>
            </div>

            {/* 1. OBJET */}
            <section id="objet" className="scroll-mt-32">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#e0692d] flex items-center justify-center text-sm font-bold">1</span>
                Objet
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p>
                  Les présentes CGU ont pour objet de définir les modalités de mise à disposition des services du site ServicePro.tn.
                  La plateforme agit en tant qu'intermédiaire technique permettant la mise en relation entre :
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li><strong>Le Client :</strong> Toute personne physique ou morale recherchant une prestation de service.</li>
                  <li><strong>Le Professionnel :</strong> Tout prestataire de service indépendant ou société inscrit sur la plateforme.</li>
                </ul>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* 2. ACCÈS AU SERVICE */}
            <section id="acces" className="scroll-mt-32">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#e0692d] flex items-center justify-center text-sm font-bold">2</span>
                Accès au service
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p>
                  L'accès au site est gratuit pour les utilisateurs. Toutefois, certains services (notamment pour les Professionnels) 
                  peuvent être soumis à des frais d'abonnement ou de commission, clairement indiqués lors de l'inscription.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded-r-lg">
                  <h4 className="font-bold text-blue-900 text-sm mb-1">Sécurité du compte</h4>
                  <p className="text-sm text-blue-800">
                    Vous êtes responsable du maintien de la confidentialité de vos identifiants de connexion. 
                    Toute action effectuée via votre compte est réputée être effectuée par vous.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* 3. RESPONSABILITÉ UTILISATEURS */}
            <section id="responsabilite-users" className="scroll-mt-32">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#e0692d] flex items-center justify-center text-sm font-bold">3</span>
                Responsabilité des utilisateurs
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#e0692d]" /> Pour le Client
                  </h3>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• S'engage à fournir des informations exactes sur le besoin.</li>
                    <li>• S'engage à respecter les délais de paiement convenus avec le Pro.</li>
                    <li>• S'interdit tout comportement irrespectueux ou illégal.</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#e0692d]" /> Pour le Professionnel
                  </h3>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Certifie posséder les assurances et diplômes requis.</li>
                    <li>• S'engage à réaliser la prestation selon les règles de l'art.</li>
                    <li>• Est seul responsable de la facturation et des garanties.</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* 4. RÔLE DE LA PLATEFORME */}
            <section id="responsabilite-plateforme" className="scroll-mt-32">
               <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#e0692d] flex items-center justify-center text-sm font-bold">4</span>
                Limitation de responsabilité
              </h2>
              <div className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100">
                <div className="flex gap-4">
                  <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  <div className="text-slate-700 text-sm leading-relaxed">
                    <p className="mb-2"><strong>ServicePro est un intermédiaire technique.</strong></p>
                    <p>
                      Nous ne pouvons être tenus responsables de la mauvaise exécution d'une prestation, 
                      d'un retard, ou de tout dommage résultant de la relation contractuelle directe 
                      entre le Client et le Professionnel. Bien que nous vérifiions les profils, 
                      nous ne garantissons pas la fiabilité absolue de chaque intervenant.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

             {/* 5. LITIGES */}
             <section id="litiges" className="scroll-mt-32">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#e0692d] flex items-center justify-center text-sm font-bold">5</span>
                Litiges et Droit applicable
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p>
                  Les présentes CGU sont soumises au droit tunisien. En cas de litige relatif à l'interprétation 
                  ou à l'exécution des présentes, les parties s'efforceront de trouver une solution amiable. 
                  À défaut, les tribunaux compétents de Tunis seront seuls saisis.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* 6. CONTACT */}
            <section id="contact" className="bg-[#1e293b] text-white p-8 rounded-3xl relative overflow-hidden scroll-mt-32">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Une question sur nos CGU ?</h2>
                  <p className="text-slate-400 text-sm">Notre équipe juridique et support est à votre disposition.</p>
                </div>
                <a 
                  href="mailto:contact@servicepro.tn" 
                  className="bg-[#e0692d] hover:bg-white hover:text-[#e0692d] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  contact@servicepro.tn
                </a>
              </div>
              {/* Cercle déco */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            </section>

          </main>
        </div>
      </div>
      
      {/* Bouton retour haut mobile */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="lg:hidden fixed bottom-6 right-6 bg-slate-900 text-white p-3 rounded-full shadow-xl z-50 opacity-80 hover:opacity-100"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CGU;