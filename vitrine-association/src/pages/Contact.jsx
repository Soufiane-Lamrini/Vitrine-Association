import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, ChevronRight, X, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// Composant réutilisable pour les éléments de contact
const ContactInfoItem = ({ icon: Icon, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-blue-100 rounded-full flex-shrink-0 text-blue-600">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h4 className="font-bold text-gray-800">{title}</h4>
      <div className="text-gray-600 mt-1">{children}</div>
    </div>
  </div>
);

export default function Contact() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Données de navigation
  const navItems = [
    { label: "Accueil", path: "/" },
    { label: "À propos", path: "/a-propos" },
    { label: "Projets", path: "/projets" },
    { label: "Galerie", path: "/galerie" },
    { label: "S'impliquer", path: "/impliquer" },
    { label: "Contact", path: "/contact" }
  ];

  // Réseaux sociaux
  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com/AssociationNourEnfance" },
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Vérifier les préférences de réduction de mouvement
    setReduceMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "L'email est requis";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email invalide";
        return "";
      case "phone":
        if (value && !/^[0-9+ ]*$/.test(value)) return "Numéro invalide";
        return "";
      default:
        if (!value) return "Ce champ est requis";
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validation en temps réel
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation complète
    let valid = true;
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== "phone" || formData[key]) { // Le phone est optionnel
        const error = validateField(key, formData[key]);
        if (error) valid = false;
        newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    if (!valid) return;
    
    setIsSubmitting(true);

    // Simulation d'envoi
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      // Scroll vers le haut du formulaire
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <h1
            className="text-2xl sm:text-3xl font-bold cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Nour pour l'Enfance
          </h1>

          {/* Bouton burger mobile */}
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

          {/* Navigation desktop */}
          <ul className="hidden md:flex gap-4 lg:gap-6">
            {navItems.map((item, idx) => (
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

        {/* Navigation mobile */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ 
                type: reduceMotion ? false : 'spring',
                stiffness: 300,
                damping: 30 
              }}
              className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-6"
            >
              <ul className="space-y-4 py-8">
                {navItems.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ 
                      x: reduceMotion ? 0 : 0,
                      opacity: 1 
                    }}
                    transition={{ 
                      delay: reduceMotion ? 0 : idx * 0.1,
                      type: reduceMotion ? false : 'spring'
                    }}
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

      {/* Barre sociale mobile */}
      <div className="md:hidden fixed right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-3">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            aria-label={link.name}
          >
            <link.icon className="w-5 h-5 text-blue-600" />
          </a>
        ))}
      </div>

      {/* Contenu principal */}
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Section Hero */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: reduceMotion ? 0 : 0 
            }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Nous sommes à votre écoute pour répondre à vos questions et travailler ensemble pour les enfants.
            </p>
          </motion.div>
        </section>

        {/* Section Contact */}
        <section id="contact-form" className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: reduceMotion ? 0 : 0 
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un message
              </h2>
              
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200"
                  >
                    Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      aria-invalid={!!errors.email}
                      aria-describedby="email-error"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      aria-invalid={!!errors.phone}
                      aria-describedby="phone-error"
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    aria-invalid={!!errors.subject}
                    aria-describedby="subject-error"
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-600">
                      {errors.subject}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    aria-invalid={!!errors.message}
                    aria-describedby="message-error"
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
            
            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: reduceMotion ? 0 : 0 
              }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Nos coordonnées
                </h3>
                
                <div className="space-y-6">
                  <ContactInfoItem icon={Mail} title="Email">
                    <a 
                      href="mailto:contact@nour-enfance.org" 
                      className="text-blue-600 hover:underline"
                    >
                      contact@nour-enfance.org
                    </a>
                  </ContactInfoItem>
                  
                  <ContactInfoItem icon={Phone} title="Téléphone">
                    <a 
                      href="tel:+212661234578" 
                      className="text-blue-600 hover:underline"
                    >
                      +212 6 61 23 45 78
                    </a>
                  </ContactInfoItem>
                  
                  <ContactInfoItem icon={MapPin} title="Adresse">
                    <p>Rue 17, Quartier Sbata, Casablanca</p>
                  </ContactInfoItem>
                  
                  <ContactInfoItem icon={Clock} title="Horaires">
                    <p>Lundi - Vendredi: 9h - 17h</p>
                  </ContactInfoItem>
                </div>
              </div>
              
              {/* Bouton d'appel mobile */}
              <a
                href="tel:+212661234578"
                className="lg:hidden flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Appeler maintenant
              </a>
              
              {/* Carte */}
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Nous trouver
                </h3>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.349646143908!2d-7.612380724172119!3d33.59589514182274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d3731f922c01%3A0x5e46c1e1fc83142d!2sSbata%2C%20Casablanca!5e0!3m2!1sen!2sma!4v1710000000000!5m2!1sen!2sma" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation de l'association Nour pour l'Enfance"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 sm:p-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              y: reduceMotion ? 0 : 0 
            }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Vous souhaitez vous engager avec nous ?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Que ce soit pour devenir bénévole, faire un don ou proposer un partenariat, nous serions ravis d'échanger avec vous.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/impliquer"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Devenir bénévole <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="/don"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                Faire un don <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Nour pour l'Enfance</h3>
              <p className="mb-4">
                Association à but non lucratif œuvrant pour l'éducation et l'épanouissement des enfants défavorisés à Casablanca.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label={link.name}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                {navItems.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.path}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <address className="not-italic">
                <p className="mb-2">Rue 17, Quartier Sbata</p>
                <p className="mb-2">Casablanca, Maroc</p>
                <p className="mb-2">
                  <a href="mailto:contact@nour-enfance.org" className="hover:text-white transition-colors">
                    contact@nour-enfance.org
                  </a>
                </p>
                <p>
                  <a href="tel:+212661234578" className="hover:text-white transition-colors">
                    +212 6 61 23 45 78
                  </a>
                </p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
            <p>
              © {new Date().getFullYear()} Association Nour pour l'Enfance. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Bouton sticky mobile */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-20">
        <a
          href="tel:+212661234578"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Phone className="w-5 h-5" />
          Appeler maintenant
        </a>
      </div>
    </div>
  );
}