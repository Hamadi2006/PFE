// components/AdminHeader.jsx
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminHeader({ onAddClick }) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {t('admins.title')}
        </h2>
        <p className="text-gray-600">{t('admins.subtitle')}</p>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
      >
        <Plus className="w-5 h-5" />
        {t('admins.addButton')}
      </button>
    </div>
  );
}





