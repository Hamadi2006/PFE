import { useMemo } from "react";
import { filterProperties } from "./filterProperties";

function useFilteredImmobilier({
  filters,
  properties,
  selectedBathrooms,
  selectedBedrooms,
}) {
  return useMemo(
    () =>
      filterProperties(properties, {
        filters,
        selectedBathrooms,
        selectedBedrooms,
      }),
    [filters, properties, selectedBathrooms, selectedBedrooms]
  );
}

export default useFilteredImmobilier;
