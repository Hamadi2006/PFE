import { useCallback } from "react";
import { useFilters } from "../../../context/FilterContext";

function toggleValue(values, value) {
  return values.includes(value)
    ? values.filter((currentValue) => currentValue !== value)
    : [...values, value];
}

function usePropertyFilterControls() {
  const {
    filters,
    resetFilters,
    selectedBathrooms,
    selectedBedrooms,
    setFilters,
    setSelectedBathrooms,
    setSelectedBedrooms,
  } = useFilters();

  const updateFilter = useCallback(
    (name, value) => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        [name]: value,
      }));
    },
    [setFilters]
  );

  const toggleAmenity = useCallback(
    (amenity) => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        amenities: {
          ...currentFilters.amenities,
          [amenity]: !currentFilters.amenities?.[amenity],
        },
      }));
    },
    [setFilters]
  );

  const toggleBedroom = useCallback(
    (value) => {
      setSelectedBedrooms((currentValues) => toggleValue(currentValues, value));
    },
    [setSelectedBedrooms]
  );

  const toggleBathroom = useCallback(
    (value) => {
      setSelectedBathrooms((currentValues) => toggleValue(currentValues, value));
    },
    [setSelectedBathrooms]
  );

  return {
    filters,
    resetFilters,
    selectedBathrooms,
    selectedBedrooms,
    toggleAmenity,
    toggleBathroom,
    toggleBedroom,
    updateFilter,
  };
}

export default usePropertyFilterControls;
