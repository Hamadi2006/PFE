import { useState } from "react";
import { getErrorMessage } from "../../../utils/authStorage";
import { validateClientAuth } from "./authValidation";

const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  showPassword: false,
  showPasswordConfirmation: false,
};

export function useClientAuthForm({ mode, request, onSuccess, t }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setSubmitError("");

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: null }));
    }
  };

  const toggleField = (name) => {
    setValues((current) => ({ ...current, [name]: !current[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateClientAuth(values, mode, t);
    const hasErrors = Object.values(nextErrors).some(Boolean);

    if (hasErrors) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitError("");
    setLoading(true);

    try {
      const response = await request(values);
      await onSuccess?.(response.data);
    } catch (error) {
      setSubmitError(getErrorMessage(error, t("clientAuth.errors.generic")));
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    errors,
    submitError,
    loading,
    updateField,
    toggleField,
    handleSubmit,
  };
}
