import React, { useContext } from "react";
import { Bed, Bath, ChevronRight, MapPin, Ruler } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ImmobilierContext } from "../../context/ImmobilierContext";

function PropertiesSection() {
  const { t } = useTranslation();
  const { immobilier } = useContext(ImmobilierContext);
  const properties = immobilier.slice(0, 2);

  return (
    <section id="immobilier" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900">
            {t("properties.section_title")}
          </h3>
          <p className="mt-4 text-xl text-gray-600">
            {t("properties.section_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
  {properties.map((property) => (
    <div
      key={property.id}
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={property.image_principale_url}
          alt={property.titre}
          className="w-full h-32 sm:h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {property.en_vedette && (
          <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-2 py-0.5 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
            {t("properties.featured")}
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4 lg:p-6">
        <h4 className="text-sm sm:text-lg lg:text-xl font-bold text-cyan-600 line-clamp-1">
          {property.titre}
        </h4>
        
        <div className="flex items-center gap-1 sm:gap-2 text-gray-500 mt-1 sm:mt-2">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm truncate">
            {property.ville}
          </span>
        </div>

        {/* Description - Hidden on mobile */}
        <p className="hidden sm:block text-gray-600 mt-3 line-clamp-2 lg:line-clamp-3 text-sm">
          {property.description}
        </p>

        {/* Price */}
        <div className="mt-2 sm:mt-4">
          <span className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 block">
            {Number(property.prix).toLocaleString()} 
            <span className="text-xs sm:text-sm ml-1">MAD</span>
          </span>
        </div>

        {/* Property Details */}
        <div className="mt-2 sm:mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center text-gray-500 gap-0.5 sm:gap-1">
            <Bed className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{property.chambres}</span>
          </div>
          <div className="flex items-center text-gray-500 gap-0.5 sm:gap-1">
            <Bath className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{property.salles_de_bain}</span>
          </div>
          <div className="flex items-center text-gray-500 gap-0.5 sm:gap-1">
            <Ruler className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{property.surface}m²</span>
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/immobilier/${property.id}/information`}
          className="mt-3 sm:mt-4 block w-full text-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 sm:py-3 rounded-lg text-xs sm:text-sm lg:text-base font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          {t("properties.view_details")}
        </Link>
      </div>
    </div>
  ))}
</div>

        <div className="text-center mt-12">
          <Link
            to="/immobilier"
            className="px-8 py-4 border-2 border-cyan-600 text-cyan-600 font-semibold rounded-lg hover:bg-cyan-600 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
          >
            {t("properties.view_all")}
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PropertiesSection;
