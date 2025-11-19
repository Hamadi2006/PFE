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
  Edit3,
  User,
  Shield,
  Bell,
  CreditCard
} from 'lucide-react';

const SettingsView = ({ companyProfile, onEditProfile }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  const languages = [
    { code: 'FR', name: t('settingsC.french', 'Français'), flag: '🇫🇷' },
    { code: 'EN', name: t('settingsC.english', 'English'), flag: '🇬🇧' },
    { code: 'AR', name: t('settingsC.arabic', 'العربية'), flag: '🇲🇦' }
  ];

  const settingsSections = [
    {
      title: t('settingsC.companyProfile'),
      icon: Building2,
      fields: [
        { icon: Building2, label: t('settingsC.companyName'), value: companyProfile.nom },
        { icon: Mail, label: t('settingsC.email'), value: companyProfile.email, isLink: true },
        { icon: Phone, label: t('settingsC.phone'), value: companyProfile.telephone },
        { icon: ExternalLink, label: t('settingsC.website'), value: companyProfile.site_web, isLink: true },
        { icon: Briefcase, label: t('settingsC.specialty'), value: companyProfile.statut },
        { icon: MapPin, label: t('settingsC.city'), value: companyProfile.ville },
        { icon: FileText, label: t('settingsC.address'), value: companyProfile.adresse, fullWidth: true },
        { icon: FileText, label: t('settingsC.description'), value: companyProfile.description, fullWidth: true }
      ]
    }
  ];

  const SettingCard = ({ title, icon: Icon, children, className = '' }) => (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 md:p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <Icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );

  const InfoField = ({ icon: Icon, label, value, isLink = false, fullWidth = false }) => (
    <div className={`space-y-2 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      {isLink && value ? (
        <a 
          href={value.startsWith('http') ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm break-all"
        >
          {value}
          <ExternalLink className="w-3 h-3 flex-shrink-0" />
        </a>
      ) : (
        <p className="text-gray-900 font-medium text-sm break-words">{value || '-'}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 break-words">
                {t('settingsC.title')}
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">{t('settingsC.subtitle')}</p>
            </div>
            
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-4 md:space-y-6">
            {/* Company Profile */}
            <SettingCard title={t('settingsC.companyProfile')} icon={Building2}>
              {/* Company Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                <img
                  src={
                    companyProfile.logo
                      ? `http://localhost:8000/storage/${companyProfile.logo}`
                      : '/default-company.png'
                  }
                  alt={companyProfile.nom || 'Company Logo'}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover border-2 border-white shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg break-words">
                    {companyProfile.nom || t('settingsC.companyName')}
                  </h3>
                  <p className="text-gray-600 text-sm">{t('settingsC.generalInfo')}</p>
                </div>
              </div>

              {/* Company Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {settingsSections[0].fields.map((field, index) => (
                  <InfoField
                    key={index}
                    icon={field.icon}
                    label={field.label}
                    value={field.value}
                    isLink={field.isLink}
                    fullWidth={field.fullWidth}
                  />
                ))}
              </div>
            </SettingCard>

            
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Language Settings */}
            <SettingCard title={t('settingsC.language')} icon={Globe}>
              <div className="space-y-2 md:space-y-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full p-3 rounded-lg border transition-all text-left ${
                      currentLanguage === lang.code
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl flex-shrink-0">{lang.flag}</span>
                      <span className="font-medium flex-1">{lang.name}</span>
                      {currentLanguage === lang.code && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </SettingCard>

            
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default SettingsView;