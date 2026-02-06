import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Tag, MessageSquare, Star, ArrowLeft, Zap, CheckCircle, XCircle, FileText, Phone, ShieldCheck, Info, ChevronRight,  } from 'lucide-react';
import { User, Service } from '../utils/types';
import { mapServicesDataToUserModel, mapUserDataToUserModel } from '../utils/mapper';
import Swal from 'sweetalert2';

interface ServiceDetailProps {
    user2: User;
    //: Service;
}

const ServiceDetail : React.FC<ServiceDetailProps> = ({ user2 }) => {
  const { id } = useParams<{ id: string }>(); // récupère l'id de l'URL
  //const routeParams = useParams<{ id?: string }>();
  //const id = routeParams.id || user2?.id; 
  
  const [service, setService] = useState<Service | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const userMe = user?.id === user2?.id;
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchService = async () => {
      try {
        /*const token = localStorage.getItem('token');
        if (!token) {
            console.error("Aucun token trouvé dans le localStorage");
            return;
        }*/
        
        const response = await fetch(`http://localhost:5000/api/service/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          alert('Erreur lors de la récupération du service');
          return;
        }
        
        const data = await response.json();
        const service = Array.isArray(data) ? data[0] : data;
        const mapped = mapServicesDataToUserModel(service);
        setService(mapped);
       
        const resp = await fetch(`http://localhost:5000/api/utilisateurId?id=${service.professionnel_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${token}`,
            },
          });
  
          if (resp.ok){
            const data = await resp.json();
            const userdata = Array.isArray(data) ? data[0] : data;
            const mapped = mapUserDataToUserModel(userdata);
            setUser(mapped);
            console.log("id profile = ",user?.id);
          } else {
            alert('Erreur lors de la récupération d\'utilisateur');
            return;
          }          
          
      } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur de connexion au serveur');
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);
  
  // État pour afficher le numéro
  const [showPhone, setShowPhone] = useState(false);
  // État pour le modal de devis
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState({ date: '', details: '' });

  // Fonction pour gérer la demande de devis
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi (API)
    Swal.fire({
      title: "Demande envoyée !",
      text: "Le professionnel vous répondra avec une proposition chiffrée.",
      icon: "success",
      confirmButtonColor: "#e0692d"
    });
    setShowQuoteModal(false);
  };

  const [currentImg, setCurrentImg] = useState(0);

  const gallery =
  service && service.gallery
    ? typeof service.gallery === "string"
      ? JSON.parse(service.gallery)
      : service.gallery
    : [];
  const next = () =>
    setCurrentImg((i) => (i + 1) % gallery.length);

  const prev = () =>
    setCurrentImg((i) => (i - 1 + gallery.length) % gallery.length);

  // Affiche un message de chargement si le service n’est pas encore chargé
  if (!service) {
    return <div className="text-center py-10">Chargement du service...</div>;
  }
  // Affiche un message de chargement si le service n’est pas encore chargé
  if (!user) {
    return <div className="text-center py-10">Chargement du service...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Bannière publicitaire */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-2">Publicité</p>
          <div className="h-[90px] flex items-center justify-center border border-dashed border-gray-300">
            <span className="text-gray-400">Espace publicitaire disponible</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-[#e0692d] transition-all">
              <ArrowLeft size={20} className="mr-2" /> Retour
            </button>
          </div>
      <div className="grid grid-cols-1 max-w-7xl mx-auto px-4 lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="lg:flex-grow">
          {/* --- NAVBAR NAVIGATION --- */}
          

          {/* Fil d'Ariane
          <nav className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-gray-700">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{service.title}</span>
          </nav> */}

          {/* 1️⃣ HERO DU SERVICE */}
          <section className="bg-white rounded-3xl overflow-hidden mb-6 md:mb-10 shadow-sm border border-gray-100">
            <div className="relative h-[300px] md:h-[450px]">
              {/*<img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200" alt="Service" className="w-full h-full object-cover" />*/}
              {gallery.length > 0 && (
                <div className="w-full h-full object-cover">
                  <img
                    src={gallery[currentImg]}
                    alt={service.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />

                  {/* Boutons si plusieurs images */}
                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                      >
                        ‹
                      </button>

                      <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                      >
                        ›
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {gallery.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i === currentImg ? "bg-white" : "bg-white/40"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              {/*{service.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${service.title} - Image ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                ))}*/}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-sm">
                  <Zap size={14} className="text-yellow-500 mr-1" /> Populaire
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#e0692d] text-white">
                  {service.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center text-yellow-500 font-bold">
                      <Star size={16} fill="currentColor" className="mr-1" /> 4.9 <span className="text-gray-400 font-normal ml-1">({user.stats.reviewsPosted} avis)</span>
                    </div>
                    <div className="flex items-center"><MapPin size={16} className="mr-1" /> {user.city}, {user.region}</div>
                    <div className="flex items-center"><Clock size={16} className="mr-1" /> 24h - 48h délai</div>
                  </div>
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm text-gray-400 uppercase tracking-wider">À partir de</p>
                  <p className="text-3xl font-black text-[#e0692d]">{service.price} DT</p>
                </div>
                
              </div>
              {/* Galerie 
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {service.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${service.title} - Image ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                ))}
              </div>*/}
            </div>
          </section>

          {/* En-tête du service 
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#e0692d] text-white">
                  {service.category}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                  {user.city}, {user.region}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2 text-gray-400" />
                  {service.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <Tag className="h-5 w-5 mr-2 text-gray-400" />
                  {service.price}
                </div>
              </div>

              {/* Galerie
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {service.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${service.title} - Image ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Description 
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description du service</h2>
                <p className="text-gray-600 whitespace-pre-line">{service.description}</p>
              </div>
            </div>
          </div>*/}
          
          {/* 2️⃣ DESCRIPTION & PROCESSUS */}
          <section className="bg-white rounded-3xl mb-6 md:mb-10 p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Détails du service</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {service.included.length > 0 &&
                <div className="bg-green-50 p-5 rounded-2xl">
                  <h3 className="font-bold text-green-800 flex items-center mb-3">
                    <CheckCircle size={18} className="mr-2" /> Ce qui est inclus
                  </h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    {service.included.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              }
              {service.notIncluded.length > 0 && 
                <div className="bg-red-50 p-5 rounded-2xl">
                  <h3 className="font-bold text-red-800 flex items-center mb-3">
                    <XCircle size={18} className="mr-2" /> Non inclus
                  </h3>
                  <ul className="space-y-2 text-sm text-red-700">
                    {service.notIncluded.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              }
            </div>
          </section>
          
          {/* 👤 CARTE PRO MINI */}
          <div className="bg-white lg:mb-10 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Proposé par</h3>
            <div className="flex items-center gap-4 mb-4">
              <img src={user.avatar} className="w-16 h-16 rounded-2xl object-cover" alt="Pro" />
              <div>
                <h4 className="font-bold text-lg flex items-center">
                  {user.fullName} <CheckCircle size={16} className="ml-1 text-orange-500 fill-orange-500 text-white" />
                </h4>
                <div className="flex items-center text-yellow-500 text-sm font-bold">
                  <Star size={14} fill="currentColor" className="mr-1" /> 4.8 <span className="text-gray-400 font-normal ml-1">({user.stats.reviewsPosted})</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/professional/${user.id}`)}
              className="w-full bg-gray-50 text-gray-700 py-2 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all flex items-center justify-center"
            >
              Voir le profil complet <ChevronRight size={16} />
            </button>
          </div>
          {/* Informations du prestataire 
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">À propos du prestataire</h2>
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{user.firstName}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{user.stats.reviewsPosted}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-600">{user.stats.reviewsPosted} avis</span>
                  </div>
                </div>
                {!userMe && (
                    <button className="ml-auto bg-[#e0692d] text-white px-6 py-2 rounded-full hover:bg-[#f07e40] transition-colors duration-200 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Contacter
                    </button>
                )}
              </div>
            </div>
          </div>*/}
          
        </div>

        {/* Colonne droite (pub) */}
        <div className="lg:w-80 space-y-8 pb-4">
         
          {/* 📋 BLOC ACTION / PRIX */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
            <div className="mb-6">
              <span className="text-gray-500 text-sm">Prix du service</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-gray-900">{service.price} DT</span>
                <span className="text-gray-400">/intervention</span>
              </div>
            </div>

            <div className="space-y-3">
               <button 
                onClick={() => setShowQuoteModal(true)}
                className="w-full bg-[#e0692d] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#f07e40] transition-all shadow-lg shadow-orange-100"
              >
                <FileText size={20} /> Demander un devis
              </button>
              <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                <MessageSquare size={20} /> Contacter le pro
              </button>
              <button 
                onClick={() => setShowPhone(!showPhone)}
                className={`w-full border-2 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                  showPhone ? "border-green-500 text-green-600 bg-green-50" : "border-gray-100 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Phone size={18} /> 
                {showPhone ? user?.phone || "+216 55 289 528" : "Voir le numéro"}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck size={18} className="text-green-500" /> Professionnel vérifié
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Info size={18} className="text-blue-500" /> Garantie Qualité
              </div>
            </div>
          </div>
          <div className="hidden lg:block bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-500 mb-2">Publicité</p>
            <div className="h-[600px] flex items-center justify-center border border-dashed border-gray-300">
              <span className="text-gray-400">Espace publicitaire disponible</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-500 mb-2">Publicité</p>
            <div className="h-[250px] flex items-center justify-center border border-dashed border-gray-300">
              <span className="text-gray-400">Espace publicitaire disponible</span>
            </div>
          </div>
        </div>
      </div>

      
      {/* 🔟 CALL TO ACTION STICKY MOBILE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3 z-50">
        <button 
         onClick={() => setShowQuoteModal(true)}
        className="flex-1 bg-[#e0692d] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-100">
          Demander Devis
        </button>
        <button className="p-3 bg-gray-100 rounded-xl">
          <MessageSquare size={20} className="text-gray-700" />
        </button>
      </div>

      {showQuoteModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
        <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="bg-[#e0692d] p-6 text-white flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Demande de devis gratuit</h3>
              <p className="text-orange-100 text-sm">Réponse généralement en moins de 24h</p>
            </div>
            <button onClick={() => setShowQuoteModal(false)} className="bg-white/20 p-2 rounded-full hover:bg-white/30">
              <XCircle size={24} />
            </button>
          </div>

          <form onSubmit={handleQuoteSubmit} className="p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-secondary">
                Date d'intervention souhaitée
              </label>
              <input 
                type="date" 
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                onChange={(e) => setQuoteDetails({...quoteDetails, date: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description précise du besoin
              </label>
              <textarea 
                rows={4}
                placeholder="Ex: J'ai besoin d'installer un climatiseur 12000 BTU dans mon salon au 2ème étage..."
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                onChange={(e) => setQuoteDetails({...quoteDetails, details: e.target.value})}
                required
              ></textarea>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 items-start">
              <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                Votre demande sera transmise au professionnel. Il pourra vous contacter par téléphone ou via la messagerie interne pour affiner le prix.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#e0692d] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-orange-200 transition-all active:scale-[0.98]"
            >
              Envoyer ma demande
            </button>
          </form>
        </div>
      </div>
      )}
    </div>
  );
};

export default ServiceDetail;
