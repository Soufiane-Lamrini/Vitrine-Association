import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HandHeart, Share2, HeartPulse, Home, Info, Folder, Image as ImageIcon, Mail, Phone, X } from "lucide-react";

export default function GetInvolved() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", checkMobile);
    checkMobile(); // Vérifier au chargement
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const involvementOptions = [
    {
      icon: <HandHeart className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Devenir bénévole",
      description: "Rejoignez notre équipe de bénévoles engagés et participez concrètement à nos actions sur le terrain.",
      action: "Postuler maintenant",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <HeartPulse className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Faire un don",
      description: "Votre soutien financier nous permet de pérenniser nos actions et d'étendre nos programmes.",
      action: "Faire un don",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <Share2 className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Partager notre mission",
      description: "Parlez de nous autour de vous et sur les réseaux sociaux pour nous aider à toucher plus d'enfants.",
      action: "Partager",
      gradient: "from-emerald-500 to-teal-600"
    },
  ];

  const testimonials = [
    {
      name: "Amina El Fassi",
      role: "Bénévole depuis 2 ans",
      quote: "Donner de mon temps à Nour pour l'Enfance a été une expérience incroyablement enrichissante. Voir les progrès des enfants que j'accompagne en soutien scolaire me remplit de joie.",
      avatar: "AE"
    },
    {
      name: "Mehdi Benkirane",
      role: "Bénévole sportif",
      quote: "Animer les ateliers sportifs m'a permis de partager ma passion tout en ayant un impact positif sur la santé et la confiance en soi des enfants. Une expérience humaine inoubliable.",
      avatar: "MB"
    }
  ];

  const socialLinks = [
    { icon: "LinkedIn", href: "#", color: "hover:text-blue-400" },
    { icon: "Facebook", href: "https://facebook.com/AssociationNourEnfance", color: "hover:text-blue-500" },
    { icon: "Instagram", href: "#", color: "hover:text-pink-400" },
    { icon: "TikTok", href: "#", color: "hover:text-purple-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-800 overflow-x-hidden">
      {/* Background elements - réduits sur mobile */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl sm:blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              left: '10%',
              top: '20%'
            }}
          />
          <div 
            className="absolute w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-xl sm:blur-3xl"
            style={{
              transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
              right: '10%',
              bottom: '20%'
            }}
          />
        </div>
      )}

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
        </nav>
        {/* Navigation Mobile (déjà harmonisé plus bas) */}
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
      </header>

      {/* Hero Section optimisée mobile */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800"
          style={{
            transform: isMobile ? 'none' : `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        
        {/* Animated particles - réduits sur mobile */}
        {!isMobile && Array.from({ length: 15 }).map((_, i) => {
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
              <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            </div>
          );
        })}
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                S'impliquer
              </span>
              avec Nour pour l'Enfance
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 font-light mb-6 sm:mb-8 mx-auto max-w-3xl">
              Chaque geste compte pour offrir un avenir meilleur aux enfants
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('options').scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 sm:px-7 sm:py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-full hover:scale-105 hover:shadow-lg transition-all"
              >
                Découvrir les possibilités
              </button>
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 sm:px-7 sm:py-3 bg-white/20 text-white font-medium rounded-full hover:scale-105 hover:bg-white/30 transition-all"
              >
                Nous contacter
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-1 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Involvement Options Section optimisée mobile */}
      <section id="options" className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
          className="text-center mb-10 sm:mb-16"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Comment nous soutenir ?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Choisissez la façon qui vous correspond le mieux pour agir à nos côtés : bénévolat, don ou partage de notre mission.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {involvementOptions.map((option, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: isMobile ? "0px" : "-50px" }}
            >
              <div className={`h-full p-5 sm:p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all border border-white/20 flex flex-col items-center text-center`}>
                <div className={`mb-4 sm:mb-5 p-3 rounded-full bg-gradient-to-br ${option.gradient} text-white`}>
                  {option.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-slate-800">{option.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-5 flex-grow">{option.description}</p>
                <button
                  className={`px-5 py-2.5 text-sm sm:text-base bg-gradient-to-br ${option.gradient} text-white font-medium rounded-full hover:scale-105 transition-all duration-300`}
                  onClick={() => {
                    if (option.title === "Devenir bénévole") {
                      window.location.href = "/contact";
                    } else if (option.title === "Faire un don") {
                      window.open("https://www.paypal.com/donate/?hosted_button_id=VOTRE_ID_PAYPAL", "_blank");
                    } else if (option.title === "Partager notre mission") {
                      if (navigator.share) {
                        navigator.share({ 
                          title: "Nour pour l'Enfance", 
                          text: "Découvrez comment soutenir Nour pour l'Enfance",
                          url: window.location.href 
                        });
                      } else {
                        alert("Copiez ce lien pour partager : " + window.location.href);
                      }
                    }
                  }}
                >
                  {option.action}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Volunteer Testimonials optimisé mobile */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
            className="text-center mb-10 sm:mb-16"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Témoignages de bénévoles
            </h3>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
              Ce que vivent ceux qui nous rejoignent
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true, margin: isMobile ? "0px" : "-50px" }}
              >
                <div className="h-full p-5 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-white/20">
                  <div className="flex items-center mb-4 sm:mb-5">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-white ${
                      i === 0 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-purple-500 to-pink-600'
                    }`}>
                      {testimonial.avatar}
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h4 className="text-base sm:text-lg font-bold text-slate-800">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 italic">"{testimonial.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action optimisé mobile */}
      <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
        >
          <div className="relative p-6 sm:p-8 md:p-10 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
            {!isMobile && (
              <>
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 -translate-x-16" />
                <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/10 rounded-full translate-y-14 translate-x-14" />
              </>
            )}
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
                Prêt à faire la différence ?
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-blue-100 font-light mb-5 sm:mb-6 max-w-3xl mx-auto leading-relaxed">
                Que vous choisissiez de donner de votre temps, de partager nos actions ou de soutenir financièrement notre association, chaque geste compte.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/contact"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-full hover:scale-105 transition-all"
                >
                  Nous contacter
                </a>
                <a
                  href="https://www.paypal.com/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:scale-105 hover:bg-white/10 transition-all"
                >
                  Faire un don
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer optimisé mobile */}
      <footer className="relative mt-12 bg-gradient-to-br from-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        
        <div className="relative z-10 py-8 sm:py-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Restez Connectés
              </h4>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {socialLinks.map(({icon, href, color}, index) => (
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