import { useCallback, useEffect, useMemo, useState } from "react";
import {
  clearClientSession,
  getAuthHeader,
  getClientAuth,
} from "../../../utils/authStorage";
import {
  CONTACT_FIELD_NAMES,
  createInitialContactRequest,
  isContactRequestValid,
  validateContactField,
} from "./contactRequestValidation";

function useContactRequestForm({
  immobilier,
  onError,
  onSuccess,
  onValidationError,
  submitRequest,
  t,
}) {
  const [formData, setFormData] = useState(() =>
    createInitialContactRequest(immobilier)
  );
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!immobilier) return;

    setFormData((currentFormData) => ({
      ...currentFormData,
      immobilier_id: immobilier.id,
      societe_id: immobilier.societe_id || "",
    }));
  }, [immobilier]);

  const validateField = useCallback(
    (name, value) => validateContactField(name, value, t),
    [t]
  );

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const error = validateField(name, value);

      setFormData((currentFormData) => ({
        ...currentFormData,
        [name]: value,
      }));
      setErrors((currentErrors) => ({ ...currentErrors, [name]: error }));
      setValid((currentValid) => ({ ...currentValid, [name]: !error }));
    },
    [validateField]
  );

  const validateForm = useCallback(() => {
    const nextErrors = {};

    CONTACT_FIELD_NAMES.forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) nextErrors[fieldName] = error;
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formData, validateField]);

  const resetForm = useCallback(() => {
    setFormData(createInitialContactRequest(immobilier));
    setErrors({});
    setValid({});
  }, [immobilier]);

  const submitValidatedRequest = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const response = await submitRequest(formData, {
        headers: getAuthHeader("client"),
      });
      onSuccess(response.data.message);
      resetForm();
    } catch (error) {
      if ([401, 403].includes(error?.response?.status)) {
        clearClientSession();
        setAuthModalOpen(true);
        return;
      }

      onError(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onError, onSuccess, resetForm, submitRequest]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!validateForm()) {
        onValidationError();
        return;
      }

      if (!getClientAuth()) {
        setAuthModalOpen(true);
        return;
      }

      await submitValidatedRequest();
    },
    [
      onValidationError,
      submitValidatedRequest,
      validateForm,
    ]
  );

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const handleAuthenticated = useCallback(async () => {
    setAuthModalOpen(false);

    if (!validateForm()) {
      onValidationError();
      return;
    }

    await submitValidatedRequest();
  }, [onValidationError, submitValidatedRequest, validateForm]);

  const isFormValid = useMemo(
    () => isContactRequestValid(formData, valid),
    [formData, valid]
  );

  return {
    errors,
    authModalOpen,
    closeAuthModal,
    formData,
    handleAuthenticated,
    handleChange,
    handleSubmit,
    isFormValid,
    isSubmitting,
    valid,
  };
}

export default useContactRequestForm;
