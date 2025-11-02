import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
  CheckCircle
} from 'lucide-react';

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
              <Home className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600" />
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
                  <CheckCircle className="w-5 h-5 mr-2 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span>{t('results.suggestion1')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span>{t('results.suggestion2')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span>{t('results.suggestion3')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-cyan-600 flex-shrink-0 mt-0.5" />
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
          <Grid3X3 className="w-6 h-6" />
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
          <List className="w-6 h-6" />
        </button>
      </div>

      {/* Cards */}
      <div className={`grid gap-3 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
  {currentProperties.map(property => (
    <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
      <div className="relative">
        {property.image_principale ? (
          <img 
            src={`http://localhost:8000/storage/${property.image_principale}`} 
            alt={property.titre} 
            className="w-full h-32 sm:h-48 object-cover"
          />
        ) : (
          <div className="w-full h-32 sm:h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 text-xs sm:text-sm">Aucune image</span>
          </div>
        )}
        
        {property.en_vedette && (
          <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-cyan-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
            {t('results.new')}
          </span>
        )}
        
        <button
          onClick={() => toggleFavorite(property.id)}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-md"
          title={t('results.favorite')}
        >
          <Heart
            className={`w-4 h-4 sm:w-6 sm:h-6 ${favorites.includes(property.id) ? 'text-red-500 fill-current' : 'text-gray-700'}`}
          />
        </button>
      </div>
      
      <div className="p-3 sm:p-5">
        <h3 className="text-sm sm:text-lg font-bold text-gray-800 dark:text-white mb-1 sm:mb-2 line-clamp-1">
          {property.titre}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{property.ville}</span>
        </p>
        
        {/* Property Details - Stacked on mobile */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
          {property.chambres > 0 && (
            <span className="flex items-center gap-0.5 sm:gap-1">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>{property.chambres}</span>
            </span>
          )}
          <span className="flex items-center gap-0.5 sm:gap-1">
            <Bath className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>{property.salles_de_bain}</span>
          </span>
          <span className="flex items-center gap-0.5 sm:gap-1">
            <Square className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>{property.surface}m²</span>
          </span>
        </div>
        
        {/* Price and Button - Responsive layout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 sm:gap-0 border-t pt-3 sm:pt-4 dark:border-gray-700">
          <div>
            <span className="text-lg sm:text-2xl font-bold text-cyan-600 block">
              {property.prix?.toLocaleString()} 
              <span className="text-xs sm:text-sm ml-1">DH</span>
            </span>
            {property.transaction === 'location' && (
              <span className="text-xs sm:text-sm text-gray-500">/mois</span>
            )}
          </div>
          
          <Link 
            to={`/immobilier/${property.id}/information`} 
            className="w-full sm:w-auto text-center px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-cyan-700 transition"
          >
            {t('results.details')}
          </Link>
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
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500 dark:text-gray-400">
                <DotsHorizontal className="w-5 h-5" />
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
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </main>
  );
}

export default Results;