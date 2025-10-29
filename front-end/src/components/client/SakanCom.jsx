import React, { useState } from 'react';

const SakanCom = () => {
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  

  const properties = [
    {
      id: 1,
      title: 'Appartement Standing',
      location: 'Tanger, Malabata',
      price: '6 500',
      priceType: '/mois',
      type: 'location',
      bedrooms: 3,
      bathrooms: 2,
      surface: 140,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUcCnjgUOi4Q3jIJ_-8TC_JhlkzuGHyNbfHUm6G_gqpPJEBfOF19-xV92U96bImetnDDWttlTZK2oyVsBKusOGm1qlWpiGDpSG5kwcYSS0NrlkPMmbDVbHmsFvaOCSQC19KQEpliny1qRVEXPrPNe_W6LRNVTs33xFouM_dld792JsNJPnVYJq-001PmX47UNQKgyp65OhwewpeP8SPO-h3B1aX4RFOBiZJoT5Qpt5DaXiSJA09h6tZWW19wUOHbSqZa4LEa9Lxm8w',
      isNew: true
    },
    {
      id: 2,
      title: 'Maison avec Jardin',
      location: 'Agadir, Founty',
      price: '1 650 000',
      priceType: '',
      type: 'vente',
      bedrooms: 4,
      bathrooms: 3,
      surface: 200,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      isNew: true
    }
  ];

  const toggleBedroom = (value) => {
    setSelectedBedrooms(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleBathroom = (value) => {
    setSelectedBathrooms(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSelectedBedrooms([]);
    setSelectedBathrooms([]);
    setFilters({
      search: '',
      type: '',
      transaction: '',
      priceMin: '',
      priceMax: '',
      surfaceMin: '',
      surfaceMax: '',
      city: '',
      amenities: {
        piscine: false,
        jardin: false,
        parking: false,
        ascenseur: false,
        climatisation: false
      }
    });
  };

  const handleAmenityChange = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity]
      }
    }));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="lg:w-1/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Filtres</h3>
                  <button onClick={resetFilters} className="text-cyan-600 text-sm hover:underline">
                    Réinitialiser
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">Prix (MAD)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={filters.priceMin}
                      onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                      placeholder="Min"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                    />
                    <input
                      type="number"
                      value={filters.priceMax}
                      onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                      placeholder="Max"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">Chambres</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        onClick={() => toggleBedroom(num)}
                        className={`px-3 py-2 border rounded-lg text-sm transition ${
                          selectedBedrooms.includes(num)
                            ? 'bg-cyan-600 text-white border-cyan-600'
                            : 'border-gray-300 hover:bg-cyan-600 hover:text-white'
                        }`}
                      >
                        {num}+
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">Salles de bain</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        onClick={() => toggleBathroom(num)}
                        className={`px-3 py-2 border rounded-lg text-sm transition ${
                          selectedBathrooms.includes(num)
                            ? 'bg-cyan-600 text-white border-cyan-600'
                            : 'border-gray-300 hover:bg-cyan-600 hover:text-white'
                        }`}
                      >
                        {num}+
                      </button>
                    ))}
                  </div>
                </div>

                {/* Surface Area */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">Surface (m²)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={filters.surfaceMin}
                      onChange={(e) => setFilters({...filters, surfaceMin: e.target.value})}
                      placeholder="Min"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                    />
                    <input
                      type="number"
                      value={filters.surfaceMax}
                      onChange={(e) => setFilters({...filters, surfaceMax: e.target.value})}
                      placeholder="Max"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Cities */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">Ville</label>
                  <select
                    value={filters.city}
                    onChange={(e) => setFilters({...filters, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                  >
                    <option value="">Toutes les villes</option>
                    <option value="casablanca">Casablanca</option>
                    <option value="rabat">Rabat</option>
                    <option value="marrakech">Marrakech</option>
                    <option value="fes">Fès</option>
                    <option value="tanger">Tanger</option>
                    <option value="agadir">Agadir</option>
                    <option value="meknes">Meknès</option>
                    <option value="oujda">Oujda</option>
                  </select>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">Équipements</label>
                  <div className="space-y-2">
                    {Object.keys(filters.amenities).map(amenity => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.amenities[amenity]}
                          onChange={() => handleAmenityChange(amenity)}
                          className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-600"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                          {amenity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition">
                  Appliquer les Filtres
                </button>
              </div>
            </aside>

            {/* Properties Grid */}
            <main className="lg:w-3/4">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Résultats de Recherche</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">2,457 biens trouvés</p>
                </div>
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-600 focus:outline-none">
                  <option>Pertinence</option>
                  <option>Prix croissant</option>
                  <option>Prix décroissant</option>
                  <option>Plus récent</option>
                  <option>Surface croissante</option>
                  <option>Surface décroissante</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg transition ${
                    viewMode === 'grid'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg transition ${
                    viewMode === 'list'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
                  </svg>
                </button>
              </div>

              {/* Properties Grid */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
              }`}>
                {properties.map(property => (
                  <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
                    <div className="relative">
                      <img src={property.image} alt={property.title} className="w-full h-48 object-cover"/>
                      {property.isNew && (
                        <span className="absolute top-4 left-4 bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Nouveau
                        </span>
                      )}
                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                      >
                        <svg
                          className={`w-6 h-6 ${favorites.includes(property.id) ? 'text-red-500 fill-current' : 'text-gray-700'}`}
                          fill={favorites.includes(property.id) ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <span className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                        property.type === 'location' ? 'bg-blue-500' : 'bg-green-500'
                      } text-white`}>
                        {property.type === 'location' ? 'À Louer' : 'À Vendre'}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                        {property.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {property.location}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                          {property.bedrooms}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                          </svg>
                          {property.bathrooms}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                          </svg>
                          {property.surface} m²
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t pt-4 dark:border-gray-700">
                        <div>
                          <span className="text-2xl font-bold text-cyan-600">{property.price} MAD</span>
                          {property.priceType && <span className="text-sm text-gray-500">{property.priceType}</span>}
                        </div>
                        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-semibold hover:bg-cyan-700 transition">
                          Détails
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold">1</button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">2</button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">3</button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">4</button>
                <span className="px-4 py-2 text-gray-500">...</span>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">25</button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold">Vous ne trouvez pas ce que vous cherchez?</h3>
            <p className="mt-4 text-xl opacity-90">Contactez nos experts pour une recherche personnalisée</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition">
                Appelez-nous
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-cyan-600 transition">
                Envoyez un Email
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-cyan-600 mb-4">SakanCom</h2>
              <p className="text-gray-300">Votre partenaire de confiance pour tous vos projets immobiliers au Maroc.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#accueil" className="hover:text-cyan-600 transition">Accueil</a></li>
                <li><a href="#immobilier" className="hover:text-cyan-600 transition">Nos Offres</a></li>
                <li><a href="#services" className="hover:text-cyan-600 transition">Services</a></li>
                <li><a href="#contact" className="hover:text-cyan-600 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-cyan-600 transition">Achat</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition">Vente</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition">Location</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition">Estimation Gratuite</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-cyan-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>123 Avenue Mohammed V<br/>Casablanca, Maroc</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+212 5XX XXX XXX</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>contact@sakancom.ma</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SakanCom. Tous droits réservés. | <a href="#" className="hover:text-cyan-600">Mentions Légales</a> | <a href="#" className="hover:text-cyan-600">Politique de Confidentialité</a></p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/212XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition hover:scale-110">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>
      </a>
    </div>
  );
};

export default SakanCom;