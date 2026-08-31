import { defineStore } from 'pinia';

const CACHE_KEY = 'tenant_branding';

function loadCached() {
    try {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
    } catch (e) {
        return {};
    }
}

export const useTenantBrandingStore = defineStore('tenantBranding', {
    state: () => {
        const cached = loadCached();
        return {
            companyName: cached.companyName || null,
            logoUrl: cached.logoUrl || null,
            primaryColor: cached.primaryColor || null,
            secondaryColor: cached.secondaryColor || null,
            accentColor: cached.accentColor || null,
        };
    },
    actions: {
        setBranding(branding) {
            this.companyName = branding.company_name ?? null;
            this.logoUrl = branding.logo_url ?? null;
            this.primaryColor = branding.primary_color ?? null;
            this.secondaryColor = branding.secondary_color ?? null;
            this.accentColor = branding.accent_color ?? null;

            localStorage.setItem(CACHE_KEY, JSON.stringify({
                companyName: this.companyName,
                logoUrl: this.logoUrl,
                primaryColor: this.primaryColor,
                secondaryColor: this.secondaryColor,
                accentColor: this.accentColor,
            }));
        },
    },
});
