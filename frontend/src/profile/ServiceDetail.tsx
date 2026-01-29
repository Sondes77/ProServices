import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Tag, MessageSquare, Star } from 'lucide-react';
import { User, Service } from '../utils/types';
import { mapServicesDataToUserModel, mapUserDataToUserModel } from '../utils/mapper';

interface ServiceDetailProps {
    user2: User;
    //: Service;
}

const ServiceDetail : React.FC<ServiceDetailProps> = ({ user2 }) => {
  const { id } = useParams<{ id: string }>(); // récupère l'id de l'URL
  //const routeParams = useParams<{ id?: string }>();
  //const id = routeParams.id || user2?.id; 
  
  const [service, setService] = useState<Service | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const userMe = user?.id === user2?.id;
  console.log("routeParams.id = ",id);
  

  useEffect(() => {
    const fetchService = async () => {
      try {
        /*const token = localStorage.getItem('token');
        if (!token) {
            console.error("Aucun token trouvé dans le localStorage");
            return;
        }*/
        
        const response = await fetch(`http://localhost:5000/api/service/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          alert('Erreur lors de la récupération du service');
          return;
        }
        
        const data = await response.json();
        const service = Array.isArray(data) ? data[0] : data;
        const mapped = mapServicesDataToUserModel(service);
        setService(mapped);
        console.log("id professionnel_id = ",service.professionnel_id);
        const resp = await fetch(`http://localhost:5000/api/utilisateurId?id=${service.professionnel_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${token}`,
            },
          });
  
          if (resp.ok){
            const data = await resp.json();
            const userdata = Array.isArray(data) ? data[0] : data;
            const mapped = mapUserDataToUserModel(userdata);
            setUser(mapped);
            console.log("id profile = ",user?.id);
          } else {
            alert('Erreur lors de la récupération d\'utilisateur');
            return;
          }          
          
      } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur de connexion au serveur');
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  // Affiche un message de chargement si le service n’est pas encore chargé
  if (!service) {
    return <div className="text-center py-10">Chargement du service...</div>;
  }
  // Affiche un message de chargement si le service n’est pas encore chargé
  if (!user) {
    return <div className="text-center py-10">Chargement du service...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Bannière publicitaire */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-2">Publicité</p>
          <div className="h-[90px] flex items-center justify-center border border-dashed border-gray-300">
            <span className="text-gray-400">Espace publicitaire disponible</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-grow">
          {/* Fil d'Ariane */}
          <nav className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-gray-700">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{service.title}</span>
          </nav>

          {/* En-tête du service */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#e0692d] text-white">
                  {service.category}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                  {user.city}, {user.region}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2 text-gray-400" />
                  {service.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <Tag className="h-5 w-5 mr-2 text-gray-400" />
                  {service.price}
                </div>
              </div>

              {/* Galerie */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {service.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${service.title} - Image ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description du service</h2>
                <p className="text-gray-600 whitespace-pre-line">{service.description}</p>
              </div>
            </div>
          </div>

          {/* Informations du prestataire */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">À propos du prestataire</h2>
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{user.firstName}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{user.stats.reviewsPosted}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-600">{user.stats.reviewsPosted} avis</span>
                  </div>
                </div>
                {!userMe && (
                    <button className="ml-auto bg-[#e0692d] text-white px-6 py-2 rounded-full hover:bg-[#f07e40] transition-colors duration-200 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Contacter
                    </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite (pub) */}
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

export default ServiceDetail;
