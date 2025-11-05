import React, { useState } from 'react';
import { Home, Building2, Users, Mail, Settings, HelpCircle, Activity, TrendingUp, Clock } from 'lucide-react';
import OverviewPage from './OverviewPage';
import PropertiesPage from './PropertiesPage';
import AdminsPage from './AdminsPage';
import RequestsPage from './RequestsPage';
import SettingsPage from './SettingsPage';
import HelpPage from './HelpPage';
import Sidebar from './SideBare';
import CompaniesPage from './CompaniesPage';
// Sidebar Component






// Main Content with Switch Case
function MainContent({ activePage }) {
  switch (activePage) {
    case 'overview':
      return <OverviewPage />;
    case 'properties':
      return <PropertiesPage />;
    case 'admins':
      return <AdminsPage />;
    case 'requests':
      return <RequestsPage />;
    case 'settings':
      return <SettingsPage />;
    case 'help':
      return <HelpPage />;
      case 'companies':
        return <CompaniesPage />;
    default:
      return <OverviewPage />;
  }
}

// Main Dashboard Component
export default function Dashboard() {
  const [activePage, setActivePage] = useState('overview');

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          <MainContent activePage={activePage} />
        </div>
      </div>
    </div>
  );
}