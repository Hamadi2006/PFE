import axios from "axios";
import { API_BASE_URL } from "../utils/authStorage";
import { unwrapApiData } from "./apiResponse";

export async function fetchCompanies(httpClient = axios) {
  const response = await httpClient.get(`${API_BASE_URL}/company`);
  return unwrapApiData(response, []);
}

export function createCompany(
  payload,
  { headers = {}, httpClient = axios } = {}
) {
  return httpClient.post(`${API_BASE_URL}/company/store`, payload, {
    headers,
  });
}

export function updateCompany(
  id,
  payload,
  { headers = {}, httpClient = axios } = {}
) {
  return httpClient.post(`${API_BASE_URL}/company/${id}`, payload, {
    headers,
  });
}

export function deleteCompany(id, { headers = {}, httpClient = axios } = {}) {
  return httpClient.delete(`${API_BASE_URL}/company/${id}`, { headers });
}
