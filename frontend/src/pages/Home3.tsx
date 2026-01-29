import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { 
  Search, MapPin, ArrowRight, Star, ChevronDown, 
  Wrench, Zap, Paintbrush, Hammer, Scissors, Car 
} from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import HowItWorks from '../profile/HowItWorks';
import ForProfessionals from '../profile/ForProfessionals';

const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [motCle, setMotCle] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Données enrichies pour le slider avec images réelles
  const serviceSlides = [
    { name: 'Plomberie', icon: Wrench, img: 'https://images.unsplash.com/photo-1581244276891-663f89de1312?auto=format&fit=crop&q=80', color: 'from-blue-500' },
    { name: 'Électricité', icon: Zap, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80', color: 'from-yellow-500' },
    { name: 'Menuiserie', icon: Hammer, img: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&q=80', color: 'from-orange-800' },
    { name: 'Mécanique', icon: Car, img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80', color: 'from-slate-600' },
    { name: 'Coiffure', icon: Scissors, img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80', color: 'from-pink-500' },
    { name: 'Bricolage', icon: Paintbrush, img: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&q=80', color: 'from-green-500' },
  ];

  const faqs = [
    { question: "Comment fonctionne ProFinder ?", answer: "ProFinder met en relation les particuliers avec des professionnels qualifiés. Décrivez votre projet, comparez les profils et devis des professionnels, puis choisissez celui qui correspond le mieux à vos besoins." },
    { question: "Comment sont sélectionnés les professionnels ?", answer: "Tous les professionnels sont vérifiés : identité, assurances, qualifications. Nous vérifions également les avis clients pour garantir la qualité des services." },
    { question: "Les devis sont-ils gratuits ?", answer: "Oui, la demande et la réception de devis sont totalement gratuites. Vous ne payez que si vous décidez de faire appel au professionnel." }
  ];

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("currentUser");
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      
      {/* --- HERO SECTION MODERNE --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Slider Background */}
        <div className="absolute inset-0 z-0">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 5000 }}
            loop={true}
            className="h-full w-full"
          >
            {serviceSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <img src={slide.img} alt={slide.name} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-[#e0692d]/20 border border-[#e0692d]/30 rounded-full text-[#e0692d]">
              Expertise locale & Qualité
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Trouvez l'expert <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e0692d] to-orange-400">
                Idéal en un clic.
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 max-w-lg">
              La plateforme de confiance qui connecte vos besoins avec les meilleurs artisans de votre région.
            </p>

            {/* Barre de Recherche Futuriste */}
            <div className="flex flex-col sm:flex-row p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <div className="flex-1 flex items-center px-4 py-3">
                <Search className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Quel service ? (ex: Plombier)"
                  className="bg-transparent w-full outline-none text-white placeholder:text-gray-400"
                  onChange={(e) => setMotCle(e.target.value)}
                />
              </div>
              <button 
                onClick={() => navigate(`/search?motcle=${motCle}`)}
                className="bg-[#e0692d] hover:bg-[#f07e40] text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Rechercher
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES SLIDER (ROUNDED CARDS) --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Services Populaires</h2>
              <div className="w-20 h-1.5 bg-[#e0692d] mt-4 rounded-full" />
            </div>
            <Link to="/search" className="text-[#e0692d] font-semibold flex items-center gap-2 hover:gap-4 transition-all">
              Voir tout <ArrowRight size={20} />
            </Link>
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            pagination={{ clickable: true }}
            className="pb-16"
          >
            {serviceSlides.map((service, idx) => (
              <SwiperSlide key={idx}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative h-96 rounded-3xl overflow-hidden shadow-xl"
                >
                  <img src={service.img} alt={service.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} to-transparent opacity-60`} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                    <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                      <service.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">{service.name}</h3>
                    <p className="text-sm opacity-80 mt-2">Professionnels certifiés</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* --- COMMENT ÇA MARCHE (Épuré) --- */}
      <div className="py-10">
        <HowItWorks />
      </div>

      {/* --- FAQ SECTION MODERNE --- */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Besoin d'aide ?</h2>
            <p className="text-slate-500">Nous répondons à toutes vos interrogations</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex justify-between items-center w-full px-8 py-6 text-left bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-800">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-[#e0692d]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 py-6 text-slate-600 bg-white border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION DYNAMIQUE --- */}
      <section className="py-20 px-6">
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          className="max-w-6xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#e0692d] to-[#b04d1d] p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Abstract circles décoratifs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
              Lancez votre projet dès maintenant
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/search"
                className="bg-white text-[#e0692d] px-10 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
              >
                Trouver un expert
              </Link>
              <Link
                to="/register"
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all transform hover:-translate-y-1"
              >
                Devenir Pro
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;