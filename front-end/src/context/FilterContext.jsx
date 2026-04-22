// FilterContext.jsx
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    transaction: '',
    priceMin: '',
    priceMax: '',
    surfaceMin: '',
    surfaceMax: '',
    city: '',
    amenities: {
      piscine: false,
      jardin: false,
      parking: false,
      ascenseur: false,
      climatisation: false
    }
  });

  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState([]);

  const resetFilters = () => {
    setFilters({
      search: '',
      type: '',
      transaction: '',
      priceMin: '',
      priceMax: '',
      surfaceMin: '',
      surfaceMax: '',
      city: '',
      amenities: {
        piscine: false,
        jardin: false,
        parking: false,
        ascenseur: false,
        climatisation: false
      }
    });
    setSelectedBedrooms([]);
    setSelectedBathrooms([]);
  };

  return (
    <FilterContext.Provider value={{
      filters,
      setFilters,
      selectedBedrooms,
      setSelectedBedrooms,
      selectedBathrooms,
      setSelectedBathrooms,
      resetFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};
