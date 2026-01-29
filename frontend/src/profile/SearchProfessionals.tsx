import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { villesEtRegions } from '../components/villesRegions';
import { Search, MapPin, Filter, Star, MessageSquare, ChevronDown, ChevronUp, ChevronRight, BadgeCheck } from 'lucide-react';
import { Professional } from '../utils/types';
import { mapProfessionalsDataToUserModel } from '../utils/mapper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface SearchProfessionalsProps {
  onViewProfile: (professionalId: string) => void;
}

const SearchProfessionals: React.FC<SearchProfessionalsProps> = ({ onViewProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxPrice: '',
    categories: [] as string[],
    availability: 'all',
  });
  const token = localStorage.getItem('token');
  //alert(token);  
  const categories = [
    'Plombier',
    'Plomberie',
    'Électricien',
    'Menuisier',
    'Climatisation',
    'Maçon',
    'Peintre',
    'Jardinier',
    'Mécanicien'
  ];
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [resultats, setResultats] = useState<Professional[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  
  const [ville, setVille] = useState(query.get('ville') || '');
  const [region, setRegion] = useState(query.get('region') || '');
  const [motCle, setMotCle] = useState(query.get('motcle') || '');

  var i=0;
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const response = await fetch(`http://localhost:5000/api/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          alert('Erreur lors de la récupération des services');
          return;
        }
        if( i === 0){
          i++;
          const prosData = await response.json();
          const mappedProfessionals = prosData.map((element: any) =>
            mapProfessionalsDataToUserModel(element)
          );

          setProfessionals(mappedProfessionals);
      }
        //alert(`Nombre de professionnels : ${mappedProfessionals.length}`);
      } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur de connexion au serveur');
      }
    };

    fetchUserData();
  }, []);


useEffect(() => {
  if (!professionals.length) return;
  if (professionals.length) {
    const filtres = professionals.filter((item) =>
      (!ville || item.city.toLowerCase().includes(ville.toLowerCase())) &&
      (!motCle || item.profession.toLowerCase().includes(motCle.toLowerCase()) || item.description.toLowerCase().includes(motCle.toLowerCase()) || item.name.toLowerCase().includes(motCle.toLowerCase())) &&
      (!region || item.region.toLowerCase().includes(region.toLowerCase())) &&
      (filters.minRating === 0 || item.rating >= filters.minRating) &&
      (
        (!filters.categories.length || filters.categories.includes(item.profession)) &&
        !filters.categories.includes("Toutes les catégories")
      )&&
      (
        filters.availability === 'all' ||
        (filters.availability === 'available' && item.availability)
      )
    );

    setResultats(filtres);
  }
}, [professionals, ville, region, motCle, filters.minRating, filters.categories, filters.availability]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?ville=${ville}&region=${region}&motcle=${motCle}`);
    //setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileClick = (professionalId: string) => {
    navigate(`/professional/${professionalId}`);
    if(token){
      
    } else {

    }
  };

  const resultatsSansDoublons = Array.from(
  new Map(resultats.map(item => [item.id, item])).values()
  );
  const sponsoredProfessionals = resultatsSansDoublons.filter((pro) => pro.sponsored);
  const regularProfessionals = resultatsSansDoublons.filter((pro) => !pro.sponsored);

  const currentsponsoredProfessionals = sponsoredProfessionals.slice();
  const itemsPerPage = 5;
  const totalPages = Math.ceil(regularProfessionals.length / itemsPerPage);
  const currentProfessionals = regularProfessionals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    
    
    <div className="max-w-7xl  mx-auto px-4 py-8">
       {/* Top Advertisement Banner */}
       <div className="bg-gray-100 p-4 rounded-lg mb-8 text-center">
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500 mb-2">Publicité</p>
          <div className="h-[120px] flex items-center justify-center border border-dashed border-gray-300">
            <span className="text-gray-400">Espace publicitaire disponible</span>
          </div>
        </div>
      </div>
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un professionnel..."
                className="pl-10 w-full pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-[#e0692d] focus:border-[#e0692d]"
                value={motCle}
                onChange={(e) => setMotCle(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-[#e0692d] focus:border-[#e0692d]"
                value={ville}
                onChange={(e) => {
                  setVille(e.target.value);
                  setRegion('');
                }}
                required
              >
                <option value="">Sélectionner une ville</option>
                {Object.keys(villesEtRegions).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="pl-10 w-full pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-[#e0692d] focus:border-[#e0692d]"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                disabled={!ville}
                required
              >
                <option value="">Sélectionner une région</option>
                {ville && villesEtRegions[ville as Ville].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center text-[#e0692d] hover:text-[#f07e40] transition-colors duration-200"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtres avancés
              {showAdvancedFilters ? (
                <ChevronUp className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
              )}
            </button>

            {showAdvancedFilters && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note minimum
                  </label>
                  <select
                    className="w-full pr-3 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-[#e0692d] focus:border-[#e0692d]"
                    value={filters.minRating}
                    onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                  >
                    <option value="0">Toutes les notes</option>
                    <option value="4">4+ étoiles</option>
                    <option value="4.5">4.5+ étoiles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <select
                    className="w-full pr-3 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-[#e0692d] focus:border-[#e0692d]"
                    value={filters.categories[0] || ''}
                    onChange={(e) => setFilters({ ...filters, categories: [e.target.value] })}
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disponibilité
                  </label>
                  <select
                    className="w-full pr-3 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-[#e0692d] focus:border-[#e0692d]"
                    value={filters.availability}
                    onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                  >
                    <option value="all">Tous</option>
                    <option value="available">Disponible maintenant</option>
                    <option value="this-week">Disponible cette semaine</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="thq-button-filled"
            >
              <Search className="h-4 w-4 mr-2" />
              Rechercher
            </button>
          </div>
        </form>
      </div>
     
      {/* Sponsored Professionals Carousel */}
      {sponsoredProfessionals.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Professionnels recommandés</h2>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="sponsored-carousel"
          >
            {currentsponsoredProfessionals.map(professional => (
              <SwiperSlide key={professional.id}>
                <div className="bg-gradient-to-br from-white to-orange-50 rounded-lg shadow-md p-6 border border-orange-100 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start">
                    <img
                      src={professional.avatar}
                      alt={professional.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#e0692d] cursor-pointer"
                      onClick={() => handleProfileClick(professional.professional_id)}
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-[#e0692d] cursor-pointer"
                          onClick={() => handleProfileClick(professional.professional_id)}
                        >
                          {professional.name}
                        </h3>
                        {professional.verified && (
                          <BadgeCheck className="h-5 w-5 text-[#e0692d] ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{professional.profession}</p>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 ml-1">
                          {professional.city}, {professional.region}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      {professional.description.length > 50
                        ? professional.description.slice(0, 50) + '...'
                        : professional.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-900">{professional.rating}</span>
                      <span className="mx-1 text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{professional.reviews} avis</span>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {professional.availability}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="inline-flex items-center text-xs text-[#e0692d] font-medium">
                      <Star className="h-4 w-4 mr-1 fill-[#e0692d]" />
                      Sponsorisé
                    </span>
                    <button
                      onClick={() => onViewProfile(professional.id)}
                      className="thq-button-filled text-sm"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Contacter
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {/* Sponsored Professionals 
      {sponsoredProfessionals.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Professionnels recommandés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsoredProfessionals.map(professional => (
              <div
                key={professional.id}
                className="bg-gradient-to-br from-white to-orange-50 rounded-lg shadow-md p-6 border border-orange-100 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start">
                  <img
                    src={professional.avatar}
                    alt={professional.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#e0692d] cursor-pointer"
                    onClick={() => handleProfileClick(professional.professional_id)}
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-[#e0692d] cursor-pointer"  
                        onClick={() => handleProfileClick(professional.professional_id)}>{professional.name}</h3>
                      {professional.verified && (
                        <BadgeCheck className="h-5 w-5 text-[#e0692d] ml-2" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{professional.profession}</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 ml-1">
                        {professional.city}, {professional.region}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {professional.description.length > 50
                    ? professional.description.slice(0, 50) + '...'
                    : professional.description}
                </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm font-medium text-gray-900">{professional.rating}</span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{professional.reviews} avis</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {professional.availability}
                  </span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="inline-flex items-center text-xs text-[#e0692d] font-medium">
                    <Star className="h-4 w-4 mr-1 fill-[#e0692d]" />
                    Sponsorisé
                  </span>
                  <button
                    onClick={() => onViewProfile(professional.id)}
                    className="thq-button-filled text-sm"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}*/}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-grow">
          {/* Regular Professionals */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tous les professionnels</h2>
            <div className="space-y-4">
              {currentProfessionals.map(professional => (
                
                <div
                  key={professional.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-start">
                    <img
                      src={professional.avatar}
                      alt={professional.name}
                      className="w-16 h-16 rounded-full object-cover cursor-pointer"
                      onClick={() => handleProfileClick(professional.professional_id)}
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-[#e0692d] cursor-pointer"
                              onClick={() => handleProfileClick(professional.professional_id)}
                            >
                              {professional.name}</h3>
                            {professional.verified && (
                              <BadgeCheck className="h-5 w-5 text-[#e0692d] ml-2" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{professional.profession}</p>
                        </div>
                        <button
                          onClick={() => onViewProfile(professional.id)}
                          className="thq-button-filled text-sm"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contacter
                        </button>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{professional.description}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-sm font-medium text-gray-900">{professional.rating}</span>
                            <span className="mx-1 text-gray-400">•</span>
                            <span className="text-sm text-gray-600">{professional.reviews} avis</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{professional.city}, {professional.region}</span>
                          </div>
                          <span className="text-sm font-medium text-[#e0692d]">{professional.prix}</span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {professional.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Top Advertisement Banner */}
              <div className="bg-gray-100 p-4 rounded-lg mb-8 text-center">
                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Publicité</p>
                  <div className="h-[90px] flex items-center justify-center border border-dashed border-gray-300">
                    <span className="text-gray-400">Espace publicitaire disponible</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Précédent</span>
                    <ChevronRight className="h-5 w-5 transform rotate-180" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? 'z-10 bg-[#e0692d] border-[#e0692d] text-white'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Suivant</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Advertisement Column */}
        <div className="lg:w-80 space-y-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
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
    </div>
  
  );
};

export default SearchProfessionals;