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
  Lock
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
  
  console.log("routeParams.id = ",routeParams.id);
  console.log("id profile = ",user2?.id);
  
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
  
  /*useEffect(() => {
      if (!token){
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");

        // Popup moderne + timer 3 sec
        Swal.fire({
          title: "Session expirée",
          text: "Vous allez être redirigé vers la page de connexion.",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "center",
          customClass: {
            popup: "rounded-2xl shadow-lg", // style chic
          }
        });

        // Attendre 3 secondes puis rediriger
        setTimeout(() => {
          navigate("/connexion");
        }, 3000);

        return;
      }; 
  }, [token, navigate]);*/
useEffect(() => {
  if (!routeParams.id) {
    navigate('/connexion');
  }
}, [routeParams.id, navigate]);

  useEffect(() => {
    
    const fetchService = async () => {
      
      try {  
        //const token = localStorage.getItem('token');
        //if (!token) {
            //console.error("Aucun token trouvé dans le localStorage");
            //return;
        //}
        
        const response = await fetch(`http://localhost:5000/api/professional/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          alert('Erreur lors de la récupération du Professionnel');
          return;
        }
        
        const data = await response.json();
        console.log("data = ",data);
        const service = Array.isArray(data) ? data[0] : data;
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
          alert('Erreur lors de la récupération du service');
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
  const fetchReviews = async () => {
      
      try {  
        /*const token = localStorage.getItem('token');
        if (!token) {
            console.error("Aucun token trouvé dans le localStorage");
            return;
        }*/
        
        const resp = await fetch(`http://localhost:5000/api/pro-review/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`,
          },
        });

        if (resp.ok){
          const prosData = await resp.json();
          /*const mapped = prosData.map((element: any) =>
            mapServicesDataToUserModel(element)
          );*/

          setReviews(prosData);
        } else {
          alert('Erreur lors de la récupération de review');
          return;
        }
      } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur de connexion au serveur');
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
        //alert('Veuillez vous connecter pour envoyer un message.');
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
      console.log('Message envoyé:', savedMessage);

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
      //alert('Message envoyé avec succès !');

    } catch (error) {
      //console.error('Erreur envoi message:', error);
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
      //alert('Impossible d’envoyer le message. Veuillez réessayer.');
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
      //alert('Veuillez attribuer une note');
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
          position: "center",
          customClass: {
            popup: "rounded-2xl shadow-lg", // style chic
          }
        });
        //alert('Veuillez vous connecter pour envoyer un message.');
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

      const savedReview = await res.json();
      console.log('Review envoyé:', savedReview);
      console.log('Review submitted:', { rating, comment: reviewComment });
      setRating(0);
      setReviewComment('');
      setShowReviewModal(false);
      fetchReviews();
      //alert('Review envoyé avec succès !');

    } catch (error) {
      console.error('Erreur envoi message:', error);
      //alert('Impossible d’envoyer le message. Veuillez réessayer.');
    }
  };

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
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


      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="lg:flex-grow">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-[#e0692d] p-6">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                <div className="relative">
                  <img 
                    src={user.avatar} 
                    alt={user.fullName} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <span className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
                </div>
                <div className="md:ml-6 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">{user.fullName}</h1>
                  <div className="flex items-center justify-center md:justify-start text-white opacity-90 space-x-2">
                    <MapPin size={16} />
                    <span>{user.city}, {user.region}</span>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#e0692d]">{user.stats.servicesPublished}</div>
                  <div className="text-gray-600">Services proposés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#e0692d]">{calculateAverageRating()}/5</div>
                  <div className="text-gray-600">Note moyenne</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#e0692d]">{reviews.length}</div>
                  <div className="text-gray-600">Avis clients</div>
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
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-[#e0692d] hover:text-[#f07e40] transition-colors duration-200 flex items-center">
                        {service.title}
                        <ExternalLink size={16} className="ml-2" />
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1" />
                        Disponible
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <Tag size={14} className="mr-1" />
                        {service.category}
                      </span>
                      {service.price && (
                        <span className="text-sm font-medium text-[#e0692d]">
                          {service.price}
                        </span>
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
                <h2 className="text-xl font-semibold text-gray-800">Avis clients</h2>
                {!userMe && (
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
                )}
              </div>
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.review_id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <img 
                        src={review.author_photo}
                        alt={review.author_nom}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900">{review.author_nom}</h4>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                        </div>
                        {renderStars(review.rating)}
                        <p className="mt-2 text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Advertisement Column */}
        <div className="lg:w-80 space-y-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
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
          <div className="bg-white p-4 rounded-lg shadow-md">
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
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
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
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
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