import React, { useCallback, useState } from "react";
import {
  Plus,
  X,
  Building2,
  Mail,
  Lock,
  Phone,
  MapPin,
  Globe,
  ToggleLeft,
  Save,
} from "lucide-react";

const initialFormData = {
  nom: "",
  email: "",
  password: "",
  password_confirmation: "",
  telephone: "",
  adresse: "",
  ville: "",
  site_web: "",
  logo: null,
  statut: "active",
};

function AddCompanyModal({ showModal, setShowModal, onAdd }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const fieldClass = (name) =>
    `w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
      errors[name] ? "border-red-300 bg-red-50" : "border-gray-300"
    }`;

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Nom requis";
    if (!formData.email.trim()) newErrors.email = "Email requis";
    if (!formData.telephone.trim()) newErrors.telephone = "Telephone requis";
    if (!formData.adresse.trim()) newErrors.adresse = "Adresse requise";
    if (!formData.ville.trim()) newErrors.ville = "Ville requise";
    if (!formData.site_web.trim()) newErrors.site_web = "Site web requis";
    if (!formData.password) newErrors.password = "Mot de passe requis";
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Confirmation requise";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Email invalide";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Minimum 6 caracteres";
    }

    if (
      formData.password &&
      formData.password_confirmation &&
      formData.password !== formData.password_confirmation
    ) {
      newErrors.password_confirmation = "Les mots de passe ne correspondent pas";
    }

    if (formData.site_web) {
      try {
        new URL(formData.site_web);
      } catch {
        newErrors.site_web = "URL invalide (ex: https://exemple.com)";
      }
    }

    return newErrors;
  }, [formData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value, files } = e.target;

      if (files && files[0]) {
        const file = files[0];

        if (!file.type.startsWith("image/")) {
          setErrors((prev) => ({
            ...prev,
            logo: "Veuillez selectionner une image valide",
          }));
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          setErrors((prev) => ({
            ...prev,
            logo: "L'image ne doit pas depasser 5MB",
          }));
          return;
        }

        setFormData((prev) => ({ ...prev, [name]: file }));
        setErrors((prev) => ({ ...prev, logo: null }));

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    },
    [errors]
  );

  const removeImage = useCallback(() => {
    setFormData((prev) => ({ ...prev, logo: null }));
    setImagePreview(null);
    setErrors((prev) => ({ ...prev, logo: null }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setImagePreview(null);
    setErrors({});
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setLoading(true);
      try {
        await onAdd({
          ...formData,
          email: formData.email.trim(),
          nom: formData.nom.trim(),
          telephone: formData.telephone.trim(),
          adresse: formData.adresse.trim(),
          ville: formData.ville.trim(),
          site_web: formData.site_web.trim(),
        });
        setShowModal(false);
        resetForm();
      } catch (error) {
        console.error("Erreur lors de l'ajout:", error);
      } finally {
        setLoading(false);
      }
    },
    [formData, onAdd, resetForm, setShowModal, validateForm]
  );

  const handleClose = useCallback(() => {
    if (loading) return;
    setShowModal(false);
    resetForm();
  }, [loading, resetForm, setShowModal]);

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto border border-gray-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Nouvelle Societe
              </h3>
              <p className="text-sm text-gray-500">
                Ajouter une societe partenaire
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6" noValidate>
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-gray-400" />
                )}
              </div>
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  disabled={loading}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <label className="block mt-3">
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                disabled={loading}
              />
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium transition-colors">
                Choisir un logo
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (max 5MB)</p>
            {errors.logo && (
              <p className="text-red-500 text-xs mt-1">{errors.logo}</p>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-500" />
              Informations de base
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                icon={Building2}
                label="Nom de la societe *"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom de la societe"
                className={fieldClass("nom")}
                error={errors.nom}
              />
              <Field
                icon={Mail}
                label="Email *"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemple@entreprise.com"
                className={fieldClass("email")}
                error={errors.email}
              />
              <Field
                icon={Lock}
                label="Mot de passe *"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className={fieldClass("password")}
                error={errors.password}
              />
              <Field
                icon={Lock}
                label="Confirmer le mot de passe *"
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="********"
                className={fieldClass("password_confirmation")}
                error={errors.password_confirmation}
              />
              <Field
                icon={Phone}
                label="Telephone *"
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="+212 6XX XXX XXX"
                className={fieldClass("telephone")}
                error={errors.telephone}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              Localisation
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                icon={MapPin}
                label="Ville *"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                placeholder="Casablanca"
                className={fieldClass("ville")}
                error={errors.ville}
              />
              <Field
                icon={MapPin}
                label="Adresse *"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                placeholder="123 Rue Example"
                className={fieldClass("adresse")}
                error={errors.adresse}
              />
              <Field
                icon={Globe}
                label="Site web *"
                type="url"
                name="site_web"
                value={formData.site_web}
                onChange={handleChange}
                placeholder="https://www.exemple.com"
                className={fieldClass("site_web")}
                error={errors.site_web}
                wrapperClassName="md:col-span-2"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <ToggleLeft className="w-4 h-4 text-blue-500" />
              Statut
            </h4>
            <select
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              disabled={loading}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ajout...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Ajouter la societe
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className,
  error,
  wrapperClassName = "",
}) {
  return (
    <div className={wrapperClassName}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {React.createElement(icon, {
          className:
            "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2",
        })}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={className}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default AddCompanyModal;
