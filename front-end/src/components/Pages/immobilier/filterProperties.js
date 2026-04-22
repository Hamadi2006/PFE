const AMENITY_FIELDS = [
  "piscine",
  "jardin",
  "parking",
  "ascenseur",
  "climatisation",
];

function normalizeText(value) {
  return String(value || "").toLowerCase();
}

function matchesSearch(property, search) {
  if (!search) return true;

  const searchValue = normalizeText(search);
  return [
    property.titre,
    property.ville,
    property.adresse,
    property.description,
  ].some((value) => normalizeText(value).includes(searchValue));
}

function matchesExactValue(value, expectedValue) {
  return !expectedValue || value === expectedValue;
}

function matchesMinimum(value, minimum) {
  return !minimum || Number(value) >= Number(minimum);
}

function matchesMaximum(value, maximum) {
  return !maximum || Number(value) <= Number(maximum);
}

function matchesSelectedMinimums(value, minimums) {
  if (!minimums?.length) return true;
  return minimums.some((minimum) => Number(value) >= Number(minimum));
}

function matchesAmenities(property, amenities = {}) {
  return AMENITY_FIELDS.every((field) => !amenities[field] || Boolean(property[field]));
}

export function matchesPropertyFilters(
  property,
  { filters, selectedBedrooms, selectedBathrooms }
) {
  return (
    matchesSearch(property, filters.search) &&
    matchesExactValue(property.type, filters.type) &&
    matchesExactValue(property.transaction, filters.transaction) &&
    matchesMinimum(property.prix, filters.priceMin) &&
    matchesMaximum(property.prix, filters.priceMax) &&
    matchesMinimum(property.surface, filters.surfaceMin) &&
    matchesMaximum(property.surface, filters.surfaceMax) &&
    matchesExactValue(normalizeText(property.ville), normalizeText(filters.city)) &&
    matchesSelectedMinimums(property.chambres, selectedBedrooms) &&
    matchesSelectedMinimums(property.salles_de_bain, selectedBathrooms) &&
    matchesAmenities(property, filters.amenities)
  );
}

export function filterProperties(properties = [], criteria) {
  if (!properties.length) return [];

  return properties.filter((property) =>
    matchesPropertyFilters(property, criteria)
  );
}
