import React, { useState, useContext } from "react";
import { MapPin, Square, Bed, Bath, Eye, Edit, Trash2 } from "lucide-react";
import PropertyModal from "./PropertyModal";
import EditPropertyModal from "./EditPropertyModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import axios from "axios";
import { GlobaleContext } from "../../context/GlobaleContext";

export default function Immobilier({ immobilier }) {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const admin = JSON.parse(localStorage.getItem("user"));
  const { setAlertSucc, setAlertFail, setAlertMsg ,    lastActivitys,
    setLastActivitys,} = useContext(GlobaleContext);

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

  // Fonction pour gérer la mise à jour - appelée par le modal
  const handleUpdate = async (formData, imagePrincipale) => {
    try {
      const formDataToSend = new FormData();

      // Ajouter toutes les données du formulaire
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        
        // Ne pas envoyer les valeurs vides
        if (value === "" || value === null || value === undefined) {
          return;
        }
        
        // Convertir les booléens en 0 ou 1 pour Laravel
        if (typeof value === 'boolean') {
          formDataToSend.append(key, value ? '1' : '0');
        } else {
          formDataToSend.append(key, value);
        }
      });

      // Ajouter l'image si elle existe
      if (imagePrincipale) {
        formDataToSend.append("image_principale", imagePrincipale);
      }

      // Laravel nécessite _method pour PUT avec FormData
      formDataToSend.append("_method", "PUT");

      // Envoyer la requête
      const response = await axios.post(
        `http://localhost:8000/api/immobilier/${selectedProperty.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setLastActivitys([...lastActivitys, {date : new Date(), action : "Modifier une propriete : " + selectedProperty.titre,par : admin.nom_complet}]);
        setAlertMsg("Propriété mise à jour avec succès");
        setAlertSucc(true);
        setIsEditModalOpen(false);
        setTimeout(() => {
        }, 1500);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      setAlertMsg(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour de la propriété"
      );
      setAlertFail(true);
    }
  };
  const admine = JSON.parse(localStorage.getItem("user"));
  const confirmDelete = () => {
    if (!selectedProperty) return;

    axios
      .delete(`http://localhost:8000/api/immobilier/${selectedProperty.id}`)
      .then((res) => {
        setLastActivitys([...lastActivitys, {date : new Date(), action : "Supprimer une propriete ",par : admine.nom_complet}]);
        console.log("Propriété supprimée avec succès", res);
        setAlertMsg("Propriété supprimée avec succès");
        setAlertSucc(true);
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression de la propriété", err);
        setAlertMsg("Erreur lors de la suppression de la propriété");
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
        {immobilier.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl border-2 border-transparent hover:border-blue-200"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4">
              {property.image_principale ? (
                <img
                  src={`http://localhost:8000/storage/${property.image_principale}`}
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
                      title="Voir les détails"
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
        ))}
      </div>

      {/* Modal détails */}
      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Modal modification */}
      <EditPropertyModal
        property={selectedProperty}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProperty(null);
        }}
        onUpdate={handleUpdate}
      />

      {/* Modal confirmation suppression */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        property={selectedProperty}
      />
    </>
  );
}