import React, { useState, useCallback } from 'react';
import {
  X, Save, Home, MapPin, Ruler, Bed, Bath, DollarSign, Upload, Image,
  Phone, Mail, User, Star, Trees, Car, Building2, Snowflake, Sparkles
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PropertyModal = ({
  showModal,
  closeModal,
  modalMode,
  currentAnnouncement,
  setCurrentAnnouncement,
  handleSaveAnnouncement
}) => {
  // --- HOOKS ---
  const companie = JSON.parse(localStorage.getItem('companie'));
  const companie_id = companie.id;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // --- CALLBACKS ---
  const handleInputChange = useCallback((field, value) => {
    setCurrentAnnouncement(prev => ({
      ...prev,
      [field]: value,
      societe_id: companie_id
    }));
  }, [setCurrentAnnouncement, companie_id]);

  const handleCheckboxChange = useCallback((field) => {
    setCurrentAnnouncement(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }, [setCurrentAnnouncement]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }
    setCurrentAnnouncement(prev => ({ ...prev, image_principale: file }));
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }, [setCurrentAnnouncement]);

  const handleImagesChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    setCurrentAnnouncement(prev => ({
      ...prev,
      images: files
    }));
  }, [setCurrentAnnouncement]);

  const removeImage = useCallback(() => {
    setCurrentAnnouncement(prev => ({ ...prev, image_principale: null }));
    setImagePreview(null);
  }, [setCurrentAnnouncement]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleSaveAnnouncement();
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setLoading(false);
    }
  }, [handleSaveAnnouncement, closeModal]);

  // --- RENDER ---
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto border border-gray-200 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {modalMode === 'add' ? t('immobilierModal.addTitle') : t('immobilierModal.editTitle')}
              </h3>
            </div>
          </div>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 rounded">
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
                ) : currentAnnouncement.image_principale ? (
                  <img
                    src={`http://localhost:8000/storage/${currentAnnouncement.image_principale}`}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image className="w-8 h-8 text-gray-400" />
                )}
              </div>
              {(imagePreview || currentAnnouncement.image_principale) && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
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
                id="image-upload"
              />
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                {t('immobilierModal.uploadImage')}
              </span>
            </label>

            {/* Champ pour uploader plusieurs images */}
            <label className="block mt-3">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="hidden"
                id="images-upload"
              />
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                Ajouter des images supplémentaires
              </span>
            </label>
            {/* Affichage des images sélectionnées */}
            {currentAnnouncement.images && currentAnnouncement.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {currentAnnouncement.images.map((img, idx) => (
                  <span key={idx} className="text-xs bg-gray-200 rounded px-2 py-1">
                    {img.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.titre')} *
              </label>
              <input
                type="text"
                value={currentAnnouncement.titre || ''}
                onChange={(e) => handleInputChange('titre', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={t('immobilierModal.titrePlaceholder')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.type')} *
              </label>
              <select
                value={currentAnnouncement.type || ''}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">{t('immobilierModal.selectType')}</option>
                <option value="appartement">{t('immobilierModal.types.appartement')}</option>
                <option value="maison">{t('immobilierModal.types.maison')}</option>
                <option value="villa">{t('immobilierModal.types.villa')}</option>
                <option value="studio">{t('immobilierModal.types.studio')}</option>
                <option value="terrain">{t('immobilierModal.types.terrain')}</option>
                <option value="bureau">{t('immobilierModal.types.bureau')}</option>
                <option value="commerce">{t('immobilierModal.types.commerce')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.transaction')} *
              </label>
              <select
                value={currentAnnouncement.transaction || ''}
                onChange={(e) => handleInputChange('transaction', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">{t('immobilierModal.selectTransaction')}</option>
                <option value="vente">{t('immobilierModal.transactions.vente')}</option>
                <option value="location">{t('immobilierModal.transactions.location')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.ville')} *
              </label>
              <input
                type="text"
                value={currentAnnouncement.ville || ''}
                onChange={(e) => handleInputChange('ville', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={t('immobilierModal.villePlaceholder')}
                required
              />
            </div>
          </div>

          {/* Price & Surface */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.prix')} *
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="0.01"
                  value={currentAnnouncement.prix || ''}
                  onChange={(e) => handleInputChange('prix', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="2500000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.surface')} *
              </label>
              <div className="relative">
                <Ruler className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="0.01"
                  value={currentAnnouncement.surface || ''}
                  onChange={(e) => handleInputChange('surface', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="120"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.chambres')}
              </label>
              <div className="relative">
                <Bed className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="0"
                  value={currentAnnouncement.chambres || ''}
                  onChange={(e) => handleInputChange('chambres', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.salles_de_bain')}
              </label>
              <div className="relative">
                <Bath className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="0"
                  value={currentAnnouncement.salles_de_bain || ''}
                  onChange={(e) => handleInputChange('salles_de_bain', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.etage')}
              </label>
              <input
                type="number"
                min="0"
                value={currentAnnouncement.etage || ''}
                onChange={(e) => handleInputChange('etage', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.nombre_etages')}
              </label>
              <input
                type="number"
                min="0"
                value={currentAnnouncement.nombre_etages || ''}
                onChange={(e) => handleInputChange('nombre_etages', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="4"
              />
            </div>
          </div>

          {/* Construction Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('immobilierModal.annee_construction')}
            </label>
            <input
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              value={currentAnnouncement.annee_construction || ''}
              onChange={(e) => handleInputChange('annee_construction', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2020"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.adresse')}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={currentAnnouncement.adresse || ''}
                  onChange={(e) => handleInputChange('adresse', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={t('immobilierModal.adressePlaceholder')}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('immobilierModal.latitude')}
                </label>
                <input
                  type="number"
                  step="0.000001"
                  value={currentAnnouncement.latitude || ''}
                  onChange={(e) => handleInputChange('latitude', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="33.971590"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('immobilierModal.longitude')}
                </label>
                <input
                  type="number"
                  step="0.000001"
                  value={currentAnnouncement.longitude || ''}
                  onChange={(e) => handleInputChange('longitude', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="-6.849813"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('immobilierModal.amenities')}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentAnnouncement.piscine || false}
                  onChange={() => handleCheckboxChange('piscine')}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <Sparkles className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{t('immobilierModal.piscine')}</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentAnnouncement.jardin || false}
                  onChange={() => handleCheckboxChange('jardin')}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <Trees className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{t('immobilierModal.jardin')}</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentAnnouncement.parking || false}
                  onChange={() => handleCheckboxChange('parking')}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <Car className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{t('immobilierModal.parking')}</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentAnnouncement.ascenseur || false}
                  onChange={() => handleCheckboxChange('ascenseur')}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <Building2 className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{t('immobilierModal.ascenseur')}</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentAnnouncement.climatisation || false}
                  onChange={() => handleCheckboxChange('climatisation')}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <Snowflake className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{t('immobilierModal.climatisation')}</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentAnnouncement.en_vedette || false}
                  onChange={() => handleCheckboxChange('en_vedette')}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <Star className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{t('immobilierModal.en_vedette')}</span>
              </label>
            </div>
          </div>

          {/* Status */}
          {modalMode === 'edit' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.statut')}
              </label>
              <select
                value={currentAnnouncement.statut || 'disponible'}
                onChange={(e) => handleInputChange('statut', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="disponible">{t('immobilierModal.statuts.disponible')}</option>
                <option value="reserve">{t('immobilierModal.statuts.reserve')}</option>
                <option value="vendu">{t('immobilierModal.statuts.vendu')}</option>
                <option value="loue">{t('immobilierModal.statuts.loue')}</option>
              </select>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.nom_contact')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={currentAnnouncement.nom_contact || ''}
                  onChange={(e) => handleInputChange('nom_contact', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={t('immobilierModal.nom_contactPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.telephone_contact')}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={currentAnnouncement.telephone_contact || ''}
                  onChange={(e) => handleInputChange('telephone_contact', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+212 6XX XXX XXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('immobilierModal.email_contact')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={currentAnnouncement.email_contact || ''}
                  onChange={(e) => handleInputChange('email_contact', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="contact@example.com"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('immobilierModal.description')}
            </label>
            <textarea
              value={currentAnnouncement.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="3"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder={t('immobilierModal.descriptionPlaceholder')}
            />
          </div>

        </form>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-100">
          <button
            onClick={closeModal}
            className="flex-1 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            disabled={loading}
          >
            {t('immobilierModal.cancel')}
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? t('immobilierModal.saving') : t('immobilierModal.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;