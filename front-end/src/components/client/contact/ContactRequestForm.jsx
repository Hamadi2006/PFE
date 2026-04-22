import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

function ContactInputField({
  error,
  name,
  onChange,
  placeholder,
  type = "text",
  valid,
  value,
}) {
  return (
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
}

function ContactTextareaField({ error, onChange, placeholder, valid, value }) {
  return (
    <div className="space-y-1 relative">
      <textarea
        name="message"
        rows="3"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:outline-none transition resize-none ${
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
      <p className="text-xs text-gray-400 mt-1 text-right">
        {value.length}/500
      </p>
    </div>
  );
}

function ContactRequestForm({
  errors,
  formData,
  handleChange,
  handleSubmit,
  isFormValid,
  isSubmitting,
  valid,
}) {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ContactInputField
        name="nom_complet"
        placeholder={t("contactCardI.fullName")}
        value={formData.nom_complet}
        onChange={handleChange}
        error={errors.nom_complet}
        valid={valid.nom_complet}
      />
      <ContactInputField
        name="email"
        type="email"
        placeholder={t("contactCardI.email")}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        valid={valid.email}
      />
      <ContactInputField
        name="telephone"
        type="tel"
        placeholder={t("contactCardI.phone")}
        value={formData.telephone}
        onChange={handleChange}
        error={errors.telephone}
        valid={valid.telephone}
      />
      <ContactTextareaField
        placeholder={t("contactCardI.message")}
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        valid={valid.message}
      />

      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`w-full py-4 rounded-lg font-bold flex items-center justify-center transition ${
          isFormValid && !isSubmitting
            ? "bg-cyan-600 hover:bg-cyan-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        <Mail className="w-5 h-5 mr-2" />
        {isSubmitting ? t("contactCardI.sendingRequest") : t("contactCardI.sendRequest")}
      </button>
    </form>
  );
}

export default ContactRequestForm;
