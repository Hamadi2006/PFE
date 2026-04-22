import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  propertyTypeOptions,
  transactionOptions,
} from "./filters/propertyFilterOptions";
import usePropertyFilterControls from "./filters/usePropertyFilterControls";

function getOptionLabel(t, option) {
  return option.labelKey ? t(option.labelKey) : option.label;
}

function HeroFilter() {
  const { t } = useTranslation();
  const { filters, updateFilter } = usePropertyFilterControls();

  return (
    <section className="bg-gradient-to-r from-cyan-600 to-cyan-400 py-16 text-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          {t("heroFilter.title")}
        </h1>
        <p className="mt-4 text-xl opacity-90">{t("heroFilter.subtitle")}</p>

        <div className="mt-8 bg-white rounded-lg shadow-2xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(event) => updateFilter("search", event.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                placeholder={t("heroFilter.searchPlaceholder")}
              />
            </div>

            <select
              value={filters.type}
              onChange={(event) => updateFilter("type", event.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            >
              {propertyTypeOptions.map((option) => (
                <option key={option.value || "all"} value={option.value}>
                  {getOptionLabel(t, option)}
                </option>
              ))}
            </select>

            <select
              value={filters.transaction}
              onChange={(event) =>
                updateFilter("transaction", event.target.value)
              }
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
            >
              {transactionOptions.map((option) => (
                <option key={option.value || "all"} value={option.value}>
                  {getOptionLabel(t, option)}
                </option>
              ))}
            </select>

            <button
              className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition flex items-center justify-center"
              type="button"
            >
              <Search className="w-5 h-5 mr-2" />
              {t("heroFilter.search")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroFilter;
