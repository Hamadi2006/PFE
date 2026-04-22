import React, { useContext, useState } from "react";
import { MapPin, Square, Bed, Bath, Eye, Edit, Trash2 } from "lucide-react";
import PropertyModal from "./PropertyModal";
import EditPropertyModal from "./EditPropertyModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { GlobaleContext } from "../../context/GlobaleContext";
import { ImmobilierContext } from "../../context/contextValues";
import {
  getAdminAuth,
  getAuthHeader,
  getErrorMessage,
  getStorageUrl,
} from "../../utils/authStorage";
import {
  deleteImmobilier,
  updateImmobilier,
} from "../../services/immobilierService";

const STATUS_ALIASES = {
  "loué": "loue",
  "louÃ©": "loue",
  "réservé": "reserve",
  "rÃ©servÃ©": "reserve",
};

const ALLOWED_VALUES = {
  type: ["appartement", "maison", "villa", "studio", "terrain", "bureau", "commerce"],
  transaction: ["vente", "location"],
  statut: ["disponible", "reserve", "vendu", "loue"],
};

function normalizeStatus(value) {
  return STATUS_ALIASES[value] || value || "disponible";
}

function isBlank(value) {
  return value === "" || value === null || value === undefined;
}

function validateNumber(
  errors,
  data,
  field,
  label,
  { required = false, integer = false, min, max } = {}
) {
  const value = data[field];

  if (isBlank(value)) {
    if (required) errors[field] = `${label} est requis`;
    return;
  }

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    errors[field] = `${label} doit etre un nombre`;
    return;
  }

  if (integer && !Number.isInteger(numericValue)) {
    errors[field] = `${label} doit etre un entier`;
    return;
  }

  if (min !== undefined && numericValue < min) {
    errors[field] = `${label} doit etre superieur ou egal a ${min}`;
  }

  if (max !== undefined && numericValue > max) {
    errors[field] = `${label} doit etre inferieur ou egal a ${max}`;
  }
}

function validateUpdatePayload(data) {
  const errors = {};
  const currentYear = new Date().getFullYear();

  if (!data.titre?.trim()) {
    errors.titre = "Le titre est requis";
  } else if (data.titre.trim().length < 5) {
    errors.titre = "Le titre doit contenir au moins 5 caracteres";
  }

  if (!ALLOWED_VALUES.type.includes(data.type)) {
    errors.type = "Le type de bien selectionne n'est pas valide";
  }

  if (!ALLOWED_VALUES.transaction.includes(data.transaction)) {
    errors.transaction = "Le type de transaction selectionne n'est pas valide";
  }

  const statut = normalizeStatus(data.statut);
  if (!ALLOWED_VALUES.statut.includes(statut)) {
    errors.statut = "Le statut selectionne n'est pas valide";
  }

  if (!data.ville?.trim() || data.ville.trim().length < 2) {
    errors.ville = "La ville est requise";
  }

  validateNumber(errors, data, "prix", "Le prix", { required: true, min: 0 });
  validateNumber(errors, data, "surface", "La surface", { required: true, min: 0 });
  validateNumber(errors, data, "latitude", "La latitude", { min: -90, max: 90 });
  validateNumber(errors, data, "longitude", "La longitude", { min: -180, max: 180 });
  validateNumber(errors, data, "chambres", "Le nombre de chambres", {
    integer: true,
    min: 0,
    max: 50,
  });
  validateNumber(errors, data, "salles_de_bain", "Le nombre de salles de bain", {
    integer: true,
    min: 0,
    max: 20,
  });
  validateNumber(errors, data, "annee_construction", "L'annee de construction", {
    integer: true,
    min: 1800,
    max: currentYear + 5,
  });
  validateNumber(errors, data, "etage", "L'etage", {
    integer: true,
    min: -5,
    max: 200,
  });
  validateNumber(errors, data, "nombre_etages", "Le nombre d'etages", {
    integer: true,
    min: 1,
    max: 200,
  });

  if (
    data.email_contact &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email_contact)
  ) {
    errors.email_contact = "L'email de contact n'est pas valide";
  }

  return errors;
}

export default function Immobilier({ immobilier }) {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const admin = getAdminAuth()?.user;
  const { setImmobilier } = useContext(ImmobilierContext);
  const {
    setAlertSucc,
    setAlertFail,
    setAlertMsg,
    lastActivitys,
    setLastActivitys,
  } = useContext(GlobaleContext);

  const getAdminName = () =>
    [admin?.prenom, admin?.nom].filter(Boolean).join(" ") || "Systeme";

  const handleView = (e, property) => {
    e.stopPropagation();
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleEdit = (e, property) => {
    e.stopPropagation();
    setSelectedProperty(property);
    setIsEditModalOpen(true);
  };

  const handleDelete = (e, property) => {
    e.stopPropagation();
    setSelectedProperty(property);
    setIsDeleteModalOpen(true);
  };

  const handleUpdate = async (formData, imagePrincipale) => {
    try {
      const validationErrors = validateUpdatePayload(formData);
      if (Object.keys(validationErrors).length > 0) {
        const firstError = Object.values(validationErrors)[0];
        setAlertMsg(firstError);
        setAlertFail(true);
        throw new Error(firstError);
      }

      const formDataToSend = new FormData();
      const normalizedData = {
        ...formData,
        statut: normalizeStatus(formData.statut),
      };

      Object.keys(normalizedData).forEach((key) => {
        const value = normalizedData[key];

        if (isBlank(value)) return;

        if (typeof value === "boolean") {
          formDataToSend.append(key, value ? "1" : "0");
        } else {
          formDataToSend.append(key, value);
        }
      });

      if (imagePrincipale) {
        formDataToSend.append("image_principale", imagePrincipale);
      }

      formDataToSend.append("_method", "PUT");

      const response = await updateImmobilier(
        selectedProperty.id,
        formDataToSend,
        {
          headers: {
            ...getAuthHeader("admin"),
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        setLastActivitys([
          ...lastActivitys,
          {
            date: new Date(),
            action: "Modifier une propriete : " + selectedProperty.titre,
            par: getAdminName(),
          },
        ]);

        if (response.data?.data) {
          setImmobilier((prev) =>
            prev.map((property) =>
              property.id === response.data.data.id ? response.data.data : property
            )
          );
        }

        setAlertMsg("Propriete mise a jour avec succes");
        setAlertSucc(true);
        setIsEditModalOpen(false);
        setSelectedProperty(null);
      }
    } catch (error) {
      console.error("Erreur lors de la mise a jour:", error.response?.data || error);
      setAlertMsg(getErrorMessage(error, "Erreur lors de la mise a jour de la propriete"));
      setAlertFail(true);
      throw error;
    }
  };

  const confirmDelete = () => {
    if (!selectedProperty) return;

    deleteImmobilier(selectedProperty.id, {
      headers: getAuthHeader("admin"),
    })
      .then((res) => {
        setLastActivitys([
          ...lastActivitys,
          {
            date: new Date(),
            action: "Supprimer une propriete",
            par: getAdminName(),
          },
        ]);
        setImmobilier((prev) =>
          prev.filter((property) => property.id !== selectedProperty.id)
        );
        console.log("Propriete supprimee avec succes", res);
        setAlertMsg("Propriete supprimee avec succes");
        setAlertSucc(true);
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression de la propriete", err);
        setAlertMsg(getErrorMessage(err, "Erreur lors de la suppression de la propriete"));
        setAlertFail(true);
      })
      .finally(() => {
        setIsDeleteModalOpen(false);
        setSelectedProperty(null);
      });
  };

  return (
    <>
      <div className="space-y-4">
        {immobilier.map((property) => {
          const imageUrl = getStorageUrl(
            property.image_principale_url || property.image_principale
          );

          return (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl border-2 border-transparent hover:border-blue-200"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={property.titre}
                  className="w-full sm:w-40 md:w-48 h-48 sm:h-32 md:h-40 object-cover rounded-lg flex-shrink-0"
                />
              ) : (
                <div className="w-full sm:w-40 md:w-48 h-48 sm:h-32 md:h-40 bg-slate-200 flex items-center justify-center rounded-lg flex-shrink-0">
                  <span className="text-slate-400 text-xs sm:text-sm">
                    Aucune image
                  </span>
                </div>
              )}

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg sm:text-xl text-slate-800 mb-1">
                        {property.titre}
                      </h4>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">
                          {property.ville}, {property.adresse}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                        {property.type?.toUpperCase()}
                      </span>
                      <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                        {property.transaction?.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <p className="hidden sm:block text-slate-600 text-sm mb-3 line-clamp-2">
                    {property.description || "Aucune description disponible"}
                  </p>

                  <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Square className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium">{property.surface}m²</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium">
                        {property.chambres} ch
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium">
                        {property.salles_de_bain} SDB
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200">
                  <div className="font-bold text-xl sm:text-2xl text-blue-600">
                    {property.prix?.toLocaleString()}{" "}
                    <span className="text-base sm:text-xl">DH</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={(e) => handleView(e, property)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Voir les details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => handleEdit(e, property)}
                      className="text-amber-600 hover:text-amber-700"
                      title="Modifier"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, property)}
                      className="text-red-600 hover:text-red-700"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <EditPropertyModal
        property={selectedProperty}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProperty(null);
        }}
        onUpdate={handleUpdate}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        property={selectedProperty}
      />
    </>
  );
}
