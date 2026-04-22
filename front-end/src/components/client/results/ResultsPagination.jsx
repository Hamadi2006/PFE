import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function ResultsPagination({
  currentPage,
  pageNumbers,
  totalPages,
  onNext,
  onPageChange,
  onPrevious,
}) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center items-center gap-2">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-lg transition ${
          currentPage === 1
            ? 'border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 dark:border-gray-600 hover:bg-cyan-600 hover:text-white hover:border-cyan-600'
        }`}
        title={t('results.prev')}
        type="button"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-4 py-2 text-gray-500 dark:text-gray-400"
          >
            <MoreHorizontal className="w-5 h-5" />
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === page
                ? 'bg-cyan-600 text-white'
                : 'border border-gray-300 dark:border-gray-600 hover:bg-cyan-600 hover:text-white hover:border-cyan-600'
            }`}
            type="button"
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-lg transition ${
          currentPage === totalPages
            ? 'border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 dark:border-gray-600 hover:bg-cyan-600 hover:text-white hover:border-cyan-600'
        }`}
        title={t('results.next')}
        type="button"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export default ResultsPagination;
