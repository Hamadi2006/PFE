import React from 'react';
import { X, Save } from 'lucide-react';

const PropertyModal = ({ 
  showModal, 
  closeModal, 
  modalMode, 
  currentAnnouncement, 
  setCurrentAnnouncement, 
  handleSaveAnnouncement, 
  language 
}) => {
  if (!showModal) return null;

  const translations = {
    en: {
      addAnnouncement: 'New Property',
      editAnnouncement: 'Edit Property',
      title: 'Property Title',
      description: 'Description',
      location: 'Location',
      type: 'Property Type',
      price: 'Price',
      surface: 'Surface Area',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      status: 'Status',
      apartment: 'Apartment',
      villa: 'Villa',
      commercial: 'Commercial',
      land: 'Land',
      active: 'Active',
      closed: 'Closed',
      save: 'Save',
      cancel: 'Cancel'
    },
    fr: {
      addAnnouncement: 'Nouvelle propriété',
      editAnnouncement: 'Modifier la propriété',
      title: 'Titre de la propriété',
      description: 'Description',
      location: 'Emplacement',
      type: 'Type de propriété',
      price: 'Prix',
      surface: 'Surface',
      bedrooms: 'Chambres',
      bathrooms: 'Salles de bain',
      status: 'Statut',
      apartment: 'Appartement',
      villa: 'Villa',
      commercial: 'Commercial',
      land: 'Terrain',
      active: 'Actif',
      closed: 'Fermé',
      save: 'Enregistrer',
      cancel: 'Annuler'
    },
    ar: {
      addAnnouncement: 'عقار جديد',
      editAnnouncement: 'تعديل العقار',
      title: 'عنوان العقار',
      description: 'الوصف',
      location: 'الموقع',
      type: 'نوع العقار',
      price: 'السعر',
      surface: 'المساحة',
      bedrooms: 'الغرف',
      bathrooms: 'الحمامات',
      status: 'الحالة',
      apartment: 'شقة',
      villa: 'فيلا',
      commercial: 'تجاري',
      land: 'أرض',
      active: 'نشط',
      closed: 'مغلق',
      save: 'حفظ',
      cancel: 'إلغاء'
    }
  };

  const t = translations[language];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {modalMode === 'add' ? t.addAnnouncement : t.editAnnouncement}
          </h2>
          <button
            onClick={closeModal}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-xl transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t.title}</label>
            <input
              type="text"
              value={currentAnnouncement.title}
              onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, title: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g. Luxury Villa in Agdal"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t.description}</label>
            <textarea
              value={currentAnnouncement.description}
              onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, description: e.target.value})}
              rows="5"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe the property, features, amenities, and location advantages..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.location}</label>
              <input
                type="text"
                value={currentAnnouncement.location}
                onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, location: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g. Agdal, Rabat"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.type}</label>
              <select
                value={currentAnnouncement.type}
                onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, type: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Apartment">{t.apartment}</option>
                <option value="Villa">{t.villa}</option>
                <option value="Commercial">{t.commercial}</option>
                <option value="Land">{t.land}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.price}</label>
              <input
                type="text"
                value={currentAnnouncement.price}
                onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, price: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g. 2,500,000 MAD"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.surface}</label>
              <input
                type="text"
                value={currentAnnouncement.surface}
                onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, surface: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g. 320 m²"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.bedrooms}</label>
              <input
                type="number"
                value={currentAnnouncement.bedrooms}
                onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, bedrooms: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g. 4"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.bathrooms}</label>
              <input
                type="number"
                value={currentAnnouncement.bathrooms}
                onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, bathrooms: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g. 3"
              />
            </div>
          </div>

          {modalMode === 'edit' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.status}</label>
              <select
                value={currentAnnouncement.status}
                onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, status: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="active">{t.active}</option>
                <option value="closed">{t.closed}</option>
              </select>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-6 flex justify-end space-x-3 border-t border-gray-200">
          <button
            onClick={closeModal}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSaveAnnouncement}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center space-x-2 font-medium"
          >
            <Save className="w-5 h-5" />
            <span>{t.save}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;