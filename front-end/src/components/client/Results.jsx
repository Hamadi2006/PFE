import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Results({immobilier}) {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 9 properties per page (3x3 grid)

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  // Pagination calculations
  const totalPages = Math.ceil(immobilier.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = immobilier.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Empty State Component
  if (immobilier.length === 0) {
    return (
      <main className="lg:w-3/4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('results.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              0 {t('results.found')}
            </p>
          </div>
        </div>

        {/* Empty State Message */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
          <div className="max-w-md mx-auto">
            {/* Icon */}
            <div className="mb-6">
              <svg 
                className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              {t('results.emptyTitle')}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('results.emptyDescription')}
            </p>

            {/* Suggestions */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                {t('results.suggestions')}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('results.suggestion1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('results.suggestion2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('results.suggestion3')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('results.suggestion4')}</span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">
              {t('results.resetFilters')}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Regular Results Display
  return (
    <main className="lg:w-3/4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('results.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {immobilier.length} {t('results.found')}
          </p>
        </div>
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
        {currentProperties.map(property => (
          <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
            <div className="relative">
              {property.image_principale ? (
                <img 
                  src={`http://localhost:8000/storage/${property.image_principale}`} 
                  alt={property.titre} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">Aucune image</span>
                </div>
              )}
              {property.en_vedette && (
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
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{property.titre}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {property.ville}, {property.adresse}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                {property.chambres > 0 && (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    {property.chambres}
                  </span>
                )}
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                  {property.salles_de_bain}
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
                  <span className="text-2xl font-bold text-cyan-600">{property.prix?.toLocaleString()} DH</span>
                  {property.transaction === 'location' && <span className="text-sm text-gray-500">/mois</span>}
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
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          {/* Previous Button */}
          <button 
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-lg transition ${
              currentPage === 1
                ? 'border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 dark:border-gray-600 hover:bg-cyan-600 hover:text-white hover:border-cyan-600'
            }`}
            title={t('results.prev')}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500 dark:text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  currentPage === page
                    ? 'bg-cyan-600 text-white'
                    : 'border border-gray-300 dark:border-gray-600 hover:bg-cyan-600 hover:text-white hover:border-cyan-600'
                }`}
              >
                {page}
              </button>
            )
          ))}

          {/* Next Button */}
          <button 
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-lg transition ${
              currentPage === totalPages
                ? 'border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 dark:border-gray-600 hover:bg-cyan-600 hover:text-white hover:border-cyan-600'
            }`}
            title={t('results.next')}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}

export default Results;