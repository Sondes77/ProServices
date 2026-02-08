import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { villesEtRegions } from '../components/villesRegions';
import { Search, MapPin, Filter, Star, MessageSquare, ChevronDown, ChevronUp, ChevronRight, BadgeCheck,
  Users, Link, XCircle, Send, Lock
 } from 'lucide-react';
import { Professional } from '../utils/types';
import { mapProfessionalsDataToUserModel, mapUserDataToUserModel } from '../utils/mapper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Swal from "sweetalert2";
import CustomSelect from './CustomSelect';

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
    availability: 'Tous',
  });
  const token = localStorage.getItem('token');
  const id = token ? JSON.parse(atob(token.split('.')[1])).id : null;
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
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
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [message, setMessage] = useState('');
  
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
          console.log('Professionals fetched:', mappedProfessionals);
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
          filters.availability === 'Tous' ||
          (filters.availability === item.availability)
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
  };

  const resultatsSansDoublons = Array.from(
  new Map(resultats.map(item => [item.id, item])).values()
  );
  const sponsoredProfessionals = resultatsSansDoublons.filter((pro) => pro.sponsored);
  const regularProfessionals = resultatsSansDoublons.filter((pro) => !pro.sponsored);

  const currentsponsoredProfessionals = sponsoredProfessionals.slice();
  const itemsPerPage = 10;
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
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>

              <input
                type="text"
                placeholder="Rechercher un professionnel..."
                className="
                  w-full
                  py-3 pr-4 pl-12   /* ✅ padding gauche augmenté */
                  bg-gray-50
                  border border-transparent
                  focus:ring-2 focus:ring-orange-200
                  focus:bg-white
                  rounded-2xl
                  outline-none
                  transition-all
                "
                value={motCle}
                onChange={(e) => setMotCle(e.target.value)}
              />
            </div>


            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <CustomSelect
                value={ville}
                onChange={(value: string) => {
                  setVille(value);
                  setRegion('');
                }}
                required
                name="ville"
                placeholder='-- Sélectionner une ville --'
                options={[
                  ...Object.keys(villesEtRegions).map((v) => ({
                    value: v,
                    label: v
                  }))
                ]}
              />
                  
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <CustomSelect
                value={region}
                onChange={(value: string) => {
                  setRegion(value);
                }}
                disabled={!ville}
                required
                name="region"
                placeholder='-- Sélectionner une région --'
                options={[
                  ...(ville ? villesEtRegions[ville as keyof typeof villesEtRegions].map((r: string) => ({
                    value: r,
                    label: r
                  })) : [])
                ]}
              />
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
                  <CustomSelect
                    value={String(filters.minRating)}
                    onChange={(value: string) => setFilters({ ...filters, minRating: Number(value) })}
                    options={[
                      { value: "0", label: "Toutes les notes" },
                      { value: "4", label: "4+ étoiles" },
                      { value: "4.5", label: "4.5+ étoiles" }
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <CustomSelect
                    value={filters.categories[0] || ''}
                    onChange={(value: string) => setFilters({ ...filters, categories: [value] })}
                    options={[
                      { value: '', label: 'Toutes les catégories' },
                      ...categories.map(category => ({
                        value: category,
                        label: category
                      }))
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disponibilité
                  </label>
                  <CustomSelect
                    value={filters.availability}
                    placeholder='Séctionner une disponibilité'
                    onChange={(value: string) => setFilters({ ...filters, availability: value })}
                    options={[
                      { value: "Tous", label: "Tous" },
                      { value: "Immédiat", label: "Immédiat" },
                      { value: "24h à 48h", label: "24h à 48h" },
                      { value: "Sous 1 semaine", label: "Sous 1 semaine" },
                      { value: "Plus d'une semaine", label: "Plus d'une semaine" },
                      { value: "Disponible", label: "Disponible (flexible)" },
                      { value: "Sur devis", label: "Sur devis" },
                    ]}
                  />
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
                    {id !== professional.professional_id && (
                      <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                        <button
                          onClick={() => {
                            if (token) {
                              setShowMessageModal(true);
                              setUser({ id: professional.professional_id });
                            } else {
                              setShowLoginModal(true);
                            }
                          }}
                          className="thq-button-filled text-sm"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contacter
                        </button>
                      </div>
                    )}
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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
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
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 sm:hidden">
                            {professional.availability}
                          </span>
                        </div>
                        
                        {professional && Number(id) !== Number(professional.professional_id) && (
                          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                            <button
                              onClick={() => {
                                if (token) {
                                  setShowMessageModal(true);
                                  setUser({ id: professional.professional_id });
                                } else {
                                  setShowLoginModal(true);
                                }
                              }}
                              className="thq-button-filled text-sm"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Contacter
                            </button>
                          </div>
                        )}
                      </div>

                     <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        {window.innerWidth < 640
                          ? professional.description.slice(0, 50) + (professional.description.length > 50 ? "…" : "")
                          : professional.description.slice(0, 150) + (professional.description.length > 150 ? "…" : "")
                        }
                      </p>
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
                        <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
  );
};

export default SearchProfessionals;