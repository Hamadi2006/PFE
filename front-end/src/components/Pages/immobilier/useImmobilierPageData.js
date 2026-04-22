import { useContext } from "react";
import { ImmobilierContext } from "../../../context/contextValues";
import { useFilters } from "../../../context/FilterContext";
import useFilteredImmobilier from "./useFilteredImmobilier";

function useImmobilierPageData() {
  const { immobilier } = useContext(ImmobilierContext);
  const { filters, selectedBathrooms, selectedBedrooms } = useFilters();

  const filteredImmobilier = useFilteredImmobilier({
    filters,
    properties: immobilier,
    selectedBathrooms,
    selectedBedrooms,
  });

  return { filteredImmobilier };
}

export default useImmobilierPageData;
