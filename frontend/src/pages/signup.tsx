import React, { Fragment, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, Facebook, Chrome, ArrowRight } from 'lucide-react';
import { mapUserDataToUserModel } from '../utils/mapper';
import PropTypes from 'prop-types';

const SignUp6 = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // États du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const role = location.pathname === "/business" ? "professional" : "user";
    const payload = { ...formData, role };

    try {
      const response = await fetch('http://localhost:5000/api/utilisateur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 201) {
        // Auto-login ou récupération des infos
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', formData.email);
        
        // Simulation de mapping et stockage
        const mappedUser = mapUserDataToUserModel(data.user || payload);
        localStorage.setItem('currentUser', JSON.stringify(mappedUser));
        
        navigate('/dashboard');
      } else {
        alert(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      
      {/* --- SECTION GAUCHE : VISUEL DYNAMIQUE --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center p-12">
        <div className="absolute inset-0 opacity-40">
           {/* Remplacez l'URL par une image réelle ou un pattern abstrait */}
           <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#e0692d]/40 to-slate-900/90" />
        
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-black text-white mb-6 leading-tight">
              Bienvenue sur <span className="text-[#e0692d]">ServicePro</span>.
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              La plateforme n°1 pour connecter les talents locaux avec ceux qui en ont besoin. Simple, rapide et sécurisé.
            </p>
            
            <div className="mt-12 flex gap-4">
              <div className="h-1 w-20 bg-[#e0692d] rounded-full" />
              <div className="h-1 w-8 bg-white/20 rounded-full" />
              <div className="h-1 w-8 bg-white/20 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- SECTION DROITE : FORMULAIRE --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {location.pathname === '/business' ? "Compte Professionnel" : "Créer un compte"}
            </h2>
            <p className="text-slate-500 font-medium">
              Déjà membre ? <a href="/connexion" className="text-[#e0692d] font-bold hover:underline">Se connecter</a>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Nom</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    name="nom"
                    type="text"
                    required
                    placeholder="Nom"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e0692d] outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Prénom</label>
                <input
                  name="prenom"
                  type="text"
                  required
                  placeholder="Prénom"
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e0692d] outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="votre@email.com"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e0692d] outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Téléphone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="tel"
                  type="tel"
                  required
                  placeholder="+216 -- --- ---"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e0692d] outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e0692d] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#e0692d]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e0692d] text-white py-4 rounded-2xl font-black shadow-lg shadow-orange-200 hover:bg-[#f07e40] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Création..." : "S'inscrire maintenant"}
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8">
            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="mx-4 text-xs font-bold text-slate-400 uppercase">Ou s'inscrire avec</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700">
                <Facebook size={18} className="text-blue-600 fill-blue-600" /> Facebook
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700">
                <Chrome size={18} className="text-red-500" /> Google
              </button>
            </div>
          </div>

          <p className="mt-8 text-xs text-slate-400 text-center leading-relaxed">
            En continuant, vous acceptez nos <span className="underline cursor-pointer">Conditions d'utilisation</span> et notre <span className="underline cursor-pointer">Politique de confidentialité</span>.
          </p>

          {location.pathname === '/inscription' && (
             <div className="mt-6 text-center">
                <a href="/business" className="text-sm font-bold text-[#e0692d] bg-orange-50 px-4 py-2 rounded-full hover:bg-orange-100 transition-colors">
                  Vous êtes un professionnel ? Cliquez ici
                </a>
             </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp6;