import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  Building2,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Briefcase,
  FileText,
  Edit3
} from 'lucide-react';

const SettingsView = ({ companyProfile, onEditProfile }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  const InfoCard = ({ icon: Icon, label, value, isLink = false, isFullWidth = false }) => (
    <div className={`bg-gray-50 rounded-lg p-4 border border-gray-200 ${
      isFullWidth ? 'md:col-span-2' : ''
    }`}>
      <div className="flex items-center space-x-2 mb-2">
        <Icon className="w-4 h-4 text-gray-600" />
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
      {isLink ? (
        <a 
          href={value?.startsWith('http') ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
        >
          {value}
          <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <p className="text-gray-900 font-medium">{value || '-'}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('settingsC.title')}</h1>
            <p className="text-gray-600 mt-1">{t('settingsC.subtitle')}</p>
          </div>
          <button
            onClick={onEditProfile}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            {t('settingsC.editProfile', 'Modifier le profil')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profil Société */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      companyProfile.logo
                        ? `http://localhost:8000/storage/${companyProfile.logo}`
                        : '/default-company.png'
                    }
                    alt={companyProfile.nom || 'Company Logo'}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t('settingsC.companyProfile')}
                    </h2>
                    <p className="text-gray-600">{t('settingsC.generalInfo', 'Informations générales')}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard 
                    icon={Building2} 
                    label={t('settingsC.companyName', "Nom de l'entreprise")} 
                    value={companyProfile.nom}
                  />
                  <InfoCard 
                    icon={Mail} 
                    label={t('settingsC.email', 'Email')} 
                    value={companyProfile.email}
                    isLink
                  />
                  <InfoCard 
                    icon={Phone} 
                    label={t('settingsC.phone', 'Téléphone')} 
                    value={companyProfile.telephone}
                  />
                  <InfoCard 
                    icon={ExternalLink} 
                    label={t('settingsC.website', 'Site web')} 
                    value={companyProfile.site_web}
                    isLink
                  />
                  <InfoCard 
                    icon={Briefcase} 
                    label={t('settingsC.specialty', 'Spécialité')} 
                    value={companyProfile.statut}
                  />
                  <InfoCard 
                    icon={FileText} 
                    label={t('settingsC.city', 'Ville')} 
                    value={companyProfile.ville}
                  />
                  <InfoCard 
                    icon={MapPin} 
                    label={t('settingsC.address', 'Adresse')} 
                    value={companyProfile.adresse}
                    isFullWidth
                  />
                  <InfoCard 
                    icon={FileText} 
                    label={t('settingsC.description', 'Description')} 
                    value={companyProfile.description}
                    isFullWidth
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Langue */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('settingsC.language', 'Langue')}
                </h2>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => changeLanguage('FR')}
                  className={`w-full p-4 rounded-lg border transition-colors ${
                    currentLanguage === 'FR'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇫🇷</span>
                    <div className="text-left">
                      <div className={`font-medium ${
                        currentLanguage === 'FR' ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {t('settingsC.french', 'Français')}
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => changeLanguage('EN')}
                  className={`w-full p-4 rounded-lg border transition-colors ${
                    currentLanguage === 'EN'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇬🇧</span>
                    <div className="text-left">
                      <div className={`font-medium ${
                        currentLanguage === 'EN' ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {t('settingsC.english', 'English')}
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => changeLanguage('AR')}
                  className={`w-full p-4 rounded-lg border transition-colors ${
                    currentLanguage === 'AR'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇲🇦</span>
                    <div className="text-left">
                      <div className={`font-medium ${
                        currentLanguage === 'AR' ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {t('settingsC.arabic', 'العربية')}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;