import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Results() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);

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
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
      isNew: true
    },
    {
      id: 2,
      title: 'Villa Luxueuse',
      location: 'Marrakech, Palmeraie',
      price: '4 500 000',
      priceType: '',
      type: 'vente',
      bedrooms: 5,
      bathrooms: 4,
      surface: 350,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      isNew: true
    },
    {
      id: 3,
      title: 'Riad Traditionnel',
      location: 'Fès, Médina',
      price: '3 200 000',
      priceType: '',
      type: 'vente',
      bedrooms: 4,
      bathrooms: 3,
      surface: 250,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
      isNew: false
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  return (
    <main className="lg:w-3/4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('results.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {properties.length} {t('results.found')}
          </p>
        </div>
        <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-600 focus:outline-none">
          <option>{t('results.sort.relevance')}</option>
          <option>{t('results.sort.priceAsc')}</option>
          <option>{t('results.sort.priceDesc')}</option>
          <option>{t('results.sort.newest')}</option>
          <option>{t('results.sort.surfaceAsc')}</option>
          <option>{t('results.sort.surfaceDesc')}</option>
        </select>
      </div>

      {/* View Mode */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setViewMode('grid')}
          className={`px-4 py-2 rounded-lg transition ${
            viewMode === 'grid'
              ? 'bg-cyan-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          title={t('results.grid')}
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
          title={t('results.list')}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
          </svg>
        </button>
      </div>

      {/* Cards */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
        {properties.map(property => (
          <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
            <div className="relative">
              <img src={property.image} alt={property.title} className="w-full h-48 object-cover"/>
              {property.isNew && (
                <span className="absolute top-4 left-4 bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {t('results.new')}
                </span>
              )}
              <button
                onClick={() => toggleFavorite(property.id)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                title={t('results.favorite')}
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
                {property.type === 'location' ? t('results.forRent') : t('results.forSale')}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{property.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {property.location}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                {property.bedrooms > 0 && (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    {property.bedrooms}
                  </span>
                )}
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
                  {t('results.details')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center items-center gap-2">
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition" title={t('results.prev')}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold">1</button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition">2</button>
        <span className="px-4 py-2 text-gray-500">...</span>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition" title={t('results.next')}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </main>
  );
}

export default Results;
