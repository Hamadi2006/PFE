// ==================== HeroFilter.jsx ====================

import React from "react";
import { useTranslation } from "react-i18next";
import {useFilters} from "../../context/FilterContext";
function HeroFilter() {
  const { t } = useTranslation();
  const { filters, setFilters } = useFilters();

  return (
    <section className="bg-gradient-to-r from-cyan-600 to-cyan-400 py-16 text-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold">{t("heroFilter.title")}</h1>
        <p className="mt-4 text-xl opacity-90">{t("heroFilter.subtitle")}</p>

        <div className="mt-8 bg-white rounded-lg shadow-2xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Recherche */}
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                placeholder={t("heroFilter.searchPlaceholder")}
              />
            </div>

            {/* Type de bien */}
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            >
              <option value="">{t("heroFilter.allTypes")}</option>
              <option value="villa">{t("heroFilter.villa")}</option>
              <option value="appartement">{t("heroFilter.apartment")}</option>
              <option value="maison">Maison</option>
              <option value="studio">Studio</option>
              <option value="riad">{t("heroFilter.riad")}</option>
              <option value="terrain">{t("heroFilter.land")}</option>
              <option value="bureau">{t("heroFilter.office")}</option>
              <option value="commerce">Commerce</option>
            </select>

            {/* Transaction */}
            <select
              value={filters.transaction}
              onChange={(e) => setFilters({ ...filters, transaction: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            >
              <option value="">{t("heroFilter.saleRent")}</option>
              <option value="vente">{t("heroFilter.sale")}</option>
              <option value="location">{t("heroFilter.rent")}</option>
            </select>

            {/* Bouton Recherche */}
            <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {t("heroFilter.search")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroFilter;


// ==================== LeftFilter.jsx ====================

