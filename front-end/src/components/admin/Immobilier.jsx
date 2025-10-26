import React, { useState } from 'react';
import { MapPin, Square, Bed, Bath, Eye, Edit, Trash2, X } from 'lucide-react';
import PropertyModal from './PropertyModal';
 function Immobilier({ immobilier }) {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleView = (e, property) => {
    e.stopPropagation();
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleEdit = (e, property) => {
    e.stopPropagation();
    console.log('Modifier:', property);
  };

  const handleDelete = (e, property) => {
    e.stopPropagation();
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${property.titre}" ?`)) {
      console.log('Supprimer:', property);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {immobilier.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl border-2 border-transparent hover:border-blue-200"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4">
              {property.image_principale ? (
                <img
                  src={`http://localhost:8000/storage/${property.image_principale}`}
                  alt={property.titre}
                  className="w-full sm:w-40 md:w-48 h-48 sm:h-32 md:h-40 object-cover rounded-lg flex-shrink-0"
                />
              ) : (
                <div className="w-full sm:w-40 md:w-48 h-48 sm:h-32 md:h-40 bg-slate-200 flex items-center justify-center rounded-lg flex-shrink-0">
                  <span className="text-slate-400 text-xs sm:text-sm">Aucune image</span>
                </div>
              )}

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg sm:text-xl text-slate-800 mb-1">
                        {property.titre}
                      </h4>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{property.ville}, {property.adresse}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                        {property.type?.toUpperCase()}
                      </span>
                      <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                        {property.transaction?.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <p className="hidden sm:block text-slate-600 text-sm mb-3 line-clamp-2">
                    {property.description || "Aucune description disponible"}
                  </p>

                  <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Square className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium">{property.surface}m²</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium">{property.chambres} <span className="hidden sm:inline">chambres</span><span className="sm:hidden">ch</span></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium">{property.salles_de_bain} SDB</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200">
                  <div className="font-bold text-xl sm:text-2xl text-blue-600">
                    {property.prix?.toLocaleString()} <span className="text-base sm:text-xl">DH</span>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={(e) => handleView(e, property)}
                      className="text-blue-600 hover:text-blue-700 transition-colors p-1 sm:p-0"
                      title="Voir les détails"
                    >
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={(e) => handleEdit(e, property)}
                      className="text-amber-600 hover:text-amber-700 transition-colors p-1 sm:p-0"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, property)}
                      className="text-red-600 hover:text-red-700 transition-colors p-1 sm:p-0"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <PropertyModal 
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default Immobilier;