import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { blogPosts } from './blogData';
import AdvertisementBanner from './AdvertisementBanner';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous les articles');
  const navigate = useNavigate();
  
  const categories = [
    'Tous les articles',
    'Guides',
    'Conseils',
    'Tendances',
    'Témoignages',
    'Actualités'
  ];

  const filteredPosts = selectedCategory === 'Tous les articles' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleServiceClick = (id: string) => {
    navigate(`/service/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Top Advertisement */}
      <AdvertisementBanner placement="top" className="mb-8" />
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Blog ProFinder
            </h1>
            <p className="mt-5 text-xl text-gray-500">
              Conseils, guides et actualités du monde des services
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-wrap gap-4 justify-center">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                category === selectedCategory
                  ? 'bg-[#e0692d] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={filteredPosts[0].image}
                  alt={filteredPosts[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#e0692d] text-white">
                    {filteredPosts[0].category}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{filteredPosts[0].readTime} de lecture</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {filteredPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">{filteredPosts[0].author}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">{filteredPosts[0].date}</span>
                  </div>
                  <Link 
                    to={`/blog/${filteredPosts[0].id}`}
                    className="inline-flex items-center text-[#e0692d] font-medium hover:text-[#f07e40] transition-colors duration-300"
                  >
                    Lire plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#e0692d] text-white">
                    {post.category}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{post.readTime} de lecture</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">{post.date}</span>
                  </div>
                </div>
                <Link 
                  to={`/blog/${post.id}`}
                  className="mt-4 inline-flex items-center text-[#e0692d] font-medium hover:text-[#f07e40] transition-colors duration-300 group"
                >
                  Lire plus
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600">
              Il n'y a pas d'articles dans cette catégorie pour le moment.
            </p>
            <button
              onClick={() => setSelectedCategory('Tous les articles')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#e0692d] hover:bg-[#f07e40]"
            >
              Voir tous les articles
            </button>
          </div>
        )}
        
        </div>
      
        {/* Bottom Advertisement */}
      <AdvertisementBanner placement="bottom" className="mt-16" />
    </div>
    
  );
};

export default BlogPage;