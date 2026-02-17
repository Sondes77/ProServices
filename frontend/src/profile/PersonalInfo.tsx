import React, { useEffect, useState } from 'react';
import { Save, User, Mail, Phone, MapPin, Home } from 'lucide-react';
import { User as UserType } from '../utils/types';
import ProgressSteps from '../profile/ProgressSteps';
import { useLocation, useNavigate } from 'react-router-dom';
import { mapUserDataToUserModel } from '../utils/mapper';
import { villesEtRegions, Ville } from '../components/villesRegions';
import {  Categorie, Metier } from '../components/categoryMetier';
import Swal from "sweetalert2";
import CustomSelect from './CustomSelect';

interface PersonalInfoProps {
  user: UserType;
  onSave: (updatedUser: Partial<UserType>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user, onSave }) => {
  
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    city: user.city,
    region: user.region,
    //category: user.category,
    //metier: user.metier,
    address: user.address,
    apropos: user.apropos,
  });

  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const regionsDisponibles =
  formData.city && villesEtRegions[formData.city as Ville]
    ? villesEtRegions[formData.city as Ville]
    : [];
    
  {/*useEffect(() => {
    if (!token){
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
    };
  }, [token, navigate]);*/}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const updatedUser = {
      //id: user.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      region: formData.region,
      //category: formData.category,
      //metier: formData.metier,
      address: formData.address,
      apropos: formData.apropos,
    };
 
    onSave(updatedUser);
    setIsEditing(false);
   
  
    //const token = localStorage.getItem('token');
    if (!token) {
      //console.error("Aucun token trouvé dans le localStorage");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/update-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });
  
      const data = await response.json();
  
      //console.log('Réponse du backend:', data);
      //console.log('Statut HTTP:', response.status);
  
      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          toast: true, // active le mode toast
          position: "top-end", // en haut à droite
          showConfirmButton: false, // pas de bouton OK
          timer: 1500, // durée d'affichage
          timerProgressBar: true, // barre de progression
          icon: "success",
          //title: selectedService ? "Service mis à jour" : "Service créé",
          text: "Mis à jour avec succès",
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
        //console.log('Utilisateur mis à jour avec succès');
  
      // Requête pour obtenir les infos complètes de l'utilisateur
      const userRes = await fetch(`http://localhost:5000/api/utilisateur?email=${encodeURIComponent(formData.email)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = await userRes.json();
        
        if (userRes.ok) {
          //console.log('Données utilisateur récupérées :', userData);
          localStorage.setItem('token', token);
          const user = mapUserDataToUserModel(userData);
          localStorage.setItem('currentUser', JSON.stringify(user));
          if (location.pathname === '/personal-info'){
            // Redirection
            setStep(3); // Mise à jour de l'étape

            // Redirection après un court délai pour laisser React appliquer le nouvel état
            setTimeout(() => {
              window.location.href = `/service`;
            }, 300); // 300ms par exemple
          }
          
        } else {
          Swal.fire({
            toast: true, // active le mode toast
            position: "top-end", // en haut à droite
            showConfirmButton: false, // pas de bouton OK
            timer: 1500, // durée d'affichage
            timerProgressBar: true, // barre de progression
            icon: "warning",
            //title: selectedService ? "Service mis à jour" : "Service créé",
            text: "Erreur lors de la récupération des données",
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
      } else {
        Swal.fire({
          toast: true, // active le mode toast
          position: "top-end", // en haut à droite
          showConfirmButton: false, // pas de bouton OK
          timer: 1500, // durée d'affichage
          timerProgressBar: true, // barre de progression
          icon: "warning",
          //title: selectedService ? "Service mis à jour" : "Service créé",
          text: "Erreur lors de la création de l'utilisateur",
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
        //console.error("Erreur lors de la création de l'utilisateur :", data.message);
      }
    } catch (error) {
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "warning",
        //title: selectedService ? "Service mis à jour" : "Service créé",
        text: "Erreur réseau !",
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
      //console.error("Erreur lors de l'envoi:", error);
    }
  };
  
  const [step, setStep] = useState(2);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Met à jour step à 1 si isVerified devient true
  useEffect(() => {
    if(user.phone !== '' && user.city !=='' && user.region !== '' && user.address !== '' && user.apropos !== ''){
      navigate('/dashboard', { replace: true });
    }
    //const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem("currentUser");
      navigate('/connexion', { replace: true });
    } else {
      setIsCheckingAuth(false); // ✅ Auth OK, on peut afficher
    }
  },  [navigate]);
    
  if (isCheckingAuth) return null;  
  return (
    
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <>
      {location.pathname === '/personal-info' && (
        <div className="bg-white shadow-md overflow-hidden">
          <div className="max-w-2xl mx-auto p-4">
            <ProgressSteps currentStep={step} />
            {/* Affichage conditionnel des étapes ici */}
          </div>
          <div className="bg-[#e0692d] p-4">
            <h2 className="text-xl font-semibold text-white">Informations personnelles</h2>
            <p className="text-white text-opacity-80 text-sm">Complétez vos informations de profil</p>
          </div>
        </div>
      )}
    </>
    <>
      {location.pathname === '/dashboard' && (
          <div className="bg-[#e0692d] p-4">
            <h2 className="text-xl font-semibold text-white">Informations personnelles</h2>
            <p className="text-white text-opacity-80 text-sm">Gérez vos informations de profil</p>
          </div>
      )}
    </>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <User size={18} />
              </div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                required={true}
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                  isEditing 
                    ? 'w-full pr-4 pl-12  border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-2xl outline-none transition-all' 
                    : 'pr-4 pl-12 bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              />
            </div>
          </div>
          
          {/* Last Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <User size={18} />
              </div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                required={true}
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                  isEditing 
                    ? 'w-full pr-4 pl-12 border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-2xl outline-none transition-all' 
                    : 'pr-4 pl-12 bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              />
            </div>
          </div>
          
          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                required={true}
                className={`pr-4 pl-12 w-full pl-10 pr-3 py-2 rounded-md border ${
                  isEditing 
                    ? 'w-full pr-4 pl-12 border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-2xl outline-none transition-all' 
                    : 'bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              />
            </div>
          </div>
          
          {/* Phone */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                required={true}
                pattern="^\+?[0-9\s\-]{8,15}$"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                  isEditing 
                    ? 'w-full pr-4 pl-12 border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-2xl outline-none transition-all' 
                    : 'pr-4 pl-12 bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
              />
            </div>
          </div>
          
          {/* City */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <MapPin size={18} />
              </div>
              <CustomSelect
              className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                isEditing 
                  ? 'border-[#e0692d] focus:ring-2 focus:ring-[#e0692d] bg-white focus:border-transparent' 
                  : 'bg-gray-50 border-gray-300'
              } transition-colors duration-200`}
                value={formData.city}
                onChange={(value: string) => {
                  setFormData(prev => ({
                    ...prev,
                    city: value,
                    region: '' // reset région quand ville change
                  }));
                }}
                disabled={!isEditing}
                required
                name="ville"
                placeholder='-- Sélectionner une ville --'
                options={[
                  { value: '', label: '-- Sélectionner une ville --' },
                  ...Object.keys(villesEtRegions).map((v) => ({
                    value: v,
                    label: v
                  }))
                ]}
              />
              
            </div>
          </div>
          
          {/* Region */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <MapPin size={18} />
              </div>
              <CustomSelect
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                  isEditing 
                    ? 'border-[#e0692d] focus:ring-2 focus:ring-[#e0692d] bg-white focus:border-transparent' 
                    : 'bg-gray-50 border-gray-300'
                } transition-colors duration-200`}
                value={formData.region}
                onChange={(value: string) => {
                  setFormData(prev => ({
                    ...prev,
                    region: value
                  }));
                }}
                disabled={!isEditing}
                required
                name="region"
                placeholder='-- Sélectionner une région --'
                options={[
                  { value: '', label: '-- Sélectionner une région --' },
                  ...regionsDisponibles.map((r) => ({
                    value: r,
                    label: r
                  }))
                ]}
              />
            </div>
          </div>

          {/* Address */}
          <div className="relative md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Home size={18} />
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                required={true}
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                  isEditing 
                    ? 'w-full pr-4 pl-12 border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-2xl outline-none transition-all' 
                    : 'bg-gray-50 pr-4 pl-12 border-gray-300'
                } transition-colors duration-200`}
              />
            </div>
          </div>
         
          {/* Apropos */}
          <div className="relative md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              À propos
            </label>
            <textarea
              name="apropos"
              value={formData.apropos}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full pl-8 pr-5 py-2 rounded-md border ${
                isEditing 
                  ? 'w-full pr-4 border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-2xl outline-none transition-all' 
                  : 'bg-gray-50 border-gray-300'
              } transition-colors duration-200`}
              rows={4}
              placeholder="Professionnel qualifié avec plusieurs années d'expérience. Spécialisé dans divers services et toujours à l'écoute des besoins des clients. Disponible pour des travaux dans la région de Tunis..."
              required
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          {isEditing ? (
            <div className="flex space-x-4">
              {location.pathname === '/dashboard' && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    
                    setFormData({
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                      phone: user.phone,
                      city: user.city,
                      region: user.region,
                      address: user.address,
                      apropos: user.apropos
                    });
                  }}
                  className="thq-button-outline"
                >
                  Annuler
                </button>
              )}
              <button
                type="submit"
                className="thq-button-filled flex items-center"
              >
                <Save size={16} />
                <span>Sauvegarder</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="thq-button-filled"
            >
              Modifier
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
