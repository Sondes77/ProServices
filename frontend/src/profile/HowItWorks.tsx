import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: 1,
    title: 'Vous cherchez un métier',
    description: 'Sélectionnez parmi plus de 20 métiers disponibles',
  },
  {
    number: 2,
    title: 'Vous choisissez une ville',
    description: 'Trouvez des professionnels dans votre région',
  },
  {
    number: 3,
    title: 'ServicePro affiche les meilleurs pros',
    description: 'Consultez les profils, avis et disponibilités',
  },
  {
    number: 4,
    title: 'Vous contactez directement',
    description: 'Échangez facilement avec le professionnel de votre choix',
  },
];

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, idx) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, idx]);
              }, idx * 300);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-slate-0">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center mb-4">
          Comment ça marche ?
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
          ServicePro simplifie votre recherche de professionnels qualifiés
        </p>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-orange-500 to-transparent" />

          {steps.map((step, idx) => {
            const isVisible = visibleSteps.includes(idx);
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`relative mb-12 last:mb-0 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-20' : 'translate-x-20'}`
                }`}
              >
                <div className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div className=" backdrop-blur-sm rounded-2xl p-8 border-1 border-[#e0692d] hover:border-[#e0692d] transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-500/50 animate-pulse"
                      style={{ animationDelay: `${idx * 0.2}s` }}
                    >
                      {step.number}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20" style={{ animationDelay: `${idx * 0.2}s` }} />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/50 to-orange-600/60 border-1 border-orange-500/50 rounded-full px-8 py-4">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-white font-semibold">
              Simple, rapide et efficace
            </span>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
