import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types'
import { 
  Bell, 
  Check, 
  Trash2, 
  MessageSquare, 
  ShieldAlert, 
  Info, 
  Clock, 
  CheckCircle2,
  X
} from 'lucide-react';

// Données simulées (Mock Data)
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'security',
    title: 'Connexion détectée',
    message: 'Une nouvelle connexion depuis Paris a été détectée sur votre compte.',
    time: 'Il y a 2 min',
    unread: true,
  },
  {
    id: 2,
    type: 'success',
    title: 'Mot de passe mis à jour',
    message: 'Votre mot de passe a été modifié avec succès.',
    time: 'Il y a 10 min',
    unread: true,
  },
  {
    id: 3,
    type: 'message',
    title: 'Nouveau message',
    message: 'Sarah M. a répondu à votre demande de devis.',
    time: 'Il y a 1 heure',
    unread: false,
  },
  {
    id: 4,
    type: 'info',
    title: 'Mise à jour système',
    message: 'La plateforme sera en maintenance ce soir à 23h00.',
    time: 'Il y a 3 heures',
    unread: false,
  },
  {
    id: 5,
    type: 'message',
    title: 'Bienvenue !',
    message: 'Merci d\'avoir rejoint notre communauté de professionnels.',
    time: 'Hier',
    unread: false,
  },
];

const Notifications = (props) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'

  // Filtrer les notifications
  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return n.unread;
    return true;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  // Actions
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Helper pour l'icône selon le type
  const getIcon = (type) => {
    switch (type) {
      case 'security': return <ShieldAlert size={20} className="text-red-500" />;
      case 'success': return <CheckCircle2 size={20} className="text-green-500" />;
      case 'message': return <MessageSquare size={20} className="text-blue-500" />;
      default: return <Info size={20} className="text-slate-500" />;
    }
  };

  // Helper pour la couleur de fond de l'icône
  const getIconBg = (type) => {
    switch (type) {
      case 'security': return 'bg-red-50';
      case 'success': return 'bg-green-50';
      case 'message': return 'bg-blue-50';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="min-h-screen mt-2 p-4 flex items-center justify-center bg-orange-50 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#e0692d]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl w-full mx-4 flex bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-slate-100 h-[800px] lg:h-[700px]"
      >
        
        {/* CÔTÉ GAUCHE : LISTE DES NOTIFICATIONS */}
        <div className="w-full lg:w-1/2 flex flex-col h-full">
          
          {/* Header */}
          <div className="p-8 pb-4 border-b border-slate-100 bg-white z-20">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight flex items-center gap-3">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="bg-[#e0692d] text-white text-xs font-bold px-2 py-1 rounded-full align-middle transform -translate-y-1 shadow-lg shadow-orange-500/30">
                      {unreadCount}
                    </span>
                  )}
                </h2>
                <p className="text-slate-500 font-medium text-sm mt-1">
                  Restez informé de votre activité récente.
                </p>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2 bg-slate-50 p-1 rounded-xl">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Toutes
                </button>
                <button 
                  onClick={() => setFilter('unread')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'unread' ? 'bg-white text-[#e0692d] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Non lues
                </button>
              </div>

              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-xs font-bold text-slate-500 hover:text-[#e0692d] flex items-center gap-1 transition-colors"
                >
                  <Check size={14} /> Tout marquer comme lu
                </button>
              )}
            </div>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                    whileHover={{ scale: 1.01 }}
                    className={`relative group p-4 rounded-2xl border transition-all cursor-pointer ${
                      notif.unread 
                        ? 'bg-orange-50/30 border-orange-100 hover:border-orange-200' 
                        : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-md'
                    }`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="flex gap-4 items-start">
                      {/* Icone */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${getIconBg(notif.type)}`}>
                        {getIcon(notif.type)}
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0 pr-8">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-sm font-bold truncate ${notif.unread ? 'text-slate-900' : 'text-slate-600'}`}>
                            {notif.title}
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
                            <Clock size={10} /> {notif.time}
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${notif.unread ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                          {notif.message}
                        </p>
                      </div>

                      {/* Indicateur Unread */}
                      {notif.unread && (
                        <div className="absolute top-6 right-4 w-2 h-2 rounded-full bg-[#e0692d]" />
                      )}

                      {/* Bouton Supprimer (visible au hover) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notif.id);
                        }}
                        className="absolute bottom-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Bell size={32} className="text-slate-300" />
                  </div>
                  <p className="font-bold text-slate-600">Aucune notification</p>
                  <p className="text-sm">Vous êtes à jour !</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CÔTÉ DROIT : VISUEL (Image statique + Ambience) */}
        <div className="hidden lg:block lg:w-1/2 relative p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-full w-full rounded-[3rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.2)] group"
          >
            {/* Image de fond (Unsplash - Communication/Tech) */}
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-[#e0692d]/80 via-transparent to-slate-900/40 opacity-80" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
            
            {/* Floating Element UI */}
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                className="absolute top-12 right-12 bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl max-w-[260px]"
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="flex -space-x-2">
                         {[1,2,3].map(i => (
                             <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">U{i}</div>
                         ))}
                    </div>
                    <span className="text-xs font-black text-[#e0692d]">+5 new</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="h-full bg-[#e0692d]" 
                    />
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 text-right">Activity Level</p>
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
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-200">En temps réel</span>
                </div>
                
                <h3 className="text-4xl font-black mb-6 leading-[1.1] tracking-tighter">
                  Ne manquez jamais <br />
                  <span className="text-orange-300 italic">l'essentiel.</span>
                </h3>
                
                <p className="font-medium text-white/90 leading-relaxed text-lg max-w-sm">
                   Vos interactions clients, alertes de sécurité et mises à jour importantes centralisées au même endroit.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

Notifications.defaultProps = {
  image1Src:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  image1Alt: 'Notifications Image',
}

Notifications.propTypes = {
  image1Src: PropTypes.string,
  image1Alt: PropTypes.string,
}

export default Notifications