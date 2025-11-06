import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, Bell, Building2 } from 'lucide-react';
import DashboardView from './DashboardView';
import AnnouncementsView from './AnnouncementsView';
import SettingsView from './SettingsView';
import Sidebar from './Sidebar';
import Header from './Header';

function PartnerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [companyProfile, setCompanyProfile] = useState({
    name: 'Premium Real Estate',
    email: 'contact@premiumrealestate.ma',
    phone: '+212 537-123-456',
    address: 'Avenue Mohamed VI, Rabat',
    description: 'Leading real estate agency specializing in luxury properties and commercial spaces across Morocco.',
    website: 'www.premiumrealestate.ma',
    specialty: 'Luxury Properties',
    license: 'RC 12345'
  });

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Luxury Villa in Agdal',
      description: 'Beautiful modern villa with garden, swimming pool, and panoramic views. Perfect for families.',
      location: 'Agdal, Rabat',
      type: 'Villa',
      price: '2,500,000 MAD',
      surface: '320 m²',
      bedrooms: 4,
      bathrooms: 3,
      createdAt: '2025-11-01',
      status: 'active',
      views: 156
    },
    {
      id: 2,
      title: 'Apartment in City Center',
      description: 'Modern apartment in the heart of Casablanca, close to all amenities and transportation.',
      location: 'Centre Ville, Casablanca',
      type: 'Apartment',
      price: '850,000 MAD',
      surface: '85 m²',
      bedrooms: 2,
      bathrooms: 1,
      createdAt: '2025-10-28',
      status: 'active',
      views: 89
    },
    {
      id: 3,
      title: 'Commercial Space',
      description: 'Prime commercial space ideal for retail business or office in busy commercial area.',
      location: 'Hay Riad, Rabat',
      type: 'Commercial',
      price: '1,200,000 MAD',
      surface: '150 m²',
      createdAt: '2025-10-25',
      status: 'closed',
      views: 203
    }
  ]);

  const logout = () => {
    localStorage.removeItem("tokenCompanie");
    localStorage.removeItem("companie");
    navigate("/partner-login");
  };

  const stats = {
    activeProperties: announcements.filter(a => a.status === 'active').length,
    totalViews: announcements.reduce((sum, a) => sum + a.views, 0),
    closedProperties: announcements.filter(a => a.status === 'closed').length
  };

  return (
    <div className={`flex h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        companyProfile={companyProfile}
        stats={stats}
        language={language}
        logout={logout}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <Header
          activeTab={activeTab}
          companyProfile={companyProfile}
          language={language}
        />

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <DashboardView
            announcements={announcements}
            stats={stats}
            setActiveTab={setActiveTab}
            language={language}
          />
        )}

        {/* Announcements View */}
        {activeTab === 'announcements' && (
          <AnnouncementsView
            announcements={announcements}
            setAnnouncements={setAnnouncements}
            language={language}
          />
        )}

        {/* Settings View */}
        {activeTab === 'settings' && (
          <SettingsView
            companyProfile={companyProfile}
            setCompanyProfile={setCompanyProfile}
            language={language}
            setLanguage={setLanguage}
          />
        )}
      </main>
    </div>
  );
}

export default PartnerDashboard;