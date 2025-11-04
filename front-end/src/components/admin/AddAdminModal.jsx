// modals/AddAdminModal.jsx
import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { X, UserPlus, Users, Shield, Upload, Camera } from 'lucide-react';
import axios from 'axios';
import { GlobaleContext } from "../../context/GlobaleContext"

export default function AddAdminModal({ onClose }) {
  const { t } = useTranslation();
  const {
    alertSucc,
    setAlertSucc,
    alertFail,
    setAlertFail,
    alertMsg,
    setAlertMsg,
  } = useContext(GlobaleContext);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    mot_de_passe_confirmation: '',
    telephone: '',
    role: 'admin'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setAlertMsg('Le fichier n\'est pas une image');
        setAlertFail(true);
        setTimeout(() => {
          setAlertFail(false);
        }, 3000);
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setAlertMsg('La taille du fichier dépasse 5MB');
        setAlertFail(true);
        setTimeout(() => {
          setAlertFail(false);
        }, 3000);
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setAlertMsg('Veuillez sélectionner une image');
      setAlertFail(true);
      setTimeout(() => {
        setAlertFail(false);
      }, 3000);
      return;
    }

    if (formData.mot_de_passe !== formData.mot_de_passe_confirmation) {
      setAlertMsg('Les mots de passe ne correspondent pas');
      setAlertFail(true);
      setTimeout(() => {
        setAlertFail(false);
      }, 3000);
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('nom', formData.nom);
      data.append('prenom', formData.prenom);
      data.append('email', formData.email);
      data.append('mot_de_passe', formData.mot_de_passe);
      data.append('mot_de_passe_confirmation', formData.mot_de_passe_confirmation);
      data.append('telephone', formData.telephone);
      data.append('role', formData.role);
      data.append('photo', image);

      const response = await axios.post('http://localhost:8000/api/admin/store', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAlertMsg('Administrateur ajouté avec succès !');
      setAlertSucc(true);
      
      setTimeout(() => {
        setAlertSucc(false);
        onClose();
      }, 2000);
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de l\'ajout de l\'administrateur';
      setAlertMsg(message);
      setAlertFail(true);
      
      setTimeout(() => {
        setAlertFail(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-gradient-to-br from-blue-500/20 via-gray-500/20 to-gray-500/20 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-white/30 p-6 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {t('admins.modal.title')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors hover:bg-white/50 rounded-lg p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Profile Image Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              Photo de profil
            </h4>

            <div className="flex flex-col items-center gap-4">
              {/* Image Preview */}
              <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-blue-300 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-blue-400" />
                    <span className="text-xs text-blue-600 font-medium">Ajouter photo</span>
                  </div>
                )}
              </div>

              {/* File Input */}
              <div className="w-full">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <span className="inline-block w-full px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600 rounded-lg font-medium cursor-pointer text-center transition-all border border-blue-200 backdrop-blur-sm">
                    Sélectionner une image
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  PNG, JPG ou GIF (Max 5MB)
                </p>
              </div>

              {/* Remove Image Button */}
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50/80 backdrop-blur-sm rounded-lg font-medium transition-colors border border-red-200"
                >
                  Supprimer l'image
                </button>
              )}
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              {t('admins.modal.personalInfo')}
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                  required
                  placeholder="Entrez le nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                  required
                  placeholder="Entrez le prénom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admins.modal.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                  required
                  placeholder="exemple@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admins.modal.phone')}
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                  required
                  placeholder="+212 6XX XXX XXX"
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              {t('admins.modal.security')}
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admins.modal.password')} *
                </label>
                <input
                  type="password"
                  name="mot_de_passe"
                  value={formData.mot_de_passe}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                  required
                  minLength="8"
                  placeholder="Minimum 8 caractères"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t('admins.modal.passwordHint')}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admins.modal.confirmPassword')} *
                </label>
                <input
                  type="password"
                  name="mot_de_passe_confirmation"
                  value={formData.mot_de_passe_confirmation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                  required
                  minLength="8"
                  placeholder="Confirmer le mot de passe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('admins.modal.role')}
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/30">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white/80 backdrop-blur-sm transition-colors font-medium"
              disabled={loading}
            >
              {t('admins.modal.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin">⏳</span>
                  {t('admins.modal.adding')}
                </>
              ) : (
                t('admins.modal.submit')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}