import React, { useState } from 'react';
import { 
  Grid3X3, 
  List, 
  Heart, 
  MapPin, 
  Home, 
  Bath, 
  Square, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';

const initialFilters = {
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
};

const SakanCom = () => {
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState(initialFilters);
  

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
    setFilters(initialFilters);
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
                  <Grid3X3 className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg transition ${
                    viewMode === 'list'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <List className="w-6 h-6" />
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
                        <Heart
                          className={`w-6 h-6 ${favorites.includes(property.id) ? 'text-red-500 fill-current' : 'text-gray-700'}`}
                        />
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
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span className="flex items-center">
                          <Home className="w-5 h-5 mr-1" />
                          {property.bedrooms}
                        </span>
                        <span className="flex items-center">
                          <Bath className="w-5 h-5 mr-1" />
                          {property.bathrooms}
                        </span>
                        <span className="flex items-center">
                          <Square className="w-5 h-5 mr-1" />
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
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold">1</button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">2</button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">3</button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">4</button>
                <span className="px-4 py-2 text-gray-500">...</span>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">25</button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">
                  <ChevronRight className="w-5 h-5" />
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
                  <MapPin className="w-5 h-5 mr-2 text-cyan-600 mt-1" />
                  <span>123 Avenue Mohammed V<br/>Casablanca, Maroc</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-cyan-600" />
                  <span>+212 5XX XXX XXX</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-cyan-600" />
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
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
      </a>
    </div>
  );
};

export default SakanCom;
