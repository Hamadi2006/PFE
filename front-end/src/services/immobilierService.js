import axios from "axios";
import { API_BASE_URL } from "../utils/authStorage";
import { unwrapApiData } from "./apiResponse";

export async function fetchImmobiliers(httpClient = axios) {
  const response = await httpClient.get(`${API_BASE_URL}/immobilier`);
  return unwrapApiData(response, []);
}

export async function fetchImmobiliersBySociete(
  societeId,
  { headers = {}, httpClient = axios } = {}
) {
  if (!societeId) return [];

  const response = await httpClient.get(
    `${API_BASE_URL}/immobilier/Bysociete/${societeId}`,
    { headers }
  );
  return unwrapApiData(response, []);
}

export function createImmobilier(
  payload,
  { headers = {}, httpClient = axios } = {}
) {
  return httpClient.post(`${API_BASE_URL}/immobilier`, payload, { headers });
}

export function updateImmobilier(
  id,
  payload,
  { headers = {}, httpClient = axios } = {}
) {
  return httpClient.post(`${API_BASE_URL}/immobilier/${id}`, payload, {
    headers,
  });
}

export function deleteImmobilier(
  id,
  { headers = {}, httpClient = axios } = {}
) {
  return httpClient.delete(`${API_BASE_URL}/immobilier/${id}`, { headers });
}
