import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../img/noBgWhite2.png';
import logo2 from '../img/noBgColor5.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src={logo2}
                alt="ProFinder" 
                className="h-8 w-auto"
              />
              {/*<span className="ml-2 text-xl font-bold text-[#e0692d]">ProFinder</span>*/}
            </div>
            <p className="text-gray-400 mb-4">
              Trouvez le bon professionnel près de chez vous pour tous vos projets.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#e0692d]">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#e0692d]">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#e0692d]">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#e0692d]">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/a-propos" className="text-gray-400 hover:text-[#e0692d]">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#e0692d]">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#e0692d]">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/advertisement-request" className="text-gray-400 hover:text-[#e0692d]">
                  Publicité
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-[#e0692d]">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations légales</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/legal" className="text-gray-400 hover:text-[#e0692d]">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-[#e0692d]">
                  CGU
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-[#e0692d]">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-[#e0692d]">
                  Gestion des cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2" />
                123 Rue de Paris, 75000 Paris
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                01 23 45 67 89
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                contact@servicepro.tn
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ServicePro. Tous droits réservés. 
            Développé par <Link to="https://datavancia.com" style={{ color: '#F07E40' }} className="text-gray-400 hover:text-[#e0692d]" > Datavancia</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;