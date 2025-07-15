import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Palette, Trophy, Heart, Users, Calendar, MapPin, Target, 
  ArrowRight, CheckCircle, X, Home, Info, Image as ImageIcon, Mail, 
  Phone, ChevronRight
} from "lucide-react";
import * as images from '../images';

const projects = [
  // ... (votre tableau de projets existant - gardez toutes vos entrées de projet)
];

const stats = [
  // ... (vos statistiques existantes - gardez toutes vos entrées de stats)
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export default function NosProjets() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const categories = ["Tous", "Éducation", "Art & Culture", "Sport & Santé", "Solidarité", "Innovation", "Loisirs"];

  const filteredProjects = selectedCategory === "Tous" 
    ? projects.slice(0, 3)
    : projects.filter(project => project.category === selectedCategory).slice(0, 3);

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
      {/* Background elements */}
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

      {/* Header with enhanced mobile navigation */}
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
            aria-label="Menu mobile"
            aria-expanded={navOpen}
          >
            {navOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <>
                <span className="block w-6 h-0.5 bg-white mb-1.5"></span>
                <span className="block w-6 h-0.5 bg-white mb-1.5"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
              </>
            )}
          </button>
          
          <ul className={`hidden md:flex gap-8 ${scrolled ? 'text-slate-700' : 'text-white'}`}>
            {[
              { label: "Accueil", path: "/", icon: Home },
              { label: "À propos", path: "/a-propos", icon: Info },
              { label: "Projets", path: "/projets", icon: Target },
              { label: "Galerie", path: "/galerie", icon: ImageIcon },
              { label: "Contact", path: "/contact", icon: Mail }
            ].map(({ label, path, icon: Icon }, idx) => (
              <li key={idx}>
                <a
                  href={path}
                  className={`relative flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 group ${
                    window.location.pathname === path ? "bg-white/20 font-bold" : ""
                  }`}
                  aria-current={window.location.pathname === path ? "page" : undefined}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* Enhanced Mobile Navigation */}
          <AnimatePresence>
            {navOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="md:hidden fixed inset-0 bg-white z-50 pt-24 px-6"
              >
                {/* Close button */}
                <button
                  onClick={() => setNavOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6 text-gray-800" />
                </button>

                {/* Navigation links */}
                <ul className="space-y-4 py-8">
                  {[
                    { label: "Accueil", path: "/", icon: Home },
                    { label: "À propos", path: "/a-propos", icon: Info },
                    { label: "Projets", path: "/projets", icon: Target },
                    { label: "Galerie", path: "/galerie", icon: ImageIcon },
                    { label: "Contact", path: "/contact", icon: Mail }
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1, type: 'spring' }}
                    >
                      <a
                        href={item.path}
                        className={`flex items-center justify-between py-4 px-4 text-lg font-medium rounded-xl transition-colors ${
                          window.location.pathname === item.path
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setNavOpen(false)}
                      >
                        <div className="flex items-center">
                          <item.icon className="w-6 h-6 mr-4" />
                          {item.label}
                        </div>
                        <ChevronRight className="w-5 h-5" />
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Contact section */}
                <div className="mt-12 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Contact rapide</h3>
                  <div className="space-y-3">
                    <a 
                      href="mailto:contact@nour-enfance.org" 
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Mail className="w-5 h-5 mr-3" />
                      contact@nour-enfance.org
                    </a>
                    <a 
                      href="tel:+212661234578" 
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Phone className="w-5 h-5 mr-3" />
                      +212 6 61 23 45 78
                    </a>
                  </div>
                </div>

                {/* CTA button */}
                <div className="mt-8">
                  <a
                    href="/contact"
                    className="flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-semibold rounded-xl hover:shadow-lg transition-all gap-2"
                    onClick={() => setNavOpen(false)}
                  >
                    Nous contacter
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Hero Section */}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight">
              Nos Projets
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                pour l'Enfance
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-blue-100 font-light mb-12 max-w-3xl mx-auto">
              Découvrez nos actions concrètes pour transformer la vie des enfants de Casablanca
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <button
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => window.location.href = "/impliquer"}
              >
                S'impliquer
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById('projets');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
              >
                En savoir plus
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <AnimatedCard>
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Notre Impact en Chiffres
          </h3>
        </AnimatedCard>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ label, value, icon: IconComponent, gradient }, i) => (
            <AnimatedCard key={i} delay={i * 150}>
              <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10 text-center">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-2xl text-white" />
                  </div>
                  <h4 className={`text-4xl font-black mb-3 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                    <CountUp end={value} duration={2} />
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

      {/* Filters Section */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <AnimatedCard>
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                    : 'bg-white/70 backdrop-blur-sm text-slate-700 hover:bg-white/90 border border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedCard>
      </section>

      {/* Projects Section */}
      <section className="pb-20 px-6 max-w-7xl mx-auto" id="projets">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <AnimatedCard key={project.id} delay={i * 100}>
              <motion.div
                whileHover={{ scale: 1.03, y: -10 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20 cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${project.gradient}`}>
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'En cours' ? 'bg-green-500' : 
                      project.status === 'En préparation' ? 'bg-orange-500' : 'bg-blue-500'
                    } text-white`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className={`inline-flex p-2 rounded-full bg-gradient-to-br ${project.gradient}`}>
                      <project.icon className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{project.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.startDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl" 
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-br ${selectedProject.gradient} mb-4`}>
                    <selectedProject.icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${selectedProject.gradient}`}>
                    {selectedProject.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-slate-800">Description du projet</h4>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {selectedProject.longDescription}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedProject.participants}</div>
                        <div className="text-sm text-slate-600">Participants</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{selectedProject.startDate}</div>
                        <div className="text-sm text-slate-600">Début</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-slate-800">Réalisations</h4>
                    <div className="space-y-3">
                      {selectedProject.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-slate-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200">
                        Soutenir ce projet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <AnimatedCard>
          <div className="relative p-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 -translate-x-20" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 translate-x-16" />
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-8">Rejoignez notre Mission</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto mb-8">
                Chaque projet a besoin de votre soutien pour grandir et toucher plus d'enfants.<br />
                <span className="font-semibold text-yellow-200">"Ensemble, construisons un avenir meilleur pour chaque enfant."</span>
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/impliquer"
                  className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:scale-105 transition-transform duration-200"
                >
                  S'impliquer
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 hover:scale-105 transition-transform duration-200"
                >
                  Nous contacter
                </a>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>

      {/* Footer */}
      <footer className="relative mt-20 bg-gradient-to-br from-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        
        <div className="relative z-10 py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Nour pour l'Enfance
              </h4>
              <p className="text-slate-300">
                Association à but non lucratif œuvrant pour l'éducation et l'épanouissement des enfants défavorisés à Casablanca.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                {[
                  { label: "Accueil", path: "/", icon: Home },
                  { label: "Nos Projets", path: "/projets", icon: Target },
                  { label: "Galerie", path: "/galerie", icon: ImageIcon },
                  { label: "Contact", path: "/contact", icon: Mail }
                ].map(({ label, path, icon: Icon }, idx) => (
                  <li key={idx}>
                    <a
                      href={path}
                      className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact</h4>
              <address className="not-italic text-slate-300">
                <p className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  Rue 17, Quartier Sbata, Casablanca
                </p>
                <p className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:contact@nour-enfance.org" className="hover:text-white">
                    contact@nour-enfance.org
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+212661234578" className="hover:text-white">
                    +212 6 61 23 45 78
                  </a>
                </p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-6 text-center text-slate-400">
            <p>© {new Date().getFullYear()} Association Nour pour l'Enfance. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}