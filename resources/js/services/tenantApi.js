import { createApiClient } from "@/services/apiClient";

export default createApiClient({
  tokenKey: "tenant_token",
  loadAuthStore: async () => (await import("@/stores/tenantAuth")).useTenantAuthStore,
});
