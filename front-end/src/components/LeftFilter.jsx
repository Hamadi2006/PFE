import React from "react";
import { useFilters } from "../context/FilterContext";
import { useTranslation } from "react-i18next";

function LeftFilter() {
  const { t } = useTranslation();
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
            {t("filters.title")}
          </h3>
          <button
            onClick={resetFilters}
            className="text-cyan-600 text-sm hover:underline"
          >
            {t("filters.reset")}
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">
            {t("filters.price")}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) =>
                setFilters({ ...filters, priceMin: e.target.value })
              }
              placeholder={t("filters.min")}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            />
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) =>
                setFilters({ ...filters, priceMax: e.target.value })
              }
              placeholder={t("filters.max")}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">
            {t("filters.bedrooms")}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => toggleBedroom(num)}
                className={`px-3 py-2 border rounded-lg text-sm transition ${
                  selectedBedrooms.includes(num)
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "border-gray-300 dark:border-gray-600 hover:bg-cyan-600 hover:text-white dark:text-gray-300"
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
            {t("filters.bathrooms")}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => toggleBathroom(num)}
                className={`px-3 py-2 border rounded-lg text-sm transition ${
                  selectedBathrooms.includes(num)
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "border-gray-300 dark:border-gray-600 hover:bg-cyan-600 hover:text-white dark:text-gray-300"
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
            {t("filters.surface")}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={filters.surfaceMin}
              onChange={(e) =>
                setFilters({ ...filters, surfaceMin: e.target.value })
              }
              placeholder={t("filters.min")}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            />
            <input
              type="number"
              value={filters.surfaceMax}
              onChange={(e) =>
                setFilters({ ...filters, surfaceMax: e.target.value })
              }
              placeholder={t("filters.max")}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Cities */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">
            {t("filters.city")}
          </label>
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
          >
            <option value="">{t("filters.allCities")}</option>
            {[
              "casablanca",
              "rabat",
              "marrakech",
              "fes",
              "tanger",
              "agadir",
              "meknes",
              "oujda",
              "tetouan",
              "sale",
              "kenitra",
              "essaouira",
            ].map((city) => (
              <option key={city} value={city}>
                {t(`cities.${city}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">
            {t("filters.amenities")}
          </label>
          <div className="space-y-2">
            {["piscine", "jardin", "parking", "ascenseur", "climatisation"].map(
              (a) => (
                <label key={a} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.amenities?.[a] || false}
                    onChange={() => handleAmenityChange(a)}
                    className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {t(`amenities.${a}`)}
                  </span>
                </label>
              )
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default LeftFilter;
