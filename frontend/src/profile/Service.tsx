import React from 'react';
import { Wrench, Zap, Paintbrush, Home as HomeIcon, Laptop, Hammer, CheckCircle, ArrowRight } from 'lucide-react';
import { user } from '../utils/mock-data';
import NavbarPro from '../layout/ProfessionalNavbar';
import NavbarUser from '../layout/UserNavbar';
import Navbar from '../landing/Navabr';

const ServicesPage = () => {
  const services = [
    {
      icon: Wrench,
      name: 'Plomberie',
      description: 'Installation, réparation et maintenance de systèmes de plomberie',
      features: [
        'Réparation de fuites',
        'Installation de sanitaires',
        'Débouchage de canalisations',
        'Chauffe-eau et chauffage'
      ]
    },
    {
      icon: Zap,
      name: 'Électricité',
      description: 'Services électriques pour particuliers et professionnels',
      features: [
        'Installation électrique',
        'Mise aux normes',
        'Dépannage d\'urgence',
        'Éclairage'
      ]
    },
    {
      icon: Paintbrush,
      name: 'Peinture',
      description: 'Travaux de peinture intérieure et extérieure',
      features: [
        'Peinture intérieure',
        'Peinture extérieure',
        'Revêtements muraux',
        'Décoration'
      ]
    },
    {
      icon: HomeIcon,
      name: 'Ménage',
      description: 'Services de nettoyage professionnel',
      features: [
        'Nettoyage régulier',
        'Grand ménage',
        'Nettoyage de vitres',
        'Entretien'
      ]
    },
    {
      icon: Laptop,
      name: 'Développement',
      description: 'Services de développement web et applications',
      features: [
        'Sites web',
        'Applications mobiles',
        'E-commerce',
        'Maintenance'
      ]
    },
    {
      icon: Hammer,
      name: 'Bricolage',
      description: 'Petits travaux et réparations diverses',
      features: [
        'Montage de meubles',
        'Fixations murales',
        'Petites réparations',
        'Aménagement'
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-36">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-30"
            src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Services background"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nos Services
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Des professionnels qualifiés pour tous vos besoins
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-[#e0692d] rounded-lg flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                      <p className="mt-1 text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#e0692d] mt-1" />
                          <span className="ml-3 text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <button className="inline-flex items-center text-[#e0692d] font-medium hover:text-[#f07e40]">
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#e0692d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Prêt à trouver votre professionnel ?
            </h2>
            <p className="mt-4 text-xl text-white opacity-90">
              Des milliers de professionnels qualifiés vous attendent
            </p>
            <div className="mt-8">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#e0692d] bg-white hover:bg-gray-50">
                Rechercher maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;