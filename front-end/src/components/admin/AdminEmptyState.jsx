import { Users, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminEmptyState({ onAddClick }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow p-12 border border-gray-200 text-center">
      <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {t('admins.empty.title')}
      </h3>
      <p className="text-gray-600 mb-6">{t('admins.empty.subtitle')}</p>
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
      >
        <Plus className="w-5 h-5" />
        {t('admins.addButton')}
      </button>
    </div>
  );
}