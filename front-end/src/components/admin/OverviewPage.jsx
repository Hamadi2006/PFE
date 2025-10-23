import { Home, Building2, Users, Mail, Settings, HelpCircle, Activity, TrendingUp, Clock } from 'lucide-react';

function OverviewPage() {
  const stats = [
    { label: 'Total Propriétés', value: '1,250', icon: Building2, color: 'bg-blue-50 text-blue-600', trend: '+12%' },
    { label: 'Administrateurs', value: '50', icon: Users, color: 'bg-purple-50 text-purple-600', trend: '+3' },
    { label: 'Demandes Ouvertes', value: '15', icon: Mail, color: 'bg-orange-50 text-orange-600', trend: '-5' },
  ];

  const activities = [
    { 
      activity: 'Nouvelle propriété: Villa de Luxe à Rabat',
      date: '2024-07-26',
      user: 'Admin 1',
      type: 'new'
    },
    { 
      activity: 'Compte administrateur créé: Fatima Z.',
      date: '2024-07-25',
      user: 'Admin 2',
      type: 'user'
    },
    { 
      activity: 'Demande reçue: Appartement à Casablanca',
      date: '2024-07-24',
      user: 'Admin 1',
      type: 'request'
    },
    { 
      activity: 'Propriété mise à jour: Changement de prix Riad Marrakech',
      date: '2024-07-23',
      user: 'Admin 3',
      type: 'update'
    },
    { 
      activity: 'Nouvelle propriété: Espace Commercial à Tanger',
      date: '2024-07-22',
      user: 'Admin 2',
      type: 'new'
    },
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'new': return <Building2 className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      case 'request': return <Mail className="w-4 h-4" />;
      case 'update': return <Activity className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'new': return 'bg-green-100 text-green-700';
      case 'user': return 'bg-purple-100 text-purple-700';
      case 'request': return 'bg-orange-100 text-orange-700';
      case 'update': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Vue d'ensemble</h2>
        <p className="text-slate-600">Bienvenue sur votre tableau de bord</p>
      </div>

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

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Activités Récentes
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Activité</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Utilisateur</th>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {activity.user.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{activity.user}</span>
                    </div>
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