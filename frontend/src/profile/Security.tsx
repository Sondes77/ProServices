import React, { useState } from 'react';
import { Save, Lock, Eye, EyeOff, Shield } from 'lucide-react';

const Security: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
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
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password form submitted', passwordForm);
    // Reset form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // In a real app, this would trigger setup flow
  };
  
  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                  className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e0692d] focus:border-transparent transition-colors duration-200"
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
                  className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e0692d] focus:border-transparent transition-colors duration-200"
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
                  className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e0692d] focus:border-transparent transition-colors duration-200"
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
      
      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#e0692d] p-4">
          <h2 className="text-xl font-semibold text-white">Authentification à deux facteurs</h2>
          <p className="text-white text-opacity-80 text-sm">Ajoutez une couche de sécurité supplémentaire</p>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center">
              <Shield size={20} className={twoFactorEnabled ? "text-[#e0692d] mr-3" : "text-gray-500 mr-3"} />
              <div>
                <p className="font-medium text-gray-800">Authentification à deux facteurs</p>
                <p className="text-sm text-gray-500">
                  {twoFactorEnabled 
                    ? "Activée - Votre compte est mieux protégé" 
                    : "Désactivée - Activer cette option pour plus de sécurité"}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={twoFactorEnabled} 
                onChange={handleTwoFactorToggle}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#e0692d] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e0692d]"></div>
            </label>
          </div>
          
          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Configuration à venir</h4>
              <p className="text-sm text-blue-700">
                Cette fonctionnalité sera bientôt disponible. Une fois activée, vous devrez confirmer votre identité 
                avec un code de sécurité unique envoyé à votre téléphone ou généré par une application d'authentification 
                lorsque vous vous connecterez.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Security Activity */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activité de connexion récente</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Paris, France</p>
                <p className="text-sm text-gray-500">Aujourd'hui, 15:30 • Chrome sur Windows</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Actuel
              </span>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Paris, France</p>
                <p className="text-sm text-gray-500">Hier, 10:15 • Safari sur iOS</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Reconnu
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;