import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Wrench, Zap, Paintbrush, 
  Hammer, CheckCircle2, TrendingUp, Star,
  ArrowRight, ShieldCheck, Phone,
  ChevronDown,
  Shield,
  Users,
  HomeIcon,
  Laptop,
  Heart,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../layout/ProfessionalNavbar'; 
import Footer from '../landing/Footer'; 
import plombier from '../img/photo-1664301972519-506636f0245d.jpeg';
import couture from '../img/photo-1682142705901-28c534528ce8.jpeg';
import peintre from '../img/photo-1688372199140-cade7ae820fe.jfif';
import jardinier from '../img/photo-1617576683096-00fc8eecb3af.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { villesEtRegions } from '../components/villesRegions';
import CustomSelect from '../profile/CustomSelect';

// --- DONNÉES SEO & NAVIGATION ---
/*const villesEtRegions: Record<string, string[]> = {
  "Tunis": ["La Marsa", "Carthage", "Le Bardo", "Centre Ville"],
  "Sousse": ["Kantaoui", "Sahloul", "Hammam Sousse"],
  "Sfax": ["Sakiet Ezzit", "Sakiet Eddaier", "Ville"],
};*/

// Catégories avec descriptions riches (Bon pour le SEO)
const topCategories = [
  { id: 'plomberie', label: 'Plomberie', icon: Wrench, count: 145, desc: "Fuites, débouchage, installation sanitaire." },
  { id: 'electricite', label: 'Électricité', icon: Zap, count: 98, desc: "Panne, mise aux normes, installation." },
  { id: 'peinture', label: 'Peinture', icon: Paintbrush, count: 210, desc: "Façades, murs intérieurs, décoration." },
  { id: 'bricolage', label: 'Bricolage', icon: Hammer, count: 85, desc: "Montage de meubles, petites réparations." },
];

// Liens de maillage interne (SEO Clusters)
const popularSearches = [
  { label: "Plombier à Tunis", query: "plombier", city: "Tunis" },
  { label: "Électricien à Sousse", query: "electricien", city: "Sousse" },
  { label: "Peintre à Sfax", query: "peintre", city: "Sfax" },
  { label: "Femme de ménage La Marsa", query: "menage", city: "La Marsa" },
];
// Données enrichies pour le slider avec images réelles
  const serviceSlides = [
    { name: 'Plomberie', icon: Wrench, img: plombier, color: 'from-blue-500', alt: 'Plombier' },
    { name: 'Couture', icon: Wrench, img: couture, color: 'from-blue-500', alt: 'jardinier' },
    { name: 'Jardinier', icon: Wrench, img: jardinier, color: 'from-blue-500', alt:'couture' },
    { name: 'Électricité', icon: Zap, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80', color: 'from-yellow-500', alt: 'Electricien' },
    { name: 'Menuiserie', icon: Hammer, img: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&q=80', color: 'from-orange-800', alt:'' },
    { name: 'Peintre', icon: Paintbrush, img: peintre, color: 'from-slate-600', alt:'' },
    { name: 'Mécanique', icon: Paintbrush, img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80', color: 'from-slate-600', alt:'' },
    { name: 'Coiffure', icon: Paintbrush, img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80', color: 'from-pink-500', alt: 'Coiffure' },
    { name: 'Bricolage', icon: Paintbrush, img: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&q=80', color: 'from-green-500', alt: 'Peinture' },
  ];
  // --- DATA ---
  const services = [
    { icon: Wrench, name: 'Plomberie', color: 'bg-blue-100 text-blue-600', desc: 'Fuites, réparations' },
    { icon: Zap, name: 'Électricité', color: 'bg-yellow-100 text-yellow-600', desc: 'Installation, pannes' },
    { icon: Paintbrush, name: 'Peinture', color: 'bg-purple-100 text-purple-600', desc: 'Murs, façades' },
    { icon: HomeIcon, name: 'Ménage', color: 'bg-green-100 text-green-600', desc: 'Nettoyage complet' },
    { icon: Laptop, name: 'Informatique', color: 'bg-gray-100 text-gray-600', desc: 'Web, réparation PC' },
    { icon: Hammer, name: 'Bricolage', color: 'bg-orange-100 text-orange-600', desc: 'Montage meubles' },
  ];
  
  const HomeSEO = () => {
  const navigate = useNavigate();
  const [motCle, setMotCle] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (motCle) params.append('q', motCle);
    if (selectedCity) params.append('ville', selectedCity);
    if (selectedRegion) params.append('region', selectedRegion);
    navigate(`/search?${params.toString()}`);
  };

  const quickSearch = (q: string, c: string) => {
    window.location.href =`/services/${slugify(q)}/${slugify(c)}`;
  };

  const testimonials = [
    { name: 'Salah B.', role: 'Client', txt: 'Service incroyable, plombier trouvé en 10 minutes !', stars: 5 },
    { name: 'Ahmed K.', role: 'Professionnel', txt: 'Grâce à la plateforme, mon agenda est toujours plein.', stars: 5 },
    { name: 'Leila M.', role: 'Cliente', txt: 'Interface très simple et professionnels sérieux.', stars: 4 },
  ];
  
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* <Navbar /> */}

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
          
          {/* Background Slider */}
          <div className="absolute inset-0 z-0">
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop={true}
              className="h-full w-full"
            >
              {serviceSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full w-full">
                    <img src={slide.img} alt={slide.alt} className="object-cover w-full h-full transform scale-105" />
                    {/* Overlay dégradé sombre pour lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-5xl px-4 mx-auto text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                <Star className="w-4 h-4 text-[#e0692d] fill-[#e0692d]" />
                <span>N°1 de la mise en relation en Tunisie</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                 Trouvez l'expert <br className="hidden md:block" />
                <span className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-[#e0692d] thq-link-h1-home"> près de chez vous,</span> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e0692d] to-orange-400"> en un clic.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-auto font-light">
                La plateforme N°1 en Tunisie de confiance qui connecte vos besoins avec les meilleurs artisans de votre région.
              </p>
                
        
              {/* --- BARRE DE RECHERCHE UNIFIÉE --- */}
              <form onSubmit={handleSearch} className="bg-white p-2 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-2 mx-auto max-w-4xl">
                
                {/* Input Mot Clé */}
                <div className="flex-1 relative group">
                 
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#e0692d] transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Que recherchez-vous ? (ex: Plombier)"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#e0692d]/20 focus:border-[#e0692d] transition-all outline-none text-gray-700 font-medium placeholder:font-normal"
                    value={motCle}
                    onChange={(e) => setMotCle(e.target.value)}
                  />
                </div>

                {/* Select Ville */}
                <div className="flex-1 md:max-w-[200px] relative group">
                  <CustomSelect
                    value={selectedCity}
                    onChange={(value: string) => {
                      setSelectedCity(value);
                      setSelectedRegion('');
                    }}
                    //required
                    name="mappin"
                    placeholder='Ville'
                    options={[
                      ...Object.keys(villesEtRegions).map((v) => ({
                        value: v,
                        label: v
                      }))
                    ]}
                  ></CustomSelect>
                </div>

                {/* Select Région */}
                <div className="flex-1 md:max-w-[200px] relative group">
                  <CustomSelect
                    value={selectedRegion}
                    onChange={(value: string) => {
                      setSelectedRegion(value);
                    }}
                    disabled={!selectedCity}
                    //required
                    name="mappin"
                    placeholder='Région'
                    options={[
                      ...(selectedCity ? villesEtRegions[selectedCity as keyof typeof villesEtRegions].map((r: string) => ({
                        value: r,
                        label: r
                      })) : [])
                    ]}
                  />
                </div>

                {/* Bouton Rechercher */}
                <button 
                  type="submit"
                  className="bg-[#e0692d] hover:bg-[#c95a22] text-white h-14 px-8 rounded-2xl font-bold text-lg shadow-lg hover:shadow-orange-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden md:inline">Trouver</span>
                </button>
              </form>

              {/* Tags SEO (Maillage interne immédiat) */}
              <div className="mt-6 text-sm text-slate-500 flex flex-wrap justify-center gap-2 items-center">
                <TrendingUp className="w-4 h-4 text-[#e0692d]" />
                <span className="text-white font-semibold">Recherches fréquentes :</span>
                {popularSearches.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => quickSearch(item.query, item.city)}
                    className="hover:text-[#e0692d] hover:underline bg-white px-3 py-1 rounded-full border border-slate-200 text-xs shadow-sm transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>      
              {/* Tags rapides 
              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start text-sm text-gray-300">
                <span>Populaire :</span>
                {['Plombier', 'Femme de ménage', 'Peintre', 'Électricien'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => { setMotCle(tag); }}
                    className="hover:text-white underline underline-offset-4 decoration-[#e0692d]/50 hover:decoration-[#e0692d] transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>*/}
            </motion.div>
          </div>
        </section>
        
        {/* --- STATS & TRUST BAR --- 
        <div className="bg-white border-b border-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full"><Shield className="w-6 h-6 text-green-600"/></div>
                <div><p className="font-bold text-gray-900">100% Vérifiés</p><p className="text-xs text-gray-500">Professionnels certifiés</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full"><Users className="w-6 h-6 text-blue-600"/></div>
                <div><p className="font-bold text-gray-900">15k+ Utilisateurs</p><p className="text-xs text-gray-500">Nous font confiance</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-full"><Star className="w-6 h-6 text-orange-600"/></div>
                <div><p className="font-bold text-gray-900">4.8/5 Note</p><p className="text-xs text-gray-500">Basé sur les avis</p></div>
              </div>
          </div>
        </div>*/}

        {/* --- CATEGORIES / SERVICES --- */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl mb-4 font-bold mt-2 text-slate-900">Nos Catégories</h2>
              <p className="text-[#e0692d] mt-2">Explorez nos professionnels par domaine d'expertise</p>
            </div>
            <div className="flex flex-col md:flex-row justify-end items-end mb-8">
              <Link to="/categories" className="text-[#e0692d] font-semibold flex items-center gap-1 hover:gap-2 transition-all mt-4 md:mt-0">
                Voir tout le catalogue <ArrowRight className="w-4 h-4" />
              </Link> 
            </div>  
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {services.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group cursor-pointer text-center"
                  onClick={() => { setMotCle(item.name); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                >
                  <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors ${item.color} group-hover:bg-[#e0692d] group-hover:text-white`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
          {/* --- VALUE PROPOSITION (Clean Grid) --- */}
          <section className="bg-white py-24 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Pourquoi choisir&nbsp;
                  <span className="text-3xl font-bold leading-tight text-[#e0692d] thq-link-h1-home">ServicePro</span> ?</h2>
                <p className="text-slate-500">Nous simplifions la recherche de professionnels qualifiés tout en garantissant la sécurité de vos projets.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  { title: "Gratuit & Sans engagement", desc: "Postez votre projet et recevez des devis gratuitement.", icon: Heart },
                  { title: "Avis Clients Réels", desc: "Consultez les notes et commentaires laissés par la communauté après chaque prestation.", icon: Star },
                  { title: "Service Client 7j/7", desc: "Une équipe dédiée pour vous accompagner en cas de besoin.", icon: UserCheck }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="mx-auto w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-[#e0692d]">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        {/* --- TESTIMONIALS (CHIC DESIGN) --- */}
        <section className="py-16 bg-slate-900 text-white overflow-hidden relative">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#e0692d] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
  
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils parlent de nous</h2>
                <p className="text-gray-400 max-w-lg">Découvrez les retours de notre communauté grandissante.</p>
              </div>
              <Link to="/inscription" className="hidden md:flex items-center gap-2 text-[#e0692d] hover:text-white transition-colors font-medium">
                Rejoindre la communauté <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className={`w-4 h-4 ${s < t.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <p className="text-lg text-gray-200 mb-6 italic">"{t.txt}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#e0692d] to-purple-500 flex items-center justify-center font-bold text-white">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-sm text-[#e0692d]">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION TEXTE SEO (CONTENU RICHE) --- */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-center text-3xl font-bold mb-6 text-slate-900">Comment utilise&nbsp;
                  <span className="text-3xl font-bold leading-tight text-[#e0692d] thq-link-h1-home">ServicePro</span> pour vos travaux ?</h2>
            
            <div className="prose prose-slate max-w-none text-slate-600">
              <p className="mb-4">
                Trouver un <strong>artisan de confiance en Tunisie</strong> peut s'avérer complexe. Entre les prix variables et la difficulté de vérifier les compétences, ServicePro simplifie votre démarche.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Recherche simple et rapide
                  </h3>
                  <p className="text-sm">Trouvez facilement des professionnels les plus proches de chez vous par région et par spécialité, puis envoyez votre demande de devis uniquement aux prestataires que vous sélectionnez.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Choix en toute transparence
                  </h3>
                  <p className="text-sm">Comparez les propositions reçues, échangez avec les professionnels et choisissez celui qui correspond le mieux à votre besoin et à votre budget.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CALL TO ACTION --- */}
        <section className="py-16 px-4 mb-6">
          <div className="max-w-5xl mx-auto bg-[#e0692d] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-orange-500/20">
            <div className="text-white mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">Vous êtes un professionnel ?</h2>
              <p className="text-orange-100 text-lg">Rejoignez le réseau et développez votre clientèle dès aujourd'hui.</p>
            </div>
            <div className="flex gap-4">
               <button 
                onClick={() => navigate('/business')}
                className="bg-white text-[#e0692d] px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg"
               >
                 S'inscrire gratuitement
               </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default HomeSEO;