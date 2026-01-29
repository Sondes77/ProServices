import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, Star, User } from 'lucide-react';
import logo from '../img/noBgColor5.png';

const UserNavbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src={logo}
                  alt="Profinder" 
                  className="h-8 w-auto" 
                />
                <span className="ml-2 text-xl font-bold text-[#e0692d]"></span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/') 
                    ? 'border-[#e0692d] text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Home className="h-4 w-4 mr-2" />
                Accueil
              </Link>

              <Link
                to="/search"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/search')
                    ? 'border-[#e0692d] text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Link>

              <Link
                to="/messages"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/messages')
                    ? 'border-[#e0692d] text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Link>

              <Link
                to="/reviews"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/reviews')
                    ? 'border-[#e0692d] text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Star className="h-4 w-4 mr-2" />
                Mes avis
              </Link>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              to="/profile"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/profile')
                  ? 'bg-[#e0692d] text-white'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Mon profil
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#e0692d]"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`flex items-center px-3 py-2 text-base font-medium ${
              isActive('/')
                ? 'bg-[#e0692d] text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <Home className="h-5 w-5 mr-2" />
            Accueil
          </Link>

          <Link
            to="/search"
            className={`flex items-center px-3 py-2 text-base font-medium ${
              isActive('/search')
                ? 'bg-[#e0692d] text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <Search className="h-5 w-5 mr-2" />
            Rechercher
          </Link>

          <Link
            to="/messages"
            className={`flex items-center px-3 py-2 text-base font-medium ${
              isActive('/messages')
                ? 'bg-[#e0692d] text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Messages
          </Link>

          <Link
            to="/reviews"
            className={`flex items-center px-3 py-2 text-base font-medium ${
              isActive('/reviews')
                ? 'bg-[#e0692d] text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <Star className="h-5 w-5 mr-2" />
            Mes avis
          </Link>

          <Link
            to="/profile"
            className={`flex items-center px-3 py-2 text-base font-medium ${
              isActive('/profile')
                ? 'bg-[#e0692d] text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <User className="h-5 w-5 mr-2" />
            Mon profil
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;