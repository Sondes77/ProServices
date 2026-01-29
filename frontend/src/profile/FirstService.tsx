import React, { useEffect, useState } from 'react';
import { Save, X } from 'lucide-react';
import { Service } from '../utils/types';
import ProgressSteps from '../profile/ProgressSteps';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { mapUserDataToUserModel } from '../utils/mapper';
import { User as UserType } from '../utils/types';
import Navbar from '../layout/ProfessionalNavbar';
import Footer from '../landing/Footer';
import Swal from "sweetalert2";

interface FirstServiceProps {
  user: UserType;
  service?: Service;
  onSubmit: (serviceData: Partial<Service>) => void;
  onCancel: () => void;
}

const FirstService: React.FC<FirstServiceProps> = ({  user, service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    category: service?.category || '',
    price: service?.price || '',
    status: service?.status || 'active'
  });

  {/*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };*/}
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // --- Charger toutes les conversations ---
  useEffect(() => {
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
    }, [token, navigate]);
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newService = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      status: formData.status,
    };
  
    onSubmit(newService);

    console.log('Données du formulaire:', formData);
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Aucun token trouvé dans le localStorage");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newService),
      });
  
      const data = await response.json();
  
      console.log('Réponse du backend:', data);
      console.log('Statut HTTP:', response.status);
  
      if (response.status === 201 || response.status === 200) {
        alert('Utilisateur mis à jour avec succès');
        console.log('Utilisateur mis à jour avec succès');
  
      // Requête pour obtenir les infos complètes de l'utilisateur
      const userRes = await fetch(`http://localhost:5000/api/utilisateurId?id=${encodeURIComponent(data.userId)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
        const userData = await userRes.json();
  
        if (userRes.ok) {
          console.log('Données utilisateur récupérées :', userData);
          localStorage.setItem('token', token);
          const user = mapUserDataToUserModel(userData);
          localStorage.setItem('currentUser', JSON.stringify(user));
          setStep(4); // Mise à jour de l'étape

          // Redirection après un court délai pour laisser React appliquer le nouvel état
          setTimeout(() => {
            window.location.href = `/dashboard`;
          }, 300); // 300ms par exemple
        } else {
          alert("Erreur lors de la récupération des données utilisateur");
        }
      }else if(response.status === 403){
        alert("Votre session a été épuisée ! Veuillez vous vous connectez");
        navigate("/connexion");
      }else {
        console.error("Erreur lors de la création de l'utilisateur :", data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    }
  };
  
  const [step, setStep] = useState(3);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Met à jour step à 1 si isVerified devient true
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (user && user.stats?.servicesPublished > 0) {
      navigate('/dashboard', { replace: true });
      return; // On arrête ici pour ne pas faire le reste
    }
    if (!token) {
      localStorage.removeItem("currentUser");
      navigate('/connexion', { replace: true });
    } else {
      setIsCheckingAuth(false); // ✅ Auth OK, on peut afficher
    }
    
  },  [ navigate ]);
  
  if (isCheckingAuth) return null;
  return (
    
    <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-md overflow-hidden">
    <>
      {location.pathname === '/service' && (
        <div className="bg-white shadow-md overflow-hidden">
          <div className="max-w-2xl mx-auto p-4">
            <ProgressSteps currentStep={step} />
            {/* Affichage conditionnel des étapes ici */}
          </div>
          <div className="bg-[#e0692d] p-4">
            <h2 className="text-xl font-semibold text-white">Service</h2>
            <p className="text-white text-opacity-80 text-sm">Publiez votre premier service</p>
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
        <div className="space-y-4">
          {/* First Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre du service
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
              placeholder="Ex: Plomberie générale"
              required
            />
          </div>
          
          {/* Last Name */}
          <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                rows={4}
                placeholder="Décrivez votre service en détail..."
                required
              />
            </div>
          
          {/* Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="Plomberie">Plomberie</option>
                <option value="Électricité">Électricité</option>
                <option value="Menuiserie">Menuiserie</option>
                <option value="Peinture">Peinture</option>
                <option value="Jardinage">Jardinage</option>
                <option value="Maçonnerie">Maçonnerie</option>
                <option value="Chauffage">Chauffage</option>
                <option value="Climatisation">Climatisation</option>
                <option value="Serrurerie">Serrurerie</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                placeholder="Ex: À partir de 50€/h"
              />
            </div>
          </div>
          
          {/* Phone */}
          <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'paused' | 'archived' }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                required
              >
                <option value="active">Actif</option>
                <option value="paused">En pause</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
         <button
            type="button"
            onClick={onCancel}
            className="thq-button-outline"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="thq-button-filled flex items-center"
          >
            <Save size={16} />
            <span>{service ? 'Mettre à jour' : 'Créer'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FirstService;