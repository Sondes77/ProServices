import React from 'react';
import { Users, Target, Shield, Award } from 'lucide-react';
import Navbar from '../landing/Navabr';
import Footer from '../landing/Footer';

const About = () => {
  const stats = [
    { label: 'Utilisateurs actifs', value: '50K+' },
    { label: 'Professionnels', value: '10K+' },
    { label: 'Services réalisés', value: '100K+' },
    { label: 'Avis clients', value: '45K+' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Confiance',
      description: 'Nous vérifions rigoureusement chaque professionnel pour garantir la qualité de service.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque interaction et chaque service fourni.'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Nous construisons une communauté forte basée sur le respect et l\'entraide.'
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'Nous maintenons les plus hauts standards de qualité dans tous nos services.'
    }
  ];

  const team = [
    {
      name: 'Sophie Martin',
      role: 'CEO & Co-fondatrice',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      name: 'Thomas Dubois',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      name: 'Marie Laurent',
      role: 'Directrice Marketing',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-24">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-30"
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Team working"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Notre Histoire
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Depuis 2020, ProFinder révolutionne la façon dont les particuliers trouvent et engagent des professionnels qualifiés.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      {/*<div className="bg-[#e0692d]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-1 text-base text-white opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>*/}

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Notre Mission</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              ProFinder a pour mission de simplifier la mise en relation entre particuliers et professionnels qualifiés. 
              Nous croyons en la création d'une plateforme transparente, sécurisée et efficace qui bénéficie à tous.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Nos Valeurs</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="mx-auto h-12 w-12 bg-[#e0692d] rounded-full flex items-center justify-center">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{value.title}</h3>
                <p className="mt-2 text-base text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      {/*<div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Notre Équipe</h2>
            <p className="mt-4 text-lg text-gray-600">
              Des professionnels passionnés qui travaillent pour votre satisfaction
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <img
                    className="mx-auto h-48 w-48 rounded-full object-cover"
                    src={member.image}
                    alt={member.name}
                  />
                  <div className="absolute inset-0 rounded-full shadow-inner" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>*/}
    </div>
  );
};

export default About;