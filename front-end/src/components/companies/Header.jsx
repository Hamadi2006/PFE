import React from 'react';
import { Bell } from 'lucide-react';

const Header = ({ activeTab, companyProfile, language }) => {
  const translations = {
    en: {
      overview: 'Overview',
      announcements: 'Properties',
      settings: 'Settings',
      dashboardDesc: 'Welcome back! Manage your real estate portfolio.',
      announcementsDesc: 'Manage your property listings and track views',
      settingsDesc: 'Manage your agency profile and preferences'
    },
    fr: {
      overview: 'Aperçu',
      announcements: 'Propriétés',
      settings: 'Paramètres',
      dashboardDesc: 'Bon retour ! Gérez votre portefeuille immobilier.',
      announcementsDesc: 'Gérez vos annonces et suivez les vues',
      settingsDesc: 'Gérez votre profil agence et préférences'
    },
    ar: {
      overview: 'نظرة عامة',
      announcements: 'العقارات',
      settings: 'الإعدادات',
      dashboardDesc: 'مرحباً بعودتك! قم بإدارة محفظتك العقارية.',
      announcementsDesc: 'إدارة قوائم العقارات وتتبع المشاهدات',
      settingsDesc: 'إدارة ملف الوكالة والإعدادات'
    }
  };

  const t = translations[language];

  const getHeaderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: t.overview, description: t.dashboardDesc };
      case 'announcements':
        return { title: t.announcements, description: t.announcementsDesc };
      case 'settings':
        return { title: t.settings, description: t.settingsDesc };
      default:
        return { title: t.overview, description: t.dashboardDesc };
    }
  };

  const { title, description } = getHeaderContent();

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500 mt-1">{description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {companyProfile.name.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;