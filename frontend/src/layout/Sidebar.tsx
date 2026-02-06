// Sidebar.tsx
import React, { useRef, useState, useEffect } from 'react';
import { User, Home, Settings, Lock, MessageSquare, Star, Briefcase, LogOut, Shield, Eye, Camera, FileText } from 'lucide-react';
import { User as UserType } from '../utils/types';
import { mapUserDataToUserModel } from '../utils/mapper';
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: UserType;
  onViewPublicProfile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  user,
  onViewPublicProfile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState(false);
  const defaultAvatar = '../img/ServicePro_Avatar.png'; // accessible via le dossier public
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || defaultAvatar); // local preview
  const location = useLocation();
  const navigate = useNavigate();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
    
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("Aucun userId trouvé");
        return;
      }

      // Prévisualisation immédiate
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    
      try {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await fetch('http://localhost:5000/api/upload-avatar', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
                   
          // Faire une requête pour obtenir l'utilisateur à partir de l'email
          const userRes = await fetch(`http://localhost:5000/api/utilisateurId?id=${encodeURIComponent(data.userId)}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const userData = await userRes.json();
      
          if (userRes.ok) {
            //console.log("Données utilisateur récupérées : ", userData);
            //localStorage.setItem('token', token);
            const user = mapUserDataToUserModel(userData);
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Mettre à jour l'interface ou effectuer la redirection
            // Par exemple, rediriger vers le dashboard
            window.location.reload();
          } else {
            alert("Erreur lors de la récupération des données utilisateur");
          }
        }
        else {
          throw new Error('Erreur lors de l\'upload');
        }

        // Optionnel : message de succès
        //console.log('Upload réussi');
      } catch (error) {
        console.error('Erreur upload avatar:', error);
        // Optionnel : afficher un message d'erreur à l'utilisateur
        alert('Erreur lors de l’envoi de l’image');
      }
  };

  const handleLogout = () => {
    // Supprimer les données utilisateur
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  
    // Redirection sans possibilité de revenir en arrière
    window.location.replace('/connexion');
    window.history.pushState(null, '', '/connexion');
    window.onpopstate = function () {
      window.location.replace('/connexion');
    };
  };
  const navigationItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: <Home size={20} /> },
    { id: 'personal-info', label: 'Informations personnelles', icon: <User size={20} /> },
    { id: 'privacy', label: 'Confidentialité', icon: <Shield size={20} /> },
    { id: 'security', label: 'Mot de passe & sécurité', icon: <Lock size={20} /> },
    { id: 'messages', label: 'Historique des messages', icon: <MessageSquare size={20} /> },
    { id: 'reviews', label: 'Avis et évaluations', icon: <Star size={20} /> },
    
  ];

  if (user.role === 'professional') {
    navigationItems.push({ id: 'services', label: 'Mes services', icon: <Briefcase size={20} /> });
    navigationItems.push({ id: 'quotes', label: 'Gestion des devis', icon: <FileText size={20} /> });
    //navigationItems.push({ id: 'stats', label: 'Statistiques', icon: <Shield size={20} /> });
  } else if (user.role === 'user') {
    navigationItems.push({ id: 'quotes', label: 'Mes demandes de devis', icon: <FileText size={20} /> });
  }



  useEffect(() => {

    if (location.pathname === "/settings") {
      setActiveSection("privacy");
    }

    if (location.pathname === "/notifications") {
      setActiveSection("notifications");
    }

    if (location.pathname === "/mon-profile") {
      setActiveSection("overview");
    }

    if (location.pathname === "/messages" || location.pathname.startsWith("/messages/")) {
      setActiveSection("messages");
    }

    if (!location.pathname.startsWith("/messages/")) {
      navigate('/dashboard', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    
    <div className="h-full flex flex-col w-20 md:w-64">
      {/* User Profile Section */}
      <div className="md:p-6 md:mt-4  flex flex-col items-center border-b border-gray-200">
        <div 
          className="relative group w-20 h-20"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img 
            src={avatarPreview} 
            alt={user.fullName}
            id="user-avatar" 
            className="hidden md:flex w-20 h-20 rounded-full object-cover border-2 border-[#e0692d]"
          />
          <span className="hidden md:flex absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>

          {/* Overlay appareil photo */}
          {hovered && (
            <div 
              className="hidden md:flex absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="text-white w-6 h-6" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <h2 className="hidden md:flex mt-4 font-semibold text-lg text-gray-800">{user.fullName}</h2>
        <p className="hidden md:flex text-sm text-gray-500">{user.role === 'professional' ? 'Professionnel' : 'Utilisateur'}</p>
        <p className="hidden md:flex text-xs text-gray-500">{user.city}, {user.region}</p>

        {user.role === 'professional' && (
          <button
            onClick={onViewPublicProfile}
            className="hidden md:flex mt-4 flex items-center text-sm text-[#e0692d] hover:text-[#f07e40] transition-colors duration-200"
          >
            <Eye size={16} className="mr-1" />
            Voir mon profil public
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-2">
        <ul className="space-y-1 items-center">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                className={`sm:ml-2 w-full justify-center md:justify-start flex items-center px-3 md:px-4 py-3 text-left text-sm rounded-lg transition-colors duration-200 
                  ${
                  activeSection === item.id
                    ? 'text-white bg-[#e0692d]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="sm:py-2 md:mr-3">{item.icon}</span>
                <span className="hidden md:inline sm:ml-3">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center md:px-4 md:py-3 text-left text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <span className="mr-3 text-red-500"><LogOut size={20} /></span>
          <span className="hidden md:block text-red-500">Se déconnecter</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
