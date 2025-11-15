// ========================================
// UpdateImmobilier.jsx - Composant complet traduit
// ========================================

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobaleContext } from '../../context/GlobaleContext';
import { useTranslation } from 'react-i18next';

function UpdateImmobilier({ isOpen, onClose, selectedAnnouncement }) {
  const { t } = useTranslation();
  const { setAlertSucc, setAlertFail, setAlertMsg } = useContext(GlobaleContext);
  
  const [mainImage, setMainImage] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    titre: '',
    type: 'appartement',
    description: '',
    transaction: 'vente',
    prix: '',
    surface: '',
    chambres: '',
    salles_de_bain: '',
    etage: '',
    nombre_etages: '',
    annee_construction: '',
    piscine: false,
    jardin: false,
    parking: false,
    ascenseur: false,
    climatisation: false,
    en_vedette: false,
    statut: 'disponible',
    ville: '',
    adresse: '',
    latitude: '',
    longitude: '',
    nom_contact: '',
    telephone_contact: '',
    email_contact: ''
  });

  useEffect(() => {
    if (selectedAnnouncement) {
      const propertyData = selectedAnnouncement;
      
      setFormData({
        titre: propertyData.titre || '',
        type: propertyData.type || 'appartement',
        description: propertyData.description || '',
        transaction: propertyData.transaction || 'vente',
        prix: propertyData.prix || '',
        surface: propertyData.surface || '',
        chambres: propertyData.chambres || '',
        salles_de_bain: propertyData.salles_de_bain || '',
        etage: propertyData.etage || '',
        nombre_etages: propertyData.nombre_etages || '',
        annee_construction: propertyData.annee_construction || '',
        piscine: propertyData.piscine || false,
        jardin: propertyData.jardin || false,
        parking: propertyData.parking || false,
        ascenseur: propertyData.ascenseur || false,
        climatisation: propertyData.climatisation || false,
        en_vedette: propertyData.en_vedette || false,
        statut: propertyData.statut || 'disponible',
        ville: propertyData.ville || '',
        adresse: propertyData.adresse || '',
        latitude: propertyData.latitude || '',
        longitude: propertyData.longitude || '',
        nom_contact: propertyData.nom_contact || '',
        telephone_contact: propertyData.telephone_contact || '',
        email_contact: propertyData.email_contact || ''
      });

      setMainImage(propertyData.image_principale_url || null);
      setMainImageFile(null);

      let imagesArray = [];
      if (propertyData.images) {
        try {
          const imagePaths = JSON.parse(propertyData.images);
          imagesArray = imagePaths.map(path => 
            `http://localhost:8000/storage/${path}`
          );
        } catch (e) {
          console.error('Error parsing images:', e);
        }
      }
      setAdditionalImages(imagesArray);
      
      setNewImages([]);
      setNewImageFiles([]);
      setDeletedImages([]);
      setError(null);
      setSuccess(false);
    }
  }, [selectedAnnouncement]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImageFiles(prev => [...prev, ...files]);
    
    const newImagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(newImagePromises).then(images => {
      setNewImages(prev => [...prev, ...images]);
    });
  };
  
  const removeExistingImage = (index) => {
    const imageUrl = additionalImages[index];
    const imagePath = imageUrl.replace('http://localhost:8000/storage/', '');
    setDeletedImages(prev => [...prev, imagePath]);
    
    const updated = additionalImages.filter((_, i) => i !== index);
    setAdditionalImages(updated);
  };
  
  const removeNewImage = (index) => {
    const updatedImages = newImages.filter((_, i) => i !== index);
    const updatedFiles = newImageFiles.filter((_, i) => i !== index);
    setNewImages(updatedImages);
    setNewImageFiles(updatedFiles);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          if (typeof formData[key] === 'boolean') {
            submitData.append(key, formData[key] ? '1' : '0');
          } else {
            submitData.append(key, formData[key]);
          }
        }
      });
      
      if (mainImageFile) {
        submitData.append('image_principale', mainImageFile);
      }
      
      newImageFiles.forEach((file, index) => {
        submitData.append(`images[${index}]`, file);
      });
      
      if (deletedImages.length > 0) {
        submitData.append('deleted_images', JSON.stringify(deletedImages));
      }
      
      submitData.append('_method', 'PUT');
      
      const response = await axios.post(
        `http://localhost:8000/api/immobilier/${selectedAnnouncement.id}`,
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      
      if (response.data.success) {
        setSuccess(true);
        setAlertSucc(true);
        setAlertMsg(t('realEstate.alerts.successUpdate'));
        setTimeout(() => {
          setAlertSucc(false);
          onClose();
          window.location.reload();
        }, 1500);
      }
      
    } catch (err) {
      setAlertFail(true);
      setAlertMsg(t('realEstate.alerts.errorUpdate'));
      setTimeout(() => setAlertFail(false), 3000);
      setError(
        err.response?.data?.message || 
        t('realEstate.alerts.errorUpdate')
      );
      
      if (err.response?.data?.errors) {
        console.error('Validation errors:', err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-auto max-h-[90vh] overflow-hidden flex flex-col'>
        
        {/* Header */}
        <div className='bg-white border-b border-gray-200 px-6 py-4'>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>
                {t('realEstate.update.titleEditProperty')}
              </h2>
              <p className='text-sm text-gray-600'>
                {t('realEstate.update.subtitleUpdateInfo')}
              </p>
            </div>
            <button 
              onClick={onClose}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
              disabled={loading}
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        {success && (
          <div className='mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg'>
            <p className='text-green-800 text-sm font-medium'>
              ✓ {t('realEstate.update.successMessage')}
            </p>
          </div>
        )}
        
        {error && (
          <div className='mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-red-800 text-sm font-medium'>✗ {error}</p>
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          <div className='space-y-6'>
            
            {/* Section 1: Main Information */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                {t('realEstate.sections.mainInformation')}
              </h3>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.fields.propertyTitle')} *
                  </label>
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.fields.propertyType')}
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  >
                    <option value="appartement">{t('realEstate.propertyTypes.apartment')}</option>
                    <option value="maison">{t('realEstate.propertyTypes.house')}</option>
                    <option value="villa">{t('realEstate.propertyTypes.villa')}</option>
                    <option value="studio">{t('realEstate.propertyTypes.studio')}</option>
                    <option value="terrain">{t('realEstate.propertyTypes.land')}</option>
                    <option value="bureau">{t('realEstate.propertyTypes.office')}</option>
                    <option value="commerce">{t('realEstate.propertyTypes.commercial')}</option>
                  </select>
                </div>
              </div>

              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  {t('realEstate.fields.description')}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.fields.transactionType')}
                  </label>
                  <select
                    name="transaction"
                    value={formData.transaction}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  >
                    <option value="vente">{t('realEstate.transactionTypes.sale')}</option>
                    <option value="location">{t('realEstate.transactionTypes.rent')}</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.fields.priceMad')}
                  </label>
                  <input
                    type="number"
                    name="prix"
                    value={formData.prix}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.fields.surfaceM2')}
                  </label>
                  <input
                    type="number"
                    name="surface"
                    value={formData.surface}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Characteristics */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                {t('realEstate.sections.characteristics')}
              </h3>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <h4 className='font-medium text-gray-900'>
                    {t('realEstate.sections.composition')}
                  </h4>
                  
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        {t('realEstate.fields.bedrooms')}
                      </label>
                      <input
                        type="number"
                        name="chambres"
                        value={formData.chambres}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        {t('realEstate.fields.bathrooms')}
                      </label>
                      <input
                        type="number"
                        name="salles_de_bain"
                        value={formData.salles_de_bain}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        {t('realEstate.fields.floor')}
                      </label>
                      <input
                        type="number"
                        name="etage"
                        value={formData.etage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        {t('realEstate.fields.totalFloors')}
                      </label>
                      <input
                        type="number"
                        name="nombre_etages"
                        value={formData.nombre_etages}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      {t('realEstate.fields.constructionYear')}
                    </label>
                    <input
                      type="number"
                      name="annee_construction"
                      value={formData.annee_construction}
                      onChange={handleInputChange}
                      min="1900"
                      max="2030"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    />
                  </div>
                </div>

                <div className='space-y-4'>
                  <h4 className='font-medium text-gray-900'>
                    {t('realEstate.sections.amenities')}
                  </h4>
                  
                  <div className='grid grid-cols-1 gap-3'>
                    {[
                      { name: 'piscine', label: t('realEstate.amenities.pool') },
                      { name: 'jardin', label: t('realEstate.amenities.garden') },
                      { name: 'parking', label: t('realEstate.amenities.parking') },
                      { name: 'ascenseur', label: t('realEstate.amenities.elevator') },
                      { name: 'climatisation', label: t('realEstate.amenities.airConditioning') },
                      { name: 'en_vedette', label: t('realEstate.amenities.featured') }
                    ].map((equipement) => (
                      <label key={equipement.name} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          name={equipement.name}
                          checked={formData[equipement.name]}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{equipement.label}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      {t('realEstate.fields.status')}
                    </label>
                    <select
                      name="statut"
                      value={formData.statut}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    >
                      <option value="disponible">{t('realEstate.statusOptions.available')}</option>
                      <option value="vendu">{t('realEstate.statusOptions.sold')}</option>
                      <option value="loue">{t('realEstate.statusOptions.rented')}</option>
                      <option value="reserve">{t('realEstate.statusOptions.reserved')}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Location */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                {t('realEstate.sections.location')}
              </h3>
              
              <div className='grid grid-cols-1 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.fields.city')} *
                  </label>
                  <input
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.fields.fullAddress')}
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      {t('realEstate.fields.latitude')}
                    </label>
                    <input
                      type="text"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      {t('realEstate.fields.longitude')}
                    </label>
                    <input
                      type="text"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Contact */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                {t('realEstate.sections.contact')}
              </h3>
              
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.fields.contactName')}
                  </label>
                  <input
                    type="text"
                    name="nom_contact"
                    value={formData.nom_contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.fields.phone')}
                  </label>
                  <input
                    type="tel"
                    name="telephone_contact"
                    value={formData.telephone_contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.fields.email')}
                  </label>
                  <input
                    type="email"
                    name="email_contact"
                    value={formData.email_contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Images */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                {t('realEstate.sections.images')}
              </h3>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.fields.mainImage')}
                  </label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleMainImageChange}
                    className="hidden"
                    id="mainImageInput"
                  />
                  <label 
                    htmlFor="mainImageInput"
                    className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  >
                    {mainImage ? (
                      <div className="space-y-2">
                        <img 
                          src={mainImage} 
                          alt={t('realEstate.update.mainImageAlt')}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <p className="text-xs text-blue-600 font-medium">
                          {t('realEstate.update.clickToModify')}
                        </p>
                      </div>
                    ) : (
                      <>
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                          {t('realEstate.update.dragDropOrClick')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t('realEstate.update.imageFormats')}
                        </p>
                      </>
                    )}
                  </label>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('realEstate.update.addImages')}
                  </label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    onChange={handleAdditionalImagesChange}
                    className="hidden"
                    id="additionalImagesInput"
                  />
                  <label 
                    htmlFor="additionalImagesInput"
                    className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  >
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      {t('realEstate.update.addAdditionalImages')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t('realEstate.update.maxImagesMultiple')}
                    </p>
                  </label>
                </div>
              </div>

              {/* Existing images */}
              {additionalImages.length > 0 && (
                <div className='mt-6'>
                  <label className='block text-sm font-medium text-gray-700 mb-3'>
                    {t('realEstate.update.currentImages')} ({additionalImages.length})
                  </label>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {additionalImages.map((url, index) => (
                      <div key={`existing-${index}`} className='relative group'>
                        <img 
                          src={url} 
                          alt={`${t('realEstate.update.imageAlt')} ${index + 1}`}
                          className='w-full h-24 object-cover rounded-lg border-2 border-gray-200'
                        />
                        <button 
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600'
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* New images */}
              {newImages.length > 0 && (
                <div className='mt-6'>
                  <label className='block text-sm font-medium text-gray-700 mb-3'>
                    {t('realEstate.update.newImages')} ({newImages.length})
                  </label>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {newImages.map((url, index) => (
                      <div key={`new-${index}`} className='relative group'>
                        <img 
                          src={url} 
                          alt={`${t('realEstate.update.newImageAlt')} ${index + 1}`}
                          className='w-full h-24 object-cover rounded-lg border-2 border-blue-300'
                        />
                        <div className='absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded'>
                          {t('realEstate.update.newBadge')}
                        </div>
                        <button 
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600'
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className='flex justify-end space-x-4 pt-6 border-t border-gray-200'>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('realEstate.buttons.cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{t('realEstate.buttons.updating')}</span>
                  </>
                ) : (
                  <span>{t('realEstate.buttons.update')}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateImmobilier;