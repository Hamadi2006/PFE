import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { GlobaleContext } from "../../context/GlobaleContext";

const InputField = ({ name, type = "text", placeholder, value, onChange, error, valid }) => (
  <div className="space-y-1 relative">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:outline-none transition ${
        error
          ? "border-red-500 focus:ring-red-500"
          : valid
          ? "border-green-500 focus:ring-green-500"
          : "border-gray-300 dark:border-gray-600 focus:ring-cyan-600"
      }`}
    />
    {valid && !error && (
      <CheckCircle2 className="absolute right-3 top-3 text-green-500 w-5 h-5" />
    )}
    {error && (
      <div className="flex items-center text-red-500 text-sm">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </div>
    )}
  </div>
);

const ContactCard = ({
  prix = 0,
  telephone_contact = "",
  email_contact = "",
  nom_contact = "",
  immobilier,
}) => {
  const { t } = useTranslation();
  const { setAlertSucc, setAlertFail, setAlertMsg } = useContext(GlobaleContext);
  const companie = JSON.parse(localStorage.getItem("companie"));
  const [formData, setFormData] = useState({
    societe_id : companie.id,
    nom_complet: "",
    email: "",
    telephone: "",
    message: "",
    immobilier_id: immobilier ? immobilier.id : "",
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});

  useEffect(() => {
    if (immobilier) {
      setFormData((prev) => ({ ...prev, immobilier_id: immobilier.id }));
    }
  }, [immobilier]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "nom_complet":
        if (!value.trim()) error = t("contactCardI.errors.fullNameRequired") || "Nom complet requis";
        else if (value.trim().length < 3)
          error = t("contactCardI.errors.fullNameMinLength") || "3 caractères minimum";
        break;

      case "email":
        if (!value.trim()) error = t("contactCardI.errors.emailRequired") || "Email requis";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = t("contactCardI.errors.emailInvalid") || "Email invalide";
        break;

      case "telephone":
        if (!value.trim()) error = t("contactCardI.errors.phoneRequired") || "Téléphone requis";
        else if (!/^[0-9\s\-\+\(\)]{7,}$/.test(value))
          error = t("contactCardI.errors.phoneInvalid") || "Numéro invalide";
        break;

      case "message":
        if (!value.trim()) error = t("contactCardI.errors.messageRequired") || "Message requis";
        else if (value.trim().length < 10)
          error = t("contactCardI.errors.messageMinLength") || "10 caractères minimum";
        break;

      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setValid((prev) => ({ ...prev, [name]: !error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "immobilier_id") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAlertMsg(t("contactCardI.validationErrors"));
      setAlertFail(true);
      setTimeout(() => setAlertFail(false), 3000);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/demande", formData);
      setAlertMsg(res.data.message);
      setAlertSucc(true);
      setTimeout(() => setAlertSucc(false), 3000);
      setFormData({
        societe_id : companie.id,
        nom_complet: "",
        email: "",
        telephone: "",
        message: "",
        immobilier_id: immobilier ? immobilier.id : "",
      });
      setErrors({});
      setValid({});
    } catch (error) {
      setAlertMsg(error.response?.data || "Erreur lors de l’envoi");
      setAlertFail(true);
      setTimeout(() => setAlertFail(false), 3000);
    }
  };

  const isFormValid =
    Object.values(valid).every(Boolean) &&
    formData.nom_complet &&
    formData.email &&
    formData.telephone &&
    formData.message;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-6 sticky top-6">
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-cyan-600 mb-2">
          {Number(prix).toLocaleString("fr-MA")} MAD
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {t("contactCardI.negotiablePrice")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          name="nom_complet"
          placeholder={t("contactCardI.fullName")}
          value={formData.nom_complet}
          onChange={handleChange}
          error={errors.nom_complet}
          valid={valid.nom_complet}
        />
        <InputField
          name="email"
          type="email"
          placeholder={t("contactCardI.email")}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          valid={valid.email}
        />
        <InputField
          name="telephone"
          type="tel"
          placeholder={t("contactCardI.phone")}
          value={formData.telephone}
          onChange={handleChange}
          error={errors.telephone}
          valid={valid.telephone}
        />

        <div className="space-y-1 relative">
          <textarea
            name="message"
            rows="3"
            placeholder={t("contactCardI.message")}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:outline-none transition resize-none ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : valid.message
                ? "border-green-500 focus:ring-green-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-cyan-600"
            }`}
          />
          {valid.message && !errors.message && (
            <CheckCircle2 className="absolute right-3 top-3 text-green-500 w-5 h-5" />
          )}
          {errors.message && (
            <div className="flex items-center text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message}
            </div>
          )}
          <p className="text-xs text-gray-400 mt-1 text-right">
            {formData.message.length}/500
          </p>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-4 rounded-lg font-bold flex items-center justify-center transition ${
            isFormValid
              ? "bg-cyan-600 hover:bg-cyan-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Mail className="w-5 h-5 mr-2" />
          {t("contactCardI.sendRequest")}
        </button>
      </form>

      {/* contact + agent section inchangée */}
    </div>
  );
};

export default ContactCard;
