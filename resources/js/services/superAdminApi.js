import { createApiClient } from "@/services/apiClient";

export default createApiClient({
  tokenKey: "user_token",
  loadAuthStore: async () => (await import("@/stores/superAdmin")).useSuperAdminAuthStore,
});
