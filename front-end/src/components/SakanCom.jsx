import React, { useState } from 'react';
import { Search, Menu, X, Home, Key, TrendingUp, MessageCircle, Bed, Bath, Star, Send, Mail,
     Phone, MapPin, Facebook, Instagram, Linkedin, ChevronRight } from "lucide-react";

export default function SakanCom() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Achat d\'un bien');
  const [email, setEmail] = useState('');

  const properties = [
    {
      id: 1,
      title: 'Villa de luxe à Marrakech',
      description: 'Magnifique villa avec piscine et jardin luxuriant.',
      price: '2 500 000 MAD',
      beds: 4,
      baths: 3,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      badge: 'Nouveau'
    },
    {
      id: 2,
      title: 'Appartement moderne à Casablanca',
      description: 'Appartement ensoleillé avec vue sur l\'océan.',
      price: '1 200 000 MAD',
      beds: 2,
      baths: 2,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      badge: null
    },
    {
      id: 3,
      title: 'Riad traditionnel à Fès',
      description: 'Riad authentique au coeur de la médina historique.',
      price: '980 000 MAD',
      beds: 5,
      baths: 4,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
      badge: 'Nouveau'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Sami',
      city: 'Marrakech',
      initials: 'AS',
      text: 'Service exceptionnel! J\'ai trouvé ma villa de rêve en quelques semaines. L\'équipe est très professionnelle.'
    },
    {
      name: 'Fatima Alami',
      city: 'Casablanca',
      initials: 'FA',
      text: 'Très satisfaite de mon achat. L\'accompagnement était parfait du début à la fin. Je recommande vivement!'
    },
    {
      name: 'Youssef Bennani',
      city: 'Rabat',
      initials: 'YB',
      text: 'Plateforme intuitive et agents compétents. Mon appartement s\'est vendu en moins d\'un mois!'
    }
  ];

  const services = [
    { icon: <Home className="w-8 h-8" />, title: 'Vente', desc: 'Vendez votre bien rapidement au meilleur prix' },
    { icon: <Key className="w-8 h-8" />, title: 'Location', desc: 'Trouvez le locataire idéal pour votre propriété' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Estimation', desc: 'Estimation gratuite et précise de votre bien' },
    { icon: <MessageCircle className="w-8 h-8" />, title: 'Conseil', desc: 'Accompagnement personnalisé à chaque étape' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              SakanCom
            </h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Accueil', 'Immobilier', 'Services', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-cyan-600 font-medium transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 animate-in slide-in-from-top">
              {['Accueil', 'Immobilier', 'Services', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 px-4 rounded-lg hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              Votre projet immobilier, notre priorité.
              <br />
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Avec SakanCom.ma
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez la propriété de vos rêves parmi des milliers d'annonces vérifiées
            </p>
            
            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par ville, quartier..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                <Search size={20} />
                Rechercher
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                alt="Modern house"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl -z-10 opacity-20 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5000+', label: 'Biens Vendus' },
              { value: '3200+', label: 'Clients Satisfaits' },
              { value: '15+', label: 'Années d\'Expérience' },
              { value: '50+', label: 'Villes Couvertes' }
            ].map((stat, index) => (
              <div key={index} className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="mt-2 text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900">Nos Services</h3>
            <p className="mt-4 text-xl text-gray-600">
              Des solutions complètes pour tous vos besoins immobiliers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <div className="text-cyan-600">{service.icon}</div>
                </div>
                <h4 className="mt-6 text-xl font-bold text-gray-900">{service.title}</h4>
                <p className="mt-3 text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties */}
      <section id="immobilier" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900">Nos Dernières Offres</h3>
            <p className="mt-4 text-xl text-gray-600">
              Découvrez nos biens immobiliers sélectionnés avec soin
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {property.badge && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {property.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-cyan-600">{property.title}</h4>
                  <p className="text-gray-600 mt-2">{property.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{property.price}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-gray-500 gap-1">
                        <Bed size={18} />
                        <span>{property.beds}</span>
                      </div>
                      <div className="flex items-center text-gray-500 gap-1">
                        <Bath size={18} />
                        <span>{property.baths}</span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                    Voir Détails
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="px-8 py-4 border-2 border-cyan-600 text-cyan-600 font-semibold rounded-lg hover:bg-cyan-600 hover:text-white transition-all duration-300 inline-flex items-center gap-2">
              Voir Toutes les Offres
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900">Comment Ça Marche?</h3>
            <p className="mt-4 text-xl text-gray-600">
              Trouvez votre bien immobilier en 4 étapes simples
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Recherchez', desc: 'Parcourez nos milliers d\'annonces vérifiées' },
              { step: '2', title: 'Visitez', desc: 'Organisez des visites avec nos agents' },
              { step: '3', title: 'Négociez', desc: 'Nous vous aidons à obtenir le meilleur prix' },
              { step: '4', title: 'Emménagez', desc: 'Finalisez et emménagez dans votre nouveau bien' }
            ].map((item, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h4 className="mt-6 text-xl font-bold text-gray-900">{item.title}</h4>
                <p className="mt-3 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900">Ce Que Disent Nos Clients</h3>
            <p className="mt-4 text-xl text-gray-600">
              Des milliers de clients satisfaits nous font confiance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center mb-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="mt-6 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.initials}
                  </div>
                  <div className="ml-4">
                    <h5 className="font-bold text-gray-900">{testimonial.name}</h5>
                    <p className="text-sm text-gray-600">{testimonial.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
            <h3 className="text-4xl md:text-5xl font-bold">Prêt à Trouver Votre Bien Idéal?</h3>
            <p className="mt-6 text-xl opacity-90">
              Rejoignez des milliers de clients satisfaits et trouvez la propriété de vos rêves
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center justify-center gap-2">
                <Search size={20} />
                Parcourir les Offres
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-cyan-600 transition-all duration-200 inline-flex items-center justify-center gap-2">
                <TrendingUp size={20} />
                Estimer Mon Bien
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900">Contactez-Nous</h3>
              <p className="mt-4 text-xl text-gray-600">
                Notre équipe est à votre écoute pour répondre à toutes vos questions
              </p>
            </div>
            <form className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl shadow-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Téléphone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Sujet</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                >
                  <option>Achat d'un bien</option>
                  <option>Vente d'un bien</option>
                  <option>Location</option>
                  <option>Estimation</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                  placeholder="Décrivez votre projet..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Envoyer le Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <Mail className="text-white" size={32} />
            </div>
            <h3 className="mt-6 text-3xl font-bold text-gray-900">Restez Informé</h3>
            <p className="mt-4 text-gray-600">
              Recevez les dernières offres immobilières directement dans votre boîte mail
            </p>
            <div className="mt-6 max-w-md mx-auto flex gap-3">
              <input
                type="email"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="Votre email"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                SakanCom
              </h2>
              <p className="text-gray-400">
                Votre partenaire de confiance pour tous vos projets immobiliers au Maroc.
              </p>
              <div className="mt-6 flex gap-3">
                {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-700 transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-gray-400">
                {['Accueil', 'Nos Offres', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-cyan-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {['Achat', 'Vente', 'Location', 'Estimation Gratuite'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-cyan-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <span>123 Avenue Mohammed V<br />Casablanca, Maroc</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={20} className="text-cyan-400" />
                  <span>+212 5XX XXX XXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={20} className="text-cyan-400" />
                  <span>contact@sakancom.ma</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              © 2025 SakanCom. Tous droits réservés. |{' '}
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Mentions Légales
              </a>{' '}
              |{' '}
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Politique de Confidentialité
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/212XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
      >
        <MessageCircle className="text-white" size={32} />
        <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Contactez-nous
        </span>
      </a>
    </div>
  );
}