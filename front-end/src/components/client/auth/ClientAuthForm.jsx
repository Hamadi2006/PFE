import React from "react";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  User,
  UserPlus,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ClientAuthForm({
  mode,
  values,
  errors,
  submitError,
  loading,
  updateField,
  toggleField,
  handleSubmit,
}) {
  const { t } = useTranslation();
  const isSignUp = mode === "signUp";
  const submitLabel = isSignUp
    ? t("clientAuth.signUp.submit")
    : t("clientAuth.signIn.submit");
  const SubmitIcon = isSignUp ? UserPlus : LogIn;
  const loadingLabel = isSignUp
    ? t("clientAuth.signUp.loading")
    : t("clientAuth.signIn.loading");

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {submitError && (
        <div className="flex gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
          <span>{submitError}</span>
        </div>
      )}

      {isSignUp && (
        <FormField
          icon={User}
          id="client-name"
          label={t("clientAuth.fields.name")}
          type="text"
          value={values.name}
          placeholder={t("clientAuth.placeholders.name")}
          error={errors.name}
          disabled={loading}
          onChange={(value) => updateField("name", value)}
        />
      )}

      <FormField
        icon={Mail}
        id="client-email"
        label={t("clientAuth.fields.email")}
        type="email"
        value={values.email}
        placeholder={t("clientAuth.placeholders.email")}
        error={errors.email}
        disabled={loading}
        onChange={(value) => updateField("email", value)}
      />

      <PasswordField
        id="client-password"
        label={t("clientAuth.fields.password")}
        value={values.password}
        visible={values.showPassword}
        placeholder={t("clientAuth.placeholders.password")}
        error={errors.password}
        disabled={loading}
        onToggle={() => toggleField("showPassword")}
        onChange={(value) => updateField("password", value)}
      />

      {isSignUp && (
        <PasswordField
          id="client-password-confirmation"
          label={t("clientAuth.fields.passwordConfirmation")}
          value={values.passwordConfirmation}
          visible={values.showPasswordConfirmation}
          placeholder={t("clientAuth.placeholders.password")}
          error={errors.passwordConfirmation}
          disabled={loading}
          onToggle={() => toggleField("showPasswordConfirmation")}
          onChange={(value) => updateField("passwordConfirmation", value)}
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <SubmitIcon className="h-5 w-5" />
        {loading ? loadingLabel : submitLabel}
      </button>
    </form>
  );
}

function FormField({
  icon: Icon,
  id,
  label,
  type,
  value,
  placeholder,
  error,
  disabled,
  onChange,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        {React.createElement(Icon, {
          className: "absolute left-3 top-3.5 h-5 w-5 text-slate-400",
        })}
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500 disabled:bg-slate-100 ${
            error ? "border-red-400" : "border-slate-300"
          }`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function PasswordField({
  id,
  label,
  value,
  visible,
  placeholder,
  error,
  disabled,
  onToggle,
  onChange,
}) {
  const { t } = useTranslation();

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500 disabled:bg-slate-100 ${
            error ? "border-red-400" : "border-slate-300"
          }`}
        />
        <button
          type="button"
          aria-label={t("clientAuth.actions.togglePassword")}
          onClick={onToggle}
          disabled={disabled}
          className="absolute right-3 top-3.5 text-slate-400 transition hover:text-slate-600 disabled:cursor-not-allowed"
        >
          {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
