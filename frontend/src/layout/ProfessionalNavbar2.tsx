import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { 
  Briefcase, MessageSquare, User, Bell, 
  Settings, LayoutDashboard, LogOut, Sun, Moon, 
  Menu as MenuIcon, X, Search
} from 'lucide-react';
import logo from '../img/noBgColor5.png';
import { User as UserType } from '../utils/types';

interface ProfessionalNavbarProps {
  user: UserType;
}

const ProfessionalNavbar: React.FC<ProfessionalNavbarProps> = ({ user }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const notificationRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nouveau message de Marie L.", read: false, time: "Il y a 2 min" },
    { id: 2, text: "Nouvel avis 5 étoiles reçu", read: false, time: "Il y a 1h" },
  ]);
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadCount = notifications.filter(n => !n.read).length;
  const avatar = user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.nom + '&background=e0692d&color=fff';

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

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

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Mes Services', path: '/mes-services', icon: Briefcase },
  ];

  return (
    <nav className="fixed w-full z-[100] transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* --- GAUCHE : LOGO --- */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="transition-transform hover:scale-105">
              <img src={logo} alt="Profinder" className="h-9 w-auto" />
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
              <span className="text-center text-[#e0692d] text-sm font-bold transition-all italic  hidden md:block">Contactez-nous : +216 55 289 528 </span>
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

            {/* Notifications */}
            
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <Transition
                  show={showNotifications}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-[#e0692d] hover:text-[#f07e40]"
                        >
                          Tout marquer comme lu
                        </button>
                      </div>
                      <div className="space-y-3">
                        {notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-md ${
                              notification.read
                                ? 'bg-gray-50 dark:bg-gray-700'
                                : 'bg-blue-50 dark:bg-blue-900'
                            }`}
                          >
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                              {notification.text}
                            </p>
                          </div>
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
                <p className="hidden md:block text-xs font-black text-gray-900 dark:text-white uppercase tracking-tighter">Pro</p>
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
                      { name: 'Profil Pro', path: '/profile', icon: User },
                      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="lg:hidden fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-gray-900 shadow-2xl z-[101] p-6 flex flex-col"
          >
            {/* Contenu mobile identique à la version précédente */}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ProfessionalNavbar;