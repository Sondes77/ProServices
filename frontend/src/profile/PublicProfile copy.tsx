import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import { 
  Star, 
  MessageSquare, 
  Calendar,
  Tag,
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  ExternalLink,
  Users,
  Lock,
  ArrowLeft,
  Briefcase,
  Share2,
  BadgeCheck
} from 'lucide-react';
import { User, Service, Review } from '../utils/types';
import { mapUserDataToUserModel, mapServicesDataToUserModel } from '../utils/mapper';
import pubImage from '../img/Datavancia cover.png';
import pubVideo from '../img/1000x300.mp4';
import Swal from "sweetalert2";

interface PublicProfileProps {
  user2: User;
  //services: Service[];
  //reviews: Review[];
}

const PublicProfile: React.FC<PublicProfileProps> = ({ user2 }) => {
  const routeParams = useParams<{ id?: string }>();
  const id = routeParams.id || user2?.id; 
 
  const navigate = useNavigate();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const token = localStorage.getItem('token');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const userMe = user?.id === user2?.id;
  const [reviewsOpen, setReviewsOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;
  
  useEffect(() => {
    
    const fetchService = async () => {
      
      try {  
        
        const response = await fetch(`http://localhost:5000/api/professional/${id}`, {
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
        if (data[0].role === "user"){
          navigate(`/user/${id}`);
        }
        const mapped = mapUserDataToUserModel(service);
        setUser(mapped);
        const resp = await fetch(`http://localhost:5000/api/pro-service/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`,
          },
        });

        if (resp.ok){
          const prosData = await resp.json();
          const mapped = prosData.map((element: any) =>
            mapServicesDataToUserModel(element)
          );

          setServices(mapped);
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

  const fetchReviews = async () => {
      
      try {  
        const resp = await fetch(`http://localhost:5000/api/pro-review/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`,
          },
        });

        if (resp.ok){
          const prosData = await resp.json();

          const sorted = [...prosData].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );

          setReviews(sorted);
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
  useEffect(() => {
    
    if (id) {
      fetchReviews();
    }
  }, [id]);
  
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };
  
  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={interactive ? 24 : 16}
            className={`${
              interactive 
                ? 'cursor-pointer transition-colors duration-200' 
                : ''
            } ${
              star <= (interactive ? (hoverRating || rating) : rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && setRating(star)}
          />
        ))}
      </div>
    );
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

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
         Swal.fire({
          title: "Session expirée",
          text: "Veuillez vous connecter pour envoyer un message.",
          icon: "warning",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "center",
          customClass: {
            popup: "rounded-2xl shadow-lg", // style chic
          }
        });
        setTimeout(() => {
          setShowMessageModal(false);
          setShowLoginModal(true);
        }, 1500);
        return;
      }

      // Crée ou récupère la conversation avec ce professionnel
      const res = await fetch(`http://localhost:5000/api/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          recipientId: user?.id, // destinataire
          content: message
        })
      });

      if (!res.ok) {
        throw new Error(`Erreur serveur: ${res.status}`);
      }

      const savedMessage = await res.json();
    
      // Réinitialiser le formulaire et fermer le modal
      setMessage('');
      setShowMessageModal(false);

      // Optionnel : rediriger vers la conversation ou afficher confirmation
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "success",
        //title: selectedService ? "Service mis à jour" : "Service créé",
        text: "Message envoyé avec succès!",
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

    } catch (error) {
      
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "warning",
        //title: selectedService ? "Service mis à jour" : "Service créé",
        text: "Impossible d’envoyer le message. Veuillez réessayer.",
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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "warning",
        //title: selectedService ? "Service mis à jour" : "Service créé",
        text: "Veuillez attribuer une note.",
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
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          title: "Session expirée",
          text: "Veuillez vous connecter pour laisser un avis.",
          icon: "warning",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
          customClass: {
            popup: "rounded-2xl shadow-lg", // style chic
          }
        });

        setTimeout(() => {
          setShowReviewModal(false);
          setShowLoginModal(true);
        }, 1500);
        return;
      }

      // Crée ou récupère la conversation avec ce professionnel
      const res = await fetch(`http://localhost:5000/api/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          recipientId: user?.id, // destinataire
          content: reviewComment,
          rating: rating
        })
      });

      if (!res.ok) {
        throw new Error(`Erreur serveur: ${res.status}`);
      }
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "success",
        title: "Merci !",
        text: "Votre avis a été publié.",
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
      const savedReview = await res.json();
      
      setRating(0);
      setReviewComment('');
      setShowReviewModal(false);
      fetchReviews();

    } catch (error) {
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "warning",
        //title: selectedService ? "Service mis à jour" : "Service créé",
        text: "Impossible d’envoyer le message. Veuillez réessayer.",
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

  const handleServiceClick = (categorie:string, metier:string, ville: string, serviceId: string) => {
    navigate(`/service/${categorie.toLowerCase()}/${metier.toLowerCase()}/${ville.toLowerCase()}/${serviceId}`);
  };

  const handleShareProfile = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: user?.fullName,
          text: "Voir ce profil professionnel",
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
          text: "Lien du profil copié",
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
      console.log("");
    }
  };

  useEffect(() => {
    //const token = localStorage.getItem('token');
    if (!routeParams?.id && !user2?.id) {
      window.location.href='connexion';
    } else {
      setIsCheckingAuth(false);
    }
  }, []);
  
  if (isCheckingAuth) return null;
  // Affiche un message de chargement si le service n’est pas encore chargé
  if (!user) {
    return <div className="text-center py-10">Chargement du service...</div>;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Advertisement Banner */}
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="relative h-[300px] w-full overflow-hidden rounded-lg border border-dashed border-gray-300">
            
            {/* BADGE PUBLICITÉ */}
            <span className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur">
              Publicité
            </span>

            <a
              href="https://www.datavancia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full w-full"
            >
              <video
                src={pubVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              >
                Votre navigateur ne supporte pas la vidéo.
              </video>
            </a>
          </div>
        </div>
      </div>

      <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-gray-500 hover:text-black transition-colors">
        <ArrowLeft size={18} className="mr-2" /> Retour
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="lg:flex-grow">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-[#e0692d] p-6 relative">
              {/* ✅ Bouton partage en haut à droite */}
              <button
                onClick={handleShareProfile}
                className="
                  absolute top-4 right-4
                  bg-white/20 hover:bg-white/30
                  text-white
                  p-2 rounded-xl
                  transition
                  backdrop-blur-sm
                  z-10
                "
                title="Partager le profil"
              >
                <Share2 size={18} />
              </button>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                
                <div className="relative">
                  <img 
                    src={user.avatar} 
                    alt={user.fullName} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  {/*<span className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>*/}
                </div>

                <div className="md:ml-6 text-center md:text-left">
                  <h1 className="flex items-center justify-center md:justify-start text-2xl font-bold text-white">
                    {user.fullName}
                  </h1>

                  <div className="flex items-center justify-center md:justify-start text-white opacity-90 space-x-2">
                    <MapPin className="hidden md:block" size={16} />
                    <span>
                      {user.show_address && (`${user.address}, `)}
                      {user.city}, {user.region}
                    </span>
                  </div>

                  <div className="flex items-center justify-center md:justify-start mt-2 space-x-4">
                    {renderStars(Math.round(parseFloat(calculateAverageRating())))}
                    <span className="text-white opacity-90">({reviews.length} avis)</span>
                  </div>
                </div>

              </div>
            </div>
            <div className="p-6">
              {!userMe && (
                <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                  <button
                    onClick={() => {
                      if (token) {
                        setShowMessageModal(true);
                      } else {
                        setShowLoginModal(true);
                      }
                    }}
                    className="flex-1 md:flex-none bg-[#e0692d] text-white px-6 py-3 rounded-full shadow hover:bg-[#f07e40] transition-colors duration-200 flex items-center justify-center"
                  >
                    <MessageSquare size={18} className="mr-2" />
                    Contacter
                  </button>
                  <button
                    onClick={() => {
                      if (token) {
                        setShowReviewModal(true);
                      } else {
                        setShowLoginModal(true);
                      }
                    }}
                    className="flex-1 md:flex-none border-2 border-[#e0692d] text-[#e0692d] px-6 py-3 rounded-full shadow hover:bg-[#e0692d] hover:text-white transition-colors duration-200 flex items-center justify-center"
                  >
                    <Star size={18} className="mr-2" />
                    Donner un avis
                  </button>
                </div>
              )}
              <div className="grid grid-cols-3 gap-3 md:gap-6 mt-8">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-[#e0692d]">
                    {user.stats.servicesPublished}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Services proposés
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-[#e0692d]">
                    {calculateAverageRating()}/5
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Note moyenne
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-[#e0692d]">
                    {reviews.length}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Avis clients
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">À propos</h2>
                <p className="text-gray-600">{user.apropos}</p>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Services proposés</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.filter(service => service.status === 'active').map(service => (
                  <div 
                    key={service.id} 
                    className="group relative bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:border-orange-200 transition-all duration-300 cursor-pointer"
                    onClick={() => handleServiceClick(service.category, service.metier,user.region,service.id)}
                  >
                    {/* Badge de disponibilité discret */}
                    <div className="flex justify-between items-start mb-4">
                      {/* Catégorie à gauche */}
                      
                      <span className="inline-flex items-center gap-1 bg-orange-50 text-[#e0692d] text-xs font-bold px-2 py-1 rounded-full">
                        <Briefcase size={12} />
                        {service.metier}
                      </span>
                     
                      <div className="text-gray-300 group-hover:text-[#e0692d] transition-colors">
                        <ExternalLink size={18} />
                      </div>
                    </div>

                    {/* Titre & Description */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#e0692d] transition-colors leading-tight">
                        {service.title}
                      </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle size={12} className="mr-1" />
                          {service.duration}
                        </span>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    {/* Footer de la carte : Catégorie & Prix */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                      <div className="flex items-center text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl">
                        <Tag  size={14} className="mr-2 text-[#e0692d]" />
                        <span className="text-xs font-semibold">{service.category}</span>
                      </div>

                      {service.price && (
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter mb-0.5">À partir de</p>
                          <p className="text-lg font-black text-[#e0692d]">
                            {service.price} <span className="text-xs font-bold">DT</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Avis clients {!reviewsOpen && `(${reviews.length})`}</h2>
                {/*!userMe && (
                  <button
                    onClick={() => {
                      if (token) {
                        setShowReviewModal(true);
                      } else {
                        setShowLoginModal(true);
                      }
                    }}
                    className="text-[#e0692d] hover:text-[#f07e40] font-medium flex items-center"
                  >
                    <Star size={18} className="mr-2" />
                    Donner un avis
                  </button>
                )*/}
                <button
                onClick={() => setReviewsOpen(prev => !prev)}
                className="text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                {reviewsOpen ? "Masquer" : "Afficher"}
              </button>
              </div>
              {reviewsOpen && (
                <div className="space-y-6">
                  
                  {visibleReviews.map((review) => (
                    <div key={review.review_id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start">
                        <img 
                          src={review.author_photo}
                          alt={review.author_nom}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-900 font-semibold cursor-pointer hover:text-[#e0692d]" onClick={() => navigate(`/professional/${review.author_id}`)}>{review.author_nom}</h4>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                          </div>
                          {renderStars(review.rating)}
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Aucun avis */}
                  {reviews.length === 0 && (
                    <p className="text-center text-gray-400">
                      Aucun avis pour le moment.
                    </p>
                  )}

                  {/* Bouton afficher plus */}
                  {hasMore && (
                    <div className="text-center pt-4">
                      <button
                        onClick={() => setVisibleCount(v => v + 10)}
                        className="px-5 py-2 rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition"
                      >
                        Afficher plus
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Advertisement Column */}
        <div className="hidden lg:block lg:w-80 space-y-8">
          {!token && (
            <>
              <div className="bg-slate-900 rounded-[24px] p-6 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <h4 className="text-lg font-bold mb-2">Vous êtes un pro ?</h4>
                  <p className="text-slate-400 text-sm mb-4">Augmentez votre visibilité et recevez plus de chantiers.</p>
                  <button onClick={() => navigate("/business")} className="w-full bg-[#e0692d] py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                    S'inscrire comme Pro
                  </button>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>
              </div>

              <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BadgeCheck size={18} className="text-[#e0692d]" />
                  Pourquoi nous ?
                </h4>
                <ul className="space-y-4">
                  {[
                    "Profils vérifiés manuellement",
                    "Avis clients 100% authentiques",
                    "Mise en relation gratuite",
                    "Experts de votre région"
                  ].map((text, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 font-medium">
                      <div className="w-5 h-5 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          <div className="bg-white p-4 rounded-[24px] shadow-md">
            <p className="text-sm text-gray-500 mb-2">Publicité</p>
            <div className="h-[600px] flex items-center justify-center border border-dashed border-gray-300">
              {/*<span className="text-gray-400">Espace publicitaire disponible</span> */}
               <a href="https://www.datavancia.com/" target="_blank" rel="noopener noreferrer">
                <img 
                  src={pubImage} 
                  alt="Publicité" 
                  className="h-full w-full p-2 object-cover rounded"
                /></a>
            </div>
          </div>
          <div className="bg-white p-4 rounded-[24px] shadow-md">
            <p className="text-sm text-gray-500 mb-2">Publicité</p>
            <div className="h-[350px] flex items-center justify-center border border-dashed border-gray-300">
              <span className="text-gray-400">Espace publicitaire disponible</span>
            </div>
          </div>
        </div>
      </div>
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
         
      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="bg-[#e0692d] p-4 rounded-t-lg">
              <h3 className="text-xl font-semibold text-white">Contacter {user.fullName}</h3>
            </div>
            <form onSubmit={handleSendMessage} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                    rows={4}
                    placeholder="Décrivez votre besoin..."
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {setShowMessageModal(false); setMessage('');}}
                  className="thq-button-outline"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="thq-button-filled flex items-center"
                >
                  <Send size={16} />
                  <span>Envoyer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="bg-[#e0692d] p-4 rounded-t-lg">
              <h3 className="text-xl font-semibold text-white">Évaluer {user.fullName}</h3>
            </div>
            <form onSubmit={handleSubmitReview} className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note
                  </label>
                  <div className="flex items-center space-x-2">
                    {renderStars(rating, true)}
                    {rating > 0 && (
                      <span className="text-sm text-gray-600 ml-2">
                        {rating}/5
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre avis
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                    rows={4}
                    placeholder="Partagez votre expérience..."
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {setShowReviewModal(false); setRating(0); setReviewComment('');}}
                  className="thq-button-outline"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="thq-button-filled flex items-center"
                >
                  <Star size={16} className="mr-2" />
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default PublicProfile;