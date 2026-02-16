import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag, Clock, Share2 } from 'lucide-react';
import { blogPosts, BlogPost } from './blogData';
import Swal from 'sweetalert2';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!id) {
      navigate('/blog');
      return;
    }

    const articleId = parseInt(id);
    const foundArticle = blogPosts.find(post => post.id === articleId);
    
    if (!foundArticle) {
      navigate('/blog');
      return;
    }

    setArticle(foundArticle);

    // Get related articles from the same category
    const related = blogPosts
      .filter(post => post.category === foundArticle.category && post.id !== articleId)
      .slice(0, 3);
    
    setRelatedArticles(related);

    // Set page title
    document.title = `${foundArticle.title} | ProFinder Blog`;

    // Scroll to top
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
        .catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "success",
        //title: selectedService ? "Service mis à jour" : "Service créé",
        text: "Lien copié dans le presse-papier!",
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

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#e0692d] text-white mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {article.title}
            </h1>
            <div className="mt-6 flex items-center justify-center text-white">
              <User className="h-5 w-5" />
              <span className="ml-2">{article.author}</span>
              <span className="mx-3">•</span>
              <Calendar className="h-5 w-5" />
              <span className="ml-2">{article.date}</span>
              <span className="mx-3">•</span>
              <Clock className="h-5 w-5" />
              <span className="ml-2">{article.readTime} de lecture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700 transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-gray-700 transition-colors">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{article.title.substring(0, 20)}...</span>
        </nav>
      </div>

      {/* Article Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {article.author}
                    </p>
                    <p className="text-xs text-gray-500">
                      Publié le {article.date}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleShare}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
                <div className="relative h-40">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-[#e0692d] font-medium hover:text-[#f07e40] transition-colors duration-300 text-sm group"
                  >
                    Lire plus
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back to Blog Button */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
        <Link 
          to="/blog"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#e0692d] hover:bg-[#f07e40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e0692d] transition-colors duration-300"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour au blog
        </Link>
      </div>
    </div>
  );
};

export default ArticleDetail;