import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Image, Heart, Eye, Download, Share2, ChevronLeft, ChevronRight, Search, Filter, X, ArrowRight } from "lucide-react";
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
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date-recent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateImage = (direction) => {
    const currentIndex = filteredItems.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredItems[newIndex]);
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
       item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))))
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
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Header Mobile Optimisé */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <h1
            className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Nour pour l'Enfance
          </h1>

          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm"
            aria-label="Menu"
            aria-expanded={navOpen}
          >
            {navOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <>
                <span className="block w-6 h-0.5 bg-gray-800 mb-1.5"></span>
                <span className="block w-6 h-0.5 bg-gray-800 mb-1.5"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
              </>
            )}
          </button>

          <ul className="hidden md:flex gap-4">
            {[
              { label: "Accueil", path: "/" },
              { label: "Galerie", path: "/galerie" },
              { label: "Contact", path: "/contact" }
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.path}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    window.location.pathname === item.path
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Navigation Mobile */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-6"
            >
              <ul className="space-y-4 py-8">
                {[
                  { label: "Accueil", path: "/" },
                  { label: "Galerie", path: "/galerie" },
                  { label: "Contact", path: "/contact" }
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1, type: 'spring' }}
                  >
                    <a
                      href={item.path}
                      className="block py-3 text-lg font-medium border-b border-gray-100"
                      onClick={() => setNavOpen(false)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Notre Galerie Photos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-8"
          >
            Découvrez nos moments de joie, d'apprentissage et de partage
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <button
              onClick={() => document.getElementById('gallery-grid').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Explorer
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-8 px-4 max-w-7xl mx-auto">
        {/* Mobile Filters Button */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm"
          >
            <span>Filtrer et trier</span>
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Filters Panel */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed inset-0 bg-white z-50 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Filtres</h3>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Catégories</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(({ name, icon: IconComponent, gradient }, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedCategory(name)}
                        className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm ${
                          selectedCategory === name
                            ? `bg-gradient-to-r ${gradient} text-white`
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Trier par</h4>
                  <select
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-300"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="date-recent">Date récente</option>
                    <option value="date-old">Date ancienne</option>
                    <option value="popular">Plus populaires</option>
                    <option value="views">Plus vues</option>
                  </select>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Rechercher</h4>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg border border-gray-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory("Tous");
                    setSearchQuery("");
                    setSortOption("date-recent");
                    setMobileFiltersOpen(false);
                  }}
                  className="w-full py-3 text-blue-600 font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Filters */}
        <div className="hidden md:flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex gap-3">
            {categories.map(({ name, icon: IconComponent, gradient }, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(name)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                  selectedCategory === name
                    ? `bg-gradient-to-r ${gradient} text-white`
                    : "bg-white text-gray-800 border border-gray-300"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{name}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-64 pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <select
              className="px-4 py-2 bg-white rounded-lg border border-gray-300"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="date-recent">Date récente</option>
              <option value="date-old">Date ancienne</option>
              <option value="popular">Plus populaires</option>
              <option value="views">Plus vues</option>
            </select>
          </div>
        </div>

        {/* Gallery Grid */}
        <div id="gallery-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative aspect-square">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-white/90 text-sm">{item.category} • {item.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Aucun résultat trouvé</h4>
            <p className="text-gray-500 mb-6">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={() => {
                setSelectedCategory("Tous");
                setSearchQuery("");
                setSortOption("date-recent");
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </main>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 h-full">
                {/* Image */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={(e) => { e.stopPropagation(); navigateImage('prev') }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigateImage('next') }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-6 overflow-y-auto">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {selectedImage.category}
                        </span>
                        <span className="text-gray-500 text-sm">{selectedImage.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-700">{selectedImage.description}</p>

                    {selectedImage.quote && (
                      <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700 py-2">
                        {selectedImage.quote}
                      </blockquote>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Heart className="w-5 h-5" />
                          <span>{selectedImage.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Eye className="w-5 h-5" />
                          <span>{selectedImage.views}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                          <Share2 className="w-5 h-5" />
                        </button>
                        <a
                          href={selectedImage.src}
                          download
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Vous souhaitez voir plus de nos actions ?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Suivez-nous sur les réseaux sociaux pour découvrir nos activités au quotidien
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://facebook.com/AssociationNourEnfance"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <span>Facebook</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
            >
              <span>Instagram</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Nour pour l'Enfance</h3>
            <p className="text-gray-400">
              Association à but non lucratif œuvrant pour l'éducation et l'épanouissement des enfants défavorisés.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Accueil</a></li>
              <li><a href="/galerie" className="hover:text-white">Galerie</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-gray-400">
              <p className="mb-2">Rue 17, Quartier Sbata, Casablanca</p>
              <p className="mb-2">
                <a href="mailto:contact@nour-enfance.org" className="hover:text-white">
                  contact@nour-enfance.org
                </a>
              </p>
              <p>
                <a href="tel:+212661234578" className="hover:text-white">
                  +212 6 61 23 45 78
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Association Nour pour l'Enfance. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}