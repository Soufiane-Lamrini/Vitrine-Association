import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, GraduationCap, HandHeart, BookOpen, Paintbrush, Utensils, Activity } from "lucide-react";
import * as images from '../images';

// Données structurées
const aboutData = {
  features: [
    { 
      icon: <BookOpen className="w-8 h-8" />, 
      title: "Soutien scolaire", 
      description: "Programmes éducatifs personnalisés du primaire au collège",
      stats: "12 matières couvertes"
    },
    { 
      icon: <Paintbrush className="w-8 h-8" />, 
      title: "Ateliers artistiques", 
      description: "Expression créative à travers peinture, théâtre et musique",
      stats: "8 ateliers/mois"
    },
    { 
      icon: <Activity className="w-8 h-8" />, 
      title: "Activités sportives", 
      description: "Football, basket et jeux éducatifs pour le développement physique",
      stats: "3 entraîneurs diplômés"
    },
    { 
      icon: <Utensils className="w-8 h-8" />, 
      title: "Nutrition", 
      description: "Goûters équilibrés et éducation alimentaire",
      stats: "200 repas/jour"
    }
  ],
  stats: [
    { label: "Années d'action", value: 4, icon: Users, gradient: "from-emerald-500 to-teal-600" },
    { label: "Bénévoles actifs", value: 40, icon: HandHeart, gradient: "from-blue-500 to-indigo-600" },
    { label: "Enfants accompagnés", value: 200, icon: GraduationCap, gradient: "from-purple-500 to-pink-600" },
    { label: "Interventions/mois", value: 35, icon: Heart, gradient: "from-orange-500 to-red-600" },
  ],
  timeline: [
    { year: "2020", event: "Fondation à Casablanca", description: "Création avec 5 bénévoles" },
    { year: "2021", event: "Agrément officiel", description: "Reconnue d'utilité publique" },
    { year: "2022", event: "Premier centre éducatif", description: "Ouverture à Sbata" },
    { year: "2023", event: "Extension des programmes", description: "3 nouvelles activités lancées" },
    { year: "2024", event: "Prix de l'innovation sociale", description: "Reconnaissance nationale" },
    { year: "2025", event: "Projet d'école alternative", description: "Ouverture prévue en septembre" }
  ],
  team: [
    {
      name: "Soufiane Lamrini",
      role: "Co-fondateur & Directeur",
      bio: "Expert en développement associatif avec 10 ans d'expérience dans le secteur social. Diplômé en gestion de projets sociaux et fort d'une expérience internationale dans le domaine de l'éducation alternative.",
      img: images.soufianeLamrini
    },
    {
      name: "Charaf Eddine Jador",
      role: "Co-fondateur & Coordinateur",
      bio: "Spécialiste en éducation alternative et développement des compétences chez les jeunes. Ancien enseignant et formateur, il a développé des méthodes pédagogiques innovantes adaptées aux enfants défavorisés.",
      img: images.charaf,
    }
  ]
};

// Composants optimisés
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

      {/* Header */}
<header
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
    scrolled 
      ? 'bg-white/90 backdrop-blur-lg shadow-xl border-b border-white/20' 
      : 'bg-transparent'
  }`}
  aria-label="Navigation principale"
>
  <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
    <h1
      tabIndex={0}
      className={`text-3xl font-bold cursor-pointer select-none transition-all duration-500 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 ${
        scrolled ? 'text-slate-800' : 'text-white'
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Nour pour l'Enfance - Retour à l'accueil"
    >
      Nour pour l'Enfance
    </h1>

    <button
      onClick={() => setNavOpen(!navOpen)}
      className="md:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={navOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
      aria-expanded={navOpen}
    >
      <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${navOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
      <div className={`w-6 h-0.5 bg-current my-1 transition-all duration-300 ${navOpen ? 'opacity-0' : ''}`} />
      <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${navOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
    </button>

    <ul className={`hidden md:flex gap-8 ${scrolled ? 'text-slate-700' : 'text-white'}`}>
      {[
        { label: "Accueil", path: "/" },
        { label: "À propos", path: "/a-propos" },
        { label: "Projets", path: "/projets" },
        { label: "Galerie", path: "/galerie" },
        { label: "S'impliquer", path: "/impliquer" },
        { label: "Contact", path: "/contact" }
      ].map(({ label, path }, idx) => (
        <li key={idx}>
          <a
            href={path}
            className={`relative block cursor-pointer py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 group ${
              window.location.pathname === path ? "bg-white/20 font-bold" : ""
            }`}
            aria-current={window.location.pathname === path ? "page" : undefined}
          >
            {label}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300" />
          </a>
        </li>
      ))}
    </ul>

    <AnimatePresence>
      {navOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 pt-24"
          onClick={() => setNavOpen(false)}
        >
          <motion.div 
            className="bg-white shadow-2xl rounded-t-3xl overflow-hidden"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="py-6 px-4 space-y-4">
              {[
                { label: "Accueil", path: "/" },
                { label: "À propos", path: "/a-propos" },
                { label: "Projets", path: "/projets" },
                { label: "Galerie", path: "/galerie" },
                { label: "S'impliquer", path: "/impliquer" },
                { label: "Contact", path: "/contact" }
              ].map(({ label, path }, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.2 }}
                >
                  <a
                    href={path}
                    className={`block py-4 px-6 text-lg rounded-xl transition-colors ${
                      window.location.pathname === path 
                        ? "bg-blue-100 text-blue-600 font-semibold" 
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                    aria-current={window.location.pathname === path ? "page" : undefined}
                    onClick={() => {
                      setNavOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-6 pb-8 pt-4 bg-gray-50">
              <button 
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md"
                onClick={() => {
                  setNavOpen(false);
                  window.location.href = "/impliquer";
                }}
              >
                Faire un don
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
        {Array.from({ length: 20 }).map((_, i) => {
          const left = `${(i * 37) % 100}%`;
          const top = `${(i * 53) % 100}%`;
          const animationDelay = `${(i * 0.3) % 3}s`;
          const animationDuration = `${3 + ((i * 0.7) % 2)}s`;
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
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
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
              <button 
                onClick={() => document.getElementById('mission').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
              >
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

      {/* Section Mission */}
      <section id="mission" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <AnimatedCard>
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notre Mission
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Offrir à chaque enfant les <span className="font-bold text-blue-600">outils éducatifs</span>, 
              le <span className="font-bold text-blue-600">soutien psychologique</span> et les 
              <span className="font-bold text-blue-600"> activités épanouissantes</span> nécessaires à son développement.
            </p>
          </div>
        </AnimatedCard>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutData.features.map((feature, i) => (
            <AnimatedCard key={i} delay={i}>
              <div className="h-full p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/20 flex flex-col">
                <div className="mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 mb-4 flex-grow">{feature.description}</p>
                <p className="text-sm text-blue-500 font-medium">{feature.stats}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Section Chiffres Clés */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedCard>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Notre Impact
              </h3>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Des résultats concrets grâce à l'engagement de notre communauté
              </p>
            </div>
          </AnimatedCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.stats.map((stat, i) => (
              <AnimatedCard key={i} delay={i}>
                <div className={`p-8 rounded-xl bg-gradient-to-br ${stat.gradient} text-white text-center shadow-lg`}>
                  <div className="text-5xl font-bold mb-2">
                    <CountUp end={stat.value} duration={2} />
                  </div>
                  <p className="text-lg">{stat.label}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section Histoire */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <AnimatedCard>
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notre Histoire
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Le parcours qui a façonné notre association
            </p>
          </div>
        </AnimatedCard>

        <div className="relative">
          <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2 hidden md:block" />
          
          {aboutData.timeline.map((item, i) => (
            <AnimatedCard key={i} delay={i}>
              <div className={`mb-12 w-full flex ${i % 2 === 0 ? "md:flex-row flex-col" : "md:flex-row-reverse flex-col"}`}>
                <div className="md:w-1/2 px-4 md:px-8">
                  <div className={`p-6 bg-white rounded-lg shadow-md border border-slate-100 relative ${
                    i % 2 === 0 ? "md:text-right text-left" : "text-left"
                  }`}>
                    <div className={`absolute top-1/2 w-4 h-4 rounded-full bg-blue-600 transform -translate-y-1/2 hidden md:block ${
                      i % 2 === 0 ? "-right-2" : "-left-2"
                    }`} />
                    <h3 className="text-xl font-bold text-blue-600">{item.year}</h3>
                    <h4 className="text-lg font-semibold mb-2 text-slate-800">{item.event}</h4>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
                <div className="md:w-1/2"></div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Section Équipe - Cartes agrandies */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedCard>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Notre Équipe
              </h3>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Des professionnels engagés au service des enfants
              </p>
            </div>
          </AnimatedCard>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {aboutData.team.map((member, i) => (
              <AnimatedCard key={i} delay={i * 0.2}>
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all h-full transform hover:-translate-y-2">
                  <div className="h-80 relative overflow-hidden">
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23" + (i === 0 ? '3b82f6' : '8b5cf6') + "' width='400' height='400'/%3E%3Ctext fill='%23ffffff' font-family='sans-serif' font-size='80' dy='.35em' text-anchor='middle' x='200' y='200'%3E" + member.name.split(' ')[0].charAt(0) + member.name.split(' ')[1].charAt(0) + "%3C/text%3E%3C/svg%3E"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">{member.name}</h3>
                        <p className={`text-lg font-medium ${i === 0 ? 'text-blue-600' : 'text-purple-600'}`}>{member.role}</p>
                      </div>
                      <div className="flex space-x-3">
                        <a href="#" className={`${i === 0 ? 'text-blue-500 hover:text-blue-700' : 'text-purple-500 hover:text-purple-700'}`}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className={`${i === 0 ? 'text-blue-400 hover:text-blue-600' : 'text-purple-400 hover:text-purple-600'}`}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a href="#" className={`${i === 0 ? 'text-blue-600 hover:text-blue-800' : 'text-purple-600 hover:text-purple-800'}`}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section Vision */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <AnimatedCard>
          <div className="relative p-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 -translate-x-20" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 translate-x-16" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-8">Notre Vision</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto">
                Nous rêvons d'un Maroc où chaque enfant, quel que soit son milieu, bénéficie d'une éducation de qualité, d'un environnement protecteur et
                d'activités qui nourrissent son cœur, son esprit et ses rêves. Un Maroc où chaque enfant a la chance de s'épanouir et de construire son avenir en toute dignité.
              </p>
              <p className="font-semibold mt-6 text-yellow-200">
                Ensemble, construisons cet avenir.
              </p>
            </div>
          </div>
        </AnimatedCard>
      </section>

      {/* Footer */}
      <footer className="relative mt-12 bg-gradient-to-br from-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        
        <div className="relative z-10 py-8 sm:py-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Restez Connectés
              </h4>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {[
                  { icon: "LinkedIn", href: "#", color: "hover:text-blue-400" },
                  { icon: "Facebook", href: "https://facebook.com/AssociationNourEnfance", color: "hover:text-blue-500" },
                  { icon: "Instagram", href: "#", color: "hover:text-pink-400" },
                  { icon: "TikTok", href: "#", color: "hover:text-purple-400" }
                ].map(({icon, href, color}, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-2 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full ${color} transition-all duration-300 hover:scale-105 hover:bg-white/20 text-xs sm:text-sm font-medium`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6 sm:pt-8">
              <p className="text-xs sm:text-sm text-slate-300">
                © {new Date().getFullYear()} Association Nour pour l'Enfance. Tous droits réservés.
              </p>
              <div className="text-xs text-slate-400 mt-2 space-y-1">
                <p>Rue 17, Quartier Sbata, Casablanca</p>
                <p>contact@nour-enfance.org | +212 6 61 23 45 78</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}