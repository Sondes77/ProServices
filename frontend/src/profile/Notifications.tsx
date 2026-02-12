import React, { useState, useEffect } from 'react'
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
  Star,
  CheckCircle,
} from 'lucide-react';
import { User } from '../utils/types';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

// Données simulées (Mock Data)
/*const INITIAL_NOTIFICATIONS = [
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
  {
    id: 6,
    type: 'message',
    title: 'Bienvenue !',
    message: 'Merci d\'avoir rejoint notre communauté de professionnels.',
    time: 'Hier',
    unread: false,
  },
  {
    id: 7,
    type: 'message',
    title: 'Bienvenue !',
    message: 'Merci d\'avoir rejoint notre communauté de professionnels.',
    time: 'Hier',
    unread: false,
  },
  {
    id: 8,
    type: 'message',
    title: 'Bienvenue !',
    message: 'Merci d\'avoir rejoint notre communauté de professionnels.',
    time: 'Hier',
    unread: false,
  },
  {
    id: 9,
    type: 'message',
    title: 'Bienvenue !',
    message: 'Merci d\'avoir rejoint notre communauté de professionnels.',
    time: 'Hier',
    unread: false,
  },
  {
    id: 10,
    type: 'message',
    title: 'Bienvenue !',
    message: 'Merci d\'avoir rejoint notre communauté de professionnels.',
    time: 'Hier',
    unread: false,
  },
  {
    id: 11,
    type: 'message',
    title: 'Bienvenue !',
    message: 'Merci d\'avoir rejoint notre communauté de professionnels.',
    time: 'Hier',
    unread: false,
  },
  {
    id: 12,
    type: 'message',
    title: 'Bienvenue !',
    message: 'Merci d\'avoir rejoint notre communauté de professionnels.',
    time: 'Hier',
    unread: false,
  },
  {
    id: 13,
    type: 'message',
    title: 'Bienvenue !',
    message: 'Merci d\'avoir rejoint notre communauté de professionnels.',
    time: 'Hier',
    unread: false,
  },
  {
    id: 14,
    type: 'message',
    title: 'Bienvenue !',
    message: 'Merci d\'avoir rejoint notre communauté de professionnels.',
    time: 'Hier',
    unread: false,
  },
  {
    id: 15,
    type: 'message',
    title: 'Bienvenue !',
    message: 'Merci d\'avoir rejoint notre communauté de professionnels.',
    time: 'Hier',
    unread: false,
  },
];*/

interface NotificationsProps {
  user: User;
}

const Notifications: React.FC<NotificationsProps> = ({ user }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const timeAgo = (dateString: string) => {
    const date = parseISO(dateString); // si created_at est en ISO
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  };
  // =========================
  // FETCH NOTIFICATIONS
  // =========================
  const fetchNotifications = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (res.status === 401 || res.status === 403) {

      Swal.fire({
        title: "Session expirée",
        text: "Vous allez être redirigé vers la page de connexion.",
        icon: "warning",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "center",
        customClass: {
          popup: "rounded-2xl shadow-lg",
        }
      });

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        window.location.href = "/connexion";
      }, 2000);
      
      return;
    }

      const data = await res.json();

      setNotifications(data);
     
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // =========================
  // ACTIONS API
  // =========================

  const markAsRead = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/read/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, unread: false } : n)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`http://localhost:5000/api/notifications/read-all`, {
        method: 'PATCH',
        body: JSON.stringify({
          type: "notifications"
        }),
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread' ) return n.unread;
    return true;
  });

  const unreadCount = notifications.filter(n => n.unread && n.type !== "message_received").length;

  // =========================
  // HELPERS
  // =========================

  const formatTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleString();
  };

  // Helper pour l'icône selon le type
  const getIcon = (type) => {
    switch (type) {
      case 'security': return <ShieldAlert size={20} className="text-red-500" />;
      case 'success': return <CheckCircle2 size={20} className="text-green-500" />;
      case 'message_received': return <MessageSquare size={20} className="text-blue-500" />;
      case 'review_received': return <Star size={20} className="text-orange-500" />;
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

  const handleNotificationClick = async (notif) => {
    await markAsRead(notif.id);

    if (notif.link && String(notif.user_id) !== String(user.id)) {
      window.location.href = notif.link;
    }
    else {
      window.location.href = "/mes-devis";
    }
  };
  // =========================
  // RENDER
  // =========================

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="mt-2 flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background Ambience
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#e0692d]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />*/}

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl w-full md:mx-4 flex bg-white rounded-[0.5rem] shadow-2xl overflow-hidden relative z-10 border border-slate-100 h-[calc(95vh-2rem)] lg:h-[calc(120vh-2rem)]"
      >
        
        {/* CÔTÉ GAUCHE : LISTE DES NOTIFICATIONS */}
        <div className="w-full lg:w-full flex flex-col h-full">
          
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
                filteredNotifications
                  .filter(n => n.type !== "message_received")
                  .map(notif => (
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
                    onClick={() => handleNotificationClick(notif)}
                  >
                    <div className="flex gap-4 items-start">
                      {/* Icone */}
                      {notif?.user2_role === "professional" ? (
                        <div className="relative w-12 h-12">
                          <img
                            src={notif.photo}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                          />

                          <CheckCircle size={12}
                            className="flex absolute bottom-0 right-0
                                      bg-[#e0692d] w-4 h-4 text-white rounded-full 
                                      border-2 border-[#e0692d] shadow"
                          />
                        </div>
                      ) : (
                        <img
                          src={notif.photo}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}

                      {/* Contenu */}
                      <div className="flex-1 min-w-0 pr-8">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-sm font-bold truncate ${notif.unread ? 'text-slate-900' : 'text-slate-600'}`}>
                            {notif.title}
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
                            <Clock size={10} /> {timeAgo(notif.created_at)}
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${notif.unread ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                          {notif.text}
                        </p>
                      </div>

                      {/* Indicateur Unread */}
                      {notif.unread == true &&  (
                        <div className="absolute top-6 right-4 w-2 h-2 rounded-full bg-[#e0692d]" />
                      )}

                      {/* Bouton Supprimer (visible au hover) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notif.id);
                        }}
                        className="absolute bottom-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg group-hover:opacity-100 transition-all"
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

      </motion.div>
    </div>
  )
}


Notifications.propTypes = {
  image1Src: PropTypes.string,
  image1Alt: PropTypes.string,
}

export default Notifications