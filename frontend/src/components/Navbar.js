import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-semibold text-blue-600">ProFinder</Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-lg text-gray-800 hover:text-blue-600">Accueil</Link>
            <Link to="/a-propos" className="text-lg text-gray-800 hover:text-blue-600">À propos</Link>
            <Link to="/contact" className="text-lg text-gray-800 hover:text-blue-600">Contact</Link>
            <Link to="/connexion" className="text-lg text-gray-800 hover:text-blue-600">Connexion</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button type="button" className="text-gray-800 focus:outline-none" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
