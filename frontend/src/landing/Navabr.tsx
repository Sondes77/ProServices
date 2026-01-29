import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, LogIn, Briefcase } from 'lucide-react';
import logo from '../img/noBgColor5.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    
    <nav className="bg-white shadow-md fixed w-full z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative flex items-center h-16">
      
      {/* LEFT – LOGO */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="ProFinder" className="h-8 w-auto" />
        </Link>
      </div>

      {/* CENTER – DESKTOP NAVIGATION */}
      {/*<div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-10">
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/a-propos" className="nav-link">À propos</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>*/}
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
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un service, un pro..."
              className="w-full bg-slate-100 dark:bg-gray-800 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#e0692d]/50 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none text-slate-900 dark:text-white"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden xl:inline-flex items-center gap-1 px-2 py-0.5 border border-slate-300 dark:border-gray-600 rounded text-[10px] font-bold text-slate-400">
              ENTRER
            </kbd>
          </form>
        </div>
      )}
      {/* RIGHT – ACTIONS */}
      <div className="ml-auto hidden md:flex items-center space-x-4">
        
        {/* Nav Links Desktop */}
          <div className="hidden lg:flex items-center space-x-1 mr-2 border-r border-slate-200 dark:border-gray-700 pr-4">
            <span className="text-center text-[#e0692d] text-sm font-semibold transition-all italic  hidden md:block">Contactez-nous : +216 55 289 528 </span>
            
          </div>
          
        <Link
          to="/business"
          className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full group flex items-center gap-2 px-5 py-2.5 text-slate-600 font-bold text-sm hover:text-[#e0692d] transition-all"
        >
          <Briefcase size={18} className="group-hover:rotate-12 transition-transform" />
          Espace Pro
        </Link>
        <Link
          to="/connexion"
          className="bg-[#e0692d] text-white hover:bg-[#f07e40] px-4 py-2 rounded-full text-sm font-medium flex items-center"
        >
          <LogIn size={16} className="mr-2" />
          Connexion
        </Link>
        
      </div>

      {/* MOBILE BUTTON */}
      <div className="md:hidden ml-auto flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-[#e0692d]"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </div>
  </div>

  {/* MOBILE MENU */}
  {isMenuOpen && (
    <div className="md:hidden bg-white shadow">
      <div className="px-4 py-3 space-y-2">
        <Link to="/" className="mobile-link">Accueil</Link>
        <Link to="/a-propos" className="mobile-link">À propos</Link>
        <Link to="/services" className="mobile-link">Services</Link>
        <Link to="/contact" className="mobile-link">Contact</Link>
        <Link to="/search" className="mobile-link">Rechercher</Link>
        <Link to="/connexion" className="mobile-link bg-[#e0692d] text-white">
          Connexion
        </Link>
      </div>
    </div>
  )}
</nav>

  );
};

export default Navbar;