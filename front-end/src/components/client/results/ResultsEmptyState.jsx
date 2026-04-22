import { CheckCircle, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const suggestionKeys = [
  'results.suggestion1',
  'results.suggestion2',
  'results.suggestion3',
  'results.suggestion4',
];

function ResultsEmptyState() {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Home className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600" />
        </div>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
          {t('results.emptyTitle')}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t('results.emptyDescription')}
        </p>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
            {t('results.suggestions')}
          </h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {suggestionKeys.map((key) => (
              <li key={key} className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">
          {t('results.resetFilters')}
        </button>
      </div>
    </div>
  );
}

export default ResultsEmptyState;
