import React, { useState, useEffect } from 'react';
import { Save, Eye, EyeOff, MessageSquare, Bell, BellOff } from 'lucide-react';
import { PrivacySettings as PrivacySettingsType } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

interface PrivacySettingsProps {
  settings: PrivacySettingsType;
  onSave: (updatedSettings: PrivacySettingsType) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = useState(settings);
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

  const handleToggle = (field: keyof PrivacySettingsType) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      profileVisibility: e.target.value as 'public' | 'private'
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#e0692d] p-4">
        <h2 className="text-xl font-semibold text-white">Paramètres de confidentialité</h2>
        <p className="text-white text-opacity-80 text-sm">Contrôlez qui peut voir vos informations</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Privacy Toggles */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Visibilité des informations</h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center">
                {formData.hideContactInfo ? <EyeOff size={20} className="text-gray-500 mr-3" /> : <Eye size={20} className="text-[#e0692d] mr-3" />}
                <div>
                  <p className="font-medium text-gray-800">Masquer mes coordonnées</p>
                  <p className="text-sm text-gray-500">Votre numéro et email ne seront pas visibles par les autres utilisateurs</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={formData.hideContactInfo} 
                  onChange={() => handleToggle('hideContactInfo')}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#e0692d] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e0692d]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center">
                {formData.allowMessages ? <MessageSquare size={20} className="text-[#e0692d] mr-3" /> : <MessageSquare size={20} className="text-gray-500 mr-3" />}
                <div>
                  <p className="font-medium text-gray-800">Autoriser les messages</p>
                  <p className="text-sm text-gray-500">Les autres utilisateurs peuvent vous contacter par message</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={formData.allowMessages} 
                  onChange={() => handleToggle('allowMessages')}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#e0692d] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e0692d]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center">
                {formData.showServices ? <Eye size={20} className="text-[#e0692d] mr-3" /> : <EyeOff size={20} className="text-gray-500 mr-3" />}
                <div>
                  <p className="font-medium text-gray-800">Afficher mes services</p>
                  <p className="text-sm text-gray-500">Vos services seront visibles dans les recherches</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={formData.showServices} 
                  onChange={() => handleToggle('showServices')}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#e0692d] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e0692d]"></div>
              </label>
            </div>
          </div>
          
          {/* Profile Visibility */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Visibilité du profil</h3>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block mb-2 text-sm font-medium text-gray-700">Qui peut voir mon profil ?</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                value={formData.profileVisibility}
                onChange={handleSelectChange}
              >
                <option value="public">Public - Visible par tous</option>
                <option value="private">Privé - Seulement les utilisateurs connectés</option>
              </select>
              <p className="mt-2 text-sm text-gray-500">
                {formData.profileVisibility === 'public' 
                  ? "Votre profil est visible par tous les visiteurs, même non connectés."
                  : "Votre profil est visible uniquement par les utilisateurs connectés à Profinder."}
              </p>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center">
                {formData.emailNotifications ? <Bell size={20} className="text-[#e0692d] mr-3" /> : <BellOff size={20} className="text-gray-500 mr-3" />}
                <div>
                  <p className="font-medium text-gray-800">Notifications par email</p>
                  <p className="text-sm text-gray-500">Recevoir des emails pour les messages et interactions</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={formData.emailNotifications} 
                  onChange={() => handleToggle('emailNotifications')}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#e0692d] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e0692d]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center">
                {formData.pushNotifications ? <Bell size={20} className="text-[#e0692d] mr-3" /> : <BellOff size={20} className="text-gray-500 mr-3" />}
                <div>
                  <p className="font-medium text-gray-800">Notifications push</p>
                  <p className="text-sm text-gray-500">Recevoir des notifications sur votre appareil</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={formData.pushNotifications} 
                  onChange={() => handleToggle('pushNotifications')}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#e0692d] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e0692d]"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            type="submit"
            className="thq-button-filled flex items-center justify-center w-full md:w-auto md:ml-auto"
          >
            <Save size={16} />
            <span>Sauvegarder</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrivacySettings;