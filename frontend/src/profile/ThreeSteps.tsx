import { Search, MapPin, Users } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Choisissez votre métier',
    description: 'Plomberie, électricité, menuiserie et plus encore',
  },
  {
    icon: MapPin,
    title: 'Sélectionnez votre ville',
    description: 'Trouvez des professionnels près de chez vous',
  },
  {
    icon: Users,
    title: 'Découvrez les professionnels',
    description: 'Consultez les profils et contactez directement',
  },
];

export default function ThreeSteps() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          3 étapes faciles
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-orange-500 transition-all duration-500 hover:transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${idx * 0.2}s` }}
                >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 transition-shadow duration-300 animate-float" style={{ animationDelay: `${idx * 0.3}s` }}>
                    <Icon className="w-10 h-10 text-white animate-rotate-slow" />
                  </div>

                  <div className="text-center">
                    <div className="text-orange-500 font-bold text-5xl mb-4 opacity-20">
                      {idx + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
