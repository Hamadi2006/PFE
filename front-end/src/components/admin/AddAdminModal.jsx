// modals/AddAdminModal.jsx
import { useState, useContext, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { X, UserPlus, Users, Shield, Upload, Camera } from "lucide-react";
import axios from "axios";
import { GlobaleContext } from "../../context/GlobaleContext";

export default function AddAdminModal({ onClose }) {
  const { t } = useTranslation();
  const { setAlertMsg, setAlertFail, setAlertSucc, setLastActivitys } = useContext(GlobaleContext);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    nom: "", prenom: "", email: "", telephone: "",
    mot_de_passe: "", mot_de_passe_confirmation: "", role: "admin"
  });

  // Fonction d'alerte optimisée
  const showAlert = useCallback((message, type = "error") => {
    setAlertMsg(message);
    const setAlert = type === "success" ? setAlertSucc : setAlertFail;
    setAlert(true);
    setTimeout(() => setAlert(false), type === "success" ? 2000 : 3000);
  }, [setAlertMsg, setAlertSucc, setAlertFail]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showAlert("Le fichier n'est pas une image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showAlert("La taille du fichier dépasse 5MB");
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }, [showAlert]);

  const removeImage = useCallback(() => {
    setImage(null);
    setImagePreview(null);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!image) {
      showAlert("Veuillez sélectionner une image");
      return;
    }

    if (formData.mot_de_passe !== formData.mot_de_passe_confirmation) {
      showAlert("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    const admin = JSON.parse(localStorage.getItem('user'));

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append("photo", image);

      await axios.post("http://localhost:8000/api/admin/store", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLastActivitys(prev => [...prev, {
        date: new Date(),
        action: `Ajout admin: ${formData.nom} ${formData.prenom}`,
        par: admin.nom_complet
      }]);

      showAlert("Administrateur ajouté avec succès !", "success");
      setTimeout(onClose, 2000);
    } catch (error) {
      showAlert(error.response?.data?.message || "Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  }, [formData, image, onClose, setLastActivitys, showAlert]);

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
              <UserPlus className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {t("admins.modal.title")}
            </h3>
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
              <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-6 h-6 text-gray-400" />
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
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                Choisir une photo
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
              placeholder="Téléphone *"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              Sécurité
            </h4>
            
            <input
              type="password"
              name="mot_de_passe"
              value={formData.mot_de_passe}
              onChange={handleInputChange}
              placeholder="Mot de passe *"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength="8"
            />
            
            <input
              type="password"
              name="mot_de_passe_confirmation"
              value={formData.mot_de_passe_confirmation}
              onChange={handleInputChange}
              placeholder="Confirmer le mot de passe *"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength="8"
            />
            
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
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
                  Ajout...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Ajouter
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}