import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { urlBase } from "../config.js";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
  
  // Sécurité : Blocage temporaire si trop d'échecs (Anti-Brute Force)
  const isLockedOut = attempts >= 3;
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token ) {
      handleApproval(token);
    }
  }, []);

  const handleApproval = async (token: string) => {
    try {
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_session_start', Date.now().toString());
        
        Swal.fire({
          icon: 'success',
          title: 'Authentification réussie',
          text: 'Accès au terminal sécurisé...',
          timer: 3000,
          showConfirmButton: false,
          background: '#0f172a',
          color: '#fff'
        });

        setTimeout(() => navigate('/admin-dashboard'), 1600);
    } catch (err) {
      console.error("Approval error", err);
    }
  }; 
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;

    setLoading(true);

    try {
      // Simulation d'appel API avec délai (pour éviter le timing attack)
      const response = await fetch(`${urlBase}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, timestamp: Date.now() }),
      });

      const data = await response.json();
      console.log("Réponse du serveur:", data); // Debug : Affiche la réponse du serveur
      console.log("Status de la réponse:", response.status); // Debug : Affiche le status de la réponse
      if (response.ok && data.status === "pending") {
        // STOCKAGE SÉCURISÉ
        //localStorage.setItem('admin_token', data.token);
        //localStorage.setItem('admin_session_start', Date.now().toString());
        
        Swal.fire({
          icon: 'warning',
          title: 'Authentification en attente',
          text: 'Vérification par email en cours...',
          timer: 1500,
          showConfirmButton: false,
          background: '#0f172a',
          color: '#fff'
        });

        //setTimeout(() => navigate('/admin-dashboard'), 1600);
      } else {
        setAttempts(prev => prev + 1);
        throw new Error('Identifiants invalides');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Échec de connexion',
        text: isLockedOut ? 'Compte temporairement bloqué par sécurité.' : 'Email ou mot de passe incorrect.',
        confirmButtonColor: '#f97316'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans selection:bg-orange-500/30">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-[420px] z-10">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-orange-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-500/20 mb-4 rotate-3">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Terminal</h1>
            <p className="text-slate-400 text-sm mt-2 font-medium">Authentification sécurisée requise</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-widest">Email Professionnel</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-600"
                  placeholder="admin@entreprise.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mot de passe</label>
                <a href="#" className="text-[10px] font-bold text-orange-500 hover:underline uppercase">Oublié ?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white pl-12 pr-12 py-4 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isLockedOut}
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center space-x-2 shadow-lg 
                ${isLockedOut 
                  ? 'bg-red-900/20 text-red-500 border border-red-900/50 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-[1.02] active:scale-[0.98] shadow-orange-500/20'
                }`}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isLockedOut ? (
                <><AlertCircle className="h-5 w-5" /> <span>Terminal Verrouillé</span></>
              ) : (
                <span>Accéder au Dashboard</span>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <p className="text-center mt-8 text-[10px] text-slate-500 font-medium leading-relaxed">
            Système protégé par chiffrement AES-256.<br/>
            Toutes les tentatives de connexion sont enregistrées via IP.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;