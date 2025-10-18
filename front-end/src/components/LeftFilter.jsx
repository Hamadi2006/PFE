import React from "react";
import { useFilters } from "../context/FilterContext";

function LeftFilter() {
  const {
    filters,
    setFilters,
    selectedBedrooms,
    setSelectedBedrooms,
    selectedBathrooms,
    setSelectedBathrooms,
    resetFilters,
  } = useFilters();

  const toggleBedroom = (value) => {
    setSelectedBedrooms((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleBathroom = (value) => {
    setSelectedBathrooms((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleAmenityChange = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity],
      },
    }));
  };

  return (
    <aside className="lg:w-1/4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Filtres
          </h3>
          <button
            onClick={resetFilters}
            className="text-cyan-600 text-sm hover:underline"
          >
            Réinitialiser
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">
            Prix (MAD)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) =>
                setFilters({ ...filters, priceMin: e.target.value })
              }
              placeholder="Min"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            />
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) =>
                setFilters({ ...filters, priceMax: e.target.value })
              }
              placeholder="Max"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">
            Chambres
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => toggleBedroom(num)}
                className={`px-3 py-2 border rounded-lg text-sm transition ${
                  selectedBedrooms.includes(num)
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "border-gray-300 hover:bg-cyan-600 hover:text-white"
                }`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">
            Salles de bain
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => toggleBathroom(num)}
                className={`px-3 py-2 border rounded-lg text-sm transition ${
                  selectedBathrooms.includes(num)
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "border-gray-300 hover:bg-cyan-600 hover:text-white"
                }`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>

        {/* Surface Area */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">
            Surface (m²)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={filters.surfaceMin}
              onChange={(e) =>
                setFilters({ ...filters, surfaceMin: e.target.value })
              }
              placeholder="Min"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            />
            <input
              type="number"
              value={filters.surfaceMax}
              onChange={(e) =>
                setFilters({ ...filters, surfaceMax: e.target.value })
              }
              placeholder="Max"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Cities */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">
            Ville
          </label>
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
          >
            <option value="">Toutes les villes</option>
            <option value="casablanca">Casablanca</option>
            <option value="rabat">Rabat</option>
            <option value="marrakech">Marrakech</option>
            <option value="fes">Fès</option>
            <option value="tanger">Tanger</option>
            <option value="agadir">Agadir</option>
            <option value="meknes">Meknès</option>
            <option value="oujda">Oujda</option>
          </select>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">
            Équipements
          </label>
          <div className="space-y-2">
            {Object.keys(filters.amenities).map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.amenities[amenity]}
                  onChange={() => handleAmenityChange(amenity)}
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {amenity}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition">
          Appliquer les Filtres
        </button>
      </div>
    </aside>
  );
}

export default LeftFilter;