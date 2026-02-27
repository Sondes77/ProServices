import React, { Fragment, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Star, ArrowRight, Loader2 } from 'lucide-react';
import { mapUserDataToUserModel } from '../utils/mapper';
import './sign-in4.css'
import Swal from "sweetalert2";
import { urlBase } from "../config.js";

const SignIn4 = (props) => {
  useEffect(() => {
      // Nettoyer les données à chaque fois qu'on arrive sur la page de login
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('email');
      sessionStorage.clear(); // facultatif
    }, []);
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      alert(`${urlBase}/login`);
      const response = await fetch(`${urlBase}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Email ou mot de passe incorrect");
        return; 
      }

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.user.email);
        const user = mapUserDataToUserModel(data.user);
        
        localStorage.setItem('currentUser', JSON.stringify(user));
       
        window.location.href = '/dashboard';
      }

    } catch (error) {
      //console.error('Erreur de connexion :', error);
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "warning",
        //title: selectedService ? "Service mis à jour" : "Service créé",
        text: "Un problème est survenu ! Veuillez réessayer plus tard.",
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
    }  finally {
      // ✅ TOUJOURS exécuté — succès ou erreur
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-2 md:p-4 flex items-center justify-center bg-orange-50 relative overflow-hidden font-sans">
      {/* Éléments de design en arrière-plan */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#e0692d]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl w-full mx-4 flex bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-slate-100"
      >
        
        {/* CÔTÉ GAUCHE : FORMULAIRE */}
        <div className="w-full lg:w-1/2 p-8 md:p-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
                {props.heading1 ?? "Ravi de vous revoir !"}
              </h2>
              <p className="text-slate-500 font-medium">
                Pas encore de compte ?{' '}
                <a href="/inscription" className="text-[#e0692d] hover:underline font-bold">S'inscrire gratuitement</a>
              </p>
            </div>

            {/* Boutons Sociaux */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {/*<button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm">
                <Facebook size={18} className="text-blue-600 fill-blue-600" /> Facebook
              </button>*/}
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm" id="google-sign-in-button">
                {/*<svg
                  viewBox="0 0 860.0137142857142 1024"
                  className="sign-in4-icon3"
                >
                  <path d="M438.857 449.143h414.286c4 22.286 6.857 44 6.857 73.143 0 250.286-168 428.571-421.143 428.571-242.857 0-438.857-196-438.857-438.857s196-438.857 438.857-438.857c118.286 0 217.714 43.429 294.286 114.857l-119.429 114.857c-32.571-31.429-89.714-68-174.857-68-149.714 0-272 124-272 277.143s122.286 277.143 272 277.143c173.714 0 238.857-124.571 249.143-189.143h-249.143v-150.857z"></path>
                </svg>
                <span className="thq-body-small">Continue with Google</span>*/}
              </button>
            </div>

            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">Ou avec email</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                {error && (
                    <div className="bg-red-50 border my-4 border-red-50 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl">
                      {error}
                    </div>
                  )}

                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="nom@exemple.com"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); setError(null);}}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-bold text-slate-700">Mot de passe</label>
                  <a href="/mot-de-passe-oublie" className="text-xs font-bold text-[#e0692d] hover:underline">Mot de passe oublié ?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value); setError(null);}}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-[#e0692d] text-white font-black shadow-lg shadow-orange-500/30 hover:bg-[#f07e40] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : props.action1 ?? "Se connecter"}
                {!loading && <ArrowRight size={20} />}
              </motion.button>

              <div className="pt-4 text-center">
                <a href="/business" className="text-sm font-bold text-slate-500 hover:text-[#e0692d] transition-colors italic border-b-2 border-slate-100 hover:border-[#e0692d]">
                  S'inscrire en tant que professionnel →
                </a>
              </div>
            </form>
          </motion.div>
        </div>

        {/* CÔTÉ DROIT : IMAGE/VISUEL */}
        {/* CÔTÉ DROIT : VISUEL IMMERSIF & PREUVE SOCIALE */}
        <div className="hidden lg:block lg:w-1/2 relative p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-full w-full rounded-[3rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.2)] group"
          >
            {/* Image de fond avec zoom lent */}
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
            />

            {/* Filtre de couleur pour l'unité visuelle */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#e0692d]/60 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />

    {/* --- ÉLÉMENTS FLOTTANTS (UI SIMULATION) --- */}
    
    {/* Carte Avis Client */}
    {/*<motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="absolute top-12 right-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl max-w-[220px] hidden xl:block"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
        </div>
        <span className="text-[10px] font-black text-slate-800">5.0</span>
      </div>
      <p className="text-xs italic text-slate-600 leading-tight">
        "Travail impeccable, mon plombier était chez moi en 30 min !"
      </p>
      <p className="text-[10px] font-bold text-[#e0692d] mt-2">— Sarah M.</p>
    </motion.div>*/}

    {/* Badge Mission Confirmée */}
    

      {/* --- TEXTE PRINCIPAL --- */}
      

      {/* Effet Shimmer (Brillance) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full" />
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#e0692d]/40 to-slate-900/90" />
        <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute top-1/3 left-8 bg-emerald-500 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20"
          >
            <div className="bg-white/20 p-1.5 rounded-lg">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Statut</p>
              <p className="text-xs font-black">Mission Sécurisée</p>
            </div>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-12 left-12 right-12 text-white">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#e0692d]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-200">La confiance avant tout</span>
          </div>
          
          <h3 className="text-4xl font-black mb-6 leading-[1.1] tracking-tighter">
            L'expertise à portée <br />
            <span className="text-orange-400 italic">de main.</span>
          </h3>
          
          <p className="font-medium text-white/90 leading-relaxed text-lg max-w-sm">
            Particulier ou Professionnel, gérez vos échanges et vos activités en toute sérénité sur notre plateforme.
          </p>

          {/* Stats rapides */}
          <div className="flex gap-10 mt-8 pt-8 border-t border-white/10">
            <div>
              <p className="text-2xl font-black tracking-tighter">24/7</p>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Support</p>
            </div>
            <div>
              <p className="text-2xl font-black tracking-tighter">100%</p>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Vérifié</p>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
      </motion.div>
    </div>
  )
}

SignIn4.defaultProps = {
  image1Src:
    'https://images.unsplash.com/flagged/photo-1574791396404-25cdf41cffd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUzMzAzOXw&ixlib=rb-4.0.3&q=80&w=1080',
  image1Alt: 'Sign In Image',
  action1: undefined,
  heading1: undefined,
}

SignIn4.propTypes = {
  image1Src: PropTypes.string,
  image1Alt: PropTypes.string,
  action1: PropTypes.element,
  heading1: PropTypes.element,
}

export default SignIn4