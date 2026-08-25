import axios from "axios";
import environment from "@/environments";

/**
 * Builds an axios client for a specific audience (superadmin or tenant).
 *
 * The token is read straight from localStorage (not from the Pinia store)
 * so this file never has to import a store — that would create a circular
 * import, since the stores import their api client to make requests.
 * `loadAuthStore` is only called lazily, on a 401, to run that store's
 * logout() — see superAdminApi.js / tenantApi.js.
 */
export function createApiClient({ tokenKey, loadAuthStore }) {
  const client = axios.create({
    baseURL: environment.apiBaseUrl,
    headers: {
      Accept: "application/json",
      // Content-Type intentionally omitted
    },
  });

  const authInterceptor = (config) => {
    if (!config) return config;

    config.headers = config.headers || {};

    const token = localStorage.getItem(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const isFormData =
      typeof FormData !== "undefined" && config.data instanceof FormData;

    if (isFormData) {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    } else {
      if (!config.headers["Content-Type"] && !config.headers["content-type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  };

  client.interceptors.request.use(authInterceptor);

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const useAuthStore = await loadAuthStore();
        useAuthStore().logout();
      }

      let message = "An unexpected error occurred";

      if (error.response && error.response.data) {
        message = error.response.data.message || message;

        if (
          typeof message === "string" &&
          message.length > 160 &&
          message.includes("code :")
        ) {
          try {
            const cleanMsg = JSON.parse(message.split("code :").pop());
            message = cleanMsg.error?.message || message;
          } catch (e) {
            console.error("Failed to parse error JSON", e);
          }
        }

        error.response.data.message = message;
      }

      return Promise.reject(error);
    }
  );

  return client;
}
