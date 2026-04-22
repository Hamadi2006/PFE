import { useCallback, useEffect, useMemo, useState } from 'react';

const DEFAULT_ITEMS_PER_PAGE = 9;

function buildListingViewModel(property, favorites, resolveImageUrl) {
  return {
    id: property.id,
    bathrooms: property.salles_de_bain,
    bedrooms: property.chambres,
    city: property.ville,
    featured: property.en_vedette,
    imageUrl: resolveImageUrl(
      property.image_principale_url || property.image_principale
    ),
    isFavorite: favorites.includes(property.id),
    price: property.prix,
    surface: property.surface,
    title: property.titre,
    transaction: property.transaction,
  };
}

function getPageNumbers(currentPage, totalPages) {
  const pages = [];
  const maxPagesToShow = 5;

  if (totalPages <= maxPagesToShow) {
    for (let page = 1; page <= totalPages; page += 1) {
      pages.push(page);
    }

    return pages;
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push('...');
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 2) {
    pages.push('...');
  }

  pages.push(totalPages);
  return pages;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function usePropertyResults({
  properties,
  resolveImageUrl,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  onPageChange = scrollToTop,
}) {
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const safeProperties = useMemo(() => properties || [], [properties]);
  const totalPages = Math.ceil(safeProperties.length / itemsPerPage);
  const lastPage = Math.max(totalPages, 1);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, lastPage));
  }, [lastPage]);

  const goToPage = useCallback(
    (page) => {
      const nextPage = Math.min(Math.max(page, 1), lastPage);

      setCurrentPage(nextPage);
      onPageChange(nextPage);
    },
    [lastPage, onPageChange]
  );

  const goToPrevious = useCallback(() => {
    setCurrentPage((page) => {
      const nextPage = Math.max(page - 1, 1);
      if (nextPage !== page) onPageChange(nextPage);
      return nextPage;
    });
  }, [onPageChange]);

  const goToNext = useCallback(() => {
    setCurrentPage((page) => {
      const nextPage = Math.min(page + 1, lastPage);
      if (nextPage !== page) onPageChange(nextPage);
      return nextPage;
    });
  }, [lastPage, onPageChange]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(id)
        ? currentFavorites.filter((favoriteId) => favoriteId !== id)
        : [...currentFavorites, id]
    );
  }, []);

  const results = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProperties = safeProperties.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return currentProperties.map((property) =>
      buildListingViewModel(property, favorites, resolveImageUrl)
    );
  }, [currentPage, favorites, itemsPerPage, resolveImageUrl, safeProperties]);

  return {
    currentPage,
    favorites,
    pageNumbers: getPageNumbers(currentPage, totalPages),
    results,
    totalPages,
    viewMode,
    goToNext,
    goToPage,
    goToPrevious,
    setViewMode,
    toggleFavorite,
  };
}

export default usePropertyResults;
