import React, { useState, useContext } from "react";
import {
  Plus, X, Eye, Edit, Trash2, Building2, Mail,
  Lock, Phone, MapPin, Globe, Upload, ToggleLeft
} from "lucide-react";
import { CompanyContext } from "../../context/ComapanieContext";

function AddCompanyModal({ showModal, setShowModal, onAdd }) {
  const { companies = [] } = useContext(CompanyContext);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    telephone: "",
    adresse: "",
    ville: "",
    site_web: "",
    logo: null,
    statut: "active", // par défaut
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = "Nom requis";
    if (!formData.email) newErrors.email = "Email requis";
    if (!formData.password) newErrors.password = "Mot de passe requis";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd(formData);
    
    setErrors({});
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl w-full max-w-xl shadow-2xl border border-white/40 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600/90 to-blue-600/90 px-6 md:px-8 py-6 relative border-b border-white/20">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-all"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Building2 size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Nouvelle Société</h2>
              <p className="text-cyan-50/80 text-sm">Remplissez les informations ci-dessous</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="overflow-y-auto flex-1 px-6 md:px-8 py-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Nom */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom de la société *</label>
                <div className="relative">
                  <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-lg ${
                      errors.nom ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
                    } focus:ring-2 focus:ring-cyan-500 transition-all`}
                    placeholder="Nom de la société"
                  />
                </div>
                {errors.nom && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.nom}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-lg ${
                      errors.email ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
                    } focus:ring-2 focus:ring-cyan-500 transition-all`}
                    placeholder="exemple@entreprise.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.email}</p>}
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe *</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-lg ${
                      errors.password ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"
                    } focus:ring-2 focus:ring-cyan-500 transition-all`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.password}</p>}
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>
              </div>

              {/* Ville */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ville</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
                    placeholder="Casablanca"
                  />
                </div>
              </div>

              {/* Adresse */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
                    placeholder="123 Rue Example"
                  />
                </div>
              </div>

              {/* Site web */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Site web</label>
                <div className="relative">
                  <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="site_web"
                    value={formData.site_web}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
                    placeholder="www.exemple.com"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <div className="relative">
                  <ToggleLeft size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Logo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Logo</label>
                <div className="relative">
                  <input
                    type="file"
                    name="logo"
                    onChange={handleChange}
                    className="hidden"
                    id="logo-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="flex items-center justify-center gap-2 w-full px-3 py-2.5 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 cursor-pointer transition-all"
                  >
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formData.logo ? formData.logo.name : "Choisir un fichier"}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCompanyModal;
