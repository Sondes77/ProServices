import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect  } from 'react';
import Test2 from './pages/test2';
import APropos from './pages/about';
//import Contact from './pages/contact';
//import ConditionsUtilisation from './pages/ConditionsUtilisation';
//import ConditionsGenerales from './pages/ConditionsGenerales';
import Connexion from './pages/sign-in';
import Inscription from './pages/sign-up';
//import MotDePasseOublie from './pages/MotDePasseOublie';
//import NouveauMotDePasse from './pages/NouveauMotDePasse';
//import ConfirmationEmail from './pages/ConfirmationEmail';
// Recherche from './pages/Recherche';
//import FichePro from './pages/FichePro';
//import Profil from './pages/Profil';
//import Parametres from './pages/Parametres';
//import MonCompte from './pages/pro/MonCompte';
//import PublierService from './pages/pro/PublierService';
//import MesServices from './pages/pro/MesServices';
//import ParametresPro from './pages/pro/ParametresPro';
//import AdminDashboard from './pages/admin/Dashboard';
import Recherche from './pages/recherche';
import NotFound from './pages/not-found'
import Navbar from './components/navbar8';
import Navbar2 from './landing/Navabr';
import NavbarPro2 from './layout/ProfessionalNavbar2';
import NavbarPro from './layout/ProfessionalNavbar';
import NavbarUser from './layout/UserNavbar';
import Footer2 from './components/footer15'
import Footer from './landing/Footer'
import DashboardLayout from './layout/DashboardLayout';
import ProfileOverview from './profile/ProfileOverview';
import PersonalInfo from './profile/PersonalInfo';
import PrivacySettings from './profile/PrivacySettings';
import Security from './profile/Security';
import Messages from './profile/Messages';
import Reviews from './profile/Reviews';
import Notifications from './profile/Notifications';
import Services from './profile/Services';
import ServiceDetail from './profile/ServiceDetail';
import FirstService from './profile/FirstService';
import PublicProfile from './profile/PublicProfile';
import PublicProfile2 from './profile/PublicProfile copy';
import UserProfile from './profile/UserProfile';
import SearchProfessionals from './profile/SearchProfessionals';
import AdminDashboard from './admin/AdminDashboard';
import AdminDash from './admin/AdminDash';
import PrivateRoute from './admin/PrivateRoute';
import Login from './admin/Login';
import Home from './pages/Home';
import About from './profile/About';
import MetiersPage from './profile/MetierPage';
import CategoriesPage from './profile/CategoriePage';
import Pricing from './profile/Pricing';
import Contact from './profile/Contact';
import Blog from './profile/Blog';
import EmailConfirmation from './profile/EmailConfirmation';
import PhoneConfirmation from './profile/PhoneConfirmation';
import ResetPassword from './profile/ResetPassword';
import AdvertisementRequest from './profile/AdvertisementRequest';
import AdvertisementAdmin from './profile/AdvertisementAdmin';
import LiveChat from './chat/LiveChat';
import ArticleDetail from './profile/ArticleDetail';
import { user, privacySettings, conversations, reviews, services } from './utils/mock-data';
import { User, PrivacySettings as PrivacySettingsType, Service } from './utils/types';
import { mapUserDataToUserModel } from './utils/mapper';
import ThreeCXChat from "./chat/ThreeCXChat";
import Statistics from './profile/Statistics';
import ForgotPassword from './profile/ForgotPassword';
import ProQuote from './profile/ProQuotesManager';
import UserQuote from './profile/ClientQuotesTracker';
import Cgu from './profile/CGU';
import MentionsLegales from './profile/MentionsLegales';
import PolitiqueConfidentialite from './profile/PolitiqueConfidentialite';
import GestionCookies from './profile/GestionCookies';
//import { io } from "socket.io-client";
import socket from './socket';
import './style.css';
import './tailwind.css';
import { urlBase } from './config.js';

function App() {
  //const [currentUser, setCurrentUser] = useState<User>(user);
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : user;
  });
  
  const [currentPrivacySettings, setCurrentPrivacySettings] = useState<PrivacySettingsType>(privacySettings);
  const [currentServices, setCurrentServices] = useState<Service[]>(services);
  const [activeSection, setActiveSection] = useState('overview');
  const [isPublicView, setIsPublicView] = useState(false);
  const token = localStorage.getItem('token');
  const [navbarType, setNavbarType] = useState<'pro' | 'user' | 'guest'>('guest');

  useEffect(() => {
    if (token && currentUser?.role === 'professional') {
      setNavbarType('pro');
    } else if (token && currentUser?.role === 'user') {
      setNavbarType('user');
    } else {
      setNavbarType('guest');
    }
  }, [token, currentUser]);

  //const socket = io("http://localhost:5000", { transports: ["websocket"] });
    // --- ⚡ Enregistrement socket pour cet utilisateur ---
  useEffect(() => {
    socket.on("connect", () => {
      //console.log("Socket connecté avec id", socket.id);
      socket.emit("user_connected", currentUser.id);
    });
  }, [currentUser.id]);

  const isUserInfoComplete = () => {
    const { phone, address, city, region } = currentUser;
    return phone && address && city && region;
  };

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);
    const handleUpdateUser = (updatedUserData: Partial<User>) => {
      setCurrentUser(prev => ({
        ...prev,
        ...updatedUserData
      }));
      // In a real app, you would call an API to update the user data
      //console.log('User data updated:', updatedUserData);
  };

  const handleUpdatePrivacySettings = (updatedSettings: PrivacySettingsType) => {
    setCurrentPrivacySettings(updatedSettings);
    // In a real app, you would call an API to update the settings
    //console.log('Privacy settings updated:', updatedSettings);
  };

  const handleAddService = () => {
    // In a real app, this would navigate to a service creation form
    //console.log('Add service clicked');
    //alert('Fonctionnalité d\'ajout de service à implémenter');
  };

  const handleEditService = (serviceId: string) => {
    // In a real app, this would navigate to a service edit form
    //console.log('Edit service clicked:', serviceId);
    //alert(`Édition du service ${serviceId} à implémenter`);
  };

  const handleDeleteService = async (serviceId: string) => {
    const userRes = await fetch(
      `${urlBase}/api/utilisateurId?id=${currentUser.id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  
    const userData = await userRes.json();
    if (!userRes.ok) {
      alert("Erreur lors de la récupération des données utilisateur");
      return;
    }
  
    const user = mapUserDataToUserModel(userData);
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.reload();
    //console.log('Service deleted:', serviceId);
  };

  // Toggle between public and private view
  const toggleView = () => {
    setIsPublicView(!isPublicView);
  };

  if (isPublicView) {
    return (
      <div>
        <button
          onClick={toggleView}
          className="fixed top-4 right-4 z-50 bg-[#e0692d] text-white px-4 py-2 rounded-md shadow hover:bg-[#f07e40] transition-colors duration-200"
        >
          Retour à mon profil
        </button>
        <PublicProfile2 
          user2={currentUser}
          //services={currentServices}
          reviews={reviews}
        />
      </div>
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <ProfileOverview 
            user={currentUser} 
            onEditProfile={() => setActiveSection('personal-info')}
          />
        );
      case 'personal-info':
        return (
          <PersonalInfo 
            user={currentUser} 
            onSave={handleUpdateUser}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings 
            settings={currentPrivacySettings} 
            onSave={handleUpdatePrivacySettings}
          />
        );
      //case 'security':
        //return <Security />;
      case 'messages':
        return <Messages user={currentUser} conversations={conversations}/>;
      case 'reviews':
        return <Reviews reviews={reviews} user={currentUser} />;
      case 'services':
        return (
          <Services 
            services={currentServices}
            onAddService={handleAddService}
            onEditService={handleEditService}
            onDeleteService={handleDeleteService}
          />
        );
      case 'notifications':
        return <Notifications user={currentUser} />;
      case 'devis':
        //if (currentUser.role === 'professional') {
          return <ProQuote user={currentUser} />;
      case 'mes-devis':
          return <UserQuote user={currentUser} />;
        /*case 'stats':
        return (
          <Statistics user={currentUser} />
        );*/
      default:
        return <ProfileOverview user={currentUser} onEditProfile={() => setActiveSection('personal-info')} />;
    }
  };
  
    return (
    
    <Router>
      {<div className="pb-16">
        {(navbarType === 'pro' || navbarType === 'user') && <NavbarPro2 user={currentUser} />}
        {navbarType === 'guest' && <Navbar2 />}
      </div>}
      {/*{verifNavbar()}*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        
        <Route path="/a-propos" element={<About />} /> 
        <Route path="/services" element={<MetiersPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/terms" element={<Cgu />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/gestion-cookies" element={<GestionCookies />} />
        {/* <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} /> */}
        {/* <Route path="/conditions-generales" element={<ConditionsGenerales />} /> */}
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
        <Route path="/business" element={<Inscription />} />
        <Route path="/recherche" element={<Recherche />} />
        
        <Route path="/recherche" element={<Recherche />} />
        {/*<Route path="/advertisement-request" element={<AdvertisementRequest />} />
        <Route path="/admin/advertisements" element={<AdvertisementAdmin />} />*/}

        <Route path="/search" element={<SearchProfessionals onViewProfile={(id) => id} />} />
        <Route path="/services/:metier" element={<SearchProfessionals onViewProfile={(id) => id} />} />
        <Route path="/services/:metier/:ville" element={<SearchProfessionals onViewProfile={(id) => id} />} />
        <Route path="/categories/:categorie" element={<SearchProfessionals onViewProfile={(id) => id} />} />
        <Route path="/categories/:categorie/:metier" element={<SearchProfessionals onViewProfile={(id) => id} />} />
        <Route path="/service/:categorie/:metier/:ville/:id" element={<ServiceDetail user2={currentUser}/>} />
        <Route path="/blog/:id" element={<ArticleDetail />} />
        <Route path="/proquote" element={<ProQuote user2={currentUser} />} />
        <Route path="/userquote" element={<UserQuote />} />
        <Route path="/blog/:id" element={<ArticleDetail />} />
        <Route path="/blog/:id" element={<ArticleDetail />} />
        {/*<Route path="/professional/:id" element={*/}
        <Route path="/pro/:metier/:ville/:slug/:id" element={
          <PublicProfile2
            user2={currentUser}
            //services={currentServices}
            reviews={reviews}
          />
        }/>
        <Route path="/pro/:slug/:id" element={
          <PublicProfile2
            user2={currentUser}
            //services={currentServices}
            reviews={reviews}
          />
        }/>
        <Route path="/user/:slug/:id" element={
          <UserProfile
            user2={currentUser}
            //services={currentServices}
            reviews={reviews}
          />
        }/>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={
          <PrivateRoute>
            <AdminDash />
          </PrivateRoute>
        } />
        <Route path="/confirm-email" element={
          <div className="flex items-center justify-center min-h-screen" style={{ minHeight: '120vh' }}>
            <div className="w-full max-w-2xl mx-4">
              <EmailConfirmation />
            </div>
          </div>} />
        <Route path="/confirm-phone" element={
          <div className="flex items-center justify-center min-h-screen" style={{ minHeight: '120vh' }}>
            <div className="w-full max-w-2xl mx-4">
              <PhoneConfirmation />
            </div>
          </div>} />
        <Route path="/reset-password/:token" element={
          <div className="flex items-center justify-center min-h-screen" style={{ minHeight: '120vh' }}>
            <div className="w-full max-w-2xl mx-4">
              <ResetPassword />
            </div>
          </div>} />
         {/* <Route path="/" element={<Dashboard />} />*/}
        <Route path="/personal-info" element={
          <div className="flex items-center justify-center min-h-screen" style={{ minHeight: '120vh' }}>
            <div className="w-full max-w-2xl mx-4">
              <PersonalInfo 
                user={currentUser} 
                onSave={handleUpdateUser}
              />
            </div>
          </div>
        }/>
        {/*<Route path="/mon-profile" element={
          <div className="flex items-center justify-center min-h-screen" style={{ minHeight: '120vh' }}>
            <div className="w-full max-w-2xl mx-4">
              <ProfileOverview 
                user={currentUser} 
                onEditProfile={() => setActiveSection('personal-info')}
              />
            </div>
          </div>
        }/>*/}
        <Route path="/service" element={
          <div className="flex items-center justify-center min-h-screen" style={{ minHeight: '120vh' }}>
          <FirstService 
          user={currentUser}
          onSubmit={handleAddService}
          onCancel={() => console.log('Service creation canceled')}
        />
        </div>
        }/>
        <Route path="/dashboard" element={
          <div className="flex-1">
            <DashboardLayout 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
              user={currentUser}
              onViewPublicProfile={toggleView}
            >
              {renderActiveSection()}
            </DashboardLayout>
          </div>
        }/>
        <Route path="/profile" element={
          <PublicProfile2
            user2={currentUser}
            reviews={reviews}
          />
        }/>
        <Route path="/settings" element={
          <DashboardLayout
            activeSection={activeSection}    // ✅ state
            setActiveSection={setActiveSection}
            user={currentUser}
            onViewPublicProfile={toggleView}
          >
            {renderActiveSection()}
          </DashboardLayout>
        } />
        
        <Route path="/notifications" element={
          <DashboardLayout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            user={currentUser}
            onViewPublicProfile={toggleView}
          >
            {renderActiveSection()}
          </DashboardLayout>
        } />
        <Route path="/mon-profile" element={
          <DashboardLayout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            user={currentUser}
            onViewPublicProfile={toggleView}
          >
            {renderActiveSection()}
          </DashboardLayout>
        } />
        <Route path="/messages" element={
          <DashboardLayout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            user={currentUser}
            onViewPublicProfile={toggleView}
          >
            {renderActiveSection()}
          </DashboardLayout>
        } />
        <Route path="/messages/:conversationId" element={
          <DashboardLayout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            user={currentUser}
            onViewPublicProfile={toggleView}
          >
            {renderActiveSection()}
          </DashboardLayout>
        } />
         <Route path="/devis/:Id" element={
          <DashboardLayout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            user={currentUser}
            onViewPublicProfile={toggleView}
          >
            {renderActiveSection()}
          </DashboardLayout>
        } />
        <Route path="/mes-devis" element={
          <DashboardLayout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            user={currentUser}
            onViewPublicProfile={toggleView}
          >
            {renderActiveSection()}
          </DashboardLayout>
        } />
        {/* <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} /> */}
        {/* <Route path="/nouveau-mot-de-passe" element={<NouveauMotDePasse />} /> */}
        {/* <Route path="/confirmation-email" element={<ConfirmationEmail />} /> */}
        {/* <Route path="/professionnel/:id" element={<FichePro />} /> */}
        {/* <Route path="/profil" element={<Profil />} /> */}
        {/* <Route path="/parametres" element={<Parametres />} /> */}

        {/* Professionnel Routes */}
        {/* <Route path="/mon-compte" element={<MonCompte />} /> */}
        {/* <Route path="/publier-un-service" element={<PublierService />} /> */}
        {/* <Route path="/mes-services" element={<MesServices />} /> */}
        {/* <Route path="/parametres-pro" element={<ParametresPro />} /> */}

        {/* Admin Routes */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

        
      </Routes>
      <ThreeCXChat />
      {/* <LiveChat />*/}
      <Footer />
    </Router>
  );
}

export default App;

