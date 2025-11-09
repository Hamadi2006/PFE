import React, { useState, useContext, useCallback } from "react";
import {
  Plus, X, Building2, Mail, Lock, Phone, MapPin, 
  Globe, Upload, ToggleLeft, Save
} from "lucide-react";
import { CompanyContext } from "../../context/ComapanieContext";
import { GlobaleContext } from "../../context/GlobaleContext";

function AddCompanyModal({ showModal, setShowModal, onAdd }) {
  const { companies = [] } = useContext(CompanyContext);
  const {
    alertSucc,
    setAlertSucc,
    alertFail,
    setAlertFail,
    alertMsg,
    setAlertMsg,
  } = useContext(GlobaleContext);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    telephone: "",
    adresse: "",
    ville: "",
    site_web: "",
    logo: null,
    statut: "active",
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      
      // Validation du fichier
      if (!file.type.startsWith("image/")) {
        setErrors(prev => ({ ...prev, logo: "Veuillez sélectionner une image valide" }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: "L'image ne doit pas dépasser 5MB" }));
        return;
      }

      setFormData(prev => ({ ...prev, [name]: file }));
      setErrors(prev => ({ ...prev, logo: null }));

      // Prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      // Effacer l'erreur du champ quand l'utilisateur commence à taper
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    }
  }, [errors]);

  const removeImage = useCallback(() => {
    setFormData(prev => ({ ...prev, logo: null }));
    setImagePreview(null);
    setErrors(prev => ({ ...prev, logo: null }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = "Nom requis";
    if (!formData.email.trim()) newErrors.email = "Email requis";
    if (!formData.password) newErrors.password = "Mot de passe requis";

    // Validation email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await onAdd(formData);
      setShowModal(false);
      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        email: "",
        password: "",
        telephone: "",
        adresse: "",
        ville: "",
        site_web: "",
        logo: null,
        statut: "active",
      });
      setImagePreview(null);
      setErrors({});
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
    } finally {
      setLoading(false);
    }
  }, [formData, onAdd, setShowModal]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setErrors({});
    setImagePreview(null);
  }, [setShowModal]);

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto border border-gray-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Nouvelle Société
              </h3>
              <p className="text-sm text-gray-500">
                Ajouter une nouvelle société à votre portefeuille
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Logo Upload */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-8 h-8 text-gray-400" />
                )}
              </div>
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <label className="block mt-3">
              <input 
                type="file" 
                name="logo"
                accept="image/*" 
                onChange={handleChange} 
                className="hidden" 
                id="logo-upload"
              />
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium transition-colors">
                Choisir un logo
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (max 5MB)</p>
            {errors.logo && <p className="text-red-500 text-xs mt-1">⚠ {errors.logo}</p>}
          </div>

          {/* Informations de base */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-500" />
              Informations de base
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la société *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.nom ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Nom de la société"
                  />
                </div>
                {errors.nom && <p className="text-red-500 text-xs mt-1">⚠ {errors.nom}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="exemple@entreprise.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">⚠ {errors.email}</p>}
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">⚠ {errors.password}</p>}
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Informations de localisation */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              Localisation
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ville */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Casablanca"
                  />
                </div>
              </div>

              {/* Adresse */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="123 Rue Example"
                  />
                </div>
              </div>

              {/* Site web */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site web
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    name="site_web"
                    value={formData.site_web}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="https://www.exemple.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Statut */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <ToggleLeft className="w-4 h-4 text-blue-500" />
              Statut
            </h4>
            <div>
              <select
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ajout...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Ajouter la société
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCompanyModal;