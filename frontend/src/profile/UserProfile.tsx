import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  ArrowLeft, 
  MessageSquare, 
  Send, 
  X,
  Users,
  Lock
} from 'lucide-react';
import { User, Review } from '../utils/types';
import { mapUserDataToUserModel } from '../utils/mapper';
import pubImage from '../img/Datavancia cover.png';
import pubVideo from '../img/1000x300.mp4';
import Swal from "sweetalert2";

interface PublicProfileProps {
  user2: User;
  //services: Service[];
  //reviews: Review[];
}

const UserProfile:  React.FC<PublicProfileProps> = ({ user2 }) => {
  const routeParams = useParams<{ id?: string }>();
  const id = routeParams.id || user2?.id; 
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // États des données
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsOpen, setReviewsOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  // États des modaux
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [message, setMessage] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const userMe = user?.id === user2?.id;
  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await fetch(`http://localhost:5000/api/professional/${id}`);
        const userData = await userRes.json();
        if (userData[0].role === "professional"){
          navigate(`/professional/${id}`);
        }
        
        setUser(mapUserDataToUserModel(Array.isArray(userData) ? userData[0] : userData));

        const reviewsRes = await fetch(`http://localhost:5000/api/pro-review/${id}`);
        if (reviewsRes.ok) {

          const data = await reviewsRes.json();
          const sorted = [...data].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );

          setReviews(sorted);
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
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUserData();
  }, [id]);

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

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return Swal.fire("Note manquante", "Veuillez choisir une note", "warning");

    try {
      const res = await fetch(`http://localhost:5000/api/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ recipientId: user?.id, content: reviewComment, rating })
      });
      if (res.ok) {
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
        setRating(0);
        setReviewComment('');
        setShowReviewModal(false);
        // Refresh reviews
        const reviewsRes = await fetch(`http://localhost:5000/api/pro-review/${id}`);
        if (reviewsRes.ok) {

          const data = await reviewsRes.json();
          const sorted = [...data].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );

          setReviews(sorted);
        }
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

  if (loading) return <div className="text-center py-20 italic">Chargement...</div>;
  if (!user) return <div className="text-center py-20 font-bold">Utilisateur introuvable</div>;

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
          {/* Profil Header */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100">
            <div className="h-40 bg-gradient-to-br from-[#e0692d] to-[#ff9259]"></div>
            <div className="px-8 pb-8 relative">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:items-end -mt-16 mb-6">
                <img src={user.avatar} alt={user.fullName} className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-md bg-white" />
                <div className="md:ml-6 mb-2 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
                  {(user.city || user.region) && (
                    <p className="text-gray-500 flex items-center justify-center md:justify-start">
                      <MapPin size={16} className="mr-1" />
                      {user.city}{user.city && user.region && ", "}{user.region}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2 md:ml-auto mt-4 md:mt-0">
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
                        className="bg-[#e0692d] text-white px-6 py-2.5 rounded-xl hover:bg-[#f07e40] transition-all flex items-center shadow-lg shadow-orange-100"
                      >
                        <MessageSquare size={18} className="mr-2" /> Contacter
                      </button>
                      <button 
                        onClick={() => {
                            if (token) {
                              setShowReviewModal(true);
                            } else {
                              setShowLoginModal(true);
                            }
                          }}
                        className="border-2 border-gray-100 text-gray-600 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-all flex items-center"
                      >
                        <Star size={18} className="mr-2 text-yellow-400" /> Avis
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{user.apropos || "Aucune description fournie."}</p>
              </div>
            </div>
            
          </div>

          {/* Liste des Avis */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">

            {/* Header + Toggle */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Avis de la communauté ({reviews.length})
              </h3>

              <button
                onClick={() => setReviewsOpen(prev => !prev)}
                className="text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                {reviewsOpen ? "Masquer" : "Afficher"}
              </button>
            </div>

            {/* Contenu toggle */}
            {reviewsOpen && (
              <div className="space-y-6">

                {visibleReviews.map((r) => (
                  <div key={r.review_id} className="flex gap-4 p-4 rounded-2xl bg-gray-50">
                    <img
                      src={r.author_photo}
                      className="w-12 h-12 rounded-full object-cover"
                      alt=""
                    />

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                       <span className="font-semibold cursor-pointer hover:text-[#e0692d]" onClick={() => navigate(`/professional/${r.author_id}`)}> {r.author_nom}</span>

                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < r.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>

                        <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-sm text-gray-500">
                          {formatDate(r.created_at)}
                        </span>
                      </div>
                      <span className="inline-flex text-xs font-medium sm:hidden text-sm text-gray-500">
                        {formatDate(r.created_at)}
                      </span>    
                      <p className="mt-2 text-gray-600">{r.comment}</p>
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
          {/* Right Advertisement Column */}
          <div className="hidden lg:block lg:w-80 space-y-8">
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

      {/* --- MODAL MESSAGE --- */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#e0692d] p-4 text-white flex justify-between items-center">
              <h3 className="font-bold">Nouveau message</h3>
              <button onClick={() => setShowMessageModal(false)}><X size={20}/></button>
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

      {/* --- MODAL AVIS --- */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-[#e0692d] p-4 rounded-t-lg p-6 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg text-white">Laisser un avis</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-black"><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmitReview} className="p-6">
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    size={32} 
                    className={`cursor-pointer transition-transform active:scale-90 ${s <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                    onClick={() => setRating(s)}
                  />
                ))}
              </div>
              <textarea 
                className="w-full border-2 border-gray-50 rounded-xl p-3 bg-gray-50 focus:bg-white outline-none transition-all" 
                rows={3} 
                placeholder="Votre expérience avec cet utilisateur..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                required
              />
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
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

export default UserProfile;