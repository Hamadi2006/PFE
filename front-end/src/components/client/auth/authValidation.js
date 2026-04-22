const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateClientAuth(values, mode, t) {
  const errors = {};
  const isSignUp = mode === "signUp";

  if (isSignUp && !values.name.trim()) {
    errors.name = t("clientAuth.errors.nameRequired");
  }

  if (!values.email.trim()) {
    errors.email = t("clientAuth.errors.emailRequired");
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = t("clientAuth.errors.emailInvalid");
  }

  if (!values.password) {
    errors.password = t("clientAuth.errors.passwordRequired");
  } else if (isSignUp && values.password.length < 8) {
    errors.password = t("clientAuth.errors.passwordMin");
  }

  if (isSignUp && values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = t("clientAuth.errors.passwordConfirmation");
  }

  return errors;
}
