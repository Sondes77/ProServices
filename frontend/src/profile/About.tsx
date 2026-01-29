import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Shield, Award, CheckCircle2, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Utilisateurs actifs', value: '1K+', icon: Users },
    { label: 'Professionnels', value: '300+', icon: Shield },
    { label: 'Services réalisés', value: '250+', icon: CheckCircle2 },
    { label: 'Avis clients', value:'800+', icon: Award }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Confiance',
      description: 'Chaque professionnel passe par un processus de vérification strict pour votre tranquillité.',
      color: 'bg-blue-500'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous ne nous contentons pas du bien, nous visons la perfection dans chaque mise en relation.',
      color: 'bg-[#e0692d]'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Un écosystème solidaire où la réputation est le moteur de la réussite.',
      color: 'bg-purple-500'
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'Le respect des normes et la satisfaction client sont inscrits dans notre ADN.',
      color: 'bg-emerald-500'
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* --- HERO SECTION AVEC PARALLAXE --- */}
      <section className="relative h-[70vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Team working"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        
        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#e0692d] font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Qui sommes-nous ?
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-6"
          >
            L'excellence du <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e0692d] to-orange-400">service local.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed"
          >
            Nous bâtissons le pont entre vos besoins les plus complexes et les artisans les plus talentueux de votre région.
          </motion.p>
        </div>
      </section>

      {/* --- STATS SECTION (FLOATING CARDS) --- */}
      <section className="relative z-20 -mt-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center"
            >
              <div className="inline-flex p-3 rounded-2xl bg-orange-50 text-[#e0692d] mb-4">
                <stat.icon size={28} />
              </div>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- MISSION SECTION (SPLIT LAYOUT) --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">
              Une mission simple : <br />
              <span className="text-[#e0692d]">Digitaliser la confiance.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600">
              <p>
                Le marché des services à domicile a longtemps souffert d'un manque de transparence. ProFinder est né de la volonté de redonner le pouvoir aux clients tout en valorisant le savoir-faire des artisans.
              </p>
              <ul className="space-y-4">
                {['Mise en relation instantanée', 'Garantie de satisfaction', 'Tarification transparente'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <span className="font-semibold text-slate-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square bg-gradient-to-tr from-orange-100 to-transparent rounded-full absolute -top-10 -right-10 w-64 h-64 z-0" />
            <img 
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Notre mission" 
              className="relative z-10 rounded-3xl shadow-2xl object-cover h-[500px] w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* --- VALEURS SECTION (MODERN GRID) --- */}
      <section className="py-24 bg-slate-900 text-white rounded-[3rem] mx-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Nos Valeurs Fondamentales</h2>
            <p className="text-slate-400">Ce qui nous guide au quotidien pour vous servir.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className={`w-14 h-14 ${val.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <val.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION (REFINED) --- */}
      {/*<section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">L'équipe derrière la vision</h2>
              <p className="text-slate-600">Des experts passionnés unis par une seule ambition : faciliter votre quotidien.</p>
            </div>
            <button className="bg-slate-100 text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-all">
              Rejoindre l'aventure
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-[2.5rem] mb-6 aspect-[4/5]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white text-sm">"L'innovation au service de l'humain est notre priorité."</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-[#e0692d] font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* --- FOOTER CTA --- */}
      <section className="pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto py-16 border-t border-slate-100">
          <h2 className="text-3xl font-bold mb-8 italic">"Simplifier la vie de millions de gens est un voyage que nous venons de commencer."</h2>
          <div className="flex justify-center gap-4">
            <div className="h-1 w-12 bg-[#e0692d] rounded-full" />
            <div className="h-1 w-4 bg-slate-200 rounded-full" />
            <div className="h-1 w-4 bg-slate-200 rounded-full" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;