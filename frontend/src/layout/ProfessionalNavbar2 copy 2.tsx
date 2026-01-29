import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { 
  Home, Briefcase, MessageSquare, User, Bell, 
  Settings, LayoutDashboard, LogOut, Sun, Moon, 
  Menu as MenuIcon, X, CheckCircle2
} from 'lucide-react';
import logo from '../img/noBgColor5.png';
import { User as UserType } from '../utils/types';

interface ProfessionalNavbarProps {
  user: UserType;
}

const ProfessionalNavbar: React.FC<ProfessionalNavbarProps> = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nouveau message de Marie L.", read: false, time: "Il y a 2 min" },
    { id: 2, text: "Nouvel avis 5 étoiles reçu", read: false, time: "Il y a 1h" },
    { id: 3, text: "Profil vérifié avec succès", read: true, time: "Hier" }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const avatar = user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.nom + '&background=e0692d&color=fff';

  // --- Gestion du Dark Mode ---
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  // --- Fermeture clic extérieur ---
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/connexion', { replace: true });
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Services', path: '/mes-services', icon: Briefcase },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
  ];

  return (
    <nav className="fixed w-full z-[100] transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* --- LEFT: LOGO & NAV --- */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105">
              <img src={logo} alt="Profinder" className="h-10 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    location.pathname === link.path 
                      ? 'bg-[#e0692d]/10 text-[#e0692d]' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="flex items-center space-x-3">
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-[#e0692d] transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-[#e0692d] relative transition-colors"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute right-0 mt-4 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
                  >
                    <div className="p-4 bg-[#e0692d] text-white flex justify-between items-center">
                      <span className="font-bold">Notifications</span>
                      <button className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded-lg">Marquer tout lu</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${!n.read ? 'bg-orange-50/30 dark:bg-orange-900/10' : ''}`}>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{n.text}</p>
                          <span className="text-[10px] text-gray-400 uppercase mt-1 block">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Dropdown */}
            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:ring-2 ring-orange-500/20 transition-all border border-gray-100 dark:border-gray-700">
                <img src={avatar} alt="Profile" className="w-9 h-9 rounded-xl object-cover ring-2 ring-white dark:ring-gray-700" />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-black text-gray-900 dark:text-white truncate max-w-[80px]">{user?.nom}</p>
                  <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">Professionnel</p>
                </div>
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
            <div className="flex items-center justify-between mb-10">
              <span className="font-black text-xl text-[#e0692d]">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-50 dark:bg-gray-800 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-2 flex-grow">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-gray-800 text-slate-700 dark:text-white font-bold">
                  <link.icon size={22} className="text-[#e0692d]" /> {link.name}
                </Link>
              ))}
            </div>
            <button onClick={handleLogout} className="mt-auto flex items-center gap-4 p-4 rounded-2xl bg-red-50 text-red-600 font-bold">
              <LogOut size={22} /> Déconnexion
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ProfessionalNavbar;