import React, { useState, useEffect } from "react";
import { X, Upload, MapPin } from "lucide-react";

export default function EditPropertyModal({ property, isOpen, onClose, onUpdate }) {
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

  const [imagePrincipale, setImagePrincipale] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePrincipale(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
  };

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto transition-all">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Modifier la propriété</h2>
          <button onClick={onClose} className="hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Image Section */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Image principale
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-36 h-36 object-cover rounded-xl shadow"
                />
              )}
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Changer l'image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["titre", "Titre *", "text"],
              ["prix", "Prix (DH) *", "number"],
              ["surface", "Surface (m²) *", "number"],
              ["ville", "Ville *", "text"],
              ["chambres", "Chambres", "number"],
              ["salles_de_bain", "Salles de bain", "number"],
              ["annee_construction", "Année de construction", "number"],
              ["etage", "Étage", "number"],
              ["nombre_etages", "Nombre d'étages", "number"],
            ].map(([name, label, type]) => (
              <div key={name}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            ))}

            {/* Dropdowns */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {["appartement", "maison", "villa", "studio", "terrain", "bureau", "commerce"].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Transaction *
              </label>
              <select
                name="transaction"
                value={formData.transaction}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="vente">Vente</option>
                <option value="location">Location</option>
              </select>
            </div>
          </div>

          {/* Adresse et Localisation */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Localisation
            </label>
            
            <div className="space-y-3">
              {/* Adresse */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Adresse complète
                </label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Coordonnées GPS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    step="0.000001"
                    placeholder="Ex: -6.8699"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">Entre -180 et 180</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    step="0.000001"
                    placeholder="Ex: 33.9716"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">Entre -90 et 90</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Equipements */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              Équipements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "piscine",
                "jardin",
                "parking",
                "ascenseur",
                "climatisation",
                "en_vedette",
              ].map((name) => (
                <label key={name} className="flex items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    name={name}
                    checked={formData[name]}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="capitalize">{name.replace("_", " ")}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              Informations de contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                ["nom_contact", "Nom", "text"],
                ["telephone_contact", "Téléphone", "tel"],
                ["email_contact", "Email", "email"],
              ].map(([name, label, type]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}