import axios from "axios";
import { API_BASE_URL } from "../utils/authStorage";
import { unwrapApiData } from "./apiResponse";

export async function fetchAdmins({ headers = {}, httpClient = axios } = {}) {
  const response = await httpClient.get(`${API_BASE_URL}/admin/getAdmins`, {
    headers,
  });

  const admins = unwrapApiData(response, []);
  return Array.isArray(admins) ? admins : [];
}

export function deleteAdmin(id, { headers = {}, httpClient = axios } = {}) {
  return httpClient.delete(`${API_BASE_URL}/admin/${id}`, { headers });
}

export function createAdmin(payload, { headers = {}, httpClient = axios } = {}) {
  return httpClient.post(`${API_BASE_URL}/admin/store`, payload, { headers });
}

export function updateAdmin(
  id,
  payload,
  { headers = {}, httpClient = axios } = {}
) {
  return httpClient.post(`${API_BASE_URL}/admin/${id}`, payload, { headers });
}
