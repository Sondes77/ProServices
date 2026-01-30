import React, { useState, useEffect } from 'react';
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
  PenTool
} from 'lucide-react';
import { Service } from '../utils/types';
import ServiceForm from './ServiceForm';
import { mapServicesDataToUserModel } from '../utils/mapper';
import Swal from "sweetalert2";

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

  const [localServices, setLocalServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'paused' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  //const [sponsored, setSponsored] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Aucun token trouvé dans le localStorage");
        return;
      }
      const response = await fetch(`http://localhost:5000/api/mes-services`, {
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
        //alert('Erreur lors de la récupération des données utilisateur');
        return;
      }
        const prosData = await response.json();
        const mappedProfessionals = prosData.map((element: any) =>
          mapServicesDataToUserModel(element)
        );
        
        setLocalServices(mappedProfessionals);
      

      //alert(`Nombre de professionnels : ${localServices.length}`);
    } catch (error) {
      console.error('Erreur réseau :', error);
      //alert('Erreur de connexion au serveur');
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

    console.log ("prosData = ", localServices);
    console.log ("status = ", status );
    console.log ("sponsored = ", sponsored );
    
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
  
        const response = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
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
      alert(error.message || 'Erreur inconnue');
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
      // Optionnel : mets à jour localement l’état
      await fetchUserData();
      
    } catch (error: any) {
      console.error(error);
      //alert(error.message || 'Erreur réseau');
    }
  
    setShowServiceForm(false);
    setSelectedService(null);
  };
  
  
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e0692d] focus:border-transparent transition-colors duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative sm:w-60">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Filter size={16} />
              </div>
              <select
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e0692d] focus:border-transparent transition-colors duration-200 bg-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'paused' | 'archived')}
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actifs</option>
                <option value="paused">En pause</option>
                <option value="archived">Archivés</option>
              </select>
            </div>
          </div>
          
          {/* Services List */}
          <div className="space-y-4">
            {filteredServices.length > 0 ? (
              filteredServices.map(service => {
                const sponsored = !!(service.verified && service.sponsored);
                return (
                  <div key={service.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 mr-3">{service.title}</h3>
                          {getStatusBadge(service.status, sponsored)}
                        </div>
                        
                        <p className="text-gray-600 mb-3">{service.description}</p>
                        
                        <div className="flex flex-wrap gap-3 mb-3">
                          <div className="flex items-center text-sm text-gray-500">
                            <Tag size={14} className="mr-1" />
                            {service.category}
                          </div>
                          {service.price && (
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="font-medium text-[#e0692d]">{service.price}</span>
                            </div>
                          )}
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            Créé le {formatDate(service.createdAt)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <PenTool size={14} className="mr-1" />
                            Modifié le {formatDate(service.updatedAt)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-row md:flex-col space-x-3 md:space-x-2 md:space-y-2 mt-3 md:mt-0">
                        <button
                          onClick={() => handleEditClick(service)}
                          className="flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(service.id)}
                          className="flex items-center justify-center p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
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