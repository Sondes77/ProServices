import {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, MapPin, Scissors, Car, ArrowRight, Star, Shield, Clock, Users, Wrench, Paintbrush, Laptop, Home as HomeIcon, Zap, Hammer, ChevronDown } from 'lucide-react';
import Navbar from '../landing/Navabr';
import Footer from '../landing/Footer';
import Hero17 from '../components/hero17';
import image from '../img/photo.png';
import '../components/hero17.css';
import NavbarPro from '../layout/ProfessionalNavbar';
import NavbarUser from '../layout/UserNavbar';
import {user} from '../utils/mock-data';
import ThreeSteps from '../profile/ThreeSteps';
import HowItWorks from '../profile/HowItWorks';
import ForProfessionals from '../profile/ForProfessionals';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  
  const faqs = [
    {
      question: "Comment fonctionne ProFinder ?",
      answer: "ProFinder met en relation les particuliers avec des professionnels qualifiés. Décrivez votre projet, comparez les profils et devis des professionnels, puis choisissez celui qui correspond le mieux à vos besoins."
    },
    {
      question: "Comment sont sélectionnés les professionnels ?",
      answer: "Tous les professionnels sont vérifiés : identité, assurances, qualifications. Nous vérifions également les avis clients pour garantir la qualité des services."
    },
    {
      question: "Quels types de services sont proposés ?",
      answer: "ProFinder couvre une large gamme de services : plomberie, électricité, peinture, ménage, développement web, bricolage, et bien d'autres. Chaque catégorie comprend des professionnels spécialisés."
    },
    {
      question: "Comment sont gérés les paiements ?",
      answer: "Les paiements se font directement entre vous et le professionnel. ProFinder facilite la mise en relation mais n'intervient pas dans la transaction financière."
    },
    {
      question: "Que faire en cas de problème avec un professionnel ?",
      answer: "Notre service client est disponible pour vous accompagner. En cas de litige, nous proposons une médiation entre les parties pour trouver une solution satisfaisante."
    },
    {
      question: "Les devis sont-ils gratuits ?",
      answer: "Oui, la demande et la réception de devis sont totalement gratuites. Vous ne payez que si vous décidez de faire appel au professionnel."
    }
  ];
  const services = [
    { icon: Wrench, name: 'Plomberie', description: 'Réparation et installation de plomberie' },
    { icon: Zap, name: 'Électricité', description: 'Installation et mise aux normes électriques' },
    { icon: Paintbrush, name: 'Peinture', description: 'Travaux de peinture intérieure et extérieure' },
    { icon: HomeIcon, name: 'Ménage', description: 'Services de nettoyage professionnel' },
    { icon: Laptop, name: 'Développement', description: 'Création de sites web et applications' },
    { icon: Hammer, name: 'Bricolage', description: 'Petits travaux et réparations diverses' },
  ];

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [motCle, setMotCle] = useState(query.get('motcle') || '');

  const testimonials = [
    {
      name: 'Marie L.',
      role: 'Cliente',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      content: 'J\'ai trouvé un excellent plombier en quelques clics. Service rapide et professionnel !',
      rating: 5
    },
    {
      name: 'Pierre D.',
      role: 'Professionnel',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      content: 'ProFinder m\'a permis de développer mon activité et de trouver de nouveaux clients.',
      rating: 5
    },
    {
      name: 'Sophie M.',
      role: 'Cliente',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      content: 'Une plateforme très intuitive qui m\'a fait gagner beaucoup de temps dans mes recherches.',
      rating: 4
    }
  ];

    // Données enrichies pour le slider avec images réelles
  const serviceSlides = [
    { name: 'Plomberie', icon: Wrench, img: 'https://images.unsplash.com/photo-1581244276891-663f89de1312?auto=format&fit=crop&q=80', color: 'from-blue-500' },
    { name: 'Électricité', icon: Zap, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80', color: 'from-yellow-500' },
    { name: 'Menuiserie', icon: Hammer, img: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&q=80', color: 'from-orange-800' },
    { name: 'Mécanique', icon: Car, img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80', color: 'from-slate-600' },
    { name: 'Coiffure', icon: Scissors, img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80', color: 'from-pink-500' },
    { name: 'Bricolage', icon: Paintbrush, img: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&q=80', color: 'from-green-500' },
  ];

  const steps = [
    {
      icon: Search,
      title: 'Choisissez votre métier',
      description: 'Plomberie, électricité, menuiserie et plus encore',
    },
    {
      icon: MapPin,
      title: 'Sélectionnez votre ville',
      description: 'Trouvez des professionnels près de chez vous',
    },
    {
      icon: Users,
      title: 'Découvrez les professionnels',
      description: 'Consultez les profils et contactez directement',
    },
  ]; 
  
  useEffect(() => {
    if(!token)
    {
        localStorage.removeItem("currentUser");
        navigate("/");
        return;
    }
  }, [navigate]);

  return (
    <div className="min-h-screen">
      {/* {verifNavbar()} */}
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Slider Background */}
        <div className="absolute inset-0 z-0">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 1000 }}
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
              <span className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-[#e0692d] thq-link-h1-home"> près de chez vous</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e0692d] to-orange-400">
                en un clic.
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
                onClick={() => navigate(motCle ? `/search?q=${encodeURIComponent(motCle)}` : `/search`)}
                className="bg-[#e0692d] hover:bg-[#f07e40] text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Rechercher
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* <Hero17>
        
      <section className="hero17-header78 thq-section-padding">
        <div className="hero17-column thq-section-max-width thq-section-padding">
            <img
                alt=''
                src={image}
                className="banner3-image thq-img-ratio-16-9"
            />  
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Trouvez le bon professionnel
              <span className="text-[#e0692d]"> près de chez vous</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Des milliers de professionnels qualifiés à votre service pour tous vos projets
            </p>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="text"
                  value={motCle}
                  onChange={(e) => setMotCle(e.target.value)}
                  placeholder="Quel service recherchez-vous ?"
                  className="w-full px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e0692d]"
                />
                <Link
                  to={`/search?motcle=${encodeURIComponent((motCle || '').toLowerCase())}`}
                  className="w-full sm:w-auto px-8 py-3 bg-[#e0692d] hover:bg-[#f07e40] rounded-full font-medium flex items-center justify-center whitespace-nowrap"
                >
                  <Search size={20} className="mr-2" />
                  Rechercher
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      </Hero17>*/}
      {/* How it Works */}
      {/* <ThreeSteps />*/}
     
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3 étapes faciles</h2>
            <p className="text-lg text-gray-600">
              Trouvez le professionnel idéal en quelques étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="text-center">
                  <div 
                    className="bg-[#e0692d] w-16 h-16 rounded-full transition-shadow duration-300 animate-float transition-all duration-500 hover:transform hover:scale-105 animate-fade-in flex items-center justify-center mx-auto mb-4"
                    style={{ animationDelay: `${idx * 0.3}s` }}
                  >
                    <Icon className="h-8 w-8 text-white animate-rotate-slow" />
                  </div>
                 
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <HowItWorks/>

      {/* Services */}
      {/*<section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos services</h2>
            <p className="text-lg text-gray-600">Une large gamme de services pour tous vos besoins</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="bg-[#e0692d] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to={`/search?motcle=${service.name.toLowerCase()}`}
                  className="text-[#e0692d] font-medium hover:text-[#f07e40] flex items-center"
                >
                  En savoir plus
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Testimonials */}
      {/*<section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce qu'ils en pensent</h2>
            <p className="text-lg text-gray-600">Découvrez les avis de nos utilisateurs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      <ForProfessionals />

       {/* FAQ Section */}
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

      {/*<section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquemment posées</h2>
            <p className="text-lg text-gray-600">Tout ce que vous devez savoir sur ProFinder</p>
          </div>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`mt-2 transition-all duration-200 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* CTA Section */}
      <section className="py-16 bg-[#e0692d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à trouver le bon professionnel ?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Rejoignez des milliers d'utilisateurs satisfaits
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/search"
              className="transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/50 px-8 py-3 bg-white text-[#e0692d] rounded-full font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Rechercher un professionnel
            </Link>
            {/*<Link
              to="/register"
              className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Devenir professionnel
            </Link>*/}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;