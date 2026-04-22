import React, { useMemo, useCallback, useContext } from "react";
import { 
  MapPin, 
  Square, 
  Bed, 
  Bath, 
  X, 
  Phone, 
  Mail, 
  User, 
  Star, 
  Home, 
  Ruler, 
  Layers, 
  Calendar, 
  Heart, 
  Share2,
  Trees,
  Car,
  Building,
  Snowflake,
  Sparkles
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { GlobaleContext } from "../../context/GlobaleContext";
import { getStorageUrl, parseImageList } from "../../utils/authStorage";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PropertyModal({ property, isOpen, onClose }) {
  const { t } = useTranslation();
  const {
    setAlertSucc,
    setAlertMsg,
  } = useContext(GlobaleContext);

  // Mémoïsation des données
  const images = useMemo(() => {
    if (!property) return [];
    const imagesSecondaires = property.images_urls?.length
      ? property.images_urls
      : parseImageList(property.images);

    return [
      property.image_principale_url || property.image_principale,
      ...imagesSecondaires,
    ].map(getStorageUrl).filter(Boolean);
  }, [property]);

  const features = useMemo(() => [
    { icon: Ruler, label: t("surface"), value: `${property?.surface} m²`, color: "text-blue-500" },
    { icon: Bed, label: t("bedrooms"), value: property?.chambres, color: "text-green-500" },
    { icon: Bath, label: t("bathrooms"), value: property?.salles_de_bain, color: "text-purple-500" },
    { icon: Layers, label: t("floor"), value: property?.etage || t("ground_floor"), color: "text-orange-500" },
    { icon: Calendar, label: t("construction_year"), value: property?.annee_construction, color: "text-red-500" },
    { icon: Home, label: t("property_type"), value: property?.type, color: "text-indigo-500" },
  ].filter(item => item.value), [property, t]);

  const amenities = useMemo(() => [
    { name: "piscine", label: t("pool"), icon: Sparkles, active: property?.piscine, color: "text-blue-500" },
    { name: "jardin", label: t("garden"), icon: Trees, active: property?.jardin, color: "text-green-500" },
    { name: "parking", label: t("parking"), icon: Car, active: property?.parking, color: "text-gray-500" },
    { name: "ascenseur", label: t("elevator"), icon: Building, active: property?.ascenseur, color: "text-orange-500" },
    { name: "climatisation", label: t("air_conditioning"), icon: Snowflake, active: property?.climatisation, color: "text-cyan-500" },
  ].filter(item => item.active), [property, t]);

  const handleClose = useCallback((e) => {
    e?.stopPropagation();
    onClose();
  }, [onClose]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleContact = useCallback(() => {
    if (property?.telephone_contact) {
      window.open(`tel:${property.telephone_contact}`, '_self');
    }
  }, [property]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: property.titre,
        text: property.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setAlertSucc(true);
      setAlertMsg(t("link_copied"));
      setTimeout(() => setAlertSucc(false), 3000);
    }
  }, [property, t, setAlertSucc, setAlertMsg]);

  if (!isOpen || !property) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-6xl mx-auto border border-gray-200 max-h-[95vh] overflow-hidden flex flex-col lg:flex-row"
        onClick={stopPropagation}
      >
        
        {/* Header Mobile */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {property.titre}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-1">
                {property.ville} • {property.adresse}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Galerie d'images */}
        <div className="lg:w-1/2 bg-gray-900 relative">
          {images.length > 0 ? (
            <>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ 
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet bg-white/50',
                  bulletActiveClass: 'swiper-pagination-bullet-active bg-white'
                }}
                className="w-full h-64 sm:h-80 lg:h-full"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`${property.titre} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Badge vedette */}
              {property.en_vedette && (
                <div className="absolute top-4 left-4 z-20 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {t("featured")}
                </div>
              )}
              
              {/* Actions images */}
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button
                  onClick={handleShare}
                  className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg transition-all">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="h-64 sm:h-80 lg:h-full flex items-center justify-center bg-gray-800">
              <div className="text-center text-gray-400">
                <Home className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm">{t("no_image")}</p>
              </div>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="lg:w-1/2 flex flex-col overflow-y-auto">
          
          {/* En-tête Desktop */}
          <div className="hidden lg:flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {property.titre}
                </h3>
                <p className="text-sm text-gray-500">
                  {property.ville} • {property.adresse}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Prix et Badges */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <span className="text-3xl font-bold text-blue-600">
                  {parseFloat(property.prix).toLocaleString()}
                </span>
                <span className="text-lg text-gray-600 font-medium ml-1">DH</span>
                {property.transaction === "location" && (
                  <span className="text-sm text-gray-500 ml-2">/ {t("month")}</span>
                )}
              </div>
              
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {property.type}
                </span>
                <span className={`inline-flex items-center px-3 py-1 ${
                  property.transaction === "vente" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-purple-100 text-purple-800"
                } text-sm font-medium rounded-full`}>
                  {property.transaction}
                </span>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">{property.adresse}, {property.ville}</span>
            </div>
          </div>

          {/* Caractéristiques principales */}
          <div className="p-6 border-b border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {t("features")}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {features.map(({ icon: Icon, label, value, color }, index) => (
                <div
                  key={index}
                  className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200"
                >
                  {React.createElement(Icon, {
                    className: `w-6 h-6 mx-auto mb-2 ${color}`,
                  })}
                  <div className="text-base font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-600 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Équipements */}
          {amenities.length > 0 && (
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {t("amenities")}
              </h4>
              <div className="flex flex-wrap gap-3">
                {amenities.map(({ icon: Icon, label, color }, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-200"
                  >
                    {React.createElement(Icon, {
                      className: `w-4 h-4 ${color}`,
                    })}
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="p-6 border-b border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              {t("description")}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {property.description || t("no_description")}
            </p>
          </div>

          {/* Contact */}
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{t("contactP")}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <User className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 font-medium">{property.nom_contact}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <Mail className="w-5 h-5 text-blue-500" />
                <a 
                  href={`mailto:${property.email_contact}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {property.email_contact}
                </a>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <Phone className="w-5 h-5 text-blue-500" />
                <a 
                  href={`tel:${property.telephone_contact}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {property.telephone_contact}
                </a>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 flex gap-3">
            <button 
              onClick={handleContact}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {t("contact_button")}
            </button>
            <button
              onClick={handleClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              {t("close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
