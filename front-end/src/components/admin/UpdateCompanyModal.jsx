import React, { useState, useCallback } from "react";
import { X, Building2, Upload, MapPin, Phone, Mail, Globe, Save, Edit } from "lucide-react";
import axios from "axios";
import { useContext } from "react";
import { GlobaleContext } from "../../context/GlobaleContext";
export default function UpdateCompanyModal({ company, isOpen, onClose, onUpdate }) {
    const {
        alertSucc,
        setAlertSucc,
        alertFail,
        setAlertFail,
        alertMsg,
        setAlertMsg,
    } = useContext(GlobaleContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(company?.logo ? `http://localhost:8000/storage/${company.logo}` : "");

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
            setImagePreview(company.logo ? `http://localhost:8000/storage/${company.logo}` : "");
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
            alert("Veuillez sélectionner une image valide");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("L'image ne doit pas dépasser 5MB");
            return;
        }

        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    }, []);

    const removeImage = useCallback(() => {
        setImage(null);
        setImagePreview(company?.logo ? `http://localhost:8000/storage/${company.logo}` : "");
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

            axios.post('http://localhost:8000/api/company/' + company.id, updatedData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    console.log("Données récupérées:", response.data);
                    setAlertSucc(true);
                    setAlertMsg("Société mise à jour avec succès");
                    setTimeout(() => setAlertSucc(false), 3000);
                    onClose();
                })
                .catch(error => {
                    console.error("Erreur:", error);
                    setAlertFail(true);
                    setAlertMsg("Erreur lors de la mise à jour de la société");
                    setTimeout(() => setAlertFail(false), 3000);
                    onClose();
                })



        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur lors de la préparation des données");
        } finally {
            setLoading(false);
        }
    }, [formData, image, company, onUpdate, onClose]);

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
                                Modifier la société
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
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                        </div>

                        <label className="block mt-3">
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                                Changer le logo
                            </span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (max 5MB)</p>
                    </div>

                    {/* Company Info */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-blue-500" />
                            Informations société
                        </h4>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nom de la société *
                            </label>
                            <input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Location Info */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            Localisation
                        </h4>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Adresse
                            </label>
                            <input
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ville
                            </label>
                            <input
                                type="text"
                                name="ville"
                                value={formData.ville}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-400" />
                                Site web
                            </label>
                            <input
                                type="url"
                                name="site_web"
                                value={formData.site_web}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                            disabled={loading}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Récupération...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Sauvegarder
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}