import React from "react";
import { MapPin, Square, Bed, Bath, X } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Slider */}
        {images.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-80 sm:h-96 md:h-[28rem] rounded-t-2xl"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={`http://localhost:8000/storage/${img}`}
                  alt={property.titre}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-80 flex items-center justify-center bg-slate-200 text-slate-500">
            {t("no_image")}
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap justify-between items-center border-b pb-5 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 capitalize">
                {property.titre}
              </h2>
              <div className="flex items-center text-slate-600 text-sm sm:text-base">
                <MapPin className="w-5 h-5 mr-1 text-blue-600" />
                {property.ville}, {property.adresse}
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {parseFloat(property.prix).toLocaleString()}{" "}
              <span className="text-lg">DH</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap mb-6">
            {property.type && (
              <span className="px-4 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                {property.type.toUpperCase()}
              </span>
            )}
            {property.transaction && (
              <span className="px-4 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                {property.transaction.toUpperCase()}
              </span>
            )}
            {property.en_vedette && (
              <span className="px-4 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full">
                {t("featured")}
              </span>
            )}
          </div>

          {/* Caractéristiques */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Square, label: t("surface"), value: `${property.surface} m²` },
              { icon: Bed, label: t("bedrooms"), value: property.chambres },
              { icon: Bath, label: t("bathrooms"), value: property.salles_de_bain },
              { icon: Square, label: t("floor"), value: property.etage || t("ground_floor") },
            ].map(({ icon: Icon, label, value }, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition"
              >
                <Icon className="w-7 h-7 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-slate-800">{value}</div>
                <div className="text-xs text-slate-600">{label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              {t("description")}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {property.description || t("no_description")}
            </p>
          </div>

          {/* Contact */}
          <div className="mb-6 border-t pt-4 text-sm text-slate-700">
            <h4 className="font-semibold mb-1">{t("contactP")}</h4>
            <p>{t("name")} : {property.nom_contact}</p>
            <p>{t("email")} : {property.email_contact}</p>
            <p>{t("phone")} : {property.telephone_contact}</p>
          </div>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
              {t("contact_button")}
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-50"
            >
              {t("close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
