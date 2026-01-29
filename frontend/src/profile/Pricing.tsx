import React from 'react';
import { Check, X } from 'lucide-react';
import Navbar from '../landing/Navabr';
import Footer from '../landing/Footer';

const Pricing = () => {
  const plans = [
    {
      name: 'Gratuit',
      price: '0€',
      description: 'Pour les particuliers à la recherche de professionnels',
      features: [
        { name: 'Recherche de professionnels', included: true },
        { name: 'Messagerie de base', included: true },
        { name: 'Profil personnel', included: true },
        { name: 'Publication d\'avis', included: true },
        { name: 'Support par email', included: true },
        { name: 'Accès prioritaire', included: false },
        { name: 'Badge vérifié', included: false },
        { name: 'Support prioritaire', included: false }
      ]
    },
    {
      name: 'Pro',
      price: '29.99€',
      period: 'par mois',
      description: 'Pour les professionnels qui veulent développer leur activité',
      popular: true,
      features: [
        { name: 'Recherche de professionnels', included: true },
        { name: 'Messagerie avancée', included: true },
        { name: 'Profil professionnel', included: true },
        { name: 'Publication d\'avis', included: true },
        { name: 'Support par email et téléphone', included: true },
        { name: 'Accès prioritaire', included: true },
        { name: 'Badge vérifié', included: true },
        { name: 'Support prioritaire', included: true }
      ]
    },
    {
      name: 'Entreprise',
      price: 'Sur mesure',
      description: 'Pour les entreprises avec des besoins spécifiques',
      features: [
        { name: 'Recherche de professionnels', included: true },
        { name: 'Messagerie illimitée', included: true },
        { name: 'Profil personnalisé', included: true },
        { name: 'Publication d\'avis', included: true },
        { name: 'Support dédié', included: true },
        { name: 'Accès prioritaire', included: true },
        { name: 'Badge vérifié', included: true },
        { name: 'API personnalisée', included: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <div className="max-w-7xl mx-auto pt-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Des tarifs simples et transparents
            </h1>
            <p className="mt-5 text-xl text-gray-500">
              Choisissez le plan qui correspond à vos besoins
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${
                  plan.popular ? 'ring-2 ring-[#e0692d]' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-3/3 bg-[#e0692d] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Populaire
                  </span>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="ml-1 text-xl font-semibold">{plan.period}</span>
                    )}
                  </p>
                  <p className="mt-6 text-gray-500">{plan.description}</p>

                  {/* Feature list */}
                  <ul className="mt-6 space-y-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex">
                        {feature.included ? (
                          <Check className="flex-shrink-0 w-6 h-6 text-[#e0692d]" />
                        ) : (
                          <X className="flex-shrink-0 w-6 h-6 text-gray-400" />
                        )}
                        <span className={`ml-3 ${
                          feature.included ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`mt-8 block w-full py-3 px-6 border rounded-md text-center font-medium ${
                    plan.popular
                      ? 'bg-[#e0692d] text-white hover:bg-[#f07e40]'
                      : 'bg-white text-[#e0692d] border-[#e0692d] hover:bg-gray-50'
                  }`}
                >
                  {plan.price === 'Sur mesure' ? 'Contactez-nous' : 'Commencer'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Questions fréquentes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Vous ne trouvez pas la réponse que vous cherchez ?{' '}
              <a href="/contact" className="font-medium text-[#e0692d] hover:text-[#f07e40]">
                Contactez-nous
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;