import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Building2, 
  Settings, 
  LogOut, 
  Menu, 
  Home, 
  Mail,
  X,
  ChevronLeft
} from 'lucide-react';
import { ImmobilierContext } from "../../context/ImmobilierContext";
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
  const { immobilier, immobilieBySociete } = React.useContext(ImmobilierContext);
  const { DemandeBySociete } = React.useContext(DemandesContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Fermer le sidebar mobile quand on change d'onglet
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  const navItems = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      label: t('sidebarC.dashboard'),
      count: null
    },
    {
      id: 'announcements',
      icon: Building2,
      label: t('sidebarC.announcements'),
      count: immobilieBySociete.length
    },
    {
      id: 'requests',
      icon: Mail,
      label: t('sidebarC.requests'),
      count: DemandeBySociete.length
    },
    {
      id: 'settings',
      icon: Settings,
      label: t('sidebarC.settings'),
      count: null
    }
  ];

  // Sidebar pour desktop
  const DesktopSidebar = () => (
    <aside className={`
      hidden lg:flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300
      ${sidebarCollapsed ? 'w-16' : 'w-64'}
    `}>
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Home className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-gray-800 text-sm truncate">
                  {companyProfile.name}
                </h2>
                <p className="text-xs text-gray-500 truncate">
                  {companyProfile.specialty}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
          >
            <ChevronLeft className={`w-4 h-4 text-gray-600 transition-transform ${
              sidebarCollapsed ? 'rotate-180' : ''
            }`} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              w-full flex items-center gap-3 p-2 rounded-lg transition-all text-sm
              ${sidebarCollapsed ? 'justify-center' : ''}
              ${activeTab === item.id 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'text-gray-600 hover:bg-gray-50 hover:border hover:border-gray-200'
              }
            `}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && (
              <div className="flex items-center justify-between flex-1 min-w-0">
                <span className="font-medium truncate">{item.label}</span>
                {item.count !== null && (
                  <span className="bg-blue-100 text-blue-600 text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ml-2">
                    {item.count}
                  </span>
                )}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-gray-200">
        <button
          onClick={logout}
          className={`
            w-full flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-50 
            transition-all text-sm border border-transparent hover:border-red-200
            ${sidebarCollapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut className="w-4 h-4" />
          {!sidebarCollapsed && (
            <span className="font-medium">{t('sidebarC.logout')}</span>
          )}
        </button>
      </div>
    </aside>
  );

  // Sidebar pour mobile (overlay glassmorphisme)
  const MobileSidebar = () => (
    <>
      {/* Overlay glassmorphisme */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar mobile avec effet glass */}
      <aside className={`
        fixed left-0 top-0 h-full bg-white/95 backdrop-blur-xl border-r border-white/40 
        shadow-2xl z-50 transform transition-transform duration-500 ease-in-out lg:hidden
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        w-72
      `}>
        
        {/* Header mobile avec effet glass */}
        <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-b border-blue-100/50 px-6 py-5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 rounded-xl shadow-sm border border-white/60">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800 text-lg">{companyProfile.name}</h2>
                <p className="text-slate-600 text-sm">{companyProfile.specialty}</p>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 hover:bg-white/60 rounded-xl transition-all duration-300 text-slate-500 hover:text-slate-700 shadow-sm border border-white/60 hover:border-white/80"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation mobile avec cartes glass */}
        <nav className="flex-1 p-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`
                w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300
                backdrop-blur-sm border
                ${activeTab === item.id 
                  ? 'bg-blue-500/10 text-blue-600 border-blue-200/60 shadow-lg' 
                  : 'bg-white/60 text-slate-700 border-white/60 hover:bg-white/80 hover:border-white/80 hover:shadow-md'
                }
              `}
            >
              <div className={`
                p-2 rounded-xl transition-all duration-300
                ${activeTab === item.id 
                  ? 'bg-blue-500/20' 
                  : 'bg-slate-100/60'
                }
              `}>
                <item.icon className={`w-5 h-5 ${
                  activeTab === item.id ? 'text-blue-600' : 'text-slate-600'
                }`} />
              </div>
              <div className="flex items-center justify-between flex-1">
                <span className="font-semibold">{item.label}</span>
                {item.count !== null && (
                  <span className={`
                    px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300
                    ${activeTab === item.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-200/80 text-slate-700'
                    }
                  `}>
                    {item.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>

        {/* Logout mobile avec effet glass */}
        <div className="p-4 border-t border-slate-200/50">
          <button
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-600 
                     hover:bg-red-500/10 transition-all duration-300 backdrop-blur-sm
                     border border-red-200/40 hover:border-red-300/60 hover:shadow-md
                     bg-white/60 hover:bg-white/80"
          >
            <div className="p-2 rounded-xl bg-red-100/60">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-semibold">{t('sidebarC.logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );

  // Bouton menu mobile avec effet glass
  const MobileMenuButton = () => (
    <button
      onClick={() => setMobileOpen(true)}
      className="lg:hidden fixed top-4 left-4 z-30 p-3 bg-white/80 backdrop-blur-md 
                 border border-white/60 rounded-xl shadow-lg hover:shadow-xl 
                 hover:bg-white/90 transition-all duration-300"
    >
      <Menu className="w-5 h-5 text-slate-700" />
    </button>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
      <MobileMenuButton />
    </>
  );
};

export default Sidebar;