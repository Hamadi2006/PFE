import axios from "axios";
import { API_BASE_URL } from "../utils/authStorage";

const JSON_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export function loginAdmin({ email, password }, httpClient = axios) {
  return httpClient.post(
    `${API_BASE_URL}/admin/login`,
    {
      email: email.trim(),
      mot_de_passe: password,
    },
    { headers: JSON_HEADERS }
  );
}

export function loginCompany({ email, password }, httpClient = axios) {
  return httpClient.post(
    `${API_BASE_URL}/company/auth`,
    {
      email: email.trim(),
      password,
    },
    { headers: JSON_HEADERS }
  );
}

export function registerClient(
  { name, email, password, passwordConfirmation },
  httpClient = axios
) {
  return httpClient.post(
    `${API_BASE_URL}/client/register`,
    {
      name: name.trim(),
      email: email.trim(),
      password,
      password_confirmation: passwordConfirmation,
    },
    { headers: JSON_HEADERS }
  );
}

export function loginClient({ email, password }, httpClient = axios) {
  return httpClient.post(
    `${API_BASE_URL}/client/login`,
    {
      email: email.trim(),
      password,
    },
    { headers: JSON_HEADERS }
  );
}

export function fetchClientProfile({ headers = {}, httpClient = axios } = {}) {
  return httpClient.get(`${API_BASE_URL}/client/me`, { headers });
}

export function logoutClient({ headers = {}, httpClient = axios } = {}) {
  return httpClient.post(`${API_BASE_URL}/client/logout`, {}, { headers });
}
