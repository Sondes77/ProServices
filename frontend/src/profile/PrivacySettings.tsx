import React, { useState, useEffect } from 'react';
import { Save, Eye, EyeOff, MessageSquare, Bell, BellOff, Lock, Share, Share2 } from 'lucide-react';
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
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const userRole = JSON.parse(localStorage.getItem("currentUser") || "null")?.role;
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

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

  
  useEffect(() => {
    if (userRole === "user") return;

    const load = async () => {
      const data = await getPrivacySettings(token!);

      setFormData({
          hideContactInfo: !data.show_phone,
          allowMessages: !data.show_address,
          showServices: data.allow_share === 1 || data.allow_share === true,
          profileVisibility: data.statut_profil,
          emailNotifications: data.email_notifications === 1 || data.email_notifications === true,
          pushNotifications: false,
        });
      };

      load();
  }, []);

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        show_phone: !formData.hideContactInfo,
        show_address: !formData.allowMessages,
        allow_share: formData.showServices,
        statut_profil: formData.profileVisibility,
        email_notifications: formData.emailNotifications
      };

      await savePrivacySettings(token!, payload);

      Swal.fire("Succès", "Paramètres mis à jour", "success");

      onSave(formData);

    } catch (err:any) {
      Swal.fire("Erreur", err.message, "error");
    }
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    if (field === 'current') setShowCurrentPassword(!showCurrentPassword);
    if (field === 'new') setShowNewPassword(!showNewPassword);
    if (field === 'confirm') setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      Swal.fire("Erreur", "Mots de passe différents", "error");
      return;
    }
    console.log("passwordForm = ", passwordForm);
    const res = await fetch(`http://localhost:5000/api/change-password`, {
      method: 'PUT',
      headers: {  'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(passwordForm)
    });
    if(!res.ok) {
      const errorData = await res.json();
      Swal.fire("Erreur", errorData.error || "Une erreur est survenue", "error");
      return;
    }
    if(res.ok) Swal.fire("OK", "Mot de passe modifié", "success");

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  
  const getPrivacySettings = async (token: string) => {
    const res = await fetch(`http://localhost:5000/api/privacy`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Erreur chargement privacy");

    return res.json();
  };

  const savePrivacySettings = async (token: string, data: any) => {
    const res = await fetch("http://localhost:5000/api/privacy", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.error);

    return json;
  };

  return (
    <div className="overflow-hidden ">

      {/* Password Change Section */}
      <div className="bg-white rounded-lg mt-2 shadow-md overflow-hidden">
        <div className="bg-[#e0692d] p-4">
          <h2 className="text-xl font-semibold text-white">Modifier le mot de passe</h2>
          <p className="text-white text-opacity-80 text-sm">Assurez-vous d'utiliser un mot de passe fort</p>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="p-6">
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-10 py-2 border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-md outline-none transition-all"
                  placeholder="Entrez votre mot de passe actuel"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-10 py-2 border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-md outline-none transition-all"
                  placeholder="Entrez votre nouveau mot de passe"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                8 caractères minimum, avec au moins une majuscule, un chiffre et un caractère spécial.
              </p>
            </div>
            
            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-10 py-2 border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-md outline-none transition-all"
                  placeholder="Confirmez votre nouveau mot de passe"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="thq-button-filled flex items-center justify-center w-full md:w-auto md:ml-auto"
            >
              <Save size={16} />
              <span>Mettre à jour le mot de passe</span>
            </button>
          </div>
        </form>
      </div>

      {userRole === "professional" && (
        <div className="bg-white rounded-lg mt-4 shadow-md overflow-hidden">
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
                      <p className="font-medium text-gray-800">Masquer mon numéro de téléphone</p>
                      <p className="text-sm text-gray-500">Votre numéro de téléphone ne sera pas visible par les autres utilisateurs</p>
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
                    {formData.allowMessages ? <EyeOff size={20} className="text-gray-500 mr-3" /> : <Eye size={20} className="text-[#e0692d] mr-3" />}
                    <div>
                      <p className="font-medium text-gray-800">Masquer mon adresse complete </p>
                      <p className="mt-2 text-sm text-gray-500">
                        {formData.allowMessages 
                          ? "Seulement la ville et la région seront visibles sur votre profil"
                          : "Votre adresse complète sera visible sur votre profil"}
                      </p>
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
                    {formData.showServices ? <Share2  size={20} className="text-[#e0692d] mr-3" /> : <Share2 size={20} className="text-gray-500 mr-3" />}
                    <div>
                      <p className="font-medium text-gray-800">Autoriser le partage du profil et des services</p>
                      <p className="text-sm text-gray-500">Contrôlez si votre profil et vos services peuvent être partagés par d’autres</p>
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
                      : "Votre profil est visible uniquement par les utilisateurs connectés à ServicePro."}
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
                
                {/*<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
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
                </div>*/}
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
      )}
    </div>
  );
};

export default PrivacySettings;