// Description: ProfileOverview component for displaying user profile information
import React, { useRef, useState, useEffect } from 'react';
import { Edit, MessageSquare, Star, Briefcase } from 'lucide-react';
import { User } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

interface ProfileOverviewProps {
  user: User;
  onEditProfile: () => void;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ user, onEditProfile }) => {
  
  const defaultAvatar = '../img/ServicePro_Avatar.png'; // accessible via le dossier public
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || defaultAvatar); // local preview
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
 
  useEffect(() => {
    if(!token)
    {
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
  }, [navigate]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="bg-[#e0692d] p-6 relative">
        <div className="absolute top-4 right-4">
          <button 
            onClick={onEditProfile}
            className="bg-white text-[#e0692d] p-2 rounded-full shadow hover:bg-gray-100 transition-colors duration-200"
          >
            <Edit size={18} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.fullName} 
              id="avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            {/*<span className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>*/}
          </div>
          <div className="md:ml-6 text-center md:text-left lg:text-left">
            <h1 className="text-2xl font-bold text-white">{user.fullName}</h1>
            <p className="text-white opacity-90">
              {user.role === 'professional' ? 'Professionnel' : 'Utilisateur'} • {user.city}, {user.region}
            </p>
            <p className="text-white opacity-75 text-sm">
              Membre depuis {new Date(user.memberSince).toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long'
              })}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center transition-transform duration-300 hover:transform hover:scale-105">
            <div className="bg-[#f07e40] text-white p-3 rounded-full mb-2">
              <MessageSquare size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{user.stats.messagesSent}</span>
            <span className="text-gray-600 text-sm">Messages envoyés</span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center transition-transform duration-300 hover:transform hover:scale-105">
            <div className="bg-[#f07e40] text-white p-3 rounded-full mb-2">
              <Star size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{user.stats.reviewsPosted}</span>
            <span className="text-gray-600 text-sm">Avis postés</span>
          </div>
          
          {user.role === 'professional' && user.stats.servicesPublished && (
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-[#f07e40] text-white p-3 rounded-full mb-2">
                <Briefcase size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-800">{user.stats.servicesPublished}</span>
              <span className="text-gray-600 text-sm">Services actives</span>
            </div>
          )}
        </div>
        
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">À propos</h2>
          {user.role === 'professional' ? (
            <p className="text-gray-600">{user.apropos}</p>
          ) : (
            <p className="text-gray-600">
              Utilisateur actif sur Profinder, à la recherche de professionnels qualifiés pour divers travaux.
              Basé à {user.city}, {user.region}.
            </p>
          )}
        </div>
        
        <div className="mt-6">
          <button 
            onClick={onEditProfile}
            className="w-full thq-button-filled flex items-center justify-center"
          >
            <Edit size={16} />
            <span>Modifier le profil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;