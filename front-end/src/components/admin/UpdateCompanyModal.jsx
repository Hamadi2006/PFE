import React, { useState, useCallback } from "react";
import { X, Building2, Upload, MapPin, Phone, Mail, Globe, Save, Edit } from "lucide-react";
import { useContext } from "react";
import { GlobaleContext } from "../../context/GlobaleContext";
import { useTranslation } from "react-i18next";
import { getAuthHeader, getErrorMessage, getStorageUrl } from "../../utils/authStorage";
import { updateCompany } from "../../services/companyService";

export default function UpdateCompanyModal({ company, isOpen, onClose, onUpdated }) {
    const { t } = useTranslation();
    const {
        setAlertSucc,
        setAlertFail,
        setAlertMsg,
    } = useContext(GlobaleContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(getStorageUrl(company?.logo));

    const [formData, setFormData] = useState({
        nom: company?.nom || "",
        email: company?.email || "",
        telephone: company?.telephone || "",
        adresse: company?.adresse || "",
        ville: company?.ville || "",
        site_web: company?.site_web || "",
    });

    // Réinitialiser le formulaire quand la company change
    React.useEffect(() => {
        if (company) {
            setFormData({
                nom: company.nom || "",
                email: company.email || "",
                telephone: company.telephone || "",
                adresse: company.adresse || "",
                ville: company.ville || "",
                site_web: company.site_web || "",
            });
            setImagePreview(getStorageUrl(company.logo));
            setImage(null);
        }
    }, [company]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert(t("updateCompany.imageError.invalid"));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert(t("updateCompany.imageError.size"));
            return;
        }

        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    }, [t]);

    const removeImage = useCallback(() => {
        setImage(null);
        setImagePreview(getStorageUrl(company?.logo));
    }, [company]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Préparer les données à envoyer
            const updatedData = {
                ...formData,
                logo: image, // Inclure l'image si elle a été changée
                companyId: company.id // Inclure l'ID pour référence
            };

            const response = await updateCompany(company.id, updatedData, {
                headers: {
                    ...getAuthHeader("admin"),
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            });
            onUpdated?.(response.data?.data || { ...company, ...formData });
            setAlertSucc(true);
            setAlertMsg(t("updateCompany.success"));
            setTimeout(() => setAlertSucc(false), 3000);
            onClose();

        } catch (error) {
            console.error("Erreur:", error);
            setAlertFail(true);
            setAlertMsg(getErrorMessage(error, t("updateCompany.error")));
            setTimeout(() => setAlertFail(false), 3000);
        } finally {
            setLoading(false);
        }
    }, [formData, image, company, onClose, onUpdated, t, setAlertSucc, setAlertFail, setAlertMsg]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto border border-gray-200 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                            <Edit className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                {t("updateCompany.title")}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {company?.nom}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Image Upload */}
                    <div className="text-center">
                        <div className="relative inline-block">
                            <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Building2 className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            {imagePreview && (
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                        </div>

                        <label className="block mt-3">
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium transition-colors">
                                {t("updateCompany.changeLogo")}
                            </span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">{t("updateCompany.imageTypes")}</p>
                    </div>

                    {/* Company Info */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-blue-500" />
                            {t("updateCompany.companyInfo.title")}
                        </h4>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("updateCompany.companyInfo.name")} *
                            </label>
                            <input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                {t("updateCompany.companyInfo.email")} *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                {t("updateCompany.companyInfo.phone")}
                            </label>
                            <input
                                type="tel"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            />
                        </div>
                    </div>

                    {/* Location Info */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            {t("updateCompany.locationInfo.title")}
                        </h4>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("updateCompany.locationInfo.address")}
                            </label>
                            <input
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("updateCompany.locationInfo.city")}
                            </label>
                            <input
                                type="text"
                                name="ville"
                                value={formData.ville}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-400" />
                                {t("updateCompany.locationInfo.website")}
                            </label>
                            <input
                                type="url"
                                name="site_web"
                                value={formData.site_web}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                            disabled={loading}
                        >
                            {t("updateCompany.cancel")}
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    {t("updateCompany.saving")}
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    {t("updateCompany.save")}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
