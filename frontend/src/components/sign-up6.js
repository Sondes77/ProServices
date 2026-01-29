import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { mapUserDataToUserModel } from '../utils/mapper';
import photo from '../img/cc.jfif';
import PropTypes from 'prop-types'
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import "intl-tel-input/build/js/utils";
import './sign-up6.css'
import { User, Mail, Phone, Lock, Eye, EyeOff, Facebook, Chrome, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SignUp6 = (props) => {
const location = useLocation();

const [formData, setFormData] = useState({
  nom: "",
  prenom: "",
  email: "",
  tel: "",
  password: "",
});

const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);

useEffect(() => {
  // Nettoyage complet à l’arrivée sur la page
  localStorage.clear();
  sessionStorage.clear();
}, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const role =
    location.pathname === "/business" ? "professional" : "user";

  const payload = {
    ...formData,
    role,
  };

  // ✅ VALIDATION AVANT ENVOI
  if (!payload.email || !payload.password) {
    alert("Email et mot de passe obligatoires");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/api/utilisateur",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Erreur lors de l'inscription");
      return;
    }

    const token = data.token;
    localStorage.setItem("token", token);

    // 🔁 Récupérer l'utilisateur complet
    const userRes = await fetch(
      `http://localhost:5000/api/utilisateur?email=${encodeURIComponent(
        payload.email
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userData = await userRes.json();

    if (userRes.ok) {
      localStorage.setItem("email", userData.email);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(mapUserDataToUserModel(userData))
      );

      alert("Bienvenue 👋");
      window.location.href = "/dashboard";
    } else {
      alert("Impossible de récupérer les données utilisateur");
    }
  } catch (err) {
    console.error("Erreur réseau :", err);
    alert("Erreur serveur");
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
                  Bienvenue sur <span className="text-[#e0692d]">ProFinder</span>.
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
                  <button id="google-sign-in-button" className="sign-up6-button3 thq-button-outline">
                    <svg
                      viewBox="0 0 860.0137142857142 1024"
                      className="sign-up6-icon5"
                    >
                      <path d="M438.857 449.143h414.286c4 22.286 6.857 44 6.857 73.143 0 250.286-168 428.571-421.143 428.571-242.857 0-438.857-196-438.857-438.857s196-438.857 438.857-438.857c118.286 0 217.714 43.429 294.286 114.857l-119.429 114.857c-32.571-31.429-89.714-68-174.857-68-149.714 0-272 124-272 277.143s122.286 277.143 272 277.143c173.714 0 238.857-124.571 249.143-189.143h-249.143v-150.857z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.action3 ?? (
                        <Fragment>
                          <span className="sign-up6-text21">
                            Continue with Google
                          </span>
                        </Fragment>
                      )}
                    </span>
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
  )
}

SignUp6.defaultProps = {
  action3: undefined,
  image1Alt: 'SignUp Image',
  heading1: undefined,
  action1: undefined,
  action2: undefined,
  image1Src:
    'https://images.unsplash.com/photo-1653669485787-6ae1906e4302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUzMjg2MXw&ixlib=rb-4.0.3&q=80&w=1080',
}

SignUp6.propTypes = {
  action3: PropTypes.element,
  image1Alt: PropTypes.string,
  heading1: PropTypes.element,
  action1: PropTypes.element,
  action2: PropTypes.element,
  image1Src: PropTypes.string,
}

export default SignUp6
