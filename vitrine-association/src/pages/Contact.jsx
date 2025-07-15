import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, ChevronRight } from "lucide-react";

// Composant réutilisable pour les éléments de contact
const ContactInfoItem = ({ icon: Icon, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-white/10 rounded-full flex-shrink-0">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="font-bold text-lg">{title}</h4>
      {children}
    </div>
  </div>
);

export default function Contact() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.subject.trim()) newErrors.subject = "Le sujet est requis";
    if (!formData.message.trim()) newErrors.message = "Le message est requis";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-800 overflow-x-hidden">
      {/* Header unifié */}
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

      {/* Section Hero Contact */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Contactez-nous
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-blue-100 mb-8"
              >
                Nous sommes à votre écoute pour répondre à vos questions et travailler ensemble pour les enfants.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <ContactInfoItem icon={Mail} title="Email">
                  <a 
                    href="mailto:contact@nour-enfance.org" 
                    className="text-blue-100 hover:text-white transition-colors"
                    aria-label="Envoyer un email à contact@nour-enfance.org"
                  >
                    contact@nour-enfance.org
                  </a>
                </ContactInfoItem>
                
                <ContactInfoItem icon={Phone} title="Téléphone">
                  <a 
                    href="tel:+212661234578" 
                    className="text-blue-100 hover:text-white transition-colors"
                    aria-label="Appeler le +212 6 61 23 45 78"
                  >
                    +212 6 61 23 45 78
                  </a>
                </ContactInfoItem>
                
                <ContactInfoItem icon={MapPin} title="Adresse">
                  <p className="text-blue-100">
                    Rue 17, Quartier Sbata, Casablanca
                  </p>
                </ContactInfoItem>
                
                <ContactInfoItem icon={Clock} title="Horaires">
                  <p className="text-blue-100">
                    Lundi - Vendredi: 9h - 17h
                  </p>
                </ContactInfoItem>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:w-1/2 w-full"
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
                
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 p-4 bg-green-500/20 text-green-100 rounded-lg border border-green-500/30"
                      role="alert"
                    >
                      Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Votre nom complet <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-white/10 border ${
                        errors.name ? "border-red-400" : "border-white/20"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-white/50`}
                      placeholder="Votre nom"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Votre email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-white/10 border ${
                        errors.email ? "border-red-400" : "border-white/20"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-white/50`}
                      placeholder="votre@email.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Sujet <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-white/10 border ${
                        errors.subject ? "border-red-400" : "border-white/20"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-white/50`}
                      placeholder="Objet de votre message"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-1 text-sm text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Votre message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-white/10 border ${
                        errors.message ? "border-red-400" : "border-white/20"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-white/50`}
                      placeholder="Dites-nous comment nous pouvons vous aider..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    ></textarea>
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-800 mb-6"
          >
            Vous souhaitez vous engager avec nous ?
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 mb-8"
          >
            Que ce soit pour devenir bénévole, faire un don ou proposer un partenariat, nous serions ravis d'échanger avec vous.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              aria-label="Devenir bénévole"
            >
              Devenir bénévole <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
              aria-label="Faire un don"
            >
              Faire un don <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Section Google Maps */}
      <section className="py-0 px-0 bg-white" aria-label="Localisation de l'association">
        <div className="h-96 w-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.349646143908!2d-7.612380724172119!3d33.59589514182274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d3731f922c01%3A0x5e46c1e1fc83142d!2sSbata%2C%20Casablanca!5e0!3m2!1sen!2sma!4v1710000000000!5m2!1sen!2sma" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation de l'association Nour pour l'Enfance"
            aria-hidden="true"
          ></iframe>
        </div>
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