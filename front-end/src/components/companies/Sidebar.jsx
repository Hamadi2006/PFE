import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Building2, Settings, LogOut, Menu, Home, Mail } from 'lucide-react';
import {ImmobilierContext} from "../../context/ImmobilierContext";
import { DemandesContext } from '../../context/DemandeContext';
const Sidebar = ({
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  setSidebarCollapsed,
  companyProfile,
  stats,
  logout
}) => {
  const { t } = useTranslation();
  const {immobilier,immobilieBySociete} = React.useContext(ImmobilierContext);
  const {DemandeBySociete} = React.useContext(DemandesContext);
  return (
    <aside className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm`}>
      
      {/* Logo & Company Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">{companyProfile.name}</h2>
                <p className="text-xs text-gray-500">{companyProfile.specialty}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Dashboard */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl transition-all ${
            activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          {!sidebarCollapsed && <span className="font-medium">{t('sidebarC.dashboard')}</span>}
        </button>

        {/* Announcements */}
        <button
          onClick={() => setActiveTab('announcements')}
          className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl transition-all ${
            activeTab === 'announcements' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Building2 className="w-5 h-5" />
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between flex-1">
              <span className="font-medium">{t('sidebarC.announcements')}</span>
              <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                {immobilieBySociete.length}
              </span>
            </div>
          )}
        </button>

        {/* Requests */}
        <button
          onClick={() => setActiveTab('requests')}
          className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl transition-all ${
            activeTab === 'requests' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Mail className="w-5 h-5" />
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between flex-1">
              <span className="font-medium">{t('sidebarC.requests')}</span>
              <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                {DemandeBySociete.length}
              </span>
            </div>
          )}
        </button>

        {/* Settings */}
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl transition-all ${
            activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Settings className="w-5 h-5" />
          {!sidebarCollapsed && <span className="font-medium">{t('sidebarC.settings')}</span>}
        </button>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all`}
        >
          <LogOut className="w-5 h-5" />
          {!sidebarCollapsed && <span className="font-medium">{t('sidebarC.logout')}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;