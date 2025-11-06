import React, { useState } from 'react';
import { Edit2, Save, X, Globe } from 'lucide-react';

const SettingsView = ({ companyProfile, setCompanyProfile, language, setLanguage }) => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState(companyProfile);

  const translations = {
    en: {
      companyProfile: 'Agency Profile',
      companyName: 'Agency Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Office Address',
      language: 'Language',
      website: 'Website',
      specialty: 'Specialty',
      license: 'License Number',
      description: 'Description',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel'
    },
    fr: {
      companyProfile: 'Profil agence',
      companyName: 'Nom agence',
      email: 'Email',
      phone: 'Téléphone',
      address: 'Adresse',
      language: 'Langue',
      website: 'Site web',
      specialty: 'Spécialité',
      license: 'Numéro de licence',
      description: 'Description',
      edit: 'Modifier',
      save: 'Enregistrer',
      cancel: 'Annuler'
    },
    ar: {
      companyProfile: 'ملف الوكالة',
      companyName: 'اسم الوكالة',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      address: 'العنوان',
      language: 'اللغة',
      website: 'الموقع الإلكتروني',
      specialty: 'التخصص',
      license: 'رقم الترخيص',
      description: 'الوصف',
      edit: 'تعديل',
      save: 'حفظ',
      cancel: 'إلغاء'
    }
  };

  const t = translations[language];

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        {/* Agency Profile */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{t.companyProfile}</h2>
            {!editingProfile ? (
              <button
                onClick={() => {
                  setEditingProfile(true);
                  setTempProfile(companyProfile);
                }}
                className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-all"
              >
                <Edit2 className="w-4 h-4" />
                <span>{t.edit}</span>
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setCompanyProfile(tempProfile);
                    setEditingProfile(false);
                  }}
                  className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.save}</span>
                </button>
                <button
                  onClick={() => {
                    setTempProfile(companyProfile);
                    setEditingProfile(false);
                  }}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-all"
                >
                  <X className="w-4 h-4" />
                  <span>{t.cancel}</span>
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.companyName}
              </label>
              <input
                type="text"
                value={editingProfile ? tempProfile.name : companyProfile.name}
                onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                disabled={!editingProfile}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                value={editingProfile ? tempProfile.email : companyProfile.email}
                onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                disabled={!editingProfile}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.phone}
              </label>
              <input
                type="tel"
                value={editingProfile ? tempProfile.phone : companyProfile.phone}
                onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                disabled={!editingProfile}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.website}
              </label>
              <input
                type="text"
                value={editingProfile ? tempProfile.website : companyProfile.website}
                onChange={(e) => setTempProfile({...tempProfile, website: e.target.value})}
                disabled={!editingProfile}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.specialty}
              </label>
              <input
                type="text"
                value={editingProfile ? tempProfile.specialty : companyProfile.specialty}
                onChange={(e) => setTempProfile({...tempProfile, specialty: e.target.value})}
                disabled={!editingProfile}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.license}
              </label>
              <input
                type="text"
                value={editingProfile ? tempProfile.license : companyProfile.license}
                onChange={(e) => setTempProfile({...tempProfile, license: e.target.value})}
                disabled={!editingProfile}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.address}
              </label>
              <input
                type="text"
                value={editingProfile ? tempProfile.address : companyProfile.address}
                onChange={(e) => setTempProfile({...tempProfile, address: e.target.value})}
                disabled={!editingProfile}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.description}
              </label>
              <textarea
                value={editingProfile ? tempProfile.description : companyProfile.description}
                onChange={(e) => setTempProfile({...tempProfile, description: e.target.value})}
                disabled={!editingProfile}
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-3 text-blue-600" />
            {t.language}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setLanguage('en')}
              className={`p-6 rounded-xl border-2 transition-all ${
                language === 'en' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-4xl mb-3">🇬🇧</div>
              <div className={`font-bold ${language === 'en' ? 'text-blue-600' : 'text-gray-800'}`}>
                English
              </div>
            </button>
            <button
              onClick={() => setLanguage('fr')}
              className={`p-6 rounded-xl border-2 transition-all ${
                language === 'fr' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-4xl mb-3">🇫🇷</div>
              <div className={`font-bold ${language === 'fr' ? 'text-blue-600' : 'text-gray-800'}`}>
                Français
              </div>
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`p-6 rounded-xl border-2 transition-all ${
                language === 'ar' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-4xl mb-3">🇲🇦</div>
              <div className={`font-bold ${language === 'ar' ? 'text-blue-600' : 'text-gray-800'}`}>
                العربية
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;