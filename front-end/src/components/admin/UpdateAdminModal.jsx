import { useState, useContext, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { X, Edit, Users, Shield, Upload, Calendar, Activity, Phone, Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { GlobaleContext } from "../../context/GlobaleContext";

export default function UpdateAdminModal({ admin, onClose }) {
  const { t } = useTranslation();
  const { setAlertMsg, setAlertFail, setAlertSucc, setLastActivitys } = useContext(GlobaleContext);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(admin?.photo ? `http://localhost:8000/storage/${admin.photo}` : "");
  
  const [formData, setFormData] = useState({
    nom: admin?.nom || "",
    prenom: admin?.prenom || "",
    email: admin?.email || "",
    telephone: admin?.telephone || "",
    role: admin?.role || "admin",
    actif: admin?.actif !== undefined ? admin.actif : true,
    password: "",
  });

  // Fonction d'alerte optimisée
  const showAlert = useCallback((message, type = "error") => {
    setAlertMsg(message);
    const setAlert = type === "success" ? setAlertSucc : setAlertFail;
    setAlert(true);
    setTimeout(() => setAlert(false), type === "success" ? 2000 : 3000);
  }, [setAlertMsg, setAlertSucc, setAlertFail]);

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

    if (file.size > 5 * 1024 * 1024) {
      showAlert(t("updateAdmin.fileTooLarge"));
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }, [showAlert, t]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'password' && !value.trim()) return; // Skip empty password
        if (key === 'actif') {
          data.append(key, value ? 1 : 0);
        } else {
          data.append(key, value);
        }
      });

      if (image) {
        data.append("photo", image);
      }

      const response = await axios.post(
        `http://localhost:8000/api/admin/${admin.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setLastActivitys(prev => [...prev, { 
          date: new Date(), 
          action: `Modifier admin: ${formData.nom} ${formData.prenom}` 
        }]);
        showAlert(t("updateAdmin.successMessage"), "success");
        setTimeout(onClose, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.errors 
        ? Object.values(error.response.data.errors).flat().join(", ")
        : t("updateAdmin.errorMessage");
      showAlert(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [formData, image, admin.id, setLastActivitys, showAlert, t, onClose]);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return t("updateAdmin.neverConnected");
    return new Date(dateString).toLocaleDateString('fr-FR');
  }, [t]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30">
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto border border-gray-200 max-h-[90vh] overflow-y-auto"
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
                {t("updateAdmin.title")}
              </h3>
              <p className="text-sm text-gray-500">
                {admin?.nom} {admin?.prenom}
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
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 mb-1">
                <Calendar className="w-3 h-3" />
                <span className="text-xs font-medium">Création</span>
              </div>
              <p className="text-xs text-blue-900">
                {formatDate(admin?.created_at)}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="flex items-center gap-2 text-green-700 mb-1">
                <Activity className="w-3 h-3" />
                <span className="text-xs font-medium">Dernière connexion</span>
              </div>
              <p className="text-xs text-green-900">
                {formatDate(admin?.derniere_connexion)}
              </p>
            </div>
          </div>

          {/* Image Upload */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Users className="w-8 h-8 text-gray-400" />
                )}
              </div>
            </div>
            
            <label className="block mt-3">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                Changer la photo
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (max 5MB)</p>
          </div>

          {/* Personal Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              Informations personnelles
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                placeholder="Nom *"
                className="col-span-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                placeholder="Prénom *"
                className="col-span-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email *"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              placeholder="Téléphone"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-500" />
              Sécurité
            </h4>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-800">
                Laissez vide pour garder l'actuel mot de passe
              </p>
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nouveau mot de passe"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Role and Status */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              Permissions
            </h4>
            
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="admin">Admin</option>
              <option value="Sous_administrateur">Sous-admin</option>
            </select>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="actif"
                  checked={formData.actif}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full transition-colors ${formData.actif ? "bg-green-500" : "bg-gray-300"}`} />
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.actif ? "translate-x-6" : ""}`} />
              </div>
              <span className="text-sm text-gray-700">
                Compte {formData.actif ? "actif" : "inactif"}
              </span>
            </label>
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
                  <Edit className="w-4 h-4" />
                  Modifier
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}