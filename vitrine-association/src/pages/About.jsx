import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Users, GraduationCap, HandHeart } from "lucide-react";

const features = [
  { icon: "📚", title: "Soutien scolaire", description: "Cours gratuits pour enfants du primaire au collège" },
  { icon: "🎨", title: "Ateliers artistiques", description: "Peinture, théâtre et musique pour s'épanouir" },
  { icon: "⚽", title: "Activités sportives", description: "Football et jeux éducatifs" },
  { icon: "🍎", title: "Goûters solidaires", description: "Distribution de repas nutritifs" },
  { icon: "🧠", title: "Accompagnement", description: "Soutien psychologique pour enfants en détresse" }
];

const stats = [
  { label: "Années d'action", value: 4, icon: Users, gradient: "from-emerald-500 to-teal-600" },
  { label: "Bénévoles actifs", value: 40, icon: HandHeart, gradient: "from-blue-500 to-indigo-600" },
  { label: "Enfants accompagnés", value: 200, icon: GraduationCap, gradient: "from-purple-500 to-pink-600" },
  { label: "Ateliers/mois", value: 12, icon: Heart, gradient: "from-orange-500 to-red-600" },
];

function CountUp({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return <span>{count}{suffix}</span>;
}

function AnimatedCard({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

export default function About() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-800 overflow-x-hidden">
      {/* Éléments flottants d'arrière-plan */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '20%'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
            right: '10%',
            bottom: '20%'
          }}
        />
      </div>

      {/* Header avec navigation */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-lg shadow-xl border-b border-white/20' 
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1
            className={`text-3xl font-bold cursor-pointer select-none transition-all duration-500 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 ${
              scrolled ? 'text-slate-800' : 'text-white'
            }`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Nour pour l'Enfance
          </h1>
          
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
          >
            <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${navOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-6 h-0.5 bg-current my-1 transition-all duration-300 ${navOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${navOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
          
          <ul className={`hidden md:flex gap-8 ${scrolled ? 'text-slate-700' : 'text-white'}`}>
            {["Accueil", "À propos", "Projets", "S'impliquer", "Contact"].map((item, idx) => (
              <li
                key={idx}
                className="relative cursor-pointer py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                {item}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300" />
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Section Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <div className="w-2 h-2 bg-white/20 rounded-full" />
          </div>
        ))}
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight">
              À Propos de
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Nour pour l'Enfance
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-blue-100 font-light mb-12 max-w-3xl mx-auto">
              Créée en 2020 à Casablanca pour offrir un avenir lumineux aux enfants
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                S'impliquer
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 transform hover:-translate-y-1">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Section Qui Sommes-Nous */}
      <section className="py-20 px-6 max-w-6xl mx-auto relative">
        <AnimatedCard>
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notre Identité
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Fondée le <span className="font-bold text-blue-600">28 janvier 2020</span> à <span className="font-bold text-blue-600">Casablanca</span>, 
              l'Association Nour pour l'Enfance est reconnue sous le statut d'association à but non lucratif (loi 1958).
            </p>
          </div>
        </AnimatedCard>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <AnimatedCard key={i} delay={i * 100}>
              <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <AnimatedCard>
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Notre Impact en Chiffres
          </h3>
        </AnimatedCard>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ label, value, suffix, icon: IconComponent, gradient }, i) => (
            <AnimatedCard key={i} delay={i * 150}>
              <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10 text-center">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {IconComponent && <IconComponent className="text-2xl text-white" />}
                  </div>
                  <h4 className={`text-4xl font-black mb-3 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                    <CountUp end={value} duration={2} suffix={suffix || ""} />
                  </h4>
                  <p className="font-semibold text-slate-600 group-hover:text-slate-800 transition-colors duration-300">
                    {label}
                  </p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Section Mission */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <AnimatedCard>
          <div className="relative p-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-8">Notre Engagement</h3>
              <blockquote className="text-2xl md:text-3xl font-light italic mb-6 leading-relaxed">
                "Chaque enfant mérite un avenir lumineux"
              </blockquote>
              <p className="text-blue-100 text-lg max-w-3xl mx-auto">
                Nous intervenons dans les domaines de <span className="font-semibold text-yellow-300">l'éducation</span>, 
                de la <span className="font-semibold text-yellow-300">protection infantile</span> et de 
                l'<span className="font-semibold text-yellow-300">épanouissement social</span> à travers 7 programmes clés.
              </p>
            </div>
          </div>
        </AnimatedCard>
      </section>

      {/* Section Vision */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <AnimatedCard>
          <div className="relative p-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 -translate-x-20" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 translate-x-16" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-8">Notre Vision</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto">
                Un Casablanca où chaque enfant, quelles que soient ses origines, a accès à l'éducation, 
                à la protection et à des activités épanouissantes.
                <br />
                <span className="font-semibold mt-4 block">
                  Ensemble, construisons cet avenir.
                </span>
              </p>
            </div>
          </div>
        </AnimatedCard>
      </section>

      {/* Pied de page */}
      <footer className="relative mt-20 bg-gradient-to-br from-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        
        <div className="relative z-10 py-12 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Restez Connectés
              </h4>
              <div className="flex justify-center space-x-6">
                {[
                  { icon: "LinkedIn", href: "#", color: "hover:text-blue-400" },
                  { icon: "Facebook", href: "https://facebook.com/AssociationNourEnfance", color: "hover:text-blue-500" },
                  { icon: "Instagram", href: "#", color: "hover:text-pink-400" },
                  { icon: "TikTok", href: "#", color: "hover:text-purple-400" }
                ].map(({ icon, href, color }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/10 backdrop-blur-sm rounded-full ${color} transition-all duration-300 transform hover:scale-110 hover:bg-white/20 text-sm font-semibold`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <p className="text-slate-300">
                © {new Date().getFullYear()} Association Nour pour l'Enfance. Tous droits réservés.
              </p>
              <p className="text-slate-400 mt-2">
                Rue 17, Quartier Sbata, Casablanca | contact@nour-enfance.org | +212 6 61 23 45 78
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}