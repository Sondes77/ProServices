import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { villesEtRegions } from '../components/villesRegions';
import { Search, MapPin, Filter, Star, MessageSquare, ChevronDown, ChevronUp, ChevronRight, BadgeCheck,
  Users, Link, XCircle, Send, Lock,
  LayoutGrid,
  Megaphone,
  ArrowRight,
  Info,
  Calendar,
  X
 } from 'lucide-react';
import { Professional } from '../utils/types';
import { mapProfessionalsDataToUserModel, mapUserDataToUserModel } from '../utils/mapper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Swal from "sweetalert2";
import CustomSelect from './CustomSelect';
import { Categorie, Metier } from '../components/categoryMetier';
import { normalize, expandQuery, matchesQuery } from "../utils/searchEngine";

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
  const [motCle, setMotCle] = useState(query.get('q') || '');
  const cFromQuery = query.get('c') as Categorie | null;
  const [selectedCategorie, setSelectedCategorie] = useState<Categorie | ''>(cFromQuery ?? '');
  const [selectedMetier, setSelectedMetier] = useState(query.get('m') || '');
  const words = useMemo(() => expandQuery(motCle), [motCle]);
  const [hasMetierMatch, setHasMetierMatch] = useState(false);

  const metierDisponibles =
  selectedCategorie && Metier[selectedCategorie]
    ? Metier[selectedCategorie]
    : [];

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

  /*useEffect(() => {
    if (!professionals.length) return;
    if (professionals.length) {
      const filtres = professionals.filter((item) =>
        (!ville || item.city.toLowerCase().includes(ville.toLowerCase())) &&
        (!words || item.profession.toLowerCase().includes(motCle.toLowerCase()) || item.description.toLowerCase().includes(motCle.toLowerCase()) || item.name.toLowerCase().includes(motCle.toLowerCase())) &&
        (!region || item.region.toLowerCase().includes(region.toLowerCase())) &&
        (filters.minRating === 0 || item.rating >= filters.minRating) &&
        (
          (!selectedCategorie.toLowerCase() || item.profession.toLowerCase() === selectedCategorie.toLowerCase()) &&
        (!selectedMetier.toLowerCase() || item.metier.toLowerCase() === selectedMetier.toLowerCase()) &&
          !item.metier.includes("Toutes les catégories")
        )&&
        (
          filters.availability === 'Tous' ||
          (filters.availability === item.availability)
        )
      );
     
      setResultats(filtres);
    }
  }, [professionals, ville, region, motCle, filters.minRating, filters.availability, selectedCategorie, selectedMetier]);*/

  useEffect(() => {
    if (!professionals.length) return;

    let metierMatchFound = false;

    const filtres = professionals.filter((item) => {

      const matchesVille =
        !ville || item.city.toLowerCase().includes(ville.toLowerCase());

      const matchesRegion =
        !region || item.region.toLowerCase().includes(region.toLowerCase());

      const matchesRating =
        filters.minRating === 0 || item.rating >= filters.minRating;

      const matchesCategorie =
        !selectedCategorie ||
        item.profession.toLowerCase() === selectedCategorie.toLowerCase();

      const matchesMetier =
        !selectedMetier ||
        item.metier.toLowerCase() === selectedMetier.toLowerCase();

        const matchesAvailability =
        filters.availability === "Tous" ||
        filters.availability === item.availability;

      const matchesKeyword =
        !words.length || matchesQuery(item, words);

      const metierQueryMatch =
        motCle.length>0 && words.some(w => normalize(item.metier).includes(w));
    
      if (words.length>0 && (metierQueryMatch || selectedMetier || selectedCategorie)) {
        metierMatchFound = true;
      }

      return (
        matchesVille &&
        matchesRegion &&
        matchesRating &&
        matchesCategorie &&
        matchesMetier &&
        matchesAvailability &&
        matchesKeyword &&
        !item.metier.includes("Toutes les catégories")
      );
    });

    setResultats(filtres);

    setHasMetierMatch(prev =>
      prev !== metierMatchFound ? metierMatchFound : prev
    );

  }, [
    professionals,
    ville,
    region,
    words,
    filters.minRating,
    filters.availability,
    selectedCategorie,
    selectedMetier
  ]);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (motCle) params.append('q', motCle);
      if (ville) params.append('ville', ville);
      if (region) params.append('region', region);
      if (selectedCategorie) params.append('c', selectedCategorie);
      if (selectedMetier) params.append('m', selectedMetier);
      navigate(`/search?${params.toString()}`);
    };
  
  const handleServiceClick = (categorie:string, metier:string, ville: string, serviceId: string) => {
    navigate(`/service/${categorie.toLowerCase()}/${metier.toLowerCase()}/${ville.toLowerCase()}/${serviceId}`);
  };
  const handleClean = (e: React.FormEvent) => {
    e.preventDefault();
    setMotCle('');
    setVille('');
    setRegion('');
    setSelectedCategorie('');
    setSelectedMetier('');
    setFilters({
      minRating: 0,
      maxPrice: '',
      categories: [] as string[],
      availability: 'Tous',
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileClick = (metier: string, region: string, nom: string, professionalId: string) => {
    navigate(`/pro/${slugify(metier)}/${slugify(region)}/${slugify(nom)}/${professionalId}`);
  };
  
  const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
    
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
  const isArabic = (text: string) => {
    return /[\u0600-\u06FF]/.test(text);
  };
  // --- COMPOSANT PUB RÉUTILISABLE ---
  const AdBanner = ({ type }: { type: 'horizontal' | 'sidebar' | 'inline' }) => {
    const styles = {
      horizontal: "w-full h-[120px] mb-8 bg-gradient-to-r from-slate-50 to-slate-100 border border-dashed border-slate-300 rounded-[24px] flex flex-col items-center justify-center group cursor-pointer hover:border-orange-300 transition-colors",
      sidebar: "w-full h-[300px] bg-slate-50 border border-dashed border-slate-300 rounded-[24px] flex flex-col items-center justify-center p-6 text-center group cursor-pointer hover:border-orange-300 transition-colors",
      inline: "w-full p-6 bg-orange-50/30 border border-dashed border-orange-200 rounded-[24px] flex items-center justify-between mb-4"
    };

    return (
      <div className={styles[type]}>
        <div className="bg-white p-2 rounded-full mb-2 shadow-sm group-hover:scale-110 transition-transform">
          <Megaphone size={18} className="text-slate-400 group-hover:text-[#e0692d]" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-1">Espace Publicitaire</span>
        <p className="text-xs text-slate-500 font-medium">Annoncez votre service ici</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fbfc] mx-auto py-8">
      {/* 1. TOP AD BANNER (FULL WIDTH) */}
      <div className="bg-white pt-8 -mt-8">
        <div className="max-w-7xl mx-auto p-6">
          <AdBanner type="horizontal" />
        </div>
      </div>

      {/* HEADER SEO */}
      <section className="px-4 -mt-8 bg-white border-b border-slate-100 pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Trouvez le <span className="text-[#e0692d]">professionnel</span> idéal
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Découvrez les meilleurs experts en Tunisie pour tous vos besoins de travaux et services.
          </p>
        </div>
      </section>

      {/* Search Form */}
      <div className="max-w-7xl mx-auto px-4 -mt-20">
        <div className="bg-white rounded-[22px] shadow-xl p-4 shadow-slate-200/50 p-3 md:p-4 mb-10 border border-slate-100">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
              <div className="md:col-span-4 relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 sm:top-1/4 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Quel métier ou service cherchez-vous ?"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-[20px] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  value={motCle}
                  onChange={(e) => setMotCle(e.target.value)}
                />
              </div>
              <div className="md:col-span-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/*<MapPin className="h-5 w-5 text-gray-400" />*/}
                </div>
                <CustomSelect
                  value={ville}
                  onChange={(value: string) => {
                    setVille(value);
                    setRegion('');
                  }}
                  //required
                  name="mappin"
                  placeholder='Ville'
                  options={[
                    ...Object.keys(villesEtRegions).map((v) => ({
                      value: v,
                      label: v
                    }))
                  ]}
                />
              </div>
              <div className="md:col-span-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/*<MapPin className="h-5 w-5 text-gray-400" />*/}
                </div>
                <CustomSelect
                  value={region}
                  onChange={(value: string) => {
                    setRegion(value);
                  }}
                  disabled={!ville}
                  //required
                  name="mappin"
                  placeholder='Région'
                  options={[
                    ...(ville ? villesEtRegions[ville as keyof typeof villesEtRegions].map((r: string) => ({
                      value: r,
                      label: r
                    })) : [])
                  ]}
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <button type="submit" className="h-[52px] bg-[#e0692d] hover:bg-[#c45a25] text-white px-8 py-3 rounded-[20px] font-bold transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2">
                  <Search size={18} />
                  <span>Trouver</span>
                </button>
                <button type="button" onClick={handleClean} className="h-[52px] bg-white hover:bg-slate-100 text-[#e0692d] border border-[#e0692d] px-8 py-3 rounded-[20px] font-bold transition-all shadow flex items-center justify-center gap-2">
                  <span>Réinitialisé</span>
                </button>
              </div>
            </div>      
            <div className="mt-3 px-2">
              <button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 text-sm font-semibold text-[#e0692d] hover:text-slate-600 transition-colors"
              >
                <Filter size={16} />
                Filtres avancés
                {showAdvancedFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showAdvancedFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-1 border-t border-slate-50 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-2">Catégorie</label>
                    <CustomSelect 
                      name="category"
                      value={selectedCategorie} 
                      onChange={(v) => { setSelectedCategorie(v as Categorie); setSelectedMetier(''); }}
                      options={Object.keys(Metier).map(c => ({ value: c, label: c }))} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-2">Métier précis</label>
                    <CustomSelect
                      name="metier" 
                      value={selectedMetier} 
                      disabled={!selectedCategorie}
                      onChange={setSelectedMetier}
                      options={selectedCategorie ? Metier[selectedCategorie].map(m => ({ value: m, label: m })) : []} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-2">Disponibilité</label>
                    <CustomSelect 
                      name="disponibility"
                      value={filters.availability} 
                      onChange={(v) => setFilters({...filters, availability: v})}
                      options={["Tous", "Immédiat", "24h à 48h", "Disponible"].map(a => ({ value: a, label: a }))} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-2">Note minimum</label>
                    <div className="flex gap-2">
                      {[0, 3, 4, 4.5].map((rate) => (
                        <button 
                          key={rate}
                          onClick={() => setFilters({...filters, minRating: rate})}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${filters.minRating === rate ? 'bg-orange-100 text-[#e0692d] border border-orange-200' : 'bg-slate-50 text-slate-500 border border-transparent hover:bg-slate-100'}`}
                        >
                          {rate === 0 ? 'Toutes' : `${rate}+`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-4 px-4">
        {/* Sponsored Professionals Carousel */}
        {sponsoredProfessionals.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 ml-4 bg-orange-100 rounded-lg text-[#e0692d]">
                <Star size={20} fill="currentColor" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Services Sponsorisés</h2>
            </div>
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
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
                  <div className="bg-gradient-to-br from-white to-orange-50 rounded-[24px] transition-all group shadow-md p-6 border border-orange-100 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-start">
                      <img
                        src={professional.avatar}
                        alt={professional.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#e0692d] cursor-pointer group-hover:scale-105 transition-transform"
                        onClick={() => handleProfileClick(professional.metier, professional.region, professional.name, professional.professional_id)}
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-[#e0692d] cursor-pointer"
                            onClick={() => handleProfileClick(professional.metier, professional.region, professional.name, professional.professional_id)}
                          >
                            {professional.name}
                          </h3>
                          {professional.verified && (
                            <BadgeCheck className="h-5 w-5 text-[#e0692d] ml-2" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#e0692d] font-black uppercase tracking-widest">{professional.metier}</p>
                        <div className="flex items-center mt-1">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="ml-1 text-gray-400 flex items-center gap-1 text-xs font-semibold text-gray-500">{professional.city}, {professional.region}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p
                        dir={isArabic(professional.description) ? "rtl" : "ltr"}
                        className={`text-sm text-gray-600 ${
                          isArabic(professional.description) ? "text-right" : "text-left"
                        }`}
                      >
                        {professional.description.length > 50
                          ? professional.description.slice(0, 50) + "..."
                          : professional.description}
                      </p>
                     
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        {professional.reviews > 0 && (
                          <>
                            <Star size={14} className="text-yellow-400 mr-1 fill-yellow-400" />
                            <span className="text-xs font-bold  text-slate-700">{professional.rating}</span>
                            <span className="mx-1 text-gray-400">•</span>
                            <span className="text-xs text-slate-700">{professional.reviews} avis</span>
                          </>
                        )}
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
                              onClick={() => handleServiceClick(professional.profession, professional.metier, professional.region ,professional.id)}
                              className="bg-[#e0692d] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors flex items-center gap-2"
                            >
                              Voir Service <ArrowRight size={12} />
                            </button>
                          {/*<button
                            onClick={() => {
                              if (token) {
                                setShowMessageModal(true);
                                setUser({ id: professional.professional_id });
                              } else {
                                setShowLoginModal(true);
                              }
                            }}
                            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#e0692d] transition-colors flex items-center gap-2"
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Contacter
                          </button>*/}
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 pt-4 px-8 lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="lg:flex-grow">
          {/* Regular Professionals */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Info size={20} className="text-slate-400" />
              {resultats.length} résultats trouvés
            </h2>
            <div className="space-y-4">
              {currentProfessionals.map(professional => (
                <div
                  key={professional.id}
                  className="bg-white rounded-[24px] shadow-md p-6 px-8 hover:shadow-lg transition-shadow duration-200"
                >
                   {/* ===== LIGNE 1 — FIXE TOUS ÉCRANS ===== */}
                    <div className="flex items-start gap-4">

                      {/* IMAGE */}
                      <img
                        src={professional.avatar}
                        alt={professional.name}
                        className="w-16 h-16 rounded-full object-cover cursor-pointer shrink-0"
                        onClick={() => handleProfileClick(professional.metier, professional.region, professional.name, professional.professional_id)}
                      />
                      {/* NOM + CATEGORIE + PRIX */}
                      <div className="flex-1 flex justify-between gap-3">

                        <div className="min-w-0">
                          <div className="flex items-center">
                            <h3
                              className="text-lg font-semibold text-gray-900 hover:text-[#e0692d] cursor-pointer truncate"
                              onClick={() => handleProfileClick(professional.metier, professional.region, professional.name, professional.professional_id)}
                            >
                              {professional.name}
                            </h3>

                            {professional.verified && (
                              <BadgeCheck className="h-5 w-5 text-[#e0692d] ml-2 shrink-0" />
                            )}
                          </div>

                          <div className="flex items-center py-1">
                            <p
                              className={`
                                text-[11px] font-black uppercase tracking-widest text-[#e0692d] 
                                ${!hasMetierMatch ? "cursor-pointer hover:text-orange-400" : "cursor-default"}
                              `}
                              onClick={() => {
                                const param = hasMetierMatch ? "m" : "c";
                                const value = hasMetierMatch
                                  ? professional.metier
                                  : professional.profession;

                                window.location.href = `/search?${param}=${encodeURIComponent(value)}`;
                              }}
                            >
                              {hasMetierMatch ? professional.metier : professional.profession}
                            </p>
                            <span className="mx-1 text-gray-400 hidden sm:inline-flex">•</span>
                            <span className="flex items-center gap-1 text-gray-500 text-xs font-medium hidden sm:inline-flex">
                              <MapPin size={14} className="text-[#e0692d]" /> {professional.city}, {professional.region}
                            </span>
                          </div>
                           <span className="inline-flex items-center -ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 sm:hidden">
                            {professional.availability}
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            À partir de
                          </p>
                          <p className="text-lg font-black text-slate-900">
                            {professional.prix}
                            <span className="text-xs font-normal"> DT</span>
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* ===== LIGNE 2 — FULL WIDTH MOBILE ===== */}
                    <div className="mt-3 space-y-3">
                      <h3 onClick= {() => handleServiceClick(professional.profession, professional.metier, professional.region, professional.id)}
                       dir={isArabic(professional.titre) ? "rtl" : "ltr"}
                        className={`text-base sm:text-lg font-semibold text-slate-800 cursor-pointer transition-colors hover:text-[#e0692d] ${
                          isArabic(professional.titre) ? "text-right" : "text-left"
                        }`} >{professional.titre}</h3>        
                      {/* DESCRIPTION */}
                      <p
                        dir={isArabic(professional.description) ? "rtl" : "ltr"}
                        className={`text-l py-2 text-gray-600 ${
                          isArabic(professional.description) ? "text-right" : "text-left"
                        }`}
                      >
                        {professional.description.length > 150
                          ? professional.description.slice(0, 150) + "..."
                          : professional.description}
                      </p>    
                      {/* META */}
                      <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">

                        {/* LEFT INFOS */}
                        <div className="flex flex-wrap items-center gap-3 text-slate-500">

                          <div className="sm:hidden flex items-center gap-1 bg-slate-50 px-2 py-1.5 rounded-lg">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-bold text-slate-700">
                              {professional.rating}
                            </span>
                          </div>

                          <div className="hidden sm:inline-flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-bold text-slate-700">{professional.rating}</span>
                            <span className="text-[10px]">({professional.reviews} avis)</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-medium sm:hidden">
                            <MapPin size={14} className="text-[#e0692d]" /> {professional.city}, {professional.region}
                          </div>
                          <div className="flex items-center gap-1 text-xs font-medium hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Calendar size={14} className="text-[#e0692d]" /> {professional.availability}
                          </div>

                        </div>

                        {/* RIGHT BUTTON */}
                        {professional && Number(id) !== Number(professional.professional_id) && (
                          <button
                            onClick={() => {
                              if (token) {
                                setShowMessageModal(true);
                                setUser({ id: professional.professional_id });
                              } else {
                                setShowLoginModal(true);
                              }
                            }}
                           /*onClick={() =>handleServiceClick(professional.profession, professional.metier, professional.region ,professional.id)}
                              if (hasMetierMatch) {
                                navigate(`/service/${professional.id}`);
                              } else {
                                handleProfileClick(professional.metier, professional.region, professional.name, professional.professional_id)}
                              }
                            }}*/
                            className="bg-[#e0692d] text-white px-3 sm:px-4 py-2 rounded-xl text-xs font-bold 
                                      hover:bg-slate-900 transition-colors flex items-center gap-2 shrink-0"
                          >
                            {/*Voir <span className="hidden sm:inline">Service</span>*/} <MessageSquare size={12}/>
                            <span className="hidden sm:inline">Contacter</span>
                          </button>
                        )}

                      </div>
                      
                    </div>
                </div>
                
              ))}
              
              {/* Top Advertisement Banner */}
              <div className="bg-gray-100 p-4 hidden lg:block rounded-[24px] mb-8 text-center">
                <div className="bg-white p-4 rounded-xl shadow-sm">
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
            <div className="bg-white hidden lg:block p-4 rounded-[24px] shadow-md">
              <p className="text-sm text-gray-500 mb-2">Publicité</p>
              <div className="h-[600px] flex items-center justify-center border border-dashed border-gray-300">
                <span className="text-gray-400">Espace publicitaire disponible</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-[24px] shadow-md">
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