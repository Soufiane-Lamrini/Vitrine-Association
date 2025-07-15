import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Image, Heart, Eye, Download, Share2, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import * as images from '../images';

const galleryItems = [
  {
    id: 1,
    src: images.ateliertherapie,
    category: "Ateliers",
    title: "Atelier d'Art Thérapie",
    date: "15 Mars 2024",
    description: "Les enfants ont exprimé leurs émotions à travers la peinture lors de notre atelier d'art thérapie hebdomadaire. Cet espace de création libre permet aux enfants de s'exprimer sans mots et de développer leur confiance en eux.",
    location: "Centre Nour, Casablanca",
    quote: "« La peinture m'aide à montrer ce que je ressens » - Amina, 8 ans",
    tags: ["Art", "Thérapie", "Créativité"],
    likes: 124,
    views: 568
  },
  {
    id: 2,
    src: images.kitsScolaires,
    category: "Activités",
    title: "Distribution de Kits Scolaires",
    date: "10 Septembre 2023",
    description: "Pour la rentrée scolaire, nous avons distribué 250 kits complets (cartables, fournitures, uniformes) aux enfants défavorisés du quartier Sbata. Cette action permet de réduire les inégalités et d'offrir les mêmes chances à tous.",
    location: "École Al Amal, Casablanca",
    quote: "« Maintenant je peux aller à l'école comme mes amis ! » - Youssef, 7 ans",
    tags: ["Éducation", "Scolarité", "Rentrée"],
    likes: 89,
    views: 432
  },
  {
    id: 3,
    src: images.anniversaire,
    category: "Événements",
    title: "Fête d'Anniversaire Collective",
    date: "20 Avril 2024",
    description: "Nous célébrons chaque trimestre les anniversaires de tous les enfants qui n'ont pas la chance de fêter leur jour spécial en famille. Jeux, gâteaux et cadeaux rendent ces moments inoubliables.",
    location: "Jardin Public de Casablanca",
    quote: "« C'était mon premier gâteau d'anniversaire » - Karim, 13 ans",
    tags: ["Fête", "Joie", "Célébration"],
    likes: 156,
    views: 721
  },
  {
    id: 4,
    src: images.soutienScolaire,
    category: "Ateliers",
    title: "Cours de Soutien Scolaire",
    date: "5 Janvier 2024",
    description: "Nos bénévoles offrent un soutien scolaire personnalisé pour aider les enfants en difficulté. Chaque séance est adaptée aux besoins spécifiques de l'enfant.",
    location: "Bibliothèque Municipale",
    quote: "« Maintenant je comprends mieux les maths ! » - Leila, 10 ans",
    tags: ["Éducation", "Apprentissage", "Soutien"],
    likes: 76,
    views: 389
  },
  {
    id: 5,
    src: images.sortieEducative,
    category: "Activités",
    title: "Sortie Éducative au Musée",
    date: "12 Novembre 2023",
    description: "Découverte culturelle pour 50 enfants au Musée d'Art Contemporain. Cette sortie a éveillé leur curiosité et élargi leurs horizons.",
    location: "Musée d'Art Contemporain, Casablanca",
    quote: "« Je veux devenir artiste plus tard ! » - Samir, 11 ans",
    tags: ["Culture", "Découverte", "Sortie"],
    likes: 112,
    views: 498
  },
  {
    id: 6,
    src: images.tournoiSportif,
    category: "Événements",
    title: "Tournoi Sportif Annuel",
    date: "8 Juin 2024",
    description: "Compétition amicale entre les enfants de différents centres. Football, course et jeux traditionnels ont rythmé cette journée sportive.",
    location: "Stade Municipal",
    quote: "« On a gagné mais l'important c'était de jouer ensemble » - Team Espoir",
    tags: ["Sport", "Compétition", "Équipe"],
    likes: 143,
    views: 654
  },
  {
    id: 7,
    src: images.sport,
    category: "Événements",
    title: "Journée Sportive Inclusive",
    date: "3 Mai 2024",
    description: "Une journée dédiée au sport adapté pour les enfants en situation de handicap. Activités paralympiques et ateliers de sensibilisation pour promouvoir l'inclusion.",
    location: "Complexe Sportif Al Amal",
    quote: "« Ici, tout le monde peut participer à sa manière » - Coach Hassan",
    tags: ["Inclusion", "Sport Adapté", "Handicap"],
    likes: 98,
    views: 412
  },
  {
    id: 8,
    src: images.robotique,
    category: "Ateliers",
    title: "Initiation à la Robotique",
    date: "22 Février 2024",
    description: "Premiers pas dans le monde de la programmation et de la robotique avec des kits éducatifs. Les enfants ont construit et programmé leurs premiers robots simples.",
    location: "Espace Technologie Jeunesse",
    quote: "« Mon robot obéit à mes commandes ! » - Omar, 12 ans",
    tags: ["Technologie", "STEM", "Innovation"],
    likes: 132,
    views: 587
  },
  {
    id: 9,
    src: images.plantationArbres,
    category: "Activités",
    title: "Opération Reboisement",
    date: "12 Décembre 2023",
    description: "150 arbres plantés par les enfants du quartier dans le cadre de notre programme d'éducation environnementale. Chaque enfant est devenu parrain d'un arbre.",
    location: "Parc Ibn Battouta",
    quote: "« Je viendrai voir grandir mon arbre » - Fatima, 9 ans",
    tags: ["Écologie", "Nature", "Développement Durable"],
    likes: 145,
    views: 623
  },
];

const categories = [
  { name: "Tous", count: galleryItems.length, icon: Image, gradient: "from-blue-500 to-indigo-600" },
  { name: "Ateliers", count: galleryItems.filter(i => i.category === "Ateliers").length, icon: Heart, gradient: "from-purple-500 to-pink-600" },
  { name: "Événements", count: galleryItems.filter(i => i.category === "Événements").length, icon: Camera, gradient: "from-emerald-500 to-teal-600" },
  { name: "Activités", count: galleryItems.filter(i => i.category === "Activités").length, icon: Eye, gradient: "from-orange-500 to-red-600" },
];

function AnimatedCard({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export default function Galerie() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date-recent");

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

  const navigateImage = (direction) => {
    const currentIndex = galleryItems.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(galleryItems[newIndex]);
  };

  function parseFrenchDate(dateStr) {
    const months = {
      "Janvier": "January", "Février": "February", "Mars": "March", 
      "Avril": "April", "Mai": "May", "Juin": "June",
      "Juillet": "July", "Août": "August", "Septembre": "September",
      "Octobre": "October", "Novembre": "November", "Décembre": "December"
    };
    const parts = dateStr.split(" ");
    if (parts.length === 3) {
      const [day, frMonth, year] = parts;
      const enMonth = months[frMonth] || frMonth;
      return new Date(`${day} ${enMonth} ${year}`);
    }
    return new Date(dateStr);
  }

  const filteredItems = galleryItems
    .filter(item => 
      (selectedCategory === "Tous" || item.category === selectedCategory) &&
      (searchQuery === "" || 
       item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => {
      switch(sortOption) {
        case "date-recent":
          return parseFrenchDate(b.date) - parseFrenchDate(a.date);
        case "date-old":
          return parseFrenchDate(a.date) - parseFrenchDate(b.date);
        case "popular":
          return b.likes - a.likes;
        case "views":
          return b.views - a.views;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-800 overflow-x-hidden">
      {/* Éléments flottants d'arrière-plan */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: "10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
            right: "10%",
            bottom: "20%",
          }}
        />
      </div>

      {/* Header avec navigation unifiée */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg shadow-xl border-b border-white/20"
            : "bg-transparent"
        }`}
        aria-label="Navigation principale"
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1
            className={`text-3xl font-bold cursor-pointer select-none transition-all duration-500 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 ${
              scrolled ? "text-slate-800" : "text-white"
            }`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Nour pour l'Enfance - Retour à l'accueil"
          >
            Nour pour l'Enfance
          </h1>

          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            aria-label="Menu mobile"
            aria-expanded={navOpen}
          >
            <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${navOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-6 h-0.5 bg-current my-1 transition-all duration-300 ${navOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${navOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>

          <ul className={`hidden md:flex gap-8 ${scrolled ? "text-slate-700" : "text-white"}`}>
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
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
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
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div className="w-2 h-2 bg-white/20 rounded-full" />
          </div>
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight">
              Nos Moments
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                en Images
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-blue-100 font-light mb-12 max-w-3xl mx-auto">
              Découvrez les temps forts de nos actions et ateliers à travers cette galerie photo
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <button 
                onClick={() => window.location.href = "/impliquer"}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                S'impliquer
              </button>
              <button 
                onClick={() => document.getElementById('explorer').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
              >
                Explorer la galerie
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

      {/* Section Explorer */}
      <section className="py-20 px-6 max-w-7xl mx-auto" id="explorer">
        <AnimatedCard>
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explorez notre Univers
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Naviguez à travers nos différentes activités et découvrez les moments magiques que nous partageons
            </p>
          </div>
        </AnimatedCard>

        {/* Filtres interactifs */}
        <AnimatedCard delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(({ name, icon: IconComponent, gradient }, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(name)}
                className={`px-5 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                  selectedCategory === name 
                    ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{name}</span>
                {selectedCategory === name && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </AnimatedCard>

        {/* Statistiques visuelles */}
        <AnimatedCard delay={200}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-12">
            <h4 className="text-xl font-semibold text-slate-800 mb-4">Notre Galerie en Chiffres</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(({ name, count, gradient }, i) => (
                <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-100">
                  <div className={`w-full h-2 mb-3 rounded-full bg-gradient-to-r ${gradient} opacity-80`} />
                  <p className="text-sm text-slate-500">{name}</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent">
                    {count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Barre de recherche et tri */}
        <AnimatedCard delay={300}>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Rechercher un moment spécifique..."
                className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <select 
                className="px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="date-recent">Date récente</option>
                <option value="date-old">Date ancienne</option>
                <option value="popular">Plus populaires</option>
                <option value="views">Plus vues</option>
              </select>
              
              <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </AnimatedCard>
      </section>

      {/* Section Galerie */}
      <section className="pb-20 px-6 max-w-7xl mx-auto">
        {filteredItems.length === 0 ? (
          <AnimatedCard>
            <div className="text-center py-20">
              <h4 className="text-2xl font-semibold text-slate-700 mb-4">Aucun résultat trouvé</h4>
              <p className="text-slate-500 mb-6">Essayez de modifier vos critères de recherche ou de filtrage</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Tous");
                  setSortOption("date-recent");
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </AnimatedCard>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredItems.map((item, i) => (
              <AnimatedCard key={item.id} delay={i * 50}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20 cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-200">{item.category} • {item.date}</p>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                        <Heart className="w-4 h-4 text-white" />
                        <span className="text-xs text-white">{item.likes}</span>
                      </div>
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                        <Eye className="w-4 h-4 text-white" />
                        <span className="text-xs text-white">{item.views}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        )}
      </section>

      {/* Modal pour image agrandie */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden max-h-[90vh]"
               onClick={(e) => e.stopPropagation()}>
            <div className="grid md:grid-cols-2 gap-0 h-full">
              {/* Partie Image */}
              <div className="relative h-full min-h-96">
                <img src={selectedImage.src} 
                     alt={selectedImage.title}
                     className="w-full h-full object-cover"/>
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigateImage('prev') }}
                    className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-800" />
                  </button>
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigateImage('next') }}
                    className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors duration-200"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-800" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-medium">{selectedImage.title}</p>
                  <p className="text-white/80 text-sm">{selectedImage.date}</p>
                </div>
              </div>
              
              {/* Partie Description */}
              <div className="p-8 bg-white overflow-y-auto">
                <button onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100">
                  ✕
                </button>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{selectedImage.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {selectedImage.category}
                  </span>
                  <span className="text-slate-500 text-sm">{selectedImage.location}</span>
                </div>
                
                <p className="text-slate-600 mb-6">{selectedImage.description}</p>
                
                {selectedImage.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedImage.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {selectedImage.quote && (
                  <blockquote className="border-l-4 border-orange-500 pl-4 italic text-slate-700 mb-6">
                    {selectedImage.quote}
                  </blockquote>
                )}
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Heart className="w-5 h-5" />
                      <span>{selectedImage.likes} J'aime</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Eye className="w-5 h-5" />
                      <span>{selectedImage.views} Vues</span>
                    </div>
                  </div>
                  <span className="text-sm text-slate-400">{selectedImage.date}</span>
                </div>
                
                <div className="flex gap-3 flex-wrap">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Share2 size={16} />
                    Partager
                  </button>
                  <a 
                    href={selectedImage.src} 
                    download 
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
                  >
                    <Download size={16} />
                    Télécharger
                  </a>
                  <button className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50">
                    Voir plus de photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Mission */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <AnimatedCard>
          <div className="relative p-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-8">Partagez nos Moments</h3>
              <blockquote className="text-2xl md:text-3xl font-light italic mb-6 leading-relaxed">
                "Chaque photo raconte une histoire d'espoir"
              </blockquote>
              <p className="text-blue-100 text-lg max-w-3xl mx-auto">
                Ces images témoignent de nos actions quotidiennes auprès des enfants. 
                Elles reflètent notre engagement pour l'<span className="font-semibold text-yellow-300">éducation</span>, 
                l'<span className="font-semibold text-yellow-300">épanouissement</span> et le 
                <span className="font-semibold text-yellow-300"> bonheur</span> de chaque enfant.
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