export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const API_ORIGIN = (() => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return API_BASE_URL.replace(/\/api\/?$/, "");
  }
})();

export const AUTH_CHANGED_EVENT = "sakancom-auth-changed";

function safeParseJson(value) {
  if (!value || value === "undefined" || value === "null") return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function getStoredJson(key) {
  return safeParseJson(localStorage.getItem(key));
}

export function notifyAuthChanged() {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function normalizeCompany(company) {
  if (!company) return null;

  return {
    ...company,
    name: company.name || company.nom || "",
    specialty: company.specialty || company.statut || company.ville || "",
  };
}

export function getAdminAuth() {
  const token = localStorage.getItem("token");
  const user = getStoredJson("user");

  if (!token || !user) return null;
  return { token, user };
}

export function saveAdminSession({ token, user }) {
  if (!token || !user) {
    throw new Error("Session admin incomplete");
  }

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  notifyAuthChanged();
}

export function clearAdminSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  notifyAuthChanged();
}

export function getCompanyAuth() {
  const token = localStorage.getItem("tokenCompanie");
  const company = normalizeCompany(getStoredJson("companie"));

  if (!token || !company) return null;
  return { token, company };
}

export function saveCompanySession({ token, company }) {
  const normalizedCompany = normalizeCompany(company);

  if (!token || !normalizedCompany) {
    throw new Error("Session societe incomplete");
  }

  localStorage.setItem("tokenCompanie", token);
  localStorage.setItem("companie", JSON.stringify(normalizedCompany));
  notifyAuthChanged();
}

export function clearCompanySession() {
  localStorage.removeItem("tokenCompanie");
  localStorage.removeItem("companie");
  notifyAuthChanged();
}

export function getCompanyId() {
  return getCompanyAuth()?.company?.id || null;
}

export function normalizeClient(user) {
  if (!user) return null;

  return {
    ...user,
    name: user.name || "",
    email: user.email || "",
  };
}

export function getClientAuth() {
  const token = localStorage.getItem("clientToken");
  const user = normalizeClient(getStoredJson("clientUser"));

  if (!token || !user) return null;
  return { token, user };
}

export function saveClientSession({ token, user }) {
  const normalizedUser = normalizeClient(user);

  if (!token || !normalizedUser) {
    throw new Error("Session client incomplete");
  }

  localStorage.setItem("clientToken", token);
  localStorage.setItem("clientUser", JSON.stringify(normalizedUser));
  notifyAuthChanged();
}

export function clearClientSession() {
  localStorage.removeItem("clientToken");
  localStorage.removeItem("clientUser");
  notifyAuthChanged();
}

export function getAuthHeader(type = "admin") {
  const token =
    type === "company"
      ? localStorage.getItem("tokenCompanie")
      : type === "client"
        ? localStorage.getItem("clientToken")
      : localStorage.getItem("token");

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function parseImageList(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parseImageList(parsed);
    } catch {
      return [value];
    }
  }

  return [];
}

export function getStorageUrl(path) {
  if (!path || typeof path !== "string") return "";

  const cleanPath = path.trim();
  if (!cleanPath) return "";
  if (/^(data:|blob:)/i.test(cleanPath)) return cleanPath;

  try {
    const url = new URL(cleanPath);
    const storageIndex = url.pathname.indexOf("/storage/");

    if (storageIndex !== -1) {
      return `${API_ORIGIN}${url.pathname.slice(storageIndex)}${url.search}${url.hash}`;
    }

    return cleanPath;
  } catch {
    const storagePath = cleanPath
      .replace(/^\/+/, "")
      .replace(/^storage\//, "");

    return `${API_ORIGIN}/storage/${storagePath}`;
  }
}

export function getStoragePath(urlOrPath) {
  if (!urlOrPath || typeof urlOrPath !== "string") return "";

  const cleanValue = urlOrPath.trim();
  const storageIndex = cleanValue.indexOf("/storage/");

  if (storageIndex !== -1) {
    return cleanValue.slice(storageIndex + "/storage/".length);
  }

  return cleanValue.replace(/^\/+/, "").replace(/^storage\//, "");
}

export function getStorageUrls(value) {
  return parseImageList(value).map(getStorageUrl).filter(Boolean);
}

export function getErrorMessage(error, fallback = "Une erreur est survenue") {
  const response = error?.response?.data;

  if (response?.errors) {
    return Object.values(response.errors).flat().join(", ");
  }

  return response?.message || response?.error || error?.message || fallback;
}
