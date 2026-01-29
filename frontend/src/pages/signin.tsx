import React, { Fragment, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Facebook, Chrome, ArrowRight, Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { mapUserDataToUserModel } from '../utils/mapper';
import './sign-in4.css';

const SignIn4 = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('email');
    sessionStorage.clear();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.user.email);
        const user = mapUserDataToUserModel(data.user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirection fluide
        window.location.href = '/dashboard';
      } else {
        alert(data.error || 'Identifiants incorrects.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert("Échec de la connexion. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
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
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm">
                <Facebook size={18} className="text-blue-600 fill-blue-600" /> Facebook
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm">
                <Chrome size={18} className="text-red-500" /> Google
              </button>
            </div>

            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">Ou avec email</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="nom@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e0692d] outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-bold text-slate-700">Mot de passe</label>
                  <a href="#" className="text-xs font-bold text-[#e0692d] hover:underline">Oublié ?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#e0692d] outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
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
        <div className="hidden lg:block lg:w-1/2 relative p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="h-full w-full rounded-[2rem] overflow-hidden relative shadow-2xl"
          >
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#e0692d]/80 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <h3 className="text-3xl font-black mb-4 tracking-tight">Trouvez le bon professionnel pour vos projets.</h3>
              <p className="font-medium text-white/80 leading-relaxed">
                Connectez-vous pour gérer vos demandes, vos devis et suivre vos chantiers en temps réel.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

SignIn4.defaultProps = {
  image1Src: 'https://images.unsplash.com/photo-1581244276891-663f89de1312?auto=format&fit=crop&q=80',
  image1Alt: 'Service Pro',
  action1: "Se connecter",
  heading1: "Bon retour parmi nous !",
};

SignIn4.propTypes = {
  image1Src: PropTypes.string,
  image1Alt: PropTypes.string,
  action1: PropTypes.string,
  heading1: PropTypes.string,
};

export default SignIn4;