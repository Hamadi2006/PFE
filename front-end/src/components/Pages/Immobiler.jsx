import { useContext, useMemo } from "react";
import HeroFilter from "../client/HeroFilter";
import LeftFilter from "../client/LeftFilter";
import Results from "../client/Results";
import { ImmobilierContext } from "../../context/ImmobilierContext";
import { useFilters } from "../../context/FilterContext";

export default function Immobilier() {
  const { immobilier } = useContext(ImmobilierContext);
  const {
    filters,
    selectedBedrooms,
    selectedBathrooms,
  } = useFilters();

  console.log("the immobiliers is", immobilier);

  // Filtrer les immobiliers selon les critères
  const filteredImmobilier = useMemo(() => {
    if (!immobilier || immobilier.length === 0) return [];

    return immobilier.filter((item) => {
      // Filtre de recherche (titre, ville, adresse)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          item.titre?.toLowerCase().includes(searchLower) ||
          item.ville?.toLowerCase().includes(searchLower) ||
          item.adresse?.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Filtre type de bien
      if (filters.type && item.type !== filters.type) {
        return false;
      }

      // Filtre transaction (vente/location)
      if (filters.transaction && item.transaction !== filters.transaction) {
        return false;
      }

      // Filtre prix minimum
      if (filters.priceMin && item.prix < parseFloat(filters.priceMin)) {
        return false;
      }

      // Filtre prix maximum
      if (filters.priceMax && item.prix > parseFloat(filters.priceMax)) {
        return false;
      }

      // Filtre surface minimum
      if (filters.surfaceMin && item.surface < parseFloat(filters.surfaceMin)) {
        return false;
      }

      // Filtre surface maximum
      if (filters.surfaceMax && item.surface > parseFloat(filters.surfaceMax)) {
        return false;
      }

      // Filtre ville
      if (filters.city && item.ville?.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Filtre chambres (au moins X chambres)
      if (selectedBedrooms.length > 0) {
        const hasEnoughBedrooms = selectedBedrooms.some(
          (minBedrooms) => item.chambres >= minBedrooms
        );
        if (!hasEnoughBedrooms) return false;
      }

      // Filtre salles de bain (au moins X salles de bain)
      if (selectedBathrooms.length > 0) {
        const hasEnoughBathrooms = selectedBathrooms.some(
          (minBathrooms) => item.salles_de_bain >= minBathrooms
        );
        if (!hasEnoughBathrooms) return false;
      }

      // Filtre équipements (amenities)
      if (filters.amenities) {
        // Piscine
        if (filters.amenities.piscine && !item.piscine) {
          return false;
        }
        // Jardin
        if (filters.amenities.jardin && !item.jardin) {
          return false;
        }
        // Parking
        if (filters.amenities.parking && !item.parking) {
          return false;
        }
        // Ascenseur
        if (filters.amenities.ascenseur && !item.ascenseur) {
          return false;
        }
        // Climatisation
        if (filters.amenities.climatisation && !item.climatisation) {
          return false;
        }
      }

      return true;
    });
  }, [immobilier, filters, selectedBedrooms, selectedBathrooms]);

  return (
    <div>
      {/* Hero Section avec filtres de recherche */}
      <HeroFilter />

      {/* Section principale avec filtres à gauche et résultats à droite */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filtres à gauche - 25% */}
            <LeftFilter />

            {/* Résultats à droite - 75% */}
            <Results immobilier={filteredImmobilier} />
          </div>
        </div>
      </section>
    </div>
  );
}