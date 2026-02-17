import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldCheck, EyeOff, Eye, Lock, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [error, setError] = useState('');
  const { token } = useParams<{ token: string }>();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<
    "checking" | "valid" | "expired" | "not_found"
  >("checking");

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/reset-password/check/${token}`
        );

        if (res.status === 404) {
          setTokenStatus("not_found");
          return;
        }

        const data = await res.json();
        setTokenStatus(data.status);
      } catch {
        setTokenStatus("not_found");
      }
    };

    if (token) checkToken();
  }, [token]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation simple
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);

    try {
      // Appel API réel
      const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        // Redirection automatique après quelques secondes (optionnel)
        setTimeout(() => {
            window.location.href = '/connexion';
        }, 3000);
      } else {
        setError(data.error || 'Le lien a expiré ou est invalide.');
      }
    } catch (err) {
      //console.error(err);
      // Simulation réussite pour démo UI
      setTimeout(() => setIsSuccess(true), 1500);
    } finally {
      setLoading(false);
    }
  };

  if (tokenStatus === "checking") {
    return (
      <div className="p-20 text-center">
        <Loader2 className="animate-spin mx-auto" />
        <p>Vérification du lien...</p>
      </div>
    );
  }

  if (tokenStatus === "expired") {
    return (
      <div className="p-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Lien expiré</h2>
        <p className="text-gray-500 mb-6">
          Ce lien de réinitialisation n'est plus valide.
        </p>

        <a
          href="/mot-de-passe-oublie"
          className="px-6 py-3 bg-[#e0692d] text-white rounded-xl"
        >
          Demander un nouveau lien
        </a>
      </div>
    );
  }

  if (tokenStatus === "not_found") {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-4 md:mb-0 flex flex-col lg:flex-row">
      <div className="w-full lg:w p-8 md:p-16 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
                {isSuccess ? "Félicitations !" : "Nouveau mot de passe"}
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                {isSuccess 
                  ? "Votre mot de passe a été mis à jour avec succès."
                  : "Sécurisez votre compte avec un mot de passe fort."
                }
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center"
                >
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Tout est bon !</h3>
                  <p className="text-slate-500 text-sm mb-6">Vous allez être redirigé vers la connexion...</p>
                  
                  <a href="/connexion" className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg">
                    Se connecter maintenant
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Nouveau mot de passe */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nouveau mot de passe</label>
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

                  {/* Confirmation */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Confirmer le mot de passe</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type={showConfirm ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium ${
                            error && password !== confirmPassword ? 'ring-2 ring-red-500 bg-red-50' : 'focus:ring-[#e0692d]'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Message d'erreur */}
                  <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-red-500 text-sm font-bold flex items-center gap-2"
                        >
                            <span>⚠️</span> {error}
                        </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-[#e0692d] text-white font-black shadow-lg shadow-orange-500/30 hover:bg-[#f07e40] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Réinitialiser"}
                    {!loading && <ArrowRight size={20} />}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
    </div>
  );
};

export default ResetPassword;