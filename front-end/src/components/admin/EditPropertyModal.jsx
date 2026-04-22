import React, { useState, useEffect, useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { X, Upload, MapPin, Home, Ruler, Bath, Bed, Calendar, Layers, Star, Save, Edit } from "lucide-react";
import { GlobaleContext } from "../../context/GlobaleContext";
import { getErrorMessage, getStorageUrl } from "../../utils/authStorage";

export default function EditPropertyModal({ property, isOpen, onClose, onUpdate }) {
  const { t } = useTranslation();
  const {
    setAlertFail,
    setAlertMsg,
  } = useContext(GlobaleContext);
  
  const [loading, setLoading] = useState(false);
  const [imagePrincipale, setImagePrincipale] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    titre: "",
    type: "appartement",
    transaction: "vente",
    prix: "",
    surface: "",
    ville: "",
    description: "",
    adresse: "",
    latitude: "",
    longitude: "",
    chambres: "",
    salles_de_bain: "",
    annee_construction: "",
    etage: "",
    nombre_etages: "",
    statut: "disponible",
    piscine: false,
    jardin: false,
    parking: false,
    ascenseur: false,
    climatisation: false,
    en_vedette: false,
    nom_contact: "",
    telephone_contact: "",
    email_contact: "",
  });

  useEffect(() => {
    if (property && isOpen) {
      setFormData({
        titre: property.titre || "",
        type: property.type || "appartement",
        transaction: property.transaction || "vente",
        prix: property.prix || "",
        surface: property.surface || "",
        ville: property.ville || "",
        description: property.description || "",
        adresse: property.adresse || "",
        latitude: property.latitude || "",
        longitude: property.longitude || "",
        chambres: property.chambres || "",
        salles_de_bain: property.salles_de_bain || "",
        annee_construction: property.annee_construction || "",
        etage: property.etage || "",
        nombre_etages: property.nombre_etages || "",
        statut: property.statut || "disponible",
        piscine: property.piscine || false,
        jardin: property.jardin || false,
        parking: property.parking || false,
        ascenseur: property.ascenseur || false,
        climatisation: property.climatisation || false,
        en_vedette: property.en_vedette || false,
        nom_contact: property.nom_contact || "",
        telephone_contact: property.telephone_contact || "",
        email_contact: property.email_contact || "",
      });
      setImagePreview(
        getStorageUrl(property.image_principale_url || property.image_principale)
      );
      setImagePrincipale(null);
    }
  }, [property, isOpen]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(t('AdminUpdateProperty.invalidImage'));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(t('AdminUpdateProperty.imageTooLarge'));
      return;
    }

    setImagePrincipale(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }, [t]);

  const removeImage = useCallback(() => {
    setImagePrincipale(null);
    setImagePreview(
      getStorageUrl(property?.image_principale_url || property?.image_principale)
    );
  }, [property]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = { ...formData };
      
      if (dataToSend.latitude === "" || dataToSend.latitude === null) {
        dataToSend.latitude = null;
      } else {
        dataToSend.latitude = parseFloat(dataToSend.latitude);
      }
      
      if (dataToSend.longitude === "" || dataToSend.longitude === null) {
        dataToSend.longitude = null;
      } else {
        dataToSend.longitude = parseFloat(dataToSend.longitude);
      }

      await onUpdate(dataToSend, imagePrincipale);
    } catch (error) {
      console.error("Erreur:", error);
      setAlertFail(true);
      setAlertMsg(getErrorMessage(error, t('AdminUpdateProperty.dataError')));
      setTimeout(() => setAlertFail(false), 3000);
    } finally {
      setLoading(false);
    }
  }, [formData, imagePrincipale, onUpdate, setAlertFail, setAlertMsg, t]);

  if (!isOpen || !property) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto border border-gray-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center">
              <Edit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {t('AdminUpdateProperty.title')}
              </h3>
              <p className="text-sm text-gray-500">
                {property?.titre}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-xl bg-gray-100 border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Home className="w-8 h-8 text-gray-400" />
                )}
              </div>
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <label className="block mt-3">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                {t('AdminUpdateProperty.changeImage')}
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">{t('AdminUpdateProperty.imageFormat')}</p>
          </div>

          {/* Informations de base */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Home className="w-4 h-4 text-blue-500" />
              {t('AdminUpdateProperty.generalInfo')}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('AdminUpdateProperty.fields.title')} *
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('AdminUpdateProperty.fields.type')} *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {["appartement", "maison", "villa", "studio", "terrain", "bureau", "commerce"].map((opt) => (
                    <option key={opt} value={opt}>{t(`AdminUpdateProperty.propertyTypes.${opt}`)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('AdminUpdateProperty.fields.transaction')} *
                </label>
                <select
                  name="transaction"
                  value={formData.transaction}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="vente">{t('AdminUpdateProperty.transactionTypes.vente')}</option>
                  <option value="location">{t('AdminUpdateProperty.transactionTypes.location')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-400" />
                  {t('AdminUpdateProperty.fields.price')} *
                </label>
                <input
                  type="number"
                  name="prix"
                  value={formData.prix}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Caractéristiques */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-blue-500" />
              {t('AdminUpdateProperty.characteristics')}
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('AdminUpdateProperty.fields.surface')}
                </label>
                <input
                  type="number"
                  name="surface"
                  value={formData.surface}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Bed className="w-4 h-4 text-gray-400" />
                  {t('AdminUpdateProperty.fields.bedrooms')}
                </label>
                <input
                  type="number"
                  name="chambres"
                  value={formData.chambres}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Bath className="w-4 h-4 text-gray-400" />
                  {t('AdminUpdateProperty.fields.bathrooms')}
                </label>
                <input
                  type="number"
                  name="salles_de_bain"
                  value={formData.salles_de_bain}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {t('AdminUpdateProperty.fields.yearBuilt')}
                </label>
                <input
                  type="number"
                  name="annee_construction"
                  value={formData.annee_construction}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-gray-400" />
                  {t('AdminUpdateProperty.fields.floor')}
                </label>
                <input
                  type="number"
                  name="etage"
                  value={formData.etage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('AdminUpdateProperty.fields.totalFloors')}
                </label>
                <input
                  type="number"
                  name="nombre_etages"
                  value={formData.nombre_etages}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Localisation */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              {t('AdminUpdateProperty.location')}
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('AdminUpdateProperty.fields.city')} *
                </label>
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('AdminUpdateProperty.fields.address')}
                </label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('AdminUpdateProperty.fields.latitude')}
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    step="0.000001"
                    placeholder="Ex: 33.9716"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('AdminUpdateProperty.fields.longitude')}
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    step="0.000001"
                    placeholder="Ex: -6.8699"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">
              {t('AdminUpdateProperty.description')}
            </h4>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('AdminUpdateProperty.descriptionPlaceholder')}
            />
          </div>

          {/* Équipements */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-blue-500" />
              {t('AdminUpdateProperty.amenities')}
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "piscine", label: t('AdminUpdateProperty.amenitiesList.pool') },
                { name: "jardin", label: t('AdminUpdateProperty.amenitiesList.garden') },
                { name: "parking", label: t('AdminUpdateProperty.amenitiesList.parking') },
                { name: "ascenseur", label: t('AdminUpdateProperty.amenitiesList.elevator') },
                { name: "climatisation", label: t('AdminUpdateProperty.amenitiesList.airConditioning') },
                { name: "en_vedette", label: t('AdminUpdateProperty.amenitiesList.featured') },
              ].map(({ name, label }) => (
                <label key={name} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name={name}
                    checked={formData[name]}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">
              {t('AdminUpdateProperty.contact')}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('AdminUpdateProperty.fields.contactName')}
                </label>
                <input
                  type="text"
                  name="nom_contact"
                  value={formData.nom_contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('AdminUpdateProperty.fields.contactPhone')}
                </label>
                <input
                  type="tel"
                  name="telephone_contact"
                  value={formData.telephone_contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('AdminUpdateProperty.fields.contactEmail')}
                </label>
                <input
                  type="email"
                  name="email_contact"
                  value={formData.email_contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              disabled={loading}
            >
              {t('AdminUpdateProperty.buttons.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t('AdminUpdateProperty.buttons.updating')}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {t('AdminUpdateProperty.buttons.update')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
