import axios from "axios";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Building2, Plus, X } from "lucide-react";
import { usePropertyForm } from "../hooks/usePropertyForm";
import {
  BasicInfoSection,
  LocationSection,
  CharacteristicsSection,
  AmenitiesSection,
  ImagesSection,
  ContactSection,
} from "../PropertyForm";
import { ImmobilierContext } from "../../context/ImmobilierContext";
import ImmobilierAdmin from "./Immobilier";

const INITIAL_FORM_DATA = {
  titre: "",
  description: "",
  type: "appartement",
  transaction: "vente",
  prix: "",
  surface: "",
  ville: "",
  adresse: "",
  latitude: "",
  longitude: "",
  chambres: 0,
  salles_de_bain: 0,
  piscine: false,
  jardin: false,
  parking: false,
  ascenseur: false,
  climatisation: false,
  annee_construction: "",
  etage: "",
  nombre_etages: "",
  statut: "disponible",
  en_vedette: false,
  telephone_contact: "",
  email_contact: "",
  nom_contact: "",
  image_principale: null,
  images: [],
};

export default function PropertiesPage() {
  const { t } = useTranslation();
  const { immobilier } = useContext(ImmobilierContext);
  const [showAddModal, setShowAddModal] = useState(false);

  const {
    formData,
    errors,
    touched,
    loading,
    setLoading,
    handleInputChange,
    handleBlur,
    handleFileChange,
    resetForm,
    validateAllFields,
  } = usePropertyForm(INITIAL_FORM_DATA);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAllFields()) {
      alert("❌ Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setLoading(true);

    const submitData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "image_principale" || key === "images") return;

      const value = formData[key];
      if (typeof value === "boolean") {
        submitData.append(key, value ? 1 : 0);
      } else if (value !== null && value !== "") {
        submitData.append(key, value);
      } else {
        submitData.append(key, "");
      }
    });

    if (formData.image_principale) {
      submitData.append("image_principale", formData.image_principale);
    }

    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((image, index) => {
        submitData.append(`images[${index}]`, image);
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/immobilier",
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        alert("✅ Immobilier ajouté avec succès !");
        setShowAddModal(false);
        resetForm();
      } else {
        console.error("❌ Erreur:", response.data);
        alert("❌ Erreur: " + (response.data.message || "Échec de l'envoi"));
      }
    } catch (error) {
      console.error("❌ Erreur réseau:", error);
      if (error.response && error.response.data) {
        alert("❌ " + (error.response.data.message || "Erreur serveur"));
      } else {
        alert("❌ Erreur de connexion: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const handlers = {
    handleInputChange,
    handleBlur,
    handleFileChange,
  };

  console.log(immobilier);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {t("properties2.title")}
          </h2>
          <p className="text-slate-600">{t("properties2.subtitle")}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          {t("properties2.addButton")}
        </button>
      </div>

      {/* Properties List */}
      {immobilier && immobilier.length > 0 ? (
        <ImmobilierAdmin immobilier={immobilier} />
      ) : (
        // Empty State
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {t("properties2.listTitle")}
            </h3>
            <p className="text-slate-600">{t("properties.listSubtitle")}</p>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center z-10">
              <h3 className="text-2xl font-bold text-slate-800">
                {t("properties2.modal.title")}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <BasicInfoSection
                formData={formData}
                errors={errors}
                touched={touched}
                handlers={handlers}
                t={t}
              />

              <LocationSection
                formData={formData}
                errors={errors}
                touched={touched}
                handlers={handlers}
                t={t}
              />

              <CharacteristicsSection
                formData={formData}
                errors={errors}
                touched={touched}
                handlers={handlers}
                t={t}
              />

              <AmenitiesSection formData={formData} handlers={handlers} t={t} />

              <ImagesSection
                formData={formData}
                errors={errors}
                touched={touched}
                handlers={handlers}
                t={t}
              />

              <ContactSection
                formData={formData}
                errors={errors}
                touched={touched}
                handlers={handlers}
                t={t}
              />

              <div className="flex justify-end gap-4 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  disabled={loading}
                >
                  {t("properties2.modal.cancel")}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "En cours..." : t("properties2.modal.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}