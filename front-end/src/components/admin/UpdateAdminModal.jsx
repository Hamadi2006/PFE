import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Edit, Users, Shield, Upload, Calendar, Activity, Phone, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { GlobaleContext } from "../../context/GlobaleContext";

export default function UpdateAdminModal({ admin, onClose }) {
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
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    admin?.photo ? `http://localhost:8000/storage/${admin.photo}` : ''
  );
  const [formData, setFormData] = useState({
    nom: admin?.nom || '',
    prenom: admin?.prenom || '',
    email: admin?.email || '',
    telephone: admin?.telephone || '',
    role: admin?.role || 'admin',
    actif: admin?.actif !== undefined ? admin.actif : true,
    derniere_connexion: admin?.derniere_connexion || '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setAlertMsg(t('updateAdmin.fileTooLarge'));
        setAlertFail(true);
        setTimeout(() => setAlertFail(false), 2000);
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Form Data:', formData);
    try {
      const data = new FormData();
      data.append('nom', formData.nom);
      data.append('prenom', formData.prenom);
      data.append('email', formData.email);
      data.append('telephone', formData.telephone);
      data.append('role', formData.role); // ✅ AJOUTÉ - Role est maintenant envoyé
      data.append('actif', formData.actif ? 1 : 0);
      
      if (formData.password && formData.password.trim() !== '') {
        data.append('mot_de_passe', formData.password);
      }
      
      if (image) {
        data.append('photo', image);
      }

      const response = await axios.post(
        `http://localhost:8000/api/admin/${admin.id}`, 
        data, 
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setAlertMsg(t('updateAdmin.successMessage'));
        setAlertSucc(true);
        setTimeout(() => {
          setAlertSucc(false);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Erreur:', error);
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        setAlertMsg(errorMessages.join(', '));
        setAlertFail(true);
        setTimeout(() => setAlertFail(false), 2000);
      } else {
        setAlertMsg(t('updateAdmin.errorMessage'));
        setAlertFail(true);
        setTimeout(() => setAlertFail(false), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return t('updateAdmin.neverConnected');
    return new Date(dateString).toLocaleString(t('locale'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Edit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {t('updateAdmin.title')}
              </h3>
              <p className="text-sm text-gray-500">
                {admin?.nom} {admin?.prenom}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{t('updateAdmin.createdAt')}</span>
              </div>
              <p className="text-sm text-blue-900">{formatDate(admin?.created_at)}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 text-green-700 mb-1">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">{t('updateAdmin.lastConnection')}</span>
              </div>
              <p className="text-sm text-green-900">{formatDate(admin?.derniere_connexion)}</p>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              {t('updateAdmin.profilePhoto')}
            </h4>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-32 h-32 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden shadow-lg">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Users className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                    <span className="text-xs text-blue-600 font-medium">{t('updateAdmin.noPhoto')}</span>
                  </div>
                )}
              </div>

              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('updateAdmin.changeImage')}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-2">{t('updateAdmin.imageFormat')}</p>
              </div>
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              {t('updateAdmin.personalInfo')}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('updateAdmin.lastName')} *
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder={t('updateAdmin.lastNamePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('updateAdmin.firstName')} *
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder={t('updateAdmin.firstNamePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {t('updateAdmin.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder={t('updateAdmin.emailPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {t('updateAdmin.phone')}
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('updateAdmin.phonePlaceholder')}
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-600" />
              {t('updateAdmin.security')}
            </h4>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-amber-800">
                <strong>{t('updateAdmin.note')}:</strong> {t('updateAdmin.passwordNote')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                {t('updateAdmin.newPassword')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {t('updateAdmin.passwordRequirement')}
              </p>
            </div>
          </div>

          {/* Role and Status Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              {t('updateAdmin.permissionsStatus')}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('updateAdmin.role')} *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Admin">{t('updateAdmin.roles.admin')}</option>
                  <option value="Sous_administrateur">{t('updateAdmin.roles.subAdmin')}</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="actif"
                      checked={formData.actif}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-14 h-8 rounded-full shadow-inner transition-colors ${
                      formData.actif ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      formData.actif ? 'transform translate-x-6' : ''
                    }`}></div>
                  </div>
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-700">
                      {t('updateAdmin.account')} {formData.actif ? t('updateAdmin.active') : t('updateAdmin.inactive')}
                    </span>
                    <p className="text-xs text-gray-500">
                      {formData.actif ? t('updateAdmin.canLogin') : t('updateAdmin.cannotLogin')}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">{t('updateAdmin.systemInfo')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-500">ID:</span>
                <span className="ml-2 font-mono text-gray-900">{admin?.id}</span>
              </div>
              <div>
                <span className="text-gray-500">{t('updateAdmin.lastModified')}:</span>
                <span className="ml-2 text-gray-900">{formatDate(admin?.updated_at)}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
              disabled={loading}
            >
              {t('updateAdmin.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('updateAdmin.updating')}
                </span>
              ) : (
                t('updateAdmin.update')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}