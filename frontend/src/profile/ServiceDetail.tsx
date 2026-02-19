import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Tag, MessageSquare, Star, Send, Lock, Users, X, ArrowLeft, Zap, CheckCircle, XCircle, FileText, Phone, ShieldCheck, Info, ChevronRight, Share2,  } from 'lucide-react';
import { User, Service } from '../utils/types';
import { mapServicesDataToUserModel, mapUserDataToUserModel } from '../utils/mapper';
import Swal from 'sweetalert2';
import { Helmet as HelmetProviderBase } from "react-helmet-async";
import CustomPicker from './CustomPicker';

const Helmet = HelmetProviderBase as any;

interface ServiceDetailProps {
    user2: User;
    //: Service;
}

const ServiceDetail : React.FC<ServiceDetailProps> = ({ user2 }) => {
  const { id } = useParams<{ id: string }>(); // récupère l'id de l'URL
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [message, setMessage] = useState('');
  const [service, setService] = useState<Service | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const userMe = user?.id === user2?.id;
  const [showPhone, setShowPhone] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState({ date: '', objet: '', details: '' });
  const [currentImg, setCurrentImg] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
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
  
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/service/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          Swal.fire({
            toast: true, // active le mode toast
            position: "top-end", // en haut à droite
            showConfirmButton: false, // pas de bouton OK
            timer: 1500, // durée d'affichage
            timerProgressBar: true, // barre de progression
            icon: "warning",
            //title: selectedService ? "Service mis à jour" : "Service créé",
            text: "Erreur lors de la récupération de données",
            showClass: {
              popup: "animate__animated animate__slideInRight", // entrée animée
            },
            hideClass: {
              popup: "animate__animated animate__slideOutRight", // sortie animée
            },
            customClass: {
              popup: "rounded-2xl shadow-lg p-4", // style chic
            },
          });
          return;
        }
        
        const data = await response.json();
        const service = Array.isArray(data) ? data[0] : data;
        if (service.statut !== "active") navigate('/404');
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
            
          } else {
            Swal.fire({
              toast: true, // active le mode toast
              position: "top-end", // en haut à droite
              showConfirmButton: false, // pas de bouton OK
              timer: 1500, // durée d'affichage
              timerProgressBar: true, // barre de progression
              icon: "warning",
              //title: selectedService ? "Service mis à jour" : "Service créé",
              text: "Erreur lors de la récupération de données",
              showClass: {
                popup: "animate__animated animate__slideInRight", // entrée animée
              },
              hideClass: {
                popup: "animate__animated animate__slideOutRight", // sortie animée
              },
              customClass: {
                popup: "rounded-2xl shadow-lg p-4", // style chic
              },
            });
            return;
          }          
          
      } catch (error) {
        Swal.fire({
          toast: true, // active le mode toast
          position: "top-end", // en haut à droite
          showConfirmButton: false, // pas de bouton OK
          timer: 1500, // durée d'affichage
          timerProgressBar: true, // barre de progression
          icon: "warning",
          //title: selectedService ? "Service mis à jour" : "Service créé",
          text: "Erreur réseau",
          showClass: {
            popup: "animate__animated animate__slideInRight", // entrée animée
          },
          hideClass: {
            popup: "animate__animated animate__slideOutRight", // sortie animée
          },
          customClass: {
            popup: "rounded-2xl shadow-lg p-4", // style chic
          },
        });
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);
  console.log ("user = ", user);
  // Fonction pour gérer la demande de devis
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/devis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          client_id: user2?.id,
          service_id: service?.id,
          date_souhaitee: quoteDetails.date,
          objet: quoteDetails.objet,
          description: quoteDetails.details,
          professionnel_id: service?.pro_id // 👈 important
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erreur envoi devis");
      }

      const data = await res.json();
     
       Swal.fire({
        title: "Demande envoyée !",
        text: "Le professionnel vous répondra avec une proposition chiffrée.",
        icon: "success",
        confirmButtonColor: "#e0692d"
      });
      setShowQuoteModal(false);

      // reset
      setQuoteDetails({
        date: "",
        details: ""
      });

    } catch (err: any) {
      //console.error(err);
      Swal.fire("Erreur", err.message || "Erreur lors de l'envoi de la demande", "error");
    } finally {
      setLoading(false);
    }
   
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return Swal.fire("Connexion requise", "Connectez-vous pour envoyer un message", "info");

    try {
      const res = await fetch(`http://localhost:5000/api/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ recipientId: user?.id, content: message })
      });
      if (res.ok) {
        Swal.fire({
          toast: true, // active le mode toast
          position: "top-end", // en haut à droite
          showConfirmButton: false, // pas de bouton OK
          timer: 1500, // durée d'affichage
          timerProgressBar: true, // barre de progression
          icon: "success",
          title: "Succès",
          text: "Message envoyé !",
          showClass: {
            popup: "animate__animated animate__slideInRight", // entrée animée
          },
          hideClass: {
            popup: "animate__animated animate__slideOutRight", // sortie animée
          },
          customClass: {
            popup: "rounded-2xl shadow-lg p-4", // style chic
          },
        });
        setMessage('');
        setShowMessageModal(false);
      }
    } catch (error) {
      Swal.fire("Erreur", "L'envoi a échoué", "error");
    }
  };
  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          const user = mapUserDataToUserModel(data.user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          setShowLoginModal(false);
          window.location.reload();
        } else {
          setLoginError('Email ou mot de passe incorrect');
        }
      } catch (error) {
        setLoginError('Erreur de connexion au serveur');
      }
    };
  
  const handleShareService = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: service?.title,
          text: "Voir ce service",
          url
        });
      } else {
        await navigator.clipboard.writeText(url);
        Swal.fire({
          toast: true, // active le mode toast
          position: "top-end", // en haut à droite
          showConfirmButton: false, // pas de bouton OK
          timer: 1500, // durée d'affichage
          timerProgressBar: true, // barre de progression
          icon: "success",
          //title: selectedService ? "Service mis à jour" : "Service créé",
          text: "Lien du service copié",
          showClass: {
            popup: "animate__animated animate__slideInRight", // entrée animée
          },
          hideClass: {
            popup: "animate__animated animate__slideOutRight", // sortie animée
          },
          customClass: {
            popup: "rounded-2xl shadow-lg p-4", // style chic
          },
        });
      }
    } catch (e) {
      //console.log("Share cancelled");
    }
  };
  const isArabic = (text: string) => {
    return /[\u0600-\u06FF]/.test(text);
  };
  // Affiche un message de chargement si le service n’est pas encore chargé
  if (!service) {
    return <div className="text-center py-10">Chargement du service...</div>;
  }
  // Affiche un message de chargement si le service n’est pas encore chargé
  if (!user) {
    return <div className="text-center py-10">Chargement du service...</div>;
  }

  return (
    <>
    <Helmet>
      <title>{service.title} | ServicePro</title>

      <meta name="description" content={service.description} />

      {/* OpenGraph */}
      <meta property="og:title" content={service.title} />
      <meta property="og:description" content={service.description} />
      <meta property="og:image" content={service.gallery[0]} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    
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
                {/*<span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-sm">
                  <Zap size={14} className="text-yellow-500 mr-1" /> Populaire
                </span>*/}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#e0692d] text-white">
                  {service.metier}
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h1>
                  
                  {service.category && (
                    <span className="inline-flex items-center gap-1 bg-orange-50 text-[#e0692d] text-xs font-bold px-2 py-1 rounded-full mb-3">
                      <Tag size={12} />
                      {service.category}
                    </span>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center text-yellow-500 font-bold">
                      <Star size={16} fill="currentColor" className="mr-1" />
                      {service.provider.rating}
                      <span className="text-gray-400 font-normal ml-1">
                        ({user.stats.reviewsPosted} avis)
                      </span>
                    </div>

                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {user.city}, {user.region}
                    </div>

                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {service.duration}
                    </div>
                  </div>
                </div>

                {/* ✅ Bloc droite : prix + partager */}
                <div className="hidden md:flex flex-col items-end gap-3 text-right">
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">
                      À partir de
                    </p>
                    <p className="text-3xl font-black text-[#e0692d]">
                      {service.price} DT
                    </p>
                  </div>

                  {/* ✅ Bouton partager */}
                  <button
                    onClick={handleShareService}
                    className="
                      flex items-center gap-2
                      bg-gray-100 hover:bg-gray-200
                      text-gray-700 hover:text-gray-900
                      px-3 py-2 rounded-xl
                      text-sm font-medium
                      transition
                    "
                    title="Partager le service"
                  >
                    <Share2 size={16} />
                    Partager
                  </button>
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

          {/* 2️⃣ DESCRIPTION & PROCESSUS */}
          <section className="bg-white rounded-3xl mb-6 md:mb-10 p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Détails du service</h2>
            <p
              dir={isArabic(service.description) ? "rtl" : "ltr"}
              className={`text-gray-600 mb-8 leading-relaxed ${
                isArabic(service.description) ? "text-right" : "text-left"
              }`}
            >{service.description}</p>
            

            <div className="grid md:grid-cols-2 gap-6">
              {service.included && service.included.length > 0 && service.included[0] !== "" &&
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
              {service.notIncluded && service.notIncluded.length > 0 && service.notIncluded[0] !== "" &&
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
                  <Star size={14} fill="currentColor" className="mr-1" /> {service.provider.rating} <span className="text-gray-400 font-normal ml-1">({user.stats.reviewsPosted})</span>
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
              {!userMe && (
                  <>
                    <button 
                      onClick={() => setShowQuoteModal(true)}
                      className="w-full bg-[#e0692d] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#f07e40] transition-all shadow-lg shadow-orange-100"
                    >
                      <FileText size={20} /> Demander un devis
                    </button>
                    <button 
                    onClick={() => {
                      if (token) {
                        setShowMessageModal(true);
                      } else {
                        setShowLoginModal(true);
                      }
                    }}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                      <MessageSquare size={20} /> Contacter le pro
                    </button>
                  </>
              )}
              {user.show_phone && (
                <button 
                  onClick={() => setShowPhone(!showPhone)}
                  className={`w-full border-2 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                    showPhone ? "border-green-500 text-green-600 bg-green-50" : "border-gray-100 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Phone size={18} /> 
                  {showPhone ? user?.phone || "+216 55 289 528" : "Voir le numéro"}
                </button>
              )}
            </div>

            {/*<div className="mt-6 pt-6 border-t space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck size={18} className="text-green-500" /> Professionnel vérifié
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Info size={18} className="text-blue-500" /> Garantie Qualité
              </div>
            </div>*/}
          </div>
          <div className="hidden lg:block bg-white p-4 rounded-[24px] shadow-md">
            <p className="text-sm text-gray-500 mb-2">Publicité</p>
            <div className="h-[600px] flex items-center justify-center border border-dashed border-gray-300">
              <span className="text-gray-400">Espace publicitaire disponible</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-[24px] shadow-md">
            <p className="text-sm text-gray-500 mb-2">Publicité</p>
            <div className="h-[250px] flex items-center justify-center border border-dashed border-gray-300">
              <span className="text-gray-400">Espace publicitaire disponible</span>
            </div>
          </div>
        </div>
      </div>

      
      {/* 🔟 CALL TO ACTION STICKY MOBILE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3 z-50">
        {!userMe && (
          <>
            <button 
              onClick={() => setShowQuoteModal(true)}
              className="flex-1 bg-[#e0692d] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-100">
                Demander Devis
              </button>
              <button className="p-3 bg-gray-100 rounded-xl">
                <MessageSquare size={20} className="text-gray-700" />
              </button>
          </>
        )}
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
              
              {/*<input 
                type="date" 
                className="w-full p-2 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                onChange={(e) => setQuoteDetails({...quoteDetails, date: e.target.value})}
                required
              />*/}
              <CustomPicker
                value={quoteDetails.date}
                onChange={(date) =>
                  setQuoteDetails(prev => ({
                    ...prev,
                    date
                  }))
                }
                disablePastDates={true}   // optionnel : bloque les dates passées
                required={true}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-secondary">
                Objet de la demande
              </label>
              <input 
                type="text" 
                placeholder="Ex: Installation Climatiseur 12000 BTU"
                className="w-full p-2 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                onChange={(e) => setQuoteDetails({...quoteDetails, objet: e.target.value})}
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
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                onChange={(e) => setQuoteDetails({...quoteDetails, details: e.target.value})}
                required
              ></textarea>
            </div>

            <div className="bg-blue-50 p-3 rounded-xl flex gap-3 items-start">
              <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                Votre demande sera transmise au professionnel. Il pourra vous contacter par téléphone ou via la messagerie interne pour affiner le prix.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#e0692d] text-white py-3 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-orange-200 transition-all active:scale-[0.98]"
            >
              Envoyer ma demande
            </button>
          </form>
        </div>
      </div>
      )}
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 relative">
            
            {/* Croix de fermeture */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-200 z-10"
              aria-label="Fermer"
            >
              <span className="text-2xl font-bold">&times;</span>
            </button>
  
            <div className="bg-[#e0692d] p-4 rounded-t-lg">
              <h3 className="text-xl font-semibold text-white">Connexion requise</h3>
            </div>
            
            <form onSubmit={handleLogin} className="p-6">
              {loginError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {loginError}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                      placeholder="Votre email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                      placeholder="Votre mot de passe"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full bg-[#e0692d] text-white px-4 py-2 rounded-md hover:bg-[#f07e40] transition-colors duration-200"
                >
                  Se connecter
                </button>
                <Link
                  to="/inscription"
                  className="w-full text-center px-4 py-2 border border-[#e0692d] text-[#e0692d] rounded-md hover:bg-[#e0692d] hover:text-white transition-colors duration-200"
                >
                  Créer un compte
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* --- MODAL MESSAGE --- */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#e0692d] p-4 text-white flex justify-between items-center">
              <h3 className="font-bold">Nouveau message</h3>
              <button onClick={() => setShowMessageModal(false)} className="bg-white/20 p-2 rounded-full hover:bg-white/30">
              <XCircle size={24} />
            </button>
            </div>
            <form onSubmit={handleSendMessage} className="p-6">
              <textarea 
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-200 outline-none" 
                rows={4} 
                placeholder="Bonjour..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button className="w-full mt-4 bg-[#e0692d] text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-[#f07e40]">
                <Send size={18} /> Envoyer le message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ServiceDetail;
