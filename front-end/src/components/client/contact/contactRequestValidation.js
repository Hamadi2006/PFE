export const CONTACT_FIELD_NAMES = [
  "nom_complet",
  "email",
  "telephone",
  "message",
];

export function createInitialContactRequest(immobilier) {
  return {
    societe_id: immobilier?.societe_id || "",
    nom_complet: "",
    email: "",
    telephone: "",
    message: "",
    immobilier_id: immobilier?.id || "",
  };
}

export function validateContactField(name, value, t) {
  switch (name) {
    case "nom_complet":
      if (!value.trim()) {
        return t("contactCardI.errors.fullNameRequired") || "Nom complet requis";
      }
      if (value.trim().length < 3) {
        return (
          t("contactCardI.errors.fullNameMinLength") ||
          "3 caracteres minimum"
        );
      }
      return "";

    case "email":
      if (!value.trim()) {
        return t("contactCardI.errors.emailRequired") || "Email requis";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return t("contactCardI.errors.emailInvalid") || "Email invalide";
      }
      return "";

    case "telephone":
      if (!value.trim()) {
        return t("contactCardI.errors.phoneRequired") || "Telephone requis";
      }
      if (!/^[0-9\s+()-]{7,}$/.test(value)) {
        return t("contactCardI.errors.phoneInvalid") || "Numero invalide";
      }
      return "";

    case "message":
      if (!value.trim()) {
        return t("contactCardI.errors.messageRequired") || "Message requis";
      }
      if (value.trim().length < 10) {
        return (
          t("contactCardI.errors.messageMinLength") ||
          "10 caracteres minimum"
        );
      }
      return "";

    default:
      return "";
  }
}

export function isContactRequestValid(formData, validFields) {
  return CONTACT_FIELD_NAMES.every(
    (fieldName) => Boolean(formData[fieldName]) && Boolean(validFields[fieldName])
  );
}
