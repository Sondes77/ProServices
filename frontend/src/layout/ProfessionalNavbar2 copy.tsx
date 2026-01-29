import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import logo from '../img/noBgColor5.png';
import { User as UserType } from '../utils/types';
import { 
  Home, 
  Briefcase, 
  MessageSquare, 
  Star, 
  User,
  Bell,
  Settings,
  LayoutDashboard ,
  LogOut,
  Sun,
  Moon,
  Menu as MenuIcon,
  X
} from 'lucide-react';

interface ProfessionalNavbarProps {
  user: UserType;
}

const ProfessionalNavbar : React.FC<ProfessionalNavbarProps> = ({user}) => {
  const defaultAvatar = '../img/ServicePro_Avatar.png'; // accessible via le dossier public
  const avatar = user?.avatar || defaultAvatar; // local preview
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nouveau message reçu", read: false },
    { id: 2, text: "Nouvel avis client", read: false },
    { id: 3, text: "Mise à jour de votre profil", read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  const handleLogout = () => {
    // Supprimer les données utilisateur
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  
    // Redirection sans possibilité de revenir en arrière
    window.location.replace('/connexion');
    window.history.pushState(null, '', '/connexion');
    window.onpopstate = function () {
      window.location.replace('/connexion');
    };
  };
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Profinder" 
                className="h-8 w-auto" 
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          {/*<div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              <Home className="w-5 h-5" />
              <span>Accueil</span>
            </Link>
            <Link to="/services" className="nav-link">
              <Briefcase className="w-5 h-5" />
              <span>Services</span>
            </Link>
            <Link to="/messages" className="nav-link">
              <MessageSquare className="w-5 h-5" />
              <span>Messages</span>
            </Link>
          </div>*/}

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

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

            {/* User Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Menu.Button>

              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profil
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/dashboard"
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Tableau de Bord
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/settings"
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Parametres
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Déconnexion
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Mobile Menu Button */}
            {/*<button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>*/}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* <Transition
        show={isMobileMenuOpen}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Home className="w-5 h-5 inline-block mr-2" />
              Accueil
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Briefcase className="w-5 h-5 inline-block mr-2" />
              Services
            </Link>
            <Link
              to="/messages"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MessageSquare className="w-5 h-5 inline-block mr-2" />
              Messages
            </Link>
          </div>
        </div>
      </Transition>*/}
    </nav>
  );
};

export default ProfessionalNavbar;