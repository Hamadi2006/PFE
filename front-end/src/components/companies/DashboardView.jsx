import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Building2, Settings, TrendingUp, Eye, FileText, Calendar, ChevronRight, Home } from 'lucide-react';

const DashboardView = ({ announcements, stats, setActiveTab }) => {
  const { t } = useTranslation();

  return (
    <div className="p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl">
              <Home className="w-6 h-6" />
            </div>
            <TrendingUp className="w-6 h-6 opacity-60" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.activeProperties}</h3>
          <p className="text-green-100">{t('dashView.activeProperties')}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl">
              <Eye className="w-6 h-6" />
            </div>
            <TrendingUp className="w-6 h-6 opacity-60" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.totalViews}</h3>
          <p className="text-blue-100">{t('dashView.totalViews')}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <Calendar className="w-6 h-6 opacity-60" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.closedProperties}</h3>
          <p className="text-purple-100">{t('dashView.closedProperties')}</p>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t('dashView.quickActions')}</h3>
          <div className="space-y-3">
            <button
              onClick={() => setActiveTab('announcements')}
              className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-800">{t('dashView.addNewProperty')}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-800">{t('dashView.viewAllProperties')}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-600 rounded-lg">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-800">{t('dashView.updateAgencyProfile')}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t('dashView.recentActivity')}</h3>
          <div className="space-y-4">
            {announcements.slice(0, 3).map((ann) => (
              <div key={ann.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="p-2 bg-green-50 rounded-lg mt-1">
                  <Home className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{ann.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{ann.views} {t('dashView.newViews')}</p>
                  <p className="text-xs text-gray-400 mt-1">{ann.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;