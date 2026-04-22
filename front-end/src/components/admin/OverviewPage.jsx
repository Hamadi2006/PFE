import { Home, Building2, Users, Mail, Settings, HelpCircle, Activity, TrendingUp, Clock } from 'lucide-react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DemandesContext,
  ImmobilierContext,
  UserContext,
} from '../../context/contextValues';
import { GlobaleContext } from '../../context/GlobaleContext';

function OverviewPage() {
  const { t } = useTranslation();
  const { immobilier } = useContext(ImmobilierContext);
  const { admins } = useContext(UserContext);
  const { demandes } = useContext(DemandesContext);
  const  lastActivitys  = localStorage.getItem('lastActivitys') ? JSON.parse(localStorage.getItem('lastActivitys')) : [];



  // Calculer les statistiques des demandes
  const totalDemandes = demandes?.length || 0;

  // Calculer les statistiques réelles
  const totalProprietes = immobilier?.length || 0;
  const totalAdmins = admins?.length || 0;

  // Calculer les tendances
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) return '+0%';
    const change = ((current - previous) / previous) * 100;
    return change >= 0 ? `+${change.toFixed(0)}%` : `${change.toFixed(0)}%`;
  };

  // Statistiques par type de propriété
  const proprietesParType = immobilier?.reduce((acc, prop) => {
    acc[prop.type] = (acc[prop.type] || 0) + 1;
    return acc;
  }, {}) || {};

  // Statistiques par transaction
  const proprietesParTransaction = immobilier?.reduce((acc, prop) => {
    acc[prop.transaction] = (acc[prop.transaction] || 0) + 1;
    return acc;
  }, {}) || {};

  // Propriétés disponibles
  const proprietesDisponibles = immobilier?.filter(prop => prop.statut === 'disponible').length || 0;

  const stats = [
    { 
      label: t('overview.stats.totalProperties'), 
      value: totalProprietes.toString(), 
      icon: Building2, 
      color: 'bg-blue-50 text-blue-600', 
      trend: calculateTrend(totalProprietes, totalProprietes - 2)
    },
    { 
      label: t('overview.stats.administrators'), 
      value: totalAdmins.toString(), 
      icon: Users, 
      color: 'bg-purple-50 text-purple-600', 
      trend: `${totalAdmins}` 
    },
    { 
      label: t('overview.stats.openRequests'), 
      value: totalDemandes.toString(), 
      icon: Mail, 
      color: 'bg-orange-50 text-orange-600', 
      trend: `${totalDemandes}` 
    },
  ];

  // Statistiques supplémentaires
  const additionalStats = [
    {
      label: t('overview.stats.availableProperties'),
      value: proprietesDisponibles.toString(),
      icon: Activity,
      color: 'bg-green-50 text-green-600',
      trend: `${((proprietesDisponibles / totalProprietes) * 100 || 0).toFixed(0)}%`
    },
    {
      label: t('overview.stats.forSale'),
      value: (proprietesParTransaction['vente'] || 0).toString(),
      icon: TrendingUp,
      color: 'bg-cyan-50 text-cyan-600',
      trend: `${proprietesParTransaction['vente'] || 0} ${t('overview.stats.properties')}`
    },
    {
      label: t('overview.stats.forRent'),
      value: (proprietesParTransaction['location'] || 0).toString(),
      icon: Home,
      color: 'bg-indigo-50 text-indigo-600',
      trend: `${proprietesParTransaction['location'] || 0} ${t('overview.stats.properties')}`
    },
  ];

  // Générer des activités récentes depuis lastActivitys
  const generateRecentActivities = () => {
    if (!lastActivitys || lastActivitys.length === 0) {
      return [
        { 
          activity: t('overview.activities.noActivity') || 'Aucune activité récente',
          date: new Date().toISOString().split('T')[0],
          user: t('overview.activities.system') || 'Système',
          type: 'update'
        }
      ];
    }

    // Mapper les activités depuis lastActivitys
    return lastActivitys
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(activity => {
        // Déterminer le type d'activité basé sur l'action
        let type = 'update';
        if (activity.action.toLowerCase().includes('ajouter') || activity.action.toLowerCase().includes('nouvelle')) {
          type = 'new';
        } else if (activity.action.toLowerCase().includes('supprimer')) {
          type = 'delete';
        } else if (activity.action.toLowerCase().includes('modifier')) {
          type = 'update';
        } else if (activity.action.toLowerCase().includes('demande')) {
          type = 'request';
        } else if (activity.action.toLowerCase().includes('utilisateur') || activity.action.toLowerCase().includes('admin')) {
          type = 'user';
        }

        return {
          activity: activity.action,
          date: new Date(activity.date).toISOString().split('T')[0],
          user: activity.user || 'Admin',
          type: type
        };
      });
  };

  const activities = generateRecentActivities();

  const getActivityIcon = (type) => {
    switch(type) {
      case 'new': return <Building2 className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      case 'request': return <Mail className="w-4 h-4" />;
      case 'delete': return <Activity className="w-4 h-4" />;
      case 'update': return <Activity className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'new': return 'bg-green-100 text-green-700';
      case 'user': return 'bg-purple-100 text-purple-700';
      case 'request': return 'bg-orange-100 text-orange-700';
      case 'delete': return 'bg-red-100 text-red-700';
      case 'update': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Traduire les types de propriétés
  const translatePropertyType = (type) => {
    const types = {
      'appartement': t('overview.propertyTypes.appartement'),
      'villa': t('overview.propertyTypes.villa'),
      'maison': t('overview.propertyTypes.maison'),
      'terrain': t('overview.propertyTypes.terrain'),
      'commerce': t('overview.propertyTypes.commerce'),
      'bureau': t('overview.propertyTypes.bureau')
    };
    return types[type] || type;
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">{t('overview.title')}</h2>
        <p className="text-slate-600">{t('overview.subtitle')}</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  {stat.trend}
                </div>
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Statistiques supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {additionalStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-sm font-medium text-slate-600">
                  {stat.trend}
                </div>
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Répartition par type de propriété */}
      {Object.keys(proprietesParType).length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">{t('overview.distributionByType')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(proprietesParType).map(([type, count]) => (
              <div key={type} className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold text-slate-800">{count}</p>
                <p className="text-sm text-slate-600">{translatePropertyType(type)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activités récentes */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            {t('overview.recentActivities')}
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('overview.table.type')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('overview.table.activity')}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('overview.table.date')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {activities.map((activity, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-800">{activity.activity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600">{activity.date}</div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
