import { defineStore } from 'pinia';

export const useTenantBrandingStore = defineStore('tenantBranding', {
    state: () => ({
        logoUrl: localStorage.getItem('tenant_logo_url') || null,
    }),
    actions: {
        setLogo(url) {
            this.logoUrl = url;
            if (url) {
                localStorage.setItem('tenant_logo_url', url);
            } else {
                localStorage.removeItem('tenant_logo_url');
            }
        },
    },
});
