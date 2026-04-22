import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardView from './DashboardView';
import AnnouncementsView from './AnnouncementsView';
import SettingsView from './SettingsView';
import Sidebar from './Sidebar';
import RequestsView from './RequestsView';
import { clearCompanySession, getCompanyAuth } from '../../utils/authStorage';

function PartnerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const companyProfile = getCompanyAuth()?.company || {};
  const announcements = [];
  const logout = () => {
    clearCompanySession();
    navigate("/partner-login", { replace: true });
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
            language={language}
          />
        )}
        {
          activeTab === "requests" && (
            <RequestsView
              language={language}
            />
          )
        }

        {/* Settings View */}
        {activeTab === 'settings' && (
          <SettingsView
            companyProfile={companyProfile}
            language={language}
            setLanguage={setLanguage}
          />
        )}
      </main>
    </div>
  );
}

export default PartnerDashboard;
