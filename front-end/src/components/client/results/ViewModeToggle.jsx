import { createElement } from 'react';
import { Grid3X3, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const viewModes = [
  { value: 'grid', icon: Grid3X3, labelKey: 'results.grid' },
  { value: 'list', icon: List, labelKey: 'results.list' },
];

function ViewModeToggle({ viewMode, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2 mb-6">
      {viewModes.map(({ value, icon, labelKey }) => {
        const active = viewMode === value;

        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`px-4 py-2 rounded-lg transition ${
              active
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            title={t(labelKey)}
            type="button"
          >
            {createElement(icon, { className: 'w-6 h-6' })}
          </button>
        );
      })}
    </div>
  );
}

export default ViewModeToggle;
