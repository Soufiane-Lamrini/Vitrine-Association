import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Palette, Trophy, Heart, Users, Calendar, MapPin, Target, ArrowRight, CheckCircle } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Soutien Scolaire",
    category: "Éducation",
    description: "Accompagnement personnalisé pour la réussite scolaire des enfants",
    longDescription: "Notre programme de soutien scolaire offre un accompagnement personnalisé aux enfants du primaire au collège. Nous proposons des cours de rattrapage, de l'aide aux devoirs et un suivi individualisé pour garantir la réussite de chaque enfant.",
    icon: BookOpen,
    gradient: "from-blue-500 to-indigo-600",
    image: "/images/soutien-scolaire.jpg",
    status: "En cours",
    participants: 85,
    startDate: "Sept 2023",
    achievements: [
      "85 enfants accompagnés",
      "Amélioration de 75% des notes",
      "12 bénévoles mobilisés",
      "3 centres d'apprentissage"
    ]
  },
  {
    id: 2,
    title: "Ateliers Créatifs",
    category: "Art & Culture",
    description: "Expression artistique et développement de la créativité",
    longDescription: "Les ateliers créatifs permettent aux enfants de s'exprimer à travers l'art. Peinture, théâtre, musique et artisanat sont au programme pour développer leur créativité et leur confiance en soi.",
    icon: Palette,
    gradient: "from-purple-500 to-pink-600",
    image: "/images/ateliers-creatifs.jpg",
    status: "En cours",
    participants: 42,
    startDate: "Jan 2024",
    achievements: [
      "42 enfants participants",
      "5 expositions organisées",
      "8 ateliers différents",
      "Partenariat avec 2 écoles d'art"
    ]
  },
  {
    id: 3,
    title: "Sport pour Tous",
    category: "Sport & Santé",
    description: "Activités sportives pour le bien-être physique et mental",
    longDescription: "Le programme Sport pour Tous encourage l'activité physique chez les enfants. Football, basketball, courses et jeux collectifs contribuent à leur développement physique et à l'esprit d'équipe.",
    icon: Trophy,
    gradient: "from-emerald-500 to-teal-600",
    image: "/images/sport.jpg",
    status: "En cours",
    participants: 68,
    startDate: "Mars 2023",
    achievements: [
      "68 enfants actifs",
      "3 tournois organisés",
      "Terrain de sport aménagé",
      "Matériel sportif fourni"
    ]
  },
  {
    id: 4,
    title: "Aide Alimentaire",
    category: "Solidarité",
    description: "Distribution de repas et goûters nutritifs aux enfants",
    longDescription: "Le programme d'aide alimentaire garantit l'accès à une alimentation équilibrée pour tous les enfants. Nous organisons des distributions de repas et sensibilisons à l'importance de la nutrition.",
    icon: Heart,
    gradient: "from-orange-500 to-red-600",
    image: "/images/aide-alimentaire.jpg",
    status: "En cours",
    participants: 150,
    startDate: "Fév 2020",
    achievements: [
      "150 enfants nourris",
      "2000 repas distribués/mois",
      "Partenariat avec 5 commerces",
      "Programme nutrition lancé"
    ]
  },
  {
    id: 5,
    title: "École de Demain",
    category: "Innovation",
    description: "Modernisation des méthodes d'apprentissage avec le numérique",
    longDescription: "Le projet École de Demain vise à intégrer les technologies numériques dans l'apprentissage. Tablettes, logiciels éducatifs et méthodes innovantes pour préparer les enfants au monde de demain.",
    icon: Target,
    gradient: "from-cyan-500 to-blue-600",
    image: "/images/ecole-demain.jpg",
    status: "En préparation",
    participants: 0,
    startDate: "Sept 2024",
    achievements: [
      "10 tablettes acquises",
      "Formation des bénévoles",
      "Partenariat tech signé",
      "Curriculum développé"
    ]
  },
  {
    id: 6,
    title: "Camps d'Été",
    category: "Loisirs",
    description: "Colonies de vacances éducatives et ludiques",
    longDescription: "Les camps d'été offrent aux enfants des vacances enrichissantes mêlant loisirs, apprentissage et découvertes. Une semaine de bonheur dans un cadre sécurisé avec des activités variées.",
    icon: Users,
    gradient: "from-yellow-500 to-orange-600",
    image: "/images/camps-ete.jpg",
    status: "Saisonnier",
    participants: 120,
    startDate: "Juil 2024",
    achievements: [
      "120 enfants accueillis",
      "2 camps organisés/été",
      "15 animateurs formés",
      "100% de satisfaction"
    ]
  }
];

const stats = [
  { label: "Projets Actifs", value: 6, icon: Target, gradient: "from-blue-500 to-indigo-600" },
  { label: "Enfants Bénéficiaires", value: 465, icon: Users, gradient: "from-purple-500 to-pink-600" },
  { label: "Bénévoles Mobilisés", value: 45, icon: Heart, gradient: "from-emerald-500 to-teal-600" },
  { label: "Centres d'Action", value: 8, icon: MapPin, gradient: "from-orange-500 to-red-600" },
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

export default function NosProjets() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const categories = ["Tous", "Éducation", "Art & Culture", "Sport & Santé", "Solidarité", "Innovation", "Loisirs"];

  const filteredProjects = selectedCategory === "Tous" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
            {["Accueil", "À propos", "Projets", "Galerie", "Contact"].map((item, idx) => (
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
              Nos Projets
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                pour l'Enfance
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-blue-100 font-light mb-12 max-w-3xl mx-auto">
              Découvrez nos actions concrètes pour transformer la vie des enfants de Casablanca
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                Découvrir nos actions
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 transform hover:-translate-y-1">
                Nous soutenir
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
                    <IconComponent className="text-2xl text-white" />
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

      {/* Section Filtres */}
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

      {/* Section Projets */}
      <section className="pb-20 px-6 max-w-7xl mx-auto">
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
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
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

      {/* Modal Projet */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
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
                  ✕
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
          </div>
        </div>
      )}

      {/* Section Appel à l'action */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <AnimatedCard>
          <div className="relative p-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 -translate-x-20" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 translate-x-16" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-8">Rejoignez notre Mission</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto mb-8">
                Chaque projet a besoin de votre soutien pour grandir et toucher plus d'enfants. 
                Ensemble, nous pouvons transformer des vies et construire un avenir meilleur.
              </p>
              <div className="flex gap-6 justify-center flex-wrap">
                <button className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  Devenir bénévole
                </button>
                <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 transform hover:-translate-y-1">
                  Faire un don
                </button>
              </div>
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