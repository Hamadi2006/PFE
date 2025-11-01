import React from "react";
import { MapPin, Square, Bed, Bath, X, Phone, Mail, User } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PropertyModal({ property, isOpen, onClose }) {
  const { t } = useTranslation();

  if (!isOpen || !property) return null;

  let imagesSecondaires = [];
  try {
    if (property.images) {
      imagesSecondaires = JSON.parse(property.images);
    }
  } catch {
    imagesSecondaires = [];
  }

  const images = [property.image_principale, ...imagesSecondaires].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-6xl max-h-[98vh] sm:max-h-[95vh] overflow-hidden flex flex-col lg:flex-row">
        
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 bg-white rounded-full p-2 sm:p-2.5 shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-110"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>

        {/* Galerie d'images - Colonne gauche */}
        <div className="lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 relative">
          {images.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{ clickable: true }}
              className="w-full h-64 sm:h-96 lg:h-full"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i} className="w-full h-full">
                  <img
                    src={`http://localhost:8000/storage/${img}`}
                    alt={property.titre}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
              
              <div className="swiper-button-prev after:!text-white after:!text-2xl"></div>
              <div className="swiper-button-next after:!text-white after:!text-2xl"></div>
            </Swiper>
          ) : (
            <div className="h-64 sm:h-96 lg:h-full flex items-center justify-center bg-slate-700 text-slate-400">
              {t("no_image")}
            </div>
          )}
        </div>

        {/* Contenu - Colonne droite */}
        <div className="lg:w-1/2 flex flex-col overflow-y-auto">
          
          {/* En-tête avec prix */}
          <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-slate-200">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 sm:mb-3">
              {property.titre}
            </h1>
            <div className="flex items-center text-slate-600 mb-3 sm:mb-5">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm">{property.ville} • {property.adresse}</span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">
                {parseFloat(property.prix).toLocaleString()}
              </span>
              <span className="text-sm sm:text-lg text-slate-600 font-medium">DH</span>
            </div>
          </div>

          {/* Badges */}
          <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-3 sm:pb-4 flex gap-2 sm:gap-3 flex-wrap">
            {property.type && (
              <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs sm:text-sm font-semibold rounded-lg border border-blue-200">
                {property.type}
              </span>
            )}
            {property.transaction && (
              <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold rounded-lg border border-emerald-200">
                {property.transaction}
              </span>
            )}
            {property.en_vedette && (
              <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 text-xs sm:text-sm font-semibold rounded-lg border border-amber-200">
                ⭐ {t("featured")}
              </span>
            )}
          </div>

          {/* Caractéristiques */}
          <div className="px-4 sm:px-8 py-4 sm:py-6 grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { icon: Square, label: t("surface"), value: `${property.surface} m²` },
              { icon: Bed, label: t("bedrooms"), value: property.chambres },
              { icon: Bath, label: t("bathrooms"), value: property.salles_de_bain },
              { icon: Square, label: t("floor"), value: property.etage || t("ground_floor") },
            ].map(({ icon: Icon, label, value }, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 sm:p-4 border border-slate-200 hover:shadow-md transition-shadow"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mb-1 sm:mb-2" />
                <div className="text-lg sm:text-xl font-bold text-slate-900">{value}</div>
                <div className="text-xs text-slate-600 font-medium">{label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="px-4 sm:px-8 py-4 sm:py-6 border-t border-slate-200">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">
              {t("description")}
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm lg:text-base">
              {property.description || t("no_description")}
            </p>
          </div>

          {/* Contact */}
          <div className="px-4 sm:px-8 py-4 sm:py-6 border-t border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">{t("contactP")}</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-700">{property.nom_contact}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                <a href={`mailto:${property.email_contact}`} className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 underline break-all">
                  {property.email_contact}
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                <a href={`tel:${property.telephone_contact}`} className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 underline">
                  {property.telephone_contact}
                </a>
              </div>
            </div>
          </div>

          {/* Boutons */}
          <div className="px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row gap-2 sm:gap-3 border-t border-slate-200">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
              {t("contact_button")}
            </button>
            <button
              onClick={onClose}
              className="flex-1 border-2 border-slate-300 text-slate-700 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
            >
              {t("close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}