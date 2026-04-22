import { Bath, Heart, Home, MapPin, Square } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function PropertyResultCard({ listing, onToggleFavorite }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
      <div className="relative">
        {listing.imageUrl ? (
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-32 sm:h-48 object-cover"
          />
        ) : (
          <div className="w-full h-32 sm:h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 text-xs sm:text-sm">Aucune image</span>
          </div>
        )}

        {listing.featured && (
          <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-cyan-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
            {t('results.new')}
          </span>
        )}

        <button
          onClick={() => onToggleFavorite(listing.id)}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-md"
          title={t('results.favorite')}
          type="button"
        >
          <Heart
            className={`w-4 h-4 sm:w-6 sm:h-6 ${
              listing.isFavorite ? 'text-red-500 fill-current' : 'text-gray-700'
            }`}
          />
        </button>
      </div>

      <div className="p-3 sm:p-5">
        <h3 className="text-sm sm:text-lg font-bold text-gray-800 dark:text-white mb-1 sm:mb-2 line-clamp-1">
          {listing.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{listing.city}</span>
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
          {listing.bedrooms > 0 && (
            <span className="flex items-center gap-0.5 sm:gap-1">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>{listing.bedrooms}</span>
            </span>
          )}
          <span className="flex items-center gap-0.5 sm:gap-1">
            <Bath className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>{listing.bathrooms}</span>
          </span>
          <span className="flex items-center gap-0.5 sm:gap-1">
            <Square className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>{listing.surface}m²</span>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 sm:gap-0 border-t pt-3 sm:pt-4 dark:border-gray-700">
          <div>
            <span className="text-lg sm:text-2xl font-bold text-cyan-600 block">
              {listing.price?.toLocaleString()}
              <span className="text-xs sm:text-sm ml-1">DH</span>
            </span>
            {listing.transaction === 'location' && (
              <span className="text-xs sm:text-sm text-gray-500">/mois</span>
            )}
          </div>

          <Link
            to={`/immobilier/${listing.id}/information`}
            className="w-full sm:w-auto text-center px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-cyan-700 transition"
          >
            {t('results.details')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyResultCard;
