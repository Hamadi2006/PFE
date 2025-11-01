// components/AdminStats.jsx
import { Users, Shield, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminStats({ admins }) {
  const { t } = useTranslation();

  const recentAdmins = admins?.filter(admin => {
    const createdDate = new Date(admin.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return createdDate >= weekAgo;
  }).length || 0;

  const stats = [
    {
      icon: Users,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      label: t('admins.stats.totalAdmins'),
      value: admins?.length || 0
    },
    {
      icon: Shield,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      label: t('admins.stats.activeAdmins'),
      value: admins?.length || 0
    },
    {
      icon: UserPlus,
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      label: t('admins.stats.recentlyAdded'),
      value: recentAdmins
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} ${stat.iconColor} flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}