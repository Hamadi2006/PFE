import React from 'react';
import { Edit2, Trash2, MapPin, DollarSign, Ruler, Bed, Bath, Star, Waves, Car, TreePine, Building, Snowflake } from 'lucide-react';

function PropertyCard({ filteredAnnouncements, t, openModal, setSelectedAnnouncement, openUpdatePopUp, setOpenUpdatePopUp, handleDeleteAnnouncement }) {
  const formatPrice = (price) => {
    if (!price) return '';
    return new Intl.NumberFormat('fr-FR').format(parseFloat(price));
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      piscine: <Waves className="w-4 h-4" />,
      parking: <Car className="w-4 h-4" />,
      jardin: <TreePine className="w-4 h-4" />,
      ascenseur: <Building className="w-4 h-4" />,
      climatisation: <Snowflake className="w-4 h-4" />
    };
    return icons[amenity];
  };

  const getAmenityLabel = (amenity) => {
    const labels = {
      piscine: 'Piscine',
      parking: 'Parking',
      jardin: 'Jardin',
      ascenseur: 'Ascenseur',
      climatisation: 'Climatisation'
    };
    return labels[amenity];
  };

  return (
    <div className="space-y-6">
      {filteredAnnouncements.map((announcement) => (
        <div key={announcement.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 group">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-2/5 relative overflow-hidden">
              {announcement.image_principale_url ? (
                <img
                  src={announcement.image_principale_url}
                  alt={announcement.titre}
                  className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-64 md:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Building className="w-16 h-16 text-gray-400 opacity-40" />
                </div>
              )}
              
              {/* Badges overlay */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {announcement.en_vedette && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-2 rounded-2xl text-xs font-bold flex items-center space-x-1 shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Featured</span>
                  </div>
                )}
                <div className={`px-3 py-2 rounded-2xl text-xs font-semibold backdrop-blur-sm ${
                  announcement.statut === 'disponible' 
                    ? 'bg-green-500/90 text-white' 
                    : 'bg-gray-600/90 text-white'
                }`}>
                  {announcement.statut === 'disponible' ? 'Available' : 'Unavailable'}
                </div>
              </div>

              {/* Type badge */}
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-2xl text-xs font-medium backdrop-blur-sm">
                {announcement.type}
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-3/5 p-6 flex flex-col">
              {/* Header with title and price */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 pr-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {announcement.titre}
                  </h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm">
                      {announcement.adresse}, {announcement.ville}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    {formatPrice(announcement.prix)} MAD
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    {announcement.transaction}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed flex-1">
                {announcement.description}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                <div className="text-center">
                  <Ruler className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-gray-900">{announcement.surface}m²</div>
                  <div className="text-xs text-gray-500">Surface</div>
                </div>
                {announcement.chambres && (
                  <div className="text-center">
                    <Bed className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">{announcement.chambres}</div>
                    <div className="text-xs text-gray-500">Chambres</div>
                  </div>
                )}
                {announcement.salles_de_bain && (
                  <div className="text-center">
                    <Bath className="w-5 h-5 text-cyan-500 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">{announcement.salles_de_bain}</div>
                    <div className="text-xs text-gray-500">SDB</div>
                  </div>
                )}
                {announcement.etage && (
                  <div className="text-center">
                    <Building className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">{announcement.etage}</div>
                    <div className="text-xs text-gray-500">Étage</div>
                  </div>
                )}
              </div>

              {/* Footer with amenities and actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                {/* Amenities */}
                <div className="flex flex-wrap gap-2 flex-1">
                  {Object.entries({
                    piscine: announcement.piscine,
                    jardin: announcement.jardin,
                    parking: announcement.parking,
                    ascenseur: announcement.ascenseur,
                    climatisation: announcement.climatisation
                  }).map(([amenity, isAvailable]) => 
                    isAvailable && (
                      <div 
                        key={amenity}
                        className="flex items-center space-x-1 px-3 py-2 bg-white border border-gray-200 rounded-2xl text-xs text-gray-700 hover:border-gray-300 transition-colors"
                      >
                        {getAmenityIcon(amenity)}
                        <span>{getAmenityLabel(amenity)}</span>
                      </div>
                    )
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setOpenUpdatePopUp(true);
                      setSelectedAnnouncement(announcement);
                    }}
                    className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 hover:scale-110 transition-all shadow-sm"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 hover:scale-110 transition-all shadow-sm"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-3 text-xs text-gray-500">
                <span className="font-medium text-gray-700">Contact: </span>
                {announcement.nom_contact} • {announcement.telephone_contact}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
            <Building className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No properties found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}

export default PropertyCard;