import React, { useEffect, useState } from 'react';
import { Star, MessageSquare, Search, Filter, Loader2 } from 'lucide-react';
import { Review, User } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import CustomSelect from './CustomSelect';

interface ReviewsProps {
  user: User;
}

const Reviews: React.FC<ReviewsProps> = ({ user }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  /* =========================
     FETCH REVIEWS (API)
  ========================== */
  useEffect(() => {
    const fetchReviews = async () => {
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
      } 
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/mes-reviews`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
        if (!res.ok) throw new Error('Erreur chargement avis');

        const data = await res.json();
        setReviews(data);
      } catch (err: any) {
        setError(err.message || 'Erreur serveur');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user.id, user.role]);

  /* =========================
     FILTERING
  ========================== */
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.author_nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'positive' && review.rating >= 4) ||
      (filter === 'negative' && review.rating < 4);

    return matchesSearch && matchesFilter;
  });

  /* =========================
     HELPERS
  ========================== */
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
      : '0';

  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={16}
          className={
            s <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }
        />
      ))}
    </div>
  );

  /* =========================
     REPLY TO REVIEW (API)
  ========================== */
  /*const submitReply = async (reviewId: string) => {
    if (!replyText.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${reviewId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ reply: replyText }),
      });

      if (!res.ok) throw new Error('Erreur réponse');

      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, reply: replyText } : r
        )
      );

      setReplyingTo(null);
      setReplyText('');
    } catch {
      alert('Impossible d’envoyer la réponse');
    }
  };

  const handleServiceSubmit = async (serviceData: Partial<Service>) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token non trouvé. Veuillez vous reconnecter.');
      return;
    }

    try {
      const url = selectedService
        ? `http://localhost:5000/api/services/${selectedService.id}` // Update
        : 'http://localhost:5000/api/service'; // Create

      const method = selectedService ? 'PUT' : 'POST';
      console.log(serviceData);
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'enregistrement');
      }

      const updatedService = await response.json();
      alert(selectedService ? 'Service mis à jour avec succès' : 'Service créé avec succès');

      // Optionnel : mets à jour localement l’état
      await fetchUserData();
      
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Erreur réseau');
    }

    setShowServiceForm(false);
    setSelectedService(null);
  };*/

  const calculateAverageRating = () => {
    if (reviews.length === 0) return '0';
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  /* =========================
     RENDER
  ========================== */
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#e0692d]" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* HEADER */}
      <div className="bg-[#e0692d] p-4 text-white">
        <h2 className="text-xl font-semibold">
          {user.role === 'professional' ? 'Avis reçus' : 'Avis postés'}
        </h2>
        <p className="text-sm opacity-80">
          {user.role === 'professional'
            ? 'Évaluations de vos clients'
            : 'Vos avis sur les professionnels'}
        </p>
      </div>

      <div className="p-4">
        {/* Summary and Filters */}
          <div className="px-2 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              {user.role === 'professional' && (
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">{calculateAverageRating()}</span>
                    <span className="text-lg text-gray-600 ml-1">/5</span>
                  </div>
                  <div className="ml-3">
                    {renderStars(Math.round(parseFloat(calculateAverageRating())))}
                    <p className="text-sm text-gray-500 mt-1">Basé sur {reviews.length} avis</p>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="
                    w-full
                    py-3 pr-4 pl-12   /* ✅ padding gauche augmenté */
                    bg-gray-50
                    border border-transparent
                    focus:ring-2 focus:ring-orange-200
                    focus:bg-white
                    rounded-2xl
                    outline-none
                    transition-all" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                 
                  <CustomSelect
                    name="filtre"
                    value={filter}
                    onChange={(value: string) => setFilter(value as 'all' | 'positive' | 'negative')}
                    options={[
                      { value: 'all', label: 'Tous les avis' },
                      { value: 'positive', label: 'Avis positifs (4-5 ★)' },
                      { value: 'negative', label: 'Avis négatifs (1-3 ★)' },
                    ]}
                    placeholder="Filtrer par note"
                  />
                  
                </div>
              </div>
            </div>
          </div>
          
       {/* LIST */}
        <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-4 rounded">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.author_photo}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{review.author_nom}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(review.created_at)}
                    </p>
                  </div>
                </div>

                {renderStars(review.rating)}
              </div>

              <p className="mt-3 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
