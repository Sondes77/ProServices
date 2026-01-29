import { Briefcase, TrendingUp, Users, Award } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const benefits = [
  {
    icon: Users,
    title: 'Visibilité accrue',
    description: 'Attirez plus de clients dans votre région',
  },
  {
    icon: TrendingUp,
    title: 'Croissance garantie',
    description: 'Développez votre activité rapidement',
  },
  {
    icon: Award,
    title: 'Profil professionnel',
    description: 'Mettez en valeur vos compétences',
  },
  {
    icon: Briefcase,
    title: 'Gestion simplifiée',
    description: 'Gérez vos demandes facilement',
  },
];

export default function ForProfessionals() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="perspective-1000 cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
          >
            <div
              className={`relative w-full mb-20 transition-transform duration-700 transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <div
                className="w-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 shadow-2xl backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-center">
                  <div className="inline-block p-4 bg-white/20 rounded-2xl mb-6">
                    <Briefcase className="w-16 h-16 text-white" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Vous êtes professionnel ?
                  </h2>
                  <p className="text-xl text-white/90 mb-8">
                    Survolez cette carte pour découvrir les avantages
                  </p>
                  <div className="flex items-center justify-center gap-2 text-white/80">
                    <span className="text-sm">Survolez</span>
                    <svg
                      className="w-6 h-6 animate-bounce"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-0 w-full bg-slate-800 rounded-3xl p-12 shadow-2xl backface-hidden border-2 border-orange-500"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
                  Créez votre profil en 2 minutes
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {benefits.map((benefit, idx) => {
                    const Icon = benefit.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-4 bg-slate-700/50 rounded-xl p-4 hover:bg-slate-700 transition-colors"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center">
                  <Link to="/business" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/50">
                    Créer mon profil maintenant
                  </Link>
                  {/*<p className="text-gray-400 text-sm mt-4">
                    Gratuit les 30 premiers jours — Sans engagement
                  </p>*/}
                </div>
              </div>
            </div>
          </div>

          {/*<div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-100/50 backdrop-blur-sm rounded-xl p-6 border-1 border-[#e0692d]">
              <div className="text-4xl font-bold text-orange-500 mb-2">2,500+</div>
              <div className="text-gray-500">Professionnels actifs</div>
            </div>
            <div className="bg-slate-100/50 backdrop-blur-sm rounded-xl p-6 border-1 border-[#e0692d]">
              <div className="text-4xl font-bold text-orange-500 mb-2">50,000+</div>
              <div className="text-gray-500">Demandes par mois</div>
            </div>
            <div className="bg-slate-100/50 backdrop-blur-sm rounded-xl p-6 border-1 border-[#e0692d]">
              <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
              <div className="text-gray-500">Satisfaction client</div>
            </div>
          </div>*/}
        </div>
      </div>
    </section>
  );
}
