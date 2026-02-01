import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types'
import { Mail, ArrowRight, Loader2, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulation ou appel API réel
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Succès de l'envoi
        setIsSubmitted(true);
      } else {
        alert(data.error || 'Une erreur est survenue. Vérifiez votre email.');
      }
    } catch (error) {
      console.error('Erreur de récupération :', error);
      // Pour la démo, on simule un succès même en cas d'erreur réseau si pas de backend
      // alert("Impossible de contacter le serveur."); 
      // À supprimer en prod :
      setTimeout(() => setIsSubmitted(true), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-2 p-4 flex items-center justify-center bg-orange-50 relative overflow-hidden font-sans">
      {/* Éléments de design en arrière-plan (Identiques au Login) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#e0692d]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl w-full mx-4 flex bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-slate-100"
      >
        
        {/* CÔTÉ GAUCHE : FORMULAIRE */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
                {isSubmitted ? "Email envoyé !" : (props.heading1 ?? "Mot de passe oublié ?")}
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                {isSubmitted 
                  ? `Nous avons envoyé les instructions de réinitialisation à ${email}. Vérifiez vos spams si besoin.`
                  : "Pas de panique. Entrez votre adresse email ci-dessous pour recevoir un lien de réinitialisation."
                }
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center"
                >
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Vérifiez votre boîte mail</h3>
                  <p className="text-slate-500 text-sm mb-6">Le lien est valide pendant 30 minutes.</p>
                  
                  <a href="/connexion" className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg">
                    Retour à la connexion
                  </a>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleReset} 
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email associé au compte</label>
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

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-[#e0692d] text-white font-black shadow-lg shadow-orange-500/30 hover:bg-[#f07e40] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Envoyer le lien"}
                    {!loading && <ArrowRight size={20} />}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Lien retour (affiché si pas encore soumis ou en bas de page) */}
            {!isSubmitted && (
              <div className="pt-8 text-center">
                <a href="/connexion" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#e0692d] transition-colors">
                  <ArrowLeft size={16} />
                  Retour à la connexion
                </a>
              </div>
            )}
          </motion.div>
        </div>

        {/* CÔTÉ DROIT : VISUEL (Similaire Login mais image adaptée) */}
        <div className="hidden lg:block lg:w-1/2 relative p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-full w-full rounded-[3rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.2)] group"
          >
            {/* Image de fond */}
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
            />

            {/* Filtres */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#e0692d]/60 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />
            
            {/* Effet Shimmer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full" />
            
            {/* Badge Flottant Sécurité */}
            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-1/4 left-8 bg-white/90 backdrop-blur-md text-slate-800 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/50"
              >
                <div className="bg-orange-100 p-2 rounded-lg text-[#e0692d]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Sécurité</p>
                  <p className="text-xs font-black">Compte Protégé</p>
                </div>
              </motion.div>

            {/* Texte bas */}
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px w-8 bg-[#e0692d]" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-200">Support 24/7</span>
                </div>
                
                <h3 className="text-4xl font-black mb-6 leading-[1.1] tracking-tighter">
                  Une question ? <br />
                  <span className="text-orange-400 italic">Nous sommes là.</span>
                </h3>
                
                <p className="font-medium text-white/90 leading-relaxed text-lg max-w-sm">
                  La sécurité de vos données est notre priorité absolue. Récupérez l'accès en quelques secondes.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

ForgotPassword.defaultProps = {
  // Image un peu plus abstraite/bureau pour le contexte "Sécurité/Support"
  image1Src:
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  image1Alt: 'Forgot Password Image',
  heading1: undefined,
}

ForgotPassword.propTypes = {
  image1Src: PropTypes.string,
  image1Alt: PropTypes.string,
  heading1: PropTypes.string,
}

export default ForgotPassword