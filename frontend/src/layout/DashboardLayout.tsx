import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { User } from '../utils/types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPro from './ProfessionalNavbar';
import NavbarUser from './UserNavbar';
import Footer from '../landing/Footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: User;
  onViewPublicProfile: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activeSection, 
  setActiveSection,
  user,
  onViewPublicProfile
}) => {
  
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // ✅

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    //alert (token);
    if (!token) {
      navigate('/connexion', { replace: true });
    } else {
      setIsCheckingAuth(false); // ✅ Auth OK, on peut afficher
    }
  }, [navigate]);
  //alert(user.email_verified);
  if ((user.email_verified === false) && user.role === 'professional') {
    // Si l'email ou le téléphone n'est pas vérifié, rediriger vers la page de vérification
    //alert('Veuillez vérifier votre email et votre téléphone avant de continuer.');
    window.location.href = '/confirm-email';
  } 
  /*else if ((user.phone_verified === false) && user.role === 'professional') {
    // Si l'email ou le téléphone n'est pas vérifié, rediriger vers la page de vérification
    //alert('Veuillez vérifier votre email et votre téléphone avant de continuer.');
    window.location.href = '/confirm-phone';
  }*/
  else if ((user.lastName === '' || user.lastName === '' || user.city === '' || user.region === '' || user.phone === '' || user.address === '') && user.role === 'professional') {
    // Si le profil n'est pas complet, rediriger vers la page de profil
    //alert('Veuillez compléter votre profil avant de continuer.');
    window.location.href = '/personal-info';
  } else if ((user.stats.servicesPublished === 0) && user.role === 'professional') {
    // Si l'email ou le téléphone n'est pas vérifié, rediriger vers la page de vérification
    //alert('Veuillez vérifier votre email et votre téléphone avant de continuer.');
    window.location.href = '/service';
  }

  const verifNavbar = () => {
    if (user.role === 'professional')  {
      return <NavbarPro />;
    } else if (user.role === 'user') {
      return <NavbarUser />;
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  if (isCheckingAuth) return null;
  return (
 
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="md:block md:w-64 bg-white shadow-md">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          user={user}
          onViewPublicProfile={onViewPublicProfile}
        />
      </div>

      {/* Mobile Sidebar Toggle
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="ServicePro" 
              className="h-8 w-auto mr-2" 
            />
            <span className="font-bold text-[#e0692d]">ServicePro</span>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div> 

      {/* Mobile Sidebar 
      {!isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 z-40 bg-white shadow-md overflow-y-auto">
          <Sidebar 
            activeSection={activeSection} 
            setActiveSection={(section) => {
              setActiveSection(section);
              setIsMobileMenuOpen(false);
            }}
            user={user}
            onViewPublicProfile={onViewPublicProfile}
          />
        </div>
      )}*/}

      {/* Main Content */}
      <div className={`flex-1 ${isMobileMenuOpen ? 'hidden' : 'block'} md:block`}>
        <main className="p-4 md:p-8 sm:mt-4 md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;