import axios from "axios";
import { API_BASE_URL } from "../utils/authStorage";
import { unwrapApiData } from "./apiResponse";

export function createDemande(
  payload,
  { headers = {}, httpClient = axios } = {}
) {
  return httpClient.post(`${API_BASE_URL}/demande`, payload, {
    headers: { Accept: "application/json", ...headers },
  });
}

export function deleteDemande(id, httpClient = axios) {
  return httpClient.delete(`${API_BASE_URL}/demande/${id}`);
}

export async function fetchDemandes(httpClient = axios) {
  const response = await httpClient.get(`${API_BASE_URL}/demande`);
  return unwrapApiData(response, []);
}

export async function fetchDemandesBySociete(
  societeId,
  { headers = {}, httpClient = axios } = {}
) {
  if (!societeId) return [];

  const response = await httpClient.get(
    `${API_BASE_URL}/demande/Bysociete/${societeId}`,
    { headers }
  );
  return unwrapApiData(response, []);
}
