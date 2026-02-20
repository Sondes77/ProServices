import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Tag,
  PenTool,
  Eye,
  Share2
} from 'lucide-react';
import { Service } from '../utils/types';
import ServiceForm from './ServiceForm';
import { mapServicesDataToUserModel } from '../utils/mapper';
import Swal from "sweetalert2";
import CustomSelect from './CustomSelect';
import { urlBase } from "../config.js";

interface ServicesProps {
  services: Service[];
  onAddService: () => void;
  onEditService: (serviceId: string) => void;
  onDeleteService: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ 
  services, 
  onAddService, 
  onEditService, 
  onDeleteService 
}) => {
  const navigate = useNavigate();

  const [localServices, setLocalServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'paused' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  //const [sponsored, setSponsored] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser") || "null")?.region;
 
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch(`${urlBase}/mes-services`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        Swal.fire({
          toast: true, // active le mode toast
          position: "top-end", // en haut à droite
          showConfirmButton: false, // pas de bouton OK
          timer: 1500, // durée d'affichage
          timerProgressBar: true, // barre de progression
          icon: "error",
          //title: selectedService ? "Service mis à jour" : "Service créé",
          text: "Erreur lors de la récupération des données utilisateur.",
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
        const prosData = await response.json();
        const mappedProfessionals = prosData.map((element: any) =>
          mapServicesDataToUserModel(element)
        );
        
        setLocalServices(mappedProfessionals);
 
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

  useEffect(() => {
    fetchUserData();
  }, []);
  
  
  const filteredServices = localServices.filter(service => {
    const title = service.title || '';
    const description = service.description || '';
    const status = service.status || '';
    const sponsored = !!(service.verified && service.sponsored);

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesFilter = filter === 'all' || status === filter;
  
    return matchesSearch && matchesFilter;
  });
  
    const deleteServiceFromAPI = async (serviceId: string) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token manquant');
  
        const response = await fetch(`${urlBase}/services/${serviceId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok)
        {
           // Met à jour la liste locale
          setLocalServices(prev => prev.filter(service => service.id !== serviceId));
          Swal.fire({
            toast: true, // active le mode toast
            position: "top-end", // en haut à droite
            showConfirmButton: false, // pas de bouton OK
            timer: 1500, // durée d'affichage
            timerProgressBar: true, // barre de progression
            icon: "success",
            //title: selectedService ? "Service mis à jour" : "Service créé",
            text: "Service supprimé avec succès.",
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
         
        }else if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Erreur lors de la suppression');
        }
       
    } catch (error: any) {
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
      //alert(error.message || 'Erreur inconnue');
      console.error(error);
    }
  };

  const handleDeleteClick = (serviceId: string) => {
    setServiceToDelete(serviceId);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = () => {
    if (serviceToDelete) {
      deleteServiceFromAPI(serviceToDelete);
      onDeleteService(serviceToDelete);
      setShowDeleteModal(false);
      setServiceToDelete(null);
    }
  };

  const handleEditClick = (service: Service) => {
    setSelectedService(service);
    setShowServiceForm(true);
  };

  const handleAddClick = () => {
    setSelectedService(null);
    setShowServiceForm(true);
  };

  const handleServiceSubmit = async (serviceData: Partial<Service>) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
  
    try {
      const url = selectedService
        ? `${urlBase}/services/${selectedService.id}` // Update
        : `${urlBase}/service`; // Create
  
      const method = selectedService ? 'PUT' : 'POST';
     
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
      });
  
      const errorData = await response.json();

      if (!errorData.success && method === "POST") {
        Swal.fire("Attention", errorData.message, "warning");
        return;
      }

      if (!response.ok) {
        Swal.fire("Erreur", "Une erreur est survenue", "error");
        return;
      }
  
      //const updatedService = await response.json();
       if(errorData.success && method === "PUT"){
         Swal.fire({
          toast: true, // active le mode toast
          position: "top-end", // en haut à droite
          showConfirmButton: false, // pas de bouton OK
          timer: 1500, // durée d'affichage
          timerProgressBar: true, // barre de progression
          icon: "success",
          //title: selectedService ? "Service mis à jour" : "Service créé",
          text: selectedService
            ? "Le service a été mis à jour avec succès."
            : "Le service a été créé avec succès.",
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
      // Optionnel : mets à jour localement l’état
      await fetchUserData();
      
    } catch (error: any) {
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "warning",
        //title: selectedService ? "Service mis à jour" : "Service créé",
        text: "Erreur réseau ",
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
  
    setShowServiceForm(false);
    setSelectedService(null);
  };
  
  const handleServiceClick = (categorie:string, metier:string, ville: string, serviceId: string) => {
    navigate(`/service/${categorie.toLowerCase()}/${metier.toLowerCase()}/${ville.toLowerCase()}/${serviceId}`);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  const isArabic = (text: string) => {
    return /[\u0600-\u06FF]/.test(text);
  };
  const getStatusBadge = (status: string, sponsored: boolean) => {
    //setSponsored(service.verified && service.sponsored ? true : false);
    switch (status) {
      case 'active':
        return (
          <>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Actif
            </span>

            {sponsored && (
              <span className="inline-flex items-center px-2.5 py-1 ml-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                <CheckCircle size={12} className="mr-1" />
                Sponsorisé
              </span>
            )}
          </>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={12} className="mr-1" />
            En pause
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle size={12} className="mr-1" />
            Archivé
          </span>
        );
      default:
        return null;
    }
  };
  // Fonction de partage dynamique
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#e0692d] p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Mes services</h2>
              <p className="text-white text-opacity-80 text-sm">Gérez vos services proposés</p>
            </div>
            <button
              onClick={handleAddClick}
              className="mt-3 sm:mt-0 bg-white text-[#e0692d] px-4 py-2 rounded-md shadow hover:bg-gray-100 transition-colors duration-200 flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Ajouter un service
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Rechercher un service..."
                className="w-full
                  py-3 pr-4 pl-12 
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
            
            <div className="relative sm:w-60">
              
              <CustomSelect
                name="filtre"
                value={filter}
                onChange={(value) => setFilter(value as 'all' | 'active' | 'paused' | 'archived')}
                options={[
                  { value: 'all', label: 'Tous les statuts' },
                  { value: 'active', label: 'Actifs' },
                  { value: 'paused', label: 'En pause' },
                  { value: 'archived', label: 'Archivés' }
                ]}
              />
               
            </div>
          </div>

          {/* Services List */}
          <div className="space-y-4">
            {filteredServices.length > 0 ? (
              filteredServices.map(service => {
                const sponsored = !!(service.verified && service.sponsored);
                const handleShare = async (e: React.MouseEvent) => {
                  e.stopPropagation();

                  const url = `${window.location.origin}/service/${service.category}/${service.metier}/${user}/${service.id}`;

                  const shareData = {
                    title: service.title,
                    text: `Découvrez ce service sur ServicePro : ${service.title}`,
                    url
                  };

                  try {
                    // 📱 Mobile share native
                    if (navigator.share) {
                      await navigator.share(shareData);
                      return;
                    }

                    // 💻 Desktop fallback → copie + popup choix
                    await navigator.clipboard.writeText(url);

                    Swal.fire({
                      title: "Lien copié",
                      text: "Choisissez où partager",
                      icon: "success",
                      showCancelButton: true,
                      confirmButtonText: "WhatsApp",
                      cancelButtonText: "LinkedIn"
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.open(`https://wa.me/?text=${encodeURIComponent(url)}`);
                      } else {
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
                      }
                    });

                  } catch (err) {
                    Swal.fire("Erreur", "Impossible de partager", "error");
                  }
                };
                return (
                  <div key={service.id} className="p-6 bg-white border border-gray-100 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      
                      <div className="flex-grow">
                        <div className="flex items-center mb-2 flex-wrap gap-2">
                          <h3 className="text-xl font-bold text-gray-900 leading-tight">{service.title}</h3>
                          {getStatusBadge(service.status, sponsored)}
                        </div>
                        <div className="flex flex-wrap gap-4 py-6">
                          <p
                            dir={isArabic(service.description) ? "rtl" : "ltr"}
                            className={`text-gray-500 text-sm line-clamp-2 leading-relaxed ${
                              isArabic(service.description) ? "text-right" : "text-left"
                            }`}
                          >
                            {service.description.length > 150
                              ? service.description.slice(0, 150) + "..."
                              : service.description}
                          </p> 
                        </div>
                        
                        <div className="flex flex-wrap gap-1 text-xs text-gray-400 font-medium">
                          <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
                            <Tag size={14} className="mr-1.5 text-[#e0692d]" />
                            {service.category}
                          </div>
                          {service.price && (
                            <div className="flex items-center bg-orange-50 text-[#e0692d] px-3 py-1.5 rounded-lg">
                              <span className="font-bold">{service.price} DT</span>
                            </div>
                          )}
                          <div className="flex items-center px-3 py-1.5">
                            <Calendar size={14} className="mr-1.5" />
                            Créé le {formatDate(service.createdAt)}
                          </div>
                          <div className="flex items-center px-3 py-1.5">
                            <Calendar size={14} className="mr-1.5" />
                            Modifié le {formatDate(service.updatedAt)}
                          </div>
                        </div>
                      </div>
                      
                      {/* ACTIONS BUTTONS */}
                      <div className="flex md:flex-col gap-3 shrink-0">
                        {/* Bouton Voir le service */}
                        {service.status === "active" && (
                          <button
                            onClick={() => handleServiceClick(service.category, service.metier,user,service.id)}
                            className="flex-1 md:w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all"
                          >
                            <Eye size={16} /> <span>Aperçu</span>
                          </button>
                        )}
                        <div className="flex gap-2">
                          {/* Bouton Partager */}
                          <button
                            onClick={handleShare}
                            className="p-2.5 bg-orange-100 text-[#e0692d] rounded-xl hover:bg-orange-200 transition-colors flex-1 md:flex-none justify-center flex items-center"
                            title="Partager sur les réseaux"
                          >
                            <Share2 size={18} />
                          </button>

                          {/* Bouton Éditer */}
                          <button
                            onClick={() => handleEditClick(service)}
                            className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                          >
                            <Edit size={18} />
                          </button>

                          {/* Bouton Supprimer */}
                          <button
                            onClick={() => handleDeleteClick(service.id)}
                            className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Tag size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun service trouvé</h3>
                <p className="text-gray-500">
                  {searchQuery || filter !== 'all' ? 
                    "Aucun service ne correspond à vos critères" : 
                    "Vous n'avez pas encore créé de services"}
                </p>
                {(!searchQuery && filter === 'all') && (
                  <button
                    onClick={handleAddClick}
                    className="mt-4 bg-[#e0692d] text-white px-4 py-2 rounded-md shadow hover:bg-[#f07e40] transition-colors duration-200 inline-flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Ajouter votre premier service
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Form Modal */}
      {showServiceForm && (
        <ServiceForm
          service={selectedService || undefined}
          onSubmit={handleServiceSubmit}
          onCancel={() => {
            setShowServiceForm(false);
            setSelectedService(null);
          }}
        />
      )}
    </>
  );
};

export default Services;