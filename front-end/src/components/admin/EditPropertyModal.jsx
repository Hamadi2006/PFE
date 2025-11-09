import React, { useState, useEffect, useCallback, useContext } from "react";
import { X, Upload, MapPin, Home, Ruler, Bath, Bed, Calendar, Layers, Star, Save, Edit } from "lucide-react";
import { GlobaleContext } from "../../context/GlobaleContext";

export default function EditPropertyModal({ property, isOpen, onClose, onUpdate }) {
  const {
    alertSucc,
    setAlertSucc,
    alertFail,
    setAlertFail,
    alertMsg,
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
        property.image_principale
          ? `http://localhost:8000/storage/${property.image_principale}`
          : null
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
      alert("Veuillez sélectionner une image valide");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("L'image ne doit pas dépasser 5MB");
      return;
    }

    setImagePrincipale(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const removeImage = useCallback(() => {
    setImagePrincipale(null);
    setImagePreview(
      property?.image_principale 
        ? `http://localhost:8000/storage/${property.image_principale}`
        : null
    );
  }, [property]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Préparer les données à envoyer
      const dataToSend = { ...formData };
      
      // Convertir latitude et longitude en nombres ou les supprimer si vides
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

      onUpdate(dataToSend, imagePrincipale);
    } catch (error) {
      console.error("Erreur:", error);
      setAlertFail(true);
      setAlertMsg("Erreur lors de la préparation des données");
      setTimeout(() => setAlertFail(false), 3000);
    } finally {
      setLoading(false);
    }
  }, [formData, imagePrincipale, onUpdate, setAlertFail, setAlertMsg]);

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
                Modifier la propriété
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
                Changer l'image
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (max 5MB)</p>
          </div>

          {/* Informations de base */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Home className="w-4 h-4 text-blue-500" />
              Informations générales
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
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
                  Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {["appartement", "maison", "villa", "studio", "terrain", "bureau", "commerce"].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction *
                </label>
                <select
                  name="transaction"
                  value={formData.transaction}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="vente">Vente</option>
                  <option value="location">Location</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-400" />
                  Prix (DH) *
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
              Caractéristiques
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surface (m²)
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
                  Chambres
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
                  Salles de bain
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
                  Année construction
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
                  Étage
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
                  Nombre d'étages
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
              Localisation
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville *
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
                  Adresse complète
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
                    Latitude
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
                    Longitude
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
              Description
            </h4>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Décrivez la propriété..."
            />
          </div>

          {/* Équipements */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-blue-500" />
              Équipements
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "piscine", label: "Piscine" },
                { name: "jardin", label: "Jardin" },
                { name: "parking", label: "Parking" },
                { name: "ascenseur", label: "Ascenseur" },
                { name: "climatisation", label: "Climatisation" },
                { name: "en_vedette", label: "En vedette" },
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
              Contact
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
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
                  Téléphone
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
                  Email
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
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mise à jour...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Mettre à jour
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}