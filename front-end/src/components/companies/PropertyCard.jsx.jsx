import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Edit2, 
  Trash2, 
  MapPin, 
  Ruler, 
  Bed, 
  Bath, 
  Star, 
  Waves, 
  Car, 
  TreePine, 
  Building, 
  Snowflake,
  Phone,
  Calendar,
  Home,
  Eye,
  MoreVertical
} from 'lucide-react';
import { getStorageUrl } from '../../utils/authStorage';

function PropertyCard({ 
  filteredAnnouncements, 
  setSelectedAnnouncement, 
  setOpenUpdatePopUp, 
  setOpenDeletePopUp, 
  setSelectedAnnouncementDelete 
}) {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(null);

  const formatPrice = (price) => {
    if (!price) return '';
    return new Intl.NumberFormat('fr-FR').format(parseFloat(price));
  };

  const getTypeColor = (type) => {
    const colors = {
      appartement: 'bg-blue-100 text-blue-700',
      villa: 'bg-purple-100 text-purple-700',
      studio: 'bg-green-100 text-green-700',
      bureau: 'bg-orange-100 text-orange-700',
      terrain: 'bg-yellow-100 text-yellow-700',
      local: 'bg-red-100 text-red-700'
    };
    return colors[type?.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  const getTransactionColor = (transaction) => {
    return transaction === 'vente' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-blue-100 text-blue-700';
  };

  const getStatusColor = (statut) => {
    switch(statut) {
      case 'disponible': return 'bg-green-100 text-green-700';
      case 'loué': return 'bg-blue-100 text-blue-700';
      case 'vendu': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAnnouncementImageUrl = (announcement) =>
    getStorageUrl(announcement.image_principale_url || announcement.image_principale);

  // Mobile Card Component
  const MobilePropertyCard = ({ announcement }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
      {/* Header avec image et statut */}
      <div className="flex gap-3">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
          {getAnnouncementImageUrl(announcement) ? (
            <img
              src={getAnnouncementImageUrl(announcement)}
              alt={announcement.titre}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Home className="w-6 h-6 text-gray-400" />
            </div>
          )}
          
          {announcement.en_vedette && (
            <div className="absolute top-1 left-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded p-1">
              <Star className="w-2 h-2 text-white fill-current" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {announcement.titre}
            </h3>
            <div className="relative">
              <button
                onClick={() => setMobileMenuOpen(mobileMenuOpen === announcement.id ? null : announcement.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
              
              {mobileMenuOpen === announcement.id && (
                <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                  <button
                    onClick={() => {
                      setOpenUpdatePopUp(true);
                      setSelectedAnnouncement(announcement);
                      setMobileMenuOpen(null);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Edit2 className="w-3 h-3" />
                    {t('propertyCard.edit')}
                  </button>
                  <button
                    onClick={() => {
                      setOpenDeletePopUp(true);
                      setSelectedAnnouncementDelete(announcement);
                      setMobileMenuOpen(null);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" />
                    {t('propertyCard.delete')}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(announcement.type)}`}>
              {t(`propertyCard.types.${announcement.type}`)}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${getTransactionColor(announcement.transaction)}`}>
              {announcement.transaction === 'vente' 
                ? t('propertyCard.transaction.forSale')
                : t('propertyCard.transaction.forRent')
              }
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(announcement.statut)}`}>
              {t(`propertyCard.status.${announcement.statut}`)}
            </span>
          </div>
        </div>
      </div>

      {/* Localisation */}
      <div className="flex items-center gap-2 text-sm">
        <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
        <span className="font-medium text-gray-900">{announcement.ville}</span>
        <span className="text-gray-500 text-xs truncate flex-1">{announcement.adresse}</span>
      </div>

      {/* Caractéristiques */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg">
          <Ruler className="w-3 h-3 text-blue-600" />
          <span className="text-xs font-semibold text-blue-700">{announcement.surface}m²</span>
        </div>
        
        {announcement.chambres > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded-lg">
            <Bed className="w-3 h-3 text-purple-600" />
            <span className="text-xs font-semibold text-purple-700">{announcement.chambres}</span>
          </div>
        )}
        
        {announcement.salles_de_bain > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-cyan-50 rounded-lg">
            <Bath className="w-3 h-3 text-cyan-600" />
            <span className="text-xs font-semibold text-cyan-700">{announcement.salles_de_bain}</span>
          </div>
        )}
      </div>

      {/* Prix */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-gray-900">
          {formatPrice(announcement.prix)} <span className="text-sm font-normal text-gray-500">{t('propertyCard.currency')}</span>
          {announcement.transaction === 'location' && (
            <span className="text-xs text-gray-500 ml-1">{t('propertyCard.perMonth')}</span>
          )}
        </div>
        
        {/* Contact info réduit sur mobile */}
        <div className="text-right">
          <div className="text-xs text-gray-600 font-medium">{announcement.nom_contact}</div>
          <div className="text-xs text-gray-500">{announcement.telephone_contact}</div>
        </div>
      </div>

      {/* Équipements */}
      {(announcement.piscine || announcement.jardin || announcement.parking || announcement.ascenseur || announcement.climatisation) && (
        <div className="flex flex-wrap gap-1 pt-3 border-t border-gray-100">
          {announcement.piscine && (
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded text-xs text-blue-700">
              <Waves className="w-3 h-3" />
              <span>{t('propertyCard.amenities.piscine')}</span>
            </div>
          )}
          {announcement.jardin && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded text-xs text-green-700">
              <TreePine className="w-3 h-3" />
              <span>{t('propertyCard.amenities.jardin')}</span>
            </div>
          )}
          {announcement.parking && (
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded text-xs text-gray-700">
              <Car className="w-3 h-3" />
              <span>{t('propertyCard.amenities.parking')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Desktop Table Component
  const DesktopTable = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header - caché sur mobile */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 hidden lg:block">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
          <div className="col-span-3">{t('propertyCard.headers.property')}</div>
          <div className="col-span-2">{t('propertyCard.headers.typeTransaction')}</div>
          <div className="col-span-2">{t('propertyCard.headers.location')}</div>
          <div className="col-span-2">{t('propertyCard.headers.features')}</div>
          <div className="col-span-2">{t('propertyCard.headers.priceContact')}</div>
          <div className="col-span-1 text-center">{t('propertyCard.headers.actions')}</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
            >
              {/* Propriété (Image + Titre) */}
              <div className="col-span-3 flex items-center gap-3">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  {getAnnouncementImageUrl(announcement) ? (
                    <img
                      src={getAnnouncementImageUrl(announcement)}
                      alt={announcement.titre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Home className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  
                  {announcement.en_vedette && (
                    <div className="absolute top-1 left-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded p-1">
                      <Star className="w-2 h-2 text-white fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
                    {announcement.titre}
                  </h3>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {announcement.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(announcement.statut)}`}>
                      {t(`propertyCard.status.${announcement.statut}`)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Type & Transaction */}
              <div className="col-span-2 flex flex-col justify-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${getTypeColor(announcement.type)} capitalize w-fit`}>
                  {t(`propertyCard.types.${announcement.type}`)}
                </span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${getTransactionColor(announcement.transaction)} capitalize w-fit`}>
                  {announcement.transaction === 'vente' 
                    ? t('propertyCard.transaction.forSale')
                    : t('propertyCard.transaction.forRent')
                  }
                </span>
              </div>

              {/* Localisation */}
              <div className="col-span-2 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-gray-700 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                  <span className="text-sm font-semibold truncate">{announcement.ville}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{announcement.adresse}</p>
              </div>

              {/* Caractéristiques */}
              <div className="col-span-2 flex items-center gap-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg">
                  <Ruler className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700">{announcement.surface}m²</span>
                </div>
                
                {announcement.chambres > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded-lg">
                    <Bed className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-700">{announcement.chambres}</span>
                  </div>
                )}
              </div>

              {/* Prix & Contact */}
              <div className="col-span-2 flex flex-col justify-center">
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {formatPrice(announcement.prix)} <span className="text-sm font-normal text-gray-500">{t('propertyCard.currency')}</span>
                  {announcement.transaction === 'location' && <span className="text-xs text-gray-500">{t('propertyCard.perMonth')}</span>}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Phone className="w-3 h-3 text-green-600" />
                  <span className="font-medium truncate">{announcement.nom_contact}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{announcement.telephone_contact}</p>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setOpenUpdatePopUp(true);
                    setSelectedAnnouncement(announcement);
                  }}
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all hover:scale-110"
                  title={t('propertyCard.edit')}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setOpenDeletePopUp(true);
                    setSelectedAnnouncementDelete(announcement);
                  }}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all hover:scale-110"
                  title={t('propertyCard.delete')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
              <Home className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t('propertyCard.noProperties')}
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              {t('propertyCard.adjustSearch')}
            </p>
          </div>
        )}
      </div>

      {/* Table Footer with Count */}
      {filteredAnnouncements.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 hidden lg:block">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="font-medium">
              {t('propertyCard.footer.total')}: <span className="text-gray-900 font-bold">{filteredAnnouncements.length}</span> {t('propertyCard.footer.properties')}
            </span>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                {filteredAnnouncements.filter(a => a.statut === 'disponible').length} {t('propertyCard.footer.available')}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                {filteredAnnouncements.filter(a => a.statut === 'loué').length} {t('propertyCard.footer.rented')}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                {filteredAnnouncements.filter(a => a.statut === 'vendu').length} {t('propertyCard.footer.sold')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Version Desktop */}
      <DesktopTable />
      
      {/* Version Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <MobilePropertyCard 
              key={announcement.id} 
              announcement={announcement} 
            />
          ))
        ) : (
          <div className="text-center py-12 px-4 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
              <Home className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {t('propertyCard.noProperties')}
            </h3>
            <p className="text-gray-500 text-sm">
              {t('propertyCard.adjustSearch')}
            </p>
          </div>
        )}
        
        {/* Footer Mobile */}
        {filteredAnnouncements.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-center text-sm text-gray-600 mb-3">
              <span className="font-medium">
                {t('propertyCard.footer.total')}: <span className="text-gray-900 font-bold">{filteredAnnouncements.length}</span> {t('propertyCard.footer.properties')}
              </span>
            </div>
            <div className="flex justify-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                {filteredAnnouncements.filter(a => a.statut === 'disponible').length} {t('propertyCard.footer.available')}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                {filteredAnnouncements.filter(a => a.statut === 'loué').length} {t('propertyCard.footer.rented')}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PropertyCard;
