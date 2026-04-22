import { useTranslation } from "react-i18next";
import {
  amenityOptions,
  bathroomOptions,
  bedroomOptions,
  cityOptions,
} from "./filters/propertyFilterOptions";
import {
  AmenityCheckboxGroup,
  FilterSection,
  NumberRangeFilter,
  SelectFilter,
  ToggleButtonGroup,
} from "./filters/PropertyFilterFields";
import usePropertyFilterControls from "./filters/usePropertyFilterControls";

function LeftFilter() {
  const { t } = useTranslation();
  const {
    filters,
    resetFilters,
    selectedBathrooms,
    selectedBedrooms,
    toggleAmenity,
    toggleBathroom,
    toggleBedroom,
    updateFilter,
  } = usePropertyFilterControls();

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
            type="button"
          >
            {t("filters.reset")}
          </button>
        </div>

        <FilterSection title={t("filters.price")}>
          <NumberRangeFilter
            maxValue={filters.priceMax}
            minValue={filters.priceMin}
            onMaxChange={(value) => updateFilter("priceMax", value)}
            onMinChange={(value) => updateFilter("priceMin", value)}
            placeholderMax={t("filters.max")}
            placeholderMin={t("filters.min")}
          />
        </FilterSection>

        <FilterSection title={t("filters.bedrooms")}>
          <ToggleButtonGroup
            options={bedroomOptions}
            selectedValues={selectedBedrooms}
            onToggle={toggleBedroom}
          />
        </FilterSection>

        <FilterSection title={t("filters.bathrooms")}>
          <ToggleButtonGroup
            options={bathroomOptions}
            selectedValues={selectedBathrooms}
            onToggle={toggleBathroom}
          />
        </FilterSection>

        <FilterSection title={t("filters.surface")}>
          <NumberRangeFilter
            maxValue={filters.surfaceMax}
            minValue={filters.surfaceMin}
            onMaxChange={(value) => updateFilter("surfaceMax", value)}
            onMinChange={(value) => updateFilter("surfaceMin", value)}
            placeholderMax={t("filters.max")}
            placeholderMin={t("filters.min")}
          />
        </FilterSection>

        <FilterSection title={t("filters.city")}>
          <SelectFilter
            value={filters.city}
            options={cityOptions}
            onChange={(value) => updateFilter("city", value)}
            getLabel={(option) =>
              option.labelKey ? t(option.labelKey) : option.label
            }
          />
        </FilterSection>

        <FilterSection title={t("filters.amenities")}>
          <AmenityCheckboxGroup
            amenities={filters.amenities}
            options={amenityOptions}
            onToggle={toggleAmenity}
            getLabel={(option) => t(option.labelKey)}
          />
        </FilterSection>
      </div>
    </aside>
  );
}

export default LeftFilter;
