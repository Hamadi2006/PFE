import { useTranslation } from 'react-i18next';

function ResultsLayout({ count, toolbar = null, footer = null, children }) {
  const { t } = useTranslation();

  return (
    <main className="lg:w-3/4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t('results.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {count} {t('results.found')}
          </p>
        </div>
      </div>

      {toolbar}
      {children}
      {footer}
    </main>
  );
}

export default ResultsLayout;
