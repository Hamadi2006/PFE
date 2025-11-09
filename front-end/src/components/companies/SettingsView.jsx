import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Building2, Mail, Phone, MapPin, ExternalLink, Briefcase, FileText } from 'lucide-react';

const SettingsView = ({ companyProfile }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        {/* Agency Profile - Display Only */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">{t('settingsC.companyProfile')}</h2>
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Building2 className="w-4 h-4 text-gray-600" />
                <label className="block text-sm font-semibold text-gray-700">
                  {t('settingsC.companyName')}
                </label>
              </div>
              <p className="text-gray-800 font-medium">{companyProfile.nom}</p>
            </div>

            {/* Email */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <label className="block text-sm font-semibold text-gray-700">
                  {t('settingsC.email')}
                </label>
              </div>
              <p className="text-gray-800 font-medium">{companyProfile.email}</p>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <label className="block text-sm font-semibold text-gray-700">
                  {t('settingsC.phone')}
                </label>
              </div>
              <p className="text-gray-800 font-medium">{companyProfile.telephone}</p>
            </div>

            {/* Website */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <ExternalLink className="w-4 h-4 text-gray-600" />
                <label className="block text-sm font-semibold text-gray-700">
                  {t('settingsC.website')}
                </label>
              </div>
              <p className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer">
                {companyProfile.site_web}
              </p>
            </div>

            {/* Specialty */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Briefcase className="w-4 h-4 text-gray-600" />
                <label className="block text-sm font-semibold text-gray-700">
                  {t('settingsC.specialty')}
                </label>
              </div>
              <p className="text-gray-800 font-medium">{companyProfile.statut}</p>
            </div>

            {/* License */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <label className="block text-sm font-semibold text-gray-700">
                  {t('settingsC.license')}
                </label>
              </div>
              <p className="text-gray-800 font-medium">{companyProfile.ville}</p>
            </div>

            {/* Address */}
            <div className="md:col-span-2 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <label className="block text-sm font-semibold text-gray-700">
                  {t('settingsC.address')}
                </label>
              </div>
              <p className="text-gray-800 font-medium">{companyProfile.adresse}</p>
            </div>

            {/* Description */}
            <div className="md:col-span-2 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <label className="block text-sm font-semibold text-gray-700">
                  {t('settingsC.description')}
                </label>
              </div>
              <p className="text-gray-700 leading-relaxed">{companyProfile.description}</p>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-3 text-blue-600" />
            {t('settingsC.language')}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => changeLanguage('EN')}
              className={`p-6 rounded-xl border-2 transition-all ${
                currentLanguage === 'EN' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-4xl mb-3">🇬🇧</div>
              <div className={`font-bold ${currentLanguage === 'EN' ? 'text-blue-600' : 'text-gray-800'}`}>
                {t('settingsC.english')}
              </div>
            </button>
            <button
              onClick={() => changeLanguage('FR')}
              className={`p-6 rounded-xl border-2 transition-all ${
                currentLanguage === 'FR' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-4xl mb-3">🇫🇷</div>
              <div className={`font-bold ${currentLanguage === 'FR' ? 'text-blue-600' : 'text-gray-800'}`}>
                {t('settingsC.french')}
              </div>
            </button>
            <button
              onClick={() => changeLanguage('AR')}
              className={`p-6 rounded-xl border-2 transition-all ${
                currentLanguage === 'AR' 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-4xl mb-3">🇲🇦</div>
              <div className={`font-bold ${currentLanguage === 'AR' ? 'text-blue-600' : 'text-gray-800'}`}>
                {t('settingsC.arabic')}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;