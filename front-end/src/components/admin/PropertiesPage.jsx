import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Building2, Plus, X } from "lucide-react";
import { GlobaleContext } from "../../context/GlobaleContext";
import { usePropertyForm } from "../hooks/usePropertyForm";
import { CompanyContext } from "../../context/contextValues";
import {
  BasicInfoSection,
  LocationSection,
  CharacteristicsSection,
  AmenitiesSection,
  ImagesSection,
  ContactSection,
} from "../PropertyForm";
import { ImmobilierContext } from "../../context/contextValues";
import ImmobilierAdmin from "./Immobilier";
import { CompanieSelect } from "./CompanieSelect";
import {
  getAdminAuth,
  getAuthHeader,
  getErrorMessage,
} from "../../utils/authStorage";
import { createImmobilier } from "../../services/immobilierService";

const INITIAL_FORM_DATA = {
  societe_id : "",
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
  const { immobilier, setImmobilier } = useContext(ImmobilierContext);
  const [showAddModal, setShowAddModal] = useState(false);
const {
    setAlertSucc,
    setAlertFail,
    setAlertMsg,
    lastActivitys,
    setLastActivitys,
  } = useContext(GlobaleContext);
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
  const admin = getAdminAuth()?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAllFields()) {
      setAlertMsg("Veuillez remplir tous les champs obligatoires.");
      setAlertFail(true);
      setTimeout(() => setAlertFail(false), 2000);
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
  const response = await createImmobilier(
    submitData,
    {
      headers: {
        ...getAuthHeader("admin"),
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );

  if (response.status === 201) {
    const adminName = [admin?.prenom, admin?.nom].filter(Boolean).join(" ") || "Systeme";
    setLastActivitys([...lastActivitys, { date: new Date(), action: "Ajouter un immobilier : " + formData.titre, par: adminName }]);
    if (response.data?.data) {
      setImmobilier((prev) => [response.data.data, ...prev]);
    }
    setAlertMsg("Immobilier ajouté avec succès");
    setAlertSucc(true);
    setTimeout(() => setAlertSucc(false), 2000);
    setShowAddModal(false);
    resetForm();
  } else {
    console.error("❌ Erreur:", response.data);
    setAlertMsg("Erreur lors de l'ajout de l'immobilier");
    setAlertFail(true);
    setTimeout(() => setAlertFail(false), 2000);
  }
} catch (error) {
  console.error("Erreur ajout immobilier:", error.response?.data || error);

  setAlertMsg(getErrorMessage(error, "Erreur lors de l'ajout de l'immobilier"));

  setAlertFail(true);
  setTimeout(() => setAlertFail(false), 2000);
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

const getSocieteId = (id) => {
  handleInputChange({
    target: {
      name: "societe_id",
      value: id,
    },
  });
};

  const { companies } = useContext(CompanyContext);
  return (
    <div className="relative">
      {/* Fond avec glassmorphism */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gray-50"></div>
      </div>

      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
            {t("properties2.title")}
          </h2>
          <p className="text-slate-600">{t("properties2.subtitle")}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl backdrop-blur-sm bg-opacity-95 border border-white/20"
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
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-white/80 hover:border-white/100 transition-all duration-300">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {t("properties2.listTitle")}
            </h3>
            <p className="text-slate-600">{t("properties2.listSubtitle")}</p>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto border border-white/70 relative">
            {/* Glassmorphic background pattern */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-0 left-1/3 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
              <div className="absolute -bottom-8 right-1/4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
            </div>

            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-white/60 p-6 flex justify-between items-center z-10 rounded-t-2xl">
              <h3 className="text-2xl font-bold text-slate-800">
                {t("properties2.modal.title")}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-all duration-200 hover:bg-white/50 p-2 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 relative z-0">
              <BasicInfoSection
                formData={formData}
                errors={errors}
                touched={touched}
                handlers={handlers}
                t={t}
              />
              <CompanieSelect
                companies={companies}
                value={formData.societe_id}
                error={errors.societe_id}
                touched={touched.societe_id}
                onBlur={handleBlur}
                getSocieteId={getSocieteId}
                disabled={loading}
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

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-white/40 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-white/50 hover:border-slate-400 transition-all duration-200 font-semibold backdrop-blur-sm"
                  disabled={loading}
                >
                  {t("properties2.modal.cancel")}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/20"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      En cours...
                    </span>
                  ) : (
                    t("properties2.modal.submit")
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
