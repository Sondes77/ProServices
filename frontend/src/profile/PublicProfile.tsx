import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  CheckCircle
} from 'lucide-react';
import { User, Service, Review } from '../utils/types';

interface PublicProfileProps {
  user: User;
  services: Service[];
  reviews: Review[];
}

const PublicProfile: React.FC<PublicProfileProps> = ({ user, services, reviews }) => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');


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
  
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to the backend
    console.log('Message sent:', message);
    setMessage('');
    setShowMessageModal(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Veuillez attribuer une note');
      return;
    }
    // In a real app, this would send the review to the backend
    console.log('Review submitted:', {
      rating,
      comment: reviewComment
    });
    setRating(0);
    setReviewComment('');
    setShowReviewModal(false);
  };
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const navigate = useNavigate();
    // Met à jour step à 1 si isVerified devient true
    useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        window.location.href='connexion';
      } else {
        setIsCheckingAuth(false); // ✅ Auth OK, on peut afficher
      }
    },  []);
      
    if (isCheckingAuth) return null;
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white py-20 rounded-lg shadow-md overflow-hidden mb-8">
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
            <div className="md:ml-auto space-y-2 md:space-y-0 md:space-x-2">
              <button
                onClick={() => setShowReviewModal(true)}
                className="w-full md:w-auto bg-white text-[#e0692d] px-6 py-2 rounded-full shadow hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                <Star size={18} className="mr-2" />
                Donner un avis
              </button>
              <button
                onClick={() => setShowMessageModal(true)}
                className="w-full md:w-auto bg-white text-[#e0692d] px-6 py-2 rounded-full shadow hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                <MessageSquare size={18} className="mr-2" />
                Contacter
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <p className="text-gray-600"> {user.apropos}</p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Services proposés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter(service => service.status === 'active').map(service => (
              <div key={service.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
            <button
              onClick={() => setShowReviewModal(true)}
              className="text-[#e0692d] hover:text-[#f07e40] font-medium flex items-center"
            >
              <Star size={18} className="mr-2" />
              Donner un avis
            </button>
          </div>
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                  <img 
                    src={review.author.avatar}
                    alt={review.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-900">{review.author.name}</h4>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{formatDate(review.timestamp)}</span>
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