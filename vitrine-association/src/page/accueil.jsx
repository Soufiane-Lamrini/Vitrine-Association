import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Users, GraduationCap, HandHeart, BookOpen, Paintbrush, Utensils, Activity, ArrowRight } from "lucide-react";
import * as images from '../images';

// Composants réutilisés
function CountUp({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.floor(start));
      if (start >= end) clearInterval(timer);
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return <span>{count}{suffix}</span>;
}

function AnimatedCard({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
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

  // Données pour la page d'accueil
  const homeData = {
    features: [
      {
        title: "Éducation Alternative",
        description: "Programmes adaptés aux besoins spécifiques des enfants défavorisés",
        icon: <BookOpen className="w-8 h-8" />,
        color: "from-blue-500 to-indigo-600"
      },
      {
        title: "Activités Créatives",
        description: "Ateliers artistiques pour développer l'expression personnelle",
        icon: <Paintbrush className="w-8 h-8" />,
        color: "from-purple-500 to-pink-600"
      },
      {
        title: "Soutien Psychologique",
        description: "Accompagnement personnalisé pour surmonter les traumatismes",
        icon: <Heart className="w-8 h-8" />,
        color: "from-red-500 to-orange-600"
      },
      {
        title: "Intégration Sociale",
        description: "Activités collectives pour favoriser les liens et la confiance en soi",
        icon: <Users className="w-8 h-8" />,
        color: "from-emerald-500 to-teal-600"
      }
    ],
    testimonials: [
      {
        quote: "Grâce à Nour, ma fille a retrouvé confiance en elle et le goût d'apprendre.",
        author: "Fatima, mère d'une bénéficiaire",
        role: "Parent"
      },
      {
        quote: "Les ateliers m'ont aidé à m'exprimer et à découvrir des talents que j'ignorais.",
        author: "Mehdi, 12 ans",
        role: "Bénéficiaire"
      },
      {
        quote: "Une association qui fait un travail remarquable avec des moyens limités.",
        author: "Dr. Karim Benjelloun",
        role: "Partenaire médical"
      }
    ],
    stats: [
      { value: 200, label: "Enfants accompagnés", icon: GraduationCap },
      { value: 35, label: "Activités mensuelles", icon: Activity },
      { value: 40, label: "Bénévoles engagés", icon: HandHeart },
      { value: 4, label: "Années d'action", icon: Users }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-800 overflow-x-hidden">
      {/* Éléments flottants d'arrière-plan */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          style={{
            transform: translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px),
            left: '10%',
            top: '20%'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"
          style={{
            transform: translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px),
            right: '10%',
            bottom: '20%'
          }}
        />
      </div>

      {/* Header identique */}
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
            <div className={w-6 h-0.5 bg-current transition-all duration-300 ${navOpen ? 'rotate-45 translate-y-1.5' : ''}} />
            <div className={w-6 h-0.5 bg-current my-1 transition-all duration-300 ${navOpen ? 'opacity-0' : ''}} />
            <div className={w-6 h-0.5 bg-current transition-all duration-300 ${navOpen ? '-rotate-45 -translate-y-1.5' : ''}} />
          </button>
          
          <ul className={hidden md:flex gap-8 ${scrolled ? 'text-slate-700' : 'text-white'}}>
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

      {/* Section Hero légèrement modifiée */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800"
          style={{
            transform: translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)
          }}
        />
        
        {/* Animated particles */}
        {Array.from({ length: 20 }).map((_, i) => {
          const left = ${(i * 37) % 100}%;
          const top = ${(i * 53) % 100}%;
          const animationDelay = ${(i * 0.3) % 3}s;
          const animationDuration = ${3 + ((i * 0.7) % 2)}s;
          return (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left,
                top,
                animationDelay,
                animationDuration
              }}
            >
              <div className="w-2 h-2 bg-white/20 rounded-full" />
            </div>
          );
        })}
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight">
              Éduquer, Épanouir,
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Transformer
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-blue-100 font-light mb-12 max-w-3xl mx-auto">
              Association Nour pour l'Enfance - Agir pour un avenir meilleur à Casablanca
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                Faire un don
              </button>
              <button 
                onClick={() => document.getElementById('actions').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
              >
                Nos actions
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

      {/* Section Notre Engagement */}
      <section id="actions" className="py-20 px-6 max-w-6xl mx-auto">
        <AnimatedCard>
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notre Engagement
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Chaque jour, nous agissons sur <span className="font-bold text-blue-600">4 piliers fondamentaux</span> pour offrir aux enfants les 
              <span className="font-bold text-blue-600"> outils nécessaires</span> à leur épanouissement.
            </p>
          </div>
        </AnimatedCard>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {homeData.features.map((feature, i) => (
            <AnimatedCard key={i} delay={i}>
              <div className={h-full p-8 bg-gradient-to-br ${feature.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 flex flex-col items-center text-center}>
                <div className="mb-6 p-4 bg-white/20 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/90">{feature.description}</p>
                <button className="mt-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-all flex items-center gap-2">
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Section Chiffres Clés */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedCard>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                En Chiffres
              </h3>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                L'impact concret de nos actions depuis 2020
              </p>
            </div>
          </AnimatedCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeData.stats.map((stat, i) => (
              <AnimatedCard key={i} delay={i}>
                <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/20 text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-bold mb-2 text-blue-600">
                    <CountUp end={stat.value} duration={2} />
                  </div>
                  <p className="text-lg text-slate-700">{stat.label}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedCard>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ils Parlent de Nous
              </h3>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Les voix de ceux qui vivent notre action au quotidien
              </p>
            </div>
          </AnimatedCard>

          <div className="grid md:grid-cols-3 gap-8">
            {homeData.testimonials.map((testimonial, i) => (
              <AnimatedCard key={i} delay={i * 0.2}>
                <div className="h-full p-8 bg-slate-50 rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-100">
                  <div className="text-5xl font-serif text-slate-300 mb-6">"</div>
                  <p className="text-lg text-slate-700 italic mb-8">{testimonial.quote}</p>
                  <div className="border-t border-slate-200 pt-6">
                    <p className="font-bold text-slate-800">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section Call-to-Action */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <AnimatedCard>
          <div className="relative p-12 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 rounded-3xl shadow-2xl text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 -translate-x-20" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 translate-x-16" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-8">Prêt à Nous Soutenir ?</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto mb-10">
                Que ce soit par un don, du bénévolat ou simplement en partageant notre action, chaque geste compte pour transformer la vie des enfants.
              </p>
              <div className="flex gap-6 justify-center flex-wrap">
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  Faire un don
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 transform hover:-translate-y-1">
                  Devenir bénévole
                </button>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>

      {/* Footer identique */}
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
                    className={p-3 bg-white/10 backdrop-blur-sm rounded-full ${color} transition-all duration-300 transform hover:scale-110 hover:bg-white/20 text-sm font-semibold}
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