import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HandHeart, Share2, HeartPulse } from "lucide-react";

export default function GetInvolved() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [navOpen, setNavOpen] = useState(false);

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

  const involvementOptions = [
    {
      icon: <HandHeart className="w-8 h-8" />,
      title: "Devenir bénévole",
      description: "Rejoignez notre équipe de bénévoles engagés et participez concrètement à nos actions sur le terrain.",
      action: "Postuler maintenant",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "Faire un don",
      description: "Votre soutien financier nous permet de pérenniser nos actions et d'étendre nos programmes.",
      action: "Faire un don",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Partager notre mission",
      description: "Parlez de nous autour de vous et sur les réseaux sociaux pour nous aider à toucher plus d'enfants.",
      action: "Partager",
      gradient: "from-emerald-500 to-teal-600"
    },
  ];

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

      {/* Header */}
      <header
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
    scrolled
      ? 'bg-white/90 backdrop-blur-lg shadow-xl border-b border-white/20'
      : 'bg-transparent'
  }`}
  aria-label="Navigation principale"
>
  <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
    <h1
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
      className="md:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
      aria-label="Menu mobile"
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
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <ul className="px-6 py-4 space-y-4 bg-white/90 backdrop-blur-lg">
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
                  className={`block py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors ${
                    window.location.pathname === path ? "bg-blue-100/50 font-bold" : ""
                  }`}
                  aria-current={window.location.pathname === path ? "page" : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
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
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight">
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                S'impliquer
              </span>
              avec Nour pour l'Enfance
            </h2>
            <p className="text-2xl md:text-3xl text-blue-100 font-light mb-12 max-w-3xl mx-auto">
              Chaque geste compte pour offrir un avenir meilleur aux enfants
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <button 
                onClick={() => document.getElementById('options').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Découvrir les possibilités
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

      {/* Involvement Options Section */}
      <section id="options" className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Comment nous soutenir&nbsp;?
          </h3>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Choisissez la façon qui vous correspond le mieux pour agir à nos côtés&nbsp;: bénévolat, don ou partage de notre mission. Ensemble, multiplions notre impact auprès des enfants.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {involvementOptions.map((option, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`h-full p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/20 flex flex-col items-center text-center`}>
                <div className={`mb-6 p-4 rounded-full bg-gradient-to-br ${option.gradient} text-white`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">{option.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow">{option.description}</p>
                <button
                  className={`px-6 py-3 bg-gradient-to-br ${option.gradient} text-white font-medium rounded-full hover:scale-105 transition-all duration-300`}
                  onClick={() => {
                    if (option.title === "Devenir bénévole") {
                      window.open("/contact");
                    } else if (option.title === "Faire un don") {
                      window.open("https://www.paypal.com/donate/?hosted_button_id=VOTRE_ID_PAYPAL", "_blank");
                    } else if (option.title === "Partager notre mission") {
                      navigator.share
                        ? navigator.share({ title: "Nour pour l'Enfance", url: window.location.href })
                        : alert("Partagez ce lien : " + window.location.href);
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

      {/* Volunteer Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Témoignages de bénévoles
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Ce que vivent ceux qui nous rejoignent
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
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
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="h-full p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/20">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                      i === 0 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-purple-500 to-pink-600'
                    }`}>
                      {testimonial.avatar}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-slate-800">{testimonial.name}</h4>
                      <p className="text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative p-12 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 rounded-3xl shadow-2xl text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 -translate-x-20" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 translate-x-16" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-8">Prêt à faire la différence ?</h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto mb-8">
                Que vous choisissiez de donner de votre temps, de partager nos actions ou de soutenir financièrement notre association, chaque geste compte pour transformer la vie des enfants.
              </p>
              <p className="text-2xl font-semibold text-yellow-200">
                "Un petit geste, un grand avenir pour chaque enfant."
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
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