import React, { useState } from 'react';
import { Star, MessageSquare, Search, Filter } from 'lucide-react';
import { Review, User } from '../utils/types';

interface ReviewsProps {
  reviews: Review[];
  user: User;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, user }) => {
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.author.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                          (filter === 'positive' && review.rating >= 4) || 
                          (filter === 'negative' && review.rating < 4);
    
    return matchesSearch && matchesFilter;
  });
  
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#e0692d] p-4">
        <h2 className="text-xl font-semibold text-white">
          {user.role === 'professional' ? 'Avis reçus' : 'Avis postés'}
        </h2>
        <p className="text-white text-opacity-80 text-sm">
          {user.role === 'professional' ? 'Vos évaluations par les clients' : 'Vos avis sur les professionnels'}
        </p>
      </div>
      
      <div className="p-4">
        {/* Summary and Filters */}
        <div className="mb-6">
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
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e0692d] focus:border-transparent transition-colors duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Filter size={16} />
                </div>
                <select
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e0692d] focus:border-transparent transition-colors duration-200 bg-white"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'positive' | 'negative')}
                >
                  <option value="all">Tous les avis</option>
                  <option value="positive">Avis positifs (4-5 ★)</option>
                  <option value="negative">Avis négatifs (1-3 ★)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length > 0 ? (
            filteredReviews.map(review => (
              <div key={review.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <img 
                      src={review.author.avatar} 
                      alt={review.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">{review.author.name}</h4>
                      <p className="text-xs text-gray-500">{formatDate(review.timestamp)}</p>
                    </div>
                  </div>
                  
                  {renderStars(review.rating)}
                </div>
                
                <div className="mt-3">
                  <p className="text-gray-700">{review.comment}</p>
                </div>
                
                {user.role === 'professional' && (
                  <div className="mt-3 flex justify-end">
                    <button className="text-[#e0692d] flex items-center text-sm hover:underline">
                      <MessageSquare size={16} className="mr-1" />
                      Répondre
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Star size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun avis trouvé</h3>
              <p className="text-gray-500">
                {searchQuery || filter !== 'all' ? 
                  "Aucun avis ne correspond à vos critères" : 
                  user.role === 'professional' ? 
                    "Vous n'avez pas encore reçu d'avis" : 
                    "Vous n'avez pas encore posté d'avis"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;