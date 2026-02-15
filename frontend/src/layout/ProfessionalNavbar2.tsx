import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { 
  Briefcase, MessageSquare, User, Bell, 
  Settings, LayoutDashboard, LogOut, Sun, Moon, 
  Menu as MenuIcon, X, Search, Message, ShieldCheck, CheckCircle
} from 'lucide-react';
import logo from '../img/noBgColor5.png';
import { User as UserType } from '../utils/types';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProfessionalNavbarProps {
  user: UserType;
}

const ProfessionalNavbar: React.FC<ProfessionalNavbarProps> = ({ user }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const notificationRef = useRef<HTMLDivElement>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const [showMessages, setShowMessages] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState([]);
  const hasPlayedRef = useRef(false);
  //const [markAllAsReadType, setMarkAllAsReadType] = useState<'all' | 'messages' | 'notifications'>('all');

  const unreadNotifications = notifications.filter(n => n.unread && n.type !== "message_received").length;
  const unreadMessages = notifications.filter(n => n.unread && n.type === "message_received").length;
  const newNotifiedNotifications = notifications.filter(n => n.unread && n.type !== "message_received" && !n.notified);
  const newNotifiedMessages = notifications.filter(n => n.unread && n.type === "message_received" && !n.notified);

  const avatar = user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.nom + '&background=e0692d&color=fff';
  const isProfessional = user?.role === 'professional';
  
  //const [unreadMessages, setUnreadMessages] = useState(7); // Exemple
  const token = localStorage.getItem('token');

  const timeAgo = (dateString: string) => {
    const date = parseISO(dateString); // si created_at est en ISO
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  };

  // Fonction pour jouer le son
  const playNotificationSound = () => {
    const audio = new Audio('/sounds/notification_message.wav');
    audio.play().catch(err => console.log("Audio play blocked", err));
  };

  // Simulation : jouer le son quand un message arrive
  useEffect(() => {
    const newNotified = notifications.filter(
      n => n.unread && !n.notified
    );
    
    if (unreadMessages > 0 && !currentPath.startsWith("/messages/") && newNotifiedMessages.length > 0) {
      playNotificationSound();
      markAsNotified(newNotified.map(n => n.id));
    }
    if (unreadNotifications > 0 && newNotifiedNotifications.length > 0) {
      playNotificationSound();
      markAsNotified(newNotified.map(n => n.id));
    }
   
    // ✅ Marquer comme notified
    //markAsNotified(newNotified.map(n => n.id));
    
  }, [unreadMessages, unreadNotifications]);

  const markAsNotified = async (ids: string[]) => {
    try {
      await fetch("http://localhost:5000/api/notifications/notified", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ids })
      });
    } catch (e) {
      console.log("Erreur update notified", e);
    }
  };

  /*const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: true })));
  };*/

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target as Node)
      ) {
        setShowMobileSearch(false);
        setSearchQuery("");
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        messageRef.current &&
        !messageRef.current.contains(e.target as Node)
      ) {
        setShowMessages(false);
      }
    };

    if (showMobileSearch || showNotifications || showMessages) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileSearch, showNotifications, showMessages]);
  
  /*useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);*/

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  
    // Redirection sans possibilité de revenir en arrière
    window.location.replace('/connexion');
    window.history.pushState(null, '', '/connexion');
    window.onpopstate = function () {
      window.location.replace('/connexion');
    };
  };
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notifications", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.status === 401) {
          handleLogout();
          return;
        }
        if (res.status === 403) throw new Error("Access denied");
        const data = await res.json();
        const newUnread = data.filter((n: any) => n.unread && n.type !== "message_received").length;
       
        // Jouer le son seulement si nouvelles notifications
        if (newUnread > unreadNotifications && newNotifiedNotifications.length > 0) playNotificationSound();

        setNotifications(data);
      } catch (err) { console.log(err); }
    };

    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/messages/unread", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          const data = await res.json();
          /*if (data.count > unreadMessages) {
            playNotificationSound();
          }*/
          //setUnreadMessages(data.count);
        } catch (err) { console.log(err); }
      };

      //fetchNotifications();
      //fetchMessages();

      const interval = setInterval(() => {
        fetchNotifications();
        fetchMessages();
            
      }, 1000); // toutes les 5 secondes

      return () => clearInterval(interval);
    }, [unreadNotifications, unreadMessages]);

    const markAllAsRead = async (type: string) => {
      try {
       
        await fetch(`http://localhost:5000/api/notifications/read-all`, {
          method: 'PATCH',
          body: JSON.stringify({
            type: type
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

    const markAsRead = async (id: string) => {
      try {
        await fetch(`http://localhost:5000/api/notifications/read/${id}`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` }
        });

        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
      } catch (err) {
        console.error(err);
      }
    };
    const handleNotificationClick = async (notif) => {
      if (notif.unread)
        await markAsRead(notif.id);
        window.location.href = ("http://localhost:3000")+notif.link;
    };

  const groupedMessageNotifs = Object.values(
    notifications
      .filter(n => n.type === "message_received")
      .reduce((acc: any, notif: any) => {
        const key = notif.user_id2;

        if (!acc[key]) {
          acc[key] = {
            ...notif,
            count: 1,
            unreadCount: notif.unread ? 1 : 0,
            lastDate: notif.created_at
          };
        } else {
          acc[key].count += 1;

          if (notif.unread) {
            acc[key].unreadCount += 1;
            //playNotificationSound();
          }

          // garder le + récent
          if (new Date(notif.created_at) > new Date(acc[key].lastDate)) {
            acc[key].lastDate = notif.created_at;
            acc[key].text = notif.text;
            acc[key].title = notif.title;
            acc[key].photo = notif.photo;
            acc[key].link = notif.link;
          }
        }

        return acc;
      }, {})
  )
  .sort(
    (a: any, b: any) =>
      new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime()
  );

  /*const groupedMessageNotifs = React.useMemo(() => {
      const map = new Map();

      notifications
        .filter(n => n.type === "message_received")
        .forEach(n => {
          const key = n.user_id2; // ID de la personne

          if (!map.has(key)) {
            map.set(key, {
              ...n,
              count: 1,
              unreadCount: n.unread ? 1 : 0
            });
          } else {
            const existing = map.get(key);
            existing.count += 1;
            if (n.unread) existing.unreadCount += 1;

            // garder le plus récent
            if (new Date(n.created_at) > new Date(existing.created_at)) {
              existing.created_at = n.created_at;
              existing.text = n.text;
            }
          }
        });

      return Array.from(map.values())
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }, [notifications]);*/


  return (
    <nav className="fixed w-full z-[100] transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
         {/* --- GAUCHE : LOGO --- */}
        <div className="flex items-center shrink-0">
          <Link to="/" className="transition-transform hover:scale-105 flex items-center" >
            <img src={logo} alt="ServicePro" className="h-7 sm:h-8 md:h-9 lg:h-10 w-auto object-contain select-none" />
          </Link>
        </div>

          {/* --- CENTRE : BARRE DE RECHERCHE (DESKTOP SEULEMENT) --- */}
          {/* --- CENTRE : BARRE DE RECHERCHE (DESKTOP) --- */}
          {currentPath !== "/search" && (
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form 
              className="relative w-full group"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(`/search?motcle=${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
                }
              }}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search 
                  size={18} 
                  className="text-slate-400 group-focus-within:text-[#e0692d] transition-colors" 
                />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un service, un pro..."
                className="w-full bg-slate-100 dark:bg-gray-800 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#e0692d]/50 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none text-slate-900 dark:text-white"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden xl:inline-flex items-center gap-1 px-2 py-0.5 border border-slate-300 dark:border-gray-600 rounded text-[10px] font-bold text-slate-400">
                ENTER
              </kbd>
            </form>
          </div>
          )}
          {/* --- DROITE : ACTIONS --- */}
          <div className="flex items-center space-x-2 md:space-x-4">
            
            {/* Nav Links Desktop */}
            <div className="hidden lg:flex items-center space-x-1 mr-2 border-r border-slate-200 dark:border-gray-700 pr-4">
              <span className="text-center text-[#e0692d] text-sm font-bold transition-all italic hidden md:block">Contactez-nous : +216 55 289 528 </span>
              {/*{navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                    location.pathname === link.path 
                      ? 'bg-[#e0692d]/10 text-[#e0692d]' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <link.icon size={18} />
                  <span className="hidden xl:inline">{link.name}</span>
                </Link> 
              ))}*/}
            </div>

            {/* Theme Toggle */}
            {/*<button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>*/}
              {currentPath !== "/search" && currentPath !== "/" && (
                <button
                  onClick={() => setShowMobileSearch(prev => !prev)}
                  className="lg:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Search size={20} />
                </button>
              )}
            {/* Notifications */}
            
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNotifications(prev => !prev);
                  }}
                  className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-[#e0692d] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-gray-900">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                <Transition
                  show={showNotifications}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notifications</h3>
                        <button onClick={() => markAllAsRead("notifications")} className="text-xs text-[#e0692d] font-bold">Tout marquer comme lu</button>
                      </div>

                      <div className="space-y-1 max-h-80 overflow-y-auto">
                        {/* Exemple de liste de messages */}
                        {notifications
                        .filter(n => n.type !== "message_received")
                        .slice(0, 5)
                        .map(notification => (
                          <Link 
                            key = {notification.id} 
                            to = {notification.link} 
                            className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-50 dark:border-gray-700 last:border-0" ${
                            notification.unread 
                              ? 'bg-orange-50/30 border-orange-100 hover:border-orange-200' 
                              : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-md'
                          }`}
                          onClick={() => {
                            handleNotificationClick(notification);
                            setShowNotifications(false);
                          }}
                          >
                            <div className="w-12 h-12 rounded-full center bg-orange-100 flex-shrink-0" >
                              
                              {notification?.user2_role === "professional" ? (
                                <div className="relative w-12 h-12">
                                  <img
                                    src={notification.photo}
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
                                  src={notification.photo}
                                  alt="Profile"
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              )}
                             
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{notification.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{notification.text}</p>
                              <p className="text-xs text-orange-500 dark:text-orange-400 truncate">{notification.created_at && timeAgo(notification.created_at)}</p>
                            </div>
                            {notification.unread == true &&  (
                            <div className="w-2 h-2 bg-[#e0692d] rounded-full" />
                            )}
                          </Link>
                        ))}
                      </div>
                      {/* ✅ NOUVEAU — Voir toutes */}
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to="/notifications"
                        onClick={() => setShowNotifications(false)}
                        className="block text-center text-sm font-medium text-[#e0692d] hover:text-[#f07e40]"
                      >
                        Afficher toutes les notifications →
                      </Link>
                    </div>
                    </div>
                  </div>
                </Transition>
              </div>
              {/* Messages Dropdown */}
              <div className="relative" ref={messageRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMessages(prev => !prev);
                  }}
                  className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative"
                >
                  <MessageSquare className="w-5 h-5" />
                  {unreadMessages > 0 && unreadMessages <= 99 ? (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-[#e0692d] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-gray-900">
                      {unreadMessages}
                    </span>
                  ) : unreadMessages > 99 ? (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-[#e0692d] text-white text-[10px] font-bold rounded-full w-7 h-5 flex items-center justify-center border-2 border-white dark:border-gray-900">
                      99+
                    </span>
                  ) : null}
                </button>

                <Transition
                  show={showMessages}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Messages</h3>
                        <Link to="/messages" onClick={() => { markAllAsRead("message_received");}} className="text-xs text-[#e0692d] font-bold">Ouvrir tout</Link>
                      </div>

                      <div className="space-y-1 max-h-80 overflow-y-auto">
                        {/* Exemple de liste de messages */}
                        {groupedMessageNotifs.slice(0, 10).map(notification => (
                          <Link 
                            key = {notification.id} 
                            to = {notification.link} 
                            className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-50 dark:border-gray-700 last:border-0" ${
                            notification.unread 
                              ? 'bg-orange-50/30 border-orange-100 hover:border-orange-200' 
                              : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-md'
                          }`}
                          onClick={() => {
                            handleNotificationClick(notification);
                            setShowMessages(false);
                          }}
                          >
                            <div className="w-12 h-12 rounded-full center bg-orange-100 flex-shrink-0" >
                               {notification?.user2_role === "professional" ? (
                                <div className="relative w-12 h-12">
                                  <img
                                    src={notification.photo}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover"
                                  />

                                  <CheckCircle size={12}
                                    className="flex absolute bottom-0 right-0
                                              bg-[#e0692d] w-4 h-4 text-white rounded-full 
                                              border-2 border-[#e0692d] shadow"
                                  />
                                  {/*<span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-[#e0692d] to-yellow-400 shadow-xl animate-ping"></span>
                                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#e0692d] shadow-md"></span>*/}
                                </div>
                              ) : (
                                <img
                                  src={notification.photo}
                                  alt="Profile"
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{notification.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{notification.text}</p>
                              <p className="text-xs text-orange-500 dark:text-orange-400 truncate">{notification.created_at && timeAgo(notification.created_at)}</p>
                            </div>
                            {notification.unreadCount > 0 && (
                                <span className="bg-[#e0692d] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                  {notification.unreadCount }
                                </span>
                              )}
                            {/*{notification.unread == true &&  (
                            <div className="w-2 h-2 bg-[#e0692d] rounded-full" />
                            )}*/}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>

            {/* User Dropdown */}
            <HeadlessMenu as="div" className="relative ml-2">
              <HeadlessMenu.Button className="flex items-center gap-2 p-1 pr-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-slate-100 dark:border-gray-700 hover:shadow-md transition-all">
                <img src={avatar} alt="Profile" className="w-8 h-8 rounded-xl object-cover" />
                {user?.role === 'professional' && (
                  <p className="hidden md:block text-xs font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                    Pro
                  </p>
                )}
              </HeadlessMenu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <HeadlessMenu.Items className="absolute right-0 mt-3 w-56 origin-top-right bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 focus:outline-none overflow-hidden">
                  <div className="p-2 space-y-1">
                    {[
                      ...(isProfessional ? [{ name: 'Profil Pro', path: '/profile', icon: User }] : []),
                      { name: 'Message', path: '/messages', icon: MessageSquare },
                      { name: 'Dashboard', path: '/mon-profile', icon: LayoutDashboard },
                      { name: 'Paramètres', path: '/settings', icon: Settings },
                    ].map((item) => (
                      <HeadlessMenu.Item key={item.path}>
                        {({ active }) => (
                          <Link to={item.path} className={`${active ? 'bg-orange-50 dark:bg-orange-900/20 text-[#e0692d]' : 'text-gray-600 dark:text-gray-300'} flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors`}>
                            <item.icon size={18} /> {item.name}
                          </Link>
                        )}
                      </HeadlessMenu.Item>
                    ))}
                    <div className="h-px bg-gray-100 dark:bg-gray-800 mx-2 my-1" />
                    <HeadlessMenu.Item>
                      {({ active }) => (
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                          <LogOut size={18} /> Déconnexion
                        </button>
                      )}
                    </HeadlessMenu.Item>
                  </div>
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>
            {/* --- MOBILE SEARCH BAR --- */}
            {showMobileSearch && currentPath !== "/search" && (
              <div
                ref={mobileSearchRef}
                className="lg:hidden fixed top-20 left-0 right-0 z-[99] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 shadow-sm"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      setShowMobileSearch(false);
                      navigate(`/search?motcle=${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
                    }
                  }}
                  className="relative"
                >
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un service, un pro..."
                    className="
                      w-full
                      bg-slate-100 dark:bg-gray-800
                      rounded-2xl
                      py-3 pl-11 pr-4
                      text-sm font-medium
                      focus:ring-2 focus:ring-[#e0692d]/50
                      outline-none
                      text-slate-900 dark:text-white
                    "
                  />
                </form>
              </div>
            )}
          
            {/* Mobile Menu Button 
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>*/}
          </div>

        </div>
      </div>

      {/* --- MOBILE SIDEBAR --- 
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="lg:hidden fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-gray-900 shadow-2xl z-[101] p-6 flex flex-col"
          >*/}
            {/* Contenu mobile identique à la version précédente 
          </motion.div>
        )}
      </AnimatePresence>*/}
    </nav>
  );
};

export default ProfessionalNavbar;