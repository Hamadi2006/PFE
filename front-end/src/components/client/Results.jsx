import { getStorageUrl } from '../../utils/authStorage';
import ResultsEmptyState from './results/ResultsEmptyState';
import ResultsLayout from './results/ResultsLayout';
import ResultsPagination from './results/ResultsPagination';
import PropertyResultCard from './results/PropertyResultCard';
import ViewModeToggle from './results/ViewModeToggle';
import usePropertyResults from './results/usePropertyResults';

function Results({ immobilier = [] }) {
  const {
    currentPage,
    pageNumbers,
    results,
    totalPages,
    viewMode,
    goToNext,
    goToPage,
    goToPrevious,
    setViewMode,
    toggleFavorite,
  } = usePropertyResults({
    properties: immobilier,
    resolveImageUrl: getStorageUrl,
  });

  if (immobilier.length === 0) {
    return (
      <ResultsLayout count={0}>
        <ResultsEmptyState />
      </ResultsLayout>
    );
  }

  return (
    <ResultsLayout
      count={immobilier.length}
      toolbar={<ViewModeToggle viewMode={viewMode} onChange={setViewMode} />}
      footer={
        <ResultsPagination
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          totalPages={totalPages}
          onNext={goToNext}
          onPageChange={goToPage}
          onPrevious={goToPrevious}
        />
      }
    >
      <div
        className={`grid gap-3 sm:gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-2 md:grid-cols-2 xl:grid-cols-3'
            : 'grid-cols-1'
        }`}
      >
        {results.map((listing) => (
          <PropertyResultCard
            key={listing.id}
            listing={listing}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </ResultsLayout>
  );
}

export default Results;
